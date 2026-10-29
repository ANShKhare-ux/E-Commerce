-- =============================================================================
-- LUMIÈRE E-Commerce Platform - PostgreSQL / Supabase Initial Schema
-- Market: India (INR, Delhivery, PhonePe / Google Pay UPI, COD, Affiliate sync, Inventory)
-- =============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- -----------------------------------------------------------------------------
-- 1. PROFILES & ROLES (Linked to auth.users)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT,
    phone TEXT,
    role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin', 'super_admin')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 2. CUSTOMER ADDRESSES
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    address_line1 TEXT NOT NULL,
    address_line2 TEXT,
    landmark TEXT,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    pincode VARCHAR(6) NOT NULL,
    is_default BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 3. CATEGORIES & COLLECTIONS
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    parent_id UUID REFERENCES public.categories(id),
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.collections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    tagline TEXT,
    description TEXT,
    banner_image TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    curated_notes TEXT,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 4. AFFILIATE SOURCES
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.affiliate_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    base_url TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused', 'inactive')),
    commission_rate NUMERIC(5, 2) NOT NULL DEFAULT 0.00,
    sync_interval_hours INT NOT NULL DEFAULT 24,
    last_synced_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 5. PRODUCTS
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    brand TEXT NOT NULL,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    collection_id UUID REFERENCES public.collections(id) ON DELETE SET NULL,
    description TEXT NOT NULL,
    fabric_care TEXT,
    origin TEXT NOT NULL DEFAULT 'India',
    is_affiliate BOOLEAN NOT NULL DEFAULT FALSE,
    affiliate_source_id UUID REFERENCES public.affiliate_sources(id) ON DELETE SET NULL,
    affiliate_url TEXT,
    affiliate_disclosure TEXT,
    base_price NUMERIC(10, 2) NOT NULL CHECK (base_price >= 0),
    discount_price NUMERIC(10, 2) CHECK (discount_price IS NULL OR (discount_price <= base_price AND discount_price >= 0)),
    is_deal BOOLEAN NOT NULL DEFAULT FALSE,
    rating NUMERIC(3, 2) NOT NULL DEFAULT 4.8 CHECK (rating >= 0 AND rating <= 5.0),
    review_count INT NOT NULL DEFAULT 0 CHECK (review_count >= 0),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('draft', 'active', 'archived')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.product_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    alt_text TEXT,
    display_order INT NOT NULL DEFAULT 0,
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 6. PRODUCT VARIANTS & AUTOMATIC INVENTORY
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.product_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    sku TEXT NOT NULL UNIQUE,
    color TEXT NOT NULL,
    color_hex TEXT,
    size TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    compare_at_price NUMERIC(10, 2) CHECK (compare_at_price IS NULL OR compare_at_price >= price),
    weight_grams INT NOT NULL DEFAULT 400,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    variant_id UUID NOT NULL UNIQUE REFERENCES public.product_variants(id) ON DELETE CASCADE,
    physical_stock INT NOT NULL DEFAULT 0 CHECK (physical_stock >= 0),
    reserved_stock INT NOT NULL DEFAULT 0 CHECK (reserved_stock >= 0 AND reserved_stock <= physical_stock),
    low_stock_threshold INT NOT NULL DEFAULT 5 CHECK (low_stock_threshold >= 0),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.inventory_movements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    variant_id UUID NOT NULL REFERENCES public.product_variants(id) ON DELETE CASCADE,
    quantity_change INT NOT NULL,
    movement_type TEXT NOT NULL CHECK (
        movement_type IN (
            'initial_stock', 'restock', 'reservation_hold', 
            'reservation_release', 'sale_deduction', 'cancellation_restore', 
            'return_restock', 'manual_adjustment'
        )
    ),
    reference_id TEXT,
    reason TEXT NOT NULL,
    created_by TEXT NOT NULL DEFAULT 'system',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.inventory_reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id TEXT NOT NULL,
    order_id UUID,
    variant_id UUID NOT NULL REFERENCES public.product_variants(id) ON DELETE CASCADE,
    quantity INT NOT NULL CHECK (quantity > 0),
    expires_at TIMESTAMPTZ NOT NULL,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'converted', 'released', 'expired')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 7. CARTS & CART ITEMS
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.carts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    session_token TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.cart_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cart_id UUID NOT NULL REFERENCES public.carts(id) ON DELETE CASCADE,
    variant_id UUID NOT NULL REFERENCES public.product_variants(id) ON DELETE CASCADE,
    quantity INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (cart_id, variant_id)
);

-- -----------------------------------------------------------------------------
-- 8. ORDERS & ORDER ITEMS
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT NOT NULL UNIQUE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    shipping_address JSONB NOT NULL,
    billing_address JSONB,
    subtotal NUMERIC(10, 2) NOT NULL CHECK (subtotal >= 0),
    discount_amount NUMERIC(10, 2) NOT NULL DEFAULT 0.00 CHECK (discount_amount >= 0),
    shipping_fee NUMERIC(10, 2) NOT NULL DEFAULT 0.00 CHECK (shipping_fee >= 0),
    tax_amount NUMERIC(10, 2) NOT NULL DEFAULT 0.00 CHECK (tax_amount >= 0),
    total_amount NUMERIC(10, 2) NOT NULL CHECK (total_amount >= 0),
    currency TEXT NOT NULL DEFAULT 'INR',
    payment_method TEXT NOT NULL CHECK (payment_method IN ('upi', 'card', 'netbanking', 'cod')),
    payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'authorized', 'captured', 'failed', 'refunded')),
    order_status TEXT NOT NULL DEFAULT 'pending' CHECK (order_status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned')),
    idempotency_key TEXT UNIQUE,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    variant_id UUID NOT NULL REFERENCES public.product_variants(id),
    product_name TEXT NOT NULL,
    variant_title TEXT NOT NULL,
    sku TEXT NOT NULL,
    unit_price NUMERIC(10, 2) NOT NULL CHECK (unit_price >= 0),
    quantity INT NOT NULL CHECK (quantity > 0),
    total_price NUMERIC(10, 2) NOT NULL CHECK (total_price >= 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 9. PAYMENTS & REFUNDS
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    gateway TEXT NOT NULL CHECK (gateway IN ('phonepe', 'gpay', 'upi', 'cod', 'test_sandbox')),
    gateway_order_id TEXT,
    gateway_payment_id TEXT,
    gateway_signature TEXT,
    amount NUMERIC(10, 2) NOT NULL CHECK (amount >= 0),
    currency TEXT NOT NULL DEFAULT 'INR',
    status TEXT NOT NULL CHECK (status IN ('created', 'captured', 'failed', 'refunded')),
    raw_response JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.refunds (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    payment_id UUID REFERENCES public.payments(id),
    amount NUMERIC(10, 2) NOT NULL CHECK (amount > 0),
    reason TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processed', 'failed')),
    gateway_refund_id TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 10. SHIPMENTS (Delhivery Integration) & RETURNS
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.shipments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    carrier TEXT NOT NULL DEFAULT 'delhivery',
    waybill TEXT UNIQUE,
    pickup_location TEXT NOT NULL DEFAULT 'LUMIERE_MUMBAI_HUB',
    status TEXT NOT NULL DEFAULT 'manifested' CHECK (
        status IN ('manifested', 'in_transit', 'out_for_delivery', 'delivered', 'failed', 'cancelled', 'rto')
    ),
    status_details TEXT,
    estimated_delivery TIMESTAMPTZ,
    label_url TEXT,
    raw_delhivery_response JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.returns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    order_item_id UUID NOT NULL REFERENCES public.order_items(id) ON DELETE CASCADE,
    reason TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'requested' CHECK (
        status IN ('requested', 'approved', 'received_and_inspected', 'rejected', 'refunded')
    ),
    return_tracking_number TEXT,
    inspection_notes TEXT,
    restocked_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 11. AFFILIATE REVIEW & SYNC
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.affiliate_products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_id UUID REFERENCES public.affiliate_sources(id) ON DELETE CASCADE,
    external_id TEXT NOT NULL,
    title TEXT NOT NULL,
    brand TEXT NOT NULL,
    category_name TEXT,
    original_price NUMERIC(10, 2) NOT NULL,
    sale_price NUMERIC(10, 2),
    image_url TEXT,
    destination_url TEXT NOT NULL,
    affiliate_tracking_url TEXT NOT NULL,
    in_stock BOOLEAN NOT NULL DEFAULT TRUE,
    review_status TEXT NOT NULL DEFAULT 'pending' CHECK (review_status IN ('pending', 'approved', 'rejected')),
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    last_synced_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (source_id, external_id)
);

CREATE TABLE IF NOT EXISTS public.affiliate_sync_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_id UUID REFERENCES public.affiliate_sources(id) ON DELETE CASCADE,
    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    items_imported INT NOT NULL DEFAULT 0,
    items_updated INT NOT NULL DEFAULT 0,
    items_failed INT NOT NULL DEFAULT 0,
    error_log TEXT
);

-- -----------------------------------------------------------------------------
-- 12. WISHLIST & NEWSLETTER
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.wishlists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, product_id)
);

CREATE TABLE IF NOT EXISTS public.newsletter_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    source TEXT NOT NULL DEFAULT 'storefront_footer',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    subscribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 13. AUTOMATION, EMAILS, WEBHOOKS, AUDIT LOGS
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.email_outbox (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recipient_email TEXT NOT NULL,
    template_name TEXT NOT NULL,
    subject TEXT NOT NULL,
    payload JSONB NOT NULL,
    status TEXT NOT NULL DEFAULT 'queued' CHECK (status IN ('queued', 'sent', 'failed')),
    attempts INT NOT NULL DEFAULT 0,
    last_error TEXT,
    sent_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.webhook_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    gateway TEXT NOT NULL,
    event_type TEXT NOT NULL,
    idempotency_key TEXT NOT NULL UNIQUE,
    payload JSONB NOT NULL,
    status TEXT NOT NULL DEFAULT 'received' CHECK (status IN ('received', 'processed', 'failed')),
    error_message TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    entity TEXT NOT NULL,
    entity_id TEXT,
    old_data JSONB,
    new_data JSONB,
    ip_address TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.scheduled_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_name TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('started', 'success', 'failed')),
    records_affected INT NOT NULL DEFAULT 0,
    details TEXT,
    run_duration_ms INT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 14. PERFORMANCE INDEXES
-- -----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_collection ON public.products(collection_id);
CREATE INDEX IF NOT EXISTS idx_products_status ON public.products(status);
CREATE INDEX IF NOT EXISTS idx_product_variants_sku ON public.product_variants(sku);
CREATE INDEX IF NOT EXISTS idx_inventory_variant ON public.inventory(variant_id);
CREATE INDEX IF NOT EXISTS idx_reservations_status_expiry ON public.inventory_reservations(status, expires_at);
CREATE INDEX IF NOT EXISTS idx_orders_user ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_number ON public.orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_idempotency ON public.orders(idempotency_key);
CREATE INDEX IF NOT EXISTS idx_shipments_waybill ON public.shipments(waybill);
CREATE INDEX IF NOT EXISTS idx_email_outbox_status ON public.email_outbox(status, attempts);

-- -----------------------------------------------------------------------------
-- 15. CONCURRENCY-SAFE ATOMIC INVENTORY FUNCTIONS
-- -----------------------------------------------------------------------------

-- Atomic Reservation Function
CREATE OR REPLACE FUNCTION public.reserve_stock_atomic(
    p_session_id TEXT,
    p_variant_id UUID,
    p_quantity INT,
    p_duration_minutes INT DEFAULT 15
)
RETURNS JSONB
LANGUAGE plpgsql
AS $$
DECLARE
    v_physical INT;
    v_reserved INT;
    v_available INT;
    v_reservation_id UUID;
    v_expires_at TIMESTAMPTZ;
BEGIN
    -- Acquire exclusive row lock on inventory for this variant
    SELECT physical_stock, reserved_stock
    INTO v_physical, v_reserved
    FROM public.inventory
    WHERE variant_id = p_variant_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', 'Variant inventory record not found');
    END IF;

    v_available := v_physical - v_reserved;

    IF v_available < p_quantity THEN
        RETURN jsonb_build_object(
            'success', false, 
            'error', 'Insufficient available stock', 
            'available', v_available
        );
    END IF;

    -- Calculate expiration timestamp
    v_expires_at := NOW() + (p_duration_minutes || ' minutes')::INTERVAL;

    -- Update inventory reserved stock
    UPDATE public.inventory
    SET reserved_stock = reserved_stock + p_quantity,
        updated_at = NOW()
    WHERE variant_id = p_variant_id;

    -- Insert active reservation
    INSERT INTO public.inventory_reservations (session_id, variant_id, quantity, expires_at, status)
    VALUES (p_session_id, p_variant_id, p_quantity, v_expires_at, 'active')
    RETURNING id INTO v_reservation_id;

    -- Log movement
    INSERT INTO public.inventory_movements (
        variant_id, quantity_change, movement_type, reference_id, reason, created_by
    )
    VALUES (
        p_variant_id, 0, 'reservation_hold', v_reservation_id::TEXT, 
        'Reserved ' || p_quantity || ' units for checkout session ' || p_session_id, 'checkout'
    );

    RETURN jsonb_build_object(
        'success', true,
        'reservation_id', v_reservation_id,
        'expires_at', v_expires_at,
        'quantity', p_quantity
    );
END;
$$;

-- Atomic Release Reservation Function
CREATE OR REPLACE FUNCTION public.release_reservation_atomic(
    p_reservation_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
AS $$
DECLARE
    v_res RECORD;
BEGIN
    -- Lock reservation row
    SELECT * INTO v_res
    FROM public.inventory_reservations
    WHERE id = p_reservation_id AND status = 'active'
    FOR UPDATE;

    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', 'Active reservation not found');
    END IF;

    -- Release inventory
    UPDATE public.inventory
    SET reserved_stock = GREATEST(0, reserved_stock - v_res.quantity),
        updated_at = NOW()
    WHERE variant_id = v_res.variant_id;

    -- Update reservation status
    UPDATE public.inventory_reservations
    SET status = 'released'
    WHERE id = p_reservation_id;

    -- Log movement
    INSERT INTO public.inventory_movements (
        variant_id, quantity_change, movement_type, reference_id, reason, created_by
    )
    VALUES (
        v_res.variant_id, 0, 'reservation_release', p_reservation_id::TEXT,
        'Released reservation of ' || v_res.quantity || ' units', 'system'
    );

    RETURN jsonb_build_object('success', true);
END;
$$;

-- Atomic Cleanup Expired Reservations Function
CREATE OR REPLACE FUNCTION public.cleanup_expired_reservations()
RETURNS INT
LANGUAGE plpgsql
AS $$
DECLARE
    v_res RECORD;
    v_count INT := 0;
BEGIN
    FOR v_res IN
        SELECT id, variant_id, quantity
        FROM public.inventory_reservations
        WHERE status = 'active' AND expires_at < NOW()
        FOR UPDATE SKIP LOCKED
    LOOP
        UPDATE public.inventory
        SET reserved_stock = GREATEST(0, reserved_stock - v_res.quantity),
            updated_at = NOW()
        WHERE variant_id = v_res.variant_id;

        UPDATE public.inventory_reservations
        SET status = 'expired'
        WHERE id = v_res.id;

        INSERT INTO public.inventory_movements (
            variant_id, quantity_change, movement_type, reference_id, reason, created_by
        )
        VALUES (
            v_res.variant_id, 0, 'reservation_release', v_res.id::TEXT,
            'Cleaned up expired reservation for ' || v_res.quantity || ' units', 'cron_cleanup'
        );

        v_count := v_count + 1;
    END LOOP;

    RETURN v_count;
END;
$$;

-- Atomic Finalize Order Inventory (Converts physical stock to sale deduction)
CREATE OR REPLACE FUNCTION public.finalize_order_inventory_atomic(
    p_order_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
AS $$
DECLARE
    v_item RECORD;
    v_order RECORD;
BEGIN
    SELECT * INTO v_order FROM public.orders WHERE id = p_order_id FOR UPDATE;
    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', 'Order not found');
    END IF;

    FOR v_item IN
        SELECT variant_id, quantity, sku FROM public.order_items WHERE order_id = p_order_id
    LOOP
        -- Deduct physical stock
        UPDATE public.inventory
        SET physical_stock = GREATEST(0, physical_stock - v_item.quantity),
            -- If previously reserved, also decrement reserved
            reserved_stock = GREATEST(0, reserved_stock - v_item.quantity),
            updated_at = NOW()
        WHERE variant_id = v_item.variant_id;

        -- Record movement
        INSERT INTO public.inventory_movements (
            variant_id, quantity_change, movement_type, reference_id, reason, created_by
        )
        VALUES (
            v_item.variant_id, -v_item.quantity, 'sale_deduction', v_order.order_number,
            'Sale deduction for order ' || v_order.order_number || ' (' || v_item.sku || ')', 'order_processor'
        );
    END LOOP;

    RETURN jsonb_build_object('success', true);
END;
$$;

-- Atomic Restore Order Inventory on Cancellation
CREATE OR REPLACE FUNCTION public.restore_order_inventory_atomic(
    p_order_id UUID,
    p_reason TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
AS $$
DECLARE
    v_item RECORD;
    v_order RECORD;
BEGIN
    SELECT * INTO v_order FROM public.orders WHERE id = p_order_id FOR UPDATE;
    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', 'Order not found');
    END IF;

    IF v_order.order_status = 'cancelled' THEN
        RETURN jsonb_build_object('success', false, 'error', 'Order already cancelled');
    END IF;

    FOR v_item IN
        SELECT variant_id, quantity, sku FROM public.order_items WHERE order_id = p_order_id
    LOOP
        -- Restore physical stock
        UPDATE public.inventory
        SET physical_stock = physical_stock + v_item.quantity,
            updated_at = NOW()
        WHERE variant_id = v_item.variant_id;

        -- Record movement
        INSERT INTO public.inventory_movements (
            variant_id, quantity_change, movement_type, reference_id, reason, created_by
        )
        VALUES (
            v_item.variant_id, v_item.quantity, 'cancellation_restore', v_order.order_number,
            'Stock restored upon order cancellation: ' || p_reason, 'cancellation_processor'
        );
    END LOOP;

    UPDATE public.orders
    SET order_status = 'cancelled',
        updated_at = NOW()
    WHERE id = p_order_id;

    RETURN jsonb_build_object('success', true);
END;
$$;

-- Atomic Restock Returned Item (Only after receipt and inspection)
CREATE OR REPLACE FUNCTION public.restock_returned_item_atomic(
    p_return_id UUID,
    p_notes TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
AS $$
DECLARE
    v_return RECORD;
    v_item RECORD;
BEGIN
    SELECT * INTO v_return FROM public.returns WHERE id = p_return_id FOR UPDATE;
    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', 'Return request not found');
    END IF;

    IF v_return.status != 'received_and_inspected' THEN
        RETURN jsonb_build_object('success', false, 'error', 'Item must be received and inspected before restocking');
    END IF;

    IF v_return.restocked_at IS NOT NULL THEN
        RETURN jsonb_build_object('success', false, 'error', 'Item has already been restocked');
    END IF;

    SELECT * INTO v_item FROM public.order_items WHERE id = v_return.order_item_id;

    -- Restock physical inventory
    UPDATE public.inventory
    SET physical_stock = physical_stock + v_item.quantity,
        updated_at = NOW()
    WHERE variant_id = v_item.variant_id;

    -- Mark return record as restocked
    UPDATE public.returns
    SET restocked_at = NOW(),
        inspection_notes = COALESCE(inspection_notes || E'\n', '') || p_notes
    WHERE id = p_return_id;

    -- Log movement
    INSERT INTO public.inventory_movements (
        variant_id, quantity_change, movement_type, reference_id, reason, created_by
    )
    VALUES (
        v_item.variant_id, v_item.quantity, 'return_restock', p_return_id::TEXT,
        'Restocked after physical inspection: ' || p_notes, 'admin_inspection'
    );

    RETURN jsonb_build_object('success', true);
END;
$$;

-- -----------------------------------------------------------------------------
-- 16. ROW LEVEL SECURITY (RLS) POLICIES
-- -----------------------------------------------------------------------------
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.refunds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.returns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_sync_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_outbox ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhook_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scheduled_jobs ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current authenticated user is an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    );
$$;

-- PROFILES
CREATE POLICY "Public read profiles" ON public.profiles FOR SELECT USING (auth.uid() = id OR public.is_admin());
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id)
WITH CHECK (
    -- Customer cannot escalate their own role
    (auth.uid() = id AND role = (SELECT p.role FROM public.profiles p WHERE p.id = auth.uid()))
    OR public.is_admin()
);

-- ADDRESSES
CREATE POLICY "Users can view own addresses" ON public.addresses FOR SELECT USING (auth.uid() = user_id OR public.is_admin());
CREATE POLICY "Users can insert own addresses" ON public.addresses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own addresses" ON public.addresses FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own addresses" ON public.addresses FOR DELETE USING (auth.uid() = user_id);

-- PUBLIC STOREFRONT READ POLICIES
CREATE POLICY "Public can view active categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public can view active collections" ON public.collections FOR SELECT USING (is_active = true OR public.is_admin());
CREATE POLICY "Public can view active products" ON public.products FOR SELECT USING (status = 'active' OR public.is_admin());
CREATE POLICY "Public can view product images" ON public.product_images FOR SELECT USING (true);
CREATE POLICY "Public can view active variants" ON public.product_variants FOR SELECT USING (is_active = true OR public.is_admin());
CREATE POLICY "Public can view inventory availability" ON public.inventory FOR SELECT USING (true);
CREATE POLICY "Public can view approved affiliate products" ON public.affiliate_products FOR SELECT USING (is_published = true OR public.is_admin());

-- CARTS & ITEMS
CREATE POLICY "Users manage own carts" ON public.carts FOR ALL USING (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Users manage own cart items" ON public.cart_items FOR ALL USING (true);

-- ORDERS & ORDER ITEMS
CREATE POLICY "Users can view own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id OR public.is_admin());
CREATE POLICY "Users can create orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can view own order items" ON public.order_items FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.orders o WHERE o.id = order_items.order_id AND (o.user_id = auth.uid() OR public.is_admin()))
);

-- SHIPMENTS & RETURNS
CREATE POLICY "Users view shipments for their orders" ON public.shipments FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.orders o WHERE o.id = shipments.order_id AND (o.user_id = auth.uid() OR public.is_admin()))
);
CREATE POLICY "Users manage returns for their orders" ON public.returns FOR ALL USING (
    EXISTS (SELECT 1 FROM public.orders o WHERE o.id = returns.order_id AND (o.user_id = auth.uid() OR public.is_admin()))
);

-- WISHLISTS
CREATE POLICY "Users view own wishlist" ON public.wishlists FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users manage own wishlist" ON public.wishlists FOR ALL USING (auth.uid() = user_id);

-- NEWSLETTER
CREATE POLICY "Anyone can subscribe to newsletter" ON public.newsletter_subscriptions FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view newsletter subscribers" ON public.newsletter_subscriptions FOR SELECT USING (public.is_admin());

-- ADMIN-ONLY POLICIES FOR RESTRICTED TABLES
CREATE POLICY "Admin full access categories" ON public.categories FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access collections" ON public.collections FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access products" ON public.products FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access variants" ON public.product_variants FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access inventory" ON public.inventory FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access movements" ON public.inventory_movements FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access reservations" ON public.inventory_reservations FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access orders" ON public.orders FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access payments" ON public.payments FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access refunds" ON public.refunds FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access shipments" ON public.shipments FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access returns" ON public.returns FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access affiliate sources" ON public.affiliate_sources FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access affiliate products" ON public.affiliate_products FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access affiliate history" ON public.affiliate_sync_history FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access email outbox" ON public.email_outbox FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access webhook events" ON public.webhook_events FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access audit logs" ON public.audit_logs FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access scheduled jobs" ON public.scheduled_jobs FOR ALL USING (public.is_admin());
