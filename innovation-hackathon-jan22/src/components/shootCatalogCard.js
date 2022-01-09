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
import { SharedIcons, SharedImages } from "../constants/sharedImages";
import { ColorConstants, FontFamily } from "../constants/baseConstant";
import { RFValue } from "react-native-responsive-fontsize";
const { width, height } = Dimensions.get("window");

const ShootCatalogCard = ({ name, url }) => {
  return (
    <>
      <TouchableOpacity
        onPress={() => {}}
        style={{
          backgroundColor:ColorConstants.WHITE,
          width: width / 2,
          height: 180,
          padding: 15,
          borderRadius: 6,
          paddingBottom: 50,
        }}
      >
        <Image
          source={url}
          //   source={{ uri: url }}
          style={{
            height: "100%",
            width: "100%",
            borderRadius: 6,
          }}
          resizeMode={"cover"}
        /> 
      
        <Image
            source={SharedIcons.morePhoto}
            style={{
              width: 16,
              height: 16,
              position: 'absolute',
              right: 20,
              top: 20
            }}
            resizeMode={'contain'}
          />
            <Image
          source={SharedIcons.selectIcon}
          style={{
            width: 16,
            position: 'absolute',
            height: 16,
            left: 20,
            top: 20
          }}
          resizeMode={'contain'}
        />
        <View style={{ flexDirection: "column" }}>
          <Text
            style={{
              fontFamily: FontFamily.OBJECTIVITY_REGULAR,
              fontWeight: "700",
              color: ColorConstants.BLACK,
              fontSize: RFValue(14, 667),
              top: 10,
              textAlignVertical: "center",
            }}>
            {"title"}
          </Text>
          <Text
            style={{
              fontFamily: FontFamily.OBJECTIVITY_REGULAR,
              fontWeight: "400",
              color: ColorConstants.TEXT_COLOR_GREY,
              fontSize: RFValue(11, 667),
              top: 15,
              textAlignVertical: "center",
            }}
          >
            {"subTitle"}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default ShootCatalogCard;
