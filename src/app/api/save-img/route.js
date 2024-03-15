import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs";

export async function POST(request) {
  try {
    const data = await request.json();
    // console.log(data);
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 18);

    const base64Data = await data.replace(/^data:image\/png;base64,/, "");
    fs.writeFileSync(
      `public/images/tar/${timestamp}_${randomString}.png`,
      base64Data,
      "base64"
    );

    // if (imageProduct) {
    //   const bytes = await imageProduct.arrayBuffer();
    //   const buffer = Buffer.from(bytes);

    //   const logoPath = path.join(
    //     process.cwd(),
    //     "public/images/products",
    //     imageProduct.name
    //   );
    //   await writeFile(logoPath, buffer);
    //   pathImg = `/images/products/${imageProduct.name}`;
    // }

    return NextResponse.json(
      { imageName: `${timestamp}_${randomString}.png` },
      { status: 200 }
    );
    // return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Internal Error", error },
      { status: 500 }
    );
  }
}
