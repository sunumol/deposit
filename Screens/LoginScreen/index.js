import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    Platform,
    KeyboardAvoidingView,
    ScrollView,
    BackHandler,
    Dimensions,
    ToastAndroid,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS, FONTS } from '../../Constants/Constants';
import Statusbar from '../../Components/StatusBar';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { useFocusEffect } from '@react-navigation/native';
import AllowModal from '../../Components/AllowModal';
import { useTranslation } from 'react-i18next';
import { useRoute } from '@react-navigation/native';
const { height, width } = Dimensions.get('screen');
import AsyncStorage from '@react-native-async-storage/async-storage';
import Resend from '../../assets/Images/resend.svg'
import Logo from '../../assets/Images/svadhan.svg';
import ToastModal from '../../Components/ToastModal';
import ValidModal from './Components/ValidModal';
import OtpModal from './Components/OtpModal';
//import { useSelector, useDispatch, connect } from 'react-redux';

const LoginScreen = ({ navigation, routew, props }) => {
    const route = useRoute();
    // const token = useSelector((state)=>{  // calling state 
    //     console.log("staee... home",state.profile)
    //     return state.profile
    // })
    const { t } = useTranslation();
    const [routes, setRoute] = useState()
    const [IsOtp1, setIsOtp1] = useState(false)
    const [IsOtp2, setIsOtp2] = useState(false)
    const [valid2, setValid2] = useState(true)
    const [valid, setValid] = useState(false)
    const [resend, setResend] = useState(false)
    const [exitApp, setExitApp] = useState(0);
    const [OtpValue, setOtpValue] = useState('')
    const [PhoneNum, setPhoneNum] = useState(null)
    const [ModalVisible, setModalVisible] = useState(false)
    const [ModalVisible1, setModalVisible1] = useState(false)
    const [ValidModal1, setValidModal1] = useState(false)
    const [OtpModal1, setOtpModal1] = useState(false)
    const isDarkMode = true;
    const [lang, setLang] = useState('')
    const [count, setCount] = useState(1)
    const [button, setButton] = useState(true)
    const [timerCount, setTimer] = useState(30)
    const [text, setText] = useState('Maximum number of OTPs are exceeded.')
    const [text1, setText1] = useState('Please try after 30 minutes')
    const [status, setStatus] = useState(false)
    const [valid1, setValid1] = useState(true)
    const [otp, setOtp] = useState(false)
    const [ExitStatus, setExitStatus] = useState(false)

    useEffect(() => {
        getData()
    }, [])
    useEffect(() => {
        if (!OtpValue) {
            setOtp(false)
        }
    }, [OtpValue])

    const getData = async () => {
        try {
            const lang = await AsyncStorage.getItem('user-language')
            setLang(lang)
            console.log("language", lang)
        } catch (e) {
            console.log(e)
        }
    }


    useEffect(() => {
        if (IsOtp2) {
            let interval = setInterval(() => {
                setTimer(lastTimerCount => {
                    lastTimerCount <= 1 && clearInterval(interval)
                    return lastTimerCount - 1
                })
            }, 1000)
            console.log(interval)
            if (timerCount === 0) {
                setStatus(false)
                console.log("timer count useEffect", timerCount)
            }//each count lasts for a second
            //cleanup the interval on complete
            return () => clearInterval(interval)
        }
    }, [IsOtp2]);
    useEffect(() => {

        if (timerCount === 0) {
            setStatus(false)
            console.log("timer count1 useEffect", timerCount, IsOtp2)
        }//each count lasts for a second
        //cleanup the interval on complete

    }, [timerCount]);

    const backAction = () => {

        if (!ExitStatus) {
            console.log("route...", timerCount, valid, IsOtp2, IsOtp1, status, ExitStatus)
            if (IsOtp1 == false && IsOtp2 == false) {
                if (exitApp === 0) {
                    setExitApp(exitApp + 1);

                    console.log("exit app Login", IsOtp2, IsOtp1, ExitStatus)
                    ToastAndroid.show("Press back again to exit.", ToastAndroid.SHORT);
                }
                else if (exitApp === 1) {
                    BackHandler.exitApp();
                    setExitApp(exitApp + 1);
                    console.log("exit app else", ExitStatus)
                }
            }
            else if (IsOtp1 == true) {
                setPhoneNum(null)
                setIsOtp1(false)
                setIsOtp2(false)
                setStatus(false)
                //setTimeout(30)
                setValid(false)
                //setTimer(30)
                // setStatus(false)

            }
            else if (IsOtp2 == true) {
                setPhoneNum(null)
                setIsOtp1(false)
                setIsOtp2(false)
                setStatus(false)
                //setTimeout(30)
                setValid(false)
                //setTimer(30)
                // setStatus(false)

            }
            // else if (valid == true) {
            //     setValid(false)
            //    setPhoneNum(null)
            //    setIsOtp1(false)
            //     // setValid1(false)
            //     setTimer(null)

            // }

            return false;
        }
    };

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            handleGoBack,
        );
        return () => backHandler.remove();
    }, [exitApp]);

    const handleGoBack = () => {
        if (!ExitStatus) {
            if (!IsOtp1 && !IsOtp2) {
                if (exitApp === 0) {
                    setExitApp(exitApp + 1);
                    console.log("exit app create pin", exitApp)
                    ToastAndroid.show("Press back again to exit.", ToastAndroid.SHORT);
                } else if (exitApp === 1) {
                    BackHandler.exitApp();
                    console.log("exit app else", exitApp)
                }
            }
            else if (IsOtp1 == true) {
                setPhoneNum(null)
                setIsOtp1(false)
                setIsOtp2(false)
                setStatus(false)
                //setTimeout(30)
                setValid(false)
                //setTimer(30)
                // setStatus(false)

            }
            else if (IsOtp2 == true) {
                setPhoneNum(null)
                setIsOtp1(false)
                setIsOtp2(false)
                setStatus(false)
                //setTimeout(30)
                setValid(false)
                //setTimer(30)
                // setStatus(false)

            }
            return true;

        }
    }
    const resendCheck = () => {
        setIsOtp2(false)
        setResend(true)
    }
    const verifyPhone = (Phone) => {
        var reg = /^([0-9])\1{9}$/;
        return reg.test(Phone);
    }
    const GETOTP_Validation = () => {
        setResend(false)

        const firstDigitStr = String(PhoneNum)[0];

        if (PhoneNum?.length != 10 || PhoneNum == "") {
            setModalVisible1(true)
            // ToastAndroid.show(t('common:Valid'), ToastAndroid.SHORT);
        } else if (firstDigitStr === '1' || firstDigitStr === '2' || firstDigitStr === '3' || firstDigitStr === '4' || firstDigitStr === '5' || firstDigitStr === '0') {
            setModalVisible1(true)
        } else if (verifyPhone(PhoneNum)) {
            setModalVisible1(true)
        } else if (!(/^\d{10}$/.test(PhoneNum))) {
            setModalVisible1(true)
        }
        else {
            getOtp();
            setIsOtp1(true)
            setIsOtp2(true)
            setExitApp(3)
        }
    }

    const getOtp = () => {
        setTimeout(() => {
            setIsOtp1(true)
            setIsOtp2(true)
            setStatus(true)
            setValid(false)
            setTimer(30)
        }, 1000)
        setButton(false)
        setModalVisible(false)
        setIsOtp1(true)
        setIsOtp2(true)
        setModalVisible(true)
        setStatus(true)
        setTimer(30)
        console.log("getotp update....", status, timerCount)
    }

    const scrollViewRef = useRef();

    const CountDownResend = () => {
        if (count == 1) {
            //console.log("click count 0....",count)
            setCount(count + 1)
            console.log("click count 0....", count)
        } else if (count == 2) {
            setCount(count + 1)
            console.log("click count 1....", count)
        } else if (count == 3) {
            setCount(count + 1)
            console.log("click count 2...", count)
        } else if (count == 4) {
            // ToastAndroid.show("Maximum number of OTPs are exceeded. Please try after 30 minutes", ToastAndroid.SHORT);
            setCount(count + 1)
            setTimer(null)
            setValid(true)
            setValid1(true)
            // setTimeout(()=>{
            //     setValid1(true)
            //   },[1000])
            console.log("click count 2...", count, valid, valid1, timerCount)
        }

    }

    const OnchangeNumber = (num) => {
        if (/^[^!-\/:-@\.,[-`{-~ ]+$/.test(num) || num === '') {
            setPhoneNum(num)
            setButton(true)
        } else {
            // setPhoneNum(null)
            setModalVisible1(true)
            console.log("restricted values", num, PhoneNum)
            // ToastAndroid.show(t('common:Valid'), ToastAndroid.SHORT);
        }
    }

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setPhoneNum(null)
            setIsOtp2(null)
            setIsOtp1(null)
            setButton(true)
            setValid(false)
            setCount(1)
            //Put your Data loading function here instead of my loadData()
        });

        return unsubscribe;
    }, [navigation]);



    return (
        <>

            <SafeAreaProvider style={{ backgroundColor: COLORS.colorBackground }} >
            <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={"#002B59"}/>
                <ScrollView ref={scrollViewRef}
                    onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
                    <KeyboardAvoidingView style={{ flex: 1 }}
                        {...(Platform.OS === 'ios' && { behavior: 'position' })}
                    >
                        <SafeAreaView style={styles.container1} />

                        <View style={{ marginBottom: IsOtp1 ? 0 : 0, marginTop: Dimensions.get('window').height * 0.2, alignItems: 'center', justifyContent: 'center', }}>

                            <Logo width={160} height={51} resizeMode='contain' />

                        </View>


                        <View style={[styles.container, { marginTop: Dimensions.get('window').height * 0.05 }]}>

                            <Text style={styles.Heading1} onPress={() => {
                                navigation.navigate('Collect')
                                setExitStatus(true)
                            }}>{t('common:Verify')}</Text>

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
                                    onChangeText={(num) => {

                                        OnchangeNumber(num)
                                    }
                                        // let num1 = Number(num);
                                        //     const regex = /^([,]?[\s0-10]+)?(\d{3}|[.]?[0-10]+[)])?([-]?[\s]?[0-10])+$/i;
                                        //     if (regex.test(PhoneNum) === false) {

                                        //         setPhoneNum(num)
                                        //         console.log("number ",regex.test(PhoneNum))
                                        //         ToastAndroid.show("Please enter a valid mobile number", ToastAndroid.SHORT);
                                        //     }
                                        //     else {
                                        //         console.log("number ", typeof (num))
                                        //         setPhoneNum(num)
                                        //     }
                                        // }
                                    }
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
                            {/* // <View style={[styles.viewTerms,{flexDirection:'row'}]}>

                            //         <TouchableOpacity onPress={() => navigation.navigate('Privacy')}>

                            //             <Text style={[styles.textTerms1, { textAlign: 'left', }]}>സ്വകാര്യതാ നയവും</Text>
                            //             <View style={[styles.ViewLine,{justifyContent:'flex-start',alignItems:'flex-start'}]} />


                            //             <Text style={[styles.textTerms2, { textAlign: 'left' }]}>ഞാൻ അംഗീകരിക്കുന്നു.</Text>

                            //         </TouchableOpacity>
                            //     </View>} */}

                            {IsOtp1 ?
                                <View style={styles.ViewOtp}>
                                    <Text style={styles.textOtp} onPress={() => navigation.navigate('PreClosure')}>{t('common:EnterOtp')} </Text>
                                </View> : null}

                            {IsOtp1 ?
                                <OTPInputView
                                    style={[styles.OtpInput, {}]}
                                    pinCount={4}
                                    code={OtpValue}
                                    onCodeChanged={otp => setOtpValue(otp)}
                                    // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                                    // onCodeChanged = {code => { this.setState({code})}}
                                    autoFocusOnLoad={false}
                                    codeInputFieldStyle={{ color: '#090A0A', borderRadius: 8, backgroundColor: '#FCFCFC', borderColor: !otp ? "lightgrey" : "red" }}
                                    placeholderTextColor="black"
                                    onCodeFilled={(code => {

                                        if (code && code == '1091') {
                                            navigation.navigate('Permission')
                                            setOtp(false)
                                        }
                                        else {
                                            console.log("otp value//...", OtpValue)
                                            setOtp(true)
                                            setCount(1)
                                        }
                                    })}
                                /> : null}
                            {otp ?
                                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 12, marginBottom: 5 }}>
                                    <Text style={{ color: "#EB5757", fontFamily: FONTS.FontRegular, fontSize: 12, textAlign: 'center' }}>{t('common:otpValid')}</Text>
                                </View> : null}

                            {IsOtp2 && status === true &&
                                <View style={{ marginTop: Dimensions.get('window').height * 0.03 }}>
                                    <Text style={styles.TextResend}>{t('common:Resend')} 00:{timerCount < 10 ? '0' : ''}{timerCount}</Text>
                                </View>
                            }

                            {IsOtp2 && timerCount === 0 ?
                                <TouchableOpacity onPress={() => CountDownResend()} style={{ padding: 18 }}>
                                    <View style={{ flexDirection: 'row', }}>
                                        {/* <Icon name="reload1" size={20} style={{transform:lang == "en" ? [{ rotateY: '360deg' }] : [{ rotateX: '180deg' }]}} /> */}
                                        <Resend style={{ width: 9, height: 11, top: 3, marginRight: 6, }} resizeMode="contain" />

                                        <TouchableOpacity onPress={() => CountDownResend()}>
                                            <Text style={styles.TextResend1} onPress={() => CountDownResend()
                                                //navigation.navigate('Permission')
                                            } >{t('common:Resend1')}</Text></TouchableOpacity>
                                    </View>
                                </TouchableOpacity> : timerCount == null && valid && valid1 ?
                                    <View style={{ marginTop: Dimensions.get('window').height * 0.03, }}>
                                        <Text style={{ color: "#EB5757", fontFamily: FONTS.FontRegular, fontSize: 12, textAlign: 'center', width: width * 0.8 }}>{t('common:Valid2')}</Text>
                                        <Text style={{ color: "#EB5757", fontFamily: FONTS.FontRegular, fontSize: 12, textAlign: 'center' }}>{t('common:Valid3')}</Text></View> : null}

                        </View>
                        <AllowModal ModalVisible={ModalVisible}
                            onPressOut={() => setModalVisible(!ModalVisible)}
                            setOtpValue={setOtpValue} setModalVisible={setModalVisible} navigation={navigation} />
                        <ToastModal
                            Validation={t('common:Valid')}
                            ModalVisible={ModalVisible1}
                            onPressOut={() => setModalVisible1(!ModalVisible1)}
                            setModalVisible={setModalVisible1}
                        />
                        <ValidModal
                            Validation={('common:registerMob')}
                            ModalVisible={ValidModal1}
                            onPressOut={() => setValidModal1(!ValidModal1)}
                            setModalVisible={setValidModal1}
                        />

                        <OtpModal
                            Validation={'otpexp'}
                            ModalVisible={OtpModal1}
                            onPressOut={() => setOtpModal1(!OtpModal1)}
                            setModalVisible={setOtpModal1}
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
        //color: COLORS.colorBlack
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
        //margin:5
    },
    TextResend1: {
        fontSize: 12,
        color: COLORS.colorB,
        fontFamily: FONTS.FontExtraBold,
        fontWeight: 'bold'
    },
});