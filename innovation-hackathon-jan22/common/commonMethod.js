import { Platform } from "react-native";

import { PERMISSIONS, requestMultiple, checkMultiple, RESULTS } from 'react-native-permissions';

export const checkCameraPermission = () => {
  if (Platform.OS == "ios") {
    checkMultiple([PERMISSIONS.IOS.CAMERA])
      .then((result) => {
        if (result[PERMISSIONS.IOS.CAMERA] == RESULTS.GRANTED) {
          console.log("11111111");
          return "GRANTED";
        } 
        else {
          requestMultiple([PERMISSIONS.IOS.CAMERA])
            .then((result) => {
             console.log("resultresultresultresult", result);

              if (result == RESULTS.GRANTED) {
                console.log("22222222222");
                return "GRANTED";
              }
            })
            .catch((err) => {
              console.log(
                "🚀 ~ file: commonMethod.js ~ line 22 ~ checkCameraPermission ~ err",
                err
              );
              return "DENIED";
            });
        }
      })
      .catch((err) => {
        console.log(
          "🚀 ~ file: commonMethod.js ~ line 24 ~ checkCameraPermission ~ err",
          err
        );
      });
  } else {
    checkMultiple([PERMISSIONS.ANDROID.CAMERA])
      .then((result) => {
        if (result[PERMISSIONS.ANDROID.CAMERA] == RESULTS.GRANTED) {
          console.log("3333333333");
          return "GRANTED";
        } else {
          requestMultiple([PERMISSIONS.ANDROID.CAMERA])
            .then((result) => {
              if (result[PERMISSIONS.ANDROID.CAMERA] == RESULTS.GRANTED) {
                console.log("444444");
                return "GRANTED";
              }
            })
            .catch((err) => {
              console.log(
                "🚀 ~ file: commonMethod.js ~ line 39 ~ checkCameraPermission ~ err",
                err
              );
              return "DENIED";
            });
        }
      })
      .catch((err) => {
        console.log(
          "🚀 ~ file: commonMethod.js ~ line 39 ~ checkCameraPermission ~ err",
          err
        );
        return "DENIED";
      });
  }
};

