"use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";

export default function Enterpises({ enterprises, paramslang }) {
  // console.log(enterprises);
  return (
    // <div className="grid gap-3 lg:grid-cols-3 justify-items-center">
    <div className="flex flex-wrap justify-center justify-items-center">
      {/* <p>enterprise id = { enterprise }</p> */}
      {enterprises.map((enterprise) => {
        // console.log(enterprise.categories);
        const catparent = enterprise.categoryParent.split(",");
        // console.log(catparent.length);
        // console.log(enterprise.categories.length);
        {
          if (enterprise.categories.length == 1) {
            return (
              <a
                href={
                  catparent.length == 1
                    ? `/${paramslang}/dashboard/${enterprise.id}/${enterprise.categoryParent}/${enterprise.categories[0].id}/${enterprise.categoryParent}`
                    : `/${paramslang}/dashboard/${enterprise.id}/`
                }
                className="w-full px-4 lg:w-1/3"
                key={enterprise.id}
              >
                <div className="w-full bg-white rounded-sm shadow-lg lg:max-w-sm">
                  <img
                    className="object-contain w-full h-48 p-4"
                    src={enterprise.logo}
                    alt={enterprise.enterpriseName}
                  />
                </div>
                <div className="p-3">
                  <h4 className="text-center text-md text-primaryBlue">
                    {enterprise.enterpriseName}
                  </h4>
                </div>
              </a>
            );
          } else {
            return (
              <a
                href={
                  catparent.length == 1
                    ? `/${paramslang}/dashboard/${enterprise.id}/${enterprise.categoryParent}/`
                    : `/${paramslang}/dashboard/${enterprise.id}/`
                }
                className="w-full px-4 lg:w-1/3"
                key={enterprise.id}
              >
                <div className="w-full bg-white rounded-sm shadow-lg lg:max-w-sm">
                  <img
                    className="object-contain w-full h-48 p-4"
                    src={enterprise.logo}
                    alt={enterprise.enterpriseName}
                  />
                </div>
                <div className="p-3">
                  <h4 className="text-center text-md text-primaryBlue">
                    {enterprise.enterpriseName}
                  </h4>
                </div>
              </a>
            );
          }
        }
      })}
    </div>
  );
}
