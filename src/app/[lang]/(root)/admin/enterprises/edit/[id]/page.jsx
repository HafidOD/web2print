"use client";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const lang = {
  en: {
    create: "Create",
    save: "Save",
    refresh: "Refresh",
    logo: "Logo",
    "brand-name": "Brand name",
    "brand-name-exists": "This brand name already exists",
    "error-server": "An error has occurred on the server",
    "error-retrieving-companies": "Error while retrieving the brands",
  },
  es: {
    logo: "Logo",
    create: "Crear",
    save: "Guardar",
    refresh: "Actualizar",
    "property-name": "Nombre de la propiedad",
    "brand-name": "Nombre de la marca",
    "brand-name-exists": "El nombre de la marca ya existe",
    "error-server": "A ocurrido un error en el servidor",
    "error-retrieving-companies": "Error al obtener las marcas",
  },
};

export default function EditEnterprisePage({ params }) {
  const form = useRef(null);
  const router = useRouter();

  const [enterprise, setEnterprise] = useState({
    enterpriseName: "",
    enterpriseParentCat: [],
    old_logo: "",
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      // console.log(e.target.checked);
      if (e.target.checked) {
        // console.log("agregado");
        setEnterprise({
          ...enterprise,
          [e.target.name]: [...enterprise[e.target.name], e.target.value],
        });
      } else {
        setEnterprise({
          ...enterprise,
          [e.target.name]: enterprise[e.target.name].filter(
            (item) => item !== e.target.value
          ),
        });
      }
      // console.log(enterprise.enterpriseParentCat);
    } else {
      setEnterprise({
        ...enterprise,
        [e.target.name]: e.target.value,
      });
    }
  };

  useEffect(() => {
    fetch("/api/enterprises/" + params.id)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.data.categoryParent);
        let categoryParent = "";
        if (data.data.categoryParent != null) {
          categoryParent = data.data.categoryParent.split(",");
        }

        // data.data.categoryParent.forEach((cat) => {

        //   // categoryParent.push(cat.id);
        // });
        setEnterprise({
          enterpriseName: data.data.enterpriseName,
          enterpriseParentCat: categoryParent,
          old_logo: data.data.logo,
        });
        // console.log(enterprise);
      })
      .catch((error) => {
        console.error(lang[params.lang]["error-retrieving-companies"], error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("enterpriseName", enterprise.enterpriseName);
    formData.append("enterpriseParentCat", enterprise.enterpriseParentCat);
    formData.append("old_logo", enterprise.old_logo);

    if (file) {
      formData.append("logo", file);
    }
    const res = await fetch(`/api/enterprises/${params.id}`, {
      method: "PUT",
      body: formData,
      // headers: { "Content-type": "multipart/form-data" },
    });
    // console.log(res);
    if (res.ok) {
      form.current.reset();
      router.refresh();
      router.push(`/${params.lang}/admin/enterprises`);
    }
    if (res.status == 500 || res.status == 405) {
      toast.error(lang[params.lang]["error-server"]);
    }
    if (res.status == 400) {
      toast.error(lang[params.lang]["brand-name-exists"]);
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
            htmlFor="enterpriseName"
            className="block mb-2 text-sm font-bold text-primaryBlue"
          >
            {lang[params.lang]["brand-name"]}:
          </label>
          <input
            name="enterpriseName"
            type="text"
            // placeholder="Marr"
            onChange={handleChange}
            value={enterprise.enterpriseName}
            className="w-full px-3 py-2 border shadow appearance-none"
            autoFocus
            required
          />

          <label
            htmlFor="enterpriseParentCat"
            className="block my-2 text-sm font-bold text-primaryBlue"
          >
            Categorias padre:
          </label>

          <div className="flex flex-col space-y-2">
            <label className="flex items-center space-x-2">
              <input
                name="enterpriseParentCat"
                type="checkbox"
                value="1"
                onChange={handleChange}
                checked={enterprise.enterpriseParentCat.includes("1")}
              />
              <span>impresion</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                name="enterpriseParentCat"
                type="checkbox"
                value="2"
                onChange={handleChange}
                checked={enterprise.enterpriseParentCat.includes("2")}
              />
              <span>inventario</span>
            </label>
          </div>

          <label
            htmlFor="productImage"
            className="block my-2 text-sm font-bold text-primaryBlue"
          >
            Logo:
          </label>
          <input
            type="file"
            className="w-full px-3 py-2 mb-2 border shadow appearance-none"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />

          {!file && (
            <img
              className="object-contain mx-auto my-4 w-96"
              src={enterprise.old_logo}
              alt=""
            />
          )}
          {file && (
            <img
              className="object-contain mx-auto my-4 w-96"
              src={URL.createObjectURL(file)}
              alt=""
            />
          )}

          <button className="px-4 py-2 mt-4 font-bold text-white bg-primaryBlue">
            {lang[params.lang]["refresh"]}
          </button>
        </form>
      </div>
    </div>
  );
}
