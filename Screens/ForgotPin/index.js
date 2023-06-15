import React,{useEffect,useState}from 'react';
import {
    StyleSheet,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { api } from '../../Services/Api';
// ---------- Components Import --------------------------
import Pin from './Components/Pin';
import Statusbar from '../../Components/StatusBar';
import Header from '../../Components/Header';


const ForgotPin = ({ navigation }) => {

    const isDarkMode = true
    const { t } = useTranslation();
 


   

    return (
        <SafeAreaProvider>
            
            <SafeAreaView style={styles.container1} />
            <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={"#002B59"}/>

            <Header navigation={navigation} name={t('common:ForgotPin')} onPress={()=>navigation.goBack()}/>
            <Pin navigation={navigation}/>
         
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
})