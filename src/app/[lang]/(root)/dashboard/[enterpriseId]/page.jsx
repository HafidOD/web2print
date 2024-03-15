import Link from "next/link";
import { PrinterIcon, TruckIcon } from "@heroicons/react/24/solid";
import { getDictionary } from "@/utils/dictionary";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";

const URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchEnterprises(id) {
  const res = await fetch(`${URL}/enterprises/${id}`, { cache: "no-store" });
  const data = await res.json();
  // console.log(data);

  return data.data;
}
export default async function EnterprisePage({ params }) {
  // console.log(params.lang);
  const lang = await getDictionary(params.lang);
  const enterprise = await fetchEnterprises(params.enterpriseId);
  // console.log(enterprise);
  // console.log(enterprise.categoryParent);
  // console.log(params.enterpriseId);
  if (!enterprise) {
    redirect("/dashboard");
  }
  // console.log(enterprise);
  return (
    <div className="flex flex-col items-center justify-center h-96">
      <div className="w-full px-2 py-5 m-auto space-y-5 md:w-2/5 sm:px-0">
        <div>
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-center text-primaryBlue">
              {lang.dashboard["what-would-you-like"]}
            </h3>
            {enterprise.categoryParent.includes("1") && (
              <a
                className="block w-full text-white bg-primaryBlue hover:bg-primaryBlue focus:ring-4 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 text-center"
                href={`${params.enterpriseId}/1`}
                // href="/dashboard/impresion"
              >
                <PrinterIcon
                  className="inline-block w-6 h-6 mx-3"
                  aria-hidden="true"
                />
                Creación de archivos para impresión
              </a>
            )}
            {enterprise.categoryParent.includes("2") && (
              <a
                className="block w-full text-white bg-primaryBlue hover:bg-primaryBlue focus:ring-4 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 text-center"
                href={`${params.enterpriseId}/2`}
              >
                <TruckIcon
                  className="inline-block w-6 h-6 mx-3"
                  aria-hidden="true"
                />
                {lang.dashboard["inventory-shipment"]}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
