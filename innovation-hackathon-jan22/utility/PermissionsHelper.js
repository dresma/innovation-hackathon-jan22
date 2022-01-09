
import { PermissionsAndroid,Alert } from 'react-native';
import GeoLocation from 'react-native-geolocation-service'
export const requestAndroidLocationPermissions = async () => {
  let permissionGranted = false;

  try {
    permissionGranted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Permission Required',
        message:
          'We require permission to access your current location to help us locate you.',
        buttonPositive: 'Grant',
        buttonNegative: 'Cancel'
      }
    );

    if (permissionGranted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log('CHECK FOR PERMISSIONS FAILED', err);
  }
};


export const requestIOSPermission = async ()=>{
  try {
    
  const response = await GeoLocation.requestAuthorization('whenInUse')
  if(response==='granted'){
    return true
  }else{
    return false
  }
  } catch (error) {
    console.log('CHECK FOR PERMISSIONS FAILED',error)
  }
} 



