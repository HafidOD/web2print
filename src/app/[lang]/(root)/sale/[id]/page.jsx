import ButtonPdf from "./components/ButtonPdf";
import { getDictionary } from "@/utils/dictionary";

const URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchSingleSales(saleId) {
  const res = await fetch(`${URL}/sales/${saleId}`);
  const data = await res.json();
  // console.log(data);
  return data.sale;
}

export default async function pagePublicPDF({ params }) {
  // console.log(params.id);
  const lang = await getDictionary(params.lang);
  const sale = await fetchSingleSales(params.id);
  // console.log(sale);
  const items = JSON.parse(sale.data);
  const address = JSON.parse(sale.address);
  const currency = items.items[0].currency;
  // console.log(items.items);
  // console.log(address);
  // console.log(sale);
  return (
    <div>
      <div>
        <div className="flex flex-col justify-center m-4 md:flex-row">
          {/* <div className="p-6 mx-2 mb-4 bg-white rounded-lg shadow-lg md:w-2/5 md:mb-0">
            <h2 className="mb-4 text-xl font-semibold text-center text-primaryBlue">
              {lang.order["order-details"]}
            </h2>
            <div className="pt-2 border-t-2 border-t-gray-200">
              <p className="text-end">
                Total: ${sale.totalSale} {currency}
              </p>
            </div>
          </div> */}
          {/* <div className="p-6 mx-2 align-middle bg-white rounded-lg shadow-lg md:w-2/5">
            <h2 className="mb-4 text-xl font-semibold text-center text-primaryBlue">
              {lang.addresses["shipping-address"]}
            </h2>
            <AddressSale address={address} lang={lang}></AddressSale>
          </div> */}
          <ButtonPdf
            sale={sale}
            items={items}
            address={address}
            lang={lang}
          ></ButtonPdf>
        </div>
        {/* <div className="w-full px-2 py-5 m-auto space-y-5 md:w-5/5 sm:px-0"> */}
        {/* <div className="w-full px-2 py-5 m-auto space-y-5 md:w-1/5 sm:px-0">
          <div className="flex justify-center mb-4">
            <ButtonPdf
              sale={sale}
              items={items}
              address={address}
              lang={lang}
            ></ButtonPdf>
          </div>
        </div> */}
      </div>
    </div>
  );
}
