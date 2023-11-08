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
import { COLORS, FONTS } from '../../Constants/Constants';
import Statusbar from '../../Components/StatusBar';
import Header from '../../Components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Details from './Components/Details';
import { api } from '../../Services/Api';
import { useSelector } from 'react-redux';
import ModalSave from '../../Components/ModalSave';
import ErrorModal from './Components/ErrorModal';
import ReasonModal from './Components/ReasonModal';
import { useDispatch } from 'react-redux';

const CustomerDetails = ({ navigation, }) => {
    const route = useRoute();
    console.log("route name",);
    const isDarkMode = true
    const dispatch = useDispatch()
    const { t } = useTranslation();
    const [lang, setLang] = useState('')
    const [BStatus, setBstatus] = useState(false)
    const [basicdetail, setBasicdetail] = useState('')
    const [spousedetail, setSpousedetail] = useState('')
    const [ModalVisible, setModalVisible] = useState(false)
    const [ModalReason, setModalReason] = useState(false)
    const [ModalError, setModalError] = useState(false)
    const activityId = useSelector(state => state.activityId);
    const [custID, setCustId] = useState('')

    useEffect(() => {
        getData()
        AsyncStorage.getItem("CustomerId").then((value) => {
            setCustId(value)
        })
        getConductDLEbasicdetail()
        console.log('ASDFDFD=====???', activityId)
    }, [])

    const getData = async () => {
        try {
            const lang = await AsyncStorage.getItem('user-language')
            setLang(lang)

        } catch (e) {
            console.log(e)
        }
    }


    const handleGoBack = useCallback(() => {
        console.log('handle---------')
        // navigation.goBack()
        setModalVisible(true)
        return true; // Returning true from onBackPress denotes that we have handled the event
    }, [navigation]);

    useFocusEffect(
        React.useCallback(() => {
            BackHandler.addEventListener('hardwareBackPress', handleGoBack);

            return () =>

                BackHandler.removeEventListener('hardwareBackPress', handleGoBack);
        }, [handleGoBack]),
    );

    // ------------------ get Conduct DLE basic detail Village Api Call Start ------------------
    const updateRejection = async () => {
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ custmer details')
        const data = {
            "activityStatus": 'Submitted wrong data',
            "employeeId":Number(custID),
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
            console.log('-------------------err get Village', err)
        })
    };
    // ------------------ HomeScreen Api Call End ------------------

    // ------------------ get Conduct DLE basic detail start Api Call Start ------------------
    const getConductDLEbasicdetail = async () => {
        console.log('api called')
        const data = {
            "activityId": activityId

        }
        await api.ConductDLEbasicdetail(data).then((res) => {
            console.log('-------------------res ConductDLEbasicdetail======????', res)
            if (res?.status) {
                setBasicdetail(res?.data?.body)
            }
        }).catch((err) => {
            console.log('-------------------err ConductDLEbasicdetail', err?.response)
        })
    };
    // ------------------ HomeScreen Api Call End ------------------


    const getResidenceowner = async () => {


        console.log('getResidenceowner api called')
            const data = {
                "activityId": activityId
               
            }
            await api.getResidenceowner(data).then((res) => {
                console.log('-------------------res Residence owner', res?.data?.body)
                if (res?.status) {
                    navigation.navigate('Profile')
             
                  
                }
            }).catch((err) => {
                console.log('-------------------err Residence Owner', err?.response)
            })
        };
    

    useEffect(() => {
        getSpousedetail()
    }, [])


    const onsubmit = async (value) => {
        getResidenceowner()
        console.log('api called')
        const data = {
            "customerId": basicdetail?.customerId,
            "customerName": basicdetail?.customerName,
            "address": basicdetail?.address,
            "district": basicdetail?.district,
            "village": basicdetail?.village,
            "accessRoadType": basicdetail?.accessRoadType,
            "postOffice": basicdetail?.postOffice,
            "landMark": basicdetail?.landMark,
            "pin": basicdetail?.pin
        }
        console.log("details check details", data)
        await api.savebasicdetail(data).then((res) => {
            console.log('-------------------res update', res?.data)
            if (res?.status) {
                dispatch({
                    type: 'SET_DLE_STATUS',
                    payload: true
                });
                navigation.navigate('Profile')
                setModalVisible(false)
            }
        }).catch((err) => {
            console.log('-------------------err update', err?.response)
        })
    };

    // ------------------ get spouse det Api Call Start ------------------
    const getSpousedetail = async () => {
        console.log('api called')
        const data = {
            "activityId": activityId

        }
        await api.getSpousedetail(data).then((res) => {
            console.log('-------------------res spousedetail', res)
            if (res?.status) {
                setSpousedetail(res?.data?.body)
            }
        }).catch((err) => {
            console.log('-------------------err spousedetail', err?.response.status)
        })
    };
    // ------------------ HomeScreen Api Call End ------------------

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container1} />
            <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={"#002B59"} />

            <Header name="Detailed Eligibility Check" navigation={navigation} onPress={handleGoBack} />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.ViewContent} >
            {/* <View style={styles.ViewContent}> */}
                <Details navigation={navigation} details={basicdetail} spouse={spousedetail} />
            {/* </View> */}
            </ScrollView>


            <ModalSave
                Press={() => {
                    setModalVisible(false),
                        setModalReason(true)

                }}
                Press1={() => { onsubmit(),getResidenceowner() }}
                ModalVisible={ModalVisible}
                setModalVisible={setModalVisible}
                onPressOut={() => {
                    setModalVisible(false)


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

export default CustomerDetails;


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
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20
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