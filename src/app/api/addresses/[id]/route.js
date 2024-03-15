import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function GET(request, { params }) {
  // console.log(request); ;
  try {
    const address = await prisma.address.findUnique({
      where: {
        id: parseInt(params.id),
      },
      include: {
        enterprise: true,
      },
    });
    return NextResponse.json({ address }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Error", error },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.formData();
    // console.log(data);
    const address = await prisma.address.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        officeName: data.get("officeName"),
        address: data.get("address"),
        city: data.get("city"),
        country: data.get("country"),
        state: data.get("state"),
        postalCode: parseInt(data.get("postalCode")),
        // enterpriseId: parseInt(data.get('enterpriseId'))
      },
    });

    // return NextResponse.json({ mensaje: "ok" }, { status: 200 });
    return NextResponse.json({ address }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Error", error },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const deleteAddress = await prisma.address.delete({
      where: {
        id: parseInt(params.id),
      },
    });
    return NextResponse.json(
      {
        message: "Address deleted",
        enterprise: deleteAddress,
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
