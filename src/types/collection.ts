export interface Collection {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  tag: string;
  filterRule: (product: import('./product').Product) => boolean;
}

export interface CategoryInfo {
  slug: import('./product').ProductCategory;
  name: string;
  description: string;
  image: string;
  audiences: import('./product').ProductAudience[];
}
