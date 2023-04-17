import React, { useState, useEffect,useCallback } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    StatusBar,
    Dimensions,
    BackHandler,
    ToastAndroid
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import ModalExitApp from '../../Components/ModalExitApp';
import { useFocusEffect } from '@react-navigation/native';
// ---------- Components Import --------------------------
import Pin from './Components/Pin';
import { COLORS, FONTS } from '../../Constants/Constants';
import Statusbar from '../../Components/StatusBar';
import Header from '../../Components/Header';

const ForgotPin = ({ navigation, route }) => {

    const routes = useRoute();
    const isDarkMode = true
    const { t } = useTranslation();
    const [modalExitAppVisible, setModalExitAppVisible] = useState(false);
    const [exitApp, setExitApp] = useState(0)

   
    const handleGoBack1 = () => {
        if (routes.name === "ForgotPin") {
            if (exitApp === 0) {
                setExitApp(exitApp + 1);
                // console.log("exit app intro", exitApp)
                ToastAndroid.show("Press back again to exit.", ToastAndroid.SHORT);
            } else if (exitApp === 1) {
                BackHandler.exitApp();
                console.log("exit app else", exitApp)
            }
            setTimeout(() => {
                setExitApp(0)
            }, 3000);
            return true;
        }
    }

    const backAction = () => {
        setModalExitAppVisible(true)
        return true;
    };
    const handleGoBack = useCallback(() => {
        navigation.goBack()
        return true; // Returning true from onBackPress denotes that we have handled the event
    }, [navigation]);

    useFocusEffect(
        React.useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);

            return () => {
                console.log("I am removed from stack")
                BackHandler.removeEventListener("hardwareBackPress", backAction);
            };
        }, [])
    );
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container1} />
            <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

            <Header navigation={navigation} name={t('common:ForgotPin')} onPress={handleGoBack} />
            <View style={styles.ViewContent}>
                <Pin navigation={navigation} conFirmDate={route.params.conFirmdate} />
            </View>

            <ModalExitApp
                ModalVisible={modalExitAppVisible}
                onPressOut={() => setModalExitAppVisible(!modalExitAppVisible)}
                setModalExitAppVisible={setModalExitAppVisible}
            />
        </SafeAreaProvider>
    )
}

export default ForgotPin;


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
    viewHead: {
        marginTop: Dimensions.get('window').height * 0.02,
        marginBottom: 0,
        marginLeft: 21
    }
})