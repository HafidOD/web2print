import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function GET(request, { params }) {
  // console.log(params.userId);
  const custom = {
    id: 0,
    officeName: "Otra Dirección",
    address:
      "Uno de nuestros asesores te contactara para confirmar tu dirección de envió",
  };
  try {
    const addresses = await prisma.address.findMany({
      where: {
        users: {
          some: {
            id: parseInt(params.userId),
          },
        },
      },
      include: {
        enterprise: {
          select: {
            id: true,
            enterpriseName: true,
          },
        },
      },
    });
    addresses.push(custom);
    return NextResponse.json({ addresses }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Error", error },
      { status: 500 }
    );
  }
}
