import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAuthorization } from "@/lib/auth/admin";
import { db } from "@/lib/db";
import { Order } from "@/types";

export interface CustomerSummary {
  email: string;
  name: string;
  phone: string;
  totalSpent: number;
  totalOrders: number;
  firstOrderDate: string;
  lastOrderDate: string;
  locations: string[];
  tier: "vip" | "repeat" | "new";
  orders: Array<{
    id: string;
    orderNumber: string;
    totalAmount: number;
    orderStatus: string;
    paymentMethod: string;
    createdAt: string;
    itemCount: number;
  }>;
}

export async function GET(req: NextRequest) {
  try {
    const auth = await verifyAdminAuthorization(req.headers);
    if (!auth.authorized) {
      return NextResponse.json(
        { error: "Unauthorized access: Administrator role required." },
        { status: 401 }
      );
    }

    const allOrders: Order[] = await db.orders.getAll();

    // Group orders by lowercase customer email
    const customerMap = new Map<string, {
      name: string;
      email: string;
      phone: string;
      totalSpent: number;
      totalOrders: number;
      firstOrderDate: string;
      lastOrderDate: string;
      locations: Set<string>;
      orders: CustomerSummary["orders"];
    }>();

    for (const order of allOrders) {
      const emailKey = order.customer_email.trim().toLowerCase();
      const existing = customerMap.get(emailKey);

      const orderLocation = `${order.shipping_address?.city || ""}, ${order.shipping_address?.state || ""}`.trim();
      const orderPreview = {
        id: order.id,
        orderNumber: order.order_number,
        totalAmount: order.total_amount,
        orderStatus: order.order_status,
        paymentMethod: order.payment_method,
        createdAt: order.created_at,
        itemCount: order.items?.reduce((sum, item) => sum + item.quantity, 0) || order.items?.length || 1,
      };

      if (!existing) {
        const locSet = new Set<string>();
        if (orderLocation && orderLocation !== ",") locSet.add(orderLocation);

        customerMap.set(emailKey, {
          name: order.customer_name || "Valued Customer",
          email: order.customer_email,
          phone: order.customer_phone || "",
          totalSpent: order.order_status !== "cancelled" ? order.total_amount : 0,
          totalOrders: 1,
          firstOrderDate: order.created_at,
          lastOrderDate: order.created_at,
          locations: locSet,
          orders: [orderPreview],
        });
      } else {
        if (orderLocation && orderLocation !== ",") {
          existing.locations.add(orderLocation);
        }
        if (order.order_status !== "cancelled") {
          existing.totalSpent += order.total_amount;
        }
        existing.totalOrders += 1;
        existing.orders.push(orderPreview);

        // Keep timestamps accurate
        if (new Date(order.created_at) < new Date(existing.firstOrderDate)) {
          existing.firstOrderDate = order.created_at;
        }
        if (new Date(order.created_at) > new Date(existing.lastOrderDate)) {
          existing.lastOrderDate = order.created_at;
          existing.name = order.customer_name || existing.name;
          if (order.customer_phone) existing.phone = order.customer_phone;
        }
      }
    }

    const customers: CustomerSummary[] = Array.from(customerMap.values()).map((c) => {
      let tier: "vip" | "repeat" | "new" = "new";
      if (c.totalSpent >= 50000 || c.totalOrders >= 3) {
        tier = "vip";
      } else if (c.totalOrders >= 2) {
        tier = "repeat";
      }

      return {
        email: c.email,
        name: c.name,
        phone: c.phone,
        totalSpent: c.totalSpent,
        totalOrders: c.totalOrders,
        firstOrderDate: c.firstOrderDate,
        lastOrderDate: c.lastOrderDate,
        locations: Array.from(c.locations),
        tier,
        orders: c.orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
      };
    });

    // Sort by total spent descending
    customers.sort((a, b) => b.totalSpent - a.totalSpent);

    const totalCustomers = customers.length;
    const repeatCount = customers.filter((c) => c.totalOrders >= 2).length;
    const vipCount = customers.filter((c) => c.tier === "vip").length;
    const totalGrossRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
    const repeatRate = totalCustomers > 0 ? Math.round((repeatCount / totalCustomers) * 100) : 0;
    const averageOrderValue = allOrders.length > 0 ? Math.round(totalGrossRevenue / allOrders.length) : 0;

    return NextResponse.json({
      success: true,
      customers,
      metrics: {
        totalCustomers,
        repeatCustomerRate: repeatRate,
        averageOrderValue,
        totalGrossRevenue,
        vipCount,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to load customer directory." },
      { status: 500 }
    );
  }
}

