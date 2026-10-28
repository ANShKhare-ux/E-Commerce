import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from '@/components/product/ProductCard';
import { AnnouncementBar } from '@/components/common/AnnouncementBar';
import { AffiliateNotice } from '@/components/common/AffiliateNotice';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { ImageFallback } from '@/components/product/ImageFallback';
import { PRODUCTS } from '@/data/products';

describe('UI Components Verification', () => {
  it('renders AnnouncementBar with affiliate disclosure link and INR indicator', () => {
    render(<AnnouncementBar />);
    expect(screen.getByText(/Prices in INR/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Affiliate Disclosure/i })).toBeInTheDocument();
  });

  it('renders AffiliateNotice with transparent merchant fulfillment message', () => {
    render(<AffiliateNotice />);
    expect(screen.getByText(/Affiliate Discovery & Merchant Fulfillment/i)).toBeInTheDocument();
    expect(screen.getByText(/LUMIÈRE curates premium clothing/i)).toBeInTheDocument();
  });

  it('renders Breadcrumbs correctly with navigation hierarchy', () => {
    render(
      <Breadcrumbs
        items={[
          { label: 'Shop', href: '/shop' },
          { label: 'Shirts', href: '/categories/shirts' },
          { label: 'Pure Linen Shirt' },
        ]}
      />
    );
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Shop' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Shirts' })).toBeInTheDocument();
    expect(screen.getByText('Pure Linen Shirt')).toBeInTheDocument();
  });

  it('renders ProductCard with INR pricing, merchant name, and sponsored outbound affiliate link', () => {
    const product = PRODUCTS[0]; // French Linen Shirt
    render(<ProductCard product={product} />);

    // Brand and product name
    expect(screen.getByText(product.brand)).toBeInTheDocument();
    expect(screen.getByText(product.name)).toBeInTheDocument();

    // INR Price
    expect(screen.getByText(/₹\s?3,499/)).toBeInTheDocument();

    // Outbound CTA
    const shopNowLink = screen.getByRole('link', { name: /Shop Pure French Linen Relaxed Shirt at/i });
    expect(shopNowLink).toBeInTheDocument();
    expect(shopNowLink).toHaveAttribute('href', `/api/outbound/${product.id}`);
    expect(shopNowLink).toHaveAttribute('target', '_blank');
    expect(shopNowLink).toHaveAttribute('rel', 'sponsored noopener noreferrer');
  });

  it('renders ImageFallback gracefully when image load errors', () => {
    render(
      <ImageFallback
        src="https://invalid-image-source.example/not-found.jpg"
        alt="Test garment"
        width={300}
        height={400}
      />
    );

    const img = screen.getByRole('img');
    fireEvent.error(img);

    // Fallback UI should now be displayed
    expect(screen.getByText(/LUMIÈRE ATELIER/i)).toBeInTheDocument();
  });
});
