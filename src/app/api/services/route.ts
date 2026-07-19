import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const services = await prisma.service.findMany();

    return NextResponse.json(services);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to load services" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    const service = await prisma.service.create({
      data: {
        name: payload.name,
        price: Number(payload.price),
      },
    });

    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500 }
    );
  }
}