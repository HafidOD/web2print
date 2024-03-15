"use client";

// import Image from "next/image";
import Link from "next/link";
// import { createContext, useContext, useState } from "react";

export default function Categories({ categories, params }) {
  // console.log(params);
  return (
    <div className="grid gap-3 lg:grid-cols-4 justify-items-center">
      {categories.map((category) => {
        return (
          <Link
            href={
              params.categoryParentId == 1
                ? `${params.categoryParentId}/${category.id}/${params.categoryParentId}`
                : `${params.categoryParentId}/${category.id}/${params.categoryParentId}`
            }
            // href={`${params.categoryParentId}/${category.id}/productos`}
            // href={category.id}
            className="w-full"
            key={category.id}
          >
            <div className="flex items-center justify-center w-full h-full bg-white rounded-lg shadow-md lg:max-w-sm border-l-6">
              {/* <img
                className="object-contain w-full h-48"
                src={category.imageCategory}
                alt={category.categoryName}
              /> */}
              <div className="p-4">
                <h4 className="text-xl font-semibold tracking-tight text-center text-primaryBlue">
                  {category.categoryName}
                </h4>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
