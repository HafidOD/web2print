import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import SalesList from "./components/SalesList";
import { getDictionary } from "@/utils/dictionary";

const URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchSales(userId) {
  const res = await fetch(`${URL}/sales/user/${userId}`);
  const data = await res.json();
  // console.log(data.sales);
  return data.sales;
}

export default async function pagePedidos({ params }) {
  const lang = await getDictionary(params.lang);
  const { user } = await getServerSession(authOptions);

  const sales = await fetchSales(user.id);
  return (
    <div className="w-full px-2 py-5 m-auto space-y-5 md:w-3/5 sm:px-0">
      <div>
        <h3 className="text-xl font-bold text-center text-primaryBlue">
          {lang.order["previous-orders"]}
        </h3>
      </div>
      <div className="mt-5 bg-white rounded-lg shadow-lg">
        {sales.length === 0 && (
          <p className="p-6">{lang.order["no-previous-orders"]}</p>
        )}

        <ul role="list" className="px-3 divide-y divide-gray-300">
          {sales.map((sale) => (
            <SalesList
              key={sale.id}
              sale={sale}
              address={sale.address}
              paramslang={params.lang}
            ></SalesList>
          ))}
        </ul>
      </div>
    </div>
  );
}
