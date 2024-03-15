import { NextResponse } from "next/server";
// import { writeFile } from "fs/promises";
// import path from "path";
import prisma from "@/libs/prisma";

// import {v2 as cloudinary} from 'cloudinary';

// cloudinary.config({
//   cloud_name: 'dfvesf8qn',
//   api_key: '118274489362436',
//   api_secret: 'Ez68b5lfWNMmQMjd5jr8IGXcY5Y'
// });

export async function GET(request, { params }) {
  try {
    const categories = await prisma.category.findMany({
      include: {
        enterprises: true,
        products: true,
      },
    });
    return NextResponse.json({ categories }, { status: 200 });
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
    // const imageCategory = data.get('imageCategory');
    // console.log(imageCategory);
    // if (imageCategory){
    //   const bytes = await imageCategory.arrayBuffer()
    //   const buffer = Buffer.from(bytes)

    // const logoPath = path.join(process.cwd(), 'public/images/categories', imageCategory.name)
    // await writeFile(logoPath, buffer)
    //   var res = await new Promise((resolve, reject) => {
    //   cloudinary.uploader
    //     .upload_stream(
    //       {
    //         resource_type: "image",
    //       },
    //       async (err, result) => {
    //         if (err) {
    //           console.log(err);
    //           reject(err);
    //         }

    //         resolve(result);
    //       }
    //     )
    //     .end(buffer);
    // });
    // }
    const enterpriseIds = data
      .get("enterprises")
      .split(",")
      .map((id) => ({ id: parseInt(id) }));
    // console.log(enterpriseIds);
    const category = await prisma.category.create({
      data: {
        categoryName: data.get("categoryName"),
        // imageCategory: res.secure_url,
        parentCategory: parseInt(data.get("parentCategory")),
        enterprises: {
          connect: enterpriseIds,
        },
      },
    });

    // return NextResponse.json({ message: "ok" }, { status: 200 });
    return NextResponse.json({ category }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Error", error },
      { status: 500 }
    );
  }
}
