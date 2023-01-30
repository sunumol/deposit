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


const Activities = ({ navigation }) => {
    const route = useRoute();
    console.log("route name", route.name);
    const isDarkMode = true
    const { t } = useTranslation();
    const [lang, setLang] = useState('')

   

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
        <Text style={styles.textConfirm}>{t('common:Confirm')}</Text>
            
</View>
            </ScrollView>
            <View style={styles.ViewButton} >
                <TouchableOpacity style={styles.Button1} >
                    <Text style={styles.textConfirm}>{t('common:Confirm')}</Text>
                </TouchableOpacity>
            </View>
    
</>
    )
}

export default Activities;


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
        marginBottom: width * 0.03,
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
        marginBottom: width * 0.03
    },
    ViewButton: {
        alignItems:'flex-end',
        justifyContent:'flex-end',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        //top:0
    },
    Button1: {
        width: 80,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'rgba(0, 0, 0, 0.1)',
        marginTop: width * 0.04,
        marginLeft: 12,
        marginRight: 12,
        borderRadius: 40,
        marginBottom: 20,
        borderRadius:40
    },
    textConfirm: {
        color: COLORS.colorBackground,
        fontFamily: FONTS.FontBold,
        fontSize: 14,
        fontWeight: '700'
    },
})