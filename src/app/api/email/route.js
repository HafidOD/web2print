import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import prisma from "@/libs/prisma";
import { getDictionary } from "@/utils/dictionary";

// const NEXT_URL_BASE = process.env.NEXT_URL_BASE;

export async function POST(req) {
  const items = await req.json();
  // console.log(items);
  const property = await prisma.property.findFirst({
    where: {
      propertyName: items.user.property,
    },
  });
  // console.log(property);
  try {
    const totalSale = items.items.reduce((total, item) => {
      // console.log(item);
      return total + item.total;
    }, 0);
    // console.log(totalSale);
    const totalFinal = totalSale + items.address.price;
    // console.log(totalFinal);
    // console.log(items.items[0].enterpriseId);

    const sale = await prisma.sale.create({
      data: {
        userId: items.user.id,
        totalSale: totalFinal,
        data: JSON.stringify(items),
        address: JSON.stringify(items.address),
        enterpriseInt: items.items[0].enterpriseId,
        date: new Date(),
      },
    });
    items.items.map(async (producto) => {
      // console.log(producto.stockProduct - producto.quantity);
      await prisma.product.update({
        where: { id: producto.id },
        data: { stockProduct: producto.stockProduct - producto.quantity },
      });
    });
    const lang = await getDictionary(items.lang);
    // console.log(lang);
    // console.log(lang.order["subject-email"]);
    // const currentDate = new Date("2023-08-07 17:51:38.035").toLocaleDateString(
    //   "es-MX"
    // );
    // console.log(sale);
    const currentDate = new Date().toLocaleDateString("es-MX");
    const emailContent = generateEmailContent(
      items,
      totalFinal,
      currentDate,
      sale.id,
      lang,
      property
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
      to: `${items.user.email}, ${property.email}`,
      subject: lang.order["subject-email"],
      html: emailContent,
      attachments: [],
    };
    items.items.forEach((producto) => {
      if (
        producto.categories.some(
          (categoria) => categoria.categoryName === "Tarjetas"
        )
      ) {
        // Agrega cada adjunto al array
        mailOptions.attachments.push({
          filename: `tarjeta_${producto.imgTarjeta}.png`,
          path: `/var/www/web2print.gruporegio.mx/web2print/public/images/tar/${producto.imgTarjeta}`,
          // path: `${NEXT_URL_BASE}/images/tar/${producto.imgTarjeta}`,
          cid: producto.imgTarjeta,
        });
      }
    });

    // console.log(mailOptions);
    // } else {
    //   var mailOptions = {
    //     from: `"Web2Print" <${process.env.SMTP_USER}>`,
    //     // to: `hafid@tachuela.mx`,
    //     to: `${items.user.email}, paloma.berumen@marriott.com, hafid@tachuela.mx, marriott@gruporegio.mx`,
    //     subject: "Solicitud de pedido Web2Print",
    //     html: emailContent,
    //   };
    // }
    // return NextResponse.json(
    //   { message: "ok", sale, property },
    //   { status: 500 }
    // );
    const info = await transporter.sendMail(mailOptions);
    // console.log("Email sent: " + info.response);
    return NextResponse.json(
      { message: "email enviado", sale, property },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ message: "error", error }, { status: 500 });
    // throw error;
  }
}

function generateEmailContent(
  items,
  totalSale,
  currentDate,
  saleId,
  lang,
  property
) {
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
    content += `<tr><td style='padding:2px 10px;border: solid 1px;'>${
      producto.sku
    }</td><td style='padding:2px 10px;border: solid 1px;'>${
      producto.nameProduct
    }</td><td style='padding:2px 10px;border: solid 1px;'>${
      producto.unitsPackage
    }</td><td style='padding:2px 10px;border: solid 1px;'>${
      producto.quantity
    }</td><td style='padding:2px 10px;border: solid 1px;'>${
      producto.price != 0 ? "$" + producto.price : ""
    }</td><td style='padding:2px 10px;border: solid 1px;'>${
      producto.total != 0 ? "$" + producto.total : ""
    }</td></tr>`;
    if (
      producto.categories.some(
        (categoria) => categoria.categoryName === "Tarjetas"
      )
    ) {
      content += `<tr>
        <td style='padding:2px 10px;border: solid 1px;'>
          Información de tarjeta
        </td>
        <td style='padding:2px 10px;border: solid 1px;'>
          <p style='margin:0;'>${producto.formData.cardName}</p>
          <p style='margin:0;'>${producto.formData.position}</p>
          <p style='margin:0;'>${producto.formData.position2}</p>
          <p style='margin:0;'>${producto.formData.position3}</p>
          <p style='margin:0;'>${producto.formData.cardEmail}</p>
          <p style='margin:0;'>${producto.formData.cardPhone}</p>
          <p style='margin:0;'>${producto.formData.cardPhone2}</p>
          <p style='margin:0;'>${producto.formData.cardAddress} ${producto.formData.cardCP}</p>
          <p style='margin:0;'>${producto.formData.cardComments}</p>
        </td>
      </tr>`;
    }
  });
  // ${items.address.country ? items.address.country : ""}
  // item.address.price != 0 ?
  // content += ${items.address.price != 0}

  content +=
    items.address.price != 0
      ? `<tr><td style='padding:2px 10px;border: solid 1px;'></td><td style='padding:2px 10px;border: solid 1px;'>Envio</td><td style='padding:2px 10px;border: solid 1px;'></td><td style='padding:2px 10px;border: solid 1px;'></td><td style='padding:2px 10px;border: solid 1px;'></td><td style='padding:2px 10px;border: solid 1px;'>$${items.address.price}</td></tr>`
      : "";

  content += `</tbody></table><br />
    <table style="width: 100%; border-collapse: collapse">
      <tbody>
        <tr>
          <td style="width: 70%; border: solid 1px; padding: 8px">
            ${lang.pdf["amounts-expressed"]} ${
    items.user.typePrice === 3 ? lang.pdf.dollars : lang.pdf["mexican-pesos"]
  }<br />
  ${property.logoCala ? lang.pdf["delivery-service"] : ""}
            
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
          ${
            property.logoCala != 0
              ? `<img src="${process.env.NEXT_URL_BASE}/images/logos/Logo-CALA.png" alt="" width="120" />`
              : ""
          }
          </th>
          <th style="width: 15%; border: none; padding: 8px">
            <img src="${
              process.env.NEXT_URL_BASE
            }/images/logos/fsc.png" alt="" width="80" />
          </th>
        </tr>
      </thead>
    </table>`;

  return content;
}
