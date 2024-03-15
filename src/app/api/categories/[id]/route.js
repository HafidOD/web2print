import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { writeFile } from "fs/promises";
import path from "path";

export async function GET(request, { params }) {
  // console.log(request); ;
  try {
    const category = await prisma.category.findUnique({
      where: {
        id: parseInt(params.id),
      },
      include: {
        products: true,
        enterprises: true,
      },
    });
    return NextResponse.json({ category }, { status: 200 });
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
    const logo = data.get("imageCategory");
    var pathImg = "";
    // //  console.log(logo);
    if (logo) {
      const bytes = await logo.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const logoPath = path.join(
        process.cwd(),
        "public/images/categories",
        logo.name
      );
      await writeFile(logoPath, buffer);
      pathImg = `/images/categories/${logo.name}`;
    } else {
      pathImg = data.get("old_image");
    }
    const enterpriseIds = data
      .get("enterprises")
      .split(",")
      .map((id) => ({ id: parseInt(id) }));
    // console.log(enterpriseIds);
    const category = await prisma.category.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        categoryName: data.get("categoryName"),
        // imageCategory: pathImg,
        parentCategory: parseInt(data.get("parentCategory")),
        enterprises: {
          set: enterpriseIds,
        },
      },
    });

    // return NextResponse.json({ message: "ok" }, { status: 200 });
    return NextResponse.json({ category }, { status: 200 });
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
    const deleteCategory = await prisma.category.delete({
      where: {
        id: parseInt(params.id),
      },
    });
    return NextResponse.json(
      {
        message: "Category deleted",
        enterprise: deleteCategory,
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
