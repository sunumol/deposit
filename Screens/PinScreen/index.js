import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    StatusBar,
    Dimensions,
    BackHandler,
    ImageBackground,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import { NetworkInfo } from 'react-native-network-info';
import { useRoute } from '@react-navigation/native';
import { addDays } from 'date-fns'
import ToastModal from '../../Components/ToastModal';
import moment from 'moment';

// ----------- Componenet Import ------------------------
import { COLORS, FONTS } from '../../Constants/Constants';
import Statusbar from '../../Components/StatusBar';
import { useTranslation } from 'react-i18next';
import PinModal from './Components/PinModal';
import { api } from '../../Services/Api';
import OTPInputView from '../../Components/OTPInputView';
import ModalExitApp from '../../Components/ModalExitApp';
import { useFocusEffect } from '@react-navigation/native';
import UpdateModal from './Components/UpdateModal';
import VersionModal from './Components/VersionModal';
import ErrorModal from './Components/ErrorModal';
// ----------- Image Import ------------------------
import Svadhan from '../../assets/image/logofinpower1.svg';

const { height, width } = Dimensions.get('screen');

const PinScreen = ({ navigation, }) => {

    const isDarkMode = true
    const routes = useRoute();
    const { t } = useTranslation();
    const otpInput2 = React.createRef();

    const [OtpValue, setOtpValue] = useState('')
    const [ModalVisible, setModalVisible] = useState(false)
    const [error, setError] = useState(false)
    const [maxError, setMaxError] = useState(false)
    const [modalExitAppVisible, setModalExitAppVisible] = useState(false);
    // --------------Device Configuration Start----------
    const [custID, setCustId] = useState()
    const [invalidState, setInvalidState] = useState(1)
    const [userName, setUserName] = useState('Athira')
    const [status, setStatus] = useState(false)
    const [ModalVisibleVer, setModalVisibleVer] = useState(false)
    const [ModalVisibleUp, setModalVisibleUp] = useState(false)
    const [ipAdrress, setIPAddress] = useState();
    const [deviceId, setDeviceId] = useState();
    const [mobile, setMobile] = useState();
    const [ModalVisibleError, setModalVisibleError] = useState(false)
    const [message, setMessage] = useState()

    const [errorMessage, setErrorMessage] = useState(false)
    const [ModalVisibleInvalid, setModalInvalid] = useState(false)

    // --------------Device Configuration End----------

    useEffect(() => {
        getData()
        getAppNewVersion()
    }, [userName])

    useEffect(() => {
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

    useEffect(() => {
        return navigation.addListener("focus", () => {
            setOtpValue('');
            setMaxError(false)

        });
    }, [navigation]);

    const getAppNewVersion = () => {
        console.log("inside api")

        api.getAppNewVersion().then(result => {
            if (result?.data?.body !== null) {

                if (result?.data?.body?.mandatory) {
                    setModalVisibleVer(true)
                } else {
                    setModalVisibleUp(true)
                }
            }
            console.log("version checking....", result.data.body)
            //  setModalVisible2(true)

        })
            .catch(err => {
                console.log("banner 3333---->", err);

            });
    }

    const printRemainingTime = (t2,date1) => {
        
        const t1 = new Date().getTime();
        const date2 = moment(new Date(t1)).format("DD-MM-YY")
        let ts = (t1-t2.getTime()) / 1000;
      
        var d = Math.floor(ts / (3600*24));
        var h = Math.floor(ts % (3600*24) / 3600);
        var m = Math.floor(ts % 3600 / 60);
        var s = Math.floor(ts % 60);
      
        const timeerror = 60 - m;
        const secondserror = 60 - s;
        const te = JSON.stringify(timeerror);
        const tse = JSON.stringify(secondserror);
        
        console.log('----',d, h, m, s,date1,date2)

        if(JSON.stringify(h) >= 1){
            AsyncStorage.removeItem('InavalidOtpDate')
        }else{
            setErrorMessage('Sorry.You have reached maximum tries.Your account is locked for next ' + `${te === 0 ? tse : te}` + ' ' +`${te === 0 ? 'seconds':'minutes'}` +'.Contact admin to unlock the account.')
            setModalInvalid(true)
        }
      
    }
      
      
    const getData = async () => {
        try {
            const id = await AsyncStorage.getItem('CustomerId')
            const Phone = await AsyncStorage.getItem('Mobile')
            const InavalidOtpDate = await AsyncStorage.getItem('InavalidOtpDate')
            const userName = await AsyncStorage.getItem('userName')
          
            setUserName(userName)
            setMobile(Phone)
            setCustId(id)
            
            if(InavalidOtpDate !== null){
                const t1 = new Date().getTime();
                const date2 = moment(new Date(t1)).format("DD-MM-YY")
                const date1 = moment(new Date(InavalidOtpDate)).format("DD-MM-YY");
                if(date2 === date1){
                    printRemainingTime(new Date(InavalidOtpDate),date1);
                }else{
                    AsyncStorage.removeItem('InavalidOtpDate')
                }
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

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setStatus(false),
                setError(false),
                setOtpValue('')
        });
        return unsubscribe;
    }, [navigation]);



    const getPinCheck = async (code) => {
        try {
            const Pin = await AsyncStorage.getItem('Pin')
            // const PinExpiredDate = await AsyncStorage.getItem('ExpiredDate')
            const pinDate = await AsyncStorage.getItem('PinDate')
            const dateToday = new Date()
            const dateExpired = new Date(addDays(new Date(pinDate), 90))

            //  const dateExpired =new Date('2/2/2023')
            console.log('----', dateExpired, '-----', dateToday, pinDate, Pin)

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
                    UpdateSIMID()
                  //  navigation.navigate('Profile')
                    setMaxError(false);
                } else {
                    otpInput2?.current?.clear()
                    setError(true)
                    setInvalidState(invalidState + 1)
                    if (invalidState === 3) {
                        invalidOtpApi()
                        setErrorMessage('Sorry.You have reached maximum tries.Your account is locked for next 30 minutes.Contact admin to unlock the account.')
                        setModalInvalid(true)
                        setInvalidState(1)
                        AsyncStorage.setItem('InavalidOtpDate',new Date().toISOString());
                    }
                }

            } else {
                setModalVisible(true)
            }
        } catch (e) {
            console.log(e)
        }
    }

    // ------------------ After 3 Err Api Call Start------------------
    async function invalidOtpApi() {
        const data = {
            id: custID,
        }
        await api.invalidPinApi(data).then((res) => {
            if (res?.data?.status) {
                console.log('response Login Api', res.data)
                setInvalidState(1)
            } else {
                console.log("error text", res?.data)
                // setInvalidState(3)
            }
        }).catch((err) => {
            console.log("err->", err?.response)
            // setInvalidState(3)
        })

    }

    //SIMID check api

    async function UpdateSIMID(otp) {
        console.log("inside update simid",)

        const data = {

            "deviceId": deviceId,
            "geoLocation": {
                "latitude": "10.0302",
                "longitude": "76.33553"
            },
            "mobile": mobile,
            "deviceIpAddress": ipAdrress,
           // "simId":deviceId,
            "simId":'70dc83e1227a6b8c',
            "id": custID

        }
        console.log("data of update sim id", data)
        await api.UpdateSIMID(data).then((res) => {
            console.log("inside update sim id", res?.data?.statusCodeValue)
            if (res?.data?.statusCodeValue == 200) {
                console.log("inside update sim id", res?.data)
                navigation.navigate('Profile')
            }
        }).catch((err) => {
            if (err?.response?.data?.message == "We are unable to process.Security check failed") {
                setModalVisibleError(true)

                setMessage('We are unable to process.\n Security check failed')
            }
            console.log("err->", err?.response)

        })
    }
    // ------------------ After 3 Err Api Call End ------------------
    // useEffect(() => {
    //     const unsubscribe = navigation.addListener('focus', () => {
    //       setO

    //     });
    //     return unsubscribe;
    // }, [navigation]);
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container1} />
            <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={"#002B59"} />

            <View style={styles.ViewContent}>

                <ImageBackground source={require('./Images/bg.png')}
                    style={styles.Linear}>
                    <Svadhan width={320} height={70} resizeMode='contain' style={{ top: -10 }} />
                    <Text style={styles.Text1}>{t('common:Hi')}, {userName}</Text>
                </ImageBackground>

                <View style={styles.ViewPin}>
                    <Text style={styles.PinTEXT}>{t('common:PleaseEnterPIN')}</Text>
                    <OTPInputView
                        ref={otpInput2}
                        autoFocus={true}
                        inputCount={4}
                        inputCellLength={1}
                        offTintColor={'#ECEBED'}
                        tintColor={'#ECEBED'}
                        textInputStyle={styles.imputContainerStyle}
                        keyboardType="numeric"
                        containerStyle={{ marginTop: 7 }}
                        handleTextChange={(code => {
                            if (code.length === 4) {
                                
                                getPinCheck(code)
                            }
                            if (code.length !== 4) {
                                setError(false)
                            }
                        })}
                    />
                    <Text style={styles.TextF}
                        onPress={() => {
                            otpInput2?.current?.clear()
                            navigation.navigate('GeneratePin')
                        }}>{t('common:ForgotPIN')}</Text>
                </View>

                {error
                    ? <View style={{ justifyContent: 'center' }}>
                        <Text style={styles.errrorText}>Invalid PIN</Text>
                    </View>
                    : null}
                {maxError
                    ? <View style={{ justifyContent: 'center', marginHorizontal: 16 }}>
                        <Text style={styles.errrorText}>{"Maximum number of OTPs are exceeded. Please try after 30 minutes"}</Text>
                    </View>
                    : null}

                {status ?
                    <View style={{ marginTop: Dimensions.get('window').height * 0.03, }}>
                        <Text style={{ color: "#EB5757", fontFamily: FONTS.FontRegular, fontSize: 12, textAlign: 'center', width: width * 0.8 }}>{t('common:Valid2')}</Text>
                        <Text style={{ color: "#EB5757", fontFamily: FONTS.FontRegular, fontSize: 12, textAlign: 'center' }}>{t('common:Valid3')}</Text></View> : null}
            </View>

            <PinModal ModalVisible={ModalVisible}
                onPress={() => OnpressOut1()}
                onPressOut={() => setModalVisible(!ModalVisible)}
                setModalVisible={setModalVisible}
                navigation={navigation} />

            <ModalExitApp
                ModalVisible={modalExitAppVisible}
                onPressOut={() => setModalExitAppVisible(!modalExitAppVisible)}
                setModalExitAppVisible={setModalExitAppVisible}
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

            <ToastModal
                Validation={message}
                ModalVisible={ModalVisibleError}
                onPressOut={() => {
                    setModalVisibleError(!ModalVisibleError),
                    
                     navigation.reset({
                        index: 0,
                        routes: [{ name: 'LoginScreen' }],
                    });
                }}
                setModalVisible={setModalVisibleError}
            />
            <ErrorModal
                Validation={errorMessage}
                ModalVisible={ModalVisibleInvalid}
                setModalVisible={setModalInvalid}
            />

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
        height: width * 0.48,
        backgroundColor: COLORS.colorBackground,
        borderRadius: 15,
        alignItems: 'center',
        top: -30
    },
    PinTEXT: {
        color: '#1A051D',
        fontFamily: FONTS.FontRegular,
        paddingBottom: width * 0.02,
        fontSize: 14,
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
