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
    Button,
    ActivityIndicator
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS, FONTS } from '../../Constants/Constants';
import Statusbar from '../../Components/StatusBar';
import Header2 from '../../Components/Header2';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import OTPTextInput from './Components/otpInput'
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
        if (routes.name === "CreatePin") {
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
            <SafeAreaView style={styles.container1} />
            <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={"#002B59"} />

            <Header2 navigation={navigation} name={lang == "en" ? "Create PIN" : "പിൻ സൃഷ്‌ടിക്കുക"} />

          <View style={styles.container}>
                    <Text style={styles.textPin}>{t('common:PleasePin')}</Text>
                    <View style={{ alignItems: 'center' }}>
                        <OTPTextInput
                            confirm={t('common:ConfirmPin')}
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

                </View>
            
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
        //    alignItems:'center',
        backgroundColor: COLORS.colorBackground,
    },
    ViewImage: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textPin: {
        marginTop: 48,
        fontSize: 14,
        fontFamily: FONTS.FontRegular,
        color: COLORS.colorDark,
        fontWeight: '400',
        textAlign: 'center'
    },
    OtpInput: {
        width: 230,
        height: 55,
        fontSize: 25,
        borderRadius: 8,
        fontWeight: 'bold',
        color: "black",
        marginTop: 7,
    },
    imputContainerStyle: {
        borderRadius: 8,
        borderRadius: 8,
        backgroundColor: '#FCFCFC',
        borderWidth: 1,
        borderColor: '#ECEBED',
        height: 48,
        width: 48,
        color: 'black',
        fontSize: 12,
        fontWeight: 'bold',
        // borderBottomWidth: 1,
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