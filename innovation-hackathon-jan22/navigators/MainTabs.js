import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SharedIcons } from '../constants/sharedImages';
import Home from '../screens/Home';
import CameraScreen from '../screens/AngleCameraScreen';
import StoreCatalogList from '../screens/StoreCatalogList';
//import Home1 from '../screens/Home1';
//import Home2 from '../screens/Home2';
import StoreSettings from '../screens/StoreSetting'
import AddToStore from '../screens/AddToStore'

const Tab = createBottomTabNavigator();

Ionicons.loadFont()

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'md-home-sharp';
          } else if (route.name === 'Camera') {
            iconName = 'md-camera-outline';
          }else if (route.name === 'Store') {
            iconName = 'md-reader-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'red',
        inactiveTintColor: 'gray',
      }}
      headerMode={"none"}

    >
      <Tab.Screen name='Home' component={Home}  />
      <Tab.Screen name='Camera' component={CameraScreen}  
        listeners={({ navigation }) =>({focus: () =>{
          navigation.replace('AngleCameraScreen', {
              screen: 'CameraScreen',
          });
        }})}  />
      <Tab.Screen name='Store' component={StoreCatalogList}  />
    
    </Tab.Navigator>
  );
}

export default MainTabs;