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
import { COLORS, FONTS } from '../../../Constants/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
const { height, width } = Dimensions.get('screen');


const Cgt = ({ navigation }) => {
    const route = useRoute();
    console.log("route name", route.name);
    const isDarkMode = true
    const { t } = useTranslation();
    const [lang, setLang] = useState('')

    const Data = [
        {
            id: 1,
        },
        {
            id: 2,
        },
        {
            id: 3
        }
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
<ScrollView>
        <View style={{}}>

            <View style={styles.TextView}>
                <Text style={styles.text1}>By proceeding I confirm that I shall verify during CGT:</Text>
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                {Data.map((item) => {
                    return (
                        <View style={styles.viewCard}>

                            <View style={styles.ViewId}>
                                <Text style={styles.TextID}>{item.id}</Text>
                            </View>

                            {item.id === 1 ?
                                <View>
                                    <Text style={styles.textBold}>Customer’s <Text style={styles.textReg}>address in Aadhaar matches</Text></Text>
                                    <Text style={styles.textReg}>with their current residence address</Text>
                                </View> :
                                item.id === 2 ?
                                    <View>
                                        <Text style={styles.textReg}>No two <Text style={styles.textBold}>Trust Circle </Text>members stay in the</Text>
                                        <Text>same address</Text>
                                    </View> :
                                    <View>
                                        <Text style={styles.textReg}>KYC IDs of the<Text style={styles.textBold}> Customers and their</Text></Text>
                                        <Text style={styles.textBold}>Spouse <Text style={styles.textReg}>with original KYC IDs, for KYC</Text></Text>
                                        <Text style={styles.textReg}>unverified cases</Text>

                                    </View>}
                        </View>
                    )
                })}
            </View>
            </View>
            </ScrollView>
            <View style={styles.ViewButton} >
                <TouchableOpacity style={styles.Button1} onPress ={()=>navigation.navigate('CgtCustomer')}>
                    <Text style={styles.textConfirm}>{t('common:Confirm')}</Text>
                </TouchableOpacity>
            </View>
    
</>
    )
}

export default Cgt;


const styles = StyleSheet.create({
    text1: {
        fontFamily: FONTS.FontRegular,
        color: '#1A051D',
        fontSize: 12
    },
    textBold: {
        fontSize: 12,
        color: '#1A051D',
        fontFamily: FONTS.FontBold
    },
    textReg: {
        fontSize: 12,
        color: '#1A051D',
        fontFamily: FONTS.FontRegular
    },
    viewCard: {
        backgroundColor: COLORS.colorBackground,
        width: width * 0.92,
        borderRadius: 6,
        height: width * 0.22,
        marginBottom: width * 0.04,
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        elevation: 2,
        shadowRadius: 7,
    },
    ViewId: {
        backgroundColor: COLORS.colorB,
        width: 50,
        height: 50,
        marginRight: width * 0.05,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: width * 0.03
    },
    TextID: {
        fontSize: 14,
        color: COLORS.colorBackground,
        fontFamily: FONTS.FontBold
    },
    TextView: {
        paddingTop: width * 0.02,
        paddingLeft: width * 0.02,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginBottom: width * 0.05 
    },
    ViewButton: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        //top:0
    },
    Button1: {
        width: width * 0.87,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.colorB,
        marginTop: width * 0.04,
        marginLeft: 12,
        marginRight: 12,
        borderRadius: 40,
        marginBottom: 20
    },
    textConfirm: {
        color: COLORS.colorBackground,
        fontFamily: FONTS.FontBold,
        fontSize: 14,
        fontWeight: '700'
    },
})