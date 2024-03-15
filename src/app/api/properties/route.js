import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function GET(request) {
  try {
    const properties = await prisma.property.findMany();
    return NextResponse.json({ properties: properties }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Error", error },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.formData();
    // console.log(data);

    const property = await prisma.property.create({
      data: {
        propertyName: data.get("propertyName"),
        email: data.get("propertyEmail"),
      },
    });
    // return NextResponse.json({ mensaje: "ok" }, { status: 200 });
    return NextResponse.json({ property }, { status: 200 });
  } catch (error) {
    console.log(error);
    if (error.code === "P2002") {
      // console.error(
      //   "Error de clave única: El valor ya existe en la base de datos."
      // );
      return NextResponse.json(
        {
          message:
            "Error de clave única: El valor ya existe en la base de datos",
        },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        { message: "Internal Error", error },
        { status: 500 }
      );
    }
  }
}
