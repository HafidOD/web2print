"use client";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";
import { format } from "date-fns";
const SalePdf = ({ sale, items, address, lang }) => {
  const fecha = format(new Date(sale.date), "dd/MM/yyyy");
  // console.log(address.price);
  // console.log(fecha);
  // Tasa de IVA (porcentaje)
  const tasaIVA = 16; // Cambia esto según la tasa de IVA de pais

  const montoIVA = (sale.totalSale * tasaIVA) / 100;
  // Calcula el subtotal
  const subtotal = sale.totalSale - montoIVA;
  // console.log(lang.pdf);
  const styles = StyleSheet.create({
    page: {
      fontFamily: "Helvetica",
      backgroundColor: "#ffffff",
      padding: "1cm",
      // paddingTop: 0,
    },
    section: {
      marginBottom: "1cm",
    },
    productName: {
      fontSize: "10pt",
      fontWeight: "bold",
      marginBottom: "5pt",
    },
    productImage: {
      width: "80px",
      height: "60px",
      marginBottom: "5pt",
    },
    parrafo: {
      fontSize: "11pt",
      marginBottom: "5pt",
      marginTop: "5pt",
      marginLeft: "5pt",
    },
    center: {
      textAlign: "center",
    },
    bold: {
      fontWeight: "bold",
    },
    right: {
      textAlign: "right",
    },
    address: {
      fontSize: "10pt",
      // marginBottom: "10pt",
    },
    table: {
      display: "table",
      width: "100%",
      borderStyle: "solid",
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    tabletotal: {
      display: "table",
      width: "100%",
      // borderStyle: "solid",
      // borderWidth: 1,
      // borderRightWidth: 0,
      // borderBottomWidth: 0,
    },
    table20: {
      display: "table",
      width: "25%",
      // borderStyle: "solid",
      // borderWidth: 1,
      // borderRightWidth: 0,
      // borderBottomWidth: 0,
    },
    tableRow: {
      margin: "auto",
      flexDirection: "row",
    },
    tableHeaderRow: {
      margin: "0",
      flexDirection: "row",
    },
    tableColHeader100: {
      width: "100%",
      borderStyle: "solid",
      borderBottomColor: "#000",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      padding: 5,
      fontSize: "12pt",
      textAlign: "center",
      fontWeight: "bold",
    },
    tableHeader100: {
      width: "100%",
      borderBottomColor: "#000",
      padding: 5,
      fontSize: "8pt",
    },
    tableColHeader85: {
      width: "85%",
      borderStyle: "solid",
      borderBottomColor: "#000",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      padding: 5,
      fontSize: "10pt",
      fontWeight: "bold",
    },
    tableColHeader80: {
      width: "80%",
      borderStyle: "solid",
      borderBottomColor: "#000",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      padding: 5,
      fontSize: "14pt",
      textAlign: "center",
      fontWeight: "bold",
    },
    tableColHeader75: {
      width: "75%",
      borderStyle: "solid",
      borderBottomColor: "#000",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      padding: 5,
      fontSize: "12pt",
      fontWeight: "bold",
    },
    tableHeader70none: {
      width: "70%",
      // borderStyle: "solid",
      borderBottomColor: "#000",
      // borderBottomWidth: 1,
      // borderLeftWidth: 1,
      // borderTopWidth: 1,
      // borderRightWidth: 1,
      padding: 5,
    },
    tableColHeader70: {
      width: "70%",
      borderStyle: "solid",
      borderBottomColor: "#000",
      borderBottomWidth: 1,
      borderLeftWidth: 1,
      borderTopWidth: 1,
      borderRightWidth: 1,
      padding: 5,
      fontSize: "10pt",
    },
    tableColHeader65: {
      width: "65%",
      borderStyle: "solid",
      borderBottomColor: "#000",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      padding: 5,
      fontSize: "10pt",
      fontWeight: "bold",
    },
    tableColHeader60: {
      width: "60%",
      borderStyle: "solid",
      borderBottomColor: "#000",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      padding: 5,
      fontSize: "12pt",
      fontWeight: "bold",
    },
    tableColHeader50: {
      width: "50%",
      borderStyle: "solid",
      borderBottomColor: "#000",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      borderLeftWidth: 1,
      borderTopWidth: 1,
      padding: 5,
      fontSize: "10pt",
    },
    tableColHeadern: {
      width: "45%",
      borderStyle: "solid",
      borderBottomColor: "#000",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      padding: 5,
      fontSize: "10pt",
      fontWeight: "bold",
    },
    tableColHeader45: {
      width: "45%",
      borderStyle: "solid",
      borderBottomColor: "#000",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      padding: 5,
      fontSize: "10pt",
      fontWeight: "bold",
    },
    tableColHeader40: {
      width: "40%",
      borderStyle: "solid",
      borderBottomColor: "#000",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      padding: 5,
      fontSize: "10pt",
      fontWeight: "bold",
    },
    tableColHeader35: {
      width: "35%",
      borderStyle: "solid",
      borderBottomColor: "#000",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      padding: 5,
      fontSize: "10pt",
      fontWeight: "bold",
    },
    tableHeader35: {
      width: "35%",
      padding: 5,
      fontSize: "8pt",
    },
    tableHeader30none: {
      width: "30%",
      // borderStyle: "solid",
      // borderBottomColor: "#000",
      // borderBottomWidth: 1,
      // borderRightWidth: 1,
      padding: 5,
      fontSize: "10pt",
      // fontWeight: "bold",
    },
    tableHeader30: {
      width: "30%",
      padding: 5,
      fontSize: "8pt",
    },
    tableColHeader30: {
      width: "30%",
      borderStyle: "solid",
      borderBottomColor: "#000",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      padding: 5,
      fontSize: "10pt",
      fontWeight: "bold",
    },
    tableColHeader: {
      width: "25%",
      borderStyle: "solid",
      borderBottomColor: "#000",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      padding: 5,
      fontSize: "10pt",
      fontWeight: "bold",
    },
    tableColHeader25: {
      width: "25%",
      borderStyle: "solid",
      borderBottomColor: "#000",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      padding: 5,
      fontSize: "10pt",
      fontWeight: "bold",
    },
    tableColHeader20: {
      width: "20%",
      borderStyle: "solid",
      borderBottomColor: "#000",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      padding: 5,
      fontSize: "10pt",
      fontWeight: "bold",
    },
    tableHeader20: {
      width: "20%",
      borderBottomColor: "#000",
      padding: 5,
      fontSize: "8pt",
      // fontWeight: "bold",
    },
    tableColHeader15: {
      width: "15%",
      borderStyle: "solid",
      borderBottomColor: "#000",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      padding: 5,
      fontSize: "10pt",
      fontWeight: "bold",
    },
    tableHeader15: {
      width: "15%",
      padding: 5,
      fontSize: "8pt",
    },
    tableColHeader10: {
      width: "10%",
      borderStyle: "solid",
      borderBottomColor: "#000",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      padding: 5,
      fontSize: "10pt",
      fontWeight: "bold",
    },
    tableHeader10qr: {
      width: "10%",
      borderStyle: "solid",
      borderBottomColor: "#000",
      borderBottomWidth: 1,
      // borderRightWidth: 1,
      padding: 5,
      // fontSize: "10pt",
      // fontWeight: "bold",
    },
    tableHeader10: {
      width: "10%",
      padding: 5,
      fontSize: "8pt",
      // fontWeight: "bold",
    },
    tableColHeader5: {
      width: "5%",
      borderStyle: "solid",
      borderBottomColor: "#000",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      padding: 5,
      fontSize: "10pt",
      fontWeight: "bold",
    },
    tableColHeaderp: {
      width: "10%",
      borderStyle: "solid",
      borderBottomColor: "#000",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      padding: 5,
      fontSize: "10pt",
      fontWeight: "bold",
    },
    tableColHeadernone: {
      width: "5%",
      // borderStyle: "solid",
      // borderBottomColor: "#000",
      borderBottomWidth: 0,
      borderRightWidth: 0,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      padding: 5,
      fontSize: "10pt",
      fontWeight: "bold",
    },

    tableCol: {
      width: "25%",
      borderStyle: "solid",
      borderBottomColor: "#000",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      padding: 5,
      fontSize: "10pt",
    },
    tableColp: {
      width: "10%",
      borderStyle: "solid",
      borderBottomColor: "#000",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      padding: 5,
      fontSize: "10pt",
    },
    tableColn: {
      width: "45%",
      borderStyle: "solid",
      borderBottomColor: "#000",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      padding: 5,
      fontSize: "10pt",
    },
    image: {
      width: "140px",
      // height: "120px",
      // textAlign: "center",
      // margin: 0,
      // padding: 0,
    },
    footer: {
      position: "absolute",
      bottom: "1cm",
      left: "1cm",
      right: "1cm",
      // textAlign: "center",
      fontSize: "10pt",
      color: "gray",
    },
  });

  return (
    // <PDFViewer style={{ width: "100%", height: "500px" }}>
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.tabletotal}>
          <View style={styles.tableHeaderRow}>
            <View style={styles.tableHeader70none}>
              <Image
                src={"/images/logos/logo_grupo_regio-300.png"}
                style={styles.image}
                alt="logo grupo regio"
              />
            </View>

            <View style={styles.tableHeader30none}>
              <Text style={Object.assign({}, styles.center, styles.parrafo)}>
                {lang.pdf.supplier}
              </Text>
              <Text>Pixel Press SA de CV</Text>
              <Text>RFC: PPR 970715158</Text>
              <Text>Av. Andrés Q. Roo Mz 66 Lt 2-05</Text>
              <Text>SM 98, Cancún, Q. Roo, México</Text>
            </View>
          </View>
        </View>
        <Text>{"\n"}</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader80}>
              <Text>{lang.pdf.proforma}</Text>
            </View>
            <View
              style={Object.assign({}, styles.tableColHeader20, styles.center)}
            >
              <Text>N° {sale.id}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader15}>
              <Text>{lang.pdf.elaborated}:</Text>
            </View>
            <View style={styles.tableColHeader40}>
              <Text>{sale.user.userName}</Text>
            </View>
            <View style={styles.tableColHeader25}>
              <Text>{lang.pdf.date}:</Text>
            </View>
            <View
              style={Object.assign({}, styles.tableColHeader20, styles.center)}
            >
              <Text>{fecha}</Text>
            </View>
          </View>
        </View>
        <View style={styles.parrafo}>
          <Text>{lang.pdf["request-inf"]}:</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader15}>
              <Text>{lang.pdf.hotel}:</Text>
            </View>
            <View style={styles.tableColHeader65}>
              <Text>{sale.user.property.propertyName}</Text>
            </View>
            <View style={styles.tableColHeader10}>
              <Text>{lang.pdf.location}:</Text>
            </View>
            <View style={styles.tableColHeader10}>
              {sale.user.typePrice == 1 && <Text>QROO</Text>}
              {sale.user.typePrice == 2 && <Text>NAL</Text>}
              {sale.user.typePrice == 3 && <Text>EXW</Text>}
            </View>
          </View>
        </View>
        <Text style={styles.parrafo}>{lang.pdf.shipping}:</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader15}>
              <Text>{lang.pdf.address}:</Text>
            </View>
            <View style={styles.tableColHeader85}>
              {address.city &&
              address.state &&
              address.country &&
              address.postalCode ? (
                <Text style={styles.address}>
                  {address.officeName}: {address.address}, {address.city},{" "}
                  {address.state}, {address.country}, CP. {address.postalCode}
                </Text>
              ) : (
                <Text style={styles.address}>
                  {address.officeName}: {address.address}
                </Text>
              )}
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader15}>
              <Text>{lang.pdf.contact}:</Text>
            </View>
            <View style={styles.tableColHeader40}>
              <Text>{sale.user.userName}</Text>
            </View>
            <View style={styles.tableColHeader15}>
              <Text>{lang.pdf.phone}:</Text>
            </View>
            <View style={styles.tableColHeader30}>
              <Text>{sale.user.telefono}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader15}>
              <Text>Email:</Text>
            </View>
            <View style={styles.tableColHeader85}>
              <Text>{sale.user.email}</Text>
            </View>
          </View>
        </View>
        <Text>{"\n"}</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View
              style={Object.assign({}, styles.tableColHeader20, styles.center)}
            >
              <Text>SKU</Text>
            </View>
            <View
              style={Object.assign({}, styles.tableColHeader40, styles.center)}
            >
              <Text>{lang.pdf.item}</Text>
            </View>
            <View
              style={Object.assign({}, styles.tableColHeader10, styles.center)}
            >
              <Text>UOM</Text>
            </View>
            <View
              style={Object.assign({}, styles.tableColHeader10, styles.center)}
            >
              <Text>{lang.pdf.quantity}</Text>
            </View>
            <View
              style={Object.assign({}, styles.tableColHeader10, styles.center)}
            >
              <Text>{lang.pdf.UP}</Text>
            </View>
            <View
              style={Object.assign({}, styles.tableColHeader10, styles.center)}
            >
              <Text>{lang.pdf.total}</Text>
            </View>
          </View>
          {items.map((producto) => (
            <View key={producto.id} style={styles.tableRow}>
              <View style={styles.tableColHeader20}>
                <Text>{producto.sku}</Text>
              </View>
              <View style={styles.tableColHeader40}>
                <Text>{producto.nameProduct}</Text>
              </View>
              <View style={styles.tableColHeader10}>
                <Text>CS {producto.unitsPackage}</Text>
              </View>
              <View
                style={Object.assign({}, styles.tableColHeader10, styles.right)}
              >
                <Text>{producto.quantity}</Text>
              </View>
              <View style={styles.tableColHeader10}>
                <Text>{producto.price != 0 ? "$" + producto.price : ""}</Text>
              </View>
              <View style={styles.tableColHeader10}>
                <Text>
                  {producto.price != 0
                    ? "$" + producto.price * producto.quantity
                    : ""}
                </Text>
              </View>
            </View>
          ))}
          {address.price && (
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader20}></View>
              <View style={styles.tableColHeader40}>
                <Text>{lang.addresses["shipping cost"]}</Text>
              </View>
              <View style={styles.tableColHeader10}></View>
              <View
                style={Object.assign({}, styles.tableColHeader10, styles.right)}
              ></View>
              <View style={styles.tableColHeader10}></View>
              <View style={styles.tableColHeader10}>
                <Text>${address.price}</Text>
              </View>
            </View>
          )}
        </View>
        <Text>{"\n"}</Text>
        <View style={styles.tabletotal}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader70}>
              <Text>
                {lang.pdf["amounts-expressed"]}{" "}
                {sale.user.typePrice === 3
                  ? lang.pdf.dollars
                  : lang.pdf["mexican-pesos"]}
              </Text>
              {sale.user.property.propertyName == "Vontobel" ? (
                ""
              ) : (
                <Text>{lang.pdf["delivery-service"]}</Text>
              )}
            </View>
            <View style={styles.tableColHeadernone}>
              <Text> </Text>
            </View>
            <View style={styles.table20}>
              <View style={styles.tableRow}>
                <View style={styles.tableColHeader50}>
                  <Text>Sub total</Text>
                </View>
                <View style={styles.tableColHeader50}>
                  <Text>${subtotal}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableColHeader50}>
                  <Text>IVA</Text>
                </View>
                <View style={styles.tableColHeader50}>
                  <Text>${montoIVA}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableColHeader50}>
                  <Text>Total</Text>
                </View>
                <View style={styles.tableColHeader50}>
                  <Text>${sale.totalSale}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.tabletotal}>
            <View style={styles.tableHeaderRow}>
              <View style={styles.tableHeader10qr}>
                <Image
                  src={"/images/logos/qr.png"}
                  style={styles.imagecala}
                  alt="logo cala"
                />
              </View>
              <View style={styles.tableColHeader90}></View>
            </View>
            <View style={styles.tableHeaderRow}>
              <View style={styles.tableHeader100}>
                <Text>{"\n"}</Text>
                <Text>CANCÚN | MIAMI | PUNTA CANA</Text>
                <Text>{"\n"}</Text>
              </View>
            </View>
            <View style={styles.tableHeaderRow}>
              <View style={styles.tableHeader35}>
                <Text>d: Av. Andrés Quintana Roo, SM 98, M 66 L 2-05,</Text>
                <Text>Cancún, Quintana Roo 77537, México</Text>
              </View>
              <View style={styles.tableHeader15}>
                <Text>t: (998) 881 8100</Text>
              </View>
              <View style={styles.tableHeader15}>
                <Text>w: gruporegio.mx</Text>
              </View>
              <View style={styles.tableHeader20}>
                {sale.user.property.propertyName == "Vontobel" ? (
                  ""
                ) : (
                  <Image
                    src={"/images/logos/Logo-CALA.png"}
                    style={styles.imagecala}
                    alt="logo cala"
                  />
                )}
              </View>
              <View style={styles.tableHeader15}>
                <Image
                  src={"/images/logos/fsc.png"}
                  style={styles.imagecala}
                  alt="logo cala"
                />
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
    // </PDFViewer>
  );
};

export default SalePdf;
