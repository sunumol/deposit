import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, PermissionsAndroid } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import PushNotification from "react-native-push-notification";
import { useDispatch } from 'react-redux';

// --------------- Component Imports ---------------------
import CustomStatusBar from './Component/CustomStatusbar';
import Statusbar from '../../Components/StatusBar';
import LinearGradient from 'react-native-linear-gradient';
import VersionModal from './Component/VersionModal';
import UpdateModal from './Component/UpdateModal';
import SplashScreen from 'react-native-splash-screen'

const SplashScreen2 = ({ navigation }) => {

    const isDarkMode = true;
    const dispatch = useDispatch()
    const [ModalVisible1, setModalVisible1] = useState(false)
    const [ModalVisible2, setModalVisible2] = useState(false)

    const onBackGroundNotification = () => {
        messaging().onMessage(async (remoteMessage) => {
            const { messageId, notification } = remoteMessage;
            PushNotification.configure({
                // (optional) Called when Token is generated (iOS and Android)
                onRegister: (token) => {
                    console.log("TOKEN:", token, "----------------", remoteMessage);
                },
                // (required) Called when a remote is received or opened, or local notification is opened
                onNotification: (notification) => {
                    console.log("NOTIFICATION:", notification);
                    if (notification?.title !== "DATA_CONFIRMATION" || notification?.title !== "DATA_CORRECTION_REQUEST")
                        PushNotification.localNotification({
                            channelId: "MDChannelID",
                            messageId: messageId,
                            title: notification.title,
                            message: notification.body,
                            playSound: true,
                            soundName: "default",
                            vibrate: true,
                        });
                        if (notification?.title){
                            dispatch({
                              type: 'SET_NOTIFICATION_COUNT',
                              payload: '1',
                          });
                          }

                    if (notification?.title === 'DATA_CONFIRMATION') {
                        dispatch({
                            type: 'SET_CGT_ACTIVITY_ID',
                            payload:notification?.data?.activityId ,
                        });
                        setTimeout(() =>
                            navigation.navigate('Proceed', { status: true, AcyivityId: notification?.data?.activityId })
                            , 3000);
                    }
                    if (notification?.title === 'DATA_CORRECTION_REQUEST') {
                        dispatch({
                            type: 'SET_CGT_ACTIVITY_ID',
                            payload:notification?.data?.activityId ,
                        });
                        setTimeout(() =>
                            navigation.navigate('CorrectionScreen', { AcyivityId: notification?.data?.activityId })
                            , 3000);
                    }
                },

                onRegistrationError: (err) => {
                    console.error(err?.message, err);
                },

                permissions: {
                    alert: true,
                    badge: true,
                    sound: true,
                },
                popInitialNotification: false,
                requestPermissions: true,
            });
        });
        messaging().onNotificationOpenedApp((remoteMessage) => {
                 dispatch({
                type: 'SET_CGT_ACTIVITY_ID',
                payload:remoteMessage?.data?.activityId,
            });
            console.log(
                "Notification caused app to open from background state:66",
                remoteMessage?.notification?.data
            );
            console.log(
                "Notification caused app to open from background state:6322",
                remoteMessage?.data?.activityId
            );
            if (remoteMessage?.notification?.title === 'DATA_CONFIRMATION') {
                setTimeout(() =>
                    navigation.navigate('Proceed', { status: true, AcyivityId: remoteMessage?.data?.activityId })
                    , 3000);
            }
            if (remoteMessage?.notification?.title === 'DATA_CORRECTION_REQUEST') {
                setTimeout(() =>
                    navigation.navigate('CorrectionScreen', { AcyivityId: remoteMessage?.data?.activityId })
                    , 3000);
            }


        });

        messaging().setBackgroundMessageHandler(async remoteMessage => {
            console.log('Message handled in the background!', remoteMessage);
          });

        messaging()
            .getInitialNotification()
            .then((remoteMessage) => {
                if (remoteMessage) {
                    console.log(
                        "Notification caused app to open from quit state:",
                        remoteMessage?.notification
                    );

                    if (remoteMessage?.notification?.title === 'DATA_CONFIRMATION') {
                        setTimeout(() =>
                            navigation.navigate('Proceed', { status: true, AcyivityId: remoteMessage?.notification?.data?.activityId })
                            , 3000);
                    }
                    if (remoteMessage?.notification?.title === 'DATA_CORRECTION_REQUEST') {
                        setTimeout(() =>
                        navigation.navigate('CorrectionScreen', { AcyivityId: remoteMessage?.notification?.data?.activityId })
                            , 3000);
                    }

                } else {
                    setTimeout(() => getData(), 3000);
                }
            });
    };

    useEffect(() => {
        onBackGroundNotification()
    }, []);

    useEffect(() => {
        SplashScreen.hide();
      }, []);

    const getData = async () => {
        try {
            const Token = await AsyncStorage.getItem('Token')
            const user = await AsyncStorage.getItem('userName')
            console.log('--------Token', Token, user)
            if (Token) {
                isGrantedPermissions()
            } else {
                navigation.navigate('LoginScreen')
            }
        } catch (e) {
            console.log(e)
        }
    }

    const isGrantedPermissions = async () => {
        const camera = await PermissionsAndroid?.check(PermissionsAndroid?.PERMISSIONS?.CAMERA)
        const Location = await PermissionsAndroid?.check(PermissionsAndroid?.PERMISSIONS?.ACCESS_FINE_LOCATION)
        if (camera && Location) {
            const Pin = await AsyncStorage.getItem('Pin')
            const PinDate = await AsyncStorage.getItem('PinDate')
            const ExpiredDate = await AsyncStorage.getItem('ExpiredDate')
            console.log(Pin, PinDate, ExpiredDate)
            if (Pin && PinDate) {
                navigation.navigate('PinScreen')
            } else {
                navigation.navigate('CreatePin')
            }
        } else {
            navigation.navigate('Permission')
        }
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container} />
            <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={'#002B59'} />

            <LinearGradient colors={['#003874', '#6034B7']} start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} style={{ justifyContent: 'center', flex: 1 }}>
                <CustomStatusBar
                    barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                />

            </LinearGradient>
            <VersionModal
                ModalVisible={ModalVisible1}
                navigation={navigation}
                onPressOut={() => setModalVisible1(!ModalVisible1)}
                setModalVisible2={setModalVisible1} />

            <UpdateModal
                ModalVisible={ModalVisible2}
                navigation={navigation}
                onPressOut={() => setModalVisible2(!ModalVisible2)}
                setModalVisible2={setModalVisible2} />
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#002B59",
        color: "white"
    },
});

export default SplashScreen2;