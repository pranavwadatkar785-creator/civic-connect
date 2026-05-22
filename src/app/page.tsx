"use client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedIssues from "@/components/FeaturedIssues";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import ReportModal from "@/components/ReportModal";
//import { supabase } from "@/lib/supabase";

import { useAuth } from "@/hooks/useAuth";

export default function Home() {

  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [isReportOpen, setIsReportOpen] = useState(false);

  //const handleProtectedReport = () => {
    //if (!isAuthenticated) {
      //router.push("/login");
      //return;
    //}

    //setIsReportOpen(true);
  //};
  const handleProtectedReport = () => {
  console.log(
    "Auth state:",
    isAuthenticated
  );

  if (!isAuthenticated) {
    console.log("Redirect login");

    router.push("/login");

    return;
  }

  console.log("Open modal");

  setIsReportOpen(true);
};

//  useEffect(() => {
    // Temporary Supabase connection check. Remove after verification.
   // console.log("Supabase client exists:", Boolean(supabase));
    // Remove this temporary test after Supabase setup is verified.
 // }, []);

  return (
    <>
      <Navbar
  onOpenReportModal={() => {
    console.log("Navbar prop reached");
    handleProtectedReport();
  }}
/>

      <main>
        <Hero onReportClick={handleProtectedReport} />
        <StatsSection />
        <CategoryGrid onReportClick={handleProtectedReport} />
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
