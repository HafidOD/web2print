"use client";

import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import useCart from "@/app/hooks/use-cart";

export default function ButtonCheckout({ quantity, productId }) {
  const cart = useCart();
  const [counter, setCounter] = useState(quantity);
  // const onUpdate = useCart((state) => state.onUpdate);
  const plusCounter = () => {
    setCounter(counter + 1);
    // console.log(productId, counter);
    cart.updateItem(productId, counter + 1);
  };
  const minusCounter = () => {
    // Counter state is decremented
    if (counter > 1) {
      setCounter(counter - 1);
      cart.updateItem(productId, counter - 1);
      // onUpdate(productId, counter);
    } else {
      setCounter(1);
    }
  };
  // useEffect(
  //   (productId) => {
  //     // console.log(productId, counter);
  //   },
  //   [counter]
  // );

  // const onUpdate = () => {
  //   // console.log(productId, counter);
  //   // cart.updateItem(product.id, counter);
  // };

  return (
    <div className="flex flex-col justify-center pl-3">
      <div className="flex ">
        <button className="text-sm text-primaryBlue">
          <MinusCircleIcon
            className="w-6 h-6 "
            aria-hidden="true"
            onClick={minusCounter}
          />
        </button>
        <div className="">
          <input
            type="number"
            className="px-3 py-2 text-xs font-bold outline-none w-14 md:py-4 md:text-base text-primaryBlue"
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
    </div>
  );
}
