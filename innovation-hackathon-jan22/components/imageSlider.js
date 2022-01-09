import React, { useState } from 'react';
import { Text, StyleSheet, View, Dimensions, Image, Platform, ScrollView, StatusBar } from 'react-native';
import Compare, { Before, After, DefaultDragger, Dragger } from 'react-native-before-after-slider-v2';
import {ColorConstants} from '../constants/baseConstant'


function ImageSlider() {
    const deviceWidth = Dimensions.get("window").width;
    const deviceHeight = Dimensions.get("window").height;
    const [state, setState] = useState({ scrollEnabled: true })

    const onMoveStart = () => {
        setState({ scrollEnabled: false });
    }
    const onMoveEnd = () => {
        setState({ scrollEnabled: true });
    }
    return (
        <ScrollView style={{  top:-60, borderRadius:28}} bounces= {false} scrollEnabled={state.scrollEnabled} contentContainerStyle={{ alignItems: 'center', }}>
            <Compare initial={deviceWidth / 2} draggerWidth={50} width={deviceWidth - 20} onMoveStart={onMoveStart} onMoveEnd={onMoveEnd}>
                <Before>
                    <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/milanlaser-fcb24.appspot.com/o/omaha_bw.jpg?alt=media&token=9864378d-74d9-4579-830d-a56e50dc017d' }} style={{  width: deviceWidth - 20, height: deviceWidth / 2 }} />
                    {/* <Image source={require('./src/images/before.png')} style={{width: deviceWidth, height: deviceWidth/2}} /> */}
                </Before>
                <After>
                    <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/milanlaser-fcb24.appspot.com/o/omaha_color.jpg?alt=media&token=7b3c5be6-ee90-40ec-9f1c-4b52ce655322' }} style={{  width: deviceWidth - 20, height: deviceWidth / 2 }} />
                </After>
                <DefaultDragger />
            </Compare>
        </ScrollView>
    )
}

export default ImageSlider