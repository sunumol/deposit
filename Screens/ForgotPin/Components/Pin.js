import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    ActivityIndicator
} from 'react-native';
import { useTranslation } from 'react-i18next';
import SmsAndroid from 'react-native-get-sms-android';
import DeviceInfo from 'react-native-device-info';
import { NetworkInfo } from 'react-native-network-info';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OTPInputView from '@twotalltotems/react-native-otp-input'

// --------------- Component Import --------------------
import { api } from '../../../Services/Api';
import { COLORS } from '../../../Constants/Constants';
import AllowModal from '../../../Components/AllowModal';
import { FONTS } from '../../../Constants/Constants';
// import OTPInputView from '../../../Components/OTPInputView';
import ToastModal from '../../../Components/ToastModal';

// --------------- Image Import --------------------
import Resend from '../../../assets/Images/resend.svg'

const { height, width } = Dimensions.get('screen');

const ForgotPin = ({ navigation }) => {

    const { t } = useTranslation();
    const screenIsFocused = useIsFocused();
    const scrollViewRef = useRef();
    const otpInput2 = React.createRef();
    const inputText = React.createRef();

    const [OtpValue, setOtpValue] = useState('')
    const [ModalVisible, setModalVisible] = useState(false)
    const [ModalVisibleError, setModalVisibleError] = useState(false)
    const [message, setMessage] = useState()
    const [ModalVisible1, setModalVisible1] = useState(false)
    const [timerCount, setTimer] = useState(0)
    const [fetOtp, setOtpFetch] = useState(false)
    const [otpMessage, setOtpMessage] = useState()
    const [Otpwrong, setOtpwrong] = useState(false)
    const [PhoneNum, setPhoneNum] = useState(null)
    const [button, setButton] = useState(true)
    const [otpAvailable, setOtpAvailable] = useState(false)
    const [lang, setLang] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    // --------------Device Configuration Start----------
    const [ipAdrress, setIPAddress] = useState();
    const [deviceId, setDeviceId] = useState();
    const [isExpired, setIsExpired] = useState(false)
    const [conDate, setConDate] = useState()
    const [maxError, setMaxError] = useState(false)
    const [status, setStatus] = useState(true)
    const [phoneSet, setPhoneSet] = useState()
    // --------------Device Configuration End----------

    // --------------- getOtp Button Disable Start ------------
    const [getOtpDisable, setGetOtpDisable] = useState(false);
    const [selectedPhoneNum, setSelectedPhoneNum] = useState()
    // --------------- getOtp Button Disable End --------------

    String.prototype.replaceAt = function (index, replacement) {
        return this.substring(0, index) + replacement + this.substring(index + replacement.length);
    }
    useEffect(() => {
        getData();
        NetworkInfo.getIPV4Address().then(ipv4Address => {
            console.log(ipv4Address);
            setIPAddress(ipv4Address)
        });
        // -------------- Get DeviceInfo start----------
        DeviceInfo.getUniqueId().then((uniqueId) => {
            setDeviceId(uniqueId)
            console.log("deviceid 12345", uniqueId);
        });
        // -------------- Get DeviceInfo End ----------
    }, [])

    const getData = async () => {
        try {
            const phone = await AsyncStorage.getItem('Mobile')
            const lang = await AsyncStorage.getItem('user-language')
            setLang(lang)
            setPhoneSet(phone)
        } catch (e) {
            console.log(e)
        }
    }

    // ------------------ Confirm Otp Api Call Start ------------------
    async function ConfirmOtp(otp) {
        setIsExpired(false)
        setOtpwrong(false)

        const data = {
            otp: otp,
            mobNumber: '+91' + selectedPhoneNum,
        }
        await api.confirmLoginOtp(data).then((res) => {
            if (res?.data?.status) {
                console.log(res?.data)
                setStatus(false)
                navigation.navigate('ResetPin')
                setOtpFetch(false)
            } else {
                console.log(res?.data)
            }
        }).catch((err) => {
            console.log("err->", err?.response)
            if (err?.response?.data?.message === '“OTP has expired') {
                setIsExpired(true)
            } else if (err?.response?.data?.message === 'You entered wrong OTP') {
                setOtpwrong(true)
            }
        })
    }
    // ------------------ Confirm Otp Api Call End ------------------

    // ------------------ Resend Api Call Start ------------------
    async function ResendApiCall() {
        setIsExpired(false)
        setOtpValue('')
        setConDate(new Date().getTime())
        const data = {
            deviceId: deviceId,
            geoLocation: {
                latitude: "10.0302",//Todo
                longitude: "76.33553"//Todo
            },
            mobile: '+91' + selectedPhoneNum,
            deviceIpAddress: ipAdrress,
            simId: "11111",
        }
        await api.resendLoginOtp(data).then((res) => {
            if (res?.data?.status) {
                console.log('----date', res?.data)
                setStatus(true)
                setTimer(30)
                setOtpFetch(true)

            } else {
                console.log(res?.data)
            }
        }).catch((err) => {
            console.log("err->", err?.response)
            setStatus(false)
            if (err?.response?.data?.message.includes('Maximum number of OTPs are exceeded.')) {
                setErrorMessage(err?.response?.data?.message)
                setMaxError(true)
                setTimeout(() => {
                    setMaxError(false)
                }, 5000);
            }
        })
    }
    // ------------------ Resend Api Call End ----------------------

    useEffect(() => {
        if (timerCount > 0) {
            console.log("timer", timerCount)
            setTimeout(() => setTimer(timerCount - 1), 1000);
        } else {
            setStatus(false)

        }
    }, [timerCount]);

    useEffect(() => {
        if (fetOtp) {
            const interval = setInterval(() => {
                callMessage()
            }, 3000);
            return () => clearInterval(interval);
        }
        // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [fetOtp])

    const callMessage = () => {
        var filter = {
            box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all
            minDate: conDate, // timestamp (in milliseconds since UNIX epoch)
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
                    console.log('-->' + object.date);
                    console.log('-->' + object.body);

                    if (object.body.includes('One Time Password')) {
                        setOtpFetch(false)
                        console.log('-->' + object)
                        let match = object.body.match(/\b\d{4}\b/)

                        if (match) {
                            setOtpMessage(match[0])
                            setModalVisible(true)
                        }
                    }
                });
            },
        );
    };

    const GETOTP_Validation = () => {
        setMaxError(false)
        setOtpFetch(false)
        setOtpAvailable(false)
        setTimer(0)
        setSelectedPhoneNum()
        const firstDigitStr = String(PhoneNum)[0];
        if (PhoneNum?.length != 10 || PhoneNum == "") {
            setModalVisible1(true)
            setPhoneNum('')
            setButton(true)
        } else if (firstDigitStr === '1' || firstDigitStr === '2' || firstDigitStr === '3' || firstDigitStr === '4' || firstDigitStr === '5' || firstDigitStr === '0') {
            setModalVisible1(true)
            setPhoneNum('')
            setButton(true)
        } else if (verifyPhone(PhoneNum)) {
            setModalVisible1(true)
            setPhoneNum('')
            setButton(true)
        } else if (!(/^\d{10}$/.test(PhoneNum))) {
            setModalVisible1(true)
            setPhoneNum('')
            setButton(true)
        }
        else {
            if (phoneSet == '+91' + PhoneNum) {
                forgotApiCall()
                setButton(false)
            } else {
                setModalVisibleError(true)
                setPhoneNum('')
                setMessage('Please enter the registered phone number')
            }
        }
    }

    const verifyPhone = (Phone) => {
        var reg = /^([0-9])\1{9}$/;
        return reg.test(Phone);
    }


    // ------------------ Resend Api Call Start ------------------
    async function forgotApiCall() {
        const data = {
            deviceId: deviceId,
            geoLocation: {
                latitude: "10.0302",//Todo
                longitude: "76.33553"//Todo
            },
            mobile: '+91' + PhoneNum,
            deviceIpAddress: ipAdrress,
            simId: "11111",
            "otpReason": "FORGOT_PIN"
        }
        await api.getForgotOtp(data).then((res) => {
            if (res?.data?.status) {
                console.log('response Login Api', res?.data)
                setConDate(new Date().getTime())
                setOtpFetch(true)
                setMaxError(false)
                setOtpAvailable(true)
                setStatus(true)
                setTimer(30)
                // -----getOtp Button Disable Start-----
                setGetOtpDisable(true)
                setSelectedPhoneNum(PhoneNum)
                // -----getOtp Button Disable End-----

            } else {
                console.log(res?.data)
            }
        }).catch((err) => {
            console.log("err PRINT->", err?.response)
            if (err?.response?.data?.message.includes('Maximum number of OTPs are exceeded.')) {
                setMaxError(true)
                setOtpFetch(false)
                setStatus(false)
                setOtpAvailable(true)
                setErrorMessage(err?.response?.data?.message)
                setTimeout(() => {
                    setMaxError(false)
                }, 5000);
                // -----getOtp Button Disable Start-----
                setGetOtpDisable(true)
                setSelectedPhoneNum(PhoneNum)
                // -----getOtp Button Disable End-----
            }
            if (err?.response?.data?.message === 'the device ID is already existing in the DB.') {
                setModalVisibleError(true)
                setPhoneNum('')
                setButton(true)
                setMaxError(false)
                console.log("alert this")
                setMessage('Please enter the registered phone number')
            }
            if (err?.response?.data?.message === 'Sorry! We are unable to proceed further.') {
                setModalVisibleError(true)
                setButton(true)
                setPhoneNum('')
                setMaxError(false)
                setMessage('Sorry! We are unable to proceed further.')
            }
            if (err?.response?.data?.message === 'Please enter valid agent mobile number') {
                setModalVisible1(true)
                setButton(true)
                setPhoneNum('')
            }

        })
    }
    // ------------------ Login Api Call End ------------------

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setMaxError(false)
        });
        return unsubscribe;
    }, [navigation]);

    return (

        <>
            <ScrollView
                style={{ backgroundColor: COLORS.colorBackground }}
                keyboardShouldPersistTaps={'handled'}
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>

                <KeyboardAvoidingView style={{ flex: 1 }}
                    {...(Platform.OS === 'ios' && { behavior: 'position' })}>
                    <View style={{ paddingTop: height * 0.25, paddingHorizontal: 20 }}>
                        <View style={styles.enterTextView}>
                            <Text style={styles.enterText}>{t('common:EnterForgot')}</Text>
                        </View>

                        <View style={{ alignItems: 'center' }}>
                            <View style={styles.inputBoxView}>
                                <View style={{ justifyContent: 'center' }}>
                                    <Text style={styles.codeText}>+91</Text>
                                </View>
                                <View style={styles.Line} />
                                <View style={{ flex: 1 }}>
                                    <TextInput
                                        ref={inputText}
                                        editable={otpAvailable && status === true ? false : true}
                                        style={[styles.enterTextInputView, {
                                            borderBottomRightRadius: 8,
                                            borderTopRightRadius: 8,
                                            backgroundColor: otpAvailable && status === true ? '#ECEBED' : COLORS.colorBackground,
                                            color: otpAvailable && status === true ? '#808080' : COLORS.colorDark,
                                        }]}
                                        placeholder={t('common:Placeholder')}
                                        placeholderTextColor="#808080"
                                        returnKeyType="done"
                                        maxLength={10}
                                        autoFocus={true}
                                        value={PhoneNum}
                                        onChangeText={(num) => {
                                            setOtpAvailable(false)
                                            //setTimer(30)
                                            if (/^[^!-\/:-@\.,[-`{-~ ]+$/.test(num) || num === '') {
                                                setPhoneNum(num)
                                                setMaxError(false)
                                                setOtpValue('')
                                                setIsExpired(false)
                                                // --------------- getOtp Button Disable Start ------------
                                                if (selectedPhoneNum) {
                                                    if (selectedPhoneNum !== num) {
                                                        setGetOtpDisable(false)
                                                        setButton(true)
                                                        setOtpAvailable(false)
                                                    } else {
                                                        setGetOtpDisable(true)
                                                        setOtpAvailable(true)
                                                    }
                                                }
                                                // --------------- getOtp Button Disable End ------------

                                            } else {
                                                setModalVisible1(true)
                                                console.log("restricted values", num, PhoneNum)
                                            }
                                        }}
                                        keyboardType="numeric"
                                    />
                                </View>
                            </View>
                        </View>
                        {!getOtpDisable
                            ?
                            <TouchableOpacity style={[styles.Button, {
                                backgroundColor: button ? COLORS.colorB : "#ECEBED",
                                shadowColor: "#000000",
                                shadowOffset: { width: 0, height: 7 },
                                shadowOpacity: button ? 0. : 0,
                                elevation: button ? 5 : 0,
                                shadowRadius: button ? 1 : 0,
                                flexDirection: 'row'
                            }]}
                                onPress={() => GETOTP_Validation()} disabled={button ? false : true}>
                                <Text style={[styles.getOtpText, { color: button ? COLORS.colorBackground : "#979C9E", paddingRight: 10 }]}>{t('common:GetOTP')}</Text>
                            </TouchableOpacity>
                            : null}

                        {otpAvailable
                            ?
                            <>
                                <View style={styles.otpView}>

                                    <Text style={styles.enterOtpText} >{t('common:EnterOtp')}</Text>
                                </View>

                                <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 10 }}>
                                    <OTPInputView
                                        style={styles.OtpInput}
                                        pinCount={4}
                                        ref={otpInput2}
                                        value={OtpValue}
                                        autoFocus={true}
                                        autoCompleteType="off"
                                        onCodeChanged={otp => {
                                            setOtpValue(otp)
                                            if (otp.length === 4) {

                                            } else {
                                                setOtpwrong(false)
                                                setIsExpired(false)
                                            }
                                        }}
                                        code={OtpValue} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                                        autoFocusOnLoad={true}
                                        keyboardType="numeric"
                                        codeInputFieldStyle={[styles.inputOtpContainerStyle, { borderColor: !Otpwrong ? "lightgrey" : "red" }]}
                                        placeholderTextColor="black"
                                        onCodeFilled={(code => {
                                            setOtpValue(code)
                                            if (code.length === 4) {
                                                ConfirmOtp(code)
                                            } else {
                                                setOtpwrong(false)
                                                setIsExpired(false)
                                            }
                                        })}
                                    />
                                    {/* <OTPInputView
                                    autoFocus={true}
                                    ref={otpInput2}
                                    inputCount={4}
                                    inputCellLength={1}
                                    offTintColor={!Otpwrong ? "lightgrey" : "red"}
                                    tintColor={!Otpwrong ? "lightgrey" : "red"}
                                    textInputStyle={[styles.inputOtpContainerStyle, { borderColor: !Otpwrong ? "lightgrey" : "red" }]}
                                    keyboardType="numeric"
                                    containerStyle={{ marginTop: 7 }}
                                    handleTextChange={(code => {
                                        setOtpValue(code)
                                        if (code.length === 4) {
                                            ConfirmOtp(code)
                                        } else {
                                            setOtpwrong(false)
                                            setIsExpired(false)
                                        }

                                    })}
                                /> */}
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    {isExpired
                                        ? <View style={{ alignItems: 'center' }}>
                                            <Text style={styles.errrorText}>OTP has Expired</Text>
                                        </View>
                                        : null}

                                    {Otpwrong
                                        ? <Text style={[styles.successText, { color: COLORS.colorRed }]}>{t('common:otpValid')}</Text>
                                        : null}

                                    {maxError === true
                                        ? lang == "en" ?
                                            <View style={{ marginTop: Dimensions.get('window').height * 0.03, }}>
                                                <Text style={{ color: "#EB5757", fontFamily: FONTS.FontRegular, fontSize: 12, textAlign: 'center', width: width * 0.8 }}>{t('common:Valid2')}</Text>
                                                <Text style={{ color: "#EB5757", fontFamily: FONTS.FontRegular, fontSize: 12, textAlign: 'center' }}>Please try after {errorMessage.replace(/\D/g, '')} minutes</Text>
                                            </View>
                                            :
                                            <View style={{ marginTop: Dimensions.get('window').height * 0.03, }}>
                                                <Text style={{ color: "#EB5757", fontFamily: FONTS.FontRegular, fontSize: 12, textAlign: 'center', width: width * 0.8 }}>{t('common:Valid2')}</Text>
                                                <Text style={{ color: "#EB5757", fontFamily: FONTS.FontRegular, fontSize: 12, textAlign: 'center' }}>{errorMessage.replace(/\D/g, '')} {t('common:Valid3')}</Text>
                                            </View>
                                        : status === true
                                            ? <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: width * 0.07 }}>
                                                <Text style={styles.resendText}>{t('common:Resend')} 00:{timerCount < 10 ? '0' : ''}{timerCount}</Text>
                                            </View>
                                            :
                                            <TouchableOpacity onPress={() => ResendApiCall()} style={{ padding: 18 }}>
                                                <View style={{ flexDirection: 'row', }}>
                                                    <Resend style={{ width: 9, height: 11, top: 3, marginRight: 6, }} resizeMode="contain" />
                                                    <TouchableOpacity>
                                                        <Text style={styles.TextResend1} onPress={() => ResendApiCall()}>{t('common:Resend1')}</Text></TouchableOpacity>
                                                </View>
                                            </TouchableOpacity>
                                    }
                                </View>


                            </>
                            : null}


                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
            {screenIsFocused
                ? <AllowModal ModalVisible={ModalVisible}
                    onPressOut={() => setModalVisible(!ModalVisible)}
                    setOtpValue={setOtpValue}
                    otpMessage={otpMessage}
                    setModalVisible={setModalVisible}
                    navigation={navigation}
                    ConfirmOtp={(data) => {
                        setOtpValue(data)
                        ConfirmOtp(data)
                    }}
                    setOtpFetch={setOtpFetch}
                />
                : null}

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
                        <VersionModal
                            ModalVisible={ModalVisibleVer}
                            navigation={navigation}
                            onPressOut={() => setModalVisibleVer(!ModalVisibleVer)}
                            setModalVisible2={setModalVisibleVer} />

                        <UpdateModal
                            ModalVisible={ModalVisibleUp}
                            navigation={navigation}

                            onPressOut={() => setModalVisibleUp(!ModalVisibleUp)}
                            setModalVisible2={setModalVisibleUp} />
        </>
    )
}

export default ForgotPin;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.colorBackground,
        paddingHorizontal: 20,
        paddingTop: height * 0.2
    },
    enterTextView: {
        alignItems: 'center',
    },
    enterText: {
        fontFamily: FONTS.FontRegular,
        fontSize: 16,
        color: COLORS.colorDark,
        textAlign: 'center',
        fontWeight: '700'
    },
    inputBoxView: {
        borderWidth: 1,
        marginTop: 19,
        borderRadius: 8,
        flexDirection: 'row',
        borderColor: COLORS.colorBorder,
        width: '97%',
    },
    codeText: {
        fontSize: 15,
        color: "#090A0A",
        paddingLeft: 16,
        width: 60,
    },
    Line: {
        borderRightWidth: 1,
        borderColor: COLORS.colorBorder
    },
    enterTextInputView: {
        paddingLeft: 21,
        fontSize: 15,
        color: COLORS.colorDark,
        fontWeight: '400',
        fontFamily: FONTS.FontRegular,
    },
    Button: {
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        borderRadius: 40,
        marginBottom: 21,
    },
    getOtpText: {
        fontSize: 14,
        fontFamily: FONTS.FontRegular,
        fontWeight: '700'
    },
    otpView: {
        alignItems: 'center',
        paddingTop: height * 0.06,
    },
    enterOtpText: {
        color: '#333333',
        fontFamily: FONTS.FontBold,
        fontSize: 16
    },
    inputOtpContainerStyle: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ECEBED',
        color: '#090A0A',
        backgroundColor: '#FCFCFC',
        height: 48,
        width: 48,
        fontSize: 12,
        fontWeight: 'bold',
    },
    OtpInput: {
        width: '75%',
        height: 50,
        fontSize: 25,
        borderRadius: 12,
        fontWeight: 'bold',
        color: "black",
    },
    resendText: {
        color: '#333333',
        fontFamily: FONTS.FontRegular,
        fontSize: 12
    },
    TextResend1: {
        fontSize: 12,
        color: COLORS.colorB,
        fontFamily: FONTS.FontExtraBold,
        fontWeight: 'bold'
    },
    errrorText: {
        fontSize: 14,
        fontFamily: FONTS.FontRegular,
        fontWeight: '400',
        textAlign: 'center',
        color: '#EB5757',
        marginTop: 15
    },
    successText: {
        fontSize: 12,
        fontFamily: FONTS.FontRegular,
        textAlign: 'center',
        color: COLORS.colorGreen,
        marginTop: 15,
    }
})