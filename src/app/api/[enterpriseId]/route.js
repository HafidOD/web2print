import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function GET(request, { params }) {
  // console.log(params.enterpriseId);
  try {
    const enterprise = await prisma.enterprise.findMany({
      where: {
        id: parseInt(params.enterpriseId),
      },
    });
    return NextResponse.json({ data: enterprise }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Error", error },
      { status: 500 }
    );
  }
}