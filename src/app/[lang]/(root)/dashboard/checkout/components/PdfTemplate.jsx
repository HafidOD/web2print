"use client";
import useAddress from "@/app/hooks/use-address";
import useCart from "@/app/hooks/use-cart";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";

const PdfTemplate = ({ user }) => {
  const items = useCart((state) => state.items);
  const address = useAddress((state) => state.address);
  // console.log(items);
  const currentDate = new Date().toLocaleDateString("es-MX");
  const styles = StyleSheet.create({
    page: {
      fontFamily: "Helvetica",
      backgroundColor: "#ffffff",
      padding: "1cm",
      paddingTop: 0,
    },
    section: {
      marginBottom: "1cm",
    },
    productName: {
      fontSize: "12pt",
      fontWeight: "bold",
      marginBottom: "5pt",
    },
    productImage: {
      width: "80px",
      height: "60px",
      marginBottom: "5pt",
    },
    address: {
      fontSize: "12pt",
      marginBottom: "10pt",
    },
    table: {
      display: "table",
      width: "100%",
      borderStyle: "solid",
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    tableRow: {
      margin: "auto",
      flexDirection: "row",
    },
    tableColHeader: {
      width: "25%",
      borderStyle: "solid",
      borderBottomColor: "#000",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      padding: 5,
      fontSize: "12pt",
      textAlign: "center",
      fontWeight: "bold",
    },
    tableColHeaderp: {
      width: "10%",
      borderStyle: "solid",
      borderBottomColor: "#000",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      padding: 5,
      fontSize: "12pt",
      textAlign: "center",
      fontWeight: "bold",
    },
    tableColHeadern: {
      width: "45%",
      borderStyle: "solid",
      borderBottomColor: "#000",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      padding: 5,
      fontSize: "12pt",
      textAlign: "center",
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
      textAlign: "center",
    },
    tableColp: {
      width: "10%",
      borderStyle: "solid",
      borderBottomColor: "#000",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      padding: 5,
      fontSize: "10pt",
      textAlign: "center",
    },
    tableColn: {
      width: "45%",
      borderStyle: "solid",
      borderBottomColor: "#000",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      padding: 5,
      fontSize: "10pt",
      textAlign: "center",
    },
    image: {
      width: "180px",
      height: "120px",
      textAlign: "center",
    },
    footer: {
      position: "absolute",
      bottom: "1cm",
      left: 0,
      right: 0,
      textAlign: "center",
      fontSize: "10pt",
      color: "gray",
    },
  });

  return (
    <PDFViewer style={{ width: "100%", height: "500px" }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <Image
            src={"/images/logos/logo_grupo_regio.png"}
            style={styles.image}
            alt="logo grupo regio"
          />
          <View style={styles.address}>
            <Text>Fecha del pedido: {currentDate}</Text>
          </View>
          <View style={styles.address}>
            <Text>Pedido por: {user.name}</Text>
          </View>
          <Text style={styles.address}>
            Dirección de envío: {address.officeName}
          </Text>
          {address.city &&
          address.city &&
          address.state &&
          address.country &&
          address.postalCode ? (
            <Text style={styles.address}>
              {address.address}, {address.city}, {address.state},{" "}
              {address.country}, CP. {address.postalCode}
            </Text>
          ) : null}
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}>
                <Text>Producto</Text>
              </View>
              <View style={styles.tableColHeadern}>
                <Text>Nombre</Text>
              </View>
              <View style={styles.tableColHeaderp}>
                <Text>Cajas</Text>
              </View>
              <View style={styles.tableColHeaderp}>
                <Text>Precio</Text>
              </View>
              <View style={styles.tableColHeaderp}>
                <Text>Total</Text>
              </View>
            </View>
            {items.map((producto) => (
              <View key={producto.id} style={styles.tableRow}>
                <View style={styles.tableCol}>
                  {/* <Text style={styles.productName}>{producto.nameProduct}</Text> */}
                  <Image
                    src={producto.imageProduct}
                    style={styles.productImage}
                  />
                </View>
                <View style={styles.tableColn}>
                  <Text>{producto.nameProduct}</Text>
                </View>
                <View style={styles.tableColp}>
                  <Text>{producto.quantity}</Text>
                </View>
                <View style={styles.tableColp}>
                  <Text>
                    ${producto.price} {producto.currency}
                  </Text>
                </View>
                <View style={styles.tableColp}>
                  <Text>
                    ${producto.price * producto.quantity} {producto.currency}
                  </Text>
                </View>
              </View>
            ))}
          </View>
          <View style={styles.footer}>
            <Text>Grupo Regio</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PdfTemplate;
