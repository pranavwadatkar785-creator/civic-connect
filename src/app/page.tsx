"use client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedIssues from "@/components/FeaturedIssues";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import ReportModal from "@/components/ReportModal";
//import { supabase } from "@/lib/supabase";

export default function Home() {
  const [isReportOpen, setIsReportOpen] =
    useState(false);

//  useEffect(() => {
    // Temporary Supabase connection check. Remove after verification.
   // console.log("Supabase client exists:", Boolean(supabase));
    // Remove this temporary test after Supabase setup is verified.
 // }, []);

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
