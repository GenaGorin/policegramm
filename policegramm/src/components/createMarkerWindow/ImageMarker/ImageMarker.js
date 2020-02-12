import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

export default ImageMarker = ({source, setImage}) => {
    return <TouchableOpacity onPress={() => setImage(source)}>
        <Image source={source} style={{ width: 38, height: 63 }} />
    </TouchableOpacity>
}