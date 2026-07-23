"use client";

import { Download, FileSpreadsheet, FileText, FileBadge2 } from "lucide-react";

type ExportOption = "excel" | "pdf" | "revenue" | "summary";

type ExportModalProps = {
  open: boolean;
  onClose: () => void;
  theme: "dark" | "light";
  onExport: (type: ExportOption) => void;
};

export default function ExportModal({ open, onClose, theme, onExport }: ExportModalProps) {
  if (!open) return null;

  const cardClass = theme === "dark" ? "border-white/10 bg-slate-900/95" : "border-slate-200 bg-white/95";
  const textClass = theme === "dark" ? "text-white" : "text-slate-900";
  const mutedText = theme === "dark" ? "text-slate-400" : "text-slate-500";

  const options = [
    { label: "Bookings Excel", icon: FileSpreadsheet, type: "excel" as const },
    { label: "Bookings PDF", icon: FileText, type: "pdf" as const },
    { label: "Revenue Report", icon: FileBadge2, type: "revenue" as const },
    { label: "Monthly Summary", icon: Download, type: "summary" as const },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4">
      <div className={`w-full max-w-md rounded-[28px] border p-6 shadow-2xl ${cardClass}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm font-medium ${mutedText}`}>Export center</p>
            <h3 className={`text-xl font-semibold ${textClass}`}>Download reports</h3>
          </div>
          <button onClick={onClose} className={`rounded-full px-3 py-1 text-sm ${theme === "dark" ? "bg-white/10 text-white" : "bg-slate-100 text-slate-700"}`}>
            Close
          </button>
        </div>

        <div className="mt-5 space-y-3">
          {options.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => {
                  onExport(item.type);
                  onClose();
                }}
                className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left ${theme === "dark" ? "border-white/10 bg-white/5" : "border-slate-200 bg-slate-50"}`}
              >
                <span className={`font-medium ${textClass}`}>{item.label}</span>
                <Icon className="h-4 w-4 text-cyan-500" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
