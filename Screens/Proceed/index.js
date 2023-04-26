import React, { useState,useCallback } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    StatusBar,
    Dimensions,
    BackHandler
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

import Proceeds from './Components/Proceed';
import ExitModal from './Components/ExitModal';
import { COLORS, FONTS } from '../../Constants/Constants';
import Statusbar from '../../Components/StatusBar';
import Header from '../../Components/Header';

const Proceed = ({ navigation, }) => {

    const isDarkMode = true
 
    const [ModalVisible,setModalVisible] = useState(false)

    const handleGoBack = useCallback(() => {
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
 
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container1} />
            <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

            <Header navigation={navigation} onPress={handleGoBack} />

            <View style={styles.ViewContent}>
                <Proceeds navigation={navigation} />
            </View>

            <ExitModal
                ModalVisible={ModalVisible}
                onPressOut={() => {
                  setModalVisible(!ModalVisible)
                }}
                setModalVisible={setModalVisible}
                navigation={navigation} 
            />

        </SafeAreaProvider>
    )
}

export default Proceed;

const styles = StyleSheet.create({
    container1: {
        flex: 0,
        backgroundColor: "#002B59",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    ViewContent: {
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