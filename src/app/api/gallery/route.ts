import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const gallery = await prisma.gallery.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(gallery);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to load gallery" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const image = await prisma.gallery.create({
      data: {
        title: body.title,
        imageUrl: body.imageUrl,
      },
    });

    return NextResponse.json(image, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create image" },
      { status: 500 }
    );
  }
}