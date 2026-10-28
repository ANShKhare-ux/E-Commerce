import { redirect } from 'next/navigation';

interface ProductsRedirectPageProps {
  searchParams?: Record<string, string | string[] | undefined>;
}

export default function ProductsRedirectPage({ searchParams }: ProductsRedirectPageProps) {
  const query = new URLSearchParams();
  if (searchParams) {
    Object.entries(searchParams).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => query.append(key, v));
      } else if (typeof value === 'string' && value.length > 0) {
        query.set(key, value);
      }
    });
  }
  const queryString = query.toString();
  redirect(queryString ? `/shop?${queryString}` : '/shop');
}
