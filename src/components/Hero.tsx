import {
  ArrowRight,
  ClipboardList,
  Search,
  ShieldCheck,
} from "lucide-react";
import IssueMap from "./IssueMap";
import Link from "next/link";

interface HeroProps {
  onReportClick: () => void;
}

export default function Hero({
  onReportClick,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-slate-50">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1fr_0.92fr] lg:gap-14 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm">
            <ShieldCheck className="h-4 w-4 text-[#2563EB]" aria-hidden="true" />
            Trusted community reporting
          </div>

          <h1 className="text-4xl font-bold tracking-normal text-slate-950 sm:text-5xl lg:text-6xl">
            Report civic issues. Improve your city.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
            Civic Connect helps residents report local concerns like potholes,
            streetlight outages, waste collection gaps, and damaged public
            spaces, then track progress with clear status updates.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-all duration-200 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2 active:scale-[0.98]"
                //onClick={onReportClick}
                onClick={() => {
                console.log("REPORT CLICKED");
                onReportClick();}}
              >
                <ClipboardList className="h-5 w-5" aria-hidden="true" />
                Report Issue
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            

            <Link href="/issues">
              <button 
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-[#2563EB] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2 active:scale-[0.98]"
              >
                <Search className="h-5 w-5" aria-hidden="true" />
                Browse Issues
              </button>
            </Link>
          </div>

          <div className="mt-8 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              ["Fast intake", "Submit reports in minutes"],
              ["Clear tracking", "Follow every update"],
              ["Public trust", "Built for neighborhoods"],
            ].map(([title, text]) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <p className="text-sm font-semibold text-slate-950">{title}</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-200/80 sm:p-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
  <div className="mb-4 flex items-center justify-between">
    <div>
      <h3 className="font-bold text-lg">City Issue Map</h3>
      <p className="text-sm text-slate-500">
        Live neighborhood reports
      </p>
    </div>

    <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
      Active
    </span>
  </div>

  <div className="overflow-hidden rounded-2xl">
    <IssueMap />
  </div>
</div>
          </div>
        </div>
      </div>
    </section>
  );
}
