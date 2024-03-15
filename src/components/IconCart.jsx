"use client";
import Link from "next/link";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import userCart from "@/app/hooks/use-cart";
import { useEffect, useState } from "react";

export default function IconCart({ paramslang }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const cart = userCart();

  if (!isMounted) {
    return null;
  }
  return (
    <Link
      href={`/${paramslang}/dashboard/cart`}
      className="flow-root px-3 py-1 ml-4 bg-white rounded-full lg:ml-6"
    >
      <div className="flex items-center group">
        <ShoppingBagIcon
          className="flex-shrink-0 w-6 h-6 text-primaryBlue"
          aria-hidden="true"
        />
        <span className="ml-2 text-sm font-bold text-primaryBlue">
          {cart.items.length}
        </span>
        <span className="sr-only">Ir al carrito</span>
      </div>
    </Link>
  );
}
