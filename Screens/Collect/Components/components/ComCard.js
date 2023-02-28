import React, { useState, useEffect, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    KeyboardAvoidingView,
    StatusBar,
    ScrollView,
    Dimensions,
    BackHandler
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS, FONTS } from '../../../../Constants/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/Feather';
import Image2 from '../../Images/ex2.svg';
const { height, width } = Dimensions.get('screen');
import Image1 from '../../Images/greenCash.svg';


const ComCard = ({ navigation }) => {
    const route = useRoute();




    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const lang = await AsyncStorage.getItem('user-language')
            setLang(lang)

        } catch (e) {
            console.log(e)
        }
    }


    return (
        <>

            <View style={styles.boxStyle}>

                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.Card1}>
                        <Image1 width={18} height={18} />
                    </View>

                    <View style={{ flexDirection: 'column', paddingLeft: width * 0.03 }}>
                        <Text style={styles.TextNum}>Total amount collected is</Text>
                        <Text style={styles.TextAmt}>₹33,000</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row',marginLeft:width*0.05,marginTop:width*0.022 }}>
                    <Image2 style={{top:3,right:5}} />
                    <Text style={[styles.TextNum,{color:COLORS.colorDark}]}>Please deposit amount in </Text>
                    <View style={styles.TimeCard}>
                    <Text style={styles.Time1}>05:58 hours</Text>
                    </View>
                </View>
            </View>



        </>
    )
}

export default ComCard;


const styles = StyleSheet.create({
    PlaceText: {
        fontFamily: FONTS.FontSemiB,
        fontSize: 12,
        color: COLORS.colorDark
    },
    Card1: {
        backgroundColor: 'rgba(39, 174, 96, 0.1)',
        width: 34,
        height: 34,
        borderRadius: 17,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft:width*0.02,
        marginTop:3
    },
    boxStyle: {
        backgroundColor: COLORS.colorBackground,
        borderColor: COLORS.colorBorder,
        borderRadius: 15,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        elevation: 7,
        padding: 10,
        marginTop: 15,
        borderWidth: 1,
        borderColor: COLORS.colorBorder,
        //flexDirection: 'row',
        width: width * 0.90,
        height: width * 0.28,
       // alignItems:'center',
        justifyContent:'center'
    },
    circleStyle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    circleText: {
        fontSize: 18,
        fontFamily: FONTS.FontSemiB,
        color: COLORS.colorBackground,
        fontWeight: '600',
    },
    circleText: {
        fontSize: 18,
        fontFamily: FONTS.FontSemiB,
        color: COLORS.colorBackground,
        fontWeight: '600',
    },
    nameText: {
        fontSize: 12,
        fontFamily: FONTS.FontBold,
        color: COLORS.colorDark,
        fontWeight: '600',
    },
    idText: {
        fontSize: 12,
        fontFamily: FONTS.FontRegular,
        color: COLORS.colorDark,
        paddingTop: 3,
        width: 110
    },
    numText: {
        fontSize: 12,
        fontFamily: FONTS.FontRegular,
        color: COLORS.colorDark,
        fontWeight: '400',
    },
    approveContainer: {
        width: 98,
        height: 35,
        borderRadius: 54,
        shadowColor: 'rgba(0, 0, 0, 0.12',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        elevation: 7,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.colorB
    },
    textApprove: {
        fontSize: 12,
        fontFamily: FONTS.FontSemiB,
        fontWeight: '600',
    },
    rejectContainer: {
        width: 98,
        height: 35,
        borderRadius: 54,
        backgroundColor: COLORS.colorLight,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    leadText: {
        fontSize: 11,
        fontFamily: FONTS.FontSemiB,
        fontWeight: '600',

    },
    leadContainer: {
        padding: 4,
        borderRadius: 3,
        marginTop: 2,
        maxWidth: 150
    },
    TextAmt: {
        color: 'rgba(39, 174, 96, 1)',
        fontFamily: FONTS.FontSemiB,
        fontSize: 16
    },
    TextNum: {
        color: 'rgba(128, 128, 128, 1)',
        fontSize: 12,
        fontFamily: FONTS.FontRegular
    },
    Time1:{
        color:'rgba(235, 87, 87, 1)',
        fontSize:12,
        fontFamily:FONTS.FontSemiB
    },
    TimeCard:{
        backgroundColor:'rgba(235, 87, 87, 0.1)',
        width:width*0.21,
        height:width*0.06,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:4,
    }



})