'use client';

import React, { useState } from 'react';
import { ProductImage } from '@/types/product';
import { ImageFallback } from './ImageFallback';

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const currentImage = images[selectedIndex] || images[0];

  return (
    <div className="space-y-4">
      {/* Main Image Frame */}
      <div className="relative aspect-[3/4] bg-[#F4F3EF] border border-border-subtle overflow-hidden">
        <ImageFallback
          src={currentImage?.url || ''}
          alt={currentImage?.alt || productName}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-center"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {images.map((img, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className={`relative w-20 aspect-[3/4] bg-[#F4F3EF] border overflow-hidden shrink-0 transition-colors ${
                  isSelected ? 'border-primary ring-1 ring-primary' : 'border-border hover:border-muted'
                }`}
                aria-label={`View image ${idx + 1} of ${images.length}`}
              >
                <ImageFallback
                  src={img.url}
                  alt={img.alt}
                  fill
                  sizes="80px"
                  className="object-cover object-center"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
