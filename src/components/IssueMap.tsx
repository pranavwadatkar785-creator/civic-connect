"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const DynamicMap = dynamic(
  () => import("./Map"),
  {
    ssr: false,
    loading: () => (
      <div className="h-80 flex items-center justify-center rounded-3xl bg-slate-100">
        Loading map...
      </div>
    ),
  }
);

export default function IssueMap() {
  const [position, setPosition] =
    useState<[number, number] | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([
          pos.coords.latitude,
          pos.coords.longitude,
        ]);
      },
      () => {
        // fallback: Pune
        setPosition([18.5204, 73.8567]);
      }
    );
  }, []);

  if (!position) {
    return (
      <div className="h-80 flex items-center justify-center rounded-3xl bg-slate-100">
        Fetching your location...
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-100 shadow-xl">
      <DynamicMap position={position} />
    </div>
  );
}