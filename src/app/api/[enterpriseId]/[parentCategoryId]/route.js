import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function GET(request, { params }) {
  // console.log(params.parentCategoryId);
  try {
    const categories = await prisma.category.findMany({
      where: {
        parentCategory: parseInt(params.parentCategoryId),
        enterprises: {
          some: {
            id: parseInt(params.enterpriseId),
          },
        },
      },
    });
    return NextResponse.json({ categories }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Error", error },
      { status: 500 }
    );
  }
}
