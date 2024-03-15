import { TrashIcon } from "@heroicons/react/24/solid";
import ButtonCheckout from "./ButtonCheckout";
import useCart from "@/app/hooks/use-cart";

export default function ProductList({ product }) {
  const cart = useCart();
  const onRemove = () => {
    cart.removeItem(product.id);
  };

  return (
    <li key={product.id} className="items-center justify-between py-2 gap-x-6">
      <div className="flex justify-between">
        <div className="flex items-center gap-x-4">
          <img
            className="flex-none object-contain w-12 h-12 rounded-full"
            src={product.imageProduct}
            alt={product.nameProduct}
          />
          <div className="flex-auto min-w-0">
            <p className="text-xs font-semibold leading-tight md:text-sm text-primaryBlue">
              {product.nameProduct}
            </p>
            {product.price != 0 && (
              <p className="mt-1 text-xs leading-5 truncate text-secondGray">
                ${product.price} {product.currency}
              </p>
            )}
          </div>
        </div>
        <div className="justify-center sm:flex sm:flex-col sm:items-end ">
          <div className="flex">
            <ButtonCheckout
              quantity={product.quantity}
              productId={product.id}
            ></ButtonCheckout>

            <div className="flex items-center justify-center ml-3 ">
              <button className="text-sm text-red-800" onClick={onRemove}>
                <TrashIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="justify-center ml-3 text-right ">
        <div className="flex justify-end">
          {product.price != 0 && (
            <>
              <p className="mr-2 text-xs md:text-sm">
                <b>Total del producto: </b>
              </p>
              <p className="text-xs md:text-sm">
                ${product.quantity * product.price} {product.currency}
              </p>
            </>
          )}
        </div>
      </div>
    </li>
  );
}
