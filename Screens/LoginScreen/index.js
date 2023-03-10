import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    TouchableOpacity,
    TextInput,
    Platform,
    KeyboardAvoidingView,
    ScrollView,
    BackHandler,
    Dimensions,
    ToastAndroid,
    PermissionsAndroid
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import SmsAndroid from 'react-native-get-sms-android';
import DeviceInfo from 'react-native-device-info';
import { NetworkInfo } from 'react-native-network-info';

// --------------- Component Imports ---------------------
import { COLORS, FONTS } from '../../Constants/Constants';
import Statusbar from '../../Components/StatusBar';
import AllowModal from '../../Components/AllowModal';
import ToastModal from '../../Components/ToastModal';
import { api } from '../../Services/Api';

// --------------- Image Imports ---------------------
import Resend from '../../assets/Images/resend.svg'
import Logo from '../../assets/Images/svadhan.svg';

const { height, width } = Dimensions.get('screen');

const LoginScreen = ({ navigation }) => {

    const { t } = useTranslation();
    const isDarkMode = true;
    const scrollViewRef = useRef();
    const Screen ="LoginScreen";

    const [OtpValue, setOtpValue] = useState('')
    const [PhoneNum, setPhoneNum] = useState(null)
    const [lang, setLang] = useState('')
    const [timerCount, setTimer] = useState(30)
    
    const [ModalVisible, setModalVisible] = useState(false)
    const [ModalVisible1, setModalVisible1] = useState(false)
    const [otp, setOtp] = useState(false)
    const [IsOtp1, setIsOtp1] = useState(false)
    const [button, setButton] = useState(true)
    const [status, setStatus] = useState(false)
    const [ExitStatus,setExitStatus] = useState(false)
    const [exitApp, setExitApp] = useState(0);

    // --------------Device Configuration Start----------
    const [ipAdrress, setIPAddress] = useState();
    const [DeviceId, setDeviceId] = useState();
    const [permissions, setPermissions] = useState(false)
    const [condirmDate, setConfirmDate] = useState()
    const [fetOtp, setOtpFetch] = useState(false)
    const [otpMessage, setOtpMessage] = useState()
    const [message, setMessage] = useState()
    const [ModalVisibleError, setModalVisibleError] = useState(false)
    const [maxError, setMaxError] = useState(false)
    // --------------Device Configuration End----------

    useEffect(() => {

        getData()
        // Get IPV4 Address Start ------------------------
        NetworkInfo.getIPV4Address().then(ipv4Address => {
            console.log(ipv4Address);
            setIPAddress(ipv4Address)
        });
        // Get IPV4 Address End --------------------------

        // Get DeviceInfo start-----------------------
        DeviceInfo.getUniqueId().then((uniqueId) => {
            setDeviceId(uniqueId)
        });
        // Get DeviceInfo End ------------------------

    }, [])

    useEffect(() => {
        if (permissions && fetOtp) {
            const interval = setInterval(() => {
                callMessage()
            }, 3000);
            return () => clearInterval(interval);
        }
        // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [permissions, fetOtp])

    useEffect(() => {
        if (!OtpValue) {
            setOtp(false)
        }
    }, [OtpValue])

    useEffect(() => {
        setMaxError(false)
    }, [])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setButton(true)
        });
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        if (IsOtp1 && timerCount > 0) {
            setTimeout(() => setTimer(timerCount - 1), 1000);
        } else {
            setStatus(false)
        }
    }, [timerCount, IsOtp1]);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );
        return () => backHandler.remove();
    }, []);

    const getData = async () => {
        try {
            const lang = await AsyncStorage.getItem('user-language')
            setLang(lang)
            console.log("language", lang)
        } catch (e) {
            console.log(e)
        }
    }
    const backAction = () => {
        if (!ExitStatus) {
            if(IsOtp1){
                setExitApp(0); 
                setButton(false)
                setPhoneNum(null)
                setIsOtp1(false)
                setMaxError(false) 
            }else{
                if (exitApp === 0) {
                    setButton(false)
                    setPhoneNum(null)
                    setIsOtp1(false)
                    setMaxError(false)
                    setExitApp(exitApp + 1);
                    ToastAndroid.show("Press back again to exit.", ToastAndroid.SHORT);
                }
                else if (exitApp === 1) {
                    BackHandler.exitApp();
                }
            }   
            setTimeout(() => {
                setExitApp(0)
            }, 3000);
            return false;
        }
    };
  
    const verifyPhone = (Phone) => {
        var reg = /^([0-9])\1{9}$/;
        return reg.test(Phone);
    }

    const GETOTP_Validation = () => {
        const firstDigitStr = String(PhoneNum)[0];
        if (PhoneNum?.length != 10 || PhoneNum == "") {
            setModalVisible1(true)
        } else if (firstDigitStr === '1' || firstDigitStr === '2' || firstDigitStr === '3' || firstDigitStr === '4' || firstDigitStr === '5' || firstDigitStr === '0') {
            setModalVisible1(true)
        } else if (verifyPhone(PhoneNum)) {
            setModalVisible1(true)
        } else if (!(/^\d{10}$/.test(PhoneNum))) {
            setModalVisible1(true)
        }
        else {
            LoginApiCall()
        }
    }

    const getOtp = () => {
        //bug fixing privacy policy and tc back navigation
        if (IsOtp1 && timerCount === 0) {
            setTimeout(() => {
                setIsOtp1(true)
                setStatus(true)
                setTimer(30)
            }, 1000)
            setButton(false)
            setIsOtp1(true)
            setStatus(true)
            setTimer(30)
        } else {
            setTimeout(() => {
                setIsOtp1(true)
                setStatus(true)
            }, 1000)
            setButton(false)
            setIsOtp1(true)
            setStatus(true)
        }
    }

    const CountDownResend = () => {
        setTimer(30)
        setStatus(true)
        setIsOtp1(true)
    }

    const OnchangeNumber = (num) => {
        if (/^[^!-\/:-@\.,[-`{-~ ]+$/.test(num) || num === '') {
            setPhoneNum(num)
            setButton(true)
        } else {
            setModalVisible1(true)
            console.log("restricted values", num, PhoneNum)
        }
    }

    // ------------------ Login Api Call Start ------------------
    async function LoginApiCall() {
        setConfirmDate(new Date().getTime())
        const data = {
            deviceId: DeviceId,
            geoLocation: {
                latitude: "10.0302",//Todo
                longitude: "76.33553"//Todo
            },
            mobile: '+91' + PhoneNum,
            deviceIpAddress: ipAdrress,
            simId: "11111",
        }
        await api.getLoginOtp(data).then((res) => {
            console.log('-------------------res', res?.status)
            if (res?.status == 200) {
                setMaxError(false)
                requestPermission()
                setOtpFetch(true)
                setIsOtp1(true)
                getOtp();
                setTimer(30)
            }
        }).catch((err) => {
            console.log("err->", err?.response)
            if (err?.message !== 'Network Error') {
                if (err?.response?.data?.message === 'the device ID is already existing in the DB.') {
                    setModalVisibleError(true)
                    setMaxError(false)
                    setMessage('This Mobile is already registered with us.')
                } else if (err?.response?.data?.message === 'Maximum number of OTPs are exceeded. Please try after 30 minutes.') {
                    setOtpFetch(false)
                    setIsOtp1(true)
                    setStatus(false)
                    setMaxError(true)
                } else {
                    setMaxError(false)
                }

            }
        })
    }
    // ------------------ Login Api Call End ------------------

    const requestPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_SMS,
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                setPermissions(true)
                AsyncStorage.setItem('PermissionMessage', true);
            } else {
                setPermissions(false)
                AsyncStorage.setItem('PermissionMessage', false);
            }
        } catch (err) {
            console.warn(err);
        }
    };

    // -------------------------------- Fetch Message From device Start -------------------------------------------
    const callMessage = () => {
        var filter = {
            box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all
            minDate: condirmDate, // timestamp (in milliseconds since UNIX epoch)
            maxDate: new Date().getTime(),
            sp_id: 3001,
        };
        SmsAndroid.list(
            JSON.stringify(filter),
            (fail) => {
                console.log('Failed with this error: ' + fail);
            },
            (count, smsList) => {
                console.log('Count: ', count);
                console.log('List: ', smsList);
                var arr = JSON.parse(smsList);

                arr.forEach(function (object) {
                    console.log('Object: ' + object);
                    console.log('--> sms date' + object.date);
                    console.log('--> sms body' + object.body);

                    if (object.body.includes('One Time Password')) {
                       
                        let match = object.body.match(/\b\d{4}\b/)
                        setOtpFetch(false)
                        if (match) {
                            setOtpFetch(false)
                            setOtpMessage(match[0])
                            console.log("otpmessage.....", otpMessage, match[0])
                            console.log("match exist", match)
                            if(Screen === "LoginScreen"){
                                setModalVisible(true)
                            }
                        }
                    }

                });
            },
        );
    };
    // -------------------------------- Fetch Message From device End -------------------------------------------

    // ------------------ Confirm Otp Api Call Start ------------------
    async function ConfirmOtp(otp) {
        const data = {
            otp: otp,
            mobNumber: '+91' + PhoneNum,
        }
        await api.confirmLoginOtp(data).then((res) => {
            console.log('-------------------res', res)
            if (res?.data?.status) {
                setMaxError(false)
                AsyncStorage.setItem('Mobile', '91' + PhoneNum);
                console.log("succuss", res?.data?.customerId)
                AsyncStorage.setItem('CustomerId', JSON.stringify(res?.data?.customerId));
                AsyncStorage.setItem('Token', 'dXNlckBleGFtcGxlLmNvbTpzZWNyZXQ=');
                isGrantedPermissions()
                setOtpFetch(false)
            } else {
                console.log(res?.data)
            }
        }).catch((err) => {
            console.log("err->", err?.response)
            if (err?.response?.data?.message === 'You entered wrong OTP') {
                setOtp(true)
            }
        })
    }
    // ------------------ Confirm Otp Api Call End ------------------

    // ----------------------------------- Permission Check Start ----------------------------------------------
    const isGrantedPermissions = async () => {
        const camera = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA)
        const Location = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        if (camera && Location) {
            const Pin = await AsyncStorage.getItem('Pin')
            const PinDate = await AsyncStorage.getItem('PinDate')
            setOtpValue('')
            if (Pin && PinDate) {

                navigation.navigate('PinScreen')
            } else {
                navigation.navigate('CreatePin')
            }
        } else {
            navigation.navigate('Permission')
        }
    };
    // ------------------------------------ Permission Check End --------------------------------------------------

    // ------------------ Resend Api Call Start ------------------
    async function ResendApiCall() {
        setConfirmDate(new Date().getTime())
        const data = {
            deviceId: DeviceId,
            geoLocation: {
                latitude: "10.0302",//Todo
                longitude: "76.33553"//Todo
            },
            mobile: '+91' + PhoneNum,
            deviceIpAddress: ipAdrress,
            simId: "11111",
        }
        await api.resendLoginOtp(data).then((res) => {
            if (res?.data?.status) {
                console.log('response Login Api', res.data)
                CountDownResend()
                setOtpFetch(true)
                setMaxError(false)
            } else {
                console.log(res?.data)
            }
        }).catch((err) => {
            console.log("err->", err.response)
            if (err?.response?.data?.message) {
                setMaxError(true)
            }
        })
    }
    // ------------------ Resend Api Call End ----------------------

    return (
        <>
            <SafeAreaProvider style={{ backgroundColor: COLORS.colorBackground }} >

                <ScrollView ref={scrollViewRef}
                    onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>

                    <KeyboardAvoidingView style={{ flex: 1 }}
                        {...(Platform.OS === 'ios' && { behavior: 'position' })}>

                        <SafeAreaView style={styles.container1} />
                        <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

                        <View style={{ marginBottom: IsOtp1 ? 0 : 0, marginTop: Dimensions.get('window').height * 0.2, alignItems: 'center', justifyContent: 'center', }}>
                            <Logo width={160} height={51} resizeMode='contain' />
                        </View>

                        <View style={[styles.container, { marginTop: Dimensions.get('window').height * 0.05 }]}>

                            <Text style={styles.Heading1} onPress={() => navigation.navigate('DetailsScreen2')}>{t('common:Verify')}</Text>

                            <View style={styles.ViewInput}>
                                <View style={{ justifyContent: 'center' }}>
                                    <Text style={styles.textNum}>+91</Text>
                                </View>
                                <View style={styles.Line} />
                                <TextInput
                                    style={[styles.TextInput, { fontSize: lang == 'en' ? 15 : 14, width: lang == 'en' ? 190 : 250, }]}
                                    placeholder={t('common:Placeholder')}
                                    placeholderTextColor="#808080"
                                    returnKeyType="done"
                                    maxLength={10}
                                    autoFocus={true}
                                    value={PhoneNum}
                                    onChangeText={(num) => OnchangeNumber(num)}
                                    keyboardType="numeric"
                                />
                            </View>

                            <TouchableOpacity style={[styles.Button, {
                                backgroundColor: button ? COLORS.colorB : "#ECEBED",
                                shadowColor: "#000000",
                                shadowOffset: { width: 0, height: 7 },
                                shadowOpacity: button ? 0. : 0,
                                elevation: button ? 5 : 0,
                                shadowRadius: button ? 1 : 0,
                            }]}
                                onPress={() => GETOTP_Validation()} disabled={button ? false : true}>
                                <Text style={[styles.text, { color: button ? COLORS.colorBackground : "#979C9E" }]}>{t('common:GetOTP')}</Text>

                            </TouchableOpacity>

                            {lang == "en" ?
                                <View style={styles.viewTerms}>
                                    <Text style={styles.textTerms2}>By continuing, I accept the </Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('Terms')}>
                                        <Text style={styles.textTerms1}>terms and conditions</Text>
                                        <View style={styles.ViewLine} />
                                    </TouchableOpacity>
                                </View> :
                                <View style={styles.viewTerms}>
                                    <Text style={styles.textTerms2}>തുടരുന്നതിലൂടെ,  </Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('Terms')}>
                                        <Text style={styles.textTerms1}>നിബന്ധനകളും വ്യവസ്ഥകളും</Text>
                                        <View style={styles.ViewLine} />
                                    </TouchableOpacity>
                                </View>}

                            {lang == "en" ?
                                <View style={styles.viewTerms}>
                                    <Text style={styles.textTerms2}>and </Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('Privacy')}>
                                        <Text style={styles.textTerms1}>privacy policy.</Text>
                                        <View style={[styles.ViewLine, { marginRight: 4 }]} />
                                    </TouchableOpacity>
                                </View> :
                                <View style={styles.viewTerms}>
                                    <TouchableOpacity onPress={() => navigation.navigate('Privacy')}>
                                        <Text style={styles.textTerms1}>സ്വകാര്യതാ നയവും</Text>
                                        <View style={styles.ViewLine} />
                                    </TouchableOpacity>
                                    <Text style={[styles.textTerms2, { paddingLeft: 5 }]}>ഞാൻ അംഗീകരിക്കുന്നു.</Text>
                                </View>}

                            {IsOtp1 ?
                                <View style={styles.ViewOtp}>
                                    <Text style={styles.textOtp} onPress={() => navigation.navigate('PreClosure')}>{t('common:EnterOtp')} </Text>
                                </View> : null}

                            {IsOtp1 ?
                                <OTPInputView
                                    style={[styles.OtpInput, {}]}
                                    pinCount={4}
                                    code={OtpValue}
                                    onCodeChanged={otp => {
                                        setOtpValue(otp)
                                        if (otp.length === 4) {
                                            ConfirmOtp(otp)
                                        }
                                    }}
                                    autoFocusOnLoad={false}
                                    codeInputFieldStyle={{ color: '#090A0A', borderRadius: 8, backgroundColor: '#FCFCFC', borderColor: !otp ? "lightgrey" : "red" }}
                                    placeholderTextColor="black"
                                    onCodeFilled={(code => {
                                        if (code) {
                                            setOtp(false)
                                        }
                                        else {
                                            setOtp(true)
                                        }
                                    })}
                                /> : null}
                            {otp ?
                                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 12, marginBottom: 5 }}>
                                    <Text style={{ color: "#EB5757", fontFamily: FONTS.FontRegular, fontSize: 12, textAlign: 'center' }}>{t('common:otpValid')}</Text>
                                </View> : null}

                            {IsOtp1 && status === true &&
                                <View style={{ marginTop: Dimensions.get('window').height * 0.03 }}>
                                    <Text style={styles.TextResend}>{t('common:Resend')} 00:{timerCount < 10 ? '0' : ''}{timerCount}</Text>
                                </View>
                            }
                            {maxError === true ?
                                <View style={{ marginTop: Dimensions.get('window').height * 0.03, }}>
                                    <Text style={{ color: "#EB5757", fontFamily: FONTS.FontRegular, fontSize: 12, textAlign: 'center', width: width * 0.8 }}>{t('common:Valid2')}</Text>
                                    <Text style={{ color: "#EB5757", fontFamily: FONTS.FontRegular, fontSize: 12, textAlign: 'center' }}>{t('common:Valid3')}</Text></View>
                                : IsOtp1 && timerCount === 0 ?
                                    <TouchableOpacity onPress={() => ResendApiCall()} style={{ padding: 18 }}>
                                        <View style={{ flexDirection: 'row', }}>
                                            <Resend style={{ width: 9, height: 11, top: 3, marginRight: 6, }} resizeMode="contain" />
                                            <TouchableOpacity>
                                                <Text style={styles.TextResend1} onPress={() => ResendApiCall()}>{t('common:Resend1')}</Text></TouchableOpacity>
                                        </View>
                                    </TouchableOpacity> : null}

                        </View>

                        <AllowModal ModalVisible={ModalVisible}
                            onPressOut={() => setModalVisible(!ModalVisible)}
                            setOtpValue={setOtpValue}
                            otpMessage={otpMessage}
                            setModalVisible={setModalVisible}
                            navigation={navigation}
                            ConfirmOtp={(data) => ConfirmOtp(data)}
                            setOtpFetch={setOtpFetch} />

                        <ToastModal
                            Validation={t('common:Valid')}
                            ModalVisible={ModalVisible1}
                            onPressOut={() => setModalVisible1(!ModalVisible1)}
                            setModalVisible={setModalVisible1}
                        />

                        <ToastModal
                            Validation={message}
                            ModalVisible={ModalVisibleError}
                            onPressOut={() => setModalVisibleError(!ModalVisibleError)}
                            setModalVisible={setModalVisibleError}
                        />

                    </KeyboardAvoidingView>

                </ScrollView>
            </SafeAreaProvider>
        </>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    container1: {
        flex: 0,
        backgroundColor: "#002B59",
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.colorBackground,
        padding: 20
    },
    ViewImage: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    Heading1: {
        fontFamily: FONTS.FontRegular,
        fontSize: 16,
        color: COLORS.colorDark,
        textAlign: 'center',
        fontWeight: '700'
    },
    textNum: {
        fontSize: 15,
        color: "#090A0A",
        paddingLeft: 16,
        width: 60,
    },
    ViewInput: {
        width: Dimensions.get('window').width * 0.85,
        height: 48,
        borderWidth: 1,
        marginTop: 19,
        borderRadius: 8,
        flexDirection: 'row',
        borderColor: COLORS.colorBorder,
        marginLeft: 3
    },
    TextInput: {
        paddingLeft: 21,
        fontSize: 15,
        color: COLORS.colorDark,
        fontWeight: '400',
        fontFamily: FONTS.FontRegular,
    },
    Line: {
        borderRightWidth: 1,
        borderColor: COLORS.colorBorder
    },
    ViewLine: {
        borderTopWidth: 1,
        borderStyle: 'dotted',
        borderColor: COLORS.colorB,
    },
    Button: {
        width: Dimensions.get('window').width * 0.86,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        borderRadius: 40,
        marginBottom: 21,
    },
    text: {
        fontSize: 14,
        fontFamily: FONTS.FontRegular,
        fontWeight: '700'
    },
    viewTerms: {
        flexDirection: 'row',
        marginTop: 0,
        height: 20
    },
    textTerms1: {
        color: COLORS.colorB,
        fontWeight: '700',
        fontSize: 12
    },
    textTerms2: {
        color: COLORS.colorBlack,
        fontFamily: FONTS.FontRegular,
        fontSize: 12,
        textAlign: 'center'
    },
    ViewOtp: {
        marginTop: Dimensions.get('window').height * 0.05,
        marginBottom: 13,
    },
    textOtp: {
        fontSize: 18,
        fontFamily: FONTS.FontSemiB,
        color: COLORS.colorDark,
        fontWeight: '700'
    },
    TextResend: {
        fontSize: 12,
        fontFamily: FONTS.FontMedium,
        color: '#3B3D43',
        fontWeight: '700'
    },
    OtpInput: {
        width: '75%',
        height: 50,
        fontSize: 25,
        borderRadius: 12,
        fontWeight: 'bold',
        color: "black",
    },
    TextResend1: {
        fontSize: 12,
        color: COLORS.colorB,
        fontFamily: FONTS.FontExtraBold,
        fontWeight: 'bold'
    },
});