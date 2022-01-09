import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabs from './MainTabs';
import AngleCameraScreen from '../screens/AngleCameraScreen'
import Home from '../screens/Home'


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
 return (
   <Stack.Navigator headerMode={"none"} screenOptions={({ route, navigation }) => ({
    headerShown: false,
    gestureEnabled: true
  })}>
     <Stack.Screen name='Welcome' component={MainTabs} />
     <Stack.Screen name="AngleCameraScreen" component={AngleCameraScreen}  />  
     {/* <Stack.Screen name="Home" component={Home}  />   */}
   </Stack.Navigator>
 );
}

export default AppNavigator;
