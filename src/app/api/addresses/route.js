import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
export async function GET(request) {
  try {
    const addresses = await prisma.address.findMany({
      include: {
        enterprise: true,
        users: true,
        // property: true,
      },
    });
    return NextResponse.json({ addresses }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Error", error },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    // const { ...newAddress } = await request.json();
    const data = await request.formData();
    // console.log(data);
    const address = await prisma.address.create({
      data: {
        officeName: data.get("officeName"),
        address: data.get("address"),
        city: data.get("city"),
        country: data.get("country"),
        state: data.get("state"),
        postalCode: parseInt(data.get("postalCode")),
        // enterpriseId: parseInt(data.get("enterpriseId")),
      },
    });
    // return NextResponse.json({ message: "ok" }, { status: 200 });
    return NextResponse.json({ address }, { status: 200 });
  } catch (error) {
    // console.log(error);
    return NextResponse.json(
      { message: "Internal Error", error },
      { status: 500 }
    );
  }
}
