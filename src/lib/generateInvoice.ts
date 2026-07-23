import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export interface InvoiceData {
  invoiceId: string;
  invoiceNumber: string;
  customerName: string;
  email: string;
  phone: string;
  eventType: string;
  packageType: string;
  eventDate: string;
  services: string | null;
  notes: string | null;
  amount: number;
  serviceCharges?: number;
  serviceFee?: number;
  advancePayment?: number;
  hallName: string;
  hallAddress: string;
  hallPhone: string;
  hallEmail?: string;
  issueDate: string;
}

function formatCurrency(value: number): string {
  return value.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function normalizeAmount(value: number | string): number {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }

  const parsed = Number.parseFloat(String(value).replace(/[^0-9.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function wrapText(doc: jsPDF, text: string, maxWidth: number): string[] {
  return doc.splitTextToSize(text, maxWidth);
}

export function generateInvoicePdf(data: InvoiceData): Buffer {
  const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 36;
  const contentWidth = pageWidth - margin * 2;
  const amountValue = normalizeAmount(data.amount);
  const serviceCharges = normalizeAmount(data.serviceCharges ?? 0);
  const advancePayment = normalizeAmount(data.advancePayment ?? 0);
  const serviceFee = normalizeAmount(data.serviceFee ?? 0);
  const totalAmount = amountValue + serviceCharges + serviceFee;
  const remainingBalance = Math.max(totalAmount - advancePayment, 0);

  doc.setFillColor(248, 250, 252);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  const pdfDoc = doc as jsPDF & {
    circle?: (x: number, y: number, radius: number, style?: string) => void;
    getTextWidth?: (text: string) => number;
  };

  doc.setFillColor(255, 255, 255);
  doc.roundedRect(margin - 8, margin - 8, contentWidth + 16, pageHeight - margin * 2 + 16, 14, 14, "F");

  doc.setFillColor(15, 118, 110);
  doc.roundedRect(margin, margin, contentWidth, 152, 14, 14, "F");
  // Subtle divider under the header to separate header from content
  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(0.8);
  doc.line(margin + 18, margin + 148, pageWidth - margin - 18, margin + 148);

  doc.setFillColor(255, 255, 255);
  doc.roundedRect(margin + 18, margin + 18, 78, 78, 10, 10, "F");
  // Placeholder circular emblem with initials
  const emblemCx = margin + 18 + 39;
  const emblemCy = margin + 18 + 39;
  doc.setFillColor(15, 118, 110);
  // draw filled circle (emblem)
  pdfDoc.circle?.(emblemCx, emblemCy, 28, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  const initials = "SS";
  const initialsWidth = pdfDoc.getTextWidth
    ? pdfDoc.getTextWidth(initials)
    : initials.length * 8;
  doc.text(initials, emblemCx - initialsWidth / 2, emblemCy + 6);

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  const hallNameLines = wrapText(doc, data.hallName, 220);
  let hallNameY = margin + 36;
  hallNameLines.forEach((line) => {
    doc.text(line, margin + 110, hallNameY);
    hallNameY += 14;
  });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const addressLines = wrapText(doc, data.hallAddress, 220);
  let addressY = hallNameY + 6;
  addressLines.forEach((line) => {
    doc.text(line, margin + 110, addressY);
    addressY += 12;
  });
  doc.text(`Phone: ${data.hallPhone}`, margin + 110, addressY + 4);
  doc.text(`Email: ${data.hallEmail || "info@srisarvamangala.com"}`, margin + 110, addressY + 18);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text(
    "OFFICIAL INVOICE",
    pageWidth - margin - 180,
    margin + 64
  );
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Invoice No: ${data.invoiceNumber}`, pageWidth - margin - 152, margin + 92);
  doc.text(`Invoice Date: ${data.issueDate}`, pageWidth - margin - 152, margin + 108);
  doc.text(`Booking ID: ${data.invoiceId}`, pageWidth - margin - 152, margin + 124);

  doc.setTextColor(15, 23, 42);
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.8);
  doc.line(margin + 18, margin + 160, pageWidth - margin - 18, margin + 160);

  doc.setFillColor(250, 250, 250);
  doc.roundedRect(margin + 18, margin + 176, contentWidth - 36, 98, 10, 10, "F");
  doc.setDrawColor(15, 118, 110);
  doc.roundedRect(margin + 18, margin + 176, contentWidth - 36, 98, 10, 10, "S");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Bill To", margin + 30, margin + 198);
  doc.text("Event Details", pageWidth - margin - 150, margin + 198);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(data.customerName, margin + 30, margin + 216);
  doc.text(data.phone, margin + 30, margin + 232);
  doc.text(data.email, margin + 30, margin + 248);
  doc.text(`Event Type: ${data.eventType}`, pageWidth - margin - 150, margin + 216);
  doc.text(`Package: ${data.packageType}`, pageWidth - margin - 150, margin + 232);
  doc.text(`Event Date: ${data.eventDate}`, pageWidth - margin - 150, margin + 248);

  autoTable(doc, {
    startY: margin + 290,
    head: [["Item", "Details", "Amount"]],
    body: [
      ["Hall Package", `${data.eventType} • ${data.packageType}`, formatCurrency(amountValue)],
      ["Service Fee", "Booking service charge", formatCurrency(serviceFee)],
      ["Selected Services", data.services && data.services.trim() ? data.services : "No additional services selected", formatCurrency(serviceCharges)],
      ["Advance Payment", "Received from customer", formatCurrency(advancePayment)],
    ],
    theme: "grid",
    styles: {
      fontSize: 10,
      cellPadding: 7,
      textColor: [15, 23, 42],
      lineColor: [226, 232, 240],
      lineWidth: 0.6,
      fillColor: [255, 255, 255],
    },
    headStyles: {
      fillColor: [15, 118, 110],
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    columnStyles: {
      0: { cellWidth: 120, fontStyle: "bold" },
      2: { halign: "right", fontStyle: "bold" },
    },
    margin: { left: margin + 18, right: margin + 18 },
  });

  const summaryY = (doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? margin + 380;
  doc.setFillColor(245, 247, 250);
  doc.roundedRect(margin + 18, summaryY + 16, contentWidth - 36, 114, 10, 10, "F");
  doc.setDrawColor(15, 118, 110);
  doc.roundedRect(margin + 18, summaryY + 16, contentWidth - 36, 114, 10, 10, "S");
  // Add a thin divider above notes to visually separate the payment summary
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.8);
  doc.line(margin + 30, summaryY + 140, pageWidth - margin - 30, summaryY + 140);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Payment Summary", margin + 30, summaryY + 40);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Package Amount: ${formatCurrency(amountValue)}`, margin + 30, summaryY + 60);
  doc.text(`Service Fee: ${formatCurrency(serviceFee)}`, margin + 30, summaryY + 80);
  doc.text(`Selected Services: ${formatCurrency(serviceCharges)}`, margin + 30, summaryY + 100);
  doc.text(`Advance Payment: ${formatCurrency(advancePayment)}`, margin + 30, summaryY + 120);
  doc.text(`Remaining Balance: ${formatCurrency(remainingBalance)}`, pageWidth - margin - 160, summaryY + 100);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text(`Total Amount: ${formatCurrency(totalAmount)}`, pageWidth - margin - 160, summaryY + 120);

  // Move special notes and signature below the summary box to avoid overlap
    // Special Notes Section
    const notesTitleY = summaryY + 150;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.text("Special Notes", margin + 30, notesTitleY);

    const notesText =
      data.notes && data.notes.trim()
        ? data.notes
        : "No special notes provided.";

    const notesLines = wrapText(doc, notesText, 240);

    const lineHeight = 12;
    let currentY = notesTitleY + 14;
    const maxY = pageHeight - margin - 80;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    for (const line of notesLines) {

      if (currentY + lineHeight > maxY) {
        doc.addPage();
        currentY = margin + 40;

        doc.setFont("helvetica", "bold");
        doc.setFontSize(10.5);
        doc.text(
          "Special Notes (continued)",
          margin + 30,
          currentY
        );

        currentY += 14;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
      }

      doc.text(
        line,
        margin + 30,
        currentY
      );

      currentY += lineHeight;
    }

      // Place signature after notes; if not enough room, move to new page
      let signatureY = currentY + 18;
      if (signatureY + 40 > pageHeight - margin) {
        doc.addPage();
        signatureY = margin + 60;
      }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.text("Authorized Signature", pageWidth - margin - 145, signatureY);
  doc.setLineWidth(0.8);
  doc.line(pageWidth - margin - 160, signatureY + 30, pageWidth - margin - 44, signatureY + 30);

  doc.setFont("helvetica", "italic");
  doc.setFontSize(9);
  const footerY = pageHeight - margin - 40;
  const halfWidth = contentWidth / 2 - 20;
  const leftFooterLines = wrapText(doc, "Thank you for choosing Sri Sarvamangala Kalyana Mandapam.", halfWidth);
  let fy = footerY;
  leftFooterLines.forEach((line) => {
    doc.text(line, margin + 30, fy);
    fy += 10;
  });
  const rightFooterLines = wrapText(doc, "Terms and conditions apply as per the hall policy.", halfWidth);
  let rfy = footerY;
  const rightX = margin + contentWidth / 2 + 10;
  rightFooterLines.forEach((line) => {
    doc.text(line, rightX, rfy);
    rfy += 10;
  });

  const pdfOutput = doc.output("arraybuffer");
  return Buffer.from(pdfOutput);
}
