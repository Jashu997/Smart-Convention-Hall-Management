import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function PUT(
  request: Request,
  { params }: Params
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const hall = await prisma.hallDetails.update({
      where: { id },
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

    return NextResponse.json(hall);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to update hall details" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: Params
) {
  try {
    const { id } = await params;

    await prisma.hallDetails.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to delete hall details" },
      { status: 500 }
    );
  }
}