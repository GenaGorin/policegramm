import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import MapView from 'react-native-maps';

export default MyMap = ({ latitude, longitude, markers, createNewMarker }) => {

    const [createMarkerMode, setCreateMarkerMode] = useState({
            createMode : false,
            coords : {},
        });

    const startCreateMarkerMode = (e) => {
        setCreateMarkerMode({
            createMode : true,
            coords : e.nativeEvent.coordinate,
        });
    }

    const createMarkerAndStopMode = () =>{
        createNewMarker(createMarkerMode.coords);
        setCreateMarkerMode({
            createMode : false,
            coords : {},
        });
    }
    const stopMode = () => {
        setCreateMarkerMode({
            createMode : false,
            coords : {},
        });
    }


    return (
        createMarkerMode.createMode
            ?
            <View>
                <Text>Создание метки</Text>
                <Button title='Поставить метку' color='#3EABFB' onPress={createMarkerAndStopMode} />
                <Button title='Отмена' color='red' onPress={stopMode} />
            </View>
            :<MapView
                style={styles.map}
                onLongPress={(e) => {
                    startCreateMarkerMode(e);
                }}
                initialRegion={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <MapView.Marker
                    coordinate={{
                        latitude: latitude,
                        longitude: longitude,
                    }}
                    title='Привет это Я!'
                    description='Мое местополжение'
                    centerOffset={{ x: 0, y: -11 }}
                >
                    <Image
                        source={require('../../images/i.jpg')}
                        style={{ width: 50, height: 50 }}
                    />
                </MapView.Marker>
                {markers.map(marker => {
                return <MapView.Marker 
                            centerOffset={{ x: -5, y: -15 }}
                            title = {marker.data.title}
                            description= {marker.data.description}
                            key={marker.id} 
                            coordinate={marker.coords}>
                                <Image source={marker.data.image} style={{ width: 50, height: 50 }} />
                        </MapView.Marker>
                })}
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