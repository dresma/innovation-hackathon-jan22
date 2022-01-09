import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigators/AppNavigator';
import { Provider } from 'react-redux';
import { AppRegistry } from 'react-native';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogBox } from "react-native";

Icon.loadFont();




const App = () => {

    const [userInfo, setUserInfo] = useState(0);
    const [auth, setAuth] = useState(false);
    LogBox.ignoreAllLogs();




    const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('userData')
          jsonValue != null ? JSON.parse(jsonValue) : null;
          setUserInfo(jsonValue)
          setAuth(true)
          console.log('******jsonValue*******',jsonValue)
          //alert('AAAAAPPPPPPPPPP', jsonValue)
          return jsonValue
        } catch(e) {
          // error reading value
        }
      }
    
      useEffect(() => {
    
        getData()
        .then((res)=>{
          //console.log('******res*******',res)
         
        })
        .catch(err=>{
    
    }
        )
    
        
    
      }, [userInfo, auth]);
    











    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <AppNavigator />
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

axios.interceptors.request.use(req => {
    console.log('Request...', req);
    return req;
  });
  
  axios.interceptors.response.use(res => {
    console.log('Response...', res);
    return res;
  });
  
  axios.defaults.timeout = (60*3*1000);
  

export default App;