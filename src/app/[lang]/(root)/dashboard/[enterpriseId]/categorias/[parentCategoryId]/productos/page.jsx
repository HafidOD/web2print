import ProductCard from "@/components/ProductCard";
import Link from "next/link";

const URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchProducts() {
  const res = await fetch(`${URL}/products`,{ cache: 'no-store' });
  const data = await res.json();

  return data.products;
}

export default async function ProductsPage() {
  const products = await fetchProducts();
  // console.log(products);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full px-2 py-5 m-auto space-y-5 md:w-2/5 sm:px-0">
        <div className="space-y-4">
          <h3 className="text-xl font-medium text-center text-blue-700">
            Selecciona los productos
          </h3>

          {/* <ProductCard products={products}></ProductCard> */}
          {products.map((product) => (
            <ProductCard key={product.id} product={product}></ProductCard>
          ))}
          <div className="flex justify-center">
            <Link
              href="/dashboard/checkout"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Ver Carrito
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
