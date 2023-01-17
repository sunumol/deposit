import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, SafeAreaView, View, Image, TouchableOpacity, ToastAndroid, Dimensions, BackHandler } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppIntroSlider from 'react-native-app-intro-slider';
import { FONTS } from '../../Constants/Constants';
import Statusbar from '../../Components/StatusBar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import First from './Assets/welcome-1.svg';
import Second from './Assets/welcome-3.svg';
import Third from './Assets/welcome-4.svg';
import Fourth from './Assets/higher-loan-amount.svg';


const slides = [
    {
        key: 1,
        text: 'Offers from \n Multiple Lenders',
        description: 'Option to take loan from Lender\n of your choice',
        // image: resolveAssetSource(first),
        //image: first,
        width: 294,
        height: 280,
        text1: 'Offers from \n Multiple Lenders',
        description1: 'Option to take loan from Lender\n of your choice',
        text2: 'പല വായ്‌പ്പാ ദാതാക്കളിൽ നിന്നുള്ള ഓഫറുകൾ',
        description2:'നിങ്ങളുടെ ഇഷ്ടപ്രകാരം വായ്പ \nതിരഞ്ഞെടുക്കു',
        // image: resolveAssetSource(first),
        // image: require('./Assets/welcome-1.png'),
        // width: Dimensions.get('window').width * 0.8,
        // height: "280",
        paddingTop: 54,
        imageTop: 75,
        commonTop: Dimensions.get('window').height * 0.19
    },
    {
        key: 2,
        text: 'Higher Loan Amount',
        description: ' No need to wait to get higher\n loan amount',
        // image: resolveAssetSource(second),
        
        width: 263,
        height: 257,
        text1: 'Higher Loan Amount',
        description1: ' No need to wait to get higher\n loan amount',
        text2: 'ഉയർന്ന ലോൺ തുക',
        description2: 'താമസം കൂടാതെ ഉയർന്ന വായ്പ ലഭിക്കും',
        // image: resolveAssetSource(second),
        // image:require('./Assets/higher-loan-amount.png'),
        // width: "263",
        // height: "257",
        paddingTop: 74,
        imageTop: 105,
        commonTop: Dimensions.get('window').height * 0.23
    },
    {
        key: 3,
        text: 'Digital with a\n Human Touch',
        description: 'Apply and manage loan on your\n mobile. Doorstep service when\n required',
        // image: resolveAssetSource(third),
    
        width: 271,
        height: 269,
        text1: 'Digital with a\n Human Touch',
        description1: 'Apply and manage loan on your\n mobile. Doorstep service when\n required',
        text2: 'മനുഷ്യ സ്പർശം ഉള്ള ഡിജിറ്റൽ',
        description2: 'എല്ലാ സേവനങ്ങളും നിങ്ങളുടെ\n മൊബൈലിൽ. ആവശ്യം ഉള്ളപ്പോൾ\n വാതിൽ പടി സേവനവും',
        //image: resolveAssetSource(third),
        // image:require('./Assets/welcome-3.png'),
        // width: "271",
        // height: "269",
        paddingTop: 41,
        imageTop: 96,
        commonTop: Dimensions.get('window').height * 0.19
    },
    {
        key: 4,
        text: 'No Time for\n Center Meetings?',
        description: 'No worries! We do not have\n center meetings',
        // image: resolveAssetSource(fourth),
       
        width: 275,
        height: 271,
        text1: 'No Time for\n Center Meetings?',
        description1: 'No worries! We do not have\n center meetings',
        text2: 'സെന്റർ മീറ്റിംഗുകൾക്ക് സമയമില്ലേ?',
        description2: 'വിഷമിക്കേണ്ട! ഞങ്ങൾക്ക്\n സെന്റർ മീറ്റിംഗുകൾ ഇല്ല',
        // image: resolveAssetSource(fourth),
        // image:require('./Assets/welcome-4.png'),
        // width: "275",
        // height: "271",
        paddingTop: 88,
        imageTop: 94,
        commonTop: Dimensions.get('window').height * 0.19
    }
];


const IntroScreens = ({ navigation }) => {
    const { t } = useTranslation();
    const isDarkMode = true
    const [lang, setLang] = useState('')
    const [exitApp, setExitApp] = useState(0);
    const routes = useRoute();

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
    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            handleGoBack,
        );
        return () => backHandler.remove();
    }, [exitApp]);
    const handleGoBack = () => {
        if (routes.name === "IntroScreen") {
            if (exitApp === 0) {
                setExitApp(exitApp + 1);
                console.log("exit app intro", exitApp)
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

    const _renderItem = ({ item, index }) => {
        return (
            <View style={[
                styles.slide, { paddingTop: item.commonTop }]}>

                {index !== 3 ?
                    <TouchableOpacity
                        style={{ position: 'absolute', zIndex: 1000, right: 18, paddingTop: 50, }}
                        onPress={() => navigation.navigate('LoginScreen')}>
                        <Text style={styles.skipStyle}>{t('common:Skip')}</Text>
                    </TouchableOpacity> : null}
                {/* <Welcome width={260} height={260} color={"#000"} /> */}
                {index == 0 ?
                    <First
                        style={{ width: item.width, height: item.height, paddingHorizontal: 33 }}

                        resizeMode="contain"
                    /> :
                    index == 2 ?
                        <Second
                            style={{ width: item.width, height: item.height, paddingHorizontal: 33 }}

                            resizeMode="contain"
                        /> :
                        index == 3 ?
                            <Third
                                style={{ width: item.width, height: item.height, paddingHorizontal: 33 }}

                                resizeMode="contain"
                            /> : <Fourth
                                style={{ width: item.width, height: item.height, paddingHorizontal: 33 }}

                                resizeMode="contain"
                            />}
                {/* <SvgUri
                    width={item.width}
                    height={item.height}
                    uri={item.image.uri}
                    style={{ paddingHorizontal: 33, paddingTop: item.imageTop }}
                /> */}
                <View style={[styles.texView, { paddingTop: Dimensions.get('window').height * 0.06 }]}>
                    <Text style={[styles.text, { lineHeight: lang == "en" ? 30 : 32 }]}>{lang == "en" ? item.text1 : item.text2}</Text>
                </View>
                <View style={styles.descriptionView}>
                    <Text style={styles.description}>{lang == "en" ? item.description1 : item.description2}</Text>
                </View>
            </View>
        );
    }
    const _onDone = () => {

        navigation.navigate('LoginScreen')

    }
    const _renderNextButton = () => {
        return (
            <View style={[styles.buttonCircle, styles.shadowProp]}>
                <Icon
                    name="arrow-right"
                    color="#FFFFFF"
                    size={25}
                />
            </View>
        );
    };

    const _renderDoneButton = () => {
        return (
            <View style={[styles.doneButtonCircle, styles.shadowProp]}>
                <Icon
                    name="check"
                    color="#FFFFFF"
                    size={25}
                />
            </View>
        );
    };

    const _renderPreviousButton = () => {
        return (
            <View style={styles.PreviousButton}>
                <Icon
                    name="arrow-left"
                    color="#003874"
                    size={20}
                />
            </View>
        );
    };
    return (
        <>
            <SafeAreaProvider>
                <SafeAreaView style={styles.container} />
                <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
                <AppIntroSlider
                    renderItem={_renderItem}
                    data={slides}
                    onDone={_onDone}
                    dotStyle={{ backgroundColor: '#E0E0E0', width: 13, height: 13, borderRadius: 11.5, top: -13, }}
                    activeDotStyle={{
                        backgroundColor: '#003874', width: 16, height: 16, borderRadius: 13, top: -13,
                        shadowColor: '#171717',
                        shadowOffset: { width: 0, height: 7 },
                        shadowOpacity: 0.2,
                        shadowRadius: 3,
                        elevation: 2
                    }}
                    renderNextButton={_renderNextButton}
                    renderDoneButton={_renderDoneButton}
                    showPrevButton={true}
                    renderPrevButton={_renderPreviousButton}
                />
            </SafeAreaProvider>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#002B59",
    },
    slide: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: 'white',
    },
    text: {
        color: '#003874',
        textAlign: 'center',
        fontFamily: FONTS.FontBold,
        fontSize: 25,
        fontWeight: '700',
    },
    descriptionView: {
        paddingTop: Dimensions.get('window').height * 0.02,
    },
    description: {
        color: '#828282',
        textAlign: 'center',
        fontFamily: FONTS.FontRegular,
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 19,
        letterSpacing: 0.64
    },
    texView: {
        paddingHorizontal: Dimensions.get('window').width * 0.02,
    },
    buttonCircle: {
        width: 63,
        right: 26,
        top: -20,
        height: 63,
        backgroundColor: '#003874',
        borderRadius: 31.5,
        justifyContent: 'center',
        alignItems: 'center',

    },
    PreviousButton: {
        left: 30,
        width: 61,
        height: 61,
        right: 26,
        top: -20,
        backgroundColor: '#FFFF',
        borderRadius: 30.5,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#F2F2F2',
        borderWidth: 0.5,
    },
    doneButtonCircle: {
        width: 63,
        height: 63,
        right: 26,
        top: -20,
        backgroundColor: '#27AE60',
        borderRadius: 31.5,
        justifyContent: 'center',
        alignItems: 'center',

    },
    skipStyle: {
        color: '#EA4047',
        fontFamily: FONTS.FontRegular,
        fontSize: 14,
        fontWeight: '500',
        right:6
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 7 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        // elevation: 2
    },



});

export default IntroScreens;