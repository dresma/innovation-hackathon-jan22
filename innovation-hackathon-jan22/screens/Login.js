import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert, Dimensions, TouchableOpacity } from 'react-native'
import Loader from '../components/Loader'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Chip, withTheme, colors, Input, Icon, Text, ButtonGroup, Button, CheckBox } from 'react-native-elements';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import { ColorConstants, FontFamily } from '../constants/baseConstant';
import { SharedImages, SharedIcons } from '../constants/sharedImages';
import { loginStoreAction } from '../redux/actions/loginStoreAction';
import { connect, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import setAuthToken from '../utility/setAuthToken'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RFValue } from "react-native-responsive-fontsize";
import strings from '../vernacular'




const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;


const axios = require('axios');




const Login = ({ route, navigation, props }) => {
    const [progress, setProgress] = useState(0);
    const [isLoaded, setLoaded] = useState(false);
    const [checked, setChecked] = useState(false);
    //const [state, setState] = useState([])
    const [email, setEmail] = useState('')
    const [storeName, setStoreName] = useState('')
    console.log('****************', props)
    const dispatch = useDispatch();
    const [changeState, setChangeState] = useState({})




    const state = useSelector((state) => state);

    useEffect(() => {


        console.log('********state*******#########', state)
        if (state && state.loginStoreReducer && state.loginStoreReducer.loginInfo.status === 201) {
            console.log('********state*******#########', state.loginStoreReducer.loginInfo.data)
            const { token } = state.loginStoreReducer.loginInfo.data.data
            const { data } = state.loginStoreReducer.loginInfo.data
            setAuthToken(token)
            const jsonValue = JSON.stringify(data)
            storeInAsync(jsonValue)
            navigation.navigate('Welcome')
        }

    }, [state]);

    const storeInAsync = async (jsonValue) => {
        let result = await AsyncStorage.setItem('userData', jsonValue)
        //alert(result)
    }




    const renderWelcomeCard = () => {
        return (
            <View
                style={{
                    flex: 0.3,
                    paddingTop: 30,
                    backgroundColor: "pink",
                    alignContent: "center",
                }}
            >
                <View style={{ top: 40, left: deviceWidth * 0.35 }}>
                    <Text
                        style={{
                            fontFamily: FontFamily.OBJECTIVITY_MEDIUM,
                            fontWeight: "500",
                            color: ColorConstants.BLACK,
                            fontSize: RFValue(15, 812),
                        }}
                    >
                        {" "}
                        {strings.Welcometo}{" "}
                    </Text>
                    <Text
                        style={{
                            top: 40,
                            fontFamily: FontFamily.OBJECTIVITY_MEDIUM,
                            fontWeight: "500",
                            color: ColorConstants.BLACK,
                            fontSize: RFValue(22, 716),
                        }}
                    >
                        {strings.eShop}
                    </Text>
                    <Text
                        style={{
                            top: 50,
                            right: 40,
                            fontFamily: FontFamily.OBJECTIVITY_MEDIUM,
                            fontWeight: "500",
                            color: ColorConstants.BLACK,
                            fontSize: RFValue(15, 812),
                        }}
                    >
                        {" "}
                        {strings.Digitizationofcatalogs}{" "}
                    </Text>
                </View>
                {/* <Text> Welcome to </Text> */}
            </View>
        );
    };

    const handleClick = () => {
        if (!email || !storeName) {
            alert('Both fields are required!')
            return
        }

        const payload = {
            name: storeName,
            email: email,
            // payment_option: [
            //     "UPI",
            //     "debit_card",
            //     "cash"
            // ],
            // fulfilment: "take_in",
            // location: {
            //     "longitude":"27.2046° N",
            //     "latitude": "77.4977° E"
            // }
        }
        dispatch(loginStoreAction(payload))
    }




    return <>
        {/* <Container > */}

        <View style={{ flex: 1, width: '100%' }} contentContainerStyle={{ flex: 1, backgroundColor: '#F9F9F9', paddingHorizontal: 10 }} >
            {/* <View style={{flex: 1,  justifyContent: 'center', alignItems: 'center' }} > */}



            {renderWelcomeCard()}


            <View style={{ flex: 0.7, padding: 20 }}>
                <Text
                    h2
                >{strings.login}</Text>

                <View style={{ top: 50 }}>
                    <Input
                        placeholder='email'
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
                        label={strings.emailaddress}
                        // labelProps={size=40}
                        labelStyle={{ paddingBottom: 5 }}
                        onChangeText={(text) => setEmail(text)}
                        value={email}

                    />

                    <Input
                        placeholder='eStore'
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
                        label={strings.storename}
                        // labelProps={size=40}
                        labelStyle={{ paddingBottom: 5 }}
                        onChangeText={(text) => setStoreName(text)}
                        value={storeName}
                    />

                </View>

                {/* <View style={{ top: 40, flexDirection:'row' }}>
          <CheckBox checked ={checked} onPress={()=>{setChecked(!checked)}}></CheckBox>
          <Text
            style={{
              top:20,
              right:10,
              fontFamily: FontFamily.OBJECTIVITY_REGULAR,
              fontWeight: "500",
              color: ColorConstants.BLACK,
              fontSize: RFValue(15, 812),
            }}
          >
            {"By Signing Up, I am agreed to eShop\n Terms of sevices"}
          </Text>
           </View> */}

                <View style={{ top: 50, left: deviceWidth * 0.1 }}>

                    <Button
                        title={'Continue'}
                        onPress={handleClick}
                        containerStyle={{
                            width: 150,
                            marginHorizontal: 50,
                            marginVertical: 10,
                        }}
                        buttonStyle={{
                            backgroundColor: ColorConstants.APP_PINK,
                            borderRadius: 25,
                        }}
                    />

                </View>
                <View style={{ top: 60, flexDirection: 'row' }}>
                    <Text
                        style={{
                            top: 20,
                            right: 10,
                            fontFamily: FontFamily.OBJECTIVITY_REGULAR,
                            fontWeight: "500",
                            color: ColorConstants.BLACK,
                            fontSize: RFValue(15, 812),
                        }}
                    >
                        {"Create an account? "}
                    </Text>
                    <TouchableOpacity onPress={() => { navigation.navigate('SignUp') }}>
                        <Text
                            style={{
                                top: 20,
                                right: 10,
                                fontFamily: FontFamily.OBJECTIVITY_REGULAR,
                                fontWeight: "500",
                                color: ColorConstants.APP_RED,
                                fontSize: RFValue(15, 812),
                            }}
                        >
                            {"Sign Up"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>




            {/* <Loader isLoaded={false}  /> */}
            {/* </View> */}
        </View>



        {/* </Container> */}

    </>
}


export default Login      //connect(mapStateToProps, mapDispatchToProps)(SignUp)





