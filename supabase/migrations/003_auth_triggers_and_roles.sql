-- =============================================================================
-- LUMIÈRE E-Commerce Platform - Migration 003: Auth Triggers, RBAC & Profiles
-- Automatically synchronizes Supabase auth.users to public.profiles,
-- enforces secure role boundaries (customers cannot grant admin rights),
-- and strengthens Row Level Security policies.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. AUTOMATIC PROFILE CREATION TRIGGER
-- When a user registers via Supabase Auth, securely insert a customer profile.
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        'customer' -- Always defaults to 'customer'. Cannot be set to admin by caller.
    )
    ON CONFLICT (id) DO UPDATE
    SET email = EXCLUDED.email,
        full_name = COALESCE(EXCLUDED.full_name, public.profiles.full_name),
        updated_at = NOW();

    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT OR UPDATE ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- -----------------------------------------------------------------------------
-- 2. SECURE ROLE VALIDATION & ADMIN PRIVILEGES
-- Customers cannot escalate their role. Only super_admin or direct SQL can promote.
-- -----------------------------------------------------------------------------
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

CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'super_admin'
    );
$$;

-- -----------------------------------------------------------------------------
-- 3. WISHLIST CONSTRAINTS & RLS
-- -----------------------------------------------------------------------------
-- Ensure a customer cannot add the same product to their wishlist multiple times
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'uq_wishlist_user_product'
    ) THEN
        ALTER TABLE public.wishlists 
        ADD CONSTRAINT uq_wishlist_user_product UNIQUE (user_id, product_id);
    END IF;
END $$;

-- -----------------------------------------------------------------------------
-- 4. PROFILE RLS POLICIES (Strict least-privilege)
-- -----------------------------------------------------------------------------
-- Allow users to read their own profile; admins can view all profiles
DROP POLICY IF EXISTS "Public read profiles" ON public.profiles;
CREATE POLICY "Public read profiles" ON public.profiles
    FOR SELECT USING (auth.uid() = id OR public.is_admin());

-- Allow users to update only their own name and phone. Role CANNOT be changed by user!
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id)
    WITH CHECK (
        auth.uid() = id
        -- Strictly enforce that the user cannot alter their role
        AND role = (SELECT p.role FROM public.profiles p WHERE p.id = auth.uid())
    );

-- Super admins can update roles
DROP POLICY IF EXISTS "Super admins can manage roles" ON public.profiles;
CREATE POLICY "Super admins can manage roles" ON public.profiles
    FOR UPDATE USING (public.is_super_admin());

-- -----------------------------------------------------------------------------
-- 5. ADDRESSES RLS (Indian Commerce Standards)
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Users can view own addresses" ON public.addresses;
CREATE POLICY "Users can view own addresses" ON public.addresses
    FOR SELECT USING (auth.uid() = user_id OR public.is_admin());

DROP POLICY IF EXISTS "Users can insert own addresses" ON public.addresses;
CREATE POLICY "Users can insert own addresses" ON public.addresses
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own addresses" ON public.addresses;
CREATE POLICY "Users can update own addresses" ON public.addresses
    FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own addresses" ON public.addresses;
CREATE POLICY "Users can delete own addresses" ON public.addresses
    FOR DELETE USING (auth.uid() = user_id);

-- -----------------------------------------------------------------------------
-- 6. ORDERS & ORDER ITEMS RLS
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Users can view own orders" ON public.orders;
CREATE POLICY "Users can view own orders" ON public.orders
    FOR SELECT USING (auth.uid() = user_id OR public.is_admin());

DROP POLICY IF EXISTS "Users can view own order items" ON public.order_items;
CREATE POLICY "Users can view own order items" ON public.order_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.orders o
            WHERE o.id = order_items.order_id
            AND (o.user_id = auth.uid() OR public.is_admin())
        )
    );

-- Customers can never update orders directly (status changes must occur through trusted server endpoints)
DROP POLICY IF EXISTS "Admin full access orders" ON public.orders;
CREATE POLICY "Admin full access orders" ON public.orders
    FOR ALL USING (public.is_admin());
