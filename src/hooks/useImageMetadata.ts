"use client";

import { useState } from "react";
import * as exifr from "exifr";

export interface ImageMetadata {
  latitude?: number;
  longitude?: number;
  timestamp?: Date;
}

export function useImageMetadata() {
  const [metadata, setMetadata] =
    useState<ImageMetadata | null>(null);

  const [loading, setLoading] =
    useState(false);

  async function extract(file: File) {
    try {
      setLoading(true);

      const gps = await exifr.gps(file);

      const exif = await exifr.parse(file);

      setMetadata({
        latitude: gps?.latitude,
        longitude: gps?.longitude,
        timestamp: exif?.DateTimeOriginal,
      });
    } catch (error) {
      console.error(
        "Metadata extraction failed",
        error
      );

      setMetadata(null);
    } finally {
      setLoading(false);
    }
  }

  return {
    metadata,
    loading,
    extract,
  };
}