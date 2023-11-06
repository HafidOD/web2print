"use client";
import { useRef, useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";

const lang = {
  en: {
    property: "Property",
    "full-username": "Full name",
    "user-name": "User name",
    email: "Email",
    password: "Password",
    phone: "Phone",
    brand: "Brand",
    role: "Role",
    "user-location": "User location",
    currency: "Currency",
    address: "Address",
    create: "Create",
    save: "Save",
    refresh: "Refresh",
    "error-server": "An error has occurred on the server",
    "error-retrieving-properties": "Error while retrieving the propierties",
    "error-retrieving-companies": "Error while retrieving the brands",
    "error-retrieving-addresses": "Error while retrieving the addresses",
    "email-use": "This email is already in use",
    "select-property": "Select a property",
    "select-type-user": "Select a type user",
    "select-option": "Select a option",
    "select-currency": "select currency",
    "address-already-created": "This address is already created",
  },
  es: {
    property: "Propiedad",
    "full-username": "Nombre completo",
    "user-name": "Nombre del usuario",
    email: "Correo electrónico",
    password: "Contraseña",
    phone: "Teléfono",
    brand: "Marca",
    role: "Rol",
    "user-location": "Ubicación del usuario",
    currency: "Divisa",
    address: "Dirección",
    create: "Crear",
    save: "Guardar",
    refresh: "Actualizar",
    "error-server": "A ocurrido un error en el servidor",
    "error-retrieving-companies": "Error al obtener las marcas",
    "error-retrieving-properties": "Error al obtener las propiedades",
    "error-retrieving-addresses": "Error al obtener las direcciones",
    "email-use": "El email ya está en uso",
    "select-property": "Selecciona la propiedad",
    "select-type-user": "Selecciona el tipo de usuario",
    "select-option": "Selecciona una opción",
    "select-currency": "Selecciona la divisa",
    "address-already-created": "This address is already created",
  },
};

function UserForm({ params }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
    telefono: "",
    userName: "",
    propertyId: null,
    enterprises: [],
    role: null, //1:admin, 2:user
    typePrice: null, //1:local, 2:nacional, 3:extrangero
    currency: "", //MXN, USD
    addresses: [],
  });

  const form = useRef(null);
  const router = useRouter();

  const [enterpriseOptions, setEnterpriseOptions] = useState([]);
  const [addressOptions, setAddressOptions] = useState([]);
  const [propertyOptions, setPropertyOptions] = useState([]);

  const handleChange = (e) => {
    // console.log(e.target.type);
    if (e.target.type === "checkbox") {
      console.log(e.target.checked);
      if (e.target.checked) {
        setUser({
          ...user,
          [e.target.name]: [...user[e.target.name], e.target.value],
        });
      } else {
        setUser({
          ...user,
          [e.target.name]: user[e.target.name].filter(
            (item) => item !== e.target.value
          ),
        });
      }
    } else {
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
    }
    // console.log(user);
  };

  useEffect(() => {
    // Hacer una solicitud fetch para obtener las empresas
    fetch("/api/properties")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.enterprises);
        // Extraer los IDs de las empresas y establecerlos como opciones
        const options = data.properties.map((property) => ({
          value: property.id,
          label: property.propertyName, // Supongamos que el nombre de la empresa se llama 'name'
        }));
        setPropertyOptions(options);
      })
      .catch((error) => {
        console.error(lang[params.lang]["error-retrieving-propierties"], error);
      });

    fetch("/api/enterprises")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.enterprises);
        // Extraer los IDs de las empresas y establecerlos como opciones
        const options = data.enterprises.map((enterprise) => ({
          value: enterprise.id,
          label: enterprise.enterpriseName, // Supongamos que el nombre de la empresa se llama 'name'
        }));
        setEnterpriseOptions(options);
      })
      .catch((error) => {
        console.error(lang[params.lang]["error-retrieving-companies"], error);
      });

    // Hacer una solicitud fetch para obtener las direcciones
    fetch("/api/addresses")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.addresses);
        // Mapear los datos de las direcciones para obtener opciones
        const options = data.addresses.map((address) => ({
          value: address.id,
          label: address.officeName, // Supongamos que el nombre de la dirección se llama 'name'
        }));
        setAddressOptions(options);
      })
      .catch((error) => {
        console.error(lang[params.lang]["error-retrieving-addresses"], error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("telefono", user.telefono);
    formData.append("userName", user.userName);
    formData.append("propertyId", user.propertyId);
    formData.append("enterprises", user.enterprises);
    formData.append("role", user.role);
    formData.append("typePrice", user.typePrice);
    formData.append("currency", user.currency);
    formData.append("addresses", user.addresses);

    const res = await fetch("/api/users", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      form.current.reset();
      router.refresh();
      router.push(`/${params.lang}/admin/users`);
    }
    if (res.status == 500 || res.status == 405) {
      toast.error(lang[params.lang]["error-server"]);
    }
    if (res.status == 400) {
      toast.error(lang[params.lang]["email-use"]);
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
            htmlFor="property"
            className="block my-2 text-sm font-bold text-primaryBlue"
          >
            {lang[params.lang]["property"]}:
          </label>
          <select
            name="propertyId"
            onChange={handleChange}
            value={user.propertyId}
            className="w-full px-3 py-2 border shadow"
            required
          >
            <option value="">{lang[params.lang]["select-property"]}</option>

            {propertyOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <label
            htmlFor="userName"
            className="block my-2 text-sm font-bold text-primaryBlue"
          >
            {lang[params.lang]["full-username"]}:
          </label>
          <input
            name="userName"
            type="text"
            placeholder={lang[params.lang]["user-name"]}
            onChange={handleChange}
            value={user.userName}
            className="w-full px-3 py-2 border shadow appearance-none"
            required
          />
          <label
            htmlFor="email"
            className="block my-2 text-sm font-bold text-primaryBlue"
          >
            {lang[params.lang]["email"]}:
          </label>
          <input
            name="email"
            type="email"
            placeholder="example@example.com"
            onChange={handleChange}
            value={user.email}
            className="w-full px-3 py-2 border shadow appearance-none"
            required
          />
          <label
            htmlFor="password"
            className="block my-2 text-sm font-bold text-primaryBlue"
          >
            {lang[params.lang]["password"]}:
          </label>
          <input
            name="password"
            type="password"
            placeholder={lang[params.lang]["password"]}
            onChange={handleChange}
            value={user.password}
            className="w-full px-3 py-2 border shadow appearance-none"
            required
          />
          <label
            htmlFor="telefono"
            className="block my-2 text-sm font-bold text-primaryBlue"
          >
            {lang[params.lang]["phone"]}:
          </label>
          <input
            name="telefono"
            type="text"
            placeholder={lang[params.lang]["phone"]}
            onChange={handleChange}
            value={user.telefono}
            className="w-full px-3 py-2 border shadow appearance-none"
          />

          <label
            htmlFor="enterprises"
            className="block my-2 text-sm font-bold text-primaryBlue"
          >
            {lang[params.lang]["brand"]}:
          </label>
          <div className="flex flex-col space-y-2">
            {enterpriseOptions.map((option) => (
              <label key={option.value} className="flex items-center space-x-2">
                <input
                  name="enterprises"
                  type="checkbox"
                  value={option.value}
                  onChange={handleChange}

                  // checked={user.enterprises.includes(option.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>

          <label
            htmlFor="role"
            className="block my-2 text-sm font-bold text-primaryBlue"
          >
            {lang[params.lang]["role"]}
          </label>
          <select
            name="role"
            onChange={handleChange}
            value={user.role}
            className="w-full px-3 py-2 border shadow"
            required
          >
            <option value="">{lang[params.lang]["select-type-user"]}</option>

            <option value="2">USER</option>
            <option value="1">ADMIN</option>
          </select>

          <label
            htmlFor="typePrice"
            className="block my-2 text-sm font-bold text-primaryBlue"
          >
            {lang[params.lang]["user-location"]}:
          </label>
          <select
            name="typePrice"
            onChange={handleChange}
            value={user.typePrice}
            className="w-full px-3 py-2 border shadow"
            required
          >
            <option value="">{lang[params.lang]["select-option"]}</option>

            <option value="1">Local</option>
            <option value="2">Nacional</option>
            <option value="3">Extranjero</option>
          </select>

          <label
            htmlFor="currency"
            className="block my-2 text-sm font-bold text-primaryBlue"
          >
            {lang[params.lang]["currency"]}:
          </label>
          <select
            name="currency"
            onChange={handleChange}
            value={user.currency}
            className="w-full px-3 py-2 border shadow"
            required
          >
            <option value="">{lang[params.lang]["select-currency"]}</option>

            <option value="MXN">MXN</option>
            <option value="USD">USD</option>
          </select>

          <label
            htmlFor="addresses"
            className="block my-2 text-sm font-bold text-primaryBlue"
          >
            {lang[params.lang]["address"]}:
          </label>
          <div className="flex flex-col space-y-2">
            {addressOptions.map((option) => (
              <label key={option.value} className="flex items-center space-x-2">
                <input
                  name="addresses"
                  type="checkbox"
                  value={option.value}
                  onChange={handleChange}

                  // checked={user.addresses.includes(option.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>

          <button className="px-4 py-2 mt-5 font-bold text-white bg-primaryBlue">
            {lang[params.lang]["create"]}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserForm;
