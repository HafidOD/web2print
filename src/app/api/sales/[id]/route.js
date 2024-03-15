import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function GET(request, { params }) {
  // console.log(request); ;
  try {
    const sale = await prisma.sale.findUnique({
      where: {
        id: parseInt(params.id),
      },
      include: {
        user: {
          include: {
            property: true,
          },
        },
      },
    });
    return NextResponse.json({ sale }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Error", error },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const deleteSale = await prisma.sale.delete({
      where: {
        id: parseInt(params.id),
      },
    });
    return NextResponse.json(
      {
        message: "Sale deleted",
        Sale: deleteSale,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Error", error },
      { status: 500 }
    );
  }
}
