import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const data = await req.formData();
    // console.log(data);
    const currentDate = new Date().toLocaleDateString("es-MX");
    const emailContent = generateEmailContent(data, currentDate);
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
      to: `hafid@tachuela.mx`,
      // to: `${items.user.email}, marriott@gruporegio.mx, paloma.berumen@marriott.com, Asenath.araque@marriott.com, Amanda.k.perez@marriott.com, carlos.olguin@marriott.com, hafid@tachuela.mx`,
      // to: `${items.user.email}, marriott@gruporegio.mx`,
      subject: "Solicitud nuevo usuario",
      html: emailContent,
    };

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

function generateEmailContent(data, currentDate) {
  let content = `<table style='width: 100%; border-collapse: collapse'><thead><tr><th style='width: 100%; border: none; padding: 8px'><img src='${process.env.NEXT_URL_BASE}/images/logos/logo_grupo_regio-300.png' alt='' width='140' /></th></tr></thead></table><br />`;
  content += `<p>Solicitud de alta de usuario para la plataforma Web2Print el día ${currentDate}</p>`;
  content += `<p>Nombre: ${data.get("userName")}</p>`;
  content += `<p>Email: ${data.get("email")}</p>`;
  content += `<p>Teléfono: ${data.get("telefono")}</p>`;
  content += `<p>Locación de usuario: ${data.get("typePrice")}</p>`;
  content += `<p>Propiedad: ${data.get("property")}</p>`;
  content += `<p>Marcas: ${data.get("enterprises")}</p>`;

  return content;
}
