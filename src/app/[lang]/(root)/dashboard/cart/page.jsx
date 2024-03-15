"use client";
import ProductList from "@/components/ProductList";
import useCart from "@/app/hooks/use-cart";
import Link from "next/link";
import { useEffect, useState } from "react";

const lang = {
  en: {
    "purchase-summary": "Purchase summary",
    "select-address": "Select an address",
    "no-products": "There are no products in the cart",
  },
  es: {
    "purchase-summary": "Resumen de compra",
    "select-address": "Seleccionar dirección",
    "no-products": "No hay productos en el carrito",
  },
};

export default function CheckoutPage({ params }) {
  // console.log(params.lang);
  // console.log(lang[params.lang]["purchase-summary"]);
  const [isMounted, setIsMounted] = useState(false);
  // const cart = useCart();
  const items = useCart((state) => state.items);
  // console.log(items);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  const totalPrice = items.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);

  // console.log(totalPrice);
  return (
    <div className="w-full px-2 py-5 m-auto space-y-5 md:w-2/5 sm:px-0">
      <div>
        <h3 className="mb-4 text-xl font-bold text-center text-primaryBlue">
          {lang[params.lang]["purchase-summary"]}
        </h3>
      </div>
      <div className="p-4 mt-5 bg-white rounded-lg shadow-lg">
        {items.length === 0 && (
          <p className="mb-2">{lang[params.lang]["no-products"]}</p>
        )}
        <ul role="list" className="divide-y divide-gray-100">
          {items.map((product) => (
            // <p key={product.id}>{product.nameProduct}</p>
            <ProductList key={product.id} product={product}></ProductList>
          ))}
        </ul>
        {items.length !== 0 && (
          <div className="pt-2 border-t-2 border-t-gray-200">
            {totalPrice != 0 && (
              <p className="text-end">
                Total: ${totalPrice} {items[0].currency}
              </p>
            )}
          </div>
        )}
      </div>
      {items.length !== 0 && (
        <div>
          <div className="flex justify-center mb-4">
            <Link
              href={`/${params.lang}/dashboard/direccion`}
              className="w-full text-white bg-primaryBlue font-bold rounded-lg text-md px-5 py-2.5 text-center"
            >
              {lang[params.lang]["select-address"]}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
