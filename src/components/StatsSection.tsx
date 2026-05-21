import type { LucideIcon } from "lucide-react";
import { AlertTriangle, CheckCircle, Clock, Users } from "lucide-react";

interface StatItem {
  label: string;
  value: string;
  icon: LucideIcon;
}

const stats: StatItem[] = [
  {
    label: "Issues Reported",
    value: "12,547",
    icon: AlertTriangle,
  },
  {
    label: "Resolved",
    value: "8,921",
    icon: CheckCircle,
  },
  {
    label: "Active Cases",
    value: "2,113",
    icon: Clock,
  },
  {
    label: "Citizens Joined",
    value: "5,304",
    icon: Users,
  },
];

export default function StatsSection() {
  return (
    <section className="bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <article
                key={stat.label}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/70 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/80"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {stat.label}
                    </p>
                    <p className="mt-3 text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl">
                      {stat.value}
                    </p>
                  </div>

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-[#2563EB] ring-1 ring-blue-100 transition-colors duration-300 group-hover:bg-[#2563EB] group-hover:text-white">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                </div>

                <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-2/3 rounded-full bg-[#2563EB]" />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
