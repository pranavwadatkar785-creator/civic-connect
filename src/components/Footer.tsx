import { Landmark, Mail, MapPin, Phone } from "lucide-react";

const footerLinks = [
  "Home",
  "Browse Issues",
  "Track Status",
  "About",
  "Privacy Policy",
  "Terms",
];

const contacts = [
  {
    label: "Civic Helpdesk",
    value: "+1 (555) 248-1024",
    icon: Phone,
  },
  {
    label: "Support Email",
    value: "support@civicconnect.gov",
    icon: Mail,
  },
  {
    label: "City Office",
    value: "100 Municipal Plaza",
    icon: MapPin,
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-[#2563EB]">
                <Landmark className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <p className="text-lg font-bold text-slate-950">
                  Civic Connect
                </p>
                <p className="text-sm text-slate-500">
                  Community Reporting Platform
                </p>
              </div>
            </div>

            <p className="mt-4 max-w-md text-sm leading-6 text-slate-600">
              A public service dashboard for reporting local issues, improving
              response visibility, and strengthening resident participation.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-950">
              Navigation
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {footerLinks.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-sm text-slate-600 transition-colors duration-200 hover:text-[#2563EB]"
                >
                  {link}
                </a>
              ))}
            </div>
          </nav>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-950">
              Contact
            </p>
            <div className="mt-4 space-y-3">
              {contacts.map((contact) => {
                const Icon = contact.icon;

                return (
                  <div key={contact.label} className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB] ring-1 ring-blue-100">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs font-medium text-slate-500">
                        {contact.label}
                      </p>
                      <p className="text-sm font-semibold text-slate-800">
                        {contact.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright 2026 Civic Connect. All rights reserved.</p>
          <p>Built for transparent, responsive civic service.</p>
        </div>
      </div>
    </footer>
  );
}
