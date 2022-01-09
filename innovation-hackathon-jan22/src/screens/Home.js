
import React, { Component } from 'react';
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

const CategoryList = [
  {name:"Bowl" , url :SharedImages.bowl},
  {name:"bag" , url :SharedImages.bag},
  {name:"Other" , url :SharedImages.other},
  {name:"Car" , url :SharedImages.car},
]
class App extends Component {

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
          <Text style = {[styles.subHeader]}>{"Drive revenue with ower next\ngeneration image creation\nworkflow"}</Text>
         </LinearGradient>
       <ImageSlider />       

    </>)
  }

  FooterComponent = () =>{

    return(<>
       <Text style = {styles.txtProductCategory}>{'Product Category'}</Text>
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
      <Header doMyShootIconEnables = {true} title={'DoMyShoot'} rightIcon = {true} icon = {SharedIcons.profile}/>

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
    textAlignVertical: 'center'
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
