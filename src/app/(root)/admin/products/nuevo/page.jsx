"use client";
import { useRef, useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";

function ProductForm() {
  const [product, setProduct] = useState({
    sku: "",
    nameProduct: "",
    imageProduct: "",
    priceLocal: null,
    priceNacional: null,
    priceExt: null,
    descriptionProduct: null,
    stockProduct: null,
    unitsPackage: null,
    published: true,
    enterpriseId: null,
    categories: [],
  });
  const [file, setFile] = useState(null);
  const form = useRef(null);
  const router = useRouter();
  const params = useParams();

  const [categoryOptions, setCategryOptions] = useState([]);
  const [enterpriseOptions, setEnterpriseOptions] = useState([]);

  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      console.log(e.target.checked);
      if (e.target.checked) {
        // console.log(e.target.name);
        setProduct({
          ...product,
          [e.target.name]: [...product[e.target.name], e.target.value],
        });
      } else {
        setProduct({
          ...product,
          [e.target.name]: product[e.target.name].filter(
            (item) => item !== e.target.value
          ),
        });
      }
    } else {
      setProduct({
        ...product,
        [e.target.name]: e.target.value,
      });
    }
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
        console.error("Error al obtener las empresas:", error);
      });

    fetch("/api/categories")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.enterprises);
        // Extraer los IDs de las empresas y establecerlos como opciones
        const options = data.categories.map((category) => ({
          value: category.id,
          label: category.categoryName, // Supongamos que el nombre de la empresa se llama 'name'
        }));
        setCategryOptions(options);
      })
      .catch((error) => {
        console.error("Error al obtener las categorias:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("sku", product.sku);
    formData.append("nameProduct", product.nameProduct);
    formData.append("priceLocal", product.priceLocal);
    formData.append("priceNacional", product.priceNacional);
    formData.append("priceExt", product.priceExt);
    formData.append("descriptionProduct", product.descriptionProduct);
    formData.append("stockProduct", product.stockProduct);
    formData.append("unitsPackage", product.unitsPackage);
    formData.append("published", product.published);
    formData.append("enterpriseId", product.enterpriseId);
    formData.append("categories", product.categories);

    if (file) {
      formData.append("imageProduct", file);
    }

    const res = await fetch("/api/products", {
      method: "POST",
      body: formData,
    });
    // console.log(res);
    if (res.status == 500) {
      toast.error("A ocurrido un error en el servidor");
    }
    if (res.status == 400) {
      toast.error("El SKU ya esta asignado a otro producto");
    }
    if (res.ok) {
      form.current.reset();
      router.refresh();
      router.push("/admin/products/");
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
            htmlFor="nameProduct"
            className="block mb-2 text-sm font-bold text-primaryBlue"
          >
            Nombre del producto:
          </label>
          <input
            name="nameProduct"
            type="text"
            // placeholder="Marr"
            onChange={handleChange}
            value={product.nameProduct}
            className="w-full px-3 py-2 border shadow appearance-none"
            autoFocus
          />

          <label
            htmlFor="priceLocal"
            className="block my-2 text-sm font-bold text-primaryBlue"
          >
            SKU:
            <i className="font-light">
              <span className="text-red-700"> *</span> El sku tiene que ser
              unico
            </i>
          </label>
          <input
            name="sku"
            type="text"
            // placeholder="Marr"
            onChange={handleChange}
            value={product.sku}
            className="w-full px-3 py-2 border shadow appearance-none"
            required
          />
          <label
            htmlFor="priceLocal"
            className="block my-2 text-sm font-bold text-primaryBlue"
          >
            Precio local:
          </label>
          <input
            name="priceLocal"
            type="text"
            // placeholder="Marr"
            onChange={handleChange}
            value={product.priceLocal}
            className="w-full px-3 py-2 border shadow appearance-none"
            required
          />
          <label
            htmlFor="priceNacional"
            className="block my-2 text-sm font-bold text-primaryBlue"
          >
            Precio Nacional:
          </label>
          <input
            name="priceNacional"
            type="text"
            // placeholder="Marr"
            onChange={handleChange}
            value={product.priceNacional}
            className="w-full px-3 py-2 border shadow appearance-none"
          />
          <label
            htmlFor="priceExt"
            className="block my-2 text-sm font-bold text-primaryBlue"
          >
            Precio Extranjero:
          </label>
          <input
            name="priceExt"
            type="text"
            // placeholder="Marr"
            onChange={handleChange}
            value={product.priceExt}
            className="w-full px-3 py-2 border shadow appearance-none"
          />
          <label
            htmlFor="descriptionProduct"
            className="block my-2 text-sm font-bold text-primaryBlue"
          >
            Descripción del producto:
          </label>
          <input
            name="descriptionProduct"
            type="text"
            // placeholder="Marr"
            onChange={handleChange}
            value={product.descriptionProduct}
            className="w-full px-3 py-2 border shadow appearance-none"
          />
          <label
            htmlFor="stockProduct"
            className="block my-2 text-sm font-bold text-primaryBlue"
          >
            Stock:
          </label>
          <input
            name="stockProduct"
            type="text"
            // placeholder="Marr"
            onChange={handleChange}
            value={product.stockProduct}
            className="w-full px-3 py-2 border shadow appearance-none"
            required
          />
          <label
            htmlFor="unitsPackage"
            className="block my-2 text-sm font-bold text-primaryBlue"
          >
            Unidades por paquete:
          </label>
          <input
            name="unitsPackage"
            type="text"
            // placeholder="Marr"
            onChange={handleChange}
            value={product.unitsPackage}
            className="w-full px-3 py-2 border shadow appearance-none"
            required
          />
          <label
            htmlFor="published"
            className="block my-2 text-sm font-bold text-primaryBlue"
          >
            Visibilidad:
          </label>

          <select
            name="published"
            onChange={handleChange}
            value={product.published}
            className="w-full px-3 py-2 border shadow"
            required
          >
            <option value="true">Publicado</option>
            <option value="false">Borrador</option>
          </select>

          <label
            htmlFor="enterpriseId"
            className="block my-2 text-sm font-bold text-primaryBlue"
          >
            Marca:
          </label>
          <select
            name="enterpriseId"
            onChange={handleChange}
            value={product.enterpriseId}
            className="w-full px-3 py-2 border shadow"
            required
          >
            <option value="">Selecciona una marca</option>
            {enterpriseOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <label
            htmlFor="categories"
            className="block my-2 text-sm font-bold text-primaryBlue"
          >
            División:
          </label>
          <div className="flex flex-col space-y-2">
            {categoryOptions.map((option) => (
              <label key={option.value} className="flex items-center space-x-2">
                <input
                  name="categories"
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
            htmlFor="productImage"
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
            required
          />

          {file && (
            <img
              className="object-contain mx-auto my-4 w-96"
              src={URL.createObjectURL(file)}
              alt=""
            />
          )}

          <button className="px-4 py-2 mt-4 font-bold text-white bg-primaryBlue">
            {params.id ? "Actualizar" : "Crear"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
