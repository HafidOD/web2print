export default function page({ params }) {
  // console.log(params);
  return (
    <div className="w-full px-2 py-16 m-auto md:w-2/5 sm:px-0">
      <h2 className="mb-5 text-2xl text-primaryBlue">Información de entrega</h2>

      <section className="">
        <div className="w-full p-2 my-3 bg-white rounded-lg shadow-2xl">
          <form
            className="px-8 pt-6 pb-8 mb-4 bg-white"
            // onSubmit={handleSubmit}
            // ref={form}
          >
            <label
              htmlFor="attentionName"
              className="block mb-2 text-sm font-bold text-primaryBlue"
            >
              {/* {lang[params.lang]["item-name"]}: */}
              Atención a:
            </label>
            <input
              name="attentionName"
              type="text"
              // placeholder="Marr"
              // onChange={handleChange}
              // value={product.nameProduct}
              className="w-full px-3 py-2 border shadow appearance-none"
              required
              autoFocus
            />

            <label
              htmlFor="commentsShipping"
              className="block my-2 text-sm font-bold text-primaryBlue"
            >
              {/* {lang[params.lang]["units-package"]}: */}
              Comentarios adicionales:
            </label>
            <textarea
              name="commentsShipping"
              // placeholder="Marr"
              // onChange={handleChange}
              // value={product.unitsPackage}
              className="w-full px-3 py-2 border shadow appearance-none"
            />
            <br />
            <br />
            <a
              href={`/${params.lang}/dashboard/direccion`}
              className="px-4 py-2 mt-5 text-xs text-white shadow bg-primaryBlue md:text-sm"
            >
              Seleccionar Dirección
            </a>
          </form>
        </div>
      </section>
    </div>
  );
}
