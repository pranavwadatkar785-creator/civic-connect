import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  CalendarClock,
  CheckCircle2,
  MapPin,
  Timer,
} from "lucide-react";

interface FeaturedIssue {
  title: string;
  category: string;
  location: string;
  status: string;
  reported: string;
  icon: LucideIcon;
  accent: string;
}

const featuredIssues: FeaturedIssue[] = [
  {
    title: "Large pothole near school entrance",
    category: "Roads",
    location: "Ward 12, Maple Avenue",
    status: "In Review",
    reported: "Reported 2 hours ago",
    icon: AlertTriangle,
    accent: "text-amber-600 bg-amber-50 ring-amber-100",
  },
  {
    title: "Overflowing garbage bins at market",
    category: "Sanitation",
    location: "Central Market Block C",
    status: "Assigned",
    reported: "Reported yesterday",
    icon: Timer,
    accent: "text-blue-600 bg-blue-50 ring-blue-100",
  },
  {
    title: "Streetlight outage on service road",
    category: "Streetlights",
    location: "Lakeview Service Road",
    status: "Resolved",
    reported: "Resolved today",
    icon: CheckCircle2,
    accent: "text-emerald-600 bg-emerald-50 ring-emerald-100",
  },
];

export default function FeaturedIssues() {
  return (
    <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#2563EB]">
              Featured reports
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl">
              Recently reported issues
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Track visible community reports and see how local departments are
              moving issues through review, assignment, and resolution.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-[#2563EB] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2"
          >
            View all issues
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {featuredIssues.map((issue) => {
            const Icon = issue.icon;

            return (
              <article
                key={issue.title}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/70 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/80"
              >
                <div className="flex items-start justify-between gap-4">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ring-1 ${issue.accent}`}
                  >
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>

                  <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
                    {issue.status}
                  </span>
                </div>

                <div className="mt-5">
                  <p className="text-sm font-semibold text-[#2563EB]">
                    {issue.category}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold leading-7 text-slate-950">
                    {issue.title}
                  </h3>
                </div>

                <div className="mt-5 space-y-3 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-slate-400" aria-hidden="true" />
                    <span>{issue.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarClock
                      className="h-4 w-4 text-slate-400"
                      aria-hidden="true"
                    />
                    <span>{issue.reported}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
