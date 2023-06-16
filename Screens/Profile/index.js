import React, { useState, useEffect } from 'react';
import {
    StatusBar,
    Platform,
    StyleSheet,
    SafeAreaView,
    View,
    FlatList,
    ScrollView,
    BackHandler,
    ToastAndroid
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Statusbar from '../../Components/StatusBar';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import NetWorkError from '../NetWorkError';
import { NetworkInfo } from 'react-native-network-info';
import DeviceInfo from 'react-native-device-info';
// ----------------- Components Imports -----------------------
import { FONTS, COLORS } from '../../Constants/Constants';
import HeaderDashBoard from '../../Components/HeaderDashBoard';
import BottomTabs from './Components/BottomTab';
import ItemTabs from './Components/ItemTab';
import { api } from '../../Services/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ------- Image Imports --------------------
import ModalExitApp from '../../Components/ModalExitApp';
import { useFocusEffect } from '@react-navigation/native';
import Activity from './assets/Activity.svg';
import Calendar from './assets/Calendar.svg';
import Collect from './assets/Collect.svg';
import Dashboard from './assets/a.svg';
import NewLead from './assets/NewLead.svg';
import NewUser from './assets/NewUser.svg';
import CallModal from './Components/Modal';
import { useNetInfo } from "@react-native-community/netinfo";
const Profile = ({ navigation }) => {

    const { t } = useTranslation();
    const dispatch = useDispatch()
    const netInfo = useNetInfo();
    const [notificationCountHeader, setNotificationCountHeader] = useState()
    const [notificationCount, SetNotificationCount] = useState()
    const [modalExitAppVisible, setModalExitAppVisible] = useState(false);
    const [custID, setCustId] = useState('')
    const [fcmToken, setFcmToken] = useState()
    const [mobileNumber, setMobileNumber] = useState('')
    const [id, setId] = useState(null)
    const [IpAddress, setIPAddress] = useState()
    useEffect(() => {
        AsyncStorage.getItem("CustomerId").then((value) => {
            setCustId(value)
            HomeScreenApiCall(value)
        })
        AsyncStorage.getItem("fcmToken").then((value) => {
            setFcmToken(value)
        })
    }, [])

    useEffect(() => {
        if (fcmToken) {
            firebaseTokenSentTo()
            console.log("agentid pass",custID)
        }
    }, [fcmToken])



    const [ModalCall, setModalCall] = useState(false)
    const isDarkMode = true;
    const DATA = [
        {
            id: '1',
            title: t('common:Activity'),
            image: <Activity />,
            notification: true,
        },
        {
            id: '2',
            title: t('common:Calendar'),
            image: <Calendar />,
            notification: false,
        },
        {
            id: '3',
            title: t('common:NewLead'),
            image: <NewLead />,
            notification: false,
        },
        {
            id: '4',
            title: t('common:NewCGT'),
            image: <NewUser />,
            notification: false,
        },

        {
            id: '5',
            title: t('common:Collect'),
            image: <Collect width={50} height={40} />,
            notification: true,
        },
        {
            id: '6',
            title: 'Dashboard',
            image: <Dashboard />,
            notification: false,
        },
    ];

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            dispatch({
                type: 'SET_SELECTED_CUSTOMERLIST',
                payload: [],
            });
            dispatch({
                type: 'SET_SELECTED_CUSTOMERID',
                payload: [],
            });
        });
        return unsubscribe;
    }, [navigation]);


    // ------------------ HomeScreen Api Call Start ------------------
    const HomeScreenApiCall = async (value) => {
        console.log("inside api call")
        const data = {
            "employeeId": custID ? Number(custID) :Number(value)
        };
        await api.homeScreenApi(data).then((res) => {
            console.log('-------------------res', res?.data)
            SetNotificationCount(res?.data?.body)
        })
            .catch((err) => {
                console.log('-------------------err notification', err)
            })
    };
    // ------------------ HomeScreen Api Call End ------------------

    // ------------------ HomeScreen Api Call Start ------------------
    const firebaseTokenSentTo = async () => {
        console.log("inside api call")
        const data = {
             "agentId":Number(custID),
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
    // ------------------ HomeScreen Api Call End ------------------
  
    useEffect(() => {
        
        getData()
        NetworkInfo.getIPV4Address().then(ipv4Address => {
            console.log(ipv4Address);
            setIPAddress(ipv4Address)
        });
        // Get IPV4 Address End --------------------------

        // Get DeviceInfo start-----------------------
        DeviceInfo.getUniqueId().then((uniqueId) => {
            console.log('----------------- device id print', uniqueId)
            getHomeCheck(uniqueId)
        });

        console.log("call api")
    }, []);

    const getData = async () => {
        try {
            const lang = await AsyncStorage.getItem('CallActivity')
            const mobileNumber = await AsyncStorage.getItem('Mobile');
            setMobileNumber(mobileNumber)
            console.log(lang, '--------------')
            if (lang !== null) {
                console.log("no modal data inside")
                setId(lang)
                setModalCall(true)
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

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
         
            AsyncStorage.getItem("CustomerId").then((value) => {
                setCustId(value)
                HomeScreenApiCall(value)
            })
            AsyncStorage.removeItem('DATECGT')
        });
        return unsubscribe;
    }, []);


    const getHomeCheck = async (deviceiD) => {
        console.log("inside api call")
        const data = {
            "id": custID,
            "mobNumber": mobileNumber,
            "simId":deviceiD,
            "deviceId": deviceiD,
            "deviceIpAddress": IpAddress
        }
        console.log("data of home", data)
        await api.gethomeScreenDeviceCheck(data).then((res) => {
            if(res?.data?.body?.newDevice == true){
                 AsyncStorage.removeItem('Token')
                AsyncStorage.removeItem('CustomerId')
                AsyncStorage.removeItem('Mobile')
                AsyncStorage.removeItem('userName')
                ToastAndroid.show("Hi Athira, We have noticed that you are signing in from a new device", ToastAndroid.SHORT);
                setTimeout(()=>{
                    navigation.reset({
                        index: 0,
                        routes: [{name: 'LoginScreen'}],
                    });
                    
                },10000)
           
            }
            console.log('-------------------res check', res?.data)

        })
            .catch((err) => {
   
          
                console.log('-------------------err notification check', err)
            })
    };


    return (
        <>
            {netInfo.isConnected
                ?
                <SafeAreaProvider>
                    <SafeAreaView style={styles.container1} />
                    <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={"#002B59"} />

                    <HeaderDashBoard navigation={navigation} notificationCounts={notificationCount} />

                    <View style={styles.container2}>
                        <ScrollView showsVerticalScrollIndicator={false}>

                            <FlatList
                                data={DATA}
                                renderItem={({ item, index }) =>
                                    <ItemTabs
                                        index={index}
                                        id={item.id}
                                        title={item.title}
                                        image={item.image}
                                        notificationCounts={notificationCount}
                                        notification={item.notification}
                                        navigation={navigation} />}
                                keyExtractor={item => item.id}
                                horizontal={false}
                                numColumns={2}

                                columnWrapperStyle={{ justifyContent: 'space-between' }}
                                contentContainerStyle={{ padding: 20, }}
                            />
                            {/* <Text style={{ color: 'black', textAlign: 'center' }} onPress={() => {
                        navigation.navigate('PinScreen')

                    }}>Existing UserFlow</Text> */}

                        </ScrollView>
                    </View>
                    <BottomTabs navigation={navigation} />
                    <ModalExitApp
                        ModalVisible={modalExitAppVisible}
                        onPressOut={() => setModalExitAppVisible(!modalExitAppVisible)}
                        setModalExitAppVisible={setModalExitAppVisible}
                    />

                   <CallModal
                        id={id}
                        ModalVisible={ModalCall}
                        onPressOut={() => {
                            setModalCall(!ModalCall),
                                navigation.navigate('Profile')
                        }}
                        setModalVisible={setModalCall}
                    /> 
                </SafeAreaProvider> : <NetWorkError setModalCall={false} />}
        </>
    );
}

const styles = StyleSheet.create({
    container1: {
        flex: 0,
        backgroundColor: "#002B59",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    container2: {
        flex: 1,
        backgroundColor: COLORS.colorBackground,

        //justifyContent: 'center',
    },

})

export default Profile;