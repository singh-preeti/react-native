import * as React from 'react';
import MapView, { Callout, Circle, Marker } from 'react-native-maps';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
import * as Location from "expo-location";
export default function App() {
  const [pin, setPin] = React.useState({
    latitude: 19.075984,
    longitude: 72.877656
  });
  React.useEffect(() =>{
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if(status !== "granted") {
        setErrorMsg("Permission denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      setPin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
       });
    })();
  }, []);
  return (
    <View style={styles.container}>
      <MapView style={styles.map}
      initialRegion={{
        latitude: 19.075984,
        longitude: 72.877656,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }} 
      showsUserLocation={true}
      onUserLocationChange = {(e) => {
        console.log("onUserLocationChange",e.nativeEvent.coordinate);
        setPin({
          latitude: e.nativeEvent.coordinate.latitude,
          longitude: e.nativeEvent.coordinate.longitude
         });

      }}
      >
        <Marker coordinate={{latitude: 19.075984, longitude: 72.877656}}
        title="test title"
        description="test description"
        pinColor="gold"
        draggable={true}
        onDragStart = {(e) => {
          console.log("Drag start", e.nativeEvent.coordinate)
        }}
        onDragEnd = {(e) => {
          console.log("Drag End", e.nativeEvent.coordinate);

          setPin({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude
           });
        }}
        
        >
        <Callout>
          <Text>This is callout!</Text>
        </Callout>
        </Marker>
       <Circle center={pin}
       radius={100}>

       </Circle>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});