import React, { useState, useEffect, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    KeyboardAvoidingView,
    StatusBar,
    ScrollView,
    Dimensions,
    BackHandler
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FONTS } from '../../../Constants/Constants';
const { height, width } = Dimensions.get('screen');
import OTPInputView from '@twotalltotems/react-native-otp-input';
import AllowModal from '../../../Components/AllowModal';
import { useTranslation } from 'react-i18next';

const Pin = ({ navigation }) => {
    const { t } = useTranslation();
    const [OtpValue, setOtpValue] = useState('')
    const [ModalVisible, setModalVisible] = useState(false)
    const [timerCount, setTimer] = useState(30)
    const [IsOtp2,setIsOtp2] = useState(true)
    const [otpStatus,setOtpStatus] = useState(true)

    useEffect(() => {
        if (IsOtp2) {
           // setModalVisible(true)
            let interval = setInterval(() => {
                setTimer(lastTimerCount => {
                    lastTimerCount <= 1 && clearInterval(interval)
                    
                    return lastTimerCount - 1
                    
                })
            }, 1000)
            console.log("timer state",interval,timerCount)
            if (timerCount === 0) {
                setOtpStatus(true)
                setIsOtp2(false)
                console.log("timer count useEffect", timerCount)
            }//each count lasts for a second
            //cleanup the interval on complete
            return () => clearInterval(interval)
        }
    }, [IsOtp2]);
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ paddingTop: width * 0.1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.textTit}>Please enter OTP sent to</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={[styles.textTit, { fontFamily: FONTS.FontBold }]}>80XXXX3903 </Text>
                    <Text style={styles.textTit}>via SMS</Text>
                </View>

                <View style={styles.View1}>
                    <Text style={styles.otptext} onPress={() => setModalVisible(true)}>Enter OTP</Text>
                </View>

                <OTPInputView
                    style={[styles.OtpInput, {}]}
                    pinCount={4}
                    code={OtpValue}
                    onCodeChanged={otp => setOtpValue(otp)}
                    // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                    // onCodeChanged = {code => { this.setState({code})}}
                    autoFocusOnLoad={false}
                    codeInputFieldStyle={{ color: '#090A0A', borderRadius: 8, backgroundColor: '#FFFFF', }}
                    placeholderTextColor="black"
                    onCodeFilled={(code => {
                        if(code !== '4040'){
                            setOtpStatus(false)
                        }

                    })}
                />


                <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: width * 0.07 }}>
                    <Text style={styles.resendText}>{t('common:Resend')} 00:{timerCount < 10 ? '0' : ''}{timerCount}</Text>
                </View>
                {!otpStatus ?
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.errrorText}>You entered wrong OTP</Text>
                </View>: timerCount == 0 &&
                   <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                   <Text style={styles.errrorText}>OTP has expired</Text>
               </View>}
            </View>
            <AllowModal ModalVisible={ModalVisible}
                onPressOut={() => setModalVisible(!ModalVisible)}
                setOtpValue={setOtpValue} setModalVisible={setModalVisible} navigation={navigation} />
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
    }
})