"use client";

// import Image from "next/image";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import { toast } from "react-hot-toast";
import useCart from "@/app/hooks/use-cart";
import { useState } from "react";

// import ButtonProduct from "./ButtonProduct";

export default function ProductCard({
  product,
  typePrice,
  currency,
  paramslang,
}) {
  product.priceExtE = Math.round(product.priceLocal / 18.5);

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
    <div className="flex items-center justify-between w-full p-2 my-3 bg-white rounded-lg shadow-xl">
      <div className="flex items-center">
        <img
          className="object-contain w-20 h-20 md:w-40 md:h-40"
          src={product.imageProduct}
          alt={product.nameProduct}
        />
        {/* <Image
        className="object-cover w-full"
        src="https://cdn.pixabay.com/photo/2022/08/18/09/20/houses-7394390__340.jpg"
        alt="Logo Grupo Regio"
        width={40}
        height={40}
      /> */}
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
            <p className="text-xs leading-normal text-secondGray md:text-sm">
              Stock: {product.stockProduct}
            </p>
            <p className="text-xs leading-normal text-secondGray md:text-xs">
              {product.unitsPackage} {paramslang.products["pieces-unit"]}
            </p>
          </div>
        </div>
      </div>
      {/* <ButtonProduct></ButtonProduct> */}
      <div className="flex flex-col justify-center pl-3">
        <div className="flex">
          <button className="text-sm text-primaryBlue">
            <MinusCircleIcon
              className="w-6 h-6 "
              aria-hidden="true"
              onClick={minusCounter}
            />
          </button>
          <div>
            <input
              type="number"
              className="w-12 px-4 py-2 text-xs font-bold outline-none md:py-4 md:text-base text-primaryBlue"
              value={counter}
              readOnly
            />
          </div>
          <button className="text-sm text-primaryBlue">
            <PlusCircleIcon
              className="w-6 h-6"
              aria-hidden="true"
              onClick={plusCounter}
            />
          </button>
        </div>
        <div className="flex justify-center w-full pt-2 md:pt-4">
          <button
            className="px-4 py-2 text-xs text-white rounded shadow bg-primaryBlue md:text-sm"
            onClick={onAddToCart}
          >
            {paramslang.products["add-to-card"]}
          </button>
        </div>
      </div>
    </div>
  );
}
