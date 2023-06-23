import {
    StyleSheet,
    Text,
    View,
    BackHandler,
    StatusBar,
    SafeAreaView,
    Platform,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'
import React, { useCallback, useState, useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { useNetInfo } from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';

// ----------------- Component Import --------------------
import Statusbar from '../../Components/StatusBar';
import Header from '../../Components/RepayHeader';
import { FONTS, COLORS } from '../../Constants/Constants';
import TrustModal from './Components/TrustModal';
import { api } from '../../Services/Api';
import NetWorkError from '../NetWorkError';
import CGTCompleted from './Components/CGTCompleted'

// --------------- Image Import -------------------
import Date from '../CGTCustomer/Images/Date.svg';
import Plus from '../../assets/image/Plus.svg';
import CGTstatus from '../../Components/CGTstatus';

const { height, width } = Dimensions.get('screen');

const CreateTrustCircle = ({ navigation, route }) => {

    const isDarkMode = true;
    const netInfo = useNetInfo();

    const [ModalVisible, setModalVisible] = useState(false)
    const [ModalVisible1, setModalVisible1] = useState(false)
    const [ModalVisible2, setModalVisible2] = useState(false)
    const [ModalVisible3, setModalVisible3] = useState(false)
    // --------- Redux State -------------------------------------
    const customerList = useSelector(state => state.customerList);
    
    const customerID = useSelector(state => state.customerID);
   // const cgtCustomerDetails = useSelector(state => state.cgtCustomerDetails);
    const dispatch = useDispatch()
    const [custID, setCustId] = useState('')
    const [minLimit, setMinLimit] = useState()
    const [maxLimit, setMaxLimit] = useState()
    const [cgtCustomerDetails,setcgtCustomerDetails] = useState()
    const [tcmember,settcmember] = useState()
    const [customerList2, setCustomerList2] = useState()
    const activityId = useSelector(state => state.activityId);
    const cgtactivity = useSelector(state => state.cgtactivity);
    const [detstatus, setdetstatus] = useState(true);
    const [tcstatus, settcstatus] = useState(true);
    const [createtcstatus, setcreatetcstatus] = useState(false);
    const handleGoBack = useCallback(() => {
        setModalVisible2(true)
       // navigation.navigate('CGT')// -----> Todo back navigation with activity ID
        return true; // Returning true from onBackPress denotes that we have handled the event
    }, [navigation]);

    String.prototype.replaceAt = function (index, replacement) {
        return this.substring(0, index) + replacement + this.substring(index + replacement.length);
    }

    useFocusEffect(
        React.useCallback(() => {
            BackHandler.addEventListener('hardwareBackPress', handleGoBack);
            return () =>
                BackHandler.removeEventListener('hardwareBackPress', handleGoBack);
        }, [handleGoBack]),
    );

    useEffect(() => {
        AsyncStorage.getItem("CustomerId").then((value) => {
            setCustId(value)
            getDetails()
            
        })
    
    }, [])

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
console.log('focus==========')
getDetails()

        });
     
        return unsubscribe;
    }, [navigation]);
    


    useEffect(() => {
        getTCLimitDetails()
        getTclist()
        getAllTrustCircleMembers()
        console.log('++++++=======',customerList,'==========+++++++++++',cgtactivity?.mobileNumber)
    }, [customerList, customerID])


    const getDetails = async () => {
        const data = {
            "activityId": activityId
        };
        await api.getCGTDetails(data).then((res) => {
            console.log('-------------------res123 crt', res)
            setcgtCustomerDetails(res?.data?.body)
            getDLEschedule(res?.data?.body?.primaryCustomerId)
            getAllTrustCircleMembers()
            setdetstatus(false)
        })
            .catch((err) => {
               setdetstatus(false)
                console.log('-------------------err123 crt', err?.response)
            })
    };



    const getAllTrustCircleMembers = async () => {
        const data = {
            "activityId": activityId
        };
        await api.getAllTrustCircleMembers(data).then((res) => {
            console.log('-------------------getAllTrustCircleMembers', res)
            settcstatus(false)
            settcmember(res?.data?.body)
            // getDLEschedule(res?.data?.body?.primaryCustomerId)
        })
            .catch((err) => {
                settcstatus(false)
                console.log('-------------------getAllTrustCircleMembers', err?.response)
            })
    };



    // ------------------ getTCLimitDetails Api Call Start ------------------
    const getTCLimitDetails = async () => {
        await api.getTCLimitCount().then((res) => {
            console.log('-------------------res limit========', res?.data)
            // setTCLimit(res?.data?.body)
            setMinLimit(res?.data?.body?.minimumCount)
            setMaxLimit(res?.data?.body?.maximumCount)
        }).catch((err) => {
            console.log('-------------------err', err?.response)
        })
    };
    // ------------------ HomeScreen Api Call End ------------------

     
    // ------------------ getTCLimitDetails Api Call Start ------------------
    const CreateTrustCircle = async () => {
   
        setcreatetcstatus(true)
        const data = {
            "agentId": Number(custID),
            "primaryCustomerId": cgtCustomerDetails.primaryCustomerId,
            "memberIds": customerID,
        }
        console.log("data create trust circle",data)
        await api.createTrustCircles(data).then((res) => {
            console.log('-------------------res create', res)
            if (res?.status) {
                getDLEschedulestatus()
                setcreatetcstatus(false)
            }
        }).catch((err) => {
            console.log('-------------------err', err)
            setcreatetcstatus(false)
        })
    };
    // ------------------ HomeScreen Api Call End ------------------

    // useEffect(() => {
    //     getDLEschedule()
    //     console.log('------------', customerList)
    // }, [])

    useEffect(() => {
        const state= tcmember?.filter((item,i)=>item?.mobileNumber === cgtCustomerDetails?.mobileNumber)
        const states= tcmember?.filter((item,i)=>item?.mobileNumber !== cgtCustomerDetails?.mobileNumber)
        console.log('------jhjkshjkfherigfh------',tcmember)
        if(state?.length){
            setCustomerList2(states)
            const idData = []
            states?.map((item) => {
                idData.push(item?.id)
            })
            dispatch({
                type: 'SET_SELECTED_CUSTOMERID',
                payload: idData,
            });
        }else{
            setCustomerList2(tcmember)
            const idData = []
            tcmember?.map((item) => {
                idData.push(item?.id)
            })
            dispatch({
                type: 'SET_SELECTED_CUSTOMERID',
                payload: idData,
            });
        }
    }, [cgtactivity,tcmember])

    const getTclist = async () => {
        console.log('api called1234', customerID)
        const data = {
            "employeeId":Number(custID),
            "customerNameOrNumber": "",
            "addedTcIds": [customerID, cgtCustomerDetails?.primaryCustomerId]
        }
        console.log("DATA PRINT", data)
        await api.getCustomerListForTc(data).then((res) => {
            console.log('-------------------res getCustomerListForTc', res)

        }).catch((err) => {
            console.log('-------------------getCustomerListForTc', err?.response)
        })
    };
    // ------------------ HomeScreen Api Call End -----------------------

    // ------------------ get Slot Api Call Start -----------------------
    const getDLEschedule = async (value) => {


        console.log('1=================================')
        const data = {
            "customerId": value,
        };
        await api.getDLEschedule(data).then((res) => {
            console.log('------------------- DLE res123', res)
            dispatch({
                type: 'SET_SELECTED_CUSTOMERLIST',
                payload: res?.data?.body,
            });
            // const idData = []
            // res?.data?.body?.map((item) => {
            //     idData.push(item?.id)
            // })
            // dispatch({
            //     type: 'SET_SELECTED_CUSTOMERID',
            //     payload: idData,
            // });
        }).catch((err) => {
            console.log('-------------------errytttyrtty', err)
        })
    };
    // --------------------------------------------------------------------

        // ------------------ get Slot Api Call Start -----------------------
        const getDLEschedulestatus = async () => {
            const data = {
                "customerId": cgtCustomerDetails?.primaryCustomerId,
            };
            await api.getDLEschedule(data).then((res) => {
                if(res?.data?.body){
                    const setShedule = res?.data?.body?.filter((item) => item?.dleScheduleStatus !== 'Conduct DLE')
                    if (setShedule.length) {
                        setModalVisible(true)
                    } else {
                        setModalVisible3(true)
                    }
                }
            }).catch((err) => {
                console.log('-------------------errytttyrtty', err)
            })
        };
        // --------------------------------------------------------------------

    // ------------------ get Slot Api Call Start ------------------
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

    
    

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container1} />
            <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={"#002B59"} />
            {netInfo.isConnected
                ?
                <>
                    <Header navigation={navigation} name="CGT" back={true} onPress={handleGoBack} />

                  {detstatus? <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, }}>
                    <ActivityIndicator size={30} color={COLORS.colorB} />
                </View> : <View style={styles.mainContainer}>

                        <ScrollView showsVerticalScrollIndicator={false} >

                            {/* --------------------------------- Date Resedule Box  Start--------------------------------------------------------------------------------------------------------------------- */}
                            <View style={styles.boxView}>
                                <View style={styles.contentView}>
                                    <Text style={styles.timeText}>{cgtCustomerDetails?.cgtTime?.slice(0, -3)} PM</Text>
                                    <Text style={styles.dateText}>{cgtCustomerDetails?.cgtDate ? moment(new Date(cgtCustomerDetails?.cgtDate)).format("ddd, DD MMM") : ''}</Text>
                                </View>
                                {/* <TouchableOpacity style={styles.editView} onPress={() => navigation.navigate('NewCgt', { reschedule: cgtCustomerDetails })}> */}
                                <TouchableOpacity style={styles.editView} onPress={() => {
                                  navigation.navigate('SelectCalendar', { selectedData: [activityId], title: 'New CGT' }),
                                AsyncStorage.removeItem('DATECGT')
                        }}>
                                    <Date />
                                    <Text style={styles.changeText}>Reschedule CGT</Text>
                                </TouchableOpacity>
                            </View>
                            {/* --------------------------------- Date Resedule Box  End--------------------------------------------------------------------------------------------------------------------- */}

                            {/* --------------------------------- Customer Details Start--------------------------------------------------------------------------------------------------------------------- */}

                            <View style={[styles.viewCard, { flex: 1, flexDirection: 'row', }]}>

                                <View style={[styles.circleStyle, { backgroundColor: '#6979F8', marginLeft: width * 0.05 }]}>
                                    <Text style={styles.circleText}>{getInitials(cgtCustomerDetails?.customerName)}</Text>
                                </View>


                                <View style={{ flexDirection: 'column', paddingLeft: 12, paddingTop: 5, flex: 1 }}>

                                    <Text style={styles.nameText}>{cgtCustomerDetails?.customerName}</Text>


                                    <View style={{ flexDirection: 'row', }}>
                                        <View style={{ paddingTop: 5, paddingRight: 1 }}>
                                            <Icon1 name="location-outline" color={"black"} />
                                        </View>
                                        <Text style={[styles.idText, { paddingTop: 4 }]}>{cgtCustomerDetails?.pin}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'column', top: -8, alignItems: 'flex-end', marginRight: 14 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon2 name="phone-in-talk-outline" color={"black"} size={15} />
                                        <Text style={[styles.numText, { paddingLeft: 6 }]}>{cgtCustomerDetails?.mobileNumber?.replace(/^.{0}/g, '', " ").slice(-10).replaceAt(3, "X").replaceAt(4, "X").replaceAt(5, "X").replaceAt(6, "X").replaceAt(7, "X")}</Text>
                                    </View>
                                </View>
                            </View>
                            {/* --------------------------------- Customer Details End--------------------------------------------------------------------------------------------------------------------- */}

                            {/* --------------------------------- Trust Circle Members Start--------------------------------------------------------------------------------------------------------------------- */}
                          
                         {
                          tcstatus? <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, }}>
                          <ActivityIndicator size={30} color={COLORS.colorB} />
                      </View>
                          :  <>
                            {customerList2?.length > 0
                                ? <View>
                                    <Text style={styles.Trust}>Trust Circle Members ({customerList2?.length})</Text>
                                </View> : null}

                            {customerList2 && customerList2?.map((item) => {
                               
                               
                                return (
                                    <View style={[styles.viewCard, { flex: 1, flexDirection: 'row', }]}>

                                        <View style={[styles.circleStyle, { backgroundColor: 'green', marginLeft: width * 0.05 }]}>
                                            <Text style={styles.circleText}>{getInitials(item?.customerName ? item?.customerName : item?.name)}</Text>
                                        </View>


                                        <View style={{ flexDirection: 'column', paddingLeft: 12, paddingTop: 5, flex: 1 }}>

                                            <Text style={styles.nameText}>{item?.customerName ? item?.customerName : item?.name}</Text>


                                            <View style={{ flexDirection: 'row', }}>
                                                <View style={{ paddingTop: 5, paddingRight: 1 }}>
                                                    <Icon1 name="location-outline" color={"black"} />
                                                </View>
                                                <Text style={[styles.idText, { paddingTop: 4 }]}>{item?.pin ? item?.pin : item?.villageOrPin}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'column', top: -8, alignItems: 'flex-end', marginRight: 14 }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Icon2 name="phone-in-talk-outline" color={"black"} size={15} />
                                                <Text style={[styles.numText, { paddingLeft: 6 }]}>{item?.mobileNumber?.replace(/^.{0}/g, '', " ").slice(-10).replaceAt(3, "X").replaceAt(4, "X").replaceAt(5, "X").replaceAt(6, "X").replaceAt(7, "X")}</Text>
                                            </View>
                                        </View>
                                    </View>
                                )
                            })}

                            {tcmember?.length > 0 && tcmember?.length <= 4
                                ? <TouchableOpacity style={styles.viewCard} onPress={() => navigation.navigate('ConfirmMembers', { id: route?.params?.customerDetails?.primaryCustomerId })}>

                                    <View style={{ marginLeft: width * 0.05 }}>
                                        <Plus />
                                    </View>
                                    <Text style={styles.AddText}>Add new member</Text>
                                </TouchableOpacity> : null}

                                </>}

                            {/* --------------------------------- Trust Circle Members End--------------------------------------------------------------------------------------------------------------------- */}

                        </ScrollView>

                        {/* --------------------------------- Button Start--------------------------------------------------------------------------------------------------------------------- */}
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            {tcmember?.length > 0
                                ? <TouchableOpacity style={[styles.Button1,
                                { backgroundColor: tcmember?.length >= minLimit ? COLORS.colorB : '#ECEBED' }]} onPress={() => (!createtcstatus  && tcmember?.length >= minLimit) ? CreateTrustCircle() : null}>
                                    {createtcstatus ?   <ActivityIndicator size={20} color={'#fff'} /> : 
                                     <Text style={[styles.text1, { color: tcmember?.length >= minLimit ? COLORS.colorBackground : '#979C9E', paddingLeft: width * 0.02 }]}>Create Trust Circle</Text>

                                    }
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={[styles.Button1, { backgroundColor: COLORS.colorB }]}
                                    onPress={() => navigation.navigate('ConfirmMembers')}
                                >
                                    <Icon name="pluscircleo" size={15} color={"#FFFFFF"} />
                                    <Text style={[styles.text1, { color: COLORS.colorBackground, paddingLeft: width * 0.02 }]}>Add Trust Circle Member</Text>
                                </TouchableOpacity>
                            }

                        </View>

                        {/* --------------------------------- Button End--------------------------------------------------------------------------------------------------------------------- */}

                    </View>}
                </>
                :
                <NetWorkError />
            }

<CGTstatus
                Press={() => {setModalVisible2(false) }}
                Press1={() => {setModalVisible2(false),navigation.navigate('ActivityScreens') }}
                ModalVisible={ModalVisible2}
                setModalVisible={setModalVisible2}
                onPressOut={() => {
                    setModalVisible2(false)
                }}
                navigation={navigation}
            />


            <TrustModal
                ModalVisible={ModalVisible}
                onPressOut={() => {
                    setModalVisible(!ModalVisible)
                    navigation.navigate('DLESchedule', { set: true, customerID: cgtCustomerDetails?.primaryCustomerId })
                }}
                setModalVisible={setModalVisible}
                onPress1={() => {
                    setModalVisible(false)
                    navigation.navigate('DLESchedule', { set: true, customerID: cgtCustomerDetails?.primaryCustomerId })
                }}
            />
            <TrustModal
                ModalVisible={ModalVisible1}
                onPressOut={() => {
                    setModalVisible1(!ModalVisible1)
                }}
                setModalVisible={setModalVisible1}
                onPress1={() => {
                    setModalVisible1(false)
                }}
            />
            <CGTCompleted
                ModalVisible={ModalVisible3}
                onPressOut={() => {
                    setModalVisible3(false)
                }}
                navigation={navigation}
                setModalVisible1={setModalVisible3} 
            />

        </SafeAreaProvider>

    )
}

export default CreateTrustCircle;

const styles = StyleSheet.create({
    container1: {
        flex: 0,
        backgroundColor: "#002B59",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    mainContainer: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: COLORS.colorBackground
    },
    editView: {
        borderRadius: 48,
        backgroundColor: COLORS.colorLight,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 13,
        paddingVertical: 6
    },
    text1: {
        fontFamily: FONTS.FontBold,
        fontSize: 14,
        fontWeight: '700'
    },
    contentView: {
        flexDirection: 'column',
    },
    boxView: {
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.colorBorder,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    timeText: {
        fontSize: 12,
        fontFamily: FONTS.FontSemiB,
        color: COLORS.colorB,
    },
    dateText: {
        fontSize: 14,
        fontFamily: FONTS.FontRegular,
        color: COLORS.colorBlack,
    },
    changeText: {
        fontSize: 12,
        fontFamily: FONTS.FontMedium,
        color: COLORS.colorB,
        paddingLeft: 8
    },
    searchBox: {
        borderWidth: 1,
        borderColor: COLORS.colorBorder,
        borderRadius: 8,
        marginTop: 23
    },
    lineView: {
        borderWidth: 0.9,
        borderColor: COLORS.Gray6,
        backgroundColor: COLORS.Gray6,
        opacity: 0.5,
        marginTop: 13,
        marginBottom: 16
    },
    nameText: {
        fontSize: 12,
        fontFamily: FONTS.FontBold,
        color: COLORS.colorDark,
        fontWeight: '600',
    },
    idText: {
        fontSize: 11,
        fontFamily: FONTS.FontRegular,
        color: COLORS.colorDark,
        paddingTop: 3,
        width: 110
    },
    numText: {
        fontSize: 12,
        fontFamily: FONTS.FontRegular,
        color: COLORS.colorDark,
        fontWeight: '400',
    },
    buttonView: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 54,
        height: 48,
        marginBottom: 20,
        width: '48%'
    },
    continueText: {
        fontSize: 14,
        fontFamily: FONTS.FontBold,
        letterSpacing: 0.64
    },
    boxStyle: {
        paddingHorizontal: 15,
        paddingTop: 12,
        flexDirection: 'row'
    },
    circleStyle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    circleText: {
        fontSize: 18,
        fontFamily: FONTS.FontSemiB,
        color: COLORS.colorBackground,
        fontWeight: '600',
    },
    headTextTitle: {
        fontSize: 13,
        fontFamily: FONTS.FontSemiB,
        color: COLORS.colorDark,
    },
    subText: {
        fontSize: 12,
        fontFamily: FONTS.FontRegular,
        color: COLORS.colorDark,
        paddingTop: 3
    },
    Button1: {
        width: width * 0.87,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.colorB,
        marginTop: 31,
        flexDirection: 'row',
        borderRadius: 40,
        marginBottom: 20
    },
    viewCard: {
        backgroundColor: COLORS.colorBackground,
        width: width * 0.88,
        borderRadius: 6,
        height: width * 0.18,
        marginBottom: width * 0.03,
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        elevation: 2,
        shadowRadius: 7,
        marginLeft: 2,
        marginTop: 10
    },
    NumTexts: {
        color: '#1A051D',
        fontFamily: FONTS.FontRegular,
        fontSize: 12
    },
    Trust: {
        fontSize: 14,
        color: '#1E293B',
        fontFamily: FONTS.FontSemiB,
        paddingTop: width * 0.05,
    },
    AddText: {
        fontSize: 12,
        color: '#1A051D',
        fontFamily: FONTS.FontSemiB,
        paddingLeft: 12
    }
})