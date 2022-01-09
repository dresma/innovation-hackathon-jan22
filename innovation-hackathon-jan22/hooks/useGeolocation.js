import Geolocation from 'react-native-geolocation-service';
import { useState } from "react";
import { Platform, Alert } from 'react-native';
import { requestAndroidLocationPermissions, requestIOSPermission } from '../utility/PermissionsHelper';

const useGeoLocation = ({ onLocationFetch }) => {
  const [loader, setLoader] = useState(false)

  
  const [location, setLocation] = useState({
    longitude: '',
    latitude: ''
  })

  const getLocation = () => {
    // setLoader(true)
    if (Platform.OS === 'ios') {
      // Check for iOS Device Location Permissions and Capture Location
      checkIosLocationAndCapture();
    } else {
      // Check for Android Device Location Permissions and Capture Location
      checkAndroidLocationAndCapture();
    }
  };


  const checkAndroidLocationAndCapture = () => {
    requestAndroidLocationPermissions()
      .then(permissionsGranted => {
        if (permissionsGranted && typeof permissionsGranted === 'boolean') {
          // Permissions Were Granted - Process the Location Request
          captureLocation();
        } else {
          Alert.alert(
            'Permission Required',
            'Please provide permission to access your location manually from Device Settings.',
            [
              {
                text: 'Close',
                onPress: () => {
                  // setLoader(false)
                }
              }
            ],
            {
              cancelable: true
            }
          );
        }
      })
      .catch(error => {
        Alert.alert(
          'Permission Required',
          'Please provide permission to access your location manually from Device Settings.',
          [
            {
              text: 'Close',
              onPress: () => {
                // setLoader(false)
              }
            }
          ],
          {
            cancelable: true
          }
        );
      });
  };

  const checkIosLocationAndCapture = () => {
    requestIOSPermission()
      .then(permissionsGranted => {
        if (permissionsGranted && typeof permissionsGranted === 'boolean') {
          // Permissions Were Granted - Process the Location Request
          captureLocation();
        } else {
          Alert.alert(
            'Permission Required',
            'Please provide permission to access your location manually from Device Settings.',
            [
              {
                text: 'Close',
                onPress: () => {
                  // setLoader(false)
                }
              }
            ],
            {
              cancelable: true
            }
          );
        }
      })
      .catch(error => {
        Alert.alert(
          'Permission Required',
          'Please provide permission to access your location manually from Device Settings.',
          [
            {
              text: 'Close',
              onPress: () => {
                // setLoader(false)
              }
            }
          ],
          {
            cancelable: true
          }
        );
      });
  };



  const captureLocation = () => {

    Geolocation.getCurrentPosition(
      permissionsGranted => {
        if (
          permissionsGranted &&
          typeof permissionsGranted === 'object' &&
          permissionsGranted.hasOwnProperty('coords')
        ) {
          // Permissions are Granted - Proceed to Capture User Location
          console.log('REQUESTED PERMISISONS AQUIRED', permissionsGranted);

          let latitude = permissionsGranted.coords.latitude;
          let longitude = permissionsGranted.coords.longitude;
          // setLoader(false)
          setLocation({
            longitude,
            latitude
          })
          /**get callback here */
          if (onLocationFetch) onLocationFetch({ longitude, latitude })
        } else {
          // setLoader(false)
          Alert.alert(
            'Permission Required',
            'Please provide permission to access your location manually from Device Settings.',
            [
              {
                text: 'Close',
                onPress: () => {
                  // setLoader(false)
                }
              }
            ],
            {
              cancelable: true
            }
          );
        }
      },
      errorPermissionNotGranted => {
        Alert.alert(
          'Permission Required',
          'Please provide permission to access your location manually from Device Settings.',
          [
            {
              text: 'Close',
              onPress: () => {
                // setLoader(false)
              }
            }
          ],
          {
            cancelable: true
          }
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 15000
      }
    );
  };


  return {
    location,
    getLocation
  };
};

export default useGeoLocation;
