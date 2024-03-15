"use client";

// import Image from "next/image";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import { toast } from "react-hot-toast";
import useCart from "@/app/hooks/use-cart";
import { useState } from "react";

// import ButtonProduct from "./ButtonProduct";

export default function ProductCard({
  params,
  product,
  typePrice,
  currency,
  paramslang,
}) {
  product.priceExtE = Math.round(product.priceLocal / 18.5);
  // console.log(params);
  // console.log(product.descriptionProduct == "null");
  // console.log(product);
  const prices = { 1: "priceLocal", 2: "priceNacional", 3: "priceExtE" };
  const priceProduct = product[prices[typePrice]];
  const cart = useCart();
  const data = {
    ...product,
    currency: currency,
    price: product[prices[typePrice]],
  };
  // const data2 = { ...product, price: product[prices[typePrice]] };
  // console.log(data2);
  // console.log(product);
  const [counter, setCounter] = useState(0);
  const plusCounter = () => {
    setCounter(counter + 1);
  };
  const minusCounter = () => {
    // Counter state is decremented
    if (counter > 0) {
      setCounter(counter - 1);
    } else {
      setCounter(0);
    }
  };
  const onAddToCart = (e) => {
    e.stopPropagation();
    if (counter > 0) {
      data.quantity = counter;
      data.total = counter * data.price;
      cart.addItem(data);
    } else {
      toast.error(paramslang.products["increase-number-items"]);
    }
  };
  // console.log(product[prices[typePrice]]);

  return (
    // <div className="flex items-center justify-between p-2 my-3 bg-white rounded-lg shadow-xl">
    <div>
      <a href={`${params.categoryParentId}/${product.id}`}>
        <div className="p-2 my-3 bg-white rounded-lg shadow-2xl">
          <div className="items-center">
            <img
              className="object-contain p-2"
              width={400}
              src={product.imageProduct}
              alt={product.nameProduct}
            />
            <div className="flex flex-col pl-4 justify-evenly">
              <h4 className="mb-2 text-sm font-semibold leading-tight md:text-lg text-primaryBlue">
                {product.nameProduct}
              </h4>
              <div>
                <p className="text-xs leading-normal text-secondGray md:text-sm">
                  {product.descriptionProduct}
                </p>
                {priceProduct != 0 && (
                  <p className="text-xs leading-normal text-secondGray md:text-sm">
                    ${priceProduct} {currency}
                  </p>
                )}
                {/* <p className="text-xs leading-normal text-secondGray md:text-sm">
              Stock: {product.stockProduct}
            </p> */}
                {/* <p className="text-xs leading-normal text-secondGray md:text-xs">
              {product.unitsPackage} {paramslang.products["pieces-unit"]}
            </p> */}
              </div>
            </div>
          </div>
          {/* <div className="flex flex-col justify-center pl-3 text-center">
            <p className="text-primaryBlue">Perzonalizar</p>
          </div> */}
        </div>
      </a>
    </div>
  );
}
