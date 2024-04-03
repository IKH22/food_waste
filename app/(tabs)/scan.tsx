import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { CameraView, Camera } from "expo-camera/next";

export default function App() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = async ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    setScanned(true);

    try {
      const proxyurl = "https://cors-anywhere.herokuapp.com/";
      const response = await fetch(
        "https://corsproxy.io/?" +
          `https://api.barcodelookup.com/v3/products?barcode=${data}&formatted=y&key=dd0eox3gjpufv3ku4qewojfjbmw1aa`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const productData = await response.json();
      // Extract relevant information from productData and store it in variables
      const productName = productData.products[0].title;
      const productCategory = productData.products[0].category;
      const productBrand = productData.products[0].brand;

      

      // Display the scanned item information in a pop-up
      // Replace the alert with your preferred pop-up component
      // For example, you can use a modal or a custom pop-up component
      alert(
        `Scanned Item\nName: ${productName}\nBrand: ${productBrand} \nCategory: ${productCategory}`
      );
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error (e.g., display an error message)
      alert("Error fetching data. Please try again.");
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: [
            "aztec",
            "codabar",
            "code39",
            "code93",
            "code128",
            "datamatrix",
            "ean13",
            "ean8",
            "itf14",
            "pdf417",
            "upc_a",
            "upc_e",
            "qr",
          ],
        }}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
