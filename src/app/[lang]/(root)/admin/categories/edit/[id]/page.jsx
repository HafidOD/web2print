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

export default function EditCategoryPage({ params }) {
  const [category, setCategory] = useState({
    categoryName: "",
    parentCategory: null,
    old_image: "",
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
        // console.log("agregado");
        setCategory({
          ...category,
          [e.target.name]: [
            ...category[e.target.name],
            parseInt(e.target.value),
          ],
        });
      } else {
        setCategory({
          ...category,
          [e.target.name]: category[e.target.name].filter(
            (item) => item !== parseInt(e.target.value)
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
    // console.log("reload");
    fetch("/api/categories/" + params.id)
      .then((response) => response.json())
      .then((data) => {
        const enterprises = [];
        data.category.enterprises.forEach((enterprise) => {
          enterprises.push(enterprise.id);
        });
        // console.log(data);
        setCategory({
          categoryName: data.category.categoryName,
          parentCategory: data.category.parentCategory,
          old_image: data.category.imageCategory,
          enterprises: enterprises,
        });
        console.log(category);
      })
      .catch((error) => {
        console.error("Error al obtener la division:", error);
      });

    fetch("/api/enterprises")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.enterprises);
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
    formData.append("old_image", category.old_image);

    if (file) {
      formData.append("imageCategory", file);
    }

    const res = await fetch(`/api/categories/${params.id}`, {
      method: "PUT",
      body: formData,
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
            className="block my-2 text-sm font-bold text-gray-700"
          >
            {lang[params.lang]["division-name"]}:
          </label>
          <input
            name="categoryName"
            type="text"
            // placeholder="Marr"
            onChange={handleChange}
            value={category.categoryName}
            className="w-full px-3 py-2 shadow appearance-none"
            required
            autoFocus
          />

          <label
            htmlFor="categoryName"
            className="block my-2 text-sm font-bold text-gray-700"
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
            className="block my-2 text-sm font-bold text-gray-700"
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
                  checked={category.enterprises.includes(option.value)}
                  onChange={handleChange}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>

          {/* <label
            htmlFor="imageCategory"
            className="block my-2 text-sm font-bold text-gray-700"
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
          {!file && (
            <img
              className="object-contain mx-auto my-4 w-96"
              src={category.old_image}
              alt=""
            />
          )}
          {file && (
            <img
              className="object-contain mx-auto my-4 w-96"
              src={URL.createObjectURL(file)}
              alt=""
            />
          )} */}

          <button className="px-4 py-2 mt-4 font-bold text-white bg-primaryBlue">
            {lang[params.lang]["refresh"]}
          </button>
        </form>
      </div>
    </div>
  );
}
