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
const { height, width } = Dimensions.get('screen');


const CustomDetails = ({ navigation }) => {
    const route = useRoute();



    const Data = [
        {
            id: 1,
            name: 'Aiswarya Thomas',
            place: 'CSEZ',
            phone: '987XXXXX22',
            Initial: 'AT',
            Amount: '₹14,724',
            color1: 'rgba(234, 64, 71, 1)',
            color: 'rgba(148, 166, 200, 1)'
        },
        {
            id: 2,
            name: 'Ashly James',
            place: 'Thrikkakara North',
            phone: '987XXXXX22',
            Initial: 'AJ',
            Amount: '₹8,000',
            color1: 'rgba(26, 5, 29, 1)',
            color: 'rgba(168, 200, 148, 1)'
        },
        {
            id: 3,
            name: 'Sismi Joseph',
            place: 'Edakkattuvayal',
            phone: '987XXXXX22',
            Initial: 'SJ',
            Amount: '₹5,000',
            color1: 'rgba(234, 64, 71, 1)',
            color: 'rgba(148, 200, 188, 1)'
        },
        {
            id: 4,
            name: 'Reshmi P',
            place: 'Kaippattur',
            phone: '987XXXXX22',
            Initial: 'RP',
            Amount: '₹10,500',
            color1: 'rgba(234, 64, 71, 1)',
            color: 'rgba(200, 148, 170, 1)'
        },

    ]

    const CGT = [
        {
            id: 1,
            name: 'Dayana James',
            place: 'Aimurikara',
            phone: '987XXXXX22',
            Initial: 'DJ',
            Amount: '₹10,000',
            color1: 'rgba(26, 5, 29, 1)',
            color: 'rgba(148, 166, 200, 1)'
        },
    ]
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

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ justifyContent: 'center', paddingBottom: 10 }}>

                    <View style={{ paddingLeft: width * 0.03, marginTop: width * 0.035 }}>
                        <Text style={styles.PlaceText}>Kakkanad (4)</Text>
                    </View>

                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        {Data.map((item) => {
                            return (
                                <TouchableOpacity
                                    style={styles.boxStyle} >
                                    <View style={{ flex: 1, flexDirection: 'row' }}>

                                        <View style={[styles.circleStyle, { backgroundColor: item.color }]}>
                                            <Text style={styles.circleText}>{item.Initial}</Text>
                                        </View>

                                        <View style={{ flexDirection: 'column', paddingLeft: 12, paddingTop: 5 }}>
                                            <Text style={styles.nameText}>{item.name}</Text>
                                            <View style={{ flexDirection: 'row', }}>
                                                <View style={{ paddingTop: 5, paddingRight: 1 }}>
                                                    <Icon1 name="location-outline" color={"black"} />
                                                </View>
                                                <Text style={[styles.idText, { paddingTop: 4 }]}>{item.place}</Text>
                                            </View>
                                        </View>

                                    </View>

                                    <View style={{ flexDirection: 'column', paddingTop: 5, alignItems: 'flex-end' }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Icon2 name="phone-call" color={"black"} size={11} style={{ top: 4 }} />
                                            <Text style={[styles.numText, { paddingLeft: 6 }]}>{item.phone}</Text>
                                        </View>


                                        <Text style={[styles.leadText, { color: item.color1 }]}>{item.Amount}</Text>


                                    </View>

                                </TouchableOpacity>
                            )
                        })}
                    </View>



                    <View style={{ paddingLeft: width * 0.03, marginTop: width * 0.055 }}>
                        <Text style={styles.PlaceText}>Palarivattom (1)</Text>
                    </View>

                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        {CGT.map((item) => {
                            return (
                                <TouchableOpacity
                                    style={styles.boxStyle} >
                                    <View style={{ flex: 1, flexDirection: 'row' }}>

                                        <View style={[styles.circleStyle, { backgroundColor: item.color }]}>
                                            <Text style={styles.circleText}>{item.Initial}</Text>
                                        </View>

                                        <View style={{ flexDirection: 'column', paddingLeft: 12, paddingTop: 5 }}>
                                            <Text style={styles.nameText}>{item.name}</Text>
                                            <View style={{ flexDirection: 'row', }}>
                                                <View style={{ paddingTop: 5, paddingRight: 1 }}>
                                                    <Icon1 name="location-outline" color={"black"} />
                                                </View>
                                                <Text style={[styles.idText, { paddingTop: 4 }]}>{item.place}</Text>
                                            </View>
                                        </View>

                                    </View>

                                    <View style={{ flexDirection: 'column', paddingTop: 5, alignItems: 'flex-end' }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Icon2 name="phone-call" color={"black"} size={11} style={{ top: 4 }} />
                                            <Text style={[styles.numText, { paddingLeft: 6 }]}>{item.phone}</Text>
                                        </View>


                                        <Text style={[styles.leadText, { color: item.color1 }]}>{item.Amount}</Text>


                                    </View>

                                </TouchableOpacity>
                            )
                        })}
                    </View>


                </View>
            </ScrollView>

        </>
    )
}

export default CustomDetails;


const styles = StyleSheet.create({
    PlaceText: {
        fontFamily: FONTS.FontSemiB,
        fontSize: 12,
        color: COLORS.colorDark
    },
    boxStyle: {
        backgroundColor: COLORS.colorBackground,
        borderColor: COLORS.colorBorder,
        borderRadius: 8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        elevation: 7,
        padding: 10,
        marginTop: 15,
        borderWidth: 1,
        borderColor: COLORS.colorBorder,
        flexDirection: 'row',
        width: width * 0.90,
        //alignItems:'center',
        //justifyContent:'center'
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



})