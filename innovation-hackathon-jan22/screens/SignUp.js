import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert, Dimensions, TouchableOpacity } from 'react-native'
import Loader from '../components/Loader'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Chip, withTheme, colors, Input, Icon, Text, ButtonGroup, Button, ListItem, BottomSheet, CheckBox, ImageBackground } from 'react-native-elements';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import { ColorConstants, FontFamily } from '../constants/baseConstant';
import { SharedImages, SharedIcons } from '../constants/sharedImages';
import { createStoreAction } from '../redux/actions/createStoreAction';
import { connect, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import setAuthToken from '../utility/setAuthToken'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from 'react-native-geolocation-service';
import { useFocusEffect } from '@react-navigation/native';
import useGeoLocation from "./../hooks/useGeolocation";
import strings from '../vernacular'
import { RFValue } from "react-native-responsive-fontsize";
import { loginStoreAction } from '../redux/actions/loginStoreAction';




const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const axios = require("axios");

const SignUp = ({ route, navigation, props }) => {
    const [progress, setProgress] = useState(0);
    const [isLoaded, setLoaded] = useState(false);
    const [checked, setChecked] = useState(false);
    //const [state, setState] = useState([])
    const [email, setEmail] = useState("");
    const [storeName, setStoreName] = useState("");
    console.log("****************", props);
    const [location, setLocation] = useState({})
    const [isVisible, setIsVisible] = useState(false);
    const [language, setLanguage1] = useState(strings.getLanguage())
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState(0);
    const [auth, setAuth] = useState(false);











    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('userData')
            jsonValue != null ? JSON.parse(jsonValue) : null;
            setUserInfo(jsonValue)
            setAuth(true)
            console.log('*signup*****jsonValue*******', jsonValue)
            return jsonValue
        } catch (e) {
            // error reading value
        }
    }

    useEffect(() => {

        getData()
            .then((res) => {
                console.log('***Signup***res*******', JSON.parse(res))
                let result = JSON.parse(res)

                if (result.email && result.name) {
                    let payload = {
                        email: result.email,
                        name: result.name
                    }
                    setIsVisible(false)
                    dispatch(loginStoreAction(payload))

                    navigation.navigate('Welcome')
                }



            })
            .catch(err => {

            }
            )

    }, [userInfo, auth]);






    const list = [
        { title: 'English' },
        { title: 'Hindi', },
        {
            title: 'Cancel',
            containerStyle: { backgroundColor: ColorConstants.APP_PINK },
            titleStyle: { color: 'white' },
            onPress: () => setIsVisible(false),
        },
    ];



    const state = useSelector((state) => state);

    useEffect(() => {
        console.log("********state*******#########*", state);
        if (state.createStoreReducer.storeDetails.status === 201) {
            const { token, name, email } =
                state.createStoreReducer.storeDetails.data.data;

            const { data } = state.createStoreReducer.storeDetails.data
            const jsonValue = JSON.stringify(data)
            storeInAsync(jsonValue)

            setAuthToken(token);
            alert(token);
            navigation.navigate("Welcome");
        }
    }, [state]);

    const storeInAsync = async (jsonValue) => {
        let result = await AsyncStorage.setItem('userData', jsonValue)
        //alert(result)
    }




    const { getLocation } = useGeoLocation({
        onLocationFetch: ({ longitude, latitude }) => {
            let location = {
                longitude: longitude,
                latitude: latitude
            }
            setLocation(location)
        }
    })


    useEffect(() => {
        setIsVisible(true)
        //strings.getLanguage();
        getLocation()


    }, [])




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
                            {" "}
                            {strings.eShop}{" "}
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
            alert("Both fields are required!");
            return;
        }

        const payload = {
            name: storeName,
            email: email,
            payment_option: ["UPI", "debit_card", "cash"],
            fulfilment: "take_in",
            location: location,
            language: language
        };
        dispatch(createStoreAction(payload));
    };


    const createTwoButtonAlert = (language) =>
        Alert.alert(
            `${language}`,
            `You have selected ${language}`,
            [
                {
                    text: "OK", onPress: () =>
                        setIsVisible(false)
                }
            ]
        );




    const setLanguage = (lang) => {

        let language = lang === 'Hindi' ? "hi_IN" : "en_US"

        strings.setLanguage(language);
        setLanguage1(language)
        createTwoButtonAlert(lang)

    }


    return (
        <>
            {/* <Container > */}

            <View
                style={{ flex: 1, width: "100%" }}
                contentContainerStyle={{
                    flex: 1,
                    backgroundColor: "#F9F9F9",
                    paddingHorizontal: 10,
                }}
            >
                {/* <View style={{flex: 1,  justifyContent: 'center', alignItems: 'center' }} > */}

                {renderWelcomeCard()}

                <View style={{ flex: 0.7, padding: 20 }}>
                    <Text h2>{strings.createstore}</Text>
                    <View style={{ top: 50 }}>
                        <Input
                            placeholder="email"
                            containerStyle={{ justifyContent: "center" }}
                            inputContainerStyle={{
                                backgroundColor: "#E5E5E5",
                                paddingLeft: 10,
                                size: 10,
                                color: "green",
                                borderColor: "#E5E5E5",
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
                            placeholder="eStore"
                            containerStyle={{ justifyContent: "center" }}
                            inputContainerStyle={{
                                backgroundColor: "#E5E5E5",
                                paddingLeft: 10,
                                size: 10,
                                color: "green",
                                borderColor: "#E5E5E5",
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



                    <View style={{ top: 40, flexDirection: 'row', paddingLeft: 10 }}>
                        <CheckBox checked={checked} onPress={() => { setChecked(!checked) }}></CheckBox>
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
                            {strings.BysigningupIagreetoeShopTermsofServiceandprivacypolicy}
                        </Text>
                    </View>
                    {/* <Button onPress={handleClick} style={{height:50}}>
                    submit
                </Button> */}


                    <View style={{ top: 50, left: deviceWidth * 0.1 }}>
                        <Button
                            title={strings.continue}
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
                            {strings.Alreadyhaveanaccount}
                        </Text>
                        <TouchableOpacity onPress={() => { navigation.navigate('Login') }}>
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
                                {"Login"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={{ alignItems: 'center', justifyContent: 'center' }} contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
                <BottomSheet modalProps={{}} isVisible={isVisible}>
                    {list.map((l, i) => (
                        <View style={{ justifyContent: 'center' }} >
                            <ListItem
                                key={i}
                                containerStyle={l.containerStyle}
                                onPress={() => setLanguage(l.title)

                                    //alert(l.title)
                                }
                            >
                                <ListItem.Content>
                                    <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
                                </ListItem.Content>
                            </ListItem>
                        </View>
                    ))}
                </BottomSheet>
            </View>

            {/* </Container> */}
        </>
    );
};

const mapStateToProps = (state) => ({
    //pageList: state.pageList.pageList,
});

//   const ActionCreators = Object.assign(
//     {},
//     createStoreAction,
//   );
//   const mapDispatchToProps = dispatch => ({
//     actions: bindActionCreators(ActionCreators, dispatch),
//   });

//   export default connect(mapStateToProps, mapDispatchToProps)(App)

//   const mapStateToProps = state => ({
//     //createStore: state,
//   });

//   const mapDispatchToProps = dispatch => {
//     return {
//         createStoreAction: () => dispatch(createStoreAction())
//     }
//   }

export default SignUp; //connect(mapStateToProps, mapDispatchToProps)(SignUp)
