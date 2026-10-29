// =============================================================================
// LUMIÈRE - Core Domain Types (India Fashion E-Commerce)
// =============================================================================

export type Role = 'customer' | 'admin' | 'super_admin';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  role: Role;
  created_at: string;
  updated_at: string;
}

export interface Address {
  id: string;
  user_id: string;
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string; // 6 digits
  is_default: boolean;
  created_at: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  image_url: string;
  parent_id?: string | null;
  display_order: number;
}

export interface Collection {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  banner_image: string;
  is_active: boolean;
  curated_notes?: string;
  display_order: number;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  sku: string;
  color: string;
  color_hex: string;
  size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'Free Size';
  price: number; // in INR ₹
  compare_at_price?: number; // MRP in INR ₹
  weight_grams: number;
  is_active: boolean;
  image_url?: string;
  // Computed or joined inventory:
  inventory?: InventoryRecord;
}

export interface InventoryRecord {
  id: string;
  variant_id: string;
  physical_stock: number;
  reserved_stock: number;
  low_stock_threshold: number;
  available_stock: number; // physical - reserved
  updated_at: string;
}

export type MovementType = 
  | 'initial_stock' 
  | 'restock' 
  | 'reservation_hold' 
  | 'reservation_release' 
  | 'sale_deduction' 
  | 'cancellation_restore' 
  | 'return_restock' 
  | 'manual_adjustment';

export interface InventoryMovement {
  id: string;
  variant_id: string;
  sku?: string;
  quantity_change: number;
  movement_type: MovementType;
  reference_id?: string;
  reason: string;
  created_by: string;
  created_at: string;
}

export interface InventoryReservation {
  id: string;
  session_id: string;
  order_id?: string;
  variant_id: string;
  quantity: number;
  expires_at: string;
  status: 'active' | 'converted' | 'released' | 'expired';
  created_at: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  alt_text: string;
  display_order: number;
  is_primary: boolean;
  color?: string;
}

export type ProductStatus = 'draft' | 'active' | 'archived';

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category_slug: string;
  collection_slug?: string;
  description: string;
  fabric_care: string;
  origin: string; // e.g. "Varanasi, Uttar Pradesh" or "Chanderi, Madhya Pradesh"
  is_affiliate: boolean;
  affiliate_source_name?: string;
  affiliate_url?: string;
  affiliate_disclosure?: string;
  gender?: 'men' | 'women' | 'unisex';
  style?: string;
  badge?: 'new' | 'bestseller' | 'sale';
  is_bestseller?: boolean;
  is_new?: boolean;
  base_price: number; // Lowest price among variants
  discount_price?: number;
  is_deal?: boolean;
  rating: number; // Realistic legitimate rating
  review_count: number;
  status: ProductStatus;
  images: ProductImage[];
  variants: ProductVariant[];
  created_at: string;
  updated_at: string;
}

export interface CuratedOutfit {
  id: string;
  slug: string;
  title: string;
  occasion: string;
  description: string;
  hero_image: string;
  product_ids: string[];
  styling_tips: string[];
}

export interface CartItem {
  variant_id: string;
  product_id: string;
  product_name: string;
  product_slug: string;
  product_image: string;
  sku: string;
  color: string;
  size: string;
  unit_price: number;
  quantity: number;
}

export type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'cod';
export type PaymentStatus = 'pending' | 'authorized' | 'captured' | 'failed' | 'refunded';
export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';

export interface ShippingAddressInput {
  full_name: string;
  email: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  pincode: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  variant_id: string;
  product_name: string;
  variant_title: string;
  sku: string;
  unit_price: number;
  quantity: number;
  total_price: number;
}

export interface Order {
  id: string;
  order_number: string;
  user_id?: string | null;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: ShippingAddressInput;
  subtotal: number;
  discount_amount: number;
  coupon_code?: string;
  shipping_fee: number;
  tax_amount: number;
  total_amount: number;
  currency: 'INR';
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  order_status: OrderStatus;
  idempotency_key?: string;
  notes?: string;
  items: OrderItem[];
  created_at: string;
  updated_at: string;
  shipment?: Shipment;
}

export interface Shipment {
  id: string;
  order_id: string;
  carrier: 'delhivery';
  waybill: string;
  pickup_location: string;
  status: 'manifested' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'failed' | 'cancelled' | 'rto';
  status_details?: string;
  estimated_delivery?: string;
  label_url?: string;
  created_at: string;
  updated_at: string;
}

export interface ReturnRequest {
  id: string;
  order_id: string;
  order_item_id: string;
  reason: string;
  status: 'requested' | 'approved' | 'received_and_inspected' | 'rejected' | 'refunded';
  return_tracking_number?: string;
  inspection_notes?: string;
  restocked_at?: string;
  created_at: string;
}

export interface AffiliateProduct {
  id: string;
  source_name: string;
  external_id: string;
  title: string;
  brand: string;
  category_name: string;
  original_price: number;
  sale_price?: number;
  image_url: string;
  destination_url: string;
  affiliate_tracking_url: string;
  in_stock: boolean;
  review_status: 'pending' | 'approved' | 'rejected';
  is_published: boolean;
  last_synced_at: string;
  created_at: string;
}

export interface AuditLog {
  id: string;
  user_email: string;
  action: string;
  entity: string;
  entity_id: string;
  details?: string;
  created_at: string;
}

export interface ScheduledJobRecord {
  id: string;
  job_name: string;
  status: 'started' | 'success' | 'failed';
  records_affected: number;
  details: string;
  run_duration_ms: number;
  created_at: string;
}

export interface Coupon {
  id: string;
  code: string;
  description: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  min_order_value: number;
  max_discount?: number;
  usage_limit?: number;
  usage_count: number;
  is_active: boolean;
  expires_at?: string;
  created_at: string;
}

export interface AnnouncementBarMessage {
  id: string;
  badge: string;
  message: string;
  link?: string;
  is_active: boolean;
}

export interface HeroBannerConfig {
  headline_line1: string;
  headline_line2: string;
  badge_text: string;
  subheading: string;
  image_url: string;
  primary_button_text: string;
  primary_button_link: string;
  secondary_button_text: string;
  secondary_button_link: string;
  is_active: boolean;
}

export interface CampaignSectionConfig {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image_url: string;
  link: string;
  cta_text: string;
  is_active: boolean;
  display_order: number;
}

export interface SocialLinksConfig {
  instagram?: string;
  twitter?: string;
  pinterest?: string;
  youtube?: string;
}

export interface HomepageConfig {
  announcements: AnnouncementBarMessage[];
  hero: HeroBannerConfig;
  campaigns: CampaignSectionConfig[];
  social_links?: SocialLinksConfig;
}
