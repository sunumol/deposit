import React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import Generate from './Components/Generate';
// ---------- Components Import --------------------------

import Statusbar from '../../Components/StatusBar';
import Header from '../../Components/Header';
import { COLORS } from '../../Constants/Constants';

const GeneratePin = ({ navigation }) => {

    const isDarkMode = true
    const { t } = useTranslation();

    return (
        <SafeAreaProvider>
            
            <SafeAreaView style={styles.container1} />
            <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={"#002B59"} />

            <Header navigation={navigation} name={'Generate PIN'} onPress={()=>navigation.goBack()}/>
           <Generate navigation={navigation}/>
         
        </SafeAreaProvider>
    )
}

export default GeneratePin;

const styles = StyleSheet.create({
    container1: {
        flex: 0,
        backgroundColor: "#002B59",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
})