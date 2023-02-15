import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    Platform,
    StatusBar,
    KeyboardAvoidingView,
    BackHandler,
    ScrollView,
    Keyboard
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS, FONTS } from '../../Constants/Constants';
import Statusbar from '../../Components/StatusBar';
import Header2 from '../../Components/Header2';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import OTPTextInput from './Components/OtpPin'
import Header from '../../Components/RepayHeader';
import Reset from './Images/Reset.svg'

const ChangeMPIN = ({ navigation }) => {
    const [OtpValue, setOtpValue] = useState("")
    const [OtpValue2, setOtpValue2] = useState("")
    const [OtpValue3, setOtpValue3] = useState("")
    const isDarkMode = true;
    const [lang, setLang] = useState('')
    const { t } = useTranslation();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const otpInput2 = React.createRef();

    const clearText = () => {
        otpInput2.current.clear();
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (OtpValue3.length == 4) {
            setSuccess(true)
          //  setError(false)
            Keyboard.dismiss()
        } else {
            //setError(true)
            setSuccess(false)
        }
    }, [OtpValue3])

    const getData = async () => {
        try {
            const lang = await AsyncStorage.getItem('user-language')
            setLang(lang)
        } catch (e) {
            console.log(e)
        }
    }

    const handleGoBack = useCallback(() => {
        navigation.goBack()
        return true; // Returning true from onBackPress denotes that we have handled the event
    }, [navigation]);

    useFocusEffect(
        React.useCallback(() => {
            BackHandler.addEventListener('hardwareBackPress', handleGoBack);

            return () =>
                BackHandler.removeEventListener('hardwareBackPress', handleGoBack);
        }, [handleGoBack]),
    );


    return (
        <SafeAreaProvider>

            <KeyboardAvoidingView style={{ flex: 1 }}
                {...(Platform.OS === 'ios' && { behavior: 'position' })}
            >
                <SafeAreaView style={styles.container1} />
                <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={"#002B59"} />

                <Header navigation={navigation} name={t('common:ResetPin')} />

                <View style={styles.container}>
                    <ScrollView>
                        <View style={{ alignItems: 'center', paddingTop: 41 }}>
                            <Reset />
                        </View>
                        <Text style={styles.textPin}>{t('common:EnterOPIN')}</Text>
                        <View style={{ alignItems: 'center' }}>
                            <OTPTextInput
                                ref={otpInput2}
                                Confirm1={"Enter new PIN"}
                                Confirm2={'Confirm new PIN'}
                                autoFocus={true}
                                inputCount={12}
                                inputCellLength={1}
                                offTintColor={'#ECEBED'}
                                tintColor={'#ECEBED'}
                                textInputStyle={styles.imputContainerStyle}
                                keyboardType="numeric"
                                containerStyle={{ marginTop: 7 }}
                                handleTextChange={(code => {
                                    setOtpValue(code.slice(0, 4))
                                    setOtpValue2(code.slice(4, 8))
                                    setOtpValue3(code.slice(8))

                                    // if (code) {
                                    //     setError(false)
                                    // }
    
                                    // if (code.slice(4).length === 4) {
                                    //     if (OtpValue2.length === 4) {
                                    //         if (OtpValue2 !== code.slice(4)) {
                                    //             setError(true);
                                    //             clearText();
                                    //         } else {
                                    //           setSuccess(true)
                                    //         }
                                    //     }
                                    // }
                                })} />

                        </View>
                        {/* {error
                        ? <Text style={styles.errrorText}>{t('common:PinError')}</Text>
                        : null} */}
                        {success
                            ? <Text style={styles.successText}>{t('common:PINreset')}</Text>
                            : null}
                    </ScrollView>
                </View>


            </KeyboardAvoidingView>

        </SafeAreaProvider>
    )
}

export default ChangeMPIN;

const styles = StyleSheet.create({
    container1: {
        flex: 0,
        backgroundColor: "#002B59",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    errrorText: {
        fontSize: 14,
        fontFamily: FONTS.FontRegular,
        fontWeight: '400',
        textAlign: 'center',
        color: '#EB5757',
        marginTop: 27
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.colorBackground,
    },
    ViewImage: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textPin: {
        marginTop: 48,
        fontSize: 16,
        fontFamily: FONTS.FontSemiB,
        color: COLORS.colorDark,
        textAlign: 'center'
    },

    imputContainerStyle: {
        borderRadius: 8,
        backgroundColor: COLORS.colorBackground,
        borderWidth: 1,
        borderColor: '#ECEBED',
        height: 48,
        width: 48,
        color: 'black',
        fontSize: 12,
        fontWeight: 'bold',
    },
    successText: {
        fontSize: 12,
        fontFamily: FONTS.FontMedium,
        textAlign: 'center',
        color: COLORS.colorGreen,
        marginTop: 30,
        letterSpacing: 0.64
    }
})