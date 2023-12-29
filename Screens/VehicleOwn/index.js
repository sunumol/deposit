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
import Vehicles from './Components/Vehicles';
import { api } from '../../Services/Api';
import ModalSave from '../../Components/ModalSave';
import ErrorModal from '../DetailedCheck/Components/ErrorModal';
import ReasonModal from '../DetailedCheck/Components/ReasonModal';
import { useSelector } from 'react-redux';




const VehicleOwn = ({ navigation, route }) => {
    // const route = useRoute();
    // console.log("route name",route?.params?.vehicle);
    const isDarkMode = true
    const { t } = useTranslation();
    const [lang, setLang] = useState('')
    const [BStatus, setBstatus] = useState(false)
    const activityId = useSelector(state => state.activityId);
    const [ModalVisible, setModalVisible] = useState(false)
    const [ModalReason, setModalReason] = useState(false)
    const [ModalError, setModalError] = useState(false)
    const [state, setState] = useState(true)
    const [vehicleslist, setvehicleslist] = useState([])
    const [custID, setCustId] = useState('')

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {

            getVehicleDetails()

        });

        return unsubscribe;
    }, []);

    useEffect(() => {
        getData()

        console.log("inside state call")

    }, [])

    const getData = async () => {
        try {
            const lang = await AsyncStorage.getItem('user-language')
            const custID = await AsyncStorage.getItem("CustomerId")
            setCustId(custID)
            setLang(lang)

        } catch (e) {
            console.log(e)
        }
    }

    const handleGoBack = useCallback(() => {

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

    const saveVehicleDetails = async () => {
        console.log('api called124444')

       // const data = [searchvehicledata]
        await api.saveVehicleDetails(data).then((res) => {
            console.log('-------------------res save vehicle', res)
            if (res?.status) {
                setModalVisible(false),
                navigation.navigate('Profile')
            }
        }).catch((err) => {
            console.log('-------------------err save vehicle', err)
        })
    };
    // ------------------ get Conduct DLE basic detail Village Api Call Start ------------------
    const updateRejection = async () => {
        console.log('api called for rejection')
        const data = {
            "activityStatus": 'Submitted wrong data',
            "employeeId": Number(custID),
            "activityId": activityId
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


    const getVehicleDetails = async () => {
        console.log('api called INDEX', activityId)

        const data = {
            "activityId": activityId,

        }
        await api.getVehicleDetails(data).then((res) => {
            console.log('-------------------res getVehicleDetails', res?.data?.body)
            if (res?.data?.body) {
                //  setNumbers(res?.data?.body?.length)
                //let temp = vehicleslist
                // console.log("vehickelost pass",vehicleslist)
                console.log("vehcle api data", res?.data?.body)
                setvehicleslist(res?.data?.body)
                // temp  = temp.concat(res?.data?.body)
                // setvehicleslist([...temp])
            }
        }).catch((err) => {
            console.log('-------------------err getVehicleDetails', err)
        })
    };
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container1} />
            <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={"#002B59"}/>

            <Header name="Vehicles Owned" navigation={navigation} onPress={handleGoBack} />

            <View style={styles.ViewContent}>
                <Vehicles navigation={navigation} vehicle={route?.params?.vehicle} vehicleslist={vehicleslist} />
            </View>



            <ModalSave
                Press={() => {
                    setModalVisible(false),
                        setModalReason(true)

                }}
                Press1={() => { navigation.navigate('Profile'), setModalVisible(false) }}
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
                Press1={()=>saveVehicleDetails()}
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

export default VehicleOwn;


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
    }
})