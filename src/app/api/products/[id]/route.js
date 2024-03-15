import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { writeFile } from "fs/promises";
import path from "path";

export async function GET(request, { params }) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(params.id),
      },
      include: {
        categories: true,
      },
    });
    return NextResponse.json({ product }, { status: 200 });
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
    const logo = data.get("imageProduct");
    var pathImg = "";
    if (logo) {
      const bytes = await logo.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const logoPath = path.join(
        process.cwd(),
        "public/images/products",
        logo.name
      );
      await writeFile(logoPath, buffer);
      pathImg = `/images/products/${logo.name}`;
    } else {
      pathImg = data.get("old_image");
    }
    const categoriesIds = data
      .get("categories")
      .split(",")
      .map((id) => ({ id: parseInt(id) }));
    const booleanValue = data.get("published") === "true";

    const product = await prisma.product.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        sku: data.get("sku"),
        nameProduct: data.get("nameProduct"),
        imageProduct: pathImg,
        priceLocal: parseFloat(data.get("priceLocal")),
        priceNacional: parseFloat(data.get("priceNacional")),
        // priceExt: parseFloat(data.get("priceExt")),
        descriptionProduct: data.get("descriptionProduct"),
        stockProduct: parseInt(data.get("stockProduct")),
        unitsPackage: parseInt(data.get("unitsPackage")),
        published: booleanValue,
        enterpriseId: parseInt(data.get("enterpriseId")),
        categories: {
          set: categoriesIds,
        },
      },
    });
    // return NextResponse.json({ mensaje: "ok" }, { status: 200 });
    return NextResponse.json({ product }, { status: 200 });
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
    const productDeleted = await prisma.product.delete({
      where: {
        id: parseInt(params.id),
      },
    });
    return NextResponse.json(
      {
        message: "Product deleted",
        enterprise: productDeleted,
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
