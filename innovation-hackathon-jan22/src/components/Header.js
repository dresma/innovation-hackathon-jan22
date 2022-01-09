
import {
    Image,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Platform,
    Dimensions,
} from 'react-native';
import React from 'react';
import { SharedIcons } from '../constants/sharedImages';
import { ColorConstants,FontFamily } from '../constants/baseConstant';
import { RFValue } from 'react-native-responsive-fontsize';

const Header = ({
    doMyShootIconEnables,
    title,
    color,
    rightIcon,
    icon,
    backArrow,
    subTitle,
    handleSearch
}) =>{
    return (
        <View style={{
            // backgroundColor: color != null ? color : ColorConstants.APP_DULL_WHITE,
            backgroundColor:ColorConstants.WHITE,

            zIndex: 100,
            top: 0,
            left: 0,
            right: 0,
            bottom:0
        }}>
            <SafeAreaView >
            <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }
                }>
                {doMyShootIconEnables && 
                <View style={{
                    left: 20,
                    flexDirection: 'row',
                    height: 40,
                    width: 40,
                    paddingRight: 10,
                }}>
                    <Image style={
                        {
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'transparent',
                        }}
                        resizeMode={'contain'}
                        source={SharedIcons.DoMyShootIcon}
                    />
                </View>}

                {backArrow && <>
                    <TouchableOpacity style={{
                    left: 20,
                    flexDirection: 'row',
                    height: 40,
                    width: 40,
                    paddingRight: 10,
                }}>
                    <Image style={
                        {
                            width: '100%',
                            height: '100%',
                            color: ColorConstants.BLACK,
                        }}
                        resizeMode={'contain'}
                        source={SharedIcons.backArrow}
                    />
                </TouchableOpacity>
                
                </>}

                {title != null &&<>
                <View style = {{flexDirection:'column'}}>
                        <Text style={{
                            fontFamily: FontFamily.OBJECTIVITY_REGULAR,
                            fontWeight: '700',
                            color: ColorConstants.BLACK,
                            fontSize: RFValue(16, 667),
                            left: 20,
                            fontWeight: 'bold',
                            top: 2,
                            // textAlign: 'center',
                            textAlignVertical: 'center'
                        }}>{title}</Text>
                        {subTitle != null &&
                            <Text style={{
                                fontFamily: FontFamily.OBJECTIVITY_REGULAR,
                                fontWeight: '400',
                                color: ColorConstants.BLACK,
                                fontSize: RFValue(12, 667),
                                left: 20,
                                // fontWeight: 'bold',
                                top: 6,
                                // textAlign: 'center',
                                textAlignVertical: 'center'
                            }}>{subTitle}</Text>
                        }
                    </View>
                        </>
                    }
                    

                    {rightIcon == true &&
                            <TouchableOpacity style={{
                                flex:1,
                                width: 50,
                                // height: 50,
                                right:20,
                                alignItems: 'flex-end',
                                justifyContent: 'center'
                            }}
                                onPress={() => { console.log("icon pressed") }}>

                                <Image style={{
                                    width: 30,
                                    height: 30,
                                }}
                                    resizeMode={'contain'}
                                    source={icon}
                                />

                            </TouchableOpacity>
                        }
                </View>

            </SafeAreaView>

        </View>
    )
}

export default Header;
