import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert, TouchableOpacity, StyleSheet, 
  Dimensions,
  FlatList } from 'react-native'
import Header from '../components/Header';
import { SharedIcons, SharedImages } from '../constants/sharedImages';
const axios = require('axios');
import { RFValue } from 'react-native-responsive-fontsize';
import { ColorConstants, FontFamily } from "../constants/baseConstant";
import ShootCatalogCard from '../components/shootCatalogCard';
import { PROPERTY_TYPES } from '@babel/types';
import { useSelector } from 'react-redux';
const { width, height } = Dimensions.get("window");

const ShootDataArr =   [
  {
      "_id": "61d9d7e50e05542424d5c597",
      "name": "shoot_1",
      "store_id": "611a0e7bd251cf70d335f274",
      "category": "Bag",
      "banner_image": "https://dresma-staging.s3.amazonaws.com/616d0743a95b526680c38cdb/DMS-US-ra5-72/Test/Test-Front.jpg",
      "subcategory_id": "611a0e7bd251cf70d335f273",
      "shooting_angles": [
          {
              "angle_name": "Front",
              "overlay": "https://assets.dresma.com/DoMyShoot/Staging/Bowl%20Front_white-1629097017681.png",
              "angle_image": "https://assets.dresma.com/DoMyShoot/Staging/Bowl%20Front_white-1629097017681.png",
              "angle_id": "611a0bfad251cf70d335f015"
          },
          {
              "angle_name": "Rear",
              "overlay": "https://assets.dresma.com/DoMyShoot/Staging/Bowl%20Front_white-1629097017681.png",
              "angle_image": "https://assets.dresma.com/DoMyShoot/Staging/Bowl%20Front_white-1629097017681.png",
              "angle_id": "611a0bfad251cf70d335f016"
          },
          {
              "angle_name": "Side",
              "overlay": "https://assets.dresma.com/DoMyShoot/Staging/Bowl%20Front_white-1629097017681.png",
              "angle_image": "https://assets.dresma.com/DoMyShoot/Staging/Bowl%20Front_white-1629097017681.png",
              "angle_id": "611a0bfad251cf70d335f017"
          }
      ],
      "status": "Processing",
      "is_active": false,
      "update_date": "2022-01-08T18:28:53.158Z",
      "sku_number": "Bag75512",
      "__v": 0
  },
  {
      "_id": "61da783b0e05542424d5c602",
      "name": "shoot_2",
      "store_id": "611a0e7bd251cf70d335f274",
      "category": "Bag",
      "banner_image": "https://dresma-staging.s3.amazonaws.com/616d0743a95b526680c38cdb/DMS-US-ra5-72/Test/Test-Front.jpg",
      "subcategory_id": "611a0e7bd251cf70d335f273",
      "shooting_angles": [
          {
              "angle_name": "Front",
              "overlay": "https://assets.dresma.com/DoMyShoot/Staging/Bowl%20Front_white-1629097017681.png",
              "angle_image": "https://assets.dresma.com/DoMyShoot/Staging/Bowl%20Front_white-1629097017681.png",
              "angle_id": "611a0bfad251cf70d335f015"
          },
          {
              "angle_name": "Rear",
              "overlay": "https://assets.dresma.com/DoMyShoot/Staging/Bowl%20Front_white-1629097017681.png",
              "angle_image": "https://assets.dresma.com/DoMyShoot/Staging/Bowl%20Front_white-1629097017681.png",
              "angle_id": "611a0bfad251cf70d335f016"
          },
          {
              "angle_name": "Side",
              "overlay": "https://assets.dresma.com/DoMyShoot/Staging/Bowl%20Front_white-1629097017681.png",
              "angle_image": "https://assets.dresma.com/DoMyShoot/Staging/Bowl%20Front_white-1629097017681.png",
              "angle_id": "611a0bfad251cf70d335f017"
          }
      ],
      "status": "Processing",
      "is_active": false,
      "update_date": "2022-01-09T05:52:59.807Z",
      "sku_number": "Bag66384",
      "__v": 0
  }
]

export default StoreCatalogList = ({ route, navigation }) => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setLoaded] = useState(false);
  const [storeName, setStoreName] = useState('')
  const [email, setEmail] = useState('')
  const [storeId, setStoreId] = useState('')
  const [selectedTabNumber, setselectedTabNumber] = useState([1])
  const [ActiveShoot, setActiveShoot] = useState([])
  const [List, setList] = useState([])
  const [data, setData] = useState({})
  const [InActiveShootData, setInActiveShootData] = useState([])
  const storeInfo = useSelector((state) => state.createStoreReducer.storeDetails.data);
  const state = useSelector((state) => state)


  useEffect(() => {


    if (state && state.loginStoreReducer && state.loginStoreReducer.loginInfo.status === 201) {
        console.log('********state*******#########', state.loginStoreReducer.loginInfo.data)
        const { token, email, name } = state.loginStoreReducer.loginInfo.data.data
        const { data } = state.loginStoreReducer.loginInfo.data
      setStoreName(name)
      setEmail(email)
      setData(data)


      if (data) {
        setStoreId(data._id)
      let url = 'http://3.134.83.186/api/v1/user/getShootlist/' +data._id
      axios.get(url,{
       headers: {
           'Content-Type': 'application/json',
       }
     })
     .then((response) => {
     console.log("🚀 ~ file: AngleCameraScreen.js ~ line 155 ~ .then ~ response", response)
       let data = response.data.data
      //  let data = ShootDataArr
       let active_data = []
       let In_active_data = []
       data.forEach(element => {
         if(element.is_active){
           active_data.push(element)
         }else{
           In_active_data.push(element)
         }
       });
       setList(active_data)
       setActiveShoot(active_data)
       setInActiveShootData(In_active_data)
     // props.navigation.navigate("Welcome")
     }).catch((err)=>{
     console.log("🚀 ~ file: StoreCatalogList.js ~ line 126 ~ //.then ~ err", err)
     })
    }
        
    }

}, [state]);




 
  useEffect(() => {

  //   if (data) {
  //     setStoreName(data.name)
  //     setEmail(data.email)
  //     setStoreId(data._id)
  //   let url = 'http://3.134.83.186/api/v1/user/getShootlist/' +data._id
  //   axios.get(url,{
  //    headers: {
  //        'Content-Type': 'application/json',
  //    }
  //  })
  //  .then((response) => {
  //  console.log("🚀 ~ file: AngleCameraScreen.js ~ line 155 ~ .then ~ response", response)
  //    let data = response.data.data
  //   //  let data = ShootDataArr
  //    let active_data = []
  //    let In_active_data = []
  //    data.forEach(element => {
  //      if(element.is_active){
  //        active_data.push(element)
  //      }else{
  //        In_active_data.push(element)
  //      }
  //    });
  //    setList(active_data)
  //    setActiveShoot(active_data)
  //    setInActiveShootData(In_active_data)
  //  // props.navigation.navigate("Welcome")
  //  }).catch((err)=>{
  //  console.log("🚀 ~ file: StoreCatalogList.js ~ line 126 ~ //.then ~ err", err)
  //  })
  // }
  }, []);

  // useEffect(() => {
  //  let url = 'http://3.134.83.186/api/v1/user/getShootlist/' +storeId
  //  axios.get(url,{
  //   headers: {
  //       'Content-Type': 'application/json',
  //   }
  // })
  // .then((response) => {
  // console.log("🚀 ~ file: AngleCameraScreen.js ~ line 155 ~ .then ~ response", response)
  //   let data = response.data.data
  //   // let data = ShootDataArr
  //   let active_data = []
  //   let In_active_data = []
  //   data.forEach(element => {
  //     if(element.is_active){
  //       active_data.push(element)
  //     }else{
  //       In_active_data.push(element)
  //     }
  //   });
  //   setList(active_data)
  //   setActiveShoot(active_data)
  //   setInActiveShootData(In_active_data)
  // // props.navigation.navigate("Welcome")
  // }).catch((err)=>{
  // })
  // }, [storeInfo]);


  const onClick = async (event) => {
    const url = ``
    axios.post(url, {}, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        console.log('response Data', response.data)
      })
      .catch((error) => {
        console.log('error', error)
      })
  }


  const renderTabHeader = () => {
    return (
      <View style={{
        overflow: 'hidden',
        backgroundColor: ColorConstants.WHITE,
      }}>
        <View style={{
          alignItems: 'center',
          backgroundColor: ColorConstants.WHITE,
          shadowColor: "black",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.1,
          shadowRadius: 1.5,
          elevation: 5.0,
          marginBottom: 5,
        }}>
          <View style={{
            flexDirection: 'row'
          }}>
            {
              ['Active', 'Inactive'].map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setselectedTabNumber(index + 1)
                      console.log("item", item)
                      if (item === "Active") {
                        setList(ActiveShoot)
                      } else {
                        setList(InActiveShootData)
                      }
                    }}
                    style={{
                      flexDirection: 'column',
                      paddingTop: 10,
                      marginRight: 50,
                      marginLeft: 50,
                      justifyContent: 'center',
                      backgroundColor: ColorConstants.WHITE,
                    }}>
                    <Text style={{
                      fontFamily: FontFamily.OBJECTIVITY_MEDIUM,
                      fontWeight: '500',
                      color: (selectedTabNumber == (index + 1)) ? ColorConstants.APP_RED : ColorConstants.TEXT_COLOR_GREY,
                      fontSize: RFValue(13, 667),
                      marginBottom: 8,
                      marginHorizontal: 3
                    }}>{item}</Text>
                    <View style={{
                      height: 2,
                      width: '100%',
                      borderRadius: 2,
                      backgroundColor: (selectedTabNumber == (index + 1)) ? ColorConstants.APP_RED : ColorConstants.CLEAR
                    }} />
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </View>
      </View>
    )
  }
const handleCategoryPrss =(data) =>{
console.log("🚀 ~ file: StoreCatalogList.js ~ line 146 ~ handleCategoryPrss ~ data", data)
  navigation.navigate("AddToStore",{
    data:data
  })
}
    return (
      <View styles={styles.container}>
        <Header title={storeName} rightIcon = {true} icon ={SharedIcons.profile} subTitle = {email} onPressSetting = {()=>{navigation.navigate("StoreSettings")}}/>
        {renderTabHeader()}
        {List.length === 0 ?
        <Text 
          style = {{
            fontFamily: FontFamily.OBJECTIVITY_MEDIUM,
            fontWeight: '500',
            color:  ColorConstants.APP_RED ,
            fontSize: RFValue(16, 667),
            top:200,
            marginHorizontal: width*0.25
          }}>No Shoot Available</Text> :
        <FlatList
        style={{
          // bottom:80,
          marginBottom:115,
          backgroundColor:ColorConstants.WHITE,
        }}
          numColumns={2}
          horizontal={false}
          keyExtractor={(item, index) => JSON.stringify(item) + index}
          data={List}
          showsHorizontalScrollIndicator={false}
          renderItem={({item,index})=>{
          console.log("🚀 ~ file: StoreCatalogList.js ~ line 239 ~ item", List)
            return(<ShootCatalogCard name = {item.name} subTitle  = {item.sku_number} url = {item.shooting_angles[0].angle_image} onPressCategory = {()=>handleCategoryPrss(item)}/>)
          }}
        />
      }
       
        </View> 
    )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: ColorConstants.WHITE,
    flex: 1,
  }

})
