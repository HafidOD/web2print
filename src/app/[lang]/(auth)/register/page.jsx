"use client";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
    "select-property": "Property Name",
    "select-type-user": "Select a type user",
    "select-option": "Select a option",
    "select-currency": "Select currency",
    "address-already-created": "This address is already created",
    local: "Local",
    national: "National",
    foreign: "Foreign",
    mexico: "Mexico",
    caribbean: "Caribbean",
    central: "Central",
    "south-america": "South America",
    login: "Log In",
    "user-register": "User registration request",
    send: "Send",
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
    "select-property": "Nombre de la propiedad",
    "select-type-user": "Selecciona el tipo de usuario",
    "select-option": "Selecciona una opción",
    "select-currency": "Selecciona la divisa",
    "address-already-created": "This address is already created",
    local: "Local",
    national: "Nacional",
    foreign: "Extranjero",
    mexico: "México",
    caribbean: "Caribe",
    central: "Centro",
    "south-america": "Sudamérica",
    login: "Iniciar Sesión",
    "user-register": "Solicitud de alta de usuario",
    send: "Enviar",
  },
};

export default function PageRegister({ params }) {
  const [user, setUser] = useState({
    email: "",
    telefono: "",
    userName: "",
    propertyId: "",
    enterprises: [],
    typePrice: null, //1:local, 2:nacional, 3:extrangero
  });

  const [loading, setLoading] = useState(false);
  const form = useRef(null);
  const router = useRouter();

  const [enterpriseOptions, setEnterpriseOptions] = useState([]);
  const [propertyOptions, setPropertyOptions] = useState([]);

  const handleChange = (e) => {
    // console.log(e.target.type);
    if (e.target.type === "checkbox") {
      // console.log(e.target.checked);
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
    fetch("/api/properties")
      .then((response) => response.json())
      .then((data) => {
        const options = data.properties.map((property) => ({
          value: property.propertyName,
          label: property.propertyName,
        }));
        setPropertyOptions(options);
      })
      .catch((error) => {
        console.error(lang[params.lang]["error-retrieving-propierties"], error);
      });

    fetch("/api/enterprises")
      .then((response) => response.json())
      .then((data) => {
        const options = data.enterprises.map((enterprise) => ({
          value: enterprise.enterpriseName,
          label: enterprise.enterpriseName,
        }));
        setEnterpriseOptions(options);
      })
      .catch((error) => {
        console.error(lang[params.lang]["error-retrieving-companies"], error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();
    formData.append("email", user.email);
    formData.append("telefono", user.telefono);
    formData.append("userName", user.userName);
    formData.append("property", user.propertyId);
    formData.append("enterprises", user.enterprises);
    formData.append("typePrice", user.typePrice);

    const res = await fetch("/api/email/newuser", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      form.current.reset();
      router.refresh();
      router.push(`/${params.lang}/register/send`);
    }
    if (res.status == 500 || res.status == 405) {
      toast.error(lang[params.lang]["error-server"]);
      setLoading(false);
    }
    if (res.status == 400) {
      toast.error(lang[params.lang]["email-use"]);
      setLoading(false);
    }
  };

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
      <div className="w-full px-2 pt-8 m-auto mb-5 md:w-2/5 sm:px-0">
        <h3 className="text-xl font-bold text-center text-primaryBlue">
          {lang[params.lang]["user-register"]}
        </h3>
        <div className="">
          <form
            className="px-8 pt-6 pb-8 mb-4 bg-white rounded-md shadow-md"
            onSubmit={handleSubmit}
            ref={form}
          >
            <label
              htmlFor="propertyId"
              className="block my-2 text-sm font-bold text-primaryBlue"
            >
              {lang[params.lang]["property"]}:
            </label>
            <input
              name="propertyId"
              type="text"
              placeholder={lang[params.lang]["select-property"]}
              onChange={handleChange}
              value={user.propertyId}
              className="w-full px-3 py-2 border shadow appearance-none"
              required
            />
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
                <label
                  key={option.value}
                  className="flex items-center space-x-2"
                >
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
              <option value="Quintana Roo">Quintana Roo</option>
              <option value="Mexico">{lang[params.lang]["mexico"]}</option>
              <option value="Caribe">{lang[params.lang]["caribbean"]}</option>
              <option value="Centro">{lang[params.lang]["central"]}</option>
              <option value="Sudamerica">
                {lang[params.lang]["south-america"]}
              </option>
            </select>

            <button
              className="px-4 py-2 mt-5 font-bold text-white bg-primaryBlue"
              disabled={loading}
              style={{ backgroundColor: `${loading ? "#ccc" : "#193761"}` }}
            >
              {lang[params.lang]["send"]}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
