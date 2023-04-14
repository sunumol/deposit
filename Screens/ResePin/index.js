import React, { useState,useCallback ,useEffect} from 'react';
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
    ToastAndroid
} from 'react-native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { addDays } from 'date-fns'
import moment from 'moment'
import { useRoute } from '@react-navigation/native';
// --------------- Component Imports ---------------------
import { COLORS, FONTS } from '../../Constants/Constants';
import Statusbar from '../../Components/StatusBar';
import Header from '../../Components/RepayHeader';
import OTPTextInput from './Components/OtpPin'

// --------------- Image Imports ---------------------
import Reset from './Images/Reset.svg'
import ModalExitApp from '../../Components/ModalExitApp';

const CreatePin = ({ navigation }) => {

    const isDarkMode = true;
    const { t } = useTranslation();
    const otpInput2 = React.createRef();
    const routes = useRoute();
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false)
    const [OtpValue, setOtpValue] = useState("")
    const [exitApp,setExitApp] = useState(0)
    const [modalExitAppVisible, setModalExitAppVisible] = useState(false);
    const clearText = () => {
        otpInput2.current.clear();
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
                {...(Platform.OS === 'ios' && { behavior: 'position' })}>

                <SafeAreaView style={styles.container1} />
                <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={"#002B59"} />

                <Header navigation={navigation} name={t('common:ResetPin')} onPress={backAction} />

                <View style={styles.container}>
                    <ScrollView>
                        <View style={{ alignItems: 'center', paddingTop: 41 }}>
                            <Reset />
                        </View>

                        <Text style={styles.textPin}>{t('common:EnterPin')}</Text>
                        <View style={{ alignItems: 'center' }}>

                            <OTPTextInput
                                confirm={t('common:ConfirmPIN')}
                                ref={otpInput2}
                                autoFocus={true}
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

                                    if (code) {
                                        setError(false)
                                    }
                                    if (code.slice(4).length === 4) {
                                        if (OtpValue.length === 4) {
                                            if (OtpValue !== code.slice(4)) {
                                                setError(true);
                                                clearText();
                                            } else {
                                                AsyncStorage.setItem('Pin', code.slice(4));
                                                 AsyncStorage.setItem('PinDate',new Date().toISOString());
                                                setSuccess(true)
                                                setTimeout(() => {

                                                    navigation.navigate('Profile');
                                                }, 2000)
                                            }
                                        }
                                    }
                                })} />

                        </View>

                        {error
                            ? <Text style={styles.errrorText}>{t('common:PinError')}</Text>
                            : null}

                        {success &&
                            <Text style={[styles.errrorText, { color: '#219653' }]}>PIN reset succesfully</Text>}

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