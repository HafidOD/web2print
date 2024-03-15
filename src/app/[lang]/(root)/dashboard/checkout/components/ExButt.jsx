"use client";

import useAddress from "@/app/hooks/use-address";
import useCart from "@/app/hooks/use-cart";
import { useState } from "react";

export default function ExButt({ user, lang, paramslang }) {
  const [loading, setLoading] = useState(false);
  // console.log(user);
  const items = useCart((state) => state.items);
  const address = useAddress((state) => state.address);
  // console.log(address);
  const handleClick = async () => {
    // console.log(items);
    // Llama a la función para enviar el email con los detalles del pedido
    try {
      setLoading(true);
      const response = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items, user: user, address, lang }),
      });
      // console.log(response);
      // const data = await response.json();
      // console.log(data.property.email);
      // const primerCorreo = data.property.email.split(",")[0].trim();
      // console.log(primerCorreo);
      if (response.ok) {
        const data = await response.json();
        // Redirigir a la página de agradecimiento
        const primaryEmail = data.property.email.split(",")[0].trim();
        window.location.href = `/${lang}/dashboard/thankyou?saleId=${data.sale.id}&email=${primaryEmail}`;
      } else {
        console.log(error);
        console.error("Error al enviar el correo.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error de red:", error);
      setLoading(false);
    }
  };
  // console.log(items);
  return (
    <button
      // href={`/dashboard/thankyou`}
      onClick={handleClick}
      style={{ backgroundColor: `${loading ? "#ccc" : "#193761"}` }}
      className="w-full text-white bg-primaryBlue font-bold rounded-lg text-md px-5 py-2.5 text-center"
      disabled={loading}
    >
      {loading
        ? `${paramslang.products["placing-order"]}`
        : `${paramslang.products["place-order"]}`}
    </button>
  );
}
