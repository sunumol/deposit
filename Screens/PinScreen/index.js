import React, { useState, useEffect, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    StatusBar,
    Dimensions,
    BackHandler,
    ImageBackground,
    ToastAndroid
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import DeviceInfo from 'react-native-device-info';
import { NetworkInfo } from 'react-native-network-info';
import { useRoute } from '@react-navigation/native';
import { addDays } from 'date-fns'
import moment from 'moment'

import { COLORS, FONTS } from '../../Constants/Constants';
import Statusbar from '../../Components/StatusBar';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import PinModal from './Components/PinModal';

import Svadhan from '../../assets/image/AgentLogo.svg';

const { height, width } = Dimensions.get('screen');

const PinScreen = ({ navigation, }) => {

    const isDarkMode = true
    const routes = useRoute();
    const { t } = useTranslation();

    const [OtpValue, setOtpValue] = useState('')
    const [ModalVisible, setModalVisible] = useState(false)
    const [error, setError] = useState(false)
    const otpInput2 = React.createRef();
    const [exitApp, setExitApp] = useState(0);

    // --------------Device Configuration Start----------
    const [ipAdrress, setIPAddress] = useState();
    const [deviceId, setDeviceId] = useState();
    const [mobile, setMobile] = useState();
    const [custID, setCustId] = useState()
    const [invalidState, setInvalidState] = useState(1)
    // --------------Device Configuration End----------

    useEffect(() => {
        getData()
        NetworkInfo.getIPV4Address().then(ipv4Address => {
            console.log(ipv4Address);
            setIPAddress(ipv4Address)
        });
        // -------------- Get DeviceInfo start----------
        DeviceInfo.getUniqueId().then((uniqueId) => {
            setDeviceId(uniqueId)
        });
        // -------------- Get DeviceInfo End ----------
    }, [])

    const getData = async () => {
        try {
            const Phone = await AsyncStorage.getItem('Mobile')
            const id = await AsyncStorage.getItem('CustomerId')
            setMobile(Phone)
            setCustId(id)
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            handleGoBack,
        );
        return () => backHandler.remove();
    }, [exitApp]);

    const handleGoBack = () => {
        if (routes.name === "PinScreen") {
            if (exitApp === 0) {
                setExitApp(exitApp + 1);
                console.log("exit app elig", exitApp)
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

    const getPinCheck = async (code) => {
        try {
            const Pin = await AsyncStorage.getItem('Pin')
            // const PinExpiredDate = await AsyncStorage.getItem('ExpiredDate')
            const pinDate = await AsyncStorage.getItem('PinDate')
            const dateToday = new Date()
            const dateExpired = new Date(addDays(new Date(pinDate), 90))
            //  const dateExpired =new Date('2/2/2023')
            console.log('----', dateExpired, '-----', dateToday, pinDate,Pin)

            var Difference_In_Time = dateExpired.getTime() - dateToday.getTime()
            // To calculate the no. of days between two dates
            var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

            //To display the final no. of days (result)
            console.log("Total number of days between dates  <br>"
                + dateToday + "<br> and <br>"
                + dateExpired + " is: <br> "
                + Difference_In_Days);
            if (Difference_In_Days && Difference_In_Days > 0 && Difference_In_Days < 91) {
                if (Pin === code) {
                    navigation.navigate('Profile')
                } else {
                    setError(true)
                    setInvalidState(invalidState + 1)
                    if (invalidState === 4) {
                        invalidOtpApi()
                    }
                    console.log('invalidState', invalidState)
                }
            } else {
                setModalVisible(!ModalVisible)
            }

            if (Pin === code) {
                navigation.navigate('Profile')
            } else {
                setError(true)
                // clearText()
                setInvalidState(invalidState + 1)
                if (invalidState === 4) {
                    invalidOtpApi()
                }
                console.log('invalidState', invalidState)
            }
        } catch (e) {
            console.log(e)
        }
    }

    // ------------------ Resend Api Call Start ------------------
    async function forgotApiCall() {
        try {
            let headers = {
                'Content-Type': 'application/json',
            }
            let url = `http://3.108.93.231:8383/forgotPin`
            let body = {
                deviceId: deviceId,
                geoLocation: {
                    latitude: "10.0302",//Todo
                    longitude: "76.33553"//Todo
                },
                mobile: mobile,
                deviceIpAddress: ipAdrress,
                simId: "11111",
                "otpReason": "FORGOT_PIN"
            }
            const res = await axios.post(url, body, { headers });
            if (res?.data?.status) {
                console.log('response Login Api', res.data)
                navigation.navigate('ForgotPin', { conFirmdate: new Date().getTime() })
            } else {
                console.log(res?.data)
            }

        } catch (err) {
            console.log("err->", err.response)
        }
    }
    // ------------------ Login Api Call End ------------------

    // ------------------ After 3 Err Api Call Start------------------
    async function invalidOtpApi() {
        try {
            let headers = {
                'Content-Type': 'application/json',
            }
            const data = {
                id: custID,
            }
            let url = `http://3.108.93.231:8383/notifyCustomerForWrongPin/${data.id}`

            const res = await axios.get(url, { headers });
            if (res?.data?.status) {
                console.log('response Login Api', res.data)
                setInvalidState(1)

            } else {
                console.log(res?.data)
            }
        } catch (err) {
            console.log("err->", err.response)
        }
    }
    // ------------------ After 3 Err Api Call End ------------------

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container1} />
            <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

            <View style={styles.ViewContent}>
                <ImageBackground source={require('./Images/bg.png')}
                    style={styles.Linear}>

                    <Svadhan width={350} height={80} resizeMode='contain' style={{ top: -10 }} />

                    <Text style={styles.Text1}>{t('common:Hi')}, Athira Anil</Text>
                </ImageBackground>

                <View style={styles.ViewPin}>
                    <Text style={styles.PinTEXT} onPress={() => setModalVisible(true)}>{t('common:PleaseEnterPIN')}</Text>

                    <OTPInputView
                        ref={otpInput2}
                        style={[styles.OtpInput, {}]}
                        pinCount={4}
                        code={OtpValue}
                        onCodeChanged={otp => setOtpValue(otp)}
                        autoFocusOnLoad={false}
                        codeInputFieldStyle={{ color: '#090A0A', borderRadius: 8, backgroundColor: '#FFFFF', }}
                        placeholderTextColor="black"
                        onCodeFilled={(code => {
                            if (code.length === 4) {
                                getPinCheck(code)
                            }
                        })}
                    />

                    <Text style={styles.TextF} onPress={forgotApiCall}>{t('common:ForgotPIN')}</Text>

                </View>
                {error
                    ? <View style={{ justifyContent: 'center' }}>
                        <Text style={styles.errrorText}>Invalid PIN</Text>
                    </View> : null}
            </View>

            <PinModal ModalVisible={ModalVisible}
                onPress={() => OnpressOut1()}
                onPressOut={() => setModalVisible(!ModalVisible)}
                setModalVisible={setModalVisible}
                navigation={navigation} />
        </SafeAreaProvider>
    )
}

export default PinScreen;

const styles = StyleSheet.create({
    container1: {
        flex: 0,
        backgroundColor: "#002B59",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    ViewContent: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: COLORS.colorBackground,
    },
    text: {
        fontWeight: '400',
        fontFamily: FONTS.FontRegular,
        fontSize: 14,
        marginTop: 21,
        marginLeft: 21,
        marginRight: 21,
        textAlign: 'justify',
        color: "#1A051D",
    },
    Head: {
        fontFamily: FONTS.FontExtraBold,
        fontSize: 18,
        fontWeight: '800',
        color: "#1A051D",
        paddingTop: 31
    },
    viewHead: {
        marginTop: Dimensions.get('window').height * 0.02,
        marginBottom: 0,
        marginLeft: 21
    },
    OtpInput: {
        width: '67%',
        height: 50,
        fontSize: 25,
        borderRadius: 12,
        fontWeight: 'bold',
        color: "black",
    },
    Linear: {
        width: width,
        height: width * 0.58,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    Text1: {
        fontFamily: FONTS.FontRegular,
        color: COLORS.colorBackground,
        fontSize: 24,
        paddingTop: width * 0.01
    },
    ViewPin: {
        shadowColor: '#000000',
        shadowOpacity: 1,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 20,
        elevation: 5,
        width: width * 0.90,
        height: width * 0.46,
        backgroundColor: COLORS.colorBackground,
        borderRadius: 15,
        alignItems: 'center',
        top: -30
    },
    PinTEXT: {
        color: '#1A051D',
        fontFamily: FONTS.FontRegular,
        paddingBottom: width * 0.04,
        ontSize: 14,
        paddingTop: width * 0.065
    },
    TextF: {
        color: '#1A051D',
        fontFamily: FONTS.FontRegular,
        fontSize: 14,
        paddingTop: width * 0.05
    },
    errrorText: {
        fontSize: 14,
        fontFamily: FONTS.FontRegular,
        fontWeight: '400',
        textAlign: 'center',
        color: '#EB5757',
        marginTop: 0
    }
})
