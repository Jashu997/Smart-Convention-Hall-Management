import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const packages = await prisma.package.findMany();

    return NextResponse.json(packages);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to load packages" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    const item = await prisma.package.create({
      data: {
        name: payload.name,
        price: Number(payload.price),
        description: payload.description,
      },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create package" },
      { status: 500 }
    );
  }
}