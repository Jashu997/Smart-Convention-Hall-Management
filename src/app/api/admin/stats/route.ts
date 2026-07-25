import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const totalBookings = await prisma.booking.count();

    const pending = await prisma.booking.count({
      where: { status: "Pending" },
    });

    const approved = await prisma.booking.count({
      where: { status: "Approved" },
    });

    const confirmed = await prisma.booking.count({
      where: { status: "Confirmed" },
    });

    const cancelled = await prisma.booking.count({
      where: { status: "Cancelled" },
    });

    const revenue = await prisma.booking.aggregate({
      _sum: {
        estimatedTotal: true,
      },
    });

    return NextResponse.json({
      totalBookings,
      pending,
      approved,
      confirmed,
      cancelled,
      totalRevenue: revenue._sum.estimatedTotal ?? 0,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to load stats" },
      { status: 500 }
    );
  }
}