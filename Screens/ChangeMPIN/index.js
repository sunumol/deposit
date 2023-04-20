import React, { useState, useEffect, useCallback } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalExitApp from '../../Components/ModalExitApp';
import { useFocusEffect } from '@react-navigation/native';
// --------------- Component Imports ---------------------
import { COLORS, FONTS } from '../../Constants/Constants';
import Statusbar from '../../Components/StatusBar';

import OTPTextInput from './Components/OtpPin'
import Header from '../../Components/RepayHeader';

// --------------- Image Imports ---------------------
import Reset from './Images/Reset.svg'

const ChangeMPIN = ({ navigation }) => {

    const isDarkMode = true;
    const { t } = useTranslation();
    const otpInput2 = React.createRef();

    const [OtpValue2, setOtpValue2] = useState("")
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorOldPin, setErrorOldPin] = useState(false);
    const [pinSet, setPinSet] = useState()
    const [modalExitAppVisible, setModalExitAppVisible] = useState(false);
    const clearText = () => {
        otpInput2.current.clear();
    }

    useEffect(() => {
        getPinCheck()
    }, [])

    const getPinCheck = async () => {
        try {
            const Pin = await AsyncStorage.getItem('Pin')
            console.log(Pin, '--------------')
            if (Pin) {
                setPinSet(Pin)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const backAction = () => {
        setModalExitAppVisible(true)
        return true;
    };

    useFocusEffect(
        React.useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);

            return () => {
                console.log("I am removed from stack")
                BackHandler.removeEventListener("hardwareBackPress", backAction);
            };
        }, [])
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
                        <View>
                            <OTPTextInput
                                ref={otpInput2}
                                Confirm1={"Enter New PIN"}
                                Confirm2={'Confirm New PIN'}
                                errorOld={errorOldPin}
                                autoFocus={true}
                                inputCount={12}
                                inputCellLength={1}
                                offTintColor={'#ECEBED'}
                                tintColor={'#ECEBED'}
                                textInputStyle={styles.imputContainerStyle}
                                keyboardType="numeric"
                                containerStyle={{ marginTop: 7 }}
                                handleTextChange={(code => {
                                    setOtpValue2(code.slice(4, 8))
                                    if (code) {
                                        setError(false)
                                        setErrorOldPin(false)
                                    }
                                    if (code.slice(0, 4).length === 4) {
                                        if (code.slice(0, 4) !== pinSet) {
                                            setErrorOldPin(true)
                                            clearText()
                                        }
                                    }
                                    if (code.slice(8).length === 4) {
                                        if (OtpValue2.length === 4) {
                                            if (OtpValue2 !== code.slice(8)) {
                                                setError(true)
                                                setSuccess(false)
                                                clearText()
                                            } else {
                                                AsyncStorage.setItem('Pin', code.slice(8));
                                                AsyncStorage.setItem('PinDate', new Date().toISOString());
                                                setError(false)
                                                setSuccess(true)
                                                Keyboard.dismiss()
                                            }
                                        }
                                    }
                                })} />

                        </View>
                        {success
                            ? <Text style={styles.successText}>{t('common:PINreset')}</Text>
                            : null}
                        {error
                            ? <Text style={[styles.successText, { color: COLORS.colorRed }]}>{t('common:PinError')}</Text>
                            : null}
                    </ScrollView>
                </View>


                <ModalExitApp
                    ModalVisible={modalExitAppVisible}
                    onPressOut={() => setModalExitAppVisible(!modalExitAppVisible)}
                    setModalExitAppVisible={setModalExitAppVisible}
                />
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
