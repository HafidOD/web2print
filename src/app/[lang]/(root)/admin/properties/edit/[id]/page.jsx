"use client";
import { useRef, useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

import { toast } from "react-hot-toast";

const lang = {
  en: {
    refresh: "Refresh",
    "property-name": "Property name",
    "brand-name": "Brand name",
    "property-name-exists": "This property name already exists",
    "error-server": "An error has occurred on the server",
    "property-email": "Emails",
  },
  es: {
    refresh: "Actualizar",
    "property-name": "Nombre de la propiedad",
    "brand-name": "Nombre de la marca",
    "property-name-exists": "El nombre de la propiedad ya existe",
    "error-server": "A ocurrido un error en el servidor",
    "property-email": "Emails de envio",
  },
};

export default function EditPropertyPage({ params }) {
  const form = useRef(null);
  const router = useRouter();

  const [property, setProperty] = useState({
    propertyName: "",
    propertyEmail: "",
  });

  const handleChange = (e) => {
    setProperty({
      ...property,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    fetch("/api/properties/" + params.id)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.data);
        setProperty({
          propertyName: data.data.propertyName,
          propertyEmail: data.data.email,
        });
        // console.log(enterprise.logo);
      })
      .catch((error) => {
        console.error("Error al obtener le empresa:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("propertyName", property.propertyName);
    formData.append("propertyEmail", property.propertyEmail);

    const res = await fetch(`/api/properties/${params.id}`, {
      method: "PUT",
      body: formData,
    });
    // console.log(res);
    if (res.ok) {
      form.current.reset();
      router.refresh();
      router.push(`/${params.lang}/admin/properties`);
    }
  };

  return (
    <div className="w-full px-2 pt-8 m-auto md:w-2/5 sm:px-0">
      <div className="">
        <form
          className="px-8 pt-6 pb-8 mb-4 bg-white rounded-md shadow-md"
          onSubmit={handleSubmit}
          ref={form}
        >
          <label
            htmlFor="propertyName"
            className="block mb-2 text-sm font-bold text-primaryBlue"
          >
            {lang[params.lang]["property-name"]}:
          </label>
          <input
            name="propertyName"
            type="text"
            // placeholder="Marr"
            onChange={handleChange}
            value={property.propertyName}
            className="w-full px-3 py-2 border shadow appearance-none"
            autoFocus
            required
          />
          <label
            htmlFor="enterpriseEmail"
            className="block my-2 text-sm font-bold text-primaryBlue"
          >
            {lang[params.lang]["property-email"]}:
          </label>
          <input
            name="propertyEmail"
            type="text"
            onChange={handleChange}
            value={property.propertyEmail}
            className="w-full px-3 py-2 border shadow appearance-none "
            autoFocus
            required
          />

          <button className="px-4 py-2 mt-4 font-bold text-white bg-primaryBlue">
            {lang[params.lang]["refresh"]}
          </button>
        </form>
      </div>
    </div>
  );
}
