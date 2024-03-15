"use client";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { redirect, useSearchParams } from "next/navigation";

import useCart from "@/app/hooks/use-cart";
import useAddress from "@/app/hooks/use-address";

const lang = {
  es: {
    "thank-request": "¡Gracias por tu solicitud!",
    "send-email-confirmation":
      "Te enviaremos una confirmación por correo electrónico para un seguimiento personalizado con tu asesor",
    "order-id": "Tu ID de pedido es",
    questions: "Dudas",
    home: "Inicio",
  },
  en: {
    "thank-request": "Thank you for your request!",
    "send-email-confirmation":
      "We will send you an email confirmation for personalized assistance and tracking",
    "order-id": "Your Order ID is",
    questions: "Questions",
    home: "Home",
  },
};

export default function ThankyouPage({ params }) {
  // console.log(params.lang);
  const searchParams = useSearchParams();
  const saleId = searchParams.get("saleId");
  const primaryEmail = searchParams.get("email");
  console.log(primaryEmail);
  // const cart = useCart();
  const removeAll = useCart((state) => state.removeAll);
  const removeAddress = useAddress((state) => state.removeAddress);

  // console.log(items);
  // console.log(address);
  function remove() {
    try {
      removeAll();
      removeAddress();
      // redirect("/dashboard");
    } catch (error) {
      console.log(error);
    }
    // console.log("hola");
  }
  remove();
  return (
    <div className="flex items-center justify-center h-96">
      <div>
        <div className="flex flex-col items-center space-y-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-primaryBlue w-28 h-28"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h1 className="text-4xl font-bold text-center text-primaryBlue">
            {lang[params.lang]["thank-request"]}
          </h1>
          <p className="text-center text-gray-600">
            {lang[params.lang]["send-email-confirmation"]}
          </p>
          <p className="text-center text-primaryBlue">
            <b>
              {lang[params.lang]["order-id"]}: {saleId}
            </b>
          </p>
          <p className="text-center text-gray-600">
            {lang[params.lang]["questions"]}: {primaryEmail}
          </p>
          <Link
            href={`/${params.lang}/dashboard`}
            // onClick={remove}
            className="inline-flex items-center px-4 py-2 text-white rounded-full bg-primaryBlue "
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" aria-hidden="true" />
            <span className="font-bold text-md">
              {lang[params.lang]["home"]}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
