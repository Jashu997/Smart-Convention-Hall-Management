import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany();

    const totalBookings = bookings.length;

    const pending = bookings.filter(
      (booking) => booking.status === "Pending"
    ).length;

    const approved = bookings.filter(
      (booking) => booking.status === "Approved"
    ).length;

    const confirmed = bookings.filter(
      (booking) => booking.status === "Confirmed"
    ).length;

    const cancelled = bookings.filter(
      (booking) => booking.status === "Cancelled"
    ).length;

    const totalRevenue = bookings.reduce(
      (sum, booking) => sum + booking.estimatedTotal,
      0
    );

    return NextResponse.json({
      totalBookings,
      pending,
      approved,
      confirmed,
      cancelled,
      totalRevenue,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to load dashboard statistics." },
      { status: 500 }
    );
  }
}