import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    AppState
} from 'react-native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SmsAndroid from 'react-native-get-sms-android';
import DeviceInfo from 'react-native-device-info';
import { NetworkInfo } from 'react-native-network-info';
import { useIsFocused } from '@react-navigation/native';
import Clipboard from "@react-native-community/clipboard";

// --------------- Component Import --------------------
import { api } from '../../../Services/Api';
import { COLORS } from '../../../Constants/Constants';
import AllowModal from '../../../Components/AllowModal';
import { FONTS } from '../../../Constants/Constants';
import OTPInputView from '../../../Components/OTPInputView';

// --------------- Image Import --------------------
import Resend from '../../../assets/Images/resend.svg'

const { height, width } = Dimensions.get('screen');

const Pin = ({ navigation, conFirmDate }) => {


    const { t } = useTranslation();
    const screenIsFocused = useIsFocused();
    const otpInput2 = React.createRef();

    const [OtpValue, setOtpValue] = useState('')
    const [ModalVisible, setModalVisible] = useState(false)
    const [timerCount, setTimer] = useState(30)
    const [lang, setLang] = useState('')
    const [fetOtp, setOtpFetch] = useState(false)
    const [otpMessage, setOtpMessage] = useState()
    const [Otpwrong, setOtpwrong] = useState(false)

    // --------------Device Configuration Start----------
    const [ipAdrress, setIPAddress] = useState();
    const [deviceId, setDeviceId] = useState();
    const [mobile, setMobile] = useState();
    const [isExpired, setIsExpired] = useState(false)
    const [conDate, setConDate] = useState(new Date().getTime())
    const [maxError, setMaxError] = useState(false)
    const [status, setStatus] = useState(true)
    // --------------Device Configuration End----------

    String.prototype.replaceAt = function (index, replacement) {
        return this.substring(0, index) + replacement + this.substring(index + replacement.length);
    }

    useEffect(() => {
        AppState.addEventListener("change", handleAppStateChange);
        return () => {
          AppState.removeEventListener("change", handleAppStateChange);
        };
      }, []);
    
      const handleAppStateChange = (nextAppState) => {
    
        
        if (screenIsFocused && nextAppState == "active") {
          Clipboard.setString("");
        }
    
      };
     
    useEffect(() => {
        setOtpFetch(true)
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
            const lang = await AsyncStorage.getItem('user-language')
            const Phone = await AsyncStorage.getItem('Mobile')
            setMobile(Phone)
            setLang(lang)

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
            mobNumber: mobile,
        }
        await api.confirmLoginOtp(data).then((res) => {
            if (res?.data?.status) {
                console.log(res?.data)
                setStatus(false)
                navigation.navigate('ChangeMPIN')
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
        otpInput2.current.clear()
        setConDate(new Date().getTime())
        const data = {
            deviceId: deviceId,
            geoLocation: {
                latitude: "10.0302",//Todo
                longitude: "76.33553"//Todo
            },
            mobile: mobile,
            deviceIpAddress: ipAdrress,
            simId:'70dc83e1227a6b8c',
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
            console.log("err->", err.response)
            setStatus(false)
            if (err?.response?.data?.message === 'Maximum number of OTPs are exceeded. Please try after 30 minutes.') {
                setMaxError(true)

            }
        })
    }
    // ------------------ Resend Api Call End ----------------------

    useEffect(() => {
        if (timerCount > 0) {
            setTimeout(() => setTimer(timerCount - 1), 1000);
        } else {
            setStatus(false)
        }
    }, [timerCount]);

    
    useEffect(() => {
        if (Otpwrong) {
        otpInput2?.current?.clear()
        }
      }, [Otpwrong]);

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
                            console.log("otpmessage", match[0])
                            setModalVisible(true)
                        }
                    }

                });
            },
        );
    };

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setMaxError(false)
            //Put your Data loading function here instead of my loadData()
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ paddingTop: width * 0.1, justifyContent: 'center', alignItems: 'center' }}>
                {lang == 'en'
                    ? <>
                        <Text style={styles.textTit}>Please enter OTP sent to</Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={[styles.textTit, { fontFamily: FONTS.FontBold }]}>{mobile?.replace(/^.{3}/g, '').replaceAt(2, "X").replaceAt(3, "X").replaceAt(4, "X").replaceAt(5, "X").replaceAt(6, "X")} </Text>
                            <Text style={styles.textTit}>via SMS</Text>
                        </View>
                    </>
                    :
                    <>
                        <Text style={styles.textTit}>എസ്എംഎസ് വഴി  <Text style={[styles.textTit, { fontFamily: FONTS.FontBold }]}>{mobile?.replace(/^.{3}/g, '').replaceAt(2, "X").replaceAt(3, "X").replaceAt(4, "X").replaceAt(5, "X").replaceAt(6, "X")} </Text>എന്ന</Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                            <Text style={styles.textTit}> നമ്പറിലേക്ക് അയച്ച OTP നൽകുക</Text>
                        </View>
                    </>
                }
                <View style={styles.View1}>
                    <Text style={styles.otptext} >{t('common:EnterOtp')}</Text>
                </View>
                <OTPInputView
                    autoFocus={true}
                    ref={otpInput2}
                    inputCount={4}
                    offTintColor={!Otpwrong ? "lightgrey" : "red"}
                    tintColor={!Otpwrong ? "lightgrey" : "red"}
                    inputCellLength={1}
                    textInputStyle={styles.imputContainerStyle}
                    keyboardType="numeric"
                    containerStyle={{ marginTop: 7 }}
                    handleTextChange={(code => {
                        setOtpValue(code)
                        if (code.length === 4) {
                            ConfirmOtp(code)
                        } else {
                            if(Otpwrong && code.length > 0 ){
                                setOtpwrong(false)
                              }
                              if(isExpired && code.length > 0  ){
                                setIsExpired(false)
                              }
                            
                            
                        }

                    })}
                />
                  {isExpired
                    ? <View style={{  alignItems: 'center' }}>
                        <Text style={styles.errrorText}>OTP has Expired</Text>
                    </View>
                    : null}

                {Otpwrong
                    ?
                    <Text style={[styles.successText, { color: COLORS.colorRed }]}>{t('common:otpValid')}</Text>
                    : null}

                {maxError === true ?
                    <View style={{ marginTop: Dimensions.get('window').height * 0.03, }}>
                        <Text style={{ color: "#EB5757", fontFamily: FONTS.FontRegular, fontSize: 12, textAlign: 'center', width: width * 0.8 }}>{t('common:Valid2')}</Text>
                        <Text style={{ color: "#EB5757", fontFamily: FONTS.FontRegular, fontSize: 12, textAlign: 'center' }}>{t('common:Valid3')}</Text></View>
                    : status === true ?
                        <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: width * 0.07 }}>
                            <Text style={styles.resendText}>{t('common:Resend')} 00:{timerCount < 10 ? '0' : ''}{timerCount}</Text>
                        </View>
                        :
                        <TouchableOpacity onPress={() => ResendApiCall()} style={{ padding: 18 }}>
                            <View style={{ flexDirection: 'row', }}>
                                <Resend style={{ width: 9, height: 11, top: 3, marginRight: 6, }} resizeMode="contain" />
                                <TouchableOpacity>
                                    <Text style={styles.TextResend1} onPress={() => ResendApiCall()}>{t('common:Resend1')}</Text></TouchableOpacity>
                            </View>
                        </TouchableOpacity>}

              

            </View>
            {screenIsFocused
                ?
                <AllowModal ModalVisible={ModalVisible}
                    onPressOut={() => setModalVisible(!ModalVisible)}
                    setOtpValue={setOtpValue}
                    otpMessage={otpMessage}
                    setModalVisible={setModalVisible}
                    navigation={navigation}
                    ConfirmOtp={(data) => otpInput2?.current?.setValue(data)}
                    setOtpFetch={setOtpFetch}
                />
                : null}
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
    imputContainerStyle: {
        borderRadius: 8,
        borderRadius: 8,
        backgroundColor: COLORS.backgroundColor,
        borderWidth: 1,
        borderColor: '#ECEBED',
        height: 48,
        width: 48,
        color: '#090A0A',
        fontSize: 12,
        fontWeight: 'bold',
    },
    resendText: {
        color: '#333333',
        fontFamily: FONTS.FontRegular,
        fontSize: 12
    },
    TextResend: {
        fontSize: 12,
        fontFamily: FONTS.FontMedium,
        color: '#3B3D43',
        fontWeight: '700'
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
        marginTop: 10,
    }
})

