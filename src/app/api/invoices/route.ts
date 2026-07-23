import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateInvoicePdf } from "@/lib/generateInvoice";
import { packages, services as availableServices } from "@/lib/data";

function formatInvoiceDate(value: Date | string) {
  const date = new Date(value);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function buildInvoiceNumber(bookingId: string) {
  return `INV-${bookingId.slice(0, 8).toUpperCase()}`;
}

export async function POST(request: Request) {
  try {
    const payload = await request.json().catch(() => ({}));
    const bookingId = typeof payload?.bookingId === "string" ? payload.bookingId : "";

    if (!bookingId) {
      return NextResponse.json({ error: "Booking ID is required" }, { status: 400 });
    }

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    const hall = await prisma.hallDetails.findFirst();
    const invoiceNumber = buildInvoiceNumber(booking.id);

    const selectedPackage = packages.find(
      (pkg) => pkg.title === booking.packageType
    );
    const packageAmount = selectedPackage?.price ?? booking.estimatedTotal;

    const selectedServiceNames = booking.services
      ? booking.services.split(",").map((item) => item.trim()).filter(Boolean)
      : [];

    const selectedServicesAmount = availableServices
      .filter((service) => selectedServiceNames.includes(service.name))
      .reduce((sum, service) => sum + service.price, 0);

    const serviceFee = 5000;

    const pdfBuffer = generateInvoicePdf({
      invoiceId: booking.id,
      invoiceNumber,
      customerName: booking.customerName,
      email: booking.email,
      phone: booking.phone,
      eventType: booking.eventType,
      packageType: booking.packageType,
      eventDate: formatInvoiceDate(booking.eventDate),
      services: booking.services?.trim() || "No additional services selected",
      notes: booking.notes?.trim() || "No special notes provided",
      amount: packageAmount,
      serviceCharges: selectedServicesAmount,
      serviceFee,
      advancePayment: 0,
      hallName: hall?.name || "Sri Sarvamangala Kalyana Mandapam",
      hallAddress: hall?.address || "Narasannapeta, Andhra Pradesh",
      hallPhone: hall?.phone || "+91 9876543210",
      hallEmail: hall?.email || "info@srisarvamangala.com",
      issueDate: formatInvoiceDate(new Date()),
    });

    return new NextResponse(Buffer.from(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Sri-Sarvamangala-Invoice-${invoiceNumber}.pdf"`,
        "X-Invoice-Number": invoiceNumber,
      },
    });
  } catch (error) {
    console.error("Invoice generation failed", error);
    return NextResponse.json({ error: "Invoice generation failed" }, { status: 500 });
  }
}
