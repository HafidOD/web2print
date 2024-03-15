"use client";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import SalePdf from "./SalePdf";

export default function ButtonPdf({ sale, items, address, lang }) {
  // console.log(sale);
  return (
    <>
      <PDFDownloadLink
        document={
          <SalePdf
            sale={sale}
            items={items.items}
            address={address}
            lang={lang}
          />
        }
        fileName={`gr-pedido-${sale.id}`}
        className="w-full text-white bg-primaryBlue font-medium text-sm px-5 py-2.5 text-center"
      >
        {({ blob, url, loading, error }) =>
          loading
            ? `${lang.order["loading"]}...`
            : `${lang.order["download-pdf"]}`
        }
      </PDFDownloadLink>
      {/* <SalePdf sale={sale} items={items.items} address={address} lang={lang} /> */}
    </>
  );
}
