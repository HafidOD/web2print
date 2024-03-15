import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function GET(request, { params }) {
  try {
    const sales = await prisma.sale.findMany({
      where: {
        userId: parseInt(params.userId),
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json({ sales }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Error", error },
      { status: 500 }
    );
  }
}
