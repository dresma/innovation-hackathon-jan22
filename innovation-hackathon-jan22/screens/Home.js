
import React, { Component, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  Text,
  ScrollView,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import { ColorConstants,FontFamily } from '../constants/baseConstant';
import LinearGradient from 'react-native-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';
import { SharedImages,SharedIcons } from '../constants/sharedImages';
// import { Button, Text } from 'react-native-elements';
import Header from '../components/Header'
import Category from '../components/CategoryCard'
import ImageSlider from '../components/imageSlider';
import {  Overlay, Icon,Input } from 'react-native-elements';
// import { Dropdown } from 'react-native-element-dropdown';
import strings from '../vernacular'
import AsyncStorage from '@react-native-async-storage/async-storage';

const CategoryList = [
  {name:"Food" , url :SharedImages.bowl},
  {name:"Bags" , url :SharedImages.bag},
  {name:"Others" , url :SharedImages.other},
  {name:"Cars" , url :SharedImages.car},
]
class App extends Component {



  constructor(props) {
    super(props);
    this.state = {
      

    }
    this.inputs = {};
  }

   getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@@userData')
      jsonValue != null ? JSON.parse(jsonValue) : null;
      setUserInfo(jsonValue)
      console.log('******jsonValue*******',jsonValue)
      return jsonValue
    } catch(e) {
      // error reading value
    }
  }

  componentDidMount=async()=> {

    let userInfo = await AsyncStorage.getItem('userData')
    const jsonValue = userInfo != null ? JSON.parse(userInfo) : null;
    console.log('%%%%%%%%%%jsonValue%%%%%%%%%%',jsonValue)


    if(!jsonValue.email || !jsonValue.name){
    
      this.props.navigation.navigate('Login')
    }

   
      let payload = {
        email: jsonValue.email,
        name: jsonValue.email
    }

    //alert(JSON.stringify(payload))


    
  }








  handleCategoryPrss = (data) =>{
  this.props.navigation.navigate("AngleCameraScreen",{
    Category:data,
    CategoryList:CategoryList
  })
  
    
  }
  HeaderComponent = () =>{
    
    return(<>
      <LinearGradient
          colors={[ColorConstants.PRIMARY, ColorConstants.SECONDARY]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1}}
          style={[styles.linearGradient]}
        >
          <Text style = {[styles.subHeader]}>{strings.Desc}</Text>
         </LinearGradient>

       <ImageSlider />  

    </>)
  }

  FooterComponent = () =>{

    return(<>
       <Text style = {styles.txtProductCategory}>{strings.ProductCategory}</Text>
        <FlatList
          style={{
            top:-20,
            paddingBottom:50  
          }}
            numColumns={2}
            horizontal={false}
            keyExtractor={(item, index) => JSON.stringify(item) + index}
            data={CategoryList}
            showsHorizontalScrollIndicator={false}
            renderItem={({item,index})=>{
              return(<Category name = {item.name}  url = {item.url} onPressCategory = {(data)=>this.handleCategoryPrss(data)}/>)}}
          />

    </>)
  }

  render() {
    return (
      <View styles={styles.container}>
      <Header doMyShootIconEnables = {true} title={'DoMyShoot'} rightIcon = {false} icon = {SharedIcons.profile}/>

      {/* <Overlay isVisible={true}>
        <View style ={{  width:310, height:400}}>
          <View style = {{flexDirection:'row'}}>
          <Text style ={{ marginTop: 35,
                          marginLeft:22,
                          marginRight:22,
                          fontFamily: FontFamily.OBJECTIVITY_REGULAR,
                          fontWeight: '500',
                          color: ColorConstants.TEXT_COLOR_GREY,
                          fontSize: RFValue(15, 736),
                          textAlign: 'center',
                          lineHeight: 20}}>{"Create Catelog"}</Text>
          <Text  style = {{position:'absolute',right:0,marginTop: 35,marginRight:22,}} >{"X"}</Text>
          </View>
          <View style = {{flexDirection:'row'}}>
          <Input
            placeholder="Comment"
            value = {'kumar'}
            onChangeText={() => {}}
          />
          </View>
        </View>
      </Overlay> */}

      <FlatList
            data={[]}
            ListHeaderComponent = {this.HeaderComponent()}
            ListFooterComponent={this.FooterComponent()} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    flex: 1,
  },
  linearGradient:{
    top:-20,
    height: 160,
    width: "100%",
    marginTop: 26,
  },
  subHeader:{
    paddingTop:25,
    fontFamily: FontFamily.OBJECTIVITY_REGULAR,
    fontWeight: '400',
    color: ColorConstants.WHITE,
    fontSize: RFValue(16, 667),
    top: 2,
    left:10,
    textAlignVertical: 'center',
    paddingHorizontal:10
  },
  txtProductCategory:{
    paddingTop:-25,
    fontFamily: FontFamily.OBJECTIVITY_REGULAR,
    fontWeight: '700',
    color: ColorConstants.BLACK,
    fontSize: RFValue(16, 667),
    top: -25,
    left:10,
    textAlignVertical: 'center'
  }
 
});

const mapStateToProps = state => ({
  // pageList: state.pageList.pageList,
});

// const ActionCreators = Object.assign(
//   {},
//   pageActions,
// );
const mapDispatchToProps = dispatch => ({
  // actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App)
