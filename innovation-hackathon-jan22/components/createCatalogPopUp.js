import {
  Image,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  Modal,
  Animated,
  Easing,
  FlatList,
  Dimensions,
  ImageBackground
} from "react-native";
const { width, height } = Dimensions.get("window");

import React from "react";
import { SharedIcons, SharedImages } from "../constants/sharedImages";
import { FontFamily, ColorConstants } from "../constants/baseConstant";
import { RFValue } from "react-native-responsive-fontsize";

const CreateCatalog = ({
    catagoryList,
    selectedCategory,  
    handleCategoryChange,  
    onProductNameChange,
    handleCreateCatalog, 
    handleListModal, 
    modalVisiblity,
    producrNameErr,
    props
}) => {
    console.log("🚀 ~ file: createCatalogPopUp.js ~ line 32 ~ catagoryList", catagoryList)
  return (
    <>
    <ImageBackground source={require('../assets/background.png')} resizeMode="cover" style={{ flex: 1, justifyContent: "center", backgroundColor: 'rgba(52, 52, 52, 0.8)'}}>
      <View
        style={{
            top:height*0.2,
          //   position:'relative',
          left: width * 0.1,
          height: height * 0.4,
          width: "80%",
          borderRadius: 8,
          backgroundColor: ColorConstants.WHITE,
          borderWidth: 1,
          borderColor: ColorConstants.BORDER_COLOR_GREY_2,
          marginTop: 30,
          paddingVertical: 15,
          paddingHorizontal: 20,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              fontFamily: FontFamily.OBJECTIVITY_MEDIUM,
              fontWeight: "500",
              color: ColorConstants.BLACK,
              fontSize: RFValue(16, 716),
              marginTop: 10,
            }}
          >
            {"Create Catelog"}
          </Text>
          <TouchableOpacity
            onPress={() => {
                // console.log('navigationnavigation',props)
                props.navigation.navigate('Welcome')
            }}
            style={{
              width: 30,
              height: 30,
              right: -100,
            }}
          >
            <Image
              source={SharedIcons.cross}
              style={{
                height: "100%",
                width: "100%",
              }}
              resizeMode={"cover"}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{
            height: 55,
            width: "100%",
            borderRadius: 8,
            backgroundColor: ColorConstants.WHITE,
            borderWidth: 1,
            borderColor: ColorConstants.BORDER_COLOR_GREY_2,
            marginTop: 30,
            flexDirection: "row",
            paddingVertical: 15,
            paddingHorizontal: 20,
            alignItems: "center",
          }}
          onPress={()=>handleListModal()}
        >
          <View
            style={{
              flex: 1,
              height: 75,
              flexDirection: "column",
              justifyContent: "space-between",
              paddingVertical: 15,
            }}
          >
            <Text
              style={{
                fontFamily: FontFamily.OBJECTIVITY_MEDIUM,
                fontWeight: "500",
                color: ColorConstants.TEXT_COLOR_GREY,
                fontSize: RFValue(12, 812),
                marginTop: 3,
              }}
            >
              {"Product Category"}
            </Text>
            <Text
              style={{
                fontFamily: FontFamily.OBJECTIVITY_MEDIUM,
                fontWeight: "500",
                color: ColorConstants.APP_RED,
                fontSize: 16,
                marginTop: 3,
              }}
            >
              {selectedCategory}
            </Text>
            <View
              style={{
                position: "relative",
                right: -200,
                top: -25,
              }}
            >
              <Image
                source={SharedIcons.dropDown}
                style={{
                  height: 30,
                  width: 30,
                }}
                resizeMode={"cover"}
              />
            </View>
          </View>
        </TouchableOpacity>

        <Modal
          visible={modalVisiblity}
          onClosed={() => {}}
          transparent
          coverScreen={true}
        >
          <View
            style={[
              {
                left: width * 0.1,
                height: 160,
                width: "80%",
                bottom: height*0.45,
                alignItems: "center",
                justifyContent: "center",
              },
            ]}
          >
            <Animated.View
              style={[
                {
                  flexDirection: "column",
                  borderRadius: 14,
                  width: "100%",
                  height: "100%",
                  //   position: "absolute",
                  backgroundColor: "white",
                  alignItems: "center",
                  padding: 10,
                  justifyContent: "flex-start",
                },
                { transform: [{ translateX: new Animated.Value(0) }] },
                { bottom: new Animated.Value(-700) },
              ]}
            >
              <FlatList
                bounces={true}
                keyExtractor={(item, index) => JSON.stringify(item) + index}
                data={catagoryList}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onPress={() => {
                      handleCategoryChange(item)
                      }}
                    >
                      <Text
                        style={{
                          paddingBottom: 10,
                          fontFamily: FontFamily.OBJECTIVITY_MEDIUM,
                          fontWeight: "400",
                          color: ColorConstants.TEXT_COLOR,
                          fontSize: RFValue(15, 667),
                        }}
                      >
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </Animated.View>
          </View>
        </Modal>

        <View
          style={{
            height: 55,
            width: "100%",
            borderRadius: 8,
            backgroundColor: ColorConstants.WHITE,
            borderWidth: 1,
            borderBottomColor:ColorConstants.TEXT_COLOR_GREY,
            borderBottomEndRadius:1,
            borderBottomStartRadius:1,
            borderColor: ColorConstants.BORDER_COLOR_GREY_2,
            marginTop: 30,
            flexDirection: "row",
            paddingVertical: 15,
            paddingHorizontal: 20,
            alignItems: "center",
          }}
        >
          <View
            style={{
              flex: 1,
              height: 75,
              flexDirection: "column",
              justifyContent: "space-between",
              paddingVertical: 15,
            }}
          >
            <Text
              style={{
                fontFamily: FontFamily.OBJECTIVITY_MEDIUM,
                fontWeight: "500",
                color: ColorConstants.TEXT_COLOR_GREY,
                fontSize: RFValue(12, 812),
                marginTop: 3,
              }}
            >
              {"Catalog Name"}
            </Text>
            <TextInput
              style={{
                fontFamily: FontFamily.OBJECTIVITY_MEDIUM,
                fontWeight: "500",
                color: ColorConstants.BLACK,
                fontSize: 16,
                marginTop: 3,
              }}
              onChangeText={(text)=>{onProductNameChange(text)}}
              placeholder="Pls Enter Product Name"
            >
 
            </TextInput>
          </View>
        </View>
        <Text style ={{
                top:10,
                fontFamily: FontFamily.OBJECTIVITY_MEDIUM,
                color: ColorConstants.APP_RED,
                left:10
            }}>{producrNameErr}</Text>
        

        <TouchableOpacity
          style={{
            height: 55,
            width: "100%",
            borderRadius: 8,
            backgroundColor: ColorConstants.APP_PINK,
            borderWidth: 1,
            marginTop: 30,
            flexDirection: "row",
            paddingVertical: 15,
           alignContent:'center',
           justifyContent:'center'
          }} 
          onPress = {()=>handleCreateCatalog()}
          >
          
            <Text
              style={{
                fontFamily: FontFamily.OBJECTIVITY_MEDIUM,
                fontWeight: "500",
                color: ColorConstants.WHITE,
                fontSize: RFValue(16, 716),
                marginTop: 3,
              }}
            >
              {"Create Catelog"}
            </Text>
        </TouchableOpacity>
      </View>
      </ImageBackground>
    </>
  );
};

export default CreateCatalog;
