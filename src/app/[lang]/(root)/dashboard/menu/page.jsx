import { PrinterIcon, TruckIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default async function pageMenu() {
//  const enterprises = await fetchEnterprises();
  // console.log(enterprises);
  return (
    <div className="flex flex-col items-center justify-center h-96">
      <div>
        <div className="space-y-4">
          <h3 className="text-xl font-medium text-center text-blue-700">
            ¿Qué deseas realizar hoy?
          </h3>
  
          <Link className="block w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" href="/dashboard/impresion">
          <PrinterIcon
              className="inline-block h-6 w-6 mx-3"
              aria-hidden="true"
            />
            Creación de archivos para impresión
          </Link>
  
          <Link className="block w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" href="/dashboard/categorias">
          <TruckIcon
              className="inline-block h-6 w-6 mx-3"
              aria-hidden="true"
            />
            Envío de inventarios
          </Link>
          
        </div>
      </div>
    </div>
  );
}

