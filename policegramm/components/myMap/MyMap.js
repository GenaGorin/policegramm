import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';

export default MyMap = ({latitude, longitude, markers}) => {
    console.log(markers);
    return (
        <MapView
            style={styles.map}
            onPress={(e) => {
                console.log(e);
            }}
            initialRegion={{
                latitude: 22,
                longitude: 22,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        >
            <MapView.Marker
                coordinate={{
                    latitude: latitude,
                    longitude: longitude,
                }}
            />
            {markers.map(marker => <MapView.Marker key={marker.id} coordinate={marker.coords} />)}

        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      position: 'absolute'
    },
  });