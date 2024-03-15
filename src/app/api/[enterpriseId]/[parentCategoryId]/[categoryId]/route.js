import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function GET(request, { params }) {
  // console.log(params.parentCategoryId);
  try {
    const products = await prisma.product.findMany({
      where: {
        // parentCategory: parseInt(params.parentCategoryId),
        published: true,
        enterpriseId: parseInt(params.enterpriseId),
        categories: {
          some: {
            id: parseInt(params.categoryId),
            parentCategory: parseInt(params.parentCategoryId),
          },
        },
      },
      include: {
        categories: true,
      },
    });
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Error", error },
      { status: 500 }
    );
  }
}
