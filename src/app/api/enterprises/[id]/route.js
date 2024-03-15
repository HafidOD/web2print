import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { writeFile } from "fs/promises";
import path from "path";

export async function GET(request, { params }) {
  // console.log(request); ;

  try {
    const enterprise = await prisma.enterprise.findUnique({
      where: {
        id: parseInt(params.id),
      },
      include: {
        addresses: true,
        users: true,
        categories: true,
        products: true,
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

export async function PUT(request, { params }) {
  try {
    const data = await request.formData();
    const logo = data.get("logo");
    var pathImg = "";
    if (logo) {
      const bytes = await logo.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const logoPath = path.join(
        process.cwd(),
        "public/images/enterprises/logos",
        logo.name
      );
      await writeFile(logoPath, buffer);
      pathImg = `/images/enterprises/logos/${logo.name}`;
    } else {
      pathImg = data.get("old_logo");
    }
    const enterprise = await prisma.enterprise.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        enterpriseName: data.get("enterpriseName"),
        categoryParent: data.get("enterpriseParentCat"),
        logo: pathImg,
      },
    });
    // return NextResponse.json({ mensaje: "ok" }, { status: 200 });
    return NextResponse.json({ enterprise }, { status: 200 });
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
    const deleteEnterprise = await prisma.enterprise.delete({
      where: {
        id: parseInt(params.id),
      },
    });
    return NextResponse.json(
      {
        message: "Enterprise deleted",
        enterprise: deleteEnterprise,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse(
      { message: "Internal Error", error },
      { status: 500 }
    );
  }
}
