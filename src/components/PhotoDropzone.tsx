"use client";

import React, { useState, useRef, useCallback } from "react";
import { SafeImage } from "@/components/SafeImage";
import {
  UploadCloud,
  Star,
  Trash2,
  Plus,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Loader2,
  FileImage,
  Link as LinkIcon,
} from "lucide-react";

export interface DroppedImage {
  id: string;
  url: string; // Base64 Data URL or HTTP(S) URL
  alt_text: string;
  is_primary: boolean;
  display_order: number;
  color?: string;
  file_name?: string;
  file_size_kb?: number;
}

interface PhotoDropzoneProps {
  images: DroppedImage[];
  onChange: (images: DroppedImage[]) => void;
  disabled?: boolean;
}

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/avif",
];

const MAX_IMAGE_DIMENSION = 1600; // Resizes ultra-high-res camera captures to luxury 1600px max
const COMPRESSION_QUALITY = 0.85;

/**
 * Resizes and compresses an image file into a clean, lightweight data URL.
 * Prevents bloated multi-megabyte payloads while preserving high-definition retina clarity.
 */
async function processImageFile(file: File): Promise<{
  url: string;
  file_size_kb: number;
  error?: string;
}> {
  return new Promise((resolve) => {
    // 1. Guard against empty 0-byte files
    if (file.size === 0) {
      resolve({
        url: "",
        file_size_kb: 0,
        error: `File "${file.name}" is empty (0 bytes) and cannot be processed.`,
      });
      return;
    }

    // 2. Guard against oversized files (>20MB)
    if (file.size > 20 * 1024 * 1024) {
      resolve({
        url: "",
        file_size_kb: 0,
        error: `File "${file.name}" exceeds the 20MB maximum size limit.`,
      });
      return;
    }

    // Attempt browser-native object URL creation for canvas optimization
    let objectUrl = "";
    try {
      if (
        typeof window !== "undefined" &&
        window.URL &&
        typeof window.URL.createObjectURL === "function"
      ) {
        objectUrl = window.URL.createObjectURL(file);
      }
    } catch {
      objectUrl = "";
    }

    if (!objectUrl) {
      // In non-browser / mock environments, fall back directly to FileReader
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = (e.target?.result as string) || "";
        resolve({
          url: result,
          file_size_kb: Math.round(file.size / 1024),
        });
      };
      reader.onerror = () => {
        resolve({
          url: "",
          file_size_kb: 0,
          error: `Failed to read file "${file.name}".`,
        });
      };
      reader.readAsDataURL(file);
      return;
    }

    const img = new Image();

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      let { width, height } = img;

      if (!width || !height || width <= 0 || height <= 0) {
        resolve({
          url: "",
          file_size_kb: 0,
          error: `Image "${file.name}" has invalid dimensions (0x0).`,
        });
        return;
      }

      // Scale down if larger than max luxury dimension
      if (width > MAX_IMAGE_DIMENSION || height > MAX_IMAGE_DIMENSION) {
        if (width > height) {
          height = Math.round((height * MAX_IMAGE_DIMENSION) / width);
          width = MAX_IMAGE_DIMENSION;
        } else {
          width = Math.round((width * MAX_IMAGE_DIMENSION) / height);
          height = MAX_IMAGE_DIMENSION;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        // Fallback to direct file reader since image was verified valid
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve({
            url: (e.target?.result as string) || "",
            file_size_kb: Math.round(file.size / 1024),
          });
        };
        reader.onerror = () => {
          resolve({
            url: "",
            file_size_kb: 0,
            error: `Failed to read verified image "${file.name}".`,
          });
        };
        reader.readAsDataURL(file);
        return;
      }

      // High quality smoothing
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, width, height);

      // Try webp or jpeg
      let dataUrl = "";
      try {
        dataUrl = canvas.toDataURL("image/webp", COMPRESSION_QUALITY);
        if (!dataUrl.startsWith("data:image/webp")) {
          dataUrl = canvas.toDataURL("image/jpeg", COMPRESSION_QUALITY);
        }
      } catch {
        try {
          dataUrl = canvas.toDataURL("image/jpeg", COMPRESSION_QUALITY);
        } catch {
          dataUrl = "";
        }
      }

      if (!dataUrl || !dataUrl.includes(",")) {
        // Fallback to FileReader if canvas toDataURL failed
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve({
            url: (e.target?.result as string) || "",
            file_size_kb: Math.round(file.size / 1024),
          });
        };
        reader.onerror = () => {
          resolve({
            url: "",
            file_size_kb: 0,
            error: `Failed to process image "${file.name}".`,
          });
        };
        reader.readAsDataURL(file);
        return;
      }

      // Approximate size from base64 length
      const base64Length = dataUrl.length - (dataUrl.indexOf(",") + 1);
      const sizeInKb = Math.round((base64Length * 3) / 4 / 1024);

      resolve({
        url: dataUrl,
        file_size_kb: sizeInKb || Math.round(file.size / 1024),
      });
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve({
        url: "",
        file_size_kb: 0,
        error: `Could not decode image "${file.name}". The file may be corrupted or unreadable.`,
      });
    };

    img.src = objectUrl;
  });
}

export function PhotoDropzone({
  images,
  onChange,
  disabled = false,
}: PhotoDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [externalUrl, setExternalUrl] = useState("");
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (disabled) return;
      setIsDragging(true);
    },
    [disabled]
  );

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const processFiles = useCallback(
    async (fileList: FileList | File[]) => {
      if (disabled || fileList.length === 0) return;
      setErrorMessage(null);
      setIsProcessing(true);

      const validFiles: File[] = [];
      const invalidFiles: string[] = [];
      const emptyFiles: string[] = [];
      const oversizedFiles: string[] = [];

      Array.from(fileList).forEach((file) => {
        if (file.size === 0) {
          emptyFiles.push(file.name);
        } else if (file.size > 20 * 1024 * 1024) {
          oversizedFiles.push(file.name);
        } else if (
          ALLOWED_MIME_TYPES.includes(file.type.toLowerCase()) ||
          /\.(jpe?g|png|webp|avif)$/i.test(file.name)
        ) {
          validFiles.push(file);
        } else {
          invalidFiles.push(file.name);
        }
      });

      const errorMessages: string[] = [];
      if (invalidFiles.length > 0) {
        errorMessages.push(
          `Skipped unsupported format: ${invalidFiles.join(", ")}. Permitted: JPG, PNG, WebP, AVIF.`
        );
      }
      if (emptyFiles.length > 0) {
        errorMessages.push(
          `Skipped empty (0-byte) file(s): ${emptyFiles.join(", ")}.`
        );
      }
      if (oversizedFiles.length > 0) {
        errorMessages.push(
          `Skipped file(s) exceeding 20MB: ${oversizedFiles.join(", ")}.`
        );
      }

      if (validFiles.length === 0) {
        if (errorMessages.length > 0) {
          setErrorMessage(errorMessages.join(" "));
        }
        setIsProcessing(false);
        return;
      }

      try {
        const processedList: DroppedImage[] = [];
        const existingCount = images.length;
        const failedFiles: string[] = [];

        for (let i = 0; i < validFiles.length; i++) {
          const file = validFiles[i];
          const result = await processImageFile(file);

          if (result.url) {
            processedList.push({
              id: `dropped-${Date.now()}-${existingCount + processedList.length}-${Math.random().toString(36).substring(2, 6)}`,
              url: result.url,
              alt_text: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
              is_primary: existingCount === 0 && processedList.length === 0,
              display_order: existingCount + processedList.length + 1,
              file_name: file.name,
              file_size_kb: result.file_size_kb,
            });
          } else if (result.error) {
            failedFiles.push(result.error);
          }
        }

        if (failedFiles.length > 0) {
          errorMessages.push(failedFiles.join(" "));
        }

        if (errorMessages.length > 0) {
          setErrorMessage(errorMessages.join(" "));
        }

        if (processedList.length > 0) {
          const updated = [...images, ...processedList];
          // Ensure at least one image is marked primary
          if (!updated.some((img) => img.is_primary) && updated.length > 0) {
            updated[0].is_primary = true;
          }
          onChange(updated);
        }
      } catch (err: any) {
        setErrorMessage(err.message || "Failed to process dropped image files.");
      } finally {
        setIsProcessing(false);
      }
    },
    [disabled, images, onChange]
  );

  const handleDrop = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      if (disabled) return;

      const dt = e.dataTransfer;
      if (dt?.files && dt.files.length > 0) {
        await processFiles(dt.files);
        return;
      }

      // Support dropping image URL from another browser tab
      const uri = dt?.getData("text/uri-list") || dt?.getData("text/plain");
      if (uri && /^https?:\/\//i.test(uri.trim())) {
        const trimmed = uri.trim();
        const newImg: DroppedImage = {
          id: `dropped-url-${Date.now()}-${images.length}`,
          url: trimmed,
          alt_text: "Web image asset",
          is_primary: images.length === 0,
          display_order: images.length + 1,
          file_name: "Web Image",
        };
        const updated = [...images, newImg];
        if (!updated.some((img) => img.is_primary) && updated.length > 0) {
          updated[0].is_primary = true;
        }
        onChange(updated);
      }
    },
    [disabled, images, onChange, processFiles]
  );

  const handleFileInputChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        await processFiles(e.target.files);
        // Clear input value so same files can be re-selected if deleted
        e.target.value = "";
      }
    },
    [processFiles]
  );

  const handleAddExternalUrl = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = externalUrl.trim();
      if (!trimmed) return;

      if (!/^https?:\/\//i.test(trimmed) && !trimmed.startsWith("data:image/")) {
        setErrorMessage("Please provide a valid HTTPS image link or data URL.");
        return;
      }

      setErrorMessage(null);
      const newImg: DroppedImage = {
        id: `url-${Date.now()}-${images.length}`,
        url: trimmed,
        alt_text: "Product photograph",
        is_primary: images.length === 0,
        display_order: images.length + 1,
        file_name: "External URL Asset",
      };

      const updated = [...images, newImg];
      if (!updated.some((img) => img.is_primary) && updated.length > 0) {
        updated[0].is_primary = true;
      }

      onChange(updated);
      setExternalUrl("");
    },
    [externalUrl, images, onChange]
  );

  const setPrimary = useCallback(
    (index: number) => {
      const updated = images.map((img, i) => ({
        ...img,
        is_primary: i === index,
      }));
      onChange(updated);
    },
    [images, onChange]
  );

  const removeImage = useCallback(
    (index: number) => {
      const wasPrimary = images[index]?.is_primary;
      const updated = images
        .filter((_, i) => i !== index)
        .map((img, i) => ({
          ...img,
          display_order: i + 1,
        }));

      // If removed image was primary, designate first image as primary
      if (wasPrimary && updated.length > 0) {
        updated[0].is_primary = true;
      }

      onChange(updated);
    },
    [images, onChange]
  );

  const moveImage = useCallback(
    (fromIdx: number, toIdx: number) => {
      if (toIdx < 0 || toIdx >= images.length) return;
      const updated = [...images];
      const [moved] = updated.splice(fromIdx, 1);
      updated.splice(toIdx, 0, moved);

      // Re-assign display_order
      const reindexed = updated.map((img, i) => ({
        ...img,
        display_order: i + 1,
      }));

      onChange(reindexed);
    },
    [images, onChange]
  );

  const updateAltText = useCallback(
    (index: number, newAlt: string) => {
      const updated = [...images];
      updated[index] = { ...updated[index], alt_text: newAlt };
      onChange(updated);
    },
    [images, onChange]
  );

  const updateColor = useCallback(
    (index: number, newColor: string) => {
      const updated = [...images];
      updated[index] = { ...updated[index], color: newColor.trim() || undefined };
      onChange(updated);
    },
    [images, onChange]
  );

  return (
    <div className="space-y-4">
      {/* 1. Drag and Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && !isProcessing && fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-all duration-200 ${
          isDragging
            ? "border-gold-500 bg-gold-50/60 scale-[1.01] shadow-md ring-2 ring-gold-400/30"
            : "border-canvas-border bg-canvas-subtle/50 hover:bg-canvas-subtle hover:border-gold-400/80"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".jpg,.jpeg,.png,.webp,.avif,image/jpeg,image/png,image/webp,image/avif"
          onChange={handleFileInputChange}
          disabled={disabled || isProcessing}
          className="hidden"
          aria-label="Upload product photos"
        />

        <div className="flex flex-col items-center justify-center space-y-2 pointer-events-none">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform ${
              isDragging ? "bg-gold-500 text-white scale-110" : "bg-noir-900 text-gold-400"
            }`}
          >
            {isProcessing ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <UploadCloud className="w-6 h-6" />
            )}
          </div>

          <div>
            <p className="text-xs font-bold text-noir-900 uppercase tracking-wider">
              {isDragging
                ? "Drop Luxury Photographs Here"
                : "Drag & Drop Product Photos Here"}
            </p>
            <p className="text-[11px] text-noir-500 mt-0.5">
              or <span className="text-gold-700 font-semibold underline">browse local files</span> from your computer
            </p>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-noir-400 tracking-wide">
            <span className="bg-canvas-border/60 px-2 py-0.5 rounded">JPG</span>
            <span className="bg-canvas-border/60 px-2 py-0.5 rounded">PNG</span>
            <span className="bg-canvas-border/60 px-2 py-0.5 rounded">WEBP</span>
            <span className="bg-canvas-border/60 px-2 py-0.5 rounded">AVIF</span>
            <span>• High-Resolution Multi-Upload</span>
          </div>
        </div>

        {isProcessing && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-xs flex items-center justify-center rounded-md">
            <div className="flex items-center gap-2 text-xs font-semibold text-noir-900">
              <Loader2 className="w-4 h-4 animate-spin text-gold-600" />
              <span>Optimizing & Processing High-Res Photos...</span>
            </div>
          </div>
        )}
      </div>

      {/* 2. Optional External URL Fallback Input */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <LinkIcon className="w-3.5 h-3.5 absolute left-3 top-3 text-noir-400" />
          <input
            type="url"
            value={externalUrl}
            onChange={(e) => setExternalUrl(e.target.value)}
            placeholder="Or paste external image URL (Unsplash, Google Drive, Supabase)..."
            className="w-full pl-8 pr-3 py-2 text-xs bg-canvas-subtle border border-canvas-border rounded-sm focus:outline-none focus:border-noir-900 text-noir-900"
            disabled={disabled || isProcessing}
          />
        </div>
        <button
          type="button"
          onClick={handleAddExternalUrl}
          disabled={!externalUrl.trim() || disabled || isProcessing}
          className="px-3.5 py-2 text-xs font-bold uppercase tracking-wider bg-noir-900 hover:bg-gold-600 text-white rounded-sm transition-colors disabled:opacity-40 shrink-0 flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add URL</span>
        </button>
      </div>

      {/* 3. Error Alert */}
      {errorMessage && (
        <div className="p-2.5 bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* 4. Visual Thumbnail Preview Queue */}
      {images.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-noir-800">
            <span>
              {`Configured Photographs (${images.length})`}
            </span>
            <span className="text-[11px] text-noir-400 font-normal">
              Click photo to set primary • Drag cards or use arrows to reorder
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {images.map((img, idx) => (
              <div
                key={img.id || idx}
                draggable={!disabled && !isProcessing}
                onDragStart={(e) => {
                  setDraggedIndex(idx);
                  e.dataTransfer.effectAllowed = "move";
                  e.dataTransfer.setData("text/plain", `${idx}`);
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.dataTransfer.dropEffect = "move";
                }}
                onDrop={(e) => {
                  // Only reorder if this was an internal card drag, not a file drop
                  if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                    return;
                  }
                  e.preventDefault();
                  e.stopPropagation();
                  if (draggedIndex !== null && draggedIndex !== idx) {
                    moveImage(draggedIndex, idx);
                  }
                  setDraggedIndex(null);
                }}
                onDragEnd={() => {
                  setDraggedIndex(null);
                }}
                className={`relative group bg-white border rounded-sm p-2 flex flex-col gap-2 transition-all shadow-xs cursor-grab active:cursor-grabbing ${
                  draggedIndex === idx ? "opacity-40 scale-95 border-gold-400" : ""
                } ${
                  img.is_primary
                    ? "border-gold-500 ring-2 ring-gold-400/40"
                    : "border-canvas-border hover:border-noir-400"
                }`}
              >
                {/* Visual Thumbnail Image */}
                <div className="relative aspect-[3/4] bg-canvas-subtle rounded-sm overflow-hidden border border-canvas-border">
                  <SafeImage
                    src={img.url}
                    alt={img.alt_text || `Product preview image ${idx + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 220px"
                    className="object-cover"
                  />

                  {/* Primary Badge or Indicator */}
                  {img.is_primary ? (
                    <div className="absolute top-2 left-2 bg-gold-600 text-noir-900 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                      <Star className="w-3 h-3 fill-noir-900" />
                      <span>PRIMARY</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setPrimary(idx)}
                      className="absolute top-2 left-2 bg-noir-900/80 hover:bg-gold-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm opacity-90 group-hover:opacity-100 transition-colors cursor-pointer"
                      title="Set as storefront primary image"
                    >
                      Make Primary
                    </button>
                  )}

                  {/* Display Order Badge */}
                  <div className="absolute top-2 right-2 bg-noir-900/80 text-white px-1.5 py-0.5 rounded text-[10px] font-mono">
                    {`#${idx + 1}`}
                  </div>

                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute bottom-2 right-2 bg-rose-600 hover:bg-rose-700 text-white p-1.5 rounded shadow-sm opacity-90 group-hover:opacity-100 transition-colors cursor-pointer"
                    title="Remove photograph"
                    aria-label={`Remove image ${idx + 1}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  {/* Reorder Arrows */}
                  <div className="absolute bottom-2 left-2 flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => moveImage(idx, idx - 1)}
                      disabled={idx === 0}
                      className="bg-noir-900/80 hover:bg-noir-900 text-white p-1 rounded disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                      title="Move earlier"
                    >
                      <ArrowLeft className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveImage(idx, idx + 1)}
                      disabled={idx === images.length - 1}
                      className="bg-noir-900/80 hover:bg-noir-900 text-white p-1 rounded disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                      title="Move later"
                    >
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Alt Text and Color Inputs */}
                <div className="space-y-1.5">
                  <div>
                    <div className="flex items-center justify-between text-[10px] text-noir-500 mb-0.5">
                      <span className="font-semibold uppercase tracking-wider">Alt Text (SEO):</span>
                      {img.file_size_kb ? (
                        <span className="font-mono text-[9px] text-noir-400">
                          {`${img.file_size_kb} KB`}
                        </span>
                      ) : null}
                    </div>
                    <input
                      type="text"
                      value={img.alt_text}
                      onChange={(e) => updateAltText(idx, e.target.value)}
                      placeholder="e.g. Front view drape on model"
                      className="w-full text-[11px] px-2 py-1 bg-canvas-subtle border border-canvas-border rounded-sm focus:outline-none focus:border-noir-900 text-noir-900"
                    />
                  </div>

                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-noir-500 block mb-0.5">
                      Color Variant Link (Optional):
                    </span>
                    <input
                      type="text"
                      value={img.color || ""}
                      onChange={(e) => updateColor(idx, e.target.value)}
                      placeholder="e.g. Obsidian Black / Dusty Rose"
                      className="w-full text-[11px] px-2 py-1 bg-canvas-subtle border border-canvas-border rounded-sm focus:outline-none focus:border-noir-900 text-noir-900"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
