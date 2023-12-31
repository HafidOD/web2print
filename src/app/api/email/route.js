import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import prisma from "@/libs/prisma";
import { getDictionary } from "@/utils/dictionary";

export async function POST(req) {
  const items = await req.json();
  // console.log(items);
  // console.log(items.lang);
  try {
    const totalSale = items.items.reduce((total, item) => {
      return total + item.total;
    }, 0);
    // console.log(items.user.id);
    // console.log(items.items[0].enterpriseId);
    const sale = await prisma.sale.create({
      data: {
        userId: items.user.id,
        totalSale: totalSale,
        data: JSON.stringify(items),
        address: JSON.stringify(items.address),
        enterpriseInt: items.items[0].enterpriseId,
        date: new Date(),
      },
    });
    const lang = await getDictionary(items.lang);
    // console.log(lang);
    // const currentDate = new Date("2023-08-07 17:51:38.035").toLocaleDateString(
    //   "es-MX"
    // );
    // console.log(sale);
    const currentDate = new Date().toLocaleDateString("es-MX");
    const emailContent = generateEmailContent(
      items,
      totalSale,
      currentDate,
      sale.id,
      lang
    );
    // console.log(emailContent);
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    // if (items.user.email != "masteruser@marriott.com") {
    const mailOptions = {
      from: `"Web2Print" <${process.env.SMTP_USER}>`,
      // to: `hafid@tachuela.mx`,
      // to: `${items.user.email}, marriott@gruporegio.mx, paloma.berumen@marriott.com, Asenath.araque@marriott.com, Amanda.k.perez@marriott.com, carlos.olguin@marriott.com, hafid@tachuela.mx`,
      to: `${items.user.email}, marriott@gruporegio.mx`,
      subject: "Solicitud de pedido Web2Print",
      html: emailContent,
    };
    // } else {
    //   var mailOptions = {
    //     from: `"Web2Print" <${process.env.SMTP_USER}>`,
    //     // to: `hafid@tachuela.mx`,
    //     to: `${items.user.email}, paloma.berumen@marriott.com, hafid@tachuela.mx, marriott@gruporegio.mx`,
    //     subject: "Solicitud de pedido Web2Print",
    //     html: emailContent,
    //   };
    // }
    // return NextResponse.json({
    //   menssage:
    //     "<h1>Detalles del Pedido</h1><p>Pedido para: Marriott Los Cabos</p><p>Usuario: Hafidj</p><p>Teléfono: 9981538039</p><p>Fecha de solicitud: 10/11/2023</p><p>Dirección de envio: Bonvoy Cancúnf, Conocida Cancún México Quintana Roo 77500</p><table><thead><tr><th style='padding:2px 10px'>Imagen</th><th style='padding:2px 10px'>Producto</th><th style='padding:2px 10px'>SKU</th><th style='padding:2px 10px'>Precio</th><th style='padding:2px 10px'>Cantidad</th><th style='padding:2px 10px'>Total</th><th style='padding:2px 10px'>Moneda</th></tr></thead><tbody><tr><td style='padding:2px 10px'><img src=http://localhost:3000https://res.cloudinary.com/dfvesf8qn/image/upload/v1695402289/j2uid2xc83unc40gr9tv.png width=\"100\" alt=Advanced Check In Card></td><td style='padding:2px 10px'>Advanced Check In Card</td><td style='padding:2px 10px'>STR-STA-ABB</td><td style='padding:2px 10px'>114</td><td style='padding:2px 10px'>1</td><td style='padding:2px 10px'>$114</td><td style='padding:2px 10px'>MXN</td></tr><tr><td style='padding:2px 10px'></td><td style='padding:2px 10px'></td><td style='padding:2px 10px'></td><td style='padding:2px 10px'></td><td style='padding:2px 10px'></td><td style='padding:2px",
    // });
    const info = await transporter.sendMail(mailOptions);
    // console.log("Email sent: " + info.response);
    return NextResponse.json(
      { message: "email enviado", sale: sale },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ message: "error", error }, { status: 500 });
    // throw error;
  }
}

function generateEmailContent(items, totalSale, currentDate, saleId, lang) {
  // console.log(saleId);
  // console.log(totalSale);
  // console.log(currentDate);
  // console.log(lang.pdf.supplier);
  // console.log(
  //   `<a href='${process.env.NEXT_URL_BASE}/${items.lang}/sale/${saleId}'></a>`
  // );
  // Tasa de IVA (porcentaje)
  const tasaIVA = 16; // Cambia esto según la tasa de IVA de pais

  let montoIVA = (totalSale * tasaIVA) / 100;
  // Calcula el subtotal
  let subtotal = totalSale - montoIVA;
  let content = `<table style='width: 100%; border-collapse: collapse'><thead><tr><th style='width: 100%; border: none; padding: 8px'><img src='${process.env.NEXT_URL_BASE}/images/logos/logo_grupo_regio-300.png' alt='' width='140' /></th></tr></thead></table><br />`;
  content += `<p>${lang.order.hello}, ${items.user.name}, ${lang.order["thank-request"]}<br>${lang.order["email-confirmation"]}</p>`;
  content += `<table style="width: 100%; border-collapse: collapse">
      <thead>
        <tr>
          <th style="width: 75%; border: solid 1px; padding: 8px">
            ${lang.pdf.proforma}
          </th>
          <th style="width: 25%; border: solid 1px; padding: 8px">N° ${saleId}</th>
        </tr>
      </thead>
    </table>`;
  content += `<table style="width: 100%; border-collapse: collapse">
      <thead>
        <tr>
          <th
            style="
              width: 100%;
              border: solid 1px;
              border-top: none;
              padding: 8px;
            "
          ></th>
        </tr>
      </thead>
    </table>
    <table style="width: 100%; border-collapse: collapse">
      <tbody>
        <tr>
          <td
            style="
              width: 15%;
              border: solid 1px;
              border-top: none;
              padding: 8px;
            "
          >
            ${lang.pdf.elaborated}:
          </td>
          <td
            style="
              width: 40%;
              border: solid 1px;
              border-top: none;
              padding: 8px;
            "
          >
            ${items.user.name}
          </td>
          <td
            style="
              width: 25%;
              border: solid 1px;
              border-top: none;
              padding: 8px;
            "
          >
            ${lang.pdf.date}:
          </td>
          <td
            style="
              width: 20%;
              border: solid 1px;
              border-top: none;
              padding: 8px;
            "
          >
            ${currentDate}
          </td>
        </tr>
      </tbody>
    </table>`;
  content += `<p>${lang.pdf["request-inf"]}</p>`;
  content += `<table style="width: 100%; border-collapse: collapse">
      <tbody>
        <tr>
          <td style="width: 15%; border: solid 1px; padding: 8px">${
            lang.pdf.hotel
          }:</td>
          <td style="width: 60%; border: solid 1px; padding: 8px">
            ${items.user.property}
          </td>
          <td style="width: 10%; border: solid 1px; padding: 8px">${
            lang.pdf.location
          }</td>
          <td style="width: 15%; border: solid 1px; padding: 8px">${
            items.user.typePrice === 1
              ? "QROO"
              : items.user.typePrice === 2
              ? "NAL"
              : items.user.typePrice === 3
              ? "EXW"
              : ""
          }</td>

        </tr>
      </tbody>
    </table>`;
  content += `<p>${lang.pdf.shipping}</p>`;
  content += `<table style="width: 100%; border-collapse: collapse">
      <tbody>
        <tr>
          <td style="width: 15%; border: solid 1px; padding: 8px">
            ${lang.pdf.address}:
          </td>
          <td style="width: 85%; border: solid 1px; padding: 8px">${
            items.address.officeName
          }: ${items.address.address} ${
    items.address.city ? items.address.city : ""
  } ${items.address.country ? items.address.country : ""} ${
    items.address.state ? items.address.state : ""
  } ${items.address.postalCode ? items.address.postalCode : ""}</td>
        </tr>
      </tbody>
    </table>
    <table style="width: 100%; border-collapse: collapse">
      <tbody>
        <tr>
          <td
            style="
              width: 15%;
              border: solid 1px;
              border-top: none;
              padding: 8px;
            "
          >
            ${lang.pdf.contact}:
          </td>
          <td
            style="
              width: 40%;
              border: solid 1px;
              border-top: none;
              padding: 8px;
            "
          >
            ${items.user.name}
          </td>
          <td
            style="
              width: 15%;
              border: solid 1px;
              border-top: none;
              padding: 8px;
            "
          >
            ${lang.pdf.phone}:
          </td>
          <td
            style="
              width: 30%;
              border: solid 1px;
              border-top: none;
              padding: 8px;
            "
          >
            ${items.user.telefono}
          </td>
        </tr>
      </tbody>
    </table>
    <table style="width: 100%; border-collapse: collapse">
      <tbody>
        <tr>
          <td
            style="
              width: 15%;
              border: solid 1px;
              border-top: none;
              padding: 8px;
            "
          >
            Email:
          </td>
          <td
            style="
              width: 85%;
              border: solid 1px;
              border-top: none;
              padding: 8px;
            "
          >
            ${items.user.email}
          </td>
        </tr>
      </tbody>
    </table>
    <br />`;
  content += `<table style='width: 100%; border-collapse: collapse'>
      <thead>
        <tr>
          <th style="width: 20%; padding: 2px 10px;border: solid 1px;">SKU</th>
          <th style="width: 40%; padding: 2px 10px;border: solid 1px;">${lang.pdf.item}</th>
          <th style="width: 10%; padding: 2px 10px;border: solid 1px;">UOM</th>
          <th style="width: 10%; padding: 2px 10px;border: solid 1px;">${lang.pdf.quantity}</th>
          <th style="width: 10%; padding: 2px 10px;border: solid 1px;">${lang.pdf.UP}</th>
          <th style="width: 10%; padding: 2px 10px;border: solid 1px;">${lang.pdf.total}</th>
        </tr>
      </thead>
      <tbody>`;
  items.items.forEach((producto) => {
    content += `<tr><td style='padding:2px 10px;border: solid 1px;'>${producto.sku}</td><td style='padding:2px 10px;border: solid 1px;'>${producto.nameProduct}</td><td style='padding:2px 10px;border: solid 1px;'>${producto.unitsPackage}</td><td style='padding:2px 10px;border: solid 1px;'>${producto.price}</td><td style='padding:2px 10px;border: solid 1px;'>${producto.quantity}</td><td style='padding:2px 10px;border: solid 1px;'>$${producto.total}</td></tr>`;
  });
  content += `</tbody></table><br />
    <table style="width: 100%; border-collapse: collapse">
      <tbody>
        <tr>
          <td style="width: 70%; border: solid 1px; padding: 8px">
            ${lang.pdf["amounts-expressed"]} ${
    items.user.typePrice === 3 ? lang.pdf.dollars : lang.pdf["mexican-pesos"]
  }<br />
            ${lang.pdf["delivery-service"]}
          </td>
          <td style="width: 10%; border: none; padding: 8px"></td>
          <td style="width: 20%; border: none; padding: 0">
            <table style="width: 100%; border-collapse: collapse">
              <tbody>
                <tr>
                  <td style="width: 50%; border: solid 1px; padding: 8px">
                    Sub total:
                  </td>
                  <td style="width: 50%; border: solid 1px; padding: 8px">
                    $${subtotal}
                  </td>
                </tr>
                <tr>
                  <td style="width: 50%; border: solid 1px; padding: 8px">
                    IVA
                  </td>
                  <td style="width: 50%; border: solid 1px; padding: 8px">
                    $${montoIVA}
                  </td>
                </tr>
                <tr>
                  <td style="width: 50%; border: solid 1px; padding: 8px">
                    Total
                  </td>
                  <td style="width: 50%; border: solid 1px; padding: 8px">
                    $${totalSale}
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <br />`;

  content += `<br /><br /><br /><a href='${process.env.NEXT_URL_BASE}/${items.lang}/sale/${saleId}' style='text-decoration: none; background-color: #193761; color: white; padding: 10px; border-radius: 8px;'>${lang.order["download-pdf"]}</a><br /><br /><br />`;
  content += `<table style="width: 100%; border-collapse: collapse">
      <thead>
        <tr>
          <th
            style="
              width: 10%;
              border: none;
              border-bottom: solid 1px;
              padding: 8px;
            "
          >
            <img src="${process.env.NEXT_URL_BASE}/images/logos/qr.png" alt="" width="80" />
          </th>
          <th style="width: 80%; border: none; padding: 8px"></th>
        </tr>
      </thead>
    </table>`;
  content += `<p>CANCÚN | MIAMI | PUNTA CANA</p>`;
  content += `<table style="width: 100%; border-collapse: collapse">
      <thead>
        <tr>
          <th style="width: 35%; border: none; padding: 8px">
            d: Av. Andres quintana roo, sm 98, m66, l 2-02,<br />
            cancún, quintana roo 77537, mexico
          </th>
          <th style="width: 10%; border: none; padding: 8px">
            t: (998) 881 8100
          </th>
          <th style="width: 10%; border: none; padding: 8px">
            w: gruporegio.mx
          </th>
          <th style="width: 20%; border: none; padding: 8px">
            <img src="${process.env.NEXT_URL_BASE}/images/logos/Logo-CALA.png" alt="" width="120" />
          </th>
          <th style="width: 15%; border: none; padding: 8px">
            <img src="${process.env.NEXT_URL_BASE}/images/logos/fsc.png" alt="" width="80" />
          </th>
        </tr>
      </thead>
    </table>`;

  return content;
}
