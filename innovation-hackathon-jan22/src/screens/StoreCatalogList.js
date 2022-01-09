import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert,TouchableOpacity,StyleSheet,FlatList } from 'react-native'
import Header from '../components/Header';
import { SharedIcons,SharedImages } from '../constants/sharedImages';
const axios = require('axios');
import { RFValue } from 'react-native-responsive-fontsize';
import { ColorConstants, FontFamily } from "../constants/baseConstant";
import ShootCatalogCard from '../components/shootCatalogCard';

const CategoryListActive = [
    {name:"Bowl" , url :SharedImages.bowl},
    {name:"bag" , url :SharedImages.bag},
    {name:"Other" , url :SharedImages.other},
    {name:"Car" , url :SharedImages.car},
    {name:"Bowl" , url :SharedImages.bowl},
    {name:"bag" , url :SharedImages.bag},
    {name:"Other" , url :SharedImages.other},
    {name:"Car" , url :SharedImages.car},
    {name:"Bowl" , url :SharedImages.bowl},
    {name:"bag" , url :SharedImages.bag},
    {name:"Other" , url :SharedImages.other},
    {name:"Car" , url :SharedImages.car},
  ]

  const CategoryListInActive = [
    {name:"bag" , url :SharedImages.bag},
    {name:"Bowl" , url :SharedImages.bowl},
    {name:"Other" , url :SharedImages.other},
    {name:"Car" , url :SharedImages.car},
    {name:"Bowl" , url :SharedImages.bowl},
    {name:"bag" , url :SharedImages.bag},
    {name:"Other" , url :SharedImages.other},
    {name:"Car" , url :SharedImages.car},
    {name:"Bowl" , url :SharedImages.bowl},
    {name:"bag" , url :SharedImages.bag},
    {name:"Other" , url :SharedImages.other},
    {name:"Car" , url :SharedImages.car},
  ]

export default StoreCatalogList = ({ route, navigation }) => {
    const [progress, setProgress] = useState(0);
    const [isLoaded, setLoaded] = useState(false);
    const [state, setState] = useState([])
    const [selectedTabNumber, setselectedTabNumber] = useState([1])
    const [List, setList] = useState(CategoryListActive)

    
    const onClick = async (event) => {
        const url = ``
        axios.post(url, {}, {
            headers: {
                'Content-Type': 'application/json',
            }
          })
          .then((response) => {
            console.log('response Data',response.data)
          })
          .catch((error) => {
            console.log('error',error)
          })
 }


 const renderTabHeader = ()=> {
    return (
      <View style = {{
        overflow:'hidden',
        backgroundColor:ColorConstants.WHITE,
      }}>
      <View style={{
        alignItems: 'center',
        backgroundColor:ColorConstants.WHITE,
        shadowColor: "black",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1.5,
        elevation: 5.0,
        marginBottom:5,
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
                      console.log("item",item)
                    if(item === "Active"){
                        setList(CategoryListActive)
                    }else{
                        setList(CategoryListInActive)
                    }
                  }}
                  style={{
                    flexDirection: 'column',
                    paddingTop:10,
                    marginRight: 50,
                    marginLeft: 50,
                    justifyContent: 'center',
                    backgroundColor:ColorConstants.WHITE,
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
                    backgroundColor: ( selectedTabNumber == (index + 1)) ? ColorConstants.APP_RED : ColorConstants.CLEAR
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

    return (
      <View styles={styles.container}>
        <Header title={"Title"} rightIcon = {true} icon ={SharedIcons.profile} subTitle = {"SubTitle"}/>
        {renderTabHeader()}
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
              return(<ShootCatalogCard name = {item.name}  url = {item.url} onPressCategory = {(data)=>this.handleCategoryPrss(data)}/>)}}
          />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor:ColorConstants.WHITE,
        flex: 1,
    }

})
