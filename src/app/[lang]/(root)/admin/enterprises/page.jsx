import ButtonsActionAdmin from "@/components/ButtonsActionAdmin";
import { PlusSmallIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { getDictionary } from "@/utils/dictionary";
export const dynamic = "force-dynamic";

export async function fetchEnterprisesAdmin() {
  const URL = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${URL}/enterprises/`, { cache: "no-cache" });
  if (res.ok) {
    const data = await res.json();
    // console.log(data);

    return data.enterprises;
  }
  return [];
}
export default async function AdminEnterprisesPage({ params }) {
  const lang = await getDictionary(params.lang);
  // console.log(lang);
  const enterprises = await fetchEnterprisesAdmin();
  // console.log(enterprises);

  return (
    <div className="w-full px-2 pt-8 m-auto md:w-3/5 sm:px-0">
      <section className="flex justify-between">
        <div className="mb-8">
          <h3 className="text-xl font-bold text-center text-primaryBlue">
            {lang.admin.brands}
          </h3>
        </div>
        <div>
          <Link
            href={`/${params.lang}/admin/enterprises/nuevo`}
            className="flex text-white bg-primaryBlue font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            {lang.admin.new}
            <PlusSmallIcon className="block w-5 h-5 ml-1" aria-hidden="true" />
          </Link>
        </div>
      </section>
      <div className="p-4 mt-5 bg-white rounded-lg shadow-lg">
        {enterprises.length === 0 && (
          <p className="mb-2">Aun no hay empresas agregadas</p>
        )}
        <ul role="list" className="divide-y divide-gray-100">
          {enterprises.map((enterprise) => (
            <li
              key={enterprise.id}
              className="flex items-center justify-between py-2 gap-x-6"
            >
              <div className="flex items-center gap-x-4">
                <img
                  className="flex-none object-contain w-12 h-12 rounded-full"
                  src={enterprise.logo}
                  alt={enterprise.enterpriseName}
                />
                <div className="flex-auto min-w-0">
                  <p className="text-xs font-semibold leading-tight text-primaryBlue md:text-sm">
                    {enterprise.enterpriseName}
                  </p>
                  {/* <p className="mt-1 text-xs leading-5 text-gray-500 truncate">
                    ${product.price} {product.currency}
                  </p> */}
                </div>
              </div>
              <div className="justify-center sm:flex sm:flex-col sm:items-end ">
                <ButtonsActionAdmin
                  itemURL={"enterprises"}
                  id={enterprise.id}
                  paramslang={params.lang}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
