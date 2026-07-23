"use client";

import { useState } from "react";
import { Download, FileSpreadsheet, FileText, FileBadge2 } from "lucide-react";
import { utils, writeFile } from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import ExportModal from "./ExportModal";

type ExportActionsProps = {
  theme: "dark" | "light";
  bookings: Array<{
    id: string;
    customerName: string;
    email: string;
    phone: string;
    eventType: string;
    packageType: string;
    eventDate: string;
    status: string;
    estimatedTotal: number;
  }>;
};

type ExportOption = "excel" | "pdf" | "revenue" | "summary";

const actions = [
  { label: "Export Bookings to Excel", icon: FileSpreadsheet },
  { label: "Export Bookings to PDF", icon: FileText },
  { label: "Export Revenue Report", icon: FileBadge2 },
  { label: "Generate Summary Report", icon: Download },
];

export default function ExportActions({ theme, bookings }: ExportActionsProps) {
  const [open, setOpen] = useState(false);
  const cardClass = theme === "dark"
    ? "border-white/10 bg-slate-900/80"
    : "border-slate-200 bg-white/90";

  const exportBookingsExcel = () => {
    const rows = bookings.map((booking) => ({
      id: booking.id,
      customer: booking.customerName,
      email: booking.email,
      phone: booking.phone,
      eventType: booking.eventType,
      packageType: booking.packageType,
      eventDate: new Date(booking.eventDate).toLocaleDateString("en-IN"),
      status: booking.status,
      estimatedTotal: booking.estimatedTotal,
    }));

    const worksheet = utils.json_to_sheet(rows);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Bookings");
    writeFile(workbook, "bookings-report.xlsx");
  };

  const exportBookingsPdf = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Booking Report", 14, 16);
    doc.setFontSize(11);
    doc.text(`Generated: ${new Date().toLocaleDateString("en-IN")}`, 14, 24);

    const rows = bookings.map((booking) => [
      booking.id,
      booking.customerName,
      booking.status,
      booking.packageType,
      new Date(booking.eventDate).toLocaleDateString("en-IN"),
      `₹${booking.estimatedTotal.toLocaleString("en-IN")}`,
    ]);

    autoTable(doc, {
      startY: 32,
      head: [["ID", "Customer", "Status", "Package", "Event Date", "Amount"]],
      body: rows,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [6, 182, 212] },
    });

    doc.save("bookings-report.pdf");
  };

  const exportRevenueReport = () => {
    const totalRevenue = bookings.reduce((sum, booking) => sum + booking.estimatedTotal, 0);
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Revenue Report", 14, 16);
    doc.setFontSize(11);
    doc.text(`Total Revenue: ₹${totalRevenue.toLocaleString("en-IN")}`, 14, 28);
    doc.text(`Bookings Count: ${bookings.length}`, 14, 36);
    doc.save("revenue-report.pdf");
  };

  const exportSummaryReport = () => {
    const totalRevenue = bookings.reduce((sum, booking) => sum + booking.estimatedTotal, 0);
    const worksheet = utils.json_to_sheet([
      { metric: "Bookings", value: bookings.length },
      { metric: "Total Revenue", value: `₹${totalRevenue.toLocaleString("en-IN")}` },
      { metric: "Pending", value: bookings.filter((booking) => booking.status === "Pending").length },
      { metric: "Confirmed", value: bookings.filter((booking) => booking.status === "Confirmed").length },
    ]);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Summary");
    writeFile(workbook, "summary-report.xlsx");
  };

  const handleExport = (type: ExportOption) => {
    if (type === "excel") exportBookingsExcel();
    if (type === "pdf") exportBookingsPdf();
    if (type === "revenue") exportRevenueReport();
    if (type === "summary") exportSummaryReport();
  };

  return (
    <>
    <div className={`rounded-[28px] border p-6 shadow-[0_16px_70px_rgba(15,23,42,0.08)] ${cardClass}`}>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>Reports</p>
          <h2 className={`text-xl font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>Export & summary</h2>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              onClick={() => setOpen(true)}
              className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left transition hover:-translate-y-0.5 ${theme === "dark" ? "border-white/10 bg-white/5" : "border-slate-200 bg-slate-50"}`}
            >
              <span className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>{action.label}</span>
              <Icon className="h-4 w-4 text-cyan-500" />
            </button>
          );
        })}
      </div>
    </div>
    <ExportModal open={open} onClose={() => setOpen(false)} theme={theme} onExport={handleExport} />
    </>
  );
}
