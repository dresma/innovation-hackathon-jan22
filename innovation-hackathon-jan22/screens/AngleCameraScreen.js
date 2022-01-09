import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
  //SafeAreaView,
  Dimensions,
  FlatList,
  BackHandler,
  TouchableWithoutFeedback,
  Button,
  Modal,
  Alert,
  ActivityIndicator,
  ScrollView
} from "react-native";
import Header from "../components/Header";
import { SharedIcons } from "../constants/sharedImages";
import { checkCameraPermission } from "../common/commonMethod";
import { ColorConstants, FontFamily } from "../constants/baseConstant";
import LinearGradient from "react-native-linear-gradient";
import { RNCamera } from "react-native-camera";
import { Overlay, Icon } from "react-native-elements";
import CreateCatalog from "../components/createCatalogPopUp";
import { SharedImages } from "../constants/sharedImages";
import axios from "axios";
import { element } from "prop-types";
import S3 from 'aws-sdk/clients/s3';
import fs from 'react-native-fs';
import { decode } from 'base64-arraybuffer';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';

const s3bucket = new S3({
  accessKeyId: 'AKIA2U4IFRRX6HGQ6A7S',
  secretAccessKey: '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',
  Bucket: 'ondc',
  signatureVersion: 'v4',
});

const shoot = {
  "status": true,
  "status_code": 201,
  "message": "subcategory fetched succesfully",
  "data": [
      {
          "_id": "61d9522e71c56ce4e3ec5ddb",
          "name": "subcat_1",
          "category": "611a0bfad251cf70d335f057",
          "category_name": "name1",
          "angles_array": [
              {
                  "angle_name": "Front",
                  "overlay": "https://assets.dresma.com/DoMyShoot/Staging/Bowl%20Front_white-1629097017681.png",
                  "angle_id": "611a0bfad251cf70d335f012"
              },
              {
                  "angle_name": "Rear",
                  "overlay": "https://assets.dresma.com/DoMyShoot/Staging/Bowl%20Front_white-1629097017681.png",
                  "angle_id": "611a0bfad251cf70d335f013"
              }
          ],
          "__v": 0
      },
      {
          "_id": "61d9522e71c56ce4e3ec5ddc",
          "name": "subcat_2",
          "category": "611a0bfad251cf70d335f057",
          "category_name": "name1",
          "angles_array": [
              {
                  "angle_name": "Front",
                  "overlay": "https://assets.dresma.com/DoMyShoot/Staging/Bowl%20Front_white-1629097017681.png",
                  "angle_id": "611a0bfad251cf70d335f014"
              },
              {
                  "angle_name": "Rear",
                  "overlay": "https://assets.dresma.com/DoMyShoot/Staging/Bowl%20Front_white-1629097017681.png",
                  "angle_id": "611a0bfad251cf70d335f015"
              }
          ],
          "__v": 0
      }
  ]
}

const CategoryList = [
  {name:"Food" , url :SharedImages.bowl},
  {name:"Bags" , url :SharedImages.bag},
  {name:"Others" , url :SharedImages.other},
  {name:"Cars" , url :SharedImages.car},

]

const CameraScreen = (props) => {

  let Category = props.route.params&& props.route.params.Category? props.route.params&& props.route.params.Category :"Others"
  let cameraPermission = checkCameraPermission();
  const [subCategory, setSubCategory] = useState([]);
  const [angleList, setAngleList] = useState([]);
  const [captureImage, setCaptureImage] = useState([]);
  const [visible, setVisible] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [categoryName, setCategoryName] = useState(Category);
  const [producrName, setProductName] = useState('');
  const [producrNameErr, setProductNameErr] = useState();
  const [storeName, setStoreName] = useState('')
  const [storeId, setStoreId] = useState('')
  const storeInfo =  useSelector((state) => state.createStoreReducer.storeDetails.data);
  const state = useSelector((state) => state)
  const [email, setEmail] = useState('')


  useEffect(() => {


    if (state && state.loginStoreReducer && state.loginStoreReducer.loginInfo.status === 201) {
        console.log('********state*******#########', state.loginStoreReducer.loginInfo.data)
        const { token, email, name, location, _id } = state.loginStoreReducer.loginInfo.data.data
      setStoreName(name)
      setEmail(email)
      //setSetLocation(location)
      setStoreId(_id)

        
    }

}, [state]);

  
  useEffect(() => {
    if (storeInfo && storeInfo.data) {
      setStoreName(storeInfo.data.name)
      setStoreId(storeInfo.data._id)

    }
  }, [storeInfo]);


  const handleSubCatChange = (index) => {
    var category_list = subCategory
    console.log("🚀 ~ file: AngleCameraScreen.js ~ line 96 ~ handleSubCatChange ~ category_list", category_list,index)
    category_list.map((item) => {
      item.isSelected = false
    })
    category_list[index].isSelected = true
    setSubCategory(category_list)
    var angleArr = category_list[index].angles_array;
    angleArr.map((item) => {
      item.isSelected = false
    }) 
     angleArr[0].isSelected = true
     setAngleList(angleArr)
  }
  const handleAngleChange = (index) => {
    var angle_list = angleList
    angle_list.map((item) => {
      item.isSelected = false
    })
    angle_list[index].isSelected = true
     setAngleList(angle_list)
  }
 

  const uploadImageOnS3 = (data) => {
    return new Promise(async(resolve, reject) =>{
      console.log("🚀 ~ file: AngleCameraScreen.js ~ line 146 ~ uploadImageOnS3 ~ data", data)
      let contentType = 'image/jpeg';
      let contentDeposition = 'inline;filename="' + data.uri.split("/")[(data.uri.split("/")).length - 1] + '"';
      const base64 = await fs.readFile(data.uri, 'base64');
      const imgname = data.category.split(' ').join('_') + '/' + data.shootName.split(' ').join('_')+ '.jpg'
      const arrayBuffer = decode(base64);
      s3bucket.createBucket(async () => {
        const params = {
          Bucket: 'ondc',
          ACL: 'public-read',
          Key: imgname,
          Body: arrayBuffer,
          ContentDisposition: contentDeposition,
          ContentType: contentType,
        };
        s3bucket.upload(params, async (err, data) => {
          if (err) {
          console.log("🚀 ~ file: AngleCameraScreen.js ~ line 162 ~ s3bucket.upload ~ err", err)
          }
          else {
          console.log("🚀 ~ file: AngleCameraScreen.js ~ line 163 ~ s3bucket.upload ~ data", data)
          resolve(data.Location)
          }
        })
    })
    })

  }

const handleShoodDone = async() =>{
  if(!isUploading && captureImage.length!==0){
  let shootAngle = []
   captureImage.forEach(async (item,index)=>{
      let shoot = {
        angle_image:item.capturedImage,
        overlay:item.overlay,
        angle_name:item.angle_name,
        angle_id:item.angle_id,
        subCategory_id:item.sub_category_id
      }
      shootAngle.push(shoot)
  })
  let payload = {
    name:producrName,
    store_id:storeId,
    category:categoryName,
    banner_image:"",
    subcategory_id:shootAngle[0].subCategory_id,
    shooting_angles:shootAngle
  }

  const url = `http://3.134.83.186/api/v1/user/createShoot`
  await console.log("🚀 ~ file: AngleCameraScreen.js ~ line 499 ~ handleCreateCatalog ~ url", url,payload)
    axios.post(url,payload,{
        headers: {
            'Content-Type': 'application/json',
        }
      })
      .then((response) => {
      console.log("🚀 ~ file: AngleCameraScreen.js ~ line 155 ~ .then ~ response", response)
      props.navigation.navigate("Welcome")
      }).catch((err)=>{
        
      })
}else{
  console.log("🚀 ~ file: AngleCameraScreen.js ~ line 221 ~ handleShoodDone ~ isUploading", isUploading)
  if(isUploading === true){
    Alert.alert(
      "Uploading",
      "Wait image is being Upload",
      [  { text: "Ok", onPress: () => {} } ]
  ); 
  }else{
     Alert.alert(
      "No Image Captured",
      "Please Shoot Images for processing",
      [{ text: "Ok", onPress: () => {} }]
    )
  }
}
}


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

  const renderCameraHeader = () => {
    return (
      <View
        style={{
          backgroundColor: "#292A31",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={{
            width: 40,
            marginRight: 20,
            marginTop: 60,
            height: 40,
            padding: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            Alert.alert(
              "Delete Shoot",
              "Are you want to Cancel Shoot ?",
              [ {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "No"
                },
                { text: "Yes", onPress: () => {props.navigation.navigate("Welcome")} }
              ]
 
          );            
          }}
        >
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
            handleShoodDone()
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
    );
  };

  const renderSubCategory = ({ item ,index}) => {
    if (item.isSelected == true) {
      return (
        <TouchableOpacity
          style={{
            paddingLeft: 10,
            alignSelf: "flex-start",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => {
            handleSubCatChange(index)
          }}
        >
          <LinearGradient
            colors={[ColorConstants.PRIMARY, ColorConstants.SECONDARY]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
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
          </LinearGradient>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        style={{
          paddingLeft: 10,
          alignSelf: "flex-start",
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => {
          handleSubCatChange(index)
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
    );
  };

  const renderAnglesList = () => {
    return (
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
          data={angleList}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
          if (item.isSelected === true) {
             return( <TouchableOpacity
              style={{ 
                paddingLeft: 10,
                alignSelf: "flex-start",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={()=>{
                handleAngleChange(index)                
              }}
            >
              {/* {console.log("item.isSelected",item.isSelected)} */}
              <Image
                // source={SharedIcons.profile}
                source={{ uri: item.overlay }}
                style={{
                  marginTop: 10,
                  height: 55,
                  width: 66,
                  tintColor: ColorConstants.APP_PINK
                }}
                resizeMode={"contain"}
              />
               {item.isCaptured &&
                <Image
                  source={SharedIcons.selectIcon}
                  style={{
                    height: 18,
                    width: 18,
                    position: 'absolute',
                    top: 0,
                    right: 5
                  }}
                  resizeMode={'cover'}
            />}
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
            </TouchableOpacity>)
            }
              return (
              <TouchableOpacity
                style={{
                  paddingLeft: 10,
                  alignSelf: "flex-start",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={()=>{
                  handleAngleChange(index)
                  console.log("🚀 ~ file: AngleCameraScreen.js ~ line 360 ~ renderAnglesList ~ index", index,item)
                }}
              >
                <Image
                  // source={SharedIcons.profile}
                  source={{ uri: item.overlay }}
                  style={{
                    marginTop: 10,
                    height: 55,
                    width: 66,
                    tintColor:  ColorConstants.WHITE
                  }}
                  resizeMode={"contain"}
                />
                 {item.isCaptured &&
                <Image
                  source={SharedIcons.selectIcon}
                  style={{
                    height: 18,
                    width: 18,
                    position: 'absolute',
                    top: 0,
                    right: 5
                  }}
                  resizeMode={'cover'}
            />}
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
            );
          // }
          }}
        />
      </View>
    );
  };

  const takePicture = async () => {
    if (this.camera) {
      setIsUploading(true)
      const options = { quality: 0.5, base64: false };
      const data = await this.camera.takePictureAsync(options);
      let subCatArr =  subCategory.filter(ele=>ele.isSelected===true)
      let uploadedData = {
          uri:data.uri,
          store_id:storeId,
          category:categoryName,
          shootName:producrName
        }

     let uploadedresp = await uploadImageOnS3(uploadedData)
     setIsUploading(false)
      await setSubCategory(subCatArr)
      let nextIndexValue = 0
      let angleListArr = angleList
      let captureData = ""
      angleListArr.map((angle,index)=>{
        if(angle.isSelected===true){
          angle.isCaptured = true
          angle.category_id=subCatArr[0].category
          angle.sub_category_id=subCatArr[0]._id
          angle.capturedImage = uploadedresp
          nextIndexValue = index+1
          captureData = angle
        }
      })
      let captureimageDetails =  captureImage
      captureimageDetails.push(captureData)
      setCaptureImage(captureimageDetails)
      angleListArr.map((angle)=>{
          angle.isSelected = false
      })
      angleListArr[nextIndexValue].isSelected = true
      setAngleList(angleListArr)
    }
  };

  const handleCategoryChange =(data)=>{
    setCategoryName(data.name)
    setModalVisible(!modalVisible)

    }

  const onProductNameChange =(name)=>{
    setProductNameErr("")
    setProductName(name)
  }
 
    const handleCreateCatalog =(data)=>{
      // alert(JSON.stringify(data))
      if(producrName===''){
        console.log(producrName,categoryName)
        setProductNameErr("Please Enter Catalog Name")
      }else{
    const url = `http://3.134.83.186/api/v1/user/fetchSubCategory/`+categoryName
    console.log("🚀 ~ file: AngleCameraScreen.js ~ line 499 ~ handleCreateCatalog ~ url", url)
    axios.get(url,{
        headers: {
            'Content-Type': 'application/json',
        }
      })
      .then((response) => {
        let subCatList = response.data.data
        // let subCatList = shoot.data
        console.log("🚀 ~ file: AngleCameraScreen.js ~ line 614 ~ .then ~ subCatList", subCatList)
        subCatList.map((element,index)=>{element.isSelected=false})
        subCatList[0].isSelected = true
        let anglelist = subCatList[0].angles_array
         anglelist.map((element,index)=>{element.isSelected=false})
        anglelist[0].isSelected = true
        setAngleList(anglelist)
        setSubCategory(subCatList)
        setVisible(false)
      })
      .catch((error) => {
        console.log('error',error)
      })
      }
    }

  return (
    <>

      {visible ? (
        <CreateCatalog  
        catagoryList = {CategoryList} 
        selectedCategory = {categoryName} 
        handleCategoryChange = {(data)=>handleCategoryChange(data)}
        onProductNameChange = {(name)=>onProductNameChange(name)}
        props={props}
        producrNameErr= {producrNameErr}
        handleCreateCatalog = {()=>handleCreateCatalog()}
        handleListModal = {()=>{setModalVisible(!modalVisible)}}
        modalVisiblity = {modalVisible}
        />
      ) : (
        <>
       
       <ScrollView  contentContainerStyle={{flexGrow:1}}>
          <View>{renderCameraHeader()}</View>

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
              data={subCategory}
              showsHorizontalScrollIndicator={false}
              renderItem={(item, index) => renderSubCategory(item)}
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
            flashMode={"off"}
            autoFocus={"on"}
            autoFocusPointOfInterest={{ x: 0.56, y: 0.46 }}
            zoom={0}
            whiteBalance={"auto"}
            ratio={"16:9"}
            focusDepth={0}
            androidCameraPermissionOptions={{
              title: "Permission to use camera",
              message: "We need your permission to use your camera",
              buttonPositive: "Ok",
              buttonNegative: "Cancel",
            }}
            androidRecordAudioPermissionOptions={{
              title: "Permission to use audio recording",
              message: "We need your permission to use your audio",
              buttonPositive: "Ok",
              buttonNegative: "Cancel",
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
              onPress={() => {
                takePicture();
              }}
            >
              <Image
                resizeMode={"cover"}
                source={SharedIcons.captureIcon}
                style={{ width: "90%", height: "90%" }}
              />
            </TouchableOpacity>
          </View>
          </ScrollView>
        </>
      )}
     
      
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
