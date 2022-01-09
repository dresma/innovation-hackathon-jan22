import {
  Image,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Dimensions,
} from "react-native";
import React from "react";
import { SharedIcons,SharedImages } from "../constants/sharedImages";
import { ColorConstants, FontFamily } from "../constants/baseConstant";
import { RFValue } from "react-native-responsive-fontsize";
const { width, height } = Dimensions.get("window");

const Category = ({ 
  name,
  url,
  onPressCategory
}) => {
    return (
    <>
     <TouchableOpacity
        onPress={() => {
          onPressCategory(name)
        } }
        style={{
          width : width/2,
          height : 180,
          padding :15,
          borderRadius: 6,
          
        }}
      >
        <Image
          source={url}
        //   source={{ uri: url }}
          style={{
            height: '100%',
            width: '100%',
            borderRadius: 6
          }}
          resizeMode={'cover'}
        />
        <View style={{
            width: '100%',
            height: 30,
            position: 'absolute',
            left: 15,
            top: 135,
            borderRadius:6,
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:'rgba(11,11,11,0.6)'
            }}>
            <Text style={{
            fontFamily: FontFamily.OBJECTIVITY_MEDIUM,
            fontWeight: '500',
            color: ColorConstants.WHITE,
            fontSize: RFValue(12, 812),
            }}>{name}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default Category;
