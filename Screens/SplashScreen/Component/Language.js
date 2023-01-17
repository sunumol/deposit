import React, { useEffect, useState } from 'react';
import {
    Text, View, StatusBar, SafeAreaView, Pressable, I18nManager,
    StyleSheet, TouchableWithoutFeedback, Dimensions, ScrollView, TouchableOpacity
} from 'react-native';
import { FONTS, COLORS } from '../../../Constants/Constants';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Check from 'react-native-vector-icons/AntDesign';
import Uncheck from 'react-native-vector-icons/Entypo'
const { height, width } = Dimensions.get('screen');

const LANGUAGES = [

    { code: 'ml', label: 'Malayalam' },
    { code: 'en', label: 'English' },
];
const Language = ({ navigation }) => {
    const { t, i18n } = useTranslation();
    const selectedLanguageCode = i18n.language;
    const [lang, setLang] = useState('');

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const lang = await AsyncStorage.getItem('user-language')
            console.log(lang)
            setLang(lang)
        } catch (e) {
            console.log(e)
        }
    }

    const setLanguage = code => {
        console.log("code ....", code)
        return i18n.changeLanguage(code)

    };
    return (
        <View style={{ justifyContent: 'center' }}>
            <View style={{
                //alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
            }}>
                <View style={{alignItems:'center',justifyContent:'center'}}>
                    <View style={{
                        flexDirection: 'row', borderRadius: 25,
                        borderWidth: 1, borderColor: "#E0E0E0", justifyContent: 'space-between', alignItems: 'center',
                        width: width * 0.87, height: width * 0.12,
                        marginBottom:10,
                    }}>
                        {LANGUAGES.map(language => {
                            const selectedLanguage = language.code === selectedLanguageCode;


                            return (

                                <Pressable
                                    key={language.code}
                                    style={styles.buttonContainer}
                                    disabled={selectedLanguage}
                                    onPress={() => setLanguage(language.code)}
                                >


                                    <View style={{ flexDirection: 'row', paddingLeft: width * 0.05, paddingRight: width * 0.1, alignItems: 'center' }} >
                                        {selectedLanguage ?

                                            <Check name="checkcircle" color={"#258df5"} size={20}
                                                style={{ paddingLeft: width * 0.01, paddingRight: width * 0.01 }} /> :
                                            <Uncheck name="circle" size={20} color={"#258df5"}
                                                style={{ paddingLeft: width * 0.01, paddingRight: width * 0.01 }} />}


                                        <Text style={{ fontSize: 14, color: "black", fontFamily: FONTS.FontSemiB, left: 5 }}
                                        //style={{ top:lang == 'ml' ? 10:-5 }}
                                        >

                                            {language.label}
                                        </Text>
                                        {language.code == 'ml' ?
                                            <View style={{height:42,width:0.7,backgroundColor:"#E0E0E0",left:40}} /> : null}

                                    </View>
                                </Pressable>

                            );
                        })}
                    </View>
                </View>
                <View style={{alignItems:'center',justifyContent:'center'}}>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('IntroScreen')}
                >
                    <View style={{

                        width: width * 0.87,
                        height: 48,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: COLORS.colorB,
                        marginTop: 25,
                        borderRadius: 40,

                        bottom: 25,
                        shadowColor: COLORS.colorB,
                        shadowOffset: { width: 0, height: 7 },
                        shadowOpacity: 0.2,
                        elevation: 5,
                        shadowRadius: 1,
                    }}>
                        <Text style={{ fontSize: 14, fontFamily: FONTS.FontSemiB, color: "white" }}>{t('common:GetStart')}</Text>
                    </View>
                </TouchableWithoutFeedback>
</View>
            </View>

        </View>
    )
}



const styles = StyleSheet.create({
    Button2: {

        width: width * 0.87,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.colorB,
        marginTop: 25,
        borderRadius: 40,

        bottom: 10,
        shadowColor: COLORS.colorB,
        shadowOffset: { width: 0, height: 7 },
        shadowOpacity: 0.2,
        elevation: 5,
        shadowRadius: 1,
    },


})

export default Language;