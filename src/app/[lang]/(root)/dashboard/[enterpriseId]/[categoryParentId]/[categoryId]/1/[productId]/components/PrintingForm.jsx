"use client";

import { useState, forwardRef, useImperativeHandle } from "react";

const PrintingForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    cardName: "",
    position: "",
    position2: "",
    position3: "",
    cardEmail: "",
    cardPhone: "",
    cardPhone2: "",
    cardAddress: "",
    cardCP: "",
    cardComments: "",
    cardQuantity: null,
  });

  // const form = useRef(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // console.log(dataForm);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Llamar a la función proporcionada por las props para enviar los datos
    onSubmit(formData);
  };

  useImperativeHandle(ref, () => ({
    handleSubmit,
  }));

  return (
    <div>
      <form
        className="px-8 pt-6 pb-8 mb-4 bg-white"
        // onSubmit={handleSubmit}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        // ref={form}
      >
        <label
          htmlFor="cardName"
          className="block mb-2 text-sm font-bold text-primaryBlue"
        >
          {/* {lang[params.lang]["item-name"]}: */}
          Nombre
          <i className="font-light">
            <span className="text-red-700"> *</span>
          </i>
        </label>
        <input
          name="cardName"
          type="text"
          // placeholder="Marr"
          onChange={handleChange}
          // value={product.nameProduct}
          className="w-full px-3 py-2 border shadow appearance-none"
          required
          autoFocus
        />

        <label
          htmlFor="position"
          className="block my-2 text-sm font-bold text-primaryBlue"
        >
          Cargo:
          <i className="font-light">
            <span className="text-red-700"> *</span>
          </i>
        </label>
        <input
          name="position"
          type="text"
          // placeholder="Marr"
          onChange={handleChange}
          // value={product.sku}
          className="w-full px-3 py-2 border shadow appearance-none"
          required
        />
        <label
          htmlFor="position2"
          className="block my-2 text-sm font-bold text-primaryBlue"
        >
          {/* {lang[params.lang]["local-price"]}: */}
          Cargo 2
          <i className="font-light">
            <span className="text-red-700"> *</span>
          </i>
        </label>
        <input
          name="position2"
          type="text"
          // placeholder="Marr"
          onChange={handleChange}
          // value={product.priceLocal}
          className="w-full px-3 py-2 border shadow appearance-none"
          required
        />
        <label
          htmlFor="position3"
          className="block my-2 text-sm font-bold text-primaryBlue"
        >
          {/* {lang[params.lang]["national-price"]}: */}
          Cargo 3
        </label>
        <input
          name="position3"
          type="text"
          // placeholder="Marr"
          onChange={handleChange}
          // value={product.priceNacional}
          className="w-full px-3 py-2 border shadow appearance-none"
        />
        <label
          htmlFor="cardEmail"
          className="block my-2 text-sm font-bold text-primaryBlue"
        >
          {/* {lang[params.lang]["product-description"]}: */}
          Correo
          <i className="font-light">
            <span className="text-red-700"> *</span>
          </i>
        </label>
        <input
          name="cardEmail"
          type="email"
          // placeholder="Marr"
          onChange={handleChange}
          // value={product.descriptionProduct}
          className="w-full px-3 py-2 border shadow appearance-none"
        />
        <label
          htmlFor="cardPhone"
          className="block my-2 text-sm font-bold text-primaryBlue"
        >
          Teléfono:
          <i className="font-light">
            <span className="text-red-700"> *</span>
          </i>
        </label>
        <input
          name="cardPhone"
          type="text"
          // placeholder="Marr"
          onChange={handleChange}
          // value={product.stockProduct}
          className="w-full px-3 py-2 border shadow appearance-none"
          required
        />
        <label
          htmlFor="cardPhone2"
          className="block my-2 text-sm font-bold text-primaryBlue"
        >
          {/* {lang[params.lang]["units-package"]}: */}
          Teléfono 2
          <i className="font-light">
            <span className="text-red-700"> *</span>
          </i>
        </label>
        <input
          name="cardPhone2"
          type="text"
          // placeholder="Marr"
          onChange={handleChange}
          // value={product.unitsPackage}
          className="w-full px-3 py-2 border shadow appearance-none"
          required
        />
        <label
          htmlFor="cardAddress"
          className="block my-2 text-sm font-bold text-primaryBlue"
        >
          {/* {lang[params.lang]["visibility"]}: */}
          Dirección
        </label>

        <select
          name="cardAddress"
          onChange={handleChange}
          // value={product.published}
          className="w-full px-3 py-2 border shadow"
        >
          <option value="Direccion1">direccion 1</option>
          <option value="Direccion2">direccion 2</option>
        </select>

        <label
          htmlFor="cardCP"
          className="block my-2 text-sm font-bold text-primaryBlue"
        >
          {/* {lang[params.lang]["brand"]}: */}
          CP
        </label>
        <select
          name="cardCP"
          onChange={handleChange}
          // value={product.enterpriseId}
          className="w-full px-3 py-2 border shadow"
        >
          <option value="CP1">cp 1</option>
          <option value="CP2">cp 2</option>
          {/* <option value="">{lang[params.lang]["select-brand"]}</option>
              {enterpriseOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))} */}
        </select>
        <label
          htmlFor="cardComments"
          className="block my-2 text-sm font-bold text-primaryBlue"
        >
          {/* {lang[params.lang]["units-package"]}: */}
          Comentarios adicionales:
        </label>
        <textarea
          name="cardComments"
          // placeholder="Marr"
          onChange={handleChange}
          // value={product.unitsPackage}
          className="w-full px-3 py-2 border shadow appearance-none"
        />

        <label
          htmlFor="cardQuantity"
          className="block my-2 text-sm font-bold text-primaryBlue"
        >
          {/* {lang[params.lang]["visibility"]}: */}
          Catidad
          <i className="font-light">
            <span className="text-red-700"> *</span>
          </i>
        </label>

        <select
          name="cardQuantity"
          onChange={handleChange}
          // value={product.published}
          className="w-full px-3 py-2 border shadow"
          required
        >
          <option value="100">100</option>
          <option value="200">200</option>
          <option value="300">300</option>
          <option value="400">400</option>
        </select>

        {/* <button type="submit">Submit</button> */}
      </form>
    </div>
  );
};

export default PrintingForm;
