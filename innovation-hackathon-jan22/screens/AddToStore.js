import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert, Dimensions, StyleSheet, TextInput, Image, FlatList } from 'react-native'
import Loader from '../components/Loader'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Chip, withTheme, colors, Input, Icon, Text, ButtonGroup, Button, Card } from 'react-native-elements';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import { ColorConstants, FontFamily } from '../constants/baseConstant';
import { SharedImages, SharedIcons } from '../constants/sharedImages';
import strings from '../vernacular';



const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;


const axios = require('axios');



export default AddToStore = ({ route, navigation }) => {
    console.log("🚀 ~ file: AddToStore.js ~ line 21 ~ data", route.params.data)
    const [progress, setProgress] = useState(0);
    const [isLoaded, setLoaded] = useState(false);
    const [item, setItem] = useState(route.params.data)
    const [quantity, setQuantity] = useState()
    const [pricePerItem, setPricePerItem] = useState()
    const [descripton, SetDescription] = useState('')


    const renderImages = () => {
        console.log('item*******************', item)
        let data = item.shooting_angles
        return (
            <View style={{ flex: 1, backgroundColor: 'red' }}>

                <Text>
                    {data.angle_name}
                </Text>
                {/* <ShootCatalogCard name = {item.name} subTitle  = {item.sku_number} url = {item.shooting_angles[0].angle_image} onPressCategory = {()=>handleCategoryPrss(item)}/> */}
            </View>
        )
    }

    const renderInputs = () => {
        return (
            <View style={{ alignContent: 'flex-start', paddingTop: 50 }}>

                <Input
                    placeholder='1234567890'
                    containerStyle={{ justifyContent: 'center', }}
                    inputContainerStyle={{
                        backgroundColor: '#E5E5E5',
                        paddingLeft: 10,
                        borderColor: '#E5E5E5'

                    }}
                    inputStyle={{ fontSize: 16, paddingLeft: 5 }}
                    label={'ID/SKU No'}
                    // labelProps={size=40}
                    labelStyle={{ paddingBottom: 5 }}
                    placeholder={item.sku_number}
                    disabled={true}
                    placeholderTextColor={ColorConstants.BLACK}

                />
                <Input
                    placeholder='Bag'
                    containerStyle={{ justifyContent: 'center', }}
                    inputContainerStyle={{
                        backgroundColor: '#E5E5E5',
                        paddingLeft: 10,
                        size: 10,
                        color: 'green',
                        borderColor: '#E5E5E5'

                    }}
                    inputStyle={{ fontSize: 14, paddingLeft: 5 }}
                    disabled={false}
                    label={strings.ProductName}
                    // labelProps={size=40}
                    placeholderTextColor={ColorConstants.BLACK}
                    labelStyle={{ paddingBottom: 5 }}
                    placeholder={item.name}
                    disabled={true}
                />

            </View>
        );

    }



    const rebderSideButtons = () => {
        return (
            <View style={{ alignContent: 'flex-start', paddingTop: 0 }}>
                <View style={{ flexDirection: 'row' }}>

                    <View style={{ flex: 1 }}>
                        <Input
                            placeholder='1234'
                            containerStyle={{ justifyContent: 'center', }}
                            inputContainerStyle={{
                                backgroundColor: '#E5E5E5',
                                paddingLeft: 10,
                                size: 10,
                                color: 'green',
                                borderColor: '#E5E5E5'

                            }}

                            inputStyle={{ fontSize: 14, paddingLeft: 5 }}
                            disabled={false}
                            label={strings.Quantity}
                            // labelProps={size=40}
                            labelStyle={{ paddingBottom: 5 }}
                            value={quantity}
                            onChangeText={(text) => { setQuantity(text.replace(/[^0-9]/g, '')) }}
                            maxLength={4}

                        />




                    </View>
                    <View style={{ flex: 1 }}>
                        <Input
                            placeholder='499'
                            containerStyle={{ justifyContent: 'center', }}
                            inputContainerStyle={{
                                backgroundColor: '#E5E5E5',
                                paddingLeft: 10,
                                size: 10,
                                color: 'green',
                                borderColor: '#E5E5E5'

                            }}
                            inputStyle={{ fontSize: 14, paddingLeft: 5 }}
                            disabled={false}
                            label={strings.Priceperitem}
                            // labelProps={size=40}
                            labelStyle={{ paddingBottom: 5 }}
                            value={pricePerItem}
                            onChangeText={(text) => {
                                setPricePerItem(text.replace(/[^0-9]/g, ''))
                            }}
                            maxLength={6}
                        />
                    </View>

                </View>



            </View>
        );

    }


    const renderDiscription = () => {
        return (
            <View style={{ alignContent: 'flex-start', paddingTop: 0 }}>

                <Input
                    placeholder='Write here'
                    containerStyle={{ justifyContent: 'center' }}
                    inputContainerStyle={{
                        backgroundColor: '#E5E5E5',
                        paddingLeft: 10,
                        size: 10,
                        color: 'green',
                        borderColor: '#E5E5E5'

                    }}
                    inputStyle={{ fontSize: 14, paddingLeft: 5, height: 150 }}
                    disabled={false}
                    label={strings.Description}
                    multiline={true}
                    // labelProps={size=40}
                    labelStyle={{ paddingBottom: 5 }}
                    onChangeText={(text) => SetDescription(text)}

                />

            </View>
        );

    }
    const handleConfirm = () => {

        let payload = {
            quantity: parseInt(quantity),  //parseInt(quantity),
            price: parseInt(pricePerItem),
            description: descripton,
            shoot_id: item._id
        }

        console.log("&&&&&&&&payload&&&&&&&&&", payload)

        const url = `http://3.134.83.186/api/v1/user/editShoot`
        console.log("🚀 ~ file: AngleCameraScreen.js ~ line 499 ~ handleCreateCatalog ~ url", url, payload)
        axios.put(url, payload, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                console.log("🚀 ~ file: AddToStore.js ~ line 208 ~ .then ~ response", response)
                navigation.goBack()
            })
            .catch(Err => {
                console.log("🚀 ~ file: AddToStore.js ~ line 211 ~ handleConfirm ~ Err", Err)
            })


    }

    const renderButton = () => {
        return (
            <View style={{ alignContent: 'flex-start', bottom: -10 }}>

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                    <Button
                        title={strings.Confirm}
                        containerStyle={{
                            width: 150,
                            marginHorizontal: 50,
                            marginVertical: 10,
                        }}
                        buttonStyle={{
                            backgroundColor: ColorConstants.APP_PINK,
                            borderRadius: 25,
                        }}
                        onPress={() => { handleConfirm() }}
                    />

                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{
                            fontSize: 12, alignContent: 'center',
                            alignSelf: 'center', alignItems: 'center'
                        }} textAlign='center'>
                            As soon as you click confirm,
                        </Text>


                        <Text style={{
                            fontSize: 12, alignContent: 'center',
                            alignSelf: 'center', alignItems: 'center'
                        }} textAlign='center'>
                            This project will be added to your store
                        </Text>

                    </View>



                </View>



            </View>
        )

    }







    return <>
        {/* <Container > */}

        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} edges={['right', 'bottom', 'left', 'top']} >
            <ScrollView style={{ width: '95%' }} contentContainerStyle={{ backgroundColor: '#F9F9F9', paddingHorizontal: 10 }} >

                {/* {renderImages()} */}

                <View style={{ flex: 1 }}>
                    {/* {alert(item.shooting_angles[0].delivery_link)} */}

                    <Image
                        style={{ flex: 1, height: 500 }}
                        source={{
                            uri: item.shooting_angles[0].delivery_link,
                        }}
                    />

                    <Image
                        style={{ flex: 1, height: 500 }}
                        source={{
                            uri: item.shooting_angles[1].delivery_link,
                        }}
                    />

<Image
                        style={{ flex: 1, height: 500 }}
                        source={{
                            uri: item.shooting_angles[2].delivery_link,
                        }}
                    />



                    {/* <FlatList
                        horizontal
                        data={item.shooting_angles}
                        renderItem={({ data }) => {
                            return ( */}
                    {/* <Card
                        title={null}
                        image={{ uri: item.shooting_angles[0].delivery_link }}
                        containerStyle={{ padding: 0, width: 400 }}
                        resizeMode={'contain'}
                    > */}
                    {/* <Text style={{ marginBottom: 10 }}>
                                        {data}
                                    </Text> */}
                    {/* </Card> */}
                    {/* );
                        }}
                        keyExtractor={(item, index) => index}
                    /> */}


                </View>


                {renderInputs()}
                {rebderSideButtons()}
                {renderDiscription()}


            </ScrollView>
            {renderButton()}
        </SafeAreaView>




        {/* </Container> */}

    </>
}



const styles = StyleSheet.create({
    view: {
        margin: 10,
    },
    titleText: {
        //textAlign: 'center',
        padding: 5,
        //fontSize: 20,
        //fontWeight: "bold"
    },
    text: {
        //textAlign: 'center',
        padding: 5,
        fontSize: 14,
    },
    more: {
        marginVertical: 20,
    },
    button: {
        width: 120,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    input: {
        width: 200,
        borderBottomColor: 'red',
        borderWidth: 1,
    },
});


