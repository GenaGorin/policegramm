import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, TextInput, Alert } from 'react-native';
import ImageMarker from './ImageMarker/ImageMarker';

export default CreateMarkerwindow = ({ createMarkerAndStopMode, stopMode }) => {

    const [activeImages, setActiveImages] = useState(false);
    const [passiveImages, setPassiveImages] = useState(false);
    const [markerDesc, setMarkerDesc] = useState('');
    const [currentImage, setCurrentImage] = useState('');

    const setImage = (source) => {
        console.log(source);
        setCurrentImage(source);
    }

    const showActiveImg = () => {
        setPassiveImages(false);
        setActiveImages(true);
    }

    const showPassiveImg = () => {
        setActiveImages(false);
        setPassiveImages(true);
    }

    const createMarker = () => {
        if (markerDesc) {
            if (activeImages || passiveImages) {
                if (currentImage) {
                    let title = activeImages ? 'Актив' : 'Пассив';
                    let date = new Date();
                    let data = {
                        title: title,
                        description: markerDesc + ' --- ' + date.getHours() + ':' + date.getMinutes(),
                        image: currentImage, //require('../../images/venik.png')
                    }
                    createMarkerAndStopMode(data);
                } else {
                    Alert.alert('Выберите изображение к метке');
                }
            } else {
                Alert.alert('Выберите актив или пассив');
            }
        } else {
            Alert.alert('Введите описание к метке');
        }
    }

    return (
        <View>
            <Text>Создание метки</Text>
            <Button title='Актив' color='red' onPress={showActiveImg} />
            <Button title='Пассив' color='#3EABFB' onPress={showPassiveImg} />
            <Text>Выберите изображение для метки</Text>
            {activeImages
                &&
                <View>
                    <ImageMarker setImage={setImage} source={require('../../images/aktiv.png')} />
                    <ImageMarker setImage={setImage} source={require('../../images/musor.png')} />
                </View>
            }
            {passiveImages
                &&
                <View>
                    <ImageMarker setImage={setImage} source={require('../../images/venik.png')} />
                    <ImageMarker setImage={setImage} source={require('../../images/chisto.png')} />
                </View>
            }
            <TextInput
                style={styles.input}
                onChangeText={text => setMarkerDesc(text)}
                value={markerDesc}
                placeholder='Описание к метке'
            //keyboardType='numeric'
            />
            <Button title='Поставить метку' color='#3EABFB' onPress={createMarker} />
            <Button title='Отмена' color='red' onPress={stopMode} />
        </View>)
}

const styles = StyleSheet.create({
    input: {
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#3EABFB',
        height: 40,
        paddingLeft: 15,
    },
});