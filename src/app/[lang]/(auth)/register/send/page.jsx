import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
const lang = {
  es: {
    "thank-request": "¡Gracias por tu solicitud!",
    "send-email-confirmation":
      "Te enviaremos una confirmación por correo electrónico para un seguimiento personalizado con tu asesor",
    "order-id": "Tu ID de pedido es",
    questions: "Dudas",
    home: "Inicio",
    send: "Se ha enviado la solicitud.",
    confirm:
      "Revisaremos la solicitud y te confirmaremos por correo electrónico.",
  },
  en: {
    "thank-request": "Thank you for your request!",
    "send-email-confirmation":
      "We will send you an email confirmation for personalized assistance and tracking",
    "order-id": "Your Order ID is",
    questions: "Questions",
    home: "Home",
    send: "Se ha enviado la solicitud.",
    confirm: "We will review the application and confirm by email.",
  },
};

export default function page({ params }) {
  return (
    <div>
      <div className="bg-primaryBlue">
        <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="">
              <a href={`/${params.lang}/dashboard/`}>
                <img
                  className=""
                  src="/images/logos/logo_regio_white.png"
                  alt="Logo Grupo Regio"
                  width={125}
                  height={37}
                />
              </a>
            </div>
            <div className="text-white">
              {" "}
              <a
                href={`/${params.lang}/dashboard`}
                className="px-3 py-2 text-sm font-medium text-white rounded-md hover:bg-white hover:text-primaryBlue"
              >
                {lang[params.lang]["login"]}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center h-96">
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
            {lang[params.lang]["send"]}
          </h1>
          <p className="text-center text-gray-600">
            {lang[params.lang]["confirm"]}
          </p>
          <p className="text-center text-gray-600">
            {lang[params.lang]["questions"]}: marriott@gruporegio.mx
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
