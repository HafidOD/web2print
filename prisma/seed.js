// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
// import {
//   enterpises,
//   addresses,
//   users,
//   categories,
//   products,
// } from "./seeders/data";

const { PrismaClient } = require("@prisma/client");
const {
  enterpises,
  addresses,
  users,
  categories,
  products,
} = require("./seeders/data");
const prisma = new PrismaClient();

const main = async () => {
  try {
    // await prisma.category.deleteMany();
    // console.log("Deleted records in category table");

    // await prisma.product.deleteMany();
    // console.log("Deleted records in product table");

    // await prisma.$queryRaw`ALTER TABLE Product AUTO_INCREMENT = 1`;
    // console.log("reset product auto increment to 1");

    // await prisma.$queryRaw`ALTER TABLE Category AUTO_INCREMENT = 1`;
    // console.log("reset category auto increment to 1");

    // await prisma.enterprise.createMany({
    //   data: enterpises,
    // });
    // console.log("Added enterprises data");
    // await prisma.address.createMany({
    //   data: addresses,
    // });
    // console.log("Added addresses data");
    // await prisma.user.createMany({
    //   data: users,
    // });
    // console.log("Added users data");
    await prisma.category.createMany({
      data: categories,
    });
    console.log("Added categories data");

    await prisma.product.createMany({
      data: products,
    });
    console.log("Added products data");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

main();
