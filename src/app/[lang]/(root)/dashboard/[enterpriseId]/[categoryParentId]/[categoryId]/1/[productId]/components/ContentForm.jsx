"use client";
// import PritingForm from "./PrintingForm";
import toast from "react-hot-toast";
// import { Stage, Layer, Text } from "react-konva";
import { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js";
import useCart from "@/app/hooks/use-cart";

const URL = process.env.NEXT_PUBLIC_API_URL;

export default function ContentForm({ product, user, params }) {
  // console.log(params);
  const [isMounted, setIsMounted] = useState(false);
  const [addItem, setAddItem] = useState(false);
  const cart = useCart();
  // console.log(user);
  // console.log(cart);
  // console.log(product);
  // console.log(product.categories);
  const isTarjeta = product.categories.some(
    (categoria) => categoria.categoryName === "Tarjetas"
  );
  // console.log(isTarjeta);
  const prices = { 1: "priceLocal", 2: "priceNacional", 3: "priceExtE" };
  // const priceProduct = product[prices[user.typePrice]];
  // console.log(priceProduct);
  product.priceExtE = Math.round(product.priceLocal / 18.5);
  const data = {
    ...product,
    currency: user.currency,
    price: product[prices[user.typePrice]],
  };
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

  // const [imageData, setImageData] = useState(null);
  const tableRef = useRef();

  const handleCapture = async () => {
    const table = tableRef.current;

    try {
      const canvas = await html2canvas(table);
      const dataUrl = canvas.toDataURL("image/png");
      const response = await fetch(`${URL}/save-img/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataUrl),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const res = await response.json();
      data.imgTarjeta = res.imageName;
      // console.log(res.imageName);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleOpenPDF = async () => {
    // Obtén el elemento de la tabla por su id o clase
    const element = document.getElementById("tarjeta");

    // Configura las opciones para la generación del PDF
    const options = {
      margin: 10,
      filename: "documento.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 3 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    const pdf = await html2pdf().set(options).from(element).save();
    // console.log(pdf);
    // const pdf = await html2pdf().from(element).outputPdf();
    // const blob = new Blob([pdf], { type: "application/pdf" });
    // const url = URL.createObjectURL(blob);
    // console.log(url);
    // Genera el PDF
    // html2pdf(element, options).then((pdf) => {
    //   // Crea un objeto URL para el PDF
    //   // console.log("comienza");
    //   const pdfURL = URL.createObjectURL(pdf.output("blob"));
    //   console.log("here");

    //   // Abre el PDF en una nueva ventana o pestaña
    //   window.open(pdfURL, "_blank");

    //   // Importante: libera el objeto URL después de un tiempo para evitar pérdidas de memoria
    //   setTimeout(() => {
    //     URL.revokeObjectURL(pdfURL);
    //   }, 1000);
    // });
  };

  // const [state, setState] = useState({
  //   isDragging: false,
  //   x: 500,
  //   y: 0,
  // });

  const form = useRef(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // console.log(dataForm);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isTarjeta) {
      if (
        !formData.cardName ||
        !formData.cardEmail ||
        !formData.position ||
        !formData.cardPhone ||
        !formData.cardQuantity
      ) {
        const camposVacios = [];

        if (!formData.cardName && isTarjeta) {
          camposVacios.push("Nombre");
        }

        if (!formData.cardEmail && isTarjeta) {
          camposVacios.push("Correo");
        }

        if (!formData.position && isTarjeta) {
          camposVacios.push("Cargo");
        }

        if (!formData.cardPhone && isTarjeta) {
          camposVacios.push("Teléfono");
        }
        if (!formData.cardQuantity) {
          camposVacios.push("Cantidad");
        }
        // console.log(e);
        // toast.error("Por favor, completa todos los campos obligatorios.");
        const mensaje = `Por favor, completa los siguientes campos obligatorios: ${camposVacios.join(
          ", "
        )}.`;

        toast.error(mensaje);
        return;
      }
      await handleCapture();
    }
    data.quantity = formData.cardQuantity;
    // console.log(product);
    // console.log(data);
    data.formData = formData;
    data.total = data.price;
    // console.log(data);
    cart.addItem(data);
    setAddItem(true);
    // window.location.href = `/${lang}/dashboard/thankyou?saleId=${data.sale.id}&email=${primaryEmail}`;
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="grid-cols-2 gap-10 lg:grid justify-items-center">
      <div className="w-full p-2 my-3 bg-white rounded-lg shadow-2xl md:w-2/3">
        <div className="w-full p-2 my-3 bg-white">
          {/* <PritingForm onSubmit={handleFormSubmit} /> */}
          <form
            className="px-8 pt-6 pb-8 mb-4 bg-white"
            onSubmit={handleSubmit}
            ref={form}
          >
            {isTarjeta ? (
              <>
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
                  onChange={handleChange}
                  // value={product.nameProduct}
                  maxLength={50}
                  className="w-full px-3 py-2 border shadow appearance-none"
                  required
                  autoFocus
                />
              </>
            ) : null}

            {isTarjeta ? (
              <>
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
                  maxLength={57}
                  // placeholder="Marr"
                  onChange={handleChange}
                  // value={product.sku}
                  className="w-full px-3 py-2 border shadow appearance-none"
                  required
                />
              </>
            ) : null}

            {isTarjeta ? (
              <>
                <label
                  htmlFor="position2"
                  className="block my-2 text-sm font-bold text-primaryBlue"
                >
                  {/* {lang[params.lang]["local-price"]}: */}
                  Cargo 2
                </label>
                <input
                  name="position2"
                  type="text"
                  // placeholder="Marr"
                  maxLength={50}
                  onChange={handleChange}
                  // value={product.priceLocal}
                  className="w-full px-3 py-2 border shadow appearance-none"
                />
              </>
            ) : null}

            {isTarjeta ? (
              <>
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
                  maxLength={50}
                  // placeholder="Marr"
                  onChange={handleChange}
                  // value={product.priceNacional}
                  className="w-full px-3 py-2 border shadow appearance-none"
                />
              </>
            ) : null}

            {isTarjeta ? (
              <>
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
                  maxLength={27}
                  // placeholder="Marr"
                  onChange={handleChange}
                  // value={product.descriptionProduct}
                  className="w-full px-3 py-2 border shadow appearance-none"
                />
              </>
            ) : null}

            {isTarjeta ? (
              <>
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
                  maxLength={31}
                  // placeholder="Marr"
                  onChange={handleChange}
                  // value={product.stockProduct}
                  className="w-full px-3 py-2 border shadow appearance-none"
                  required
                />
              </>
            ) : null}

            {isTarjeta ? (
              <>
                <label
                  htmlFor="cardPhone2"
                  className="block my-2 text-sm font-bold text-primaryBlue"
                >
                  {/* {lang[params.lang]["units-package"]}: */}
                  Teléfono 2
                </label>
                <input
                  name="cardPhone2"
                  type="text"
                  maxLength={27}
                  // placeholder="Marr"
                  onChange={handleChange}
                  // value={product.unitsPackage}
                  className="w-full px-3 py-2 border shadow appearance-none"
                  required
                />
              </>
            ) : null}

            {isTarjeta ? (
              <>
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
                  <option value="">Seleccionar</option>
                  <option value="Blvd. Kukulcán Km 2.7, Zona Hotelera, Cancún, Quintana Roo">
                    Blvd. Kukulcán Km 2.7, Zona Hotelera, Cancún, Quintana Roo
                  </option>
                  <option value="Av.Tulum 290, Esq. Pioneros, Cancún, Quintana Roo México">
                    Av.Tulum 290, Esq. Pioneros, Cancún, Quintana Roo México
                  </option>
                  <option value="Blvd. Kukulcán Km 9, Zona Hotelera, Cancún, Quintana Roo">
                    Blvd. Kukulcán Km 9, Zona Hotelera, Cancún, Quintana Roo
                  </option>
                  <option value="Ctra. Chetumal-Puerto Juárez 282, Rancho Xcaret, Quintana Roo">
                    Ctra. Chetumal-Puerto Juárez 282, Rancho Xcaret, Quintana
                    Roo
                  </option>
                  <option value="Ctra. Chetumal-Puerto Juárez 240, Cozumel, Quintana Roo">
                    Ctra. Chetumal-Puerto Juárez 240, Cozumel, Quintana Roo
                  </option>
                  <option value="Hotel Xcaret México, Riviera Maya, Quintana Roo">
                    Hotel Xcaret México, Riviera Maya, Quintana Roo
                  </option>
                  <option value="Calle 41 No. 214, Valladolid, Yucatan">
                    Calle 41 No. 214, Valladolid, Yucatan
                  </option>
                  <option value="Calle Acceso Etapa H, Akumal, Quintana Roo">
                    Calle Acceso Etapa H, Akumal, Quintana Roo
                  </option>
                  <option value="Blvd. Kukulcán Km 4.5, Zona Hotelera, Cancún, Quintana Roo">
                    Blvd. Kukulcán Km 4.5, Zona Hotelera, Cancún, Quintana Roo
                  </option>
                </select>
              </>
            ) : null}

            {isTarjeta ? (
              <>
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
                  <option value="">Seleccionar</option>
                  <option value="C.P. 77511">C.P. 77511</option>
                  <option value="C.P. 77710">C.P. 77710</option>
                  <option value="C.P. 77780">C.P. 77780</option>
                  <option value="C.P. 77580">C.P. 77580</option>
                  <option value="C.P. 97780">C.P. 97780</option>
                  <option value="C.P. 77776">C.P. 77776</option>
                  {/* <option value="">{lang[params.lang]["select-brand"]}</option>
              {enterpriseOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))} */}
                </select>
              </>
            ) : null}

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
              <option value="">Seleccionar</option>
              <option value={100}>100</option>
              <option value={200}>200</option>
              <option value={300}>300</option>
              <option value={400}>400</option>
              <option value={500}>500</option>
            </select>

            {/* <button type="submit">Submit</button> */}
          </form>
        </div>
        {/* <ContentForm /> */}
      </div>
      <div className="">
        <div ref={tableRef} id="tarjeta">
          {/* <div>
          <Stage width="100vw" height={window.innerHeight}>
            <Layer>
              <Text
                text={formData.cardName}
                x={state.x}
                y={state.y}
                draggable
                fill={state.isDragging ? "green" : "black"}
                onDragStart={() => {
                  setState({
                    isDragging: true,
                  });
                }}
                onDragEnd={(e) => {
                  setState({
                    isDragging: false,
                    x: e.target.x(),
                    y: e.target.y(),
                  });
                }}
              />
            </Layer>
          </Stage>
        </div> */}
          {/* {(formData.cardEmail.length * 16) / 248}
        {formData.cardEmail.length / 248} */}
          {isTarjeta ? (
            <>
              <table
                background={product.imageProduct}
                className="bg-no-repeat bg-cover"
                width="498"
                height="275"
              >
                <tr>
                  <td width="40%"></td>
                  <td width="60%" className="align-top">
                    <p className="px-5 py-0 pt-5 my-0 text-lg font-bold text-right capitalize">
                      {formData.cardName}
                    </p>
                    <p className="px-5 py-0 my-0 leading-4 text-right capitalize">
                      {formData.position}
                    </p>
                    <p className="px-5 py-0 my-0 leading-4 text-right capitalize">
                      {formData.position2}
                    </p>
                    <p className="px-5 py-0 my-0 leading-4 text-right capitalize">
                      {formData.position3}
                    </p>
                  </td>
                </tr>
                {/* <tr>
            <td width="50%"></td>
            <td width="50%">
              <p className="px-5 leading-4 text-right capitalize">
                {formData.position}
              </p>
              <p className="px-5 leading-4 text-right capitalize">
                {formData.position2}
              </p>
              <p className="px-5 leading-4 text-right capitalize">
                {formData.position3}
              </p>
            </td>
          </tr> */}
                {/* <tr>
            <td width="50%"></td>
            <td width="50%">
              <p className="px-5 leading-4 text-right capitalize">
                {formData.position3}
              </p>
            </td>
          </tr> */}
                {/* <tr>
            <td width="50%"></td>
            <td width="50%">
              <p className="px-5 leading-4 text-right">{formData.cardEmail}</p>
            </td>
          </tr> */}
                <tr>
                  <td width="50%"></td>
                  <td width="50%">
                    <p className="py-0 pr-5 my-0 leading-4 text-justify">
                      {formData.cardEmail}
                    </p>
                    <p className="py-0 pr-5 my-0 leading-4 text-justify capitalize ">
                      {formData.cardPhone}
                    </p>
                    <p className="py-0 pr-5 my-0 leading-4 text-justify capitalize ">
                      {formData.cardPhone2}
                    </p>
                    <p className="py-0 pr-5 my-0 leading-4 text-justify capitalize">
                      {formData.cardAddress} {formData.cardCP}
                    </p>
                  </td>
                </tr>
                {/* <tr>
            <td width="50%"></td>
            <td width="50%">
              <p className="px-5 leading-4 text-right capitalize">
                {formData.cardPhone2}
              </p>
            </td>
          </tr> */}
                {/* <tr>
            <td width="50%"></td>
            <td width="50%">
              <p className="px-5 leading-4 text-right capitalize">
                {formData.cardAddress}, {formData.cardCP}
              </p>
            </td>
          </tr> */}
              </table>
            </>
          ) : (
            <img src={product.imageProduct} width={500} alt="" />
          )}
          {/* <img src={product.imageProduct} width={500} alt="" /> */}
          <br />
          <br />
          {product.imageProduct2 ? (
            <img src={product.imageProduct2} width={500} alt="" />
          ) : null}
        </div>
        <div className="flex flex-col items-center mt-6">
          <div className="w-full mb-4">
            {isTarjeta ? (
              <button
                onClick={handleOpenPDF}
                className="block w-full px-4 py-2 text-xs text-center text-white shadow bg-primaryBlue md:text-sm"
              >
                Generar PDF
              </button>
            ) : null}
            {/* <button onClick={handleCapture}>Capturar como imagen</button> */}

            {/* {imageData && (
              <div>
                <p>Imagen generada:</p>
                <img src={imageData} alt="Captura de tabla" width={495} />
              </div>
            )} */}
          </div>
          <div className="w-full">
            <button
              onClick={handleSubmit}
              className="block w-full px-4 py-2 text-xs text-center text-white shadow bg-primaryBlue md:text-sm"
            >
              Agregar al carrito
            </button>
          </div>
          {addItem ? (
            <div className="w-full">
              <a
                href={`/${params.lang}/dashboard/${params.enterpriseId}/${params.categoryParentId}`}
                className="block w-full px-4 py-2 mt-4 text-xs text-center text-white shadow bg-primaryBlue md:text-sm"
              >
                Seguir comprando
              </a>
            </div>
          ) : null}
          {/* <div className="w-full">
            <button
              onClick={handleCapture}
              className="block w-full px-4 py-2 mt-4 text-xs text-center text-white shadow bg-primaryBlue md:text-sm"
            >
              Guardad PDF
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
