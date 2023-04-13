import React, { useState, useEffect, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    StatusBar,
    ScrollView,
    Dimensions,
    BackHandler
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FONTS } from '../../Constants/Constants';
import Statusbar from '../../Components/StatusBar';
import Header from '../../Components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { t } from 'i18next';
import Logo from '../../assets/Images/svadhan.svg';

const { height, width } = Dimensions.get('screen');

const AboutUs = ({ navigation }) => {

    const isDarkMode = true;
    const [lang, setLang] = useState('')

    useEffect(() => {
        getData()
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
        navigation.goBack()
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
            <Header navigation={navigation} name={t('common:AboutUs')} onPress={handleGoBack} />

            <ScrollView>
                <View style={styles.ViewContent}>
                    <View style={{ paddingBottom: width * 0.05, alignItems: 'center' }}>
                        <Logo />
                    </View>
                    <Text style={styles.text}>
                        Svadhan is the new face of microfinance. We bring together loans and services of multiple
                        regulated financial institutions into the hands of our customers. Our customers could choose the
                        best offer as per their requirements. All transactions are carried out through Svadhan mobile app,
                        but our representatives are available at your village to support you in case of any service
                        requirements.
                    </Text>
                    <Text style={styles.text}>
                        Svadhan is owned by Dhan Sethu DigiFin (P) Ltd., a company founded by experienced professionals
                        from financial and banking sector.
                    </Text>
                </View>
            </ScrollView>

            <View style={{ alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 0, left: 0, right: 0, marginBottom: width * 0.08 }}>
                <Text style={styles.copy}>2020 Svadhan Technologies. All rights reserved</Text>
            </View>

        </SafeAreaProvider>
    )
}

export default AboutUs;


const styles = StyleSheet.create({
    container1: {
        flex: 0,
        backgroundColor: "#002B59",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    ViewContent: {
        flex: 1,
        paddingTop: 27
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
    },
    copy: {
        fontSize: 12,
        color: "#828282",
        fontFamily: FONTS.FontRegular
    }
})