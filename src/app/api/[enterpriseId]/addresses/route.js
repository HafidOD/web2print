import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function GET(request, { params }) {
  // console.log(params.enterpriseId);
  try {
    const addresses = await prisma.address.findMany({
      where: {
        enterpriseId: parseInt(params.enterpriseId),
      },
      include: {
        users: true,
      },
      // include: {
      //   users: {
      //     where: {
      //       id: 5,
      //     },
      //   },
      // },
    });
    return NextResponse.json({ addresses }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Error", error },
      { status: 500 }
    );
  }
}

// export async function POST(request) {
//   const { ...newEnterprise } = await request.json();
//   const enterprise = await prisma.enterprise.create({
//     data: newEnterprise,
//   });
//   return NextResponse.json({ enterprise }, { status: 200 });
// }
