import type { LucideIcon } from "lucide-react";
import { ClipboardEdit, MapPinned, SearchCheck, Send } from "lucide-react";

interface Step {
  title: string;
  description: string;
  icon: LucideIcon;
}

const steps: Step[] = [
  {
    title: "Submit a report",
    description:
      "Choose a category, add the location, and describe the issue with helpful details.",
    icon: ClipboardEdit,
  },
  {
    title: "Pin the location",
    description:
      "Use the map to mark the exact spot so field teams can verify it faster.",
    icon: MapPinned,
  },
  {
    title: "Department review",
    description:
      "The right civic team receives the report and updates the case status.",
    icon: SearchCheck,
  },
  {
    title: "Track resolution",
    description:
      "Follow progress from assignment to completion with transparent updates.",
    icon: Send,
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#2563EB]">
            How it works
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl">
            From report to resolution
          </h2>
          <p className="mt-3 text-base leading-7 text-slate-600">
            A simple civic workflow helps residents report issues and gives city
            teams the context they need to respond.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <article
                key={step.title}
                className="group relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/70 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/80"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#2563EB] ring-1 ring-blue-100 transition-colors duration-300 group-hover:bg-[#2563EB] group-hover:text-white">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>

                  <span className="text-4xl font-bold text-slate-100">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-semibold text-slate-950">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {step.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
