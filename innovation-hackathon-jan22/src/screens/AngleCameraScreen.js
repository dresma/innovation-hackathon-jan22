import React,{useState,useEffect} from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  FlatList,
  BackHandler,
  TouchableWithoutFeedback,
  Button,
  Modal
} from "react-native";
import Header from "../components/Header";
import { SharedIcons } from "../constants/sharedImages";
import { checkCameraPermission } from "../common/commonMethod";
import { ColorConstants, FontFamily } from "../constants/baseConstant";
import LinearGradient from 'react-native-linear-gradient';
import { RNCamera } from "react-native-camera";
import {  Overlay, Icon } from 'react-native-elements';

const shootSetupArr = {
  banner_image:
    "https://assets.dresma.com/DoMyShoot/Staging/raw-vegan-diet-1296x728-feature-1629096947835.jpg",
  Sub_Category: [
    {
      isSelected : true,
      name: "Dish",
      shooting_angles: [
        {
          angle_id: "611a0c68d251cf70d335f09c",
          angle_image:
            "https://assets.dresma.com/DoMyShoot/Staging/Bowl%20Front_white-1629097017681.png",
          angle_name: "Front",
          isCapture: false,
          isSelected: true,
          mandatory: false,
          profile_name: "Front",
          grid_overlay:
            "https://assets.dresma.com/DoMyShoot/Staging/Bowl%20Front_white-1629097053092.png",
        },
        {
          angle_id: "611a0ca5cfe29670dc4f88fa",
          angle_image:
            "https://assets.dresma.com/DoMyShoot/Staging/Bowl%20Angled_white-1629097109628.png",
          angle_name: "Angled",
          isCapture: false,
          isSelected: true,
          mandatory: false,
          profile_name: "Angled”",
          grid_overlay:
            "https://assets.dresma.com/DoMyShoot/Staging/Bowl%20Angled_white-1629097089705.png",
        },
      ],
    },
    {
      name: "Dish2",
      isSelected : false,
      shooting_angles: [
        {
          angle_id: "611a0c68d251cf70d335f09c",
          angle_image:
            "https://assets.dresma.com/DoMyShoot/Staging/Bowl%20Front_white-1629097017681.png",
          angle_name: "Front",
          isCapture: false,
          isSelected: true,
          mandatory: false,
          profile_name: "Front",
          grid_overlay:
            "https://assets.dresma.com/DoMyShoot/Staging/Bowl%20Front_white-1629097053092.png",
        },
        {
          angle_id: "611a0ca5cfe29670dc4f88fa",
          angle_image:
            "https://assets.dresma.com/DoMyShoot/Staging/Bowl%20Angled_white-1629097109628.png",
          angle_name: "Angled2",
          isCapture: false,
          isSelected: true,
          mandatory: false,
          profile_name: "Angled”",
          grid_overlay:
            "https://assets.dresma.com/DoMyShoot/Staging/Bowl%20Angled_white-1629097089705.png",
        },
      ],
    },
  ],
};

let shooting_angles = [{
    angle_id: "611a0c68d251cf70d335f09c",
    angle_image:
      "https://assets.dresma.com/DoMyShoot/Staging/Bowl%20Front_white-1629097017681.png",
    angle_name: "Front",
    isCapture: false,
    isSelected: true,
    mandatory: false,
    profile_name: "Front",
    grid_overlay:
      "https://assets.dresma.com/DoMyShoot/Staging/Bowl%20Front_white-1629097053092.png",
  }, {
    angle_id: "611a0ca5cfe29670dc4f88fa",
    angle_image:
      "https://assets.dresma.com/DoMyShoot/Staging/Bowl%20Angled_white-1629097109628.png",
    angle_name: "Angled2",
    isCapture: false,
    isSelected: true,
    mandatory: false,
    profile_name: "Angled”",
    grid_overlay:
      "https://assets.dresma.com/DoMyShoot/Staging/Bowl%20Angled_white-1629097089705.png",
  },
  
]


const CameraScreen = (props) => {
console.log("🚀 ~ file: AngleCameraScreen.js ~ line 118 ~ CameraScreen ~ props", props.route.params)
  
  let cameraPermission = checkCameraPermission();
  const [shootSetup, setShootSetup] = useState(shootSetupArr.Sub_Category);
  const [visible, setVisible] = useState(true);
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const autoFocusPoint = {
    drawRectPosition: {
      x: Dimensions.get("window").width * 0.56 - 32,
      y: Dimensions.get("window").height * 0.46 - 32,
    },
  };

  const drawFocusRingPosition = {
    top: autoFocusPoint.drawRectPosition.y - 32,
    left: autoFocusPoint.drawRectPosition.x - 32,
  };

  const renderCameraHeader = () =>{
    return(
       <View
          style={{
            backgroundColor: "#292A31",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
         >
           <TouchableOpacity style = {{
            width: 40,
            marginRight: 20,
            marginTop: 45,
            height: 40,
            padding:20,
            justifyContent: "center",
            alignItems: "center",
           }}
           onPress={()=>{props.navigation.navigate('Welcome')}}>
          <Image
              style={{
                width: 20,
                height: 20,
              }}
              source={SharedIcons.backArrow}
              resizeMode={"contain"}
            />
           </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 40,
              marginRight: 20,
              marginTop: 40,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              console.log("sdsfsfs");
            }}
          >
            <View
              style={{
                borderWidth: 1,
                borderColor: "#FFFFFF",
                borderRadius: 50,
                width: 90,
                marginRight: 47,
                marginTop: 5,
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  width: "100%",
                  textAlign: "center",
                  paddingTop: 7,
                  marginBottom: 10,
                }}
              >
                {"Done"}
              </Text>
            </View>
          </TouchableOpacity>

        </View>
    )
  }

  const renderSubCategory = ({item}) => {
            if (item.isSelected == true) {
                return(
                    <TouchableOpacity style={{
                        paddingLeft:10,
                        alignSelf: 'flex-start',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      onPress={()=>{
                          let shootArr = shootSetup
                          shootArr.forEach(ele=>ele.isSelected=false) 
                          shootArr.forEach(ele=>{
                              if(ele.name===item.name){
                                  ele.isSelected=true}
                              }) 
                              setShootSetup(shootArr)
                              console.log("🚀 ~ file: AngleCameraScreen.js ~ line 240 ~ renderSubCategory ~ shootArr", shootArr)
                      }}
                      >  
               <LinearGradient 
                        colors={[ColorConstants.PRIMARY, ColorConstants.SECONDARY]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1}}
                        style={{
                            // borderWidth: 1,
                            borderRadius: 50,
                            width: 90,
                            marginRight: 5,
                            marginTop: 5,
                       }}
                        >
                            <Text  style={{
                                color: "#FFFFFF",
                                width: "100%",
                                textAlign: "center",
                                paddingTop: 7,
                                marginBottom: 10,
                            }}>{item.name}</Text>

                      </LinearGradient>
                      </TouchableOpacity>
                    )
            }
              return (
                <TouchableOpacity style={{
                  paddingLeft:10,
                  alignSelf: 'flex-start',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onPress={()=>{
                    let shootArr = shootSetup
                    shootArr.forEach(ele=>ele.isSelected=false) 
                    shootArr.forEach(ele=>{
                        if(ele.name===item.name){
                            ele.isSelected=true}
                        }) 
                        setShootSetup(shootArr)
                }}
                > 
                 <View
                    style={{
                        // borderWidth: 1,
                        borderRadius: 50,
                        width: 90,
                        marginRight: 5,
                        marginTop: 5,
                   }}
                 >
             <Text
               style={{
                 color: "#FFFFFF",
                 width: "100%",
                 textAlign: "center",
                 paddingTop: 7,
                 marginBottom: 10,
               }}
             >
             {item.name}
          </Text>
         </View>
      </TouchableOpacity> 
     
   )
  }

  const renderAnglesList = () =>{
    return( 
      <View
        style={{
          backgroundColor: "#292A31",
          flexDirection: "row",
          justifyContent: "space-between",
          height: 100,
        }}
      >
         <FlatList
          style={{
            marginLeft: 5,
            marginRight: 0,
            height: "100%",
          }}
          horizontal={true}
          bounces={true}
          keyExtractor={(item, index) => JSON.stringify(item) + index}
          data={shooting_angles}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            // if (item.isSelected == true) {
              return (
                <TouchableOpacity style={{
                  paddingLeft:10,
                  alignSelf: 'flex-start',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                    <Image
                            // source={SharedIcons.profile}
                            source={{ uri: item.angle_image }}
                            style={{
                            marginTop: 10,
                            height: 55,
                            width: 66,
                            tintColor: item.isSelected ? ColorConstants.APP_PINK : "white",
                            }}
                            resizeMode={"contain"}
                        />
                   <View
                      style={{
                        borderColor: "#FFFFFF",
                        width: 90,
                        marginRight: 5,
                        marginTop: 5,
                      }}
                    >
                        
                     <Text
                      style={{
                        color: "#FFFFFF",
                        width: "100%",
                        textAlign: "center",
                        paddingTop: 7,
                        marginBottom: 10,
                      }}
                    >
                    {item.angle_name}
                 </Text>
                </View>
                </TouchableOpacity>
              )
          }}
        />
        
    </View>)
   }


   const renderModal = () =>{

   }

const takePicture = async () => {
  if(this.camera){
    console.log("captured",this.camera)
    const options = { quality: 0.5, base64: false };
    // console.log('hreererer>>>>>', uploadData)
    const data = await this.camera.takePictureAsync(options);
    props.navigation.navigate("Welcome",data)
    console.log("🚀 ~ file: AngleCameraScreen.js ~ line 365 ~ takePicture ~ data", data)
  }
}
   
  return (
    <>
    <View>
    {renderCameraHeader()}
     
    </View>
    
    <View
        style={{
        backgroundColor: "#292A31",
        flexDirection: "row",
        justifyContent: "space-between",
        height: 50,
        }}
    >
        <FlatList
          style={{
            marginLeft: 5,
            marginRight: 0,
            height: "100%",
          }}
          horizontal={true}
          bounces={true}
          keyExtractor={(item, index) => JSON.stringify(item) + index}
          data={shootSetup}
          showsHorizontalScrollIndicator={false}
          renderItem={(item, index)  =>renderSubCategory(item)}
       />
    </View>
    <RNCamera
     ref={(ref) => {
      this.camera = ref;
    }}
    style={{
      flex: 1,
      justifyContent: "space-between",
    }}
    type={"back"}
    flashMode={'off'}
    autoFocus={'on'}
    autoFocusPointOfInterest={{ x: 0.56, y: 0.46 }}
    zoom={0}
    whiteBalance={'auto'}
    ratio={'16:9'}
    focusDepth={0}
    androidCameraPermissionOptions={{
        title: 'Permission to use camera',
        message: 'We need your permission to use your camera',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
      }}
      androidRecordAudioPermissionOptions={{
        title: 'Permission to use audio recording',
        message: 'We need your permission to use your audio',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
      }}
  />
         {renderAnglesList()}
        <View
              style={{
                marginLeft: 0,
                marginRight: 0,
                height: 90,
                backgroundColor: "#292A31",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  width: 90,
                  marginTop: 10,
                  height: 90,
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 47,
                  marginRight: 47,
                }}
                onPress={ () => {
                  takePicture()
                }}
              >
                <Image
                  resizeMode={"cover"}
                  source={SharedIcons.captureIcon}
                  style={{ width: "90%", height: "90%" }}
                />
              </TouchableOpacity>
            </View>    
    </>
  );

};
  
const styles = StyleSheet.create({
  container: {
    // backgroundColor: "white",
    flex: 1,
  },
  autoFocusBox: {
    position: "absolute",
    height: 64,
    width: 64,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "white",
    opacity: 0.4,
  },
});

export default CameraScreen;
