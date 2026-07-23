import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    if (
      !payload.customerName ||
      !payload.email ||
      !payload.phone ||
      !payload.eventDate ||
      !payload.packageType
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.create({
      data: {
        customerName: payload.customerName,
        email: payload.email,
        phone: payload.phone,
        eventType: payload.eventType,
        packageType: payload.packageType,
        eventDate: new Date(payload.eventDate),
        services: Array.isArray(payload.services)
          ? payload.services.join(", ")
          : payload.services ?? "",
        notes: payload.notes ?? "",
        estimatedTotal: Number(payload.estimatedTotal),
        status: "Pending",
      },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error("========== BOOKING API ERROR ==========");
    console.error(error);
    console.error("=======================================");

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown Error",
      },
      { status: 500 }
    );
  }
}