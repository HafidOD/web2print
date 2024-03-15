import ButtonsActionAdmin from "@/components/ButtonsActionAdmin";
import Pagination from "@/components/Pagination";
import Search from "@/components/Search";
import { PlusSmallIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { getDictionary } from "@/utils/dictionary";
export const dynamic = "force-dynamic";

export async function fetchProductsAdmin() {
  const URL = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${URL}/products/`, { cache: "no-store" });
  if (res.ok) {
    const data = await res.json();
    // console.log(data);

    return data.products;
  }
  return [];
}
export default async function AdminProductsPage({ params }) {
  const lang = await getDictionary(params.lang);
  const products = await fetchProductsAdmin();
  const productLength = products.length;

  // console.log(productLength);
  return (
    <div className="w-full px-2 pt-8 m-auto md:w-3/5 sm:px-0">
      {/* <section className="mb-4">
        <div></div>
      </section> */}
      <section className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-primaryBlue">
          {lang.admin.items}
        </h3>
        {/* <div>
          <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
                className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Todos
                {selectedOption ? selectedOption.label : "Select an option"}
              </button>
            </div>
            <div className="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <button
                  className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Todos
                </button>
                {options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSelect(option)}
                    className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div> */}
        {/* <div className="w-full">
          <Search />
        </div> */}
        <div>
          <Link
            href={`/${params.lang}/admin/products/nuevo`}
            className="flex text-white bg-primaryBlue font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            {lang.admin.new}
            <PlusSmallIcon className="block w-5 h-5 ml-1" aria-hidden="true" />
          </Link>
        </div>
      </section>
      <div className="p-4 mt-5 bg-white rounded-lg shadow-lg">
        {products.length === 0 && <p className="mb-2">Aun no hay productos</p>}
        <ul role="list" className="divide-y divide-gray-100">
          {products.map((product) => (
            <li
              key={product.id}
              className="items-center justify-between block py-4 md:flex gap-x-6"
            >
              <div className="flex items-center gap-x-4">
                <img
                  className="flex-none object-contain w-12 h-12 rounded-full"
                  src={product.imageProduct}
                  alt={product.nameProduct}
                />
                <div className="flex-auto min-w-0">
                  <p className="text-xs font-semibold leading-tight text-primaryBlue md:text-sm">
                    {product.nameProduct}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-gray-500 truncate">
                    SKU: {product.sku}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-gray-500 truncate">
                    {lang.products["local-price"]}: ${product.priceLocal},
                    {lang.products["national-price"]}: ${product.priceNacional},
                    {lang.products["foreign-price"]}: $
                    {Math.round(product.priceLocal / 18.5)}
                    {/* {lang.products["foreign-price"]}: ${product.priceExt} */}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-gray-500 truncate">
                    {lang.products["brand"]}: {product.enterpriseId}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-gray-500 truncate">
                    {lang.products["category"]}:{" "}
                    {product.categories.map(
                      (category) => category.categoryName
                    )}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-gray-500 truncate">
                    Stock: {product.stockProduct},{" "}
                    {lang.products["units-package"]}: {product.unitsPackage}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-gray-500 truncate">
                    {lang.products["visibility"]}:{" "}
                    {product.published
                      ? lang.products["published"]
                      : lang.products["draft"]}
                  </p>
                </div>
              </div>
              <div className="justify-center sm:flex sm:flex-col sm:items-end ">
                <ButtonsActionAdmin
                  id={product.id}
                  itemURL={"products"}
                  paramslang={params.lang}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* <div>
        <Pagination productLength={productLength} />
      </div> */}
    </div>
  );
}
