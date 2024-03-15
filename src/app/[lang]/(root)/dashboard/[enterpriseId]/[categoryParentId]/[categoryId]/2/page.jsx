import ProductCard from "@/components/ProductCard";
import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";
import { getDictionary } from "@/utils/dictionary";
import Link from "next/link";

const URL = process.env.NEXT_PUBLIC_API_URL;
export async function fetchProducts(id, parentId, categoryId) {
  const res = await fetch(`${URL}/${id}/${parentId}/${categoryId}`, {
    cache: "no-cache",
  });
  const data = await res.json();
  // console.log(data);

  return data.products;
}
export default async function ProductPageCategory({ params }) {
  const lang = await getDictionary(params.lang);
  const { user } = await getServerSession(authOptions);
  // console.log(user);

  const products = await fetchProducts(
    params.enterpriseId,
    params.categoryParentId,
    params.categoryId
  );
  // console.log(params);
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full px-2 py-5 m-auto space-y-5 md:w-2/5 sm:px-0">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-center text-primaryBlue">
            {lang.products["select-items"]}
          </h3>
          {products.length === 0 && (
            <p className="px-4 py-6 bg-white rounded-lg">
              {lang.products["no-products"]}
            </p>
          )}
          {/* <ProductCard products={products}></ProductCard> */}
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              typePrice={user.typePrice}
              currency={user.currency}
              paramslang={lang}
            ></ProductCard>
          ))}
          <div className="flex justify-center">
            {products.length !== 0 && (
              <Link
                href={`/${params.lang}/dashboard/cart`}
                className="w-full text-white bg-primaryBlue hover:bg-primaryBlue focus:ring-0 font-bold rounded-lg text-md px-5 py-2.5 text-center"
              >
                {lang.products["view-cart"]}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
