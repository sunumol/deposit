import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { FONTS } from '../../../Constants/Constants';
const { height, width } = Dimensions.get('screen');
import OTPInputView from '@twotalltotems/react-native-otp-input';
import AllowModal from '../../../Components/AllowModal';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SmsAndroid from 'react-native-get-sms-android';
import axios from 'axios';
import DeviceInfo from 'react-native-device-info';
import { NetworkInfo } from 'react-native-network-info';
import { api } from '../../../Services/Api';
import Resend from '../../../assets/Images/resend.svg'
import { COLORS } from '../../../Constants/Constants';

const Pin = ({ navigation, conFirmDate }) => {

    const { t } = useTranslation();

    const [OtpValue, setOtpValue] = useState('')
    const [ModalVisible, setModalVisible] = useState(false)
    const [timerCount, setTimer] = useState(30)
    const [IsOtp2, setIsOtp2] = useState(true)
    const [otpStatus, setOtpStatus] = useState(true)
    const [lang, setLang] = useState('')

    const [fetOtp, setOtpFetch] = useState(false)
    const [otpMessage, setOtpMessage] = useState()
    const [Otpwrong, setOtpwrong] = useState(false)
    // --------------Device Configuration Start----------
    const [ipAdrress, setIPAddress] = useState();
    const [deviceId, setDeviceId] = useState();
    const [mobile, setMobile] = useState();
    const [isExpired, setIsExpired] = useState()
    const [conDate, setConDate] = useState()
    // --------------Device Configuration End----------

    String.prototype.replaceAt = function (index, replacement) {
        return this.substring(0, index) + replacement + this.substring(index + replacement.length);
    }
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
        setOtpFetch(true)
        // -------------- Get DeviceInfo End ----------
    }, [])

    const getData = async () => {
        try {
            const lang = await AsyncStorage.getItem('user-language')
            const Phone = await AsyncStorage.getItem('Mobile')
            setMobile(Phone)
            setLang(lang)

        } catch (e) {
            console.log(e)
        }
    }

    async function ConfirmOtp(otp) {

        try {
            let headers = {
                'Content-Type': 'application/json',
            }
            let url = `http://3.108.93.231:8383/confirm`
            let body = {
                otp: otp,
                mobNumber: mobile,
            }
            const res = await axios.post(url, body, { headers });
            if (res?.data?.status) {
                console.log(res?.data)
                navigation.navigate('ResetPin')
                setOtpFetch(false)

            } else {
                console.log(res?.data)
            }

        } catch (err) {
            console.log("err->", err?.response)

            if (err?.response?.data?.message === '“OTP has expired') {
                setIsExpired(true)
            } else if (err?.response?.data?.message === 'You entered wrong OTP') {
                setOtpwrong(true)
            }

            // if (err?.response?.data?.message === 'You entered wrong OTP')

        }
    }

    // ------------------ Resend Api Call Start ------------------
    async function ResendApiCall() {
        try {
            let headers = {
                'Content-Type': 'application/json',
            }
            let url = `http://3.108.93.231:8383/resendOtp`
            let body = {
                deviceId: deviceId,
                geoLocation: {
                    latitude: "10.0302",//Todo
                    longitude: "76.33553"//Todo
                },
                mobile: mobile,
                deviceIpAddress: ipAdrress,
                simId: "11111",
            }
            const res = await axios.post(url, body, { headers });
            if (res?.data?.status) {
                console.log('----date', res?.data)
                setConDate(new Date().getTime())
                setIsOtp2(true)
            } else {
                console.log(res?.data)
            }

        } catch (err) {
            console.log("err->", err.response)
            if (err?.response?.data?.message) {
                setMaxError(true)

            }
        }

    }

    useEffect(() => {
        if (IsOtp2 && timerCount > 0) {
            setTimeout(() => setTimer(timerCount - 1), 1000);
        } else {
            setIsOtp2(false)
        }
    }, [timerCount, IsOtp2]);

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
            minDate: conDate ? conDate : conFirmDate, // timestamp (in milliseconds since UNIX epoch)
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

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ paddingTop: width * 0.1, justifyContent: 'center', alignItems: 'center' }}>
                {lang == 'en'
                    ? <>
                        <Text style={styles.textTit}>Please enter OTP sent to</Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={[styles.textTit, { fontFamily: FONTS.FontBold }]}>{mobile?.replace(/^.{2}/g, '').replaceAt(2, "X").replaceAt(3, "X").replaceAt(4, "X").replaceAt(5, "X")} </Text>
                            <Text style={styles.textTit}>via SMS</Text>
                        </View>
                    </> : <>
                        <Text style={styles.textTit}>എസ്എംഎസ് വഴി  <Text style={[styles.textTit, { fontFamily: FONTS.FontBold }]}>{mobile?.replace(/^.{2}/g, '').replaceAt(2, "X").replaceAt(3, "X").replaceAt(4, "X").replaceAt(5, "X")} </Text>എന്ന</Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                            <Text style={styles.textTit}> നമ്പറിലേക്ക് അയച്ച OTP നൽകുക</Text>
                        </View>
                    </>}
                <View style={styles.View1}>
                    <Text style={styles.otptext} >{t('common:EnterOtp')}</Text>
                </View>
                <OTPInputView
                    style={[styles.OtpInput, {}]}
                    pinCount={4}
                    code={OtpValue}
                    onCodeChanged={otp => setOtpValue(otp)}
                    autoFocusOnLoad={false}
                    codeInputFieldStyle={{ color: '#090A0A', borderRadius: 8, backgroundColor: '#FFFFF', }}
                    placeholderTextColor="black"
                    onCodeFilled={(otp => {
                        setOtpValue(otp)
                        if (otp.length === 4) {
                            ConfirmOtp(otp)
                        }
                    })}
                />
                {IsOtp2
                    ? <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: width * 0.07 }}>
                        <Text style={styles.resendText}>{t('common:Resend')} 00:{timerCount < 10 ? '0' : ''}{timerCount}</Text>
                    </View> : <TouchableOpacity onPress={ResendApiCall} style={{ padding: 18 }}>
                        <View style={{ flexDirection: 'row', }}>
                            {/* <Icon name="reload1" size={20} style={{transform:lang == "en" ? [{ rotateY: '360deg' }] : [{ rotateX: '180deg' }]}} /> */}
                            <Resend style={{ width: 9, height: 11, top: 3, marginRight: 6, }} resizeMode="contain" />

                            <TouchableOpacity>
                                <Text style={styles.TextResend1}>{t('common:Resend1')}</Text></TouchableOpacity>
                        </View>
                    </TouchableOpacity>}



                {!otpStatus ?
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.errrorText}>{t('common:otpValid')}</Text>
                    </View> : null}
                {isExpired
                    ? <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.errrorText}>OTP has Expired</Text>
                    </View> : null}

                {Otpwrong ?
                    <Text style={[styles.successText, { color: COLORS.colorRed }]}>{t('common:otpValid')}</Text> : null}

            </View>
            <AllowModal ModalVisible={ModalVisible}
                onPressOut={() => setModalVisible(!ModalVisible)}
                setOtpValue={setOtpValue}
                otpMessage={otpMessage}
                setModalVisible={setModalVisible}
                navigation={navigation}
                ConfirmOtp={(data) => ConfirmOtp(data)} />
        </View>
    )
}

export default Pin;

const styles = StyleSheet.create({
    textTit: {
        color: '#333333',
        fontFamily: FONTS.FontRegular,
        fontSize: 14
    },
    View1: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: width * 0.07,
        paddingBottom: width * 0.03
    },
    resendText: {
        color: '#333333',
        fontFamily: FONTS.FontRegular,
        fontSize: 12
    },
    otptext: {
        color: '#333333',
        fontFamily: FONTS.FontBold,
        fontSize: 16
    },
    OtpInput: {
        width: '60%',
        height: 50,
        fontSize: 25,
        borderRadius: 12,
        fontWeight: 'bold',
        color: "black",
        //margin:5
    },
    errrorText: {
        fontSize: 14,
        fontFamily: FONTS.FontRegular,
        fontWeight: '400',
        textAlign: 'center',
        color: '#EB5757',
        marginTop: width * 0.06
    },
    TextResend1: {
        fontSize: 12,
        color: COLORS.colorB,
        fontFamily: FONTS.FontExtraBold,
        fontWeight: 'bold'
    },
    successText: {
        fontSize: 12,
        fontFamily: FONTS.FontRegular,
        textAlign: 'center',
        color: COLORS.colorGreen,
        marginTop: 30,

    }
})