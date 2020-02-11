import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Alert } from 'react-native';
import MyMap from './src/components/myMap/MyMap';
import {allMarkers} from './src/api/serverImitation';

export default class App extends React.Component {

  state = {
    isLoaded: false,
    currentPosition: {
      latitude: null,
      longitude: null,
    },
    markers: [],
  }
  i=4 ;

  loadApp(position) {
    Alert.alert('Для создания метки удерживайте палец на карте');
    this.setState({
      isLoaded: true,
      currentPosition: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      markers: allMarkers,
    });
  }

  createNewMarker = (coords) => {
    let newMarker = {
      id: this.i,
      coords: {
        latitude: coords.latitude,
        longitude: coords.longitude,
      },
      data: {
        title: 'Active',
        description: 'Musata pidarasi',
        image: require('./src/images/putin1.png'),
      }
    }
    this.setState({
      markers: [...this.state.markers, newMarker]
    });
    this.i++;
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => this.loadApp(position),
      (err) => console.log(err),
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 10000 }
    );
  }

  render() {
    return (
      !this.state.isLoaded
      ? <ActivityIndicator style={styles.loadApp} size="large" color="red" />
      :<View style={styles.container}>
        <MyMap 
          style={styles.map} 
          latitude={this.state.currentPosition.latitude} 
          longitude={this.state.currentPosition.longitude} 
          markers={this.state.markers}
          createNewMarker={this.createNewMarker}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute'
  },
  loadApp: {
    top: 300,
  }
});
