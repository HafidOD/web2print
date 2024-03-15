"use client";
import useCart from "@/app/hooks/use-cart";
import useAddress from "@/app/hooks/use-address";
import { useEffect, useState } from "react";
import SummaryListProducts from "@/components/SummaryListProducts";
import { TruckIcon } from "@heroicons/react/24/solid";

export default function SummaryProducts({ paramslang }) {
  const [isMounted, setIsMounted] = useState(false);
  // const cart = useCart();
  const items = useCart((state) => state.items);
  const address = useAddress((state) => state.address);
  // console.log(items);
  // console.log(address);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  const totalPrice = items.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);
  return (
    <div>
      {items.length === 0 && (
        <p className="mb-2 text-md text-primaryBlue">
          {paramslang.products["no-products-cart"]}
          No hay productos en el carrito
        </p>
      )}
      <ul role="list" className="divide-y divide-gray-100">
        {items.map((product) => (
          // <p key={product.id}>{product.nameProduct}</p>
          <SummaryListProducts
            key={product.id}
            product={product}
          ></SummaryListProducts>
        ))}
        {address.price != 0 && (
          <li className="flex items-center justify-between py-4 gap-x-6">
            <div className="flex items-center gap-x-4">
              <div className="px-2">
                {/* w-12 h-12 img */}
                <TruckIcon className="w-8 h-8" aria-hidden="true" />
              </div>
              <div className="flex-auto min-w-0">
                <p className="text-xs font-semibold leading-tight md:text-sm text-primaryBlue">
                  {paramslang.addresses["shipping cost"]}
                </p>
              </div>
            </div>
            <div className="justify-center sm:flex sm:flex-col sm:items-end ">
              <div className="flex">
                <div className="flex items-center justify-center ml-3">
                  <p className="text-xs md:text-sm">${address.price} USD</p>
                </div>
              </div>
            </div>
          </li>
        )}
      </ul>
      <div className="pt-2 border-t-2 border-t-gray-200">
        <p className="text-end">
          Total: ${totalPrice + address.price} {items[0].currency}
        </p>
      </div>
    </div>
  );
}
