import {
  ClipboardDocumentCheckIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import { format } from "date-fns";
import Link from "next/link";
import { getDictionary } from "@/utils/dictionary";
export default async function SalesList({ sale, address, paramslang }) {
  // console.log(paramslang);
  const lang = await getDictionary(paramslang);
  address = JSON.parse(address);
  // console.log(sale);
  const items = JSON.parse(sale.data);
  // console.log(items.items[0].currency);
  const currency = items.items[0].currency;
  const totalItems = items.items.length;
  const fecha = format(new Date(sale.date), "dd-MM-yyyy");
  // console.log(formattedCreatedAt);
  // console.log(totalItems);
  // console.log(address);
  // console.log(items.items.length);
  return (
    <li className="py-3">
      <Link href={`/${paramslang}/dashboard/pedidos/${sale.id}`}>
        <div className="md:grid md:grid-cols-6">
          <div className="flex items-center justify-center col-span-1">
            <div className="">
              <ClipboardDocumentCheckIcon
                className="inline-block w-6 h-6 mx-3 text-green-600"
                aria-hidden="true"
              />
            </div>
            <div>
              <p className="text-xs"># {lang.order.order}</p>
              <p className="text-sm leading-6 text-center text-primaryBlue">
                <b>{sale.id}</b>
              </p>
            </div>
          </div>
          <div className="col-span-3 p-2">
            <p className="text-xs text-center md:text-start">
              {lang.addresses.address}
            </p>
            <p className="text-sm font-semibold leading-6 text-center text-primaryBlue md:text-start">
              {address.officeName}
            </p>
          </div>
          <div className="flex items-center col-span-2 justify-evenly">
            <div className="p-2">
              <p className="text-xs text-center">{lang.order.date}</p>
              <p className="mt-1 text-xs leading-5 text-center text-gray-500 truncate">
                {fecha}
              </p>
            </div>
            <div className="p-2">
              <p className="text-xs text-center">{lang.order.items}</p>
              <p className="mt-1 text-xs leading-5 text-center text-gray-500 truncate">
                {totalItems}
              </p>
            </div>
            <div className="p-2">
              <p className="text-xs text-center">Total</p>
              <p className="mt-1 text-xs leading-5 text-center text-gray-500 truncate">
                ${sale.totalSale} {currency}
              </p>
            </div>
            <div className="">
              <ChevronRightIcon
                className="inline-block w-4 h-4 mx-3 text-gray-400"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}
