import ContentForm from "./components/ContentForm";
import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";

const URL = process.env.NEXT_PUBLIC_API_URL;
export async function fetchProduct(id) {
  const res = await fetch(`${URL}/products/${id}/`, {
    cache: "no-cache",
  });
  const data = await res.json();
  // console.log(data);

  return data.product;
}

export default async function PritingPage({ params }) {
  // console.log(params);
  const { user } = await getServerSession(authOptions);
  // console.log(user);
  const product = await fetchProduct(params.productId);
  // console.log(product);
  return (
    <div>
      <h2 className="mb-5 text-2xl text-primaryBlue">{product.nameProduct}</h2>

      <section className="">
        <ContentForm product={product} user={user} params={params} />
        {/* <div className="w-full p-2 my-3 bg-white rounded-lg shadow-2xl md:w-2/3">
          <ContentForm />
        </div>
        <div className="">
          <p>Canva</p>
          <img src={product.imageProduct} width={500} alt="" />
          <br />
          <br />
          <img src={product.imageProduct} width={500} alt="" />
          <div className="flex flex-col items-center mt-6">
            <div className="w-full mb-4">
              <a
                href="#"
                className="block px-4 py-2 text-xs text-center text-white shadow bg-primaryBlue md:text-sm"
              >
                Generar PDF
              </a>
            </div>
            <div className="w-full">
              <a
                href={`${product.id}/info`}
                className="block px-4 py-2 text-xs text-center text-white shadow bg-primaryBlue md:text-sm"
              >
                Agregar al carrito
              </a>
            </div>
          </div>
        </div> */}
      </section>
    </div>
  );
}
