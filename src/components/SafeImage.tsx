"use client";

import React, { useState, useEffect, Component, ReactNode, ErrorInfo } from "react";
import Image, { ImageProps, StaticImageData } from "next/image";
import {
  getSafeImageUrl,
  isSafeImageUrl,
  DEFAULT_FALLBACK_IMAGE,
  INLINE_FALLBACK_SVG,
} from "@/lib/images";

export { getSafeImageUrl, isSafeImageUrl, DEFAULT_FALLBACK_IMAGE, INLINE_FALLBACK_SVG };

export interface SafeImageProps extends Omit<ImageProps, "src"> {
  src?: string | ImageProps["src"] | null;
  fallbackSrc?: string;
}

interface BoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface BoundaryState {
  hasError: boolean;
}

/**
 * Isolated error boundary wrapping next/image calls.
 * If next/image throws synchronously during render (e.g. unconfigured host error),
 * this boundary catches the exception and gracefully renders the unoptimized fallback image.
 */
class SafeImageErrorBoundary extends Component<BoundaryProps, BoundaryState> {
  constructor(props: BoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): BoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Gracefully absorbed image load exception to safeguard storefront ErrorBoundary
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

/**
 * Resolves a safe image source for next/image.
 * Preserves StaticImageData objects if their internal src is safe,
 * otherwise normalizes strings or returns the safe fallback.
 */
function resolveSafeSrc(
  src: unknown,
  fallbackSrc: string
): string | StaticImageData {
  const safeFallback =
    typeof fallbackSrc === "string" && isSafeImageUrl(fallbackSrc)
      ? fallbackSrc
      : DEFAULT_FALLBACK_IMAGE;

  if (!src) {
    return safeFallback;
  }

  if (typeof src === "string") {
    return getSafeImageUrl(src, safeFallback);
  }

  if (typeof src === "object" && src !== null && "src" in src) {
    const innerSrc = (src as StaticImageData).src;
    if (typeof innerSrc === "string" && isSafeImageUrl(innerSrc)) {
      return src as StaticImageData;
    }
    return safeFallback;
  }

  return safeFallback;
}

/**
 * Resilient Image Component for LUMIÈRE Storefront
 * Guarantees that unconfigured domains, malformed URLs, or broken image endpoints
 * never trigger the global ErrorBoundary.
 */
export function SafeImage({
  src,
  fallbackSrc = DEFAULT_FALLBACK_IMAGE,
  alt = "",
  onError,
  ...props
}: SafeImageProps) {
  const initialResolved = resolveSafeSrc(src, fallbackSrc);
  const [currentSrc, setCurrentSrc] = useState<string | StaticImageData>(initialResolved);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    const nextResolved = resolveSafeSrc(src, fallbackSrc);
    setCurrentSrc(nextResolved);
    setLoadFailed(false);
  }, [src, fallbackSrc]);

  const safeFallback =
    typeof fallbackSrc === "string" && isSafeImageUrl(fallbackSrc)
      ? fallbackSrc
      : DEFAULT_FALLBACK_IMAGE;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!loadFailed) {
      setLoadFailed(true);
      // If the primary image failed and it wasn't already the fallback, try the fallback
      if (currentSrc !== safeFallback) {
        setCurrentSrc(safeFallback);
      } else {
        // If the fallback itself failed over the network, switch to the zero-network inline SVG
        setCurrentSrc(INLINE_FALLBACK_SVG);
      }
    } else if (currentSrc !== INLINE_FALLBACK_SVG) {
      // Secondary failure: switch to inline SVG
      setCurrentSrc(INLINE_FALLBACK_SVG);
    }

    if (onError) {
      onError(e);
    }
  };

  const fallbackNode = (
    <Image
      {...props}
      src={safeFallback}
      alt={alt}
      unoptimized={true}
      onError={() => {
        // Prevent infinite error loops if fallback network fails
      }}
    />
  );

  const isDataOrBlob =
    typeof currentSrc === "string" &&
    (currentSrc.startsWith("data:") || currentSrc.startsWith("blob:"));

  return (
    <SafeImageErrorBoundary fallback={fallbackNode}>
      <Image
        {...props}
        src={currentSrc}
        alt={alt}
        unoptimized={isDataOrBlob || props.unoptimized}
        onError={handleImageError}
      />
    </SafeImageErrorBoundary>
  );
}

export default SafeImage;
