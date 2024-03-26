import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const data = await req.formData();
    // console.log(data);
    const brands = data.get("enterprises");
    // console.log(brands);
    let brandsArray = brands.split(",");
    const currentDate = new Date().toLocaleDateString("es-MX");
    const emailContent = generateEmailContent(data, currentDate, brandsArray);
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
    const mailOptions = {
      from: `"Web2Print" <${process.env.SMTP_USER}>`,
      to: `hafid@tachuela.mx, dsanchez@gruporegio.mx, marriott@gruporegio.mx, rocio@tachuela.mx`,
      // to: `hafid@tachuela.mx`,
      subject: "Solicitud alta Web2print",
      html: emailContent,
    };
    // return NextResponse.json({ message: "ok" }, { status: 500 });
    const info = await transporter.sendMail(mailOptions);
    // console.log("Email sent: " + info.response);
    // return NextResponse.json({ message: "ok" });
    return NextResponse.json(
      { message: "email enviado", info },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ message: "error", error }, { status: 500 });
    // throw error;
  }
}

function generateEmailContent(data, currentDate, brandsArray) {
  let content = `<table style='width: 100%; border-collapse: collapse'><thead><tr><th style='width: 100%; border: none; padding: 8px'><img src='${process.env.NEXT_URL_BASE}/images/logos/logo_grupo_regio-300.png' alt='' width='140' /></th></tr></thead></table><br />`;
  content += `<p>Solicitud de alta de usuario para la plataforma Web2Print el día ${currentDate}</p>`;
  content += `<p><b>Nombre:</b> ${data.get("userName")}</p>`;
  content += `<p><b>Email:</b> ${data.get("email")}</p>`;
  content += `<p><b>Teléfono:</b> ${data.get("telefono")}</p>`;
  content += `<p><b>Locación de usuario:</b> ${data.get("typePrice")}</p>`;
  content += `<p><b>Propiedad:</b> ${data.get("property")}</p>`;
  content += "<p><b>Marcas:</b></p><ul>";
  brandsArray.forEach((brand) => {
    content += `<li>${brand.trim()}</li>`;
  });
  content += "</ul>";
  // content += `<p>Marcas: ${data.get("enterprises")}</p>`;

  return content;
}
