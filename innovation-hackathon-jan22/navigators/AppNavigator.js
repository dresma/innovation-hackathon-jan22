import * as React from 'react';
import { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabs from './MainTabs';
import AngleCameraScreen from '../screens/AngleCameraScreen'
import Home from '../screens/Home'
import StoreSettings from '../screens/StoreSetting'
import SignUp from '../screens/SignUp'
import AddToStore from '../screens/AddToStore'
import Login from '../screens/Login'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect, useDispatch, useSelector } from 'react-redux';
import  {loginStoreAction} from '../redux/actions/loginStoreAction';
import setAuthToken from '../utility/setAuthToken'




const Stack = createNativeStackNavigator();

const AppNavigator = ({props}) => {
  console.log('&&&&&&&&&', props)
  const [userInfo, setUserInfo] = useState(0);
  const [auth, setAuth] = useState(false);

  const dispatch = useDispatch();


  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userData')
      jsonValue != null ? JSON.parse(jsonValue) : null;
      setUserInfo(jsonValue)
      setAuth(true)
      //console.log('******jsonValue*******',jsonValue)
      return jsonValue
    } catch(e) {
      // error reading value
    }
  }

  useEffect(() => {

    getData()
    .then((res)=>{
      console.log('******res*******',JSON.parse(res))
      let result = JSON.parse(res)
      setAuthToken(result.token)
      
      if(result.email && result.name ){
        let payload={
          email: result.email,
          name: result.name
        }
        dispatch(loginStoreAction(payload))
      }

      

    })
    .catch(err=>{

}
    )

  }, [userInfo, auth]);



 return (
   <Stack.Navigator headerMode={"none"} screenOptions={({ route, navigation }) => ({
    headerShown: false,
    gestureEnabled: true
  })}>
     {/* <Stack.Screen name="AngleCameraScreen" component={AngleCameraScreen}  />   */}
    <Stack.Screen name='SignUp' component={SignUp} />
    <Stack.Screen name="Login" component={Login}  /> 
     <Stack.Screen name='Welcome' component={MainTabs} />
     <Stack.Screen name="AngleCameraScreen" component={AngleCameraScreen}  />  
     <Stack.Screen name="StoreSettings" component={StoreSettings}  />  
     <Stack.Screen name="AddToStore" component={AddToStore}  />  
     {/* <Stack.Screen name="Home" component={Home}  />   */}
   </Stack.Navigator>
 );
}

export default AppNavigator;
