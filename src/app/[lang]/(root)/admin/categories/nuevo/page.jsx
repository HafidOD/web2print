"use client";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const lang = {
  en: {
    "division-name": "Division name",
    "parent-category": "Parent category",
    inventories: "Inventories",
    brands: "Brands",
    create: "Create",
    save: "Save",
    refresh: "Refresh",
    "error-server": "An error has occurred on the server",
    "error-retrieving-companies": "Error while retrieving the propierties",
    "select-property": "Select a property",
    "address-already-created": "This address is already created",
    "select-category": "Select parent category",
    "category-name-exists": "The category name already exists",
  },
  es: {
    "division-name": "Nombre de la división",
    "parent-category": "Categoria padre",
    inventories: "Inventarios",
    brands: "Marcas",
    create: "Crear",
    save: "Guardar",
    refresh: "Actualizar",
    "error-server": "A ocurrido un error en el servidor",
    "error-retrieving-properties": "Error al obtener las propiedades",
    "select-property": "Selecciona la propiedad",
    "select-category": "Selecciona categoría padre",
    "category-name-exists": "El nombre de la categoría ya existe",
  },
};

function CategoryForm({ params }) {
  const [category, setCategory] = useState({
    categoryName: "",
    parentCategory: null,
    enterprises: [],
  });
  const [file, setFile] = useState(null);
  const form = useRef(null);
  const router = useRouter();

  const [enterpriseOptions, setEnterpriseOptions] = useState([]);

  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      // console.log(e.target.checked);
      if (e.target.checked) {
        setCategory({
          ...category,
          [e.target.name]: [...category[e.target.name], e.target.value],
        });
      } else {
        setCategory({
          ...category,
          [e.target.name]: category[e.target.name].filter(
            (item) => item !== e.target.value
          ),
        });
      }
    } else {
      setCategory({
        ...category,
        [e.target.name]: e.target.value,
      });
    }
    // console.log(category);
  };

  useEffect(() => {
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
        console.error(lang[params.lang]["error-retrieving-propierties"], error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("categoryName", category.categoryName);
    formData.append("parentCategory", category.parentCategory);
    formData.append("enterprises", category.enterprises);

    if (file) {
      formData.append("imageCategory", file);
    }

    const res = await fetch("/api/categories", {
      method: "POST",
      body: formData,
      // headers: { "Content-type": "multipart/form-data" },
    });

    if (res.ok) {
      form.current.reset();
      router.refresh();
      router.push(`/${params.lang}/admin/categories`);
    }
    if (res.status == 500 || res.status == 405) {
      toast.error(lang[params.lang]["error-server"]);
    }
    if (res.status == 400) {
      toast.error(lang[params.lang]["category-name-exists"]);
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
            htmlFor="categoryName"
            className="block my-2 text-sm font-bold text-primaryBlue"
          >
            {lang[params.lang]["division-name"]}:
          </label>
          <input
            name="categoryName"
            type="text"
            // placeholder="Marr"
            onChange={handleChange}
            value={category.categoryName}
            className="w-full px-3 py-2 border shadow appearance-none"
            required
            autoFocus
          />

          <label
            htmlFor="categoryName"
            className="block my-2 text-sm font-bold text-primaryBlue"
          >
            {lang[params.lang]["parent-category"]}:
          </label>
          <select
            name="parentCategory"
            onChange={handleChange}
            value={category.parentCategory}
            className="w-full px-3 py-2 border shadow"
            required
          >
            <option value="">{lang[params.lang]["select-category"]}</option>

            <option value="2">{lang[params.lang]["inventories"]}</option>
            <option value="1">Impresiones</option>
          </select>

          <label
            htmlFor="enterprises"
            className="block my-2 text-sm font-bold text-primaryBlue"
          >
            {lang[params.lang]["brands"]}:
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

          {/* <label
            htmlFor="imageCategory"
            className="block my-2 text-sm font-bold text-primaryBlue"
          >
            Imagen:
          </label>
          <input
            type="file"
            className="w-full px-3 py-2 mb-2 border shadow appearance-none"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />

          {file && (
            <img
              className="object-contain mx-auto my-4 w-96"
              src={URL.createObjectURL(file)}
              alt=""
            />
          )} */}

          <button className="px-4 py-2 mt-4 font-bold text-white bg-primaryBlue">
            {lang[params.lang]["create"]}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CategoryForm;
