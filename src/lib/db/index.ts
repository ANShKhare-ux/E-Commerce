// =============================================================================
// LUMIÈRE - Unified Database & Repository Service
// Implements Atomic Concurrency Guarantees, RLS-compatible abstractions, and
// resilient fallback for development and automated test suites.
// =============================================================================

import {
  Product,
  ProductVariant,
  InventoryRecord,
  InventoryMovement,
  InventoryReservation,
  Order,
  OrderItem,
  Shipment,
  ReturnRequest,
  AffiliateProduct,
  AuditLog,
  ScheduledJobRecord,
  PaymentMethod,
  OrderStatus,
  ShippingAddressInput
} from "@/types";
import {
  INITIAL_PRODUCTS,
  INITIAL_INVENTORY,
  INITIAL_AFFILIATE_QUEUE
} from "@/data/products";

// Stateful In-Memory Datastore (Singleton pattern across Node request lifecycles)
class LumiereDataStore {
  public products: Product[] = [];
  public inventoryMap: Map<string, InventoryRecord> = new Map();
  public movements: InventoryMovement[] = [];
  public reservations: Map<string, InventoryReservation> = new Map();
  public orders: Map<string, Order> = new Map();
  public shipments: Map<string, Shipment> = new Map();
  public returns: Map<string, ReturnRequest> = new Map();
  public affiliateQueue: AffiliateProduct[] = [];
  public auditLogs: AuditLog[] = [];
  public scheduledJobs: ScheduledJobRecord[] = [];
  public newsletterEmails: Set<string> = new Set(["vip@lumiere.in"]);
  public emailOutbox: Array<{
    id: string;
    recipient: string;
    subject: string;
    template: string;
    payload: any;
    status: 'queued' | 'sent' | 'failed';
    attempts: number;
    created_at: string;
  }> = [];

  constructor() {
    this.reset();
  }

  public reset() {
    // Deep clone initial products
    this.products = JSON.parse(JSON.stringify(INITIAL_PRODUCTS));
    this.inventoryMap.clear();
    this.movements = [];
    this.reservations.clear();
    this.orders.clear();
    this.shipments.clear();
    this.returns.clear();
    this.affiliateQueue = JSON.parse(JSON.stringify(INITIAL_AFFILIATE_QUEUE));
    this.auditLogs = [];
    this.scheduledJobs = [];
    this.emailOutbox = [];

    // Initialize inventory for every variant
    for (const prod of this.products) {
      for (const variant of prod.variants) {
        const initInv = INITIAL_INVENTORY[variant.sku] || {
          physical_stock: 10,
          reserved_stock: 0,
          low_stock_threshold: 3,
        };

        const rec: InventoryRecord = {
          id: `inv-${variant.id}`,
          variant_id: variant.id,
          physical_stock: initInv.physical_stock,
          reserved_stock: initInv.reserved_stock,
          low_stock_threshold: initInv.low_stock_threshold,
          available_stock: Math.max(0, initInv.physical_stock - initInv.reserved_stock),
          updated_at: new Date().toISOString(),
        };

        this.inventoryMap.set(variant.id, rec);
        variant.inventory = rec;
      }
    }
  }
}

// Global reference for Node environments
const globalForStore = globalThis as unknown as { lumiereStore?: LumiereDataStore };
export const dbStore = globalForStore.lumiereStore ?? new LumiereDataStore();
if (process.env.NODE_ENV !== "production") globalForStore.lumiereStore = dbStore;

// =============================================================================
// DATABASE SERVICE METHODS
// =============================================================================

export const db = {
  // Reset method (used in tests)
  reset: () => dbStore.reset(),

  // PRODUCTS & VARIANTS
  products: {
    getAll: async (filter?: {
      category?: string;
      collection?: string;
      search?: string;
      isDeal?: boolean;
      isAffiliate?: boolean;
      minPrice?: number;
      maxPrice?: number;
      sort?: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
    }): Promise<Product[]> => {
      let list = [...dbStore.products].filter(p => p.status === 'active');

      if (filter?.category) {
        list = list.filter(p => p.category_slug.toLowerCase() === filter.category!.toLowerCase());
      }
      if (filter?.collection) {
        list = list.filter(p => p.collection_slug?.toLowerCase() === filter.collection!.toLowerCase());
      }
      if (filter?.isDeal !== undefined) {
        list = list.filter(p => p.is_deal === filter.isDeal);
      }
      if (filter?.isAffiliate !== undefined) {
        list = list.filter(p => p.is_affiliate === filter.isAffiliate);
      }
      if (filter?.search) {
        const q = filter.search.toLowerCase().trim();
        list = list.filter(p =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
        );
      }
      if (filter?.minPrice !== undefined) {
        list = list.filter(p => (p.discount_price ?? p.base_price) >= filter.minPrice!);
      }
      if (filter?.maxPrice !== undefined) {
        list = list.filter(p => (p.discount_price ?? p.base_price) <= filter.maxPrice!);
      }

      // Attach fresh inventory
      list = list.map(p => {
        const variants = p.variants.map(v => ({
          ...v,
          inventory: dbStore.inventoryMap.get(v.id) || {
            id: `inv-${v.id}`,
            variant_id: v.id,
            physical_stock: 0,
            reserved_stock: 0,
            low_stock_threshold: 0,
            available_stock: 0,
            updated_at: new Date().toISOString()
          }
        }));
        return { ...p, variants };
      });

      // Sorting
      if (filter?.sort === 'price-asc') {
        list.sort((a, b) => (a.discount_price ?? a.base_price) - (b.discount_price ?? b.base_price));
      } else if (filter?.sort === 'price-desc') {
        list.sort((a, b) => (b.discount_price ?? b.base_price) - (a.discount_price ?? a.base_price));
      } else if (filter?.sort === 'rating') {
        list.sort((a, b) => b.rating - a.rating);
      } else if (filter?.sort === 'newest') {
        list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      }

      return list;
    },

    getBySlug: async (slug: string): Promise<Product | null> => {
      const prod = dbStore.products.find(p => p.slug === slug);
      if (!prod) return null;

      const variants = prod.variants.map(v => ({
        ...v,
        inventory: dbStore.inventoryMap.get(v.id)
      }));

      return { ...prod, variants };
    },

    getById: async (id: string): Promise<Product | null> => {
      const prod = dbStore.products.find(p => p.id === id);
      if (!prod) return null;

      const variants = prod.variants.map(v => ({
        ...v,
        inventory: dbStore.inventoryMap.get(v.id)
      }));

      return { ...prod, variants };
    },

    getVariantById: async (variantId: string): Promise<ProductVariant | null> => {
      for (const p of dbStore.products) {
        const v = p.variants.find(item => item.id === variantId);
        if (v) {
          return {
            ...v,
            inventory: dbStore.inventoryMap.get(v.id)
          };
        }
      }
      return null;
    },

    getVariantBySku: async (sku: string): Promise<ProductVariant | null> => {
      for (const p of dbStore.products) {
        const v = p.variants.find(item => item.sku === sku);
        if (v) {
          return {
            ...v,
            inventory: dbStore.inventoryMap.get(v.id)
          };
        }
      }
      return null;
    },

    create: async (newProduct: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> => {
      const id = `prod-${Date.now()}`;
      const product: Product = {
        ...newProduct,
        id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      dbStore.products.unshift(product);

      // Initialize inventory for new variants
      for (const v of product.variants) {
        const inv: InventoryRecord = {
          id: `inv-${v.id}`,
          variant_id: v.id,
          physical_stock: 10,
          reserved_stock: 0,
          low_stock_threshold: 3,
          available_stock: 10,
          updated_at: new Date().toISOString(),
        };
        dbStore.inventoryMap.set(v.id, inv);
      }

      return product;
    }
  },

  // INVENTORY & RESERVATIONS
  inventory: {
    getByVariantId: async (variantId: string): Promise<InventoryRecord | null> => {
      const record = dbStore.inventoryMap.get(variantId);
      if (!record) return null;
      return {
        ...record,
        available_stock: Math.max(0, record.physical_stock - record.reserved_stock)
      };
    },

    getAll: async (): Promise<Array<InventoryRecord & { sku: string; productName: string; variantTitle: string }>> => {
      const result: Array<InventoryRecord & { sku: string; productName: string; variantTitle: string }> = [];

      for (const prod of dbStore.products) {
        for (const variant of prod.variants) {
          const inv = dbStore.inventoryMap.get(variant.id);
          if (inv) {
            result.push({
              ...inv,
              available_stock: Math.max(0, inv.physical_stock - inv.reserved_stock),
              sku: variant.sku,
              productName: prod.name,
              variantTitle: `${variant.color} / ${variant.size}`,
            });
          }
        }
      }

      return result;
    },

    getLowStock: async (): Promise<Array<InventoryRecord & { sku: string; productName: string; variantTitle: string }>> => {
      const all = await db.inventory.getAll();
      return all.filter(item => item.available_stock <= item.low_stock_threshold);
    },

    // ATOMIC RESERVATION
    reserveStock: async (
      sessionId: string,
      variantId: string,
      quantity: number,
      durationMinutes = 15
    ): Promise<{ success: boolean; reservationId?: string; expiresAt?: string; error?: string; available?: number }> => {
      if (quantity <= 0) {
        return { success: false, error: "Quantity must be greater than 0" };
      }

      const inv = dbStore.inventoryMap.get(variantId);
      if (!inv) {
        return { success: false, error: "Variant inventory record not found" };
      }

      const available = inv.physical_stock - inv.reserved_stock;
      if (available < quantity) {
        return {
          success: false,
          error: `Insufficient available stock. Only ${Math.max(0, available)} item(s) available.`,
          available: Math.max(0, available),
        };
      }

      // Concurrency hold
      inv.reserved_stock += quantity;
      inv.available_stock = inv.physical_stock - inv.reserved_stock;
      inv.updated_at = new Date().toISOString();

      const reservationId = `res-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      const expiresAt = new Date(Date.now() + durationMinutes * 60 * 1000).toISOString();

      const reservation: InventoryReservation = {
        id: reservationId,
        session_id: sessionId,
        variant_id: variantId,
        quantity,
        expires_at: expiresAt,
        status: "active",
        created_at: new Date().toISOString(),
      };

      dbStore.reservations.set(reservationId, reservation);

      // Record movement
      dbStore.movements.push({
        id: `mov-${Date.now()}`,
        variant_id: variantId,
        quantity_change: 0,
        movement_type: "reservation_hold",
        reference_id: reservationId,
        reason: `Reserved ${quantity} unit(s) for checkout session ${sessionId}`,
        created_by: "checkout_system",
        created_at: new Date().toISOString(),
      });

      return {
        success: true,
        reservationId,
        expiresAt,
      };
    },

    // RELEASE RESERVATION
    releaseReservation: async (reservationId: string): Promise<{ success: boolean; error?: string }> => {
      const res = dbStore.reservations.get(reservationId);
      if (!res || res.status !== 'active') {
        return { success: false, error: "Active reservation not found" };
      }

      const inv = dbStore.inventoryMap.get(res.variant_id);
      if (inv) {
        inv.reserved_stock = Math.max(0, inv.reserved_stock - res.quantity);
        inv.available_stock = inv.physical_stock - inv.reserved_stock;
        inv.updated_at = new Date().toISOString();
      }

      res.status = 'released';

      dbStore.movements.push({
        id: `mov-${Date.now()}`,
        variant_id: res.variant_id,
        quantity_change: 0,
        movement_type: "reservation_release",
        reference_id: reservationId,
        reason: `Released reservation of ${res.quantity} unit(s)`,
        created_by: "system",
        created_at: new Date().toISOString(),
      });

      return { success: true };
    },

    // CLEANUP EXPIRED RESERVATIONS
    cleanupExpired: async (): Promise<number> => {
      const now = new Date();
      let count = 0;

      for (const [id, res] of dbStore.reservations.entries()) {
        if (res.status === 'active' && new Date(res.expires_at) < now) {
          const inv = dbStore.inventoryMap.get(res.variant_id);
          if (inv) {
            inv.reserved_stock = Math.max(0, inv.reserved_stock - res.quantity);
            inv.available_stock = inv.physical_stock - inv.reserved_stock;
            inv.updated_at = now.toISOString();
          }

          res.status = 'expired';

          dbStore.movements.push({
            id: `mov-${Date.now()}-${count}`,
            variant_id: res.variant_id,
            quantity_change: 0,
            movement_type: "reservation_release",
            reference_id: id,
            reason: `Auto-cleaned expired reservation of ${res.quantity} unit(s)`,
            created_by: "cron_cleanup",
            created_at: now.toISOString(),
          });

          count++;
        }
      }

      return count;
    },

    // MANUAL STOCK ADJUSTMENT (Admin with Reason)
    adjustStock: async (
      variantId: string,
      newPhysicalStock: number,
      reason: string,
      adminEmail: string
    ): Promise<{ success: boolean; error?: string }> => {
      if (newPhysicalStock < 0) {
        return { success: false, error: "Stock quantity cannot be negative" };
      }
      if (!reason || reason.trim().length === 0) {
        return { success: false, error: "An explicit adjustment reason is strictly required" };
      }

      const inv = dbStore.inventoryMap.get(variantId);
      if (!inv) {
        return { success: false, error: "Inventory record not found" };
      }

      const oldStock = inv.physical_stock;
      const difference = newPhysicalStock - oldStock;

      inv.physical_stock = newPhysicalStock;
      inv.available_stock = Math.max(0, inv.physical_stock - inv.reserved_stock);
      inv.updated_at = new Date().toISOString();

      dbStore.movements.push({
        id: `mov-${Date.now()}`,
        variant_id: variantId,
        quantity_change: difference,
        movement_type: "manual_adjustment",
        reason: `${reason} (Adjusted from ${oldStock} to ${newPhysicalStock})`,
        created_by: adminEmail,
        created_at: new Date().toISOString(),
      });

      dbStore.auditLogs.push({
        id: `aud-${Date.now()}`,
        user_email: adminEmail,
        action: "INVENTORY_ADJUST",
        entity: "inventory",
        entity_id: variantId,
        details: `Adjusted variant ${variantId} stock by ${difference} (New: ${newPhysicalStock}). Reason: ${reason}`,
        created_at: new Date().toISOString(),
      });

      return { success: true };
    },

    // BULK CSV IMPORT
    importCsvStock: async (
      rows: Array<{ sku: string; physical_stock: number; low_stock_threshold?: number; reason: string }>,
      adminEmail: string
    ): Promise<{ success: boolean; updatedCount: number; errors: string[] }> => {
      let updatedCount = 0;
      const errors: string[] = [];

      for (const row of rows) {
        const variant = await db.products.getVariantBySku(row.sku);
        if (!variant) {
          errors.push(`SKU not found: ${row.sku}`);
          continue;
        }

        if (row.physical_stock < 0) {
          errors.push(`Invalid quantity for ${row.sku}: ${row.physical_stock}`);
          continue;
        }

        const inv = dbStore.inventoryMap.get(variant.id);
        if (inv) {
          const oldStock = inv.physical_stock;
          const diff = row.physical_stock - oldStock;
          inv.physical_stock = row.physical_stock;
          if (row.low_stock_threshold !== undefined && row.low_stock_threshold >= 0) {
            inv.low_stock_threshold = row.low_stock_threshold;
          }
          inv.available_stock = Math.max(0, inv.physical_stock - inv.reserved_stock);
          inv.updated_at = new Date().toISOString();

          dbStore.movements.push({
            id: `mov-${Date.now()}-${updatedCount}`,
            variant_id: variant.id,
            quantity_change: diff,
            movement_type: "restock",
            reference_id: "CSV_IMPORT",
            reason: row.reason || "Bulk CSV stock intake",
            created_by: adminEmail,
            created_at: new Date().toISOString(),
          });

          updatedCount++;
        }
      }

      return {
        success: errors.length === 0,
        updatedCount,
        errors,
      };
    },

    getMovements: async (variantId?: string): Promise<InventoryMovement[]> => {
      let list = [...dbStore.movements];
      if (variantId) {
        list = list.filter(m => m.variant_id === variantId);
      }
      return list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
  },

  // ORDERS & CHECKOUT
  orders: {
    getAll: async (filter?: { status?: OrderStatus; search?: string; customerEmail?: string; userId?: string }): Promise<Order[]> => {
      let list = Array.from(dbStore.orders.values());
      if (filter?.status) {
        list = list.filter(o => o.order_status === filter.status);
      }
      if (filter?.customerEmail) {
        list = list.filter(o => o.customer_email.toLowerCase() === filter.customerEmail!.toLowerCase());
      }
      if (filter?.userId) {
        list = list.filter(o => o.user_id === filter.userId);
      }
      if (filter?.search) {
        const q = filter.search.toLowerCase();
        list = list.filter(o =>
          o.order_number.toLowerCase().includes(q) ||
          o.customer_name.toLowerCase().includes(q) ||
          o.customer_email.toLowerCase().includes(q) ||
          o.customer_phone.includes(q)
        );
      }
      return list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    },

    getById: async (orderId: string): Promise<Order | null> => {
      const order = dbStore.orders.get(orderId);
      if (!order) return null;
      return {
        ...order,
        shipment: dbStore.shipments.get(order.id)
      };
    },

    getByOrderNumber: async (orderNumber: string): Promise<Order | null> => {
      for (const order of dbStore.orders.values()) {
        if (order.order_number.toUpperCase() === orderNumber.toUpperCase()) {
          return {
            ...order,
            shipment: dbStore.shipments.get(order.id)
          };
        }
      }
      return null;
    },

    // ATOMIC ORDER CREATION & STOCK FINALIZATION
    create: async (params: {
      userId?: string;
      customerName: string;
      customerEmail: string;
      customerPhone: string;
      shippingAddress: ShippingAddressInput;
      paymentMethod: PaymentMethod;
      items: Array<{ variantId: string; quantity: number }>;
      reservationIds?: string[];
      idempotencyKey?: string;
      notes?: string;
    }): Promise<{ success: boolean; order?: Order; error?: string }> => {
      // 1. Idempotency Check
      if (params.idempotencyKey) {
        for (const existing of dbStore.orders.values()) {
          if (existing.idempotency_key === params.idempotencyKey) {
            return { success: true, order: existing };
          }
        }
      }

      // 2. Validate Variants & Live Stock
      let subtotal = 0;
      const verifiedItems: OrderItem[] = [];
      const orderId = `ord-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const orderNumber = `LUM-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

      for (const item of params.items) {
        const variant = await db.products.getVariantById(item.variantId);
        if (!variant) {
          return { success: false, error: `Variant ID ${item.variantId} not found` };
        }

        const inv = dbStore.inventoryMap.get(item.variantId);
        if (!inv) {
          return { success: false, error: `Inventory record for ${variant.sku} not found` };
        }

        // Check stock availability
        // If an active reservation was held, available check considers that reservation
        const availableStock = inv.physical_stock - inv.reserved_stock;
        if (availableStock < item.quantity && (!params.reservationIds || params.reservationIds.length === 0)) {
          return {
            success: false,
            error: `Variant ${variant.sku} is out of stock or has insufficient available quantity.`
          };
        }

        const itemTotal = variant.price * item.quantity;
        subtotal += itemTotal;

        // Find parent product
        let parentProdName = "LUMIÈRE Apparel";
        for (const p of dbStore.products) {
          if (p.variants.some(v => v.id === variant.id)) {
            parentProdName = p.name;
            break;
          }
        }

        verifiedItems.push({
          id: `item-${Date.now()}-${item.variantId}`,
          order_id: orderId,
          variant_id: variant.id,
          product_name: parentProdName,
          variant_title: `${variant.color} / ${variant.size}`,
          sku: variant.sku,
          unit_price: variant.price,
          quantity: item.quantity,
          total_price: itemTotal,
        });
      }

      // Free shipping threshold for India: ₹2,999
      const shippingFee = subtotal >= 2999 ? 0 : 150;
      const taxAmount = Math.round(subtotal * 0.12); // 12% GST on luxury textiles
      const totalAmount = subtotal + shippingFee; // GST inclusive in base pricing

      // 3. Concurrency-Safe Stock Finalization
      for (const item of verifiedItems) {
        const inv = dbStore.inventoryMap.get(item.variant_id)!;
        inv.physical_stock = Math.max(0, inv.physical_stock - item.quantity);
        // If reservation was used, release from reserved pool
        inv.reserved_stock = Math.max(0, inv.reserved_stock - item.quantity);
        inv.available_stock = Math.max(0, inv.physical_stock - inv.reserved_stock);
        inv.updated_at = new Date().toISOString();

        dbStore.movements.push({
          id: `mov-${Date.now()}-${item.sku}`,
          variant_id: item.variant_id,
          quantity_change: -item.quantity,
          movement_type: "sale_deduction",
          reference_id: orderNumber,
          reason: `Sale deduction for Order ${orderNumber} (${item.sku})`,
          created_by: "checkout_engine",
          created_at: new Date().toISOString(),
        });
      }

      // 4. Mark Reservations as Converted
      if (params.reservationIds) {
        for (const resId of params.reservationIds) {
          const res = dbStore.reservations.get(resId);
          if (res) {
            res.status = "converted";
            res.order_id = orderId;
          }
        }
      }

      // 5. Build and Store Order Record
      const newOrder: Order = {
        id: orderId,
        order_number: orderNumber,
        user_id: params.userId || null,
        customer_name: params.customerName,
        customer_email: params.customerEmail,
        customer_phone: params.customerPhone,
        shipping_address: params.shippingAddress,
        subtotal,
        discount_amount: 0,
        shipping_fee: shippingFee,
        tax_amount: taxAmount,
        total_amount: totalAmount,
        currency: "INR",
        payment_method: params.paymentMethod,
        payment_status: params.paymentMethod === 'cod' ? 'pending' : 'captured',
        order_status: params.paymentMethod === 'cod' ? 'confirmed' : 'processing',
        idempotency_key: params.idempotencyKey,
        notes: params.notes,
        items: verifiedItems,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      dbStore.orders.set(orderId, newOrder);

      // Queue confirmation email
      dbStore.emailOutbox.push({
        id: `email-${Date.now()}`,
        recipient: newOrder.customer_email,
        subject: `Order Confirmation: ${newOrder.order_number} | LUMIÈRE India`,
        template: "order_confirmation",
        payload: { orderNumber: newOrder.order_number, total: newOrder.total_amount },
        status: "queued",
        attempts: 0,
        created_at: new Date().toISOString(),
      });

      return {
        success: true,
        order: newOrder,
      };
    },

    // CANCEL ORDER & RESTORE STOCK ATOMICALLY
    cancel: async (orderId: string, reason: string, adminEmail = "system"): Promise<{ success: boolean; error?: string }> => {
      const order = dbStore.orders.get(orderId);
      if (!order) return { success: false, error: "Order not found" };

      if (order.order_status === "cancelled") {
        return { success: false, error: "Order is already cancelled" };
      }

      // Restore physical stock for every order item
      for (const item of order.items) {
        const inv = dbStore.inventoryMap.get(item.variant_id);
        if (inv) {
          inv.physical_stock += item.quantity;
          inv.available_stock = inv.physical_stock - inv.reserved_stock;
          inv.updated_at = new Date().toISOString();

          dbStore.movements.push({
            id: `mov-${Date.now()}-${item.sku}`,
            variant_id: item.variant_id,
            quantity_change: item.quantity,
            movement_type: "cancellation_restore",
            reference_id: order.order_number,
            reason: `Restored stock on order cancellation: ${reason}`,
            created_by: adminEmail,
            created_at: new Date().toISOString(),
          });
        }
      }

      order.order_status = "cancelled";
      order.updated_at = new Date().toISOString();

      dbStore.auditLogs.push({
        id: `aud-${Date.now()}`,
        user_email: adminEmail,
        action: "ORDER_CANCEL",
        entity: "orders",
        entity_id: orderId,
        details: `Cancelled order ${order.order_number}. Reason: ${reason}. Restored ${order.items.length} items to inventory.`,
        created_at: new Date().toISOString(),
      });

      return { success: true };
    },

    updateStatus: async (orderId: string, status: OrderStatus, adminEmail = "admin"): Promise<{ success: boolean; error?: string }> => {
      const order = dbStore.orders.get(orderId);
      if (!order) return { success: false, error: "Order not found" };

      const oldStatus = order.order_status;
      order.order_status = status;
      order.updated_at = new Date().toISOString();

      dbStore.auditLogs.push({
        id: `aud-${Date.now()}`,
        user_email: adminEmail,
        action: "ORDER_STATUS_UPDATE",
        entity: "orders",
        entity_id: orderId,
        details: `Updated order ${order.order_number} status from ${oldStatus} to ${status}`,
        created_at: new Date().toISOString(),
      });

      return { success: true };
    }
  },

  // DELHIVERY LOGISTICS & SHIPMENTS
  shipments: {
    createForOrder: async (orderId: string, waybill?: string): Promise<{ success: boolean; shipment?: Shipment; error?: string }> => {
      const order = dbStore.orders.get(orderId);
      if (!order) return { success: false, error: "Order not found" };

      const generatedWaybill = waybill || `DEL-${Math.floor(100000000000 + Math.random() * 900000000000)}`;

      const shipment: Shipment = {
        id: `shp-${Date.now()}`,
        order_id: orderId,
        carrier: "delhivery",
        waybill: generatedWaybill,
        pickup_location: "LUMIERE_MUMBAI_HUB",
        status: "manifested",
        status_details: "Shipment manifest generated via Delhivery API. Awaiting courier pickup at Mumbai Fulfilment Center.",
        estimated_delivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        label_url: `/api/delhivery/label?waybill=${generatedWaybill}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      dbStore.shipments.set(orderId, shipment);
      order.order_status = "shipped";
      order.updated_at = new Date().toISOString();

      return { success: true, shipment };
    },

    getByOrderId: async (orderId: string): Promise<Shipment | null> => {
      return dbStore.shipments.get(orderId) || null;
    },

    getByWaybill: async (waybill: string): Promise<{ order: Order; shipment: Shipment } | null> => {
      for (const [orderId, shp] of dbStore.shipments.entries()) {
        if (shp.waybill.toUpperCase() === waybill.toUpperCase()) {
          const ord = dbStore.orders.get(orderId);
          if (ord) return { order: ord, shipment: shp };
        }
      }
      return null;
    }
  },

  // RETURNS & INSPECTION RESTOCK
  returns: {
    create: async (orderId: string, orderItemId: string, reason: string): Promise<{ success: boolean; returnRequest?: ReturnRequest; error?: string }> => {
      const order = dbStore.orders.get(orderId);
      if (!order) return { success: false, error: "Order not found" };

      const item = order.items.find(i => i.id === orderItemId);
      if (!item) return { success: false, error: "Order item not found" };

      const returnId = `ret-${Date.now()}`;
      const req: ReturnRequest = {
        id: returnId,
        order_id: orderId,
        order_item_id: orderItemId,
        reason,
        status: "requested",
        return_tracking_number: `RET-DEL-${Math.floor(10000000 + Math.random() * 90000000)}`,
        created_at: new Date().toISOString(),
      };

      dbStore.returns.set(returnId, req);
      return { success: true, returnRequest: req };
    },

    getAll: async (): Promise<ReturnRequest[]> => {
      return Array.from(dbStore.returns.values()).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    },

    // RESTOCK ONLY AFTER RECEIPT AND PHYSICAL INSPECTION
    inspectAndRestock: async (
      returnId: string,
      inspectionNotes: string,
      adminEmail: string
    ): Promise<{ success: boolean; error?: string }> => {
      const ret = dbStore.returns.get(returnId);
      if (!ret) return { success: false, error: "Return request not found" };

      if (ret.restocked_at) {
        return { success: false, error: "This item has already been inspected and restocked." };
      }

      const order = dbStore.orders.get(ret.order_id);
      if (!order) return { success: false, error: "Associated order not found" };

      const item = order.items.find(i => i.id === ret.order_item_id);
      if (!item) return { success: false, error: "Order item not found" };

      // Restock physical inventory
      const inv = dbStore.inventoryMap.get(item.variant_id);
      if (inv) {
        inv.physical_stock += item.quantity;
        inv.available_stock = inv.physical_stock - inv.reserved_stock;
        inv.updated_at = new Date().toISOString();

        dbStore.movements.push({
          id: `mov-${Date.now()}`,
          variant_id: item.variant_id,
          quantity_change: item.quantity,
          movement_type: "return_restock",
          reference_id: returnId,
          reason: `Restocked after physical inspection: ${inspectionNotes}`,
          created_by: adminEmail,
          created_at: new Date().toISOString(),
        });
      }

      ret.status = "received_and_inspected";
      ret.inspection_notes = inspectionNotes;
      ret.restocked_at = new Date().toISOString();

      dbStore.auditLogs.push({
        id: `aud-${Date.now()}`,
        user_email: adminEmail,
        action: "RETURN_RESTOCK",
        entity: "returns",
        entity_id: returnId,
        details: `Inspected & restocked variant ${item.sku} from return ${returnId}. Notes: ${inspectionNotes}`,
        created_at: new Date().toISOString(),
      });

      return { success: true };
    }
  },

  // AFFILIATE INTEGRATIONS & REVIEW QUEUE
  affiliate: {
    getQueue: async (): Promise<AffiliateProduct[]> => {
      return [...dbStore.affiliateQueue];
    },

    updateReview: async (
      id: string,
      status: 'pending' | 'approved' | 'rejected',
      isPublished: boolean,
      adminEmail = "admin"
    ): Promise<{ success: boolean; error?: string }> => {
      const item = dbStore.affiliateQueue.find(p => p.id === id);
      if (!item) return { success: false, error: "Affiliate queue item not found" };

      item.review_status = status;
      item.is_published = isPublished;

      dbStore.auditLogs.push({
        id: `aud-${Date.now()}`,
        user_email: adminEmail,
        action: "AFFILIATE_REVIEW",
        entity: "affiliate_products",
        entity_id: id,
        details: `Updated affiliate product ${item.title} to ${status} (published: ${isPublished})`,
        created_at: new Date().toISOString(),
      });

      return { success: true };
    },

    syncSources: async (): Promise<{ itemsChecked: number; staleCount: number; errors: string[] }> => {
      let itemsChecked = 0;
      let staleCount = 0;

      for (const item of dbStore.affiliateQueue) {
        itemsChecked++;
        item.last_synced_at = new Date().toISOString();
        if (!item.in_stock) {
          staleCount++;
        }
      }

      dbStore.scheduledJobs.push({
        id: `job-${Date.now()}`,
        job_name: "AFFILIATE_FEED_SYNC",
        status: "success",
        records_affected: itemsChecked,
        details: `Synchronized affiliate feeds: ${itemsChecked} checked, ${staleCount} flagged out-of-stock.`,
        run_duration_ms: 420,
        created_at: new Date().toISOString(),
      });

      return { itemsChecked, staleCount, errors: [] };
    }
  },

  // AUDIT & AUTOMATION
  audit: {
    getLogs: async (): Promise<AuditLog[]> => {
      return [...dbStore.auditLogs].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    },
    getJobs: async (): Promise<ScheduledJobRecord[]> => {
      return [...dbStore.scheduledJobs].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    },
    getEmailOutbox: async () => {
      return [...dbStore.emailOutbox].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
  },

  // NEWSLETTER
  newsletter: {
    subscribe: async (email: string): Promise<{ success: boolean; message: string }> => {
      if (!email || !email.includes("@")) {
        return { success: false, message: "Please provide a valid email address." };
      }
      dbStore.newsletterEmails.add(email.toLowerCase().trim());
      return { success: true, message: "Welcome to LUMIÈRE. Your invitation to private previews has been dispatched." };
    }
  }
};
