"use client";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const lang = {
  en: {
    "sku-unique": "The SKU must be unique",
    "item-name": "Item name",
    "local-price": "Local Price",
    "national-price": "National Price",
    "foreign-price": "Foreign Price",
    "product-description": "Product description",
    stock: "Stock",
    "units-package": "Units per package",
    visibility: "Visibility",
    published: "Published",
    draft: "Draft",
    division: "Division",
    "select-brand": "Select a brand",
    brand: "Brand",
    image: "Image",
    create: "Create",
    save: "Save",
    refresh: "Refresh",
    logo: "Logo",
    "brand-name": "Brand name",
    "brand-name-exists": "This brand name already exists",
    "error-server": "An error has occurred on the server",
    "error-retrieving-companies": "Error while retrieving the brands",
    "error-retrieving-categories": "Error while retrieving the categories",
    "sku-already-assigned": "The SKU is already assigned to another product",
  },
  es: {
    "sku-unique": "El sku tiene que ser único",
    "item-name": "Nombre del producto",
    "local-price": "Precio Local",
    "national-price": "Precio Nacional",
    "foreign-price": "Precio Extranjero",
    "product-description": "Descripción del producto",
    stock: "Stock",
    "units-package": "Unidades por paquete",
    visibility: "Visibilidad",
    published: "Publicado",
    draft: "Borrador",
    "select-brand": "Selecciona una marca",
    image: "Imagen",
    logo: "Logo",
    create: "Crear",
    save: "Guardar",
    refresh: "Actualizar",
    brand: "Marca",
    division: "División",
    "property-name": "Nombre de la propiedad",
    "brand-name": "Nombre de la marca",
    "brand-name-exists": "El nombre de la marca ya existe",
    "error-server": "A ocurrido un error en el servidor",
    "error-retrieving-companies": "Error al obtener las marcas",
    "error-retrieving-categories": "Error al obtener las categorias",
    "sku-already-assigned": "El SKU ya está asignado a otro producto",
  },
};

export default function EditProductPage({ params }) {
  const [product, setProduct] = useState({
    sku: "",
    nameProduct: "",
    old_imageProduct: "",
    priceLocal: null,
    priceNacional: null,
    priceExt: null,
    descriptionProduct: "",
    stockProduct: null,
    unitsPackage: null,
    published: true,
    enterpriseId: null,
    categories: [],
  });
  const [file, setFile] = useState(null);
  const form = useRef(null);
  const router = useRouter();

  const [categoryOptions, setCategryOptions] = useState([]);
  const [enterpriseOptions, setEnterpriseOptions] = useState([]);
  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      // console.log(e.target.checked);
      if (e.target.checked) {
        // console.log(e.target.name);
        setProduct({
          ...product,
          [e.target.name]: [
            ...product[e.target.name],
            parseInt(e.target.value),
          ],
        });
      } else {
        setProduct({
          ...product,
          [e.target.name]: product[e.target.name].filter(
            (item) => item !== parseInt(e.target.value)
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
    fetch(`/api/products/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        // Extraer los IDs de las empresas y establecerlos como opciones
        const categories = [];
        data.product.categories.forEach((category) => {
          categories.push(category.id);
        });
        setProduct({
          sku: data.product.sku,
          nameProduct: data.product.nameProduct,
          old_imageProduct: data.product.imageProduct,
          priceLocal: data.product.priceLocal,
          priceNacional: data.product.priceNacional,
          priceExt: data.product.priceExt,
          descriptionProduct: data.product.descriptionProduct,
          stockProduct: data.product.stockProduct,
          unitsPackage: data.product.unitsPackage,
          published: data.product.published,
          enterpriseId: data.product.enterpriseId,
          categories: categories,

          // UPDATE `User` SET `password` = '$2a$12$mm75a9HEcagLhHJwDcRrBeEIaFhWMkZa1b8CXczhpvTfdLVZNzT4W' WHERE `User`.`id` = 1
        });
        // const options = data.enterprises.map((enterprise) => ({
        //   value: enterprise.id,
        //   label: enterprise.enterpriseName, // Supongamos que el nombre de la empresa se llama 'name'
        // }));
        // setEnterpriseOptions(options);
      })
      .catch((error) => {
        console.error("Error al obtener el producto:", error);
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
        console.error(lang[params.lang]["error-retrieving-categories"], error);
      });
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("sku", product.sku);
    formData.append("nameProduct", product.nameProduct);
    formData.append("priceLocal", product.priceLocal);
    formData.append("priceNacional", product.priceNacional);
    // formData.append("priceExt", product.priceExt);
    formData.append("descriptionProduct", product.descriptionProduct);
    formData.append("stockProduct", product.stockProduct);
    formData.append("unitsPackage", product.unitsPackage);
    formData.append("published", product.published);
    formData.append("enterpriseId", product.enterpriseId);
    formData.append("categories", product.categories);
    formData.append("old_image", product.old_imageProduct);

    if (file) {
      formData.append("imageProduct", file);
    }

    const res = await fetch(`/api/products/${params.id}`, {
      method: "PUT",
      body: formData,
    });

    if (res.ok) {
      form.current.reset();
      router.refresh();
      router.push(`/${params.lang}/admin/products/`);
    }
    if (res.status == 500 || res.status == 405) {
      toast.error(lang[params.lang]["error-server"]);
    }
    if (res.status == 400) {
      toast.error(lang[params.lang]["sku-already-assigned"]);
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
            {lang[params.lang]["item-name"]}:
          </label>
          <input
            name="nameProduct"
            type="text"
            // placeholder="Marr"
            onChange={handleChange}
            value={product.nameProduct}
            className="w-full px-3 py-2 border shadow appearance-none"
            autoFocus
            required
          />

          <label
            htmlFor="priceLocal"
            className="block my-2 text-sm font-bold text-primaryBlue"
          >
            SKU:
            <i className="font-light">
              <span className="text-red-700"> *</span>{" "}
              {lang[params.lang]["sku-unique"]}
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
            {lang[params.lang]["local-price"]}:
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
            {lang[params.lang]["national-price"]}:
          </label>
          <input
            name="priceNacional"
            type="text"
            // placeholder="Marr"
            onChange={handleChange}
            value={product.priceNacional}
            className="w-full px-3 py-2 border shadow appearance-none"
          />
          {/* <label
            htmlFor="priceExt"
            className="block my-2 text-sm font-bold text-primaryBlue"
          >
            {lang[params.lang]["foreign-price"]}:
          </label>
          <input
            name="priceExt"
            type="text"
            onChange={handleChange}
            value={product.priceExt}
            className="w-full px-3 py-2 border shadow appearance-none"
          /> */}
          <label
            htmlFor="descriptionProduct"
            className="block my-2 text-sm font-bold text-primaryBlue"
          >
            {lang[params.lang]["product-description"]}:
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
            {lang[params.lang]["units-package"]}:
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
            {lang[params.lang]["visibility"]}:
          </label>

          <select
            name="published"
            onChange={handleChange}
            value={product.published}
            className="w-full px-3 py-2 border shadow"
            required
          >
            <option value="true">{lang[params.lang]["published"]}</option>
            <option value="false">{lang[params.lang]["draft"]}</option>
          </select>

          <label
            htmlFor="enterpriseId"
            className="block my-2 text-sm font-bold text-primaryBlue"
          >
            {lang[params.lang]["brand"]}:
          </label>
          <select
            name="enterpriseId"
            onChange={handleChange}
            value={product.enterpriseId}
            className="w-full px-3 py-2 border shadow"
            required
          >
            <option value="">{lang[params.lang]["select-brand"]}</option>
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
            {lang[params.lang]["division"]}:
          </label>
          <div className="flex flex-col space-y-2">
            {categoryOptions.map((option) => (
              <label key={option.value} className="flex items-center space-x-2">
                <input
                  name="categories"
                  type="checkbox"
                  value={option.value}
                  onChange={handleChange}
                  checked={product.categories.includes(option.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>

          <label
            htmlFor="productImage"
            className="block my-2 text-sm font-bold text-primaryBlue"
          >
            {lang[params.lang]["image"]}:
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
              src={product.old_imageProduct}
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
