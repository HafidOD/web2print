import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import bcrypt from "bcryptjs";

export async function GET(request, { params }) {
  // console.log(request); ;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(params.id),
      },
      include: {
        enterprises: {
          include: {
            categories: true,
          },
        },
        addresses: true,
        property: true,
      },
    });
    return NextResponse.json({ data: user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Error", error },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  // cosnt updateData = await re
  try {
    const data = await request.formData();
    // console.log(data);
    let newPassword = data.get("new_password");
    let password = "";
    if (!newPassword) {
      password = data.get("old_password");
    } else {
      password = await bcrypt.hash(data.get("new_password"), 10);
    }
    // console.log(password);
    const enterpriseIds = data
      .get("enterprises")
      .split(",")
      .map((id) => ({ id: parseInt(id) }));
    const addressIds = data
      .get("addresses")
      .split(",")
      .map((id) => ({ id: parseInt(id) }));
    const user = await prisma.user.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        propertyId: parseInt(data.get("propertyId")),
        email: data.get("email"),
        password: password,
        telefono: data.get("telefono"),
        userName: data.get("userName"),
        typePrice: parseInt(data.get("typePrice")),
        role: parseInt(data.get("role")),
        currency: data.get("currency"),
        enterprises: {
          set: enterpriseIds,
        },

        addresses: {
          set: addressIds,
        },
      },
      include: {
        enterprises: true,
      },
    });
    // return NextResponse.json({ mensage: "ok" }, { status: 200 });
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Error", error },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const deleteUser = await prisma.user.delete({
      where: {
        id: parseInt(params.id),
      },
    });
    return NextResponse.json(
      {
        message: "User deleted",
        user: deleteUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Error", error },
      { status: 500 }
    );
  }
}
