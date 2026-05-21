"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Droplets,
  Lightbulb,
  Map,
  Route,
  Trash2,
  TriangleAlert,
} from "lucide-react";

interface Category {
  title: string;
  description: string;
  icon: LucideIcon;
}

const categories: Category[] = [
  {
    title: "Potholes",
    description: "Report damaged road surfaces and unsafe driving spots.",
    icon: TriangleAlert,
  },
  {
    title: "Garbage",
    description: "Flag missed pickups, overflowing bins, and waste issues.",
    icon: Trash2,
  },
  {
    title: "Water Leakage",
    description: "Notify officials about leaks, pipe bursts, and water loss.",
    icon: Droplets,
  },
  {
    title: "Streetlights",
    description: "Track broken, dim, or inactive public lighting.",
    icon: Lightbulb,
  },
  {
    title: "Drainage",
    description: "Submit clogged drains, flooding, and stormwater concerns.",
    icon: Map,
  },
  {
    title: "Roads",
    description: "Share road damage, lane hazards, and maintenance needs.",
    icon: Route,
  },
];

export default function CategoryGrid() {
  const [selectedCategory, setSelectedCategory] =
    useState("");

  const handleClick = (category: string) => {
    setSelectedCategory(category);

    console.log(
      `Selected category: ${category}`
    );

    // Later:
    // openReportModal(category)
  };

  return (
    <section className="bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#2563EB]">
            Report by category
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-950 sm:text-4xl">
            Common civic issues
          </h2>

          <p className="mt-3 text-base leading-7 text-slate-600">
            Choose the issue type that best matches your report so
            the right department can respond quickly.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {categories.map((category) => {
            const Icon = category.icon;

            const isSelected =
              selectedCategory === category.title;

            return (
              <button
                type="button"
                key={category.title}
                onClick={() =>
                  handleClick(category.title)
                }
                style={{ cursor: "pointer" }}
                className={`group w-full text-left rounded-3xl border bg-white p-6 shadow-sm shadow-slate-200/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-[0.98]

                ${
                  isSelected
                    ? "border-[#2563EB] ring-2 ring-blue-200 shadow-lg"
                    : "border-slate-200 hover:border-blue-200"
                }`}
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300

                  ${
                    isSelected
                      ? "bg-[#2563EB] text-white"
                      : "bg-blue-50 text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white"
                  }`}
                >
                  <Icon
                    className="h-6 w-6"
                    aria-hidden="true"
                  />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-slate-950">
                  {category.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {category.description}
                </p>

                {isSelected && (
                  <p className="mt-4 text-sm font-medium text-[#2563EB]">
                    Selected
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}