'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface ImageFallbackProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
}

export function ImageFallback({
  src,
  alt,
  fallbackSrc = '/images/placeholder-garment.svg',
  className = '',
  ...props
}: ImageFallbackProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center bg-[#F4F3EF] text-[#8C887F] p-4 text-center select-none ${className}`}
        style={{ minHeight: '180px' }}
        role="img"
        aria-label={alt || 'Fashion garment image placeholder'}
      >
        <svg
          className="w-12 h-12 stroke-current mb-2 stroke-[1.2] opacity-60"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 3h12l2 6-4 2-2-4H10L8 7 4 9l2-6zM4 9v12h16V9"
          />
        </svg>
        <span className="text-[11px] uppercase tracking-widest font-mono text-muted">
          LUMIÈRE ATELIER
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      {...props}
    />
  );
}
