import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert, Dimensions } from 'react-native'
import Loader from '../components/Loader'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Chip, withTheme, colors, Input, Icon, Text, ButtonGroup, Button , ListItem, BottomSheet} from 'react-native-elements';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import { ColorConstants, FontFamily } from '../constants/baseConstant';
import { SharedImages, SharedIcons } from '../constants/sharedImages';
import  {createStoreAction} from '../redux/actions/createStoreAction';
import { connect, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import setAuthToken from '../utility/setAuthToken'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from 'react-native-geolocation-service';
import { useFocusEffect } from '@react-navigation/native';
import useGeoLocation from "./../hooks/useGeolocation";
import strings from '../vernacular'
import { RFValue } from "react-native-responsive-fontsize";




const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

<<<<<<< HEAD

const axios = require('axios');





const SignUp =( {route, navigation, props })=> {
    const [progress, setProgress] = useState(0);
    const [isLoaded, setLoaded] = useState(false);
    //const [state, setState] = useState([])
    const [email, setEmail] = useState('')
    const [storeName, setStoreName] = useState('')
    console.log('****************',props )
    const dispatch = useDispatch();
    const [location, setLocation] = useState({})
    const [isVisible, setIsVisible] = useState(false);
    const [language, setLanguage1] = useState(strings.getLanguage())

    const list = [
        { title: 'English' },
        { title: 'Hindi', },
        {
          title: 'Cancel',
          containerStyle: { backgroundColor: ColorConstants.APP_PINK},
          titleStyle: { color: 'white'},
          onPress: () => setIsVisible(false),
        },
      ];
    



    const state = useSelector((state) => state);


        useEffect(() => {

            
                console.log('********state*******#########*',state )
                if(state.createStoreReducer.storeDetails.status === 201){
                    const { token, name, email } = state.createStoreReducer.storeDetails.data.data
                    let userDetails = {
                        name:name,
                        email:email
                    }
                    // await AsyncStorage.setItem('token', `${token}`);
                    // await AsyncStorage.setItem('userDetails', `${userDetails}`);
                    setAuthToken(token)
                    navigation.navigate('Welcome')
                
                
            }
           
           
          },[state]);

          const { getLocation } = useGeoLocation({
            onLocationFetch: ({ longitude, latitude }) => {
                let location = {
                    longitude:longitude,
                    latitude:latitude
                }
                    setLocation(location)
            }
          })
        

          useEffect(()=>{
            setIsVisible(true)
            //strings.getLanguage();
            getLocation()


          },[])





    const renderWelcomeCard = () => {


        return (
            <View style={{ flex: 0.3, paddingTop: 30, backgroundColor: 'pink' }}>

            </View>

        )
    }

    const handleClick = ()=>{
        if(!email || !storeName ){
            alert('Both fields are required!')
            return
        }

        const payload = {
            name: storeName,
            email: email,
            payment_option: [
                "UPI",
                "debit_card",
                "cash"
            ],
            fulfilment: "take_in",
            location:location
        }
        dispatch(createStoreAction(payload))
    }


    const createTwoButtonAlert = (language) =>
    Alert.alert(
        `${language}`,
      `You have selected ${language}`,
      [
        { text: "OK", onPress: () => 
        setIsVisible(false)
         }
      ]
    );




    const setLanguage=(lang)=>{

        let language = lang === 'Hindi' ? "hi_IN" : "en_US"
        
        strings.setLanguage(language);
        setLanguage1(language)
        createTwoButtonAlert(lang)
        
        //alert(language)

    }




    return <>
        {/* <Container > */}

        <View style={{ flex: 1, width: '100%' }} contentContainerStyle={{ flex: 1, backgroundColor: '#F9F9F9', paddingHorizontal: 10 }} >
            {/* <View style={{flex: 1,  justifyContent: 'center', alignItems: 'center' }} > */}



            {renderWelcomeCard()}


            <View style={{ flex: 0.7 }}>
                <Text
                    h2
                >Create Store</Text>
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
                    label={'Email Address'}
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
                    label={'Store Name'}
                    // labelProps={size=40}
                    labelStyle={{ paddingBottom: 5 }}
                    onChangeText={(text) => setStoreName(text)}
                    value={storeName}

                />
                {/* <Button onPress={handleClick} style={{height:50}}>
                    submit
                </Button> */}


                <Button
                        title={'submit'}
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

            






            <Text>{strings.home}</Text>
            {/* <Loader isLoaded={false}  /> */}
            {/* </View> */}
        </View>
        <View style={{alignItems:'center', justifyContent:'center'}} contentContainerStyle={{alignItems:'center', justifyContent:'center'}}>
        <BottomSheet modalProps={{}} isVisible={isVisible}>
        {list.map((l, i) => (
            <View style={{ justifyContent:'center'}} >
          <ListItem
            key={i}
            containerStyle={l.containerStyle}
            onPress={()=> setLanguage(l.title)
                
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




=======
const axios = require("axios");

const SignUp = ({ route, navigation, props }) => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setLoaded] = useState(false);
  const [checked, setChecked] = useState(false);
  //const [state, setState] = useState([])
  const [email, setEmail] = useState("");
  const [storeName, setStoreName] = useState("");
  console.log("****************", props);
  const dispatch = useDispatch();

  const state = useSelector((state) => state);

  useEffect(() => {
    console.log("********state*******#########*", state);
    if (state.createStoreReducer.storeDetails.status === 201) {
      const { token, name, email } =
        state.createStoreReducer.storeDetails.data.data;
      let userDetails = {
        name: name,
        email: email,
      };
      // await AsyncStorage.setItem('token', `${token}`);
      // await AsyncStorage.setItem('userDetails', `${userDetails}`);
      setAuthToken(token);
      alert(token);
      navigation.navigate("Welcome");
    }
  }, [state]);

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
            Welcome to{" "}
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
            eShop{" "}
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
            Digitization of Catalogs{" "}
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
      location: {
        longitude: "27.2046° N",
        latitude: "77.4977° E",
      },
    };
    dispatch(createStoreAction(payload));
  };

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
          <Text h2>Create Store</Text>
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
              label={"Email Address"}
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
              label={"Store Name"}
              // labelProps={size=40}
              labelStyle={{ paddingBottom: 5 }}
              onChangeText={(text) => setStoreName(text)}
              value={storeName}
            />
          </View>



          <View style={{ top: 40, flexDirection:'row' }}>
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
          </View>
          {/* <Button onPress={handleClick} style={{height:50}}>
                    submit
                </Button> */}


          <View style={{ top: 50, left: deviceWidth * 0.1 }}>
            <Button
              title={"Continue"}
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
          <View style={{ top:60,  flexDirection:'row' }}>
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
            {"Already have an account? "}
          </Text>
          <TouchableOpacity onPress={()=>{navigation.navigate('Login')}}>
          <Text
            style={{
              top:20,
              right:10,
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

      {/* </Container> */}
    </>
  );
};
>>>>>>> 801ab2149cd19a712ba1143e7d4e68be9dac8128

const mapStateToProps = (state) => ({
  //pageList: state.pageList.pageList,
});

<<<<<<< HEAD
        </View>
        
      </View>
=======
//   const ActionCreators = Object.assign(
//     {},
//     createStoreAction,
//   );
//   const mapDispatchToProps = dispatch => ({
//     actions: bindActionCreators(ActionCreators, dispatch),
//   });
>>>>>>> 801ab2149cd19a712ba1143e7d4e68be9dac8128

//   export default connect(mapStateToProps, mapDispatchToProps)(App)

<<<<<<< HEAD

        {/* </Container> */}

    </>
}


  export default  SignUp   
  




=======
//   const mapStateToProps = state => ({
//     //createStore: state,
//   });

//   const mapDispatchToProps = dispatch => {
//     return {
//         createStoreAction: () => dispatch(createStoreAction())
//     }
//   }

export default SignUp; //connect(mapStateToProps, mapDispatchToProps)(SignUp)
>>>>>>> 801ab2149cd19a712ba1143e7d4e68be9dac8128
