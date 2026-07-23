import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const hall = await prisma.hallDetails.findMany();

    return NextResponse.json(hall);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to load hall details" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const hall = await prisma.hallDetails.create({
      data: {
        name: body.name,
        description: body.description,
        address: body.address,
        phone: body.phone,
        email: body.email,
        capacity: Number(body.capacity),
        mapUrl: body.mapUrl,
        heroImage: body.heroImage,
      },
    });

    return NextResponse.json(hall, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create hall details" },
      { status: 500 }
    );
  }
}