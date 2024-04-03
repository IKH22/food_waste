import { useEffect, useState } from "react";
import MapView, { PROVIDER_GOOGLE, Region, Marker } from "react-native-maps";
import { StyleSheet, View, Alert, Image, SafeAreaView } from "react-native";
import * as Location from "expo-location";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Markers from "@/constants/Markers.json";
export default function Map() {
  const [mapRegion, setMapRegion] = useState<Region | undefined>();

  useEffect(() => {
    userLocation();
  }, []);

  const userLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      showError("Permission to access location was denied");
      return;
    }
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.09,
        longitudeDelta: 0.09,
      });
    } catch (error) {
      console.error("Error getting user location:", error);
      showError("Error getting user location");
    }
  };

  const onRegionChangeComplete = (region: Region) => {
    setMapRegion(region);
  };

  const showError = (message: string) => {
    Alert.alert("Error", message, [{ text: "OK" }]);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={mapRegion || undefined}
        showsUserLocation
        onRegionChangeComplete={onRegionChangeComplete}
      >
        {/* Render markers for food banks */}
        {Markers.foodBanks.map((location, index) => (
          <Marker
            key={`foodBank_${index}`}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={location.name}
          >
            <View>
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLEexiZEHa9ivdf0z0hzkhVZxY6HyM3wKFwXIPHHY0sw&s"
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 25,
                  borderWidth: 2,
                  borderColor: "black",
                  shadowColor: "#000",
                }}
              ></Image>
            </View>
          </Marker>
        ))}

        {/* Render markers for charitable organizations */}
        {Markers.charitableOrganizations.map((location, index) => (
          <Marker
            key={`charitableOrg_${index}`}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={location.name}
          >
            <View>
              <Image
                src="https://static.vecteezy.com/system/resources/previews/010/880/186/original/charity-hand-sign-inside-a-love-shape-international-day-of-charity-png.png"
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 25,
                  borderWidth: 2,
                  borderColor: "black",
                  shadowColor: "#000",
                }}
              ></Image>
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: wp(100),
    height: hp(98),
  },
  markerImage: {
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
});
