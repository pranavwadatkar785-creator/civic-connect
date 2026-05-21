"use client";

import { useState } from "react";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedIssues from "@/components/FeaturedIssues";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import ReportModal from "@/components/ReportModal";

export default function Home() {
  const [isReportOpen, setIsReportOpen] =
    useState(false);

  return (
    <>
      <Navbar
        onOpenReportModal={() =>
          setIsReportOpen(true)
        }
      />

      <main>
        <Hero />
        <StatsSection />
        <CategoryGrid />
        <FeaturedIssues />
        <HowItWorks />
      </main>

      <ReportModal
  isOpen={isReportOpen}
  onClose={() =>
    setIsReportOpen(false)
  }
/>

      <Footer />
    </>
  );
}