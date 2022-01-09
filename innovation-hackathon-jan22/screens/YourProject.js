
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  Text,
  ScrollView
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

const CategoryList = [
  {name:"Food" , url :SharedImages.bowl},
  {name:"Bags" , url :SharedImages.bag},
  {name:"Others" , url :SharedImages.other},
  {name:"Cars" , url :SharedImages.car},
 
]
class App extends Component {


  HeaderComponent = () =>{
    return(<>
      <LinearGradient
          colors={[ColorConstants.FIRST, ColorConstants.SECOND,]}
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
              return(<Category name = {item.name}  url = {item.url}/>)}}
          />
    </>)
  }

  render() {
    return (
      <View styles={styles.container}>
      <Header doMyShootIconEnables = {true} title={'DoMyShoot'} rightIcon = {true} icon = {SharedIcons.profile}/>
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
