export interface Merchant {
  id: string;
  name: string;
  slug: string;
  websiteUrl: string;
  domain: string;
  affiliateProgramName: string;
  status: 'active' | 'inactive';
  trustBadge: string;
  description: string;
  accentColor?: string;
}
