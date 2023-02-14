
import React, { useState, useEffect } from 'react';
import {
    View,
    Image,
    Dimensions,
    StyleSheet,
    Text,
    FlatList,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Pressable
} from 'react-native';

import { COLORS, FONTS } from '../../../Constants/Constants';
const { height, width } = Dimensions.get('screen');
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Selection = ({ navigation }) => {
    const LANGUAGES = [
        { code: 'en', label: 'English' },
        { code: 'ml', label: 'മലയാളം (Malayalam)' },

    ];
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
            {LANGUAGES.map(language => {
                const selectedLanguage = language.code === selectedLanguageCode;


                return (

                    <Pressable
                        key={language.code}
                        style={styles.buttonContainer}
                        disabled={selectedLanguage}
                        onPress={() => setLanguage(language.code)}
                    >


                        <View style={{
                            flexDirection: 'row', paddingLeft: width * 0.05, paddingTop: width * 0.05,
                            paddingRight: width * 0.05, alignItems: 'center', justifyContent: 'space-between'
                        }} >



                            <Text style={{ fontSize: 15, color: "#1A051D", fontFamily: FONTS.FontRegular, }}
                            //style={{ top:lang == 'ml' ? 10:-5 }}
                            >

                                {language.label}
                            </Text>
                            {selectedLanguage ?

                                <Icon name="check" color={COLORS.colorB} size={20}
                                    style={{ paddingLeft: 0, }} /> : null
                            }

                        </View>
                    </Pressable>

                );
            })}
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

export default Selection;