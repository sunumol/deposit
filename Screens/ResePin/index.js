import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    Platform,
    StatusBar,
    TextInput,
    Image,
    Dimensions,
    KeyboardAvoidingView,
    ToastAndroid,
    BackHandler,
    ScrollView,
    Button,
    ActivityIndicator
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS, FONTS } from '../../Constants/Constants';
import Statusbar from '../../Components/StatusBar';
import Header2 from '../../Components/Header2';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Header from '../../Components/RepayHeader';
import Reset from './Images/Reset.svg'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import OTPTextInput from '../ResePin/Components/OtpPin'
const CreatePin = ({ navigation}) => {
    const routes = useRoute();
    const [OtpValue, setOtpValue] = useState("")
    const [OtpValue2, setOtpValue2] = useState("")
    const isDarkMode = true;
    const [lang, setLang] = useState('')
    const { t } = useTranslation();
    const [exitApp, setExitApp] = useState(0);
    const [focus1, setFocus1] = useState(true);
    const [error, setError] = useState(false);
    const [loader, setLoader] = useState(true);

    const otpInput2 = React.createRef();

    const clearText = () => {
        otpInput2.current.clear();
        console.log("hhhh")
    }

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            handleGoBack,
        );
        return () => backHandler.remove();
    }, [exitApp]);

    useEffect(() => {
        setTimeout(() => setLoader(false), 500);
    }, []);


    const handleGoBack = () => {
        if (routes.name === "ResetPin") {
            if (exitApp === 0) {
                setExitApp(exitApp + 1);
                console.log("exit app create pin", exitApp)
                ToastAndroid.show("Press back again to exit.", ToastAndroid.SHORT);
            } else if (exitApp === 1) {
                BackHandler.exitApp();
                console.log("exit app else", exitApp)
            }
            setTimeout(() => {
                setExitApp(0)
            }, 3000);
            return true;
        }
    }

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
                       
                    <Text style={styles.textPin}>Enter PIN</Text>
                    <View style={{ alignItems: 'center' }}>
                        <OTPTextInput
                            confirm={t('common:ConfirmNewPin')}
                            ref={otpInput2}
                            autoFocus={focus1}
                            inputCount={8}
                            inputCellLength={1}
                            offTintColor={'#ECEBED'}
                            tintColor={'#ECEBED'}
                            textInputStyle={styles.imputContainerStyle}
                            keyboardType="numeric"
                            containerStyle={{ marginTop: 7 }}
                            handleTextChange={(code => {
                                console.log(code.slice(4, 7));
                                setOtpValue(code.slice(0, 4))
                                setOtpValue2(code.slice(4))

                                if (code) {
                                    setError(false)
                                }

                                if (code.slice(4).length === 4) {
                                    if (OtpValue.length === 4) {
                                        if (OtpValue !== code.slice(4)) {
                                            setError(true);
                                            clearText();
                                        } else {
                                            navigation.navigate('Profile');
                                        }
                                    }
                                }
                            })} />

                    </View>

                    {error
                        ? <Text style={styles.errrorText}>{t('common:PinError')}</Text>
                        : null}

                
                    </ScrollView>
                </View>


            </KeyboardAvoidingView>

        </SafeAreaProvider>
    )
}

export default CreatePin;

const styles = StyleSheet.create({
    container1: {
        flex: 0,
        backgroundColor: "#002B59",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
    },
    errrorText: {
        fontSize: 14,
        fontFamily: FONTS.FontRegular,
        fontWeight: '400',
        textAlign: 'center',
        color: '#EB5757',
        marginTop: 27
    }
})