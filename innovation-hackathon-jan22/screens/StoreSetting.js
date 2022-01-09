import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert, Dimensions, StyleSheet } from 'react-native'
import Loader from '../components/Loader'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Chip, withTheme, colors, Input, Icon, Text, ButtonGroup, Button } from 'react-native-elements';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import { ColorConstants, FontFamily } from '../constants/baseConstant';
import { SharedImages, SharedIcons } from '../constants/sharedImages';
import { useSelector } from 'react-redux';
import strings from '../vernacular';


const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;


const axios = require('axios');
//import Icon from 'react-native-vector-icons/MaterialIcons'

//Icon.loadFont();



export default StoreSetting = ({ route, navigation }) => {
    const [progress, setProgress] = useState(0);
    const [isLoaded, setLoaded] = useState(false);
    //const [state, setState] = useState([])
    const [selectedIndexes, setSelectedIndexes] = useState([0, 2, 3]);
    const [selectedDeliveryMode, setSelectedDeliveryMode] = useState([0]);
    const [storeName, setStoreName] = useState('')
    const [location, setSetLocation] = useState({})
    const [email, setEmail] = useState('')
    const storeInfo = useSelector((state) => state.createStoreReducer.storeDetails.data);
    const state = useSelector((state) => state)


  useEffect(() => {


    if (state && state.loginStoreReducer && state.loginStoreReducer.loginInfo.status === 201) {
        console.log('********state*******#########', state.loginStoreReducer.loginInfo.data)
        const { token, email, name, location } = state.loginStoreReducer.loginInfo.data.data
      setStoreName(name)
      setEmail(email)
      setSetLocation(location)
        
    }

}, [state]);




    // useEffect(() => {


    //     if (storeInfo.data) {
    //         setStoreName(storeInfo.data.name)
    //         setEmail(storeInfo.data.email)

    //     }
    // }, [storeInfo]);

    useEffect(() => {
        

        if (storeInfo && storeInfo.data) {
            setStoreName(storeInfo.data.name)
            setEmail(storeInfo.data.email)

        }
    }, [storeInfo]);


    const renderHeader = () => {
        return (
            <View style={{ alignContent: 'flex-start' }}>
                <View style={{ alignSelf: 'flex-end', paddingHorizontal: 30 }}>
                    <Chip
                        title=""
                        icon={{
                            name: 'close',
                            type: 'font-awesome',
                            size: 20,
                            color: 'white',
                        }}
                        iconRight
                        containerStyle={{ marginVertical: 15 }}
                        onPress={()=>{
                        // console.log("🚀 ~ file: StoreSetting.js ~ line 45 ~ renderHeader ~ props.navigation", navigation)
                         navigation.goBack()
                    }}
                    />
                </View>

                <View style={{ alignSelf: 'flex-start' }}>
                    <Text style={styles.titleText} h4 h3Style={{ color: ColorConstants.TEXT_COLOR }}>
                            storeName
                    </Text>

                    <Text style={styles.text} h4Style={{ color: ColorConstants.TEXT_COLOR_GREY }}>
                        Shree Market, Sector - 36, Gurgaon
                        
                    </Text>
                    <Text style={styles.text} h4Style={{ color: ColorConstants.TEXT_COLOR_GREY }}>
                       {`longitude: ${location.longitude} , latitude: ${location.latitude}`}
                        
                    </Text>
                </View>
            </View>
        )
    }

    const renderAccountInfo = () => {
        return (
            <View style={{ alignContent: 'flex-start', paddingTop: 20 }}>
                <View style={{ alignSelf: 'flex-start', paddingVertical: 10 }}>
                    <Text style={styles.titleText} h4 h3Style={{ color: ColorConstants.TEXT_COLOR }}>
                        Account Info
                    </Text>
                </View>
                <Input
                    placeholder={email}
                    leftIcon={
                        <Icon
                            name='email'
                            size={20}
                            color='#262626'
                        />}
                    containerStyle={{ justifyContent: 'center', }}
                    inputContainerStyle={{
                        backgroundColor: '#E5E5E5',
                        paddingLeft: 10,
                        borderBottomEndRadius: 0,
                        borderWidth: 0,
                        borderColor: '#E5E5E5'

                    }}
                    inputStyle={{ fontSize: 14, paddingLeft: 5 }}
                    disabled={true}

                />

            </View>
        )
    }

    const renderStoreSetting = () => {
        return (
            <View style={{ alignContent: 'flex-start' }}>
                <View style={{ alignSelf: 'flex-start', paddingVertical: 10 }}>
                    <Text style={styles.titleText} h4 h3Style={{ color: ColorConstants.TEXT_COLOR }}>
                        Store Setting
                    </Text>
                </View>
                <Input
                    placeholder={storeName}
                    leftIcon={
                        <Icon
                            name='home'
                            size={20}
                            color='#262626'
                        />}
                    containerStyle={{ justifyContent: 'center', }}
                    inputContainerStyle={{
                        backgroundColor: '#E5E5E5',
                        paddingLeft: 10,
                        borderColor: '#E5E5E5'

                    }}
                    inputStyle={{ fontSize: 14, paddingLeft: 5 }}
                    disabled={true}

                />
                <Input
                    placeholder='Shree Market, Sector - 36, Gurgaon'
                    leftIcon={
                        <Icon
                            name='home'
                            size={20}
                            color='#262626'
                        />}
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

                />



            </View>
        )
    }


    const PaymentSetting = () => {
        return (
            <View style={{ alignContent: 'flex-start' }}>
                <View style={{ alignSelf: 'flex-start', paddingVertical: 10 }}>
                    <Text style={styles.titleText} h4 h3Style={{ color: ColorConstants.TEXT_COLOR }}>
                        {strings.Paymentcriteria}
                    </Text>
                </View>
                <ButtonGroup
                    buttons={[strings.Cash, strings.UPI, strings.CreditDebitCards]}
                    selectMultiple
                    selectedIndexes={selectedIndexes}
                    onPress={(value) => {
                        setSelectedIndexes(value);
                    }}
                    containerStyle={{ marginBottom: 20, borderWidth: 0, border: 0, height:40 }}
                    buttonStyle={{ backgroundColor: '#E5E5E5', borderRadius: 10, borderWidth: 0 }}
                    selectedButtonStyle={{ backgroundColor: '#262626', borderWidth: 0 }}
                    buttonContainerStyle={{ paddingLeft: 5, borderWidth: 0 }}
                />
            </View>
        )
    }


    const deliverySetting = () => {
        return (
            <View style={{ alignContent: 'flex-start' }}>
                <View style={{ alignSelf: 'flex-start', paddingVertical: 10 }}>
                    <Text style={styles.titleText} h4 h3Style={{ color: ColorConstants.TEXT_COLOR }}>
                    {strings.Fulfillmentcriteria}
                    </Text>
                </View>
                <ButtonGroup
                    buttons={[strings.Storepickup, strings.HomeDelivery,]}
                    selectMultiple
                    selectedIndexes={selectedDeliveryMode}
                    onPress={(value) => {
                        setSelectedDeliveryMode(value);
                    }}
                    containerStyle={{ marginBottom: 20, borderWidth: 0, border: 0, height:40  }}
                    buttonStyle={{ backgroundColor: '#E5E5E5', borderRadius: 10, borderWidth: 0 }}
                    selectedButtonStyle={{ backgroundColor: '#262626', borderWidth: 0 }}
                    buttonContainerStyle={{ paddingLeft: 5, borderWidth: 0 }}
                />

            </View>
        )
    }


    const handleClick = async () => {
        let payload = {
            name: storeName,
            email: email,
            payment_option: selectedDeliveryMode,
            fulfilment: 'delivery'
        }
        const headers = {
            'Content-Type': 'application/json',
        }

        await axios
            .put('http://3.134.83.186/api/v1/user/updateStore',
                payload,
                {
                    headers: headers
                }
            )
            .then(async function (response) {
                console.log('resoinder', response)
                apiResponse = response,
                    console.log('response', response);
                    navigation.navigate('Welcome')
                    alert('Store settings are updated successfully!')
                    
                //alert('res', response)
                // await dispatch(createStoreSuccess(apiResponse));
                // return apiResponse || {}
            })
            .catch(error => {
                console.log(error);
                //dispatch(createStoreFailure(error.message))
                return error
            });


    }


    const renderButton = () => {
        return (
            <View style={{ alignContent: 'flex-start', bottom: -10 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Button
                        title={'Confirm'}
                        containerStyle={{
                            width: '80%',
                            marginHorizontal: 50,
                            marginVertical: 10,
                        }}
                        buttonStyle={{
                            backgroundColor: ColorConstants.BLACK,
                            borderRadius: 25,
                        }}
                        onPress={handleClick}
                    />
                </View>
            </View>
        )

    }








    return <>
        {/* <Container > */}
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', top:-30 }} edges={['right', 'left', 'top']} >
            <ScrollView style={{ width: '100%' }} contentContainerStyle={{ backgroundColor: '#F9F9F9', paddingHorizontal: 10 }} >

                {renderHeader()}
                {renderAccountInfo()}
                {renderStoreSetting()}
                {PaymentSetting()}
                {deliverySetting()}
                {renderButton()}

                {/* <Text>Store Settings</Text> */}
                {/* <Loader isLoaded={false}  /> */}

            </ScrollView>
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
});






