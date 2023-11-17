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
    BackHandler,
    ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS, FONTS } from '../../Constants/Constants';
import Statusbar from '../../Components/StatusBar';
import Header from '../../Components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Details from './Components/Details';
import CreditModal from './Components/CreditModal';
const { height, width } = Dimensions.get('screen');
import Icon1 from 'react-native-vector-icons/Entypo'
import { api } from '../../Services/Api';
import { useSelector } from 'react-redux';
import ModalSave from '../../Components/ModalSave';
import ReasonModal from '../DetailedCheck/Components/ReasonModal';
import ErrorModal from '../DetailedCheck/Components/ErrorModal';
import CorrectionModal from '../IncomeDetailsSpouse/Components/CorrectionModal';
export function numberWithCommas(x) {

    return x?.toString().replace(/^[+-]?\d+/, function (int) {
        return int.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    });
}

const IncomeDetailsSpouse = ({ navigation,route }) => {
console.log("next screen ",route?.params?.isCheck)
    const isDarkMode = true
    const { t } = useTranslation();
    const [lang, setLang] = useState('')
    const [statusChange, setStatusChange] = useState(false)
    const [relationShip, setRelationship] = useState('Spouse')
    const [Amount, setAmount] = useState('')
    const [ModalVisible, setModalVisible] = useState(false)
    const [Purpose, setPurpose] = useState('')
    const [days, setDays] = useState('')
    const [Month, setMonth] = useState('')
    const [Avg, setAvg] = useState('')
    const [Buttons, setButtons] = useState(false)
    const [MonthsCustom, setMonthCustom] = useState('')
    const [Credit, setCredit] = useState('')
    const [Salary, setSalary] = useState('')
    const [StateChange1, setStateChange1] = useState(false)
    const [ButtonSP, setButtonSP] = useState(false)
    const [incomedetail, setIncomedetail] = useState('')
    const [incomedetailfield, setIncomedetailfield] = useState('')
    const activityId = useSelector(state => state.activityId);
    const [ModalVisible1, setModalVisible1] = useState(false)
    const [ModalReason, setModalReason] = useState(false)
    const [ModalError, setModalError] = useState(false)
    const [ModalVisibleC, setModalVisibleC] = useState(false)
    const [ZeroStatus, setZeroStatus] = useState(false)
    const [custID, setCustId] = useState('')
    const [fcmToken, setFcmToken] = useState()
    const [AmountFocus, setAmountFocus] = useState(false)
    const [MonthFocus, setMonthFocus] = useState(false)
    const [NetMonth, setNetMonth] = useState(false)
    const [LastPage,setLastPage] = useState(route?.params?.isCheck)
    const isLastPage = useSelector(state => state.isLastPage);
    const [status,setStatus] = useState(true)
    const [CorrectionStatus,setCorrectionStatus] = useState(route?.params?.Correction)
    useEffect(() => {
        getData()

        // setRelationship(route?.params?.relationShip)
        // getIncomeDetails()
        console.log("statecha nge.....",route?.params?.isCheck)
    }, [])

    const getData = async () => {
        try {
            const lang = await AsyncStorage.getItem('user-language')
            setLang(lang)

        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        AsyncStorage.getItem("CustomerId").then((value) => {
            setCustId(value)
        })
        AsyncStorage.getItem("fcmToken").then((value) => {
            setFcmToken(value)
        })
    }, [])

    useEffect(() => {
        if (fcmToken) {
            firebaseTokenSentTo()
        }
    }, [fcmToken])
    const handleGoBack = useCallback(() => {

        // navigation.goBack()
        setModalVisible1(true)
        return true; // Returning true from onBackPress denotes that we have handled the event
    }, [navigation]);

    useFocusEffect(
        React.useCallback(() => {
            BackHandler.addEventListener('hardwareBackPress', handleGoBack);

            return () =>

                BackHandler.removeEventListener('hardwareBackPress', handleGoBack);
        }, [handleGoBack]),
    );

    const ButtonClick = () => {
console.log("button click data",Amount,Avg)
console.log("button click data",Purpose,Month)
        if (Amount !== '' && Avg !== '' && Purpose !== '') {
            //     if(!NetMonth){

            //         NumberFormat_avg()
            //         setStateChange1(true)
            //         // setStatusChange(true)
            //         saveIncomeDetails_Proceed()
            //   }else{
            setStateChange1(true)
            // setStatusChange(true)
            saveIncomeDetails_Proceed()
            // }


        } else {
            setStateChange1(false)
            // setStatusChange(false)
        }
    }

    useEffect(() => {
        if (MonthsCustom === '' || Purpose === '' || Salary === '') {
            setButtonSP(false)
        } else {
            setButtonSP(true)
        }
    }, [MonthsCustom, Purpose, Salary])

    const firebaseTokenSentTo = async () => {
        console.log("inside api call")
        const data = {
            "agentId": Number(custID),
            // "agentId": 1,
            "deviceToken": fcmToken
        };
        await api.firebaseToken(data).then((res) => {
            console.log('-------------------res-----notification', res?.data)
        })
            .catch((err) => {
                console.log('-------------------err notification', err?.response)
            })
    };

    useEffect(() => {

        AsyncStorage.getItem("CorrectionStatus").then((value) => {
            console.log("getincome details correction", value,CorrectionStatus)
         
                getIncomeDetails(value)
           
          

        })
    }, [])
    // useEffect(() => {
    //     console.log('Use.....', Amount, Avg, Purpose)
    //     if ((Amount === null || Amount === '') || (Avg === null || Avg === '') || (Purpose === null || Purpose === '')) {
    //         setButtons(false)
    //     } else {
    //         setButtons(true)
    //     }
    // }, [Amount, Avg, Purpose])

    // ------------------ get Conduct DLE basic detail Village Api Call Start ------------------
    const updateRejection = async () => {
        console.log('api called for rejection')
        const data = {
            "activityStatus": 'Submitted wrong data',
            "employeeId": Number(custID),
            "activityId": activityId?activityId:route?.params?.activityId
        }
        await api.updateActivity(data).then((res) => {
            console.log('-------------------res get Village', res)
            setModalError(true)
            setModalReason(false)
            setTimeout(() => {
                navigation.navigate('Profile')
            }, 1000);

        }).catch((err) => {
            console.log('-------------------err get Village', err)
        })
    };


    // ------------------getIncomeDetails detail ------------------

    const getIncomeDetails = async (value) => {
        console.log('api called asyn value', value)

        const data = {
            "activityId": activityId?activityId:route?.params?.activityId,
            "relationShip": relationShip

        }
        await api.getIncomeDetails(data).then((res) => {
            console.log('-------------------res getIncomeDetails', res?.data?.body)
            if (res?.status) {
                if(!CorrectionStatus){
                setIncomedetail(res?.data?.body)
                setIncomedetailfield(res?.data?.body?.incomeDetailsFieldHeadders)
                //if (value == null) {
                setAmount(res?.data?.body?.field1)
                setMonth(res?.data?.body?.field2)
                setPurpose(res?.data?.body?.field2)
                setAvg(res?.data?.body?.field3)
                setStatus(false)
                }else{
                    setIncomedetail(res?.data?.body)
                    setIncomedetailfield(res?.data?.body?.incomeDetailsFieldHeadders)
                    setAmount('')
                    setMonth('')
                    setPurpose('')
                    setAvg('')
                    setStatus(false)
                }


            }
        }).catch((err) => {
            setStatus(false)
            console.log('-------------------err getIncomeDetails', err?.response)
        })
    };
    // ------------------ ------------------




    // ------------------saveIncomeDetails detail ------------------

    const saveIncomeDetails = async () => {
        console.log('api called')

        const data = {
            "activityId": activityId?activityId:route?.params?.activityId,
            "relationShip": relationShip,
            "field1": Amount,
            "field2": Purpose,
            "field3": Avg

        }
        await api.saveIncomeDetails(data).then((res) => {
            console.log('-------------------res saveIncomeDetails', res?.data?.body)
            if (res?.status) {
                navigation.navigate('Profile')
            }
        }).catch((err) => {
            console.log('-------------------err saveIncomeDetails', err?.response)
        })
    };
    // ------------------ ------------------


    // ------------------saveIncomeDetails detail ------------------

    const saveIncomeDetails_Proceed = async () => {
        console.log('api called')

        const data = {
            "activityId": activityId?activityId:route?.params?.activityId,
            "relationShip": relationShip,
            "field1": Amount,
            "field2": Purpose,
            "field3": Avg

        }
        await api.saveIncomeDetails(data).then((res) => {
            console.log('-------------------res saveIncomeDetails',route?.params?.isCheck )
            if (res?.status) {
                if(route?.params?.isCheck){
                    setModalVisibleC()
                }else{
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Proceed' }],
                    })
                }
               
                // if(isLastPage){
                //     setModalVisibleC(true)

                // }else{
                //     setModalVisibleC(false)
                //     navigation.navigate('Proceed')
                // }

                //navigation.navigate('Proceed')
            }
        }).catch((err) => {
            console.log('-------------------err saveIncomeDetails', err?.response)
        })
    };
    // ------------------ ------------------



    const setMonthdata = (text) => {
        if (text?.length > 0) {

            if (text < 13) {
                setMonth(text)
                setPurpose(text)
            } else {
                setMonth('')
            }

        } else {
            setMonth('')
        }
    }

    const getInitials = (name) => {

        let initials;
        const nameSplit = name?.split(" ");
        const nameLength = nameSplit?.length;
        if (nameLength > 1) {
            initials =
                nameSplit[0].substring(0, 1) +
                nameSplit[nameLength - 1].substring(0, 1);
        } else if (nameLength === 1) {
            initials = nameSplit[0].substring(0, 1);
        } else return;

        return initials.toUpperCase();
    };


    const NumberFormats = () => {
        setAmountFocus(true)
        if (Amount?.length == 4) {
            const firstDigitStr0 = String(Amount)[0]
            const firstDigitStr1 = String(Amount)[1]
            const firstDigitStr2 = String(Amount)[2]
            const firstDigitStr3 = String(Amount)[3]
            const digitForm = firstDigitStr0 + ',' + firstDigitStr1 + firstDigitStr2 + firstDigitStr3
            setAmount(digitForm)

        } else if (Amount?.length == 5) {
            const firstDigitStr0 = String(Amount)[0]
            const firstDigitStr1 = String(Amount)[1]
            const firstDigitStr2 = String(Amount)[2]
            const firstDigitStr3 = String(Amount)[3]
            const firstDigitStr4 = String(Amount)[4]
            const digitForm = firstDigitStr0 + firstDigitStr1 + ',' + firstDigitStr2 + firstDigitStr3 + firstDigitStr4
            setAmount(digitForm)
        } else if (Amount?.length == 6) {
            const firstDigitStr0 = String(Amount)[0]
            const firstDigitStr1 = String(Amount)[1]
            const firstDigitStr2 = String(Amount)[2]
            const firstDigitStr3 = String(Amount)[3]
            const firstDigitStr4 = String(Amount)[4]
            const firstDigitStr5 = String(Amount)[5]

            const digitForm = firstDigitStr0 + firstDigitStr1 + firstDigitStr2 + ',' + firstDigitStr3 + firstDigitStr4 + firstDigitStr5
            setAmount(digitForm)
        } else if (Amount?.length == 7) {
            setAmount('')
            const firstDigitStr0 = String(Amount)[0]
            const firstDigitStr1 = String(Amount)[1]
            const firstDigitStr2 = String(Amount)[2]
            const firstDigitStr3 = String(Amount)[3]
            const firstDigitStr4 = String(Amount)[4]
            const firstDigitStr5 = String(Amount)[5]

            const digitForm = firstDigitStr0 + firstDigitStr1 + firstDigitStr2 + ',' + firstDigitStr3 + firstDigitStr4 + firstDigitStr5
            setAmount(digitForm)
        }
    }

    const NumberFormat_avg = () => {
        setNetMonth(true)
        if (Avg?.length == 4) {
            const firstDigitStr0 = String(Avg)[0]
            const firstDigitStr1 = String(Avg)[1]
            const firstDigitStr2 = String(Avg)[2]
            const firstDigitStr3 = String(Avg)[3]
            const digitForm = firstDigitStr0 + ',' + firstDigitStr1 + firstDigitStr2 + firstDigitStr3
            setAvg(digitForm)

        } else if (Avg?.length == 5) {
            const firstDigitStr0 = String(Avg)[0]
            const firstDigitStr1 = String(Avg)[1]
            const firstDigitStr2 = String(Avg)[2]
            const firstDigitStr3 = String(Avg)[3]
            const firstDigitStr4 = String(Avg)[4]
            const digitForm = firstDigitStr0 + firstDigitStr1 + ',' + firstDigitStr2 + firstDigitStr3 + firstDigitStr4
            setAvg(digitForm)

        } else if (Avg?.length == 6) {

            const firstDigitStr0 = String(Avg)[0]
            const firstDigitStr1 = String(Avg)[1]
            const firstDigitStr2 = String(Avg)[2]
            const firstDigitStr3 = String(Avg)[3]
            const firstDigitStr4 = String(Avg)[4]
            const firstDigitStr5 = String(Avg)[5]

            const digitForm = firstDigitStr0 + firstDigitStr1 + firstDigitStr2 + ',' + firstDigitStr3 + firstDigitStr4 + firstDigitStr5
            setAvg(digitForm)
        }
    }

    const getLastPage = async () => {
        console.log("LASTPAGE", activityId)
        const data = {
            "activityId": activityId
        }
        await api.getLastPage(data).then((res) => {
            console.log("last page upadte", res?.data)
            if (res?.data?.body?.isLasCorrectin == true && res?.data?.body?.nextPage == 8) {
                setModalVisibleC(true)
            } else {

                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Proceed' }],
                })
            }
            // if (isLastPage == true) {

            //   setModalVisibleC(true)

            // }
            //  else {
            //     navigation.reset({
            //         index: 0,
            //         routes: [{ name: 'Proceed' }],
            //     })
            // }
        }).catch((err) => {
            console.log('-------------------err spousedetail1', err?.response)

        })
    };


    const getDLEConfirmation = async () => {
        const data = {
            "activityId": activityId
        }
        await api.getCorrectionNotify(data).then((res) => {

            console.log('getCorrectionNotify --------------------> ',res)

            if (res?.status) {
                setModalVisibleC(false)
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Proceed' }],
                });

            }

        }).catch((err) => {
            console.log('-------------------err spousedetail1', err?.response)

        })
    };
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container1} />
            <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={"#002B59"} />

            <Header name="Income Details" navigation={navigation} onPress={handleGoBack} />
            {/* <View style={styles.Header}>
            <View style={{ left: 15, alignItems: 'center', justifyContent: 'center', top: -3 }}>
                <TouchableOpacity onPress={() => { StateChange1 === false ? navigation.goBack() : setStateChange1(false) }} style={{ padding: 0 }}>
        
                    <Icon size={17} color={"white"} name="left" />
                </TouchableOpacity>
            </View>

            <View style={{ left: lang == 'en' ? -10 : 5 }}>
                <Text style={[styles.textPrivacy, {
                    fontSize: 16, color: COLORS.colorBackground,

                    fontFamily: FONTS.FontRegular,
                    fontWeight: '700',
                    marginTop: 10,
                    marginBottom: 16,
                    left: -5
                }]}>Income Details</Text>
            </View>

            <View></View>
        </View> */}

{status ? (
          <View
            style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
          >
            <ActivityIndicator size={30} color={COLORS.colorB} />
          </View>
        ) : (
            <View style={styles.ViewContent}>
                {/* <Details navigation={navigation} setStatusChange={setStatusChange} setStatusChange2={statusChange} /> */}
                <View style={styles.mainContainer}>
                    <ScrollView>

                        <View style={styles.containerBox}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={styles.circleView}>
                                    <Text style={styles.shortText}>{getInitials(incomedetail?.name)}</Text>
                                </View>
                                <View style={{ flexDirection: 'column', flex: 1, marginLeft: 12 }}>
                                    <Text style={styles.nameText}>{incomedetail?.name}</Text>
                                    <Text style={[styles.underText, { textTransform: 'capitalize' }]}>{incomedetail?.occupation?.replace(/_/g, ' ')}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', left: -5 }}>
                                    <Text style={styles.dateText}>{relationShip}</Text>
                                </View>
                            </View>
                        </View>


                        <View>
                            <View>
                                <Text style={styles.TextElect}>{incomedetailfield?.field1}</Text>
                            </View>
                            <View style={styles.SelectBox}>
                                <Text style={[styles.RS, { color: Amount === '' ? '#808080' : '#1A051D' }]}>{incomedetail?.occupation !== 'SALARIED_EMPLOYEE' ? '₹' : ''}</Text>
                                <TextInput
                                    style={[{
                                        fontSize: 14, color: '#1A051D',
                                        fontFamily: FONTS.FontRegular, left: 5, width: '95%'
                                    }]}
                                    value={Amount?.toString()}
                                    keyboardType={'number-pad'}
                                    contextMenuHidden={true}
                                    onFocus={() => {

                                        const Am1 = Amount?.replace(/\,/g, '')
                                        setAmount(Am1)
                                        setAmountFocus(false)
                                    }}
                                    onSubmitEditing={(text) => {
                                        console.log("onsubmit edit", Amount?.length)
                                        NumberFormats()
                                    }}
                                    maxLength={incomedetail?.occupation == 'SALARIED_EMPLOYEE' ? 2 : 6}
                                    onChangeText={(text) => {
                                        // setAmountFocus(false)
                                        if (/^[^!-\/:-@\.,[-`{-~ ]+$/.test(text) || text === "") {
                                            if (incomedetail?.occupation == 'SALARIED_EMPLOYEE') {

                                                setAmount(text)
                                                console.log("inside occupation 1", incomedetail?.occupation)

                                                console.log("inside occupation 3", incomedetail?.occupation)
                                                // setAmount(text)

                                                // if(text<13){
                                                //     setAmount(text)
                                                // }
                                            } else {
                                                if (Number(text) == 0) {
                                                    setAmount('')
                                                    console.log("inside occupation 2", incomedetail?.occupation)
                                                }
                                                else if (text[0] === '0') {
                                                    console.log("number log", text)
                                                } else {
                                                    setAmount(text)
                                                    console.log("inside occupation", incomedetail?.occupation)
                                                }
                                            }
                                        }
                                    }
                                    } />
                            </View>

                            <View>
                                <Text style={styles.TextElect}>{incomedetailfield?.field2}</Text>
                            </View>
                            
                            <View>
                                {incomedetailfield?.field2 == 'Salary credit method' ? <TouchableOpacity style={[styles.SelectBox, { justifyContent: 'space-between' }]} onPress={() => setModalVisible(true)}>
                                    <Text style={[styles.textSelect
                                        ,{color:Purpose ? COLORS.colorDark : 'rgba(128, 128, 128, 1)'}]}>{Purpose ? Purpose : 'Select'}</Text>

                                    {/* <Icon1 name="chevron-down" size={18} color={'#808080'} style={{ marginRight: 10 }} /> */}
                                </TouchableOpacity> :
                                    <View style={styles.SelectBox}>
                                        <TextInput
                                            style={[{ fontSize: 14, color: '#1A051D', fontFamily: FONTS.FontRegular, left: 5, width: '95%' }]}
                                            value={Month?.toString()}
                                            keyboardType={'number-pad'}
                                            maxLength={2}
                                            onFocus={() => {
                                                console.log("amountfocus", AmountFocus)
                                                if (!AmountFocus) {
                                                    // NumberFormats()
                                                }
                                                else if (!NetMonth) {
                                                    // NumberFormat_avg()
                                                }
                                                setMonthFocus(true)
                                                // NumberFormats()
                                                // NumberFormat_avg()

                                            }}
                                            onChangeText={(text) => setMonthdata(text)} />
                                    </View>}
                                {/* <TextInput
                                    style={[{ fontSize: 14, color: '#1A051D', fontFamily: FONTS.FontRegular, left: 5 }]}
                                    value={Month?.toString()}
                                    keyboardType={'number-pad'}
                                    onChangeText={(text) => setMonth(text)} /> */}
                            </View>

                            <View>
                                <Text style={styles.TextElect}>{incomedetailfield?.field3}</Text>
                            </View>
                            <View style={styles.SelectBox}>
                                <Text style={[styles.RS, { color: Avg === '' ? '#808080' : '#1A051D' }]}>₹</Text>
                                <TextInput
                                    style={[{ fontSize: 14, color: '#1A051D', fontFamily: FONTS.FontRegular, left: 5, width: '95%' }]}
                                    value={Avg?.toString()}
                                    keyboardType={'number-pad'}
                                    maxLength={5}
                                    // onSubmitEditing={(text) => {
                                    //     NumberFormat_avg()
                                    // }}
                                    // onFocus={() => {
                                    //     if(!AmountFocus){
                                    //        // NumberFormats()
                                    //     }
                                    //     const Am1 = Avg?.replace(/\,/g, '')
                                    //     setAvg(Am1)

                                    //     setNetMonth(false)
                                    // }}
                                    onChangeText={(text) => {
                                        if (text === '') {
                                            setZeroStatus(false)
                                            setAvg('')
                                        }
                                        else if (Number(text) == 0) {
                                            setAvg('')
                                            setZeroStatus(true)
                                            console.log("number log", text)
                                        }
                                        else if (text[0] === '0') {
                                            console.log("number log", text)
                                        }
                                        else if (/^[^!-\/:-@\.,[-`{-~ ]+$/.test(text) || text === "") {
                                            setAvg(text)
                                            setZeroStatus(false)
                                        }
                                    }
                                    } />
                            </View>
                            {ZeroStatus &&
                                <Text style={{ color: 'red', fontSize: 9, paddingTop: 3, fontFamily: FONTS.FontRegular }}>Amount cannot be ₹0</Text>}
                        </View>
                    </ScrollView>
                    {console.log('878787', Buttons)}
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity style={[styles.buttonView, { backgroundColor: Amount && (Purpose || Month) && Avg ? COLORS.colorB : 'rgba(224, 224, 224, 1)' }]}
                            onPress={() => Amount && (Purpose || Month) && Avg ? ButtonClick() : console.log("hekk")}>
                            <Text style={[styles.continueText, { color: Amount && (Purpose || Month) && Avg ? COLORS.colorBackground : '#979C9E' }]}>{LastPage?'Submit':'Continue'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>)}

            <CreditModal
                visible={ModalVisible}
                setPurpose={setPurpose}
                Purpose={Purpose}
                setModalVisible={setModalVisible}
                onPressOut={() => setModalVisible(!ModalVisible)}
            />


            <ModalSave
                Press={() => {
                    setModalVisible1(false),
                        setModalReason(true)

                }}
                Press1={() => { saveIncomeDetails(), setModalVisible1(false) }}
                ModalVisible={ModalVisible1}
                setModalVisible={setModalVisible1}
                onPressOut={() => {
                    setModalVisible1(false)


                }}
                navigation={navigation} />


            <ReasonModal
                onPress1={() => {
                    updateRejection()
                    // setModalError(true)
                }}
                ModalVisible={ModalReason}
                onPressOut={() => setModalReason(!ModalReason)}
                setModalVisible={setModalReason}
            />

            <CorrectionModal
                visible1={ModalVisibleC}
                onPress1={() =>
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Proceed' }],
                    })}
                //getDLEConfirmation={()=>}
                setModalVisible1={setModalVisibleC}
                onPressOut={() => {
                    getDLEConfirmation(),
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Proceed' }],
                    }), setModalVisibleC(false)
                }}
            />
            <ErrorModal
                ModalVisible={ModalError}
                onPressOut={() => {
                    setModalError(!ModalError)
                    setModalReason(!ModalReason)
                }}
                setModalVisible={setModalError}
                navigation={navigation}
            />

        </SafeAreaProvider>
    )
}

export default IncomeDetailsSpouse;


const styles = StyleSheet.create({
    container1: {
        flex: 0,
        backgroundColor: "#002B59",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    ViewContent: {
        // justifyContent: 'center',
        //  alignItems: 'center',
        flex: 1,
        backgroundColor: COLORS.colorBackground,
        padding: 20
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
    Header: {
        backgroundColor: COLORS.colorB,
        height: 48,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textPrivacy: {
        color: COLORS.colorBackground,
        fontSize: 16,
        fontFamily: FONTS.FontRegular,
        fontWeight: '700',
        marginTop: 10,
        marginBottom: 16,
        left: -5
    },
    textSelect: {
        fontSize: 14,
        color: 'rgba(128, 128, 128, 1)',
        fontFamily: FONTS.FontRegular,
        marginLeft: 15
    },

    TextElect: {
        fontSize: 12,
        color: '#3B3D43',
        fontFamily: FONTS.FontRegular,
        marginTop: 10
    },
    RS: {
        fontSize: 15,
        fontFamily: FONTS.FontRegular,
        left: 5
    },
    continueText: {
        fontSize: 14,
        fontFamily: FONTS.FontBold,
        color: COLORS.colorBackground,
        letterSpacing: 0.64
    },
    mainContainer: {
        flex: 1,
        //paddingHorizontal: 20,
        backgroundColor: COLORS.colorBackground
    },
    buttonView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 54,
        height: 45,
        marginBottom: 0,
        width: width * 0.88,

    },
    SelectBox: {
        backgroundColor: '#FCFCFC',
        borderRadius: 8,
        borderWidth: 1,
        width: width * 0.89,
        height: width * 0.12,
        borderColor: 'rgba(236, 235, 237, 1)',
        alignItems: 'center',
        flexDirection: 'row',
        // justifyContent: 'space-between',
        marginTop: width * 0.02,
        marginBottom: width * 0.02
    },
    SelectBox1: {
        backgroundColor: '#FCFCFC',
        borderRadius: 8,
        borderWidth: 1,
        width: width * 0.89,
        height: width * 0.12,
        borderColor: 'rgba(236, 235, 237, 1)',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: width * 0.02,
        marginBottom: width * 0.02
    },
    textSelect: {
        fontSize: 14,
        color: 'rgba(128, 128, 128, 1)',
        fontFamily: FONTS.FontRegular,
        marginLeft: 10
    },

    containerBox: {
        borderWidth: 1,
        borderColor: COLORS.colorBorder,
        marginTop: 5,
        flexDirection: 'row',
        backgroundColor: COLORS.colorBackground,
        shadowColor: 'rgba(0, 0, 0, 0.4)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        elevation: 10,
        shadowRadius: 7,
        borderRadius: 8,
        paddingRight: 12,
        paddingLeft: 15,
        paddingTop: 12,
        paddingBottom: 14,
        marginBottom: 10
    },
    circleView: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(158, 200, 148, 1)',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    shortText: {
        fontSize: 18,
        fontFamily: FONTS.FontSemiB,
        color: COLORS.colorBackground,

    },
    nameText: {
        fontSize: 14,
        fontFamily: FONTS.FontSemiB,
        color: COLORS.colorDark,
    },
    underText: {
        fontSize: 12,
        fontFamily: FONTS.FontRegular,
        color: COLORS.colorDark,
    },
    dateText: {
        fontSize: 12,
        fontFamily: FONTS.FontRegular,
        color: COLORS.colorDark,
        marginLeft: 5
    },
})