import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { writeFile } from "fs/promises";
import path from "path";

export async function GET(request) {
  try {
    const products = await prisma.product.findMany({
      // skip: 5,
      // take: 5,
      include: {
        enterprise: true,
        categories: true,
      },
    });
    return NextResponse.json({ products: products }, { status: 200 });
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
    const imageProduct = data.get("imageProduct");
    var pathImg = "";
    if (imageProduct) {
      const bytes = await imageProduct.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const logoPath = path.join(
        process.cwd(),
        "public/images/products",
        imageProduct.name
      );
      await writeFile(logoPath, buffer);
      pathImg = `/images/products/${imageProduct.name}`;
    } else {
      pathImg = data.get("old_image");
    }
    const categoriesIds = data
      .get("categories")
      .split(",")
      .map((id) => ({ id: parseInt(id) }));
    const booleanValue = data.get("published") === "true";
    // console.log(booleanValue);

    const product = await prisma.product.create({
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
          connect: categoriesIds,
        },
      },
    });
    // return NextResponse.json({ mensaje: "ok" }, { status: 200 });
    return NextResponse.json({ product }, { status: 200 });
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
