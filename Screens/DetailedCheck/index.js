import React, { useState, useEffect, useCallback } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    StatusBar,
    Dimensions,
    BackHandler,
    ScrollView,
    Platform,
    KeyboardAvoidingView
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector,useDispatch } from 'react-redux';

// -------------- Component Imports ----------------------
import ModalSave from '../../Components/ModalSave';
import ReasonModal from './Components/ReasonModal';
import ErrorModal from './Components/ErrorModal';
import DetailChecks from './Components/DetailChecks';
import { api } from '../../Services/Api';
import { COLORS, FONTS } from '../../Constants/Constants';
import Statusbar from '../../Components/StatusBar';
import Header from '../../Components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailCheck = ({ navigation, route }) => {
    console.log("api correction", route?.params?.isCheck)
    const isDarkMode = true
    const dispatch = useDispatch()

    const [basicdetail, setBasicdetail] = useState('')
    const [ModalVisible, setModalVisible] = useState(false)
    const [ModalReason, setModalReason] = useState(false)
    const [ModalError, setModalError] = useState(false)
    const [villagename, setVillagename] = useState('')
    const [roadstatus, setRoadStatus] = useState('')
    const [postofficename, setPostofficename] = useState('')
    const [landmarkname, setLandmarkname] = useState('')
    const [poststatus, setpoststatus] = useState(false);
    const [villagestatus, setvillagestatus] = useState(false);
    const [backstate, setbackstate] = useState(false);
    const [custID, setCustId] = useState('')
    const [Correct1, setCorrect1] = useState(route?.params?.Correction)

    const activityId = useSelector(state => state.activityId);

    useEffect(() => {
        AsyncStorage.getItem("CustomerId").then((value) => {
            setCustId(value)
        })
        getConductDLEbasicdetail()

    }, [])

    useEffect(() => {
        if (!villagestatus && !poststatus && backstate) {
            console.log('qqqqqq', villagestatus, poststatus)
            setbackstate(false)
        }

    }, [villagestatus, poststatus])


    // ------------------ get Conduct DLE basic detail Village Api Call Start ------------------
    const updateRejection = async () => {
        console.log('api called for rejection')
        const data = {
            "activityStatus": 'Submitted wrong data',
            "employeeId": Number(custID),
            "activityId": activityId
        }
        await api.updateActivity(data).then((res) => {
            console.log('-------------------updateActivity', res)
            setModalError(true)
            setModalReason(false)
            setTimeout(() => {
                navigation.navigate('Profile')
            }, 1000);

        }).catch((err) => {
            console.log('-------------------err get updateActivity', err)
        })
    };
    // ------------------ HomeScreen Api Call End ------------------

    // ------------------ get Conduct DLE basic detail start Api Call Start ------------------
    const getConductDLEbasicdetail = async () => {
        console.log('api called', activityId)
        const data = {
            "activityId": activityId?activityId:route?.params?.activityId
        }
        await api.ConductDLEbasicdetail(data).then((res) => {
            console.log('-------------------res ConductDLEbasicdetail12', res)
            if (res?.status) {
                setBasicdetail(res?.data?.body)
                dispatch({
                    type: "SET_SELECTED_CUSTOMERID_OF_DLE",
                    payload:res?.data?.body?.customerId ,
                });


            }
        }).catch((err) => {
            console.log('-------------------err ConductDLEbasicdetail', err?.response)
        })
    };
    // ------------------ HomeScreen Api Call End ------------------

    // ------------------ get Conduct DLE basic detail Village Api Call Start ------------------
    const onsubmit = async (value) => {

        console.log('api called', villagename)
        const data = {
            "customerId": basicdetail?.customerId,
            "customerName": basicdetail?.customerName,
            "address": basicdetail?.address,
            "district": basicdetail?.district,
            "village": villagename ? villagename : basicdetail?.village,
            "accessRoadType": roadstatus ? roadstatus : basicdetail?.accessRoadType,
            "postOffice": postofficename ? postofficename : basicdetail?.postOffice,
            "landMark": landmarkname ? landmarkname : basicdetail?.landMark,
            "pin": basicdetail?.pin
        }
        await api.savebasicdetail(data).then((res) => {
            console.log('-------------------res update', res,landmarkname)
            if (res?.status) {
                navigation.navigate('Profile')
            }
        }).catch((err) => {
            console.log('-------------------err update', err?.response)
        })
    };

    const handleGoBack = useCallback(() => {
        console.log('hhhhh', villagestatus, poststatus)
        setvillagestatus(false)
        setpoststatus(false)
        setbackstate(true)
        if (!villagestatus && !poststatus) {
            setModalVisible(true)
        }

        return true; // Returning true from onBackPress denotes that we have handled the event
    }, [navigation, villagestatus, poststatus, backstate]);

    useFocusEffect(
        React.useCallback(() => {
            BackHandler.addEventListener('hardwareBackPress', handleGoBack);
            return () =>
                BackHandler.removeEventListener('hardwareBackPress', handleGoBack);
        }, [handleGoBack]),
    );

    return (
        <SafeAreaProvider>

            <SafeAreaView style={styles.container1} />
            <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={"#002B59"} />

            <Header name="Detailed Eligibility Check" navigation={navigation} onPress={handleGoBack} />

            <ScrollView showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={"handled"}
             style={styles.ViewContent}>
                <DetailChecks
                    navigation={navigation}
                    details={basicdetail}
                    isCheck={route?.params?.isCheck}
                    setVillagename1={setVillagename}
                    setPostoffice1={setPostofficename}
                    setLandmarkname1={setLandmarkname}
                    setRoadStatus1={setRoadStatus}
                    setpoststatus={setpoststatus}
                    setvillagestatus={setvillagestatus}
                    setbackstate={backstate}
                    Correction={Correct1}
                    activityIds={route?.params?.activityId}
                />
            </ScrollView>

            <ModalSave
                Press={() => {
                    setModalVisible(false),
                        setModalReason(true)
                }}
                Press1={() => { onsubmit(), setModalVisible(false) }}
                ModalVisible={ModalVisible}
                setModalVisible={setModalVisible}
                onPressOut={() => {
                    setModalVisible(false)
                }}
                navigation={navigation}
            />

            <ReasonModal
                onPress1={() => {
                    updateRejection()
                }}
                ModalVisible={ModalReason}
                onPressOut={() => setModalReason(!ModalReason)}
                setModalReason={setModalReason}
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

export default DetailCheck;

const styles = StyleSheet.create({
    container1: {
        flex: 0,
        backgroundColor: "#002B59",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    ViewContent: {
        flex: 1,
        backgroundColor: COLORS.colorBackground,
        paddingLeft: 20,
        paddingRight: 20
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
    }
})