export default function ProductsSale({ product }) {
  // console.log(product);
  return (
    <li
      key={product.id}
      className="flex items-center justify-between py-2 gap-x-6"
    >
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
          <p className="mt-1 text-xs leading-5 text-gray-500 truncate">
            ${product.price} {product.currency}
          </p>
        </div>
      </div>
      <div className="justify-center sm:flex sm:flex-col sm:items-end ">
        <div className="flex">
          <div className="flex flex-col justify-center pl-3">
            <p className="text-xs md:text-sm">x {product.quantity}</p>
          </div>
          <div className="flex items-center justify-center ml-3">
            {product.total != 0 && (
              <p className="text-xs md:text-sm">
                ${product.total} {product.currency}
              </p>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}
