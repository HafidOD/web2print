"use client";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const lang = {
  en: {
    "select-address": "Select an address",
    "select-shipping-address": "Select shipping address",
    "another-address": "Another address",
    "advisors-shipping-address":
      "One of our advisors will reach out to you to verify your shipping address",
    "shipping-address": "Shipping Address",
    company: "Company",
    address: "Address",
    city: "City",
    state: "State",
    country: "Country",
    office: "Oficina",
    "address-name": "Address name",
    "zip-code": "ZIP code",
    create: "Create",
    save: "Save",
    refresh: "Refresh",
    "error-server": "An error has occurred on the server",
    "address-already-created": "This address is already created",
  },
  es: {
    "select-address": "Seleccionar dirección",
    "select-shipping-address": "Selecciona la dirección de envío",
    "another-address": "Otra dirección",
    "advisors-shipping-address":
      "Uno de nuestros asesores te contactará para confirmar tu dirección de envío",
    "shipping-address": "Direccion de envio",
    company: "Empresa",
    address: "Dirección",
    city: "Ciudad",
    state: "Estado",
    country: "País",
    office: "Oficina",
    "address-name": "Nombre de la dirección",
    "zip-code": "Código postal",
    create: "Crear",
    save: "Guardar",
    refresh: "Actualizar",
    "error-server": "A ocurrido un error en el servidor",
    "address-already-created": "La dirección ya está creada",
  },
};

export default function EditAddressPage({ params }) {
  const [address, setAddress] = useState({
    officeName: "",
    address: "",
    city: "",
    country: "",
    state: "",
    postalCode: null,
    enterpriseId: null,
  });
  const [enterpriseOptions, setEnterpriseOptions] = useState([]);

  const form = useRef(null);
  const router = useRouter();

  useEffect(() => {
    // Hacer una solicitud fetch para obtener las empresas
    fetch("/api/addresses/" + params.id)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.data);
        setAddress({
          officeName: data.address.officeName,
          address: data.address.address,
          city: data.address.city,
          country: data.address.country,
          state: data.address.state,
          postalCode: data.address.postalCode,
          enterpriseId: data.address.enterpriseId,
        });
        // console.log(enterprise.logo);
      })
      .catch((error) => {
        console.error("Error al obtener la dirección:", error);
      });

    // fetch("/api/enterprises")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     // console.log(data.enterprises);
    //     // Extraer los IDs de las empresas y establecerlos como opciones
    //     const options = data.enterprises.map((enterprise) => ({
    //       value: enterprise.id,
    //       label: enterprise.enterpriseName, // Supongamos que el nombre de la empresa se llama 'name'
    //     }));
    //     setEnterpriseOptions(options);
    //   })
    //   .catch((error) => {
    //     console.error("Error al obtener las empresas:", error);
    //   });
  }, []);

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("officeName", address.officeName);
    formData.append("address", address.address);
    formData.append("city", address.city);
    formData.append("country", address.country);
    formData.append("state", address.state);
    formData.append("postalCode", address.postalCode);
    formData.append("enterpriseId", address.enterpriseId);

    const res = await fetch(`/api/addresses/${params.id}`, {
      method: "PUT",
      body: formData,
    });
    // console.log(res);
    if (res.ok) {
      form.current.reset();
      router.refresh();
      router.push(`/${params.lang}/admin/addresses/`);
    }
    if (res.status == 500 || res.status == 405) {
      toast.error(lang[params.lang]["error-server"]);
    }
    if (res.status == 400) {
      toast.error(lang[params.lang]["address-already-created"]);
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
            htmlFor="name"
            className="block mb-2 text-sm font-bold text-primaryBlue"
          >
            {lang[params.lang]["address-name"]}:
          </label>
          <input
            name="officeName"
            type="text"
            onChange={handleChange}
            value={address.officeName}
            className="w-full px-3 py-2 border shadow appearance-none"
            required
            autoFocus
          />

          <label
            htmlFor="address"
            className="block my-2 text-sm font-bold text-primaryBlue"
          >
            {lang[params.lang]["address"]}:
          </label>
          <input
            name="address"
            type="text"
            onChange={handleChange}
            value={address.address}
            className="w-full px-3 py-2 border shadow appearance-none"
            required
          />

          <label
            htmlFor="city"
            className="block my-2 text-sm font-bold text-primaryBlue"
          >
            {lang[params.lang]["city"]}:
          </label>
          <input
            name="city"
            type="text"
            onChange={handleChange}
            value={address.city}
            className="w-full px-3 py-2 border shadow appearance-none"
            required
          />

          <label
            htmlFor="state"
            className="block my-2 text-sm font-bold text-primaryBlue"
          >
            {lang[params.lang]["state"]}:
          </label>
          <input
            name="state"
            type="text"
            onChange={handleChange}
            value={address.state}
            className="w-full px-3 py-2 border shadow appearance-none"
            required
          />

          <label
            htmlFor="country"
            className="block my-2 text-sm font-bold text-primaryBlue"
          >
            {lang[params.lang]["country"]}:
          </label>
          <input
            name="country"
            type="text"
            onChange={handleChange}
            value={address.country}
            className="w-full px-3 py-2 border shadow appearance-none"
            required
          />

          <label
            htmlFor="postalCode"
            className="block my-2 text-sm font-bold text-primaryBlue"
          >
            {lang[params.lang]["zip-code"]}:
          </label>
          <input
            name="postalCode"
            type="text"
            onChange={handleChange}
            value={address.postalCode}
            placeholder="77500"
            className="w-full px-3 py-2 border shadow appearance-none"
            required
          />

          {/* <label
            htmlFor="users"
            className="block my-2 text-sm font-bold text-primaryBlue"
          >
            Marca:
          </label>
          <select
            name="enterpriseId"
            onChange={handleChange}
            value={address.enterpriseId}
            className="w-full px-3 py-2 border shadow"
            required
          >
            <option value="">Selecciona una marca</option>
            {enterpriseOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select> */}
          <button className="px-4 py-2 mt-4 font-bold text-white bg-primaryBlue">
            {lang[params.lang]["refresh"]}
          </button>
        </form>
      </div>
    </div>
  );
}
