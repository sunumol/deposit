import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    PermissionsAndroid,
    StatusBar,
    BackHandler,

} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from 'react-native-geolocation-service';
import { useNavigationState } from '@react-navigation/native';
// ----------------- Component Import ---------------------
import { COLORS, FONTS } from '../../Constants/Constants';
import Statusbar from '../../Components/StatusBar';
import Header2 from '../../Components/Header2';
import ModalExitApp from '../../Components/ModalExitApp';
// ---------------- Image Import ----------------------------
import File from './assets/file.svg';
import Camera from './assets/cam.svg';
import Location from './assets/loc.svg';
import SMS from './assets/sms.svg';
import Micro from './assets/mic.svg';
import ToastModal from '../../Components/ToastModal';
import { useFocusEffect } from '@react-navigation/native';

const Data = [
    {
        id: "1",
        title1: "Phone storage",
        description1: "Will be used to store and upload documents",
        title2: "ഫോൺ സംഭരണം",
        description2: "പ്രമാണങ്ങൾ സംഭരിക്കുന്നതിനും അപ് ലോഡ് ചെയ്യുന്നതിനും ഉപയോഗിക്കപ്പെടും",
        width: 18,
        height: 16,
    },
    {
        id: "2",
        title1: "Camera",
        description1: "Will be used to take photos and for video calls",
        title2: "ക്യാമറ",
        description2: "ഫോട്ടോ എടുക്കുന്നതിനും വീഡിയോ കോളുകൾക്കും ഉപയോഗിക്കപ്പെടും",
        width: 18,
        height: 16,
    },
    {
        id: "3",
        title1: "Location",
        description1: "Will be used to verify location",
        title2: "സ്ഥാനം",
        description2: "സേവന ലഭ്യത പരിശോധിക്കാൻ ഉപയോഗിക്കപ്പെടും",
        width: 16,
        height: 18.11,
    },
    {
        id: "4",
        title1: "Microphone",
        description1: "Will be used for audio/video calls",
        title2: "മൈക്രോഫോൺ",
        description2: "ഓഡിയോ/വീഡിയോ കോളുകൾക്കായി ഉപയോഗിക്കപ്പെടും",
        width: 14,
        height: 19,
    },
    {
        id: "5",
        title1: "SMS",
        description1: "Will be used to read SMS related to transactions",
        title2: "എസ് എം എസ്",
        description2: "ഇടപാടുകളുമായി ബന്ധപ്പെട്ട എസ് എം എസ് വായിക്കാൻ ഉപയോഗിക്കപ്പെടും",
        width: 18,
        height: 18,
    },

]
const Permission = ({ navigation }) => {

    const { t } = useTranslation();
    const isDarkMode = true;
    const [lang, setLang] = useState('')
    const [ModalVisible1, setModalVisible1] = useState(false)
    const [exitApp, setExitApp] = useState(0)
    const [modalExitAppVisible, setModalExitAppVisible] = useState(false);
    const index = useNavigationState(state => state.index);
    console.log("index of introscreen", index)
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
    const requestCameraPermission = async () => {

        try {

            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.CAMERA,
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                PermissionsAndroid.PERMISSIONS.READ_SMS,
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,

            ]);

            if (granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED && granted['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED && granted['android.permission.READ_SMS'] === PermissionsAndroid.RESULTS.GRANTED && granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED ) {
                Geolocation.getCurrentPosition(
                    position => {
                        console.log(position);
                        AsyncStorage.setItem('Location', JSON.stringify(position));
                    },
                    error => {
                        // See error code charts below.
                        console.log(error.code, error.message);

                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
                );
                const Pin = await AsyncStorage.getItem('Pin')
                const PinDate = await AsyncStorage.getItem('PinDate')
                if (Pin && PinDate) {
                    navigation.navigate('PinScreen')
                } else {
                    navigation.navigate('CreatePin')
                }
            } else {
                setModalVisible1(true)
            }
        } catch (err) {
            console.warn(err);
        }

    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container1} />
            <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={"#002B59"} />


            <View style={styles.container2}>
                <Header2 navigation={navigation} name={t('common:Permissions')} />

                <ScrollView style={{ flex: 1, marginBottom: 0 }}>

                    <View style={styles.ViewHead}>
                       
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={styles.HeadText}>Please allow us the  </Text>
                                <Text style={styles.HeadText}>following permissions</Text>
                            </View> 
                    </View>
                    {Data.map((item, index) => {
                        return (
                            <View key={index} style={styles.Card}>
                                <View style={{ flex: 1, flexDirection: 'row', marginTop: 10, marginBottom: 20 }}>

                                    {item.id == 1 ?
                                        <File
                                            style={[styles.Image]}
                                            width={item.width}
                                            height={item.height} /> :
                                        item.id == 2 ?
                                            <Camera

                                                style={[styles.Image]}
                                                width={item.width}
                                                height={item.height} /> :
                                            item.id == 3 ?
                                                <Location

                                                    style={[styles.Image]}
                                                    width={item.width}
                                                    height={item.height} /> :
                                                item.id == 4 ?

                                                    <Micro

                                                        style={[styles.Image]}
                                                        width={item.width}
                                                        height={item.height} /> :
                                                    <SMS

                                                        style={[styles.Image]}
                                                        width={item.width}
                                                        height={item.height} />}

                                    <View style={{ flex: 1, flexDirection: 'column', paddingHorizontal: 15.5, }}>
                                        <Text style={styles.title}>{item.title1}</Text>
                                        <Text style={[styles.Desc, { fontSize: lang == 'en' ? 12 : 10 }]}>{item.description1}</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    })}

                </ScrollView>
                <View style={{ flex: 0.1 }}>
                    <View style={styles.ViewButton}>
                        <TouchableOpacity style={styles.TouchButton} onPress={() => requestCameraPermission()}>
                            <Text style={styles.TextAllow}>{t('common:ALLOW')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <ToastModal
                Validation={t('common:Toast')}
                ModalVisible={ModalVisible1}
                onPressOut={() => setModalVisible1(!ModalVisible1)}
                setModalVisible={setModalVisible1}
            />

            <ModalExitApp
                ModalVisible={modalExitAppVisible}
                onPressOut={() => setModalExitAppVisible(!modalExitAppVisible)}
                setModalExitAppVisible={setModalExitAppVisible}
            />
        </SafeAreaProvider>
    )
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

    },
    Card: {
        backgroundColor: COLORS.colorBackground,
        width: Dimensions.get('window').width * 0.9,
        marginLeft: 17,
        marginRight: 17,
        marginBottom: 17,
        shadowColor: 'rgba(0, 0, 0, 0.4)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        elevation: 10,
        shadowRadius: 7,
        borderRadius: 8,
    },
    title: {
        fontWeight: '700',
        fontSize: 14,
        fontFamily: FONTS.FontBold,
        color: COLORS.colorB,

    },
    Desc: {
        fontSize: 12,
        fontFamily: FONTS.FontRegular,
        fontWeight: '400',
        color: COLORS.colorBlack,
        // maxWidth: 230,
        marginTop: 5,
        marginRight: 20
    },
    Image: {
        marginLeft: 19,
        marginTop: 3

    },
    HeadText: {
        fontSize: 18,
        fontFamily: FONTS.FontRegular,
        fontWeight: '700',
        color: COLORS.colorBlack,
    },
    ViewHead: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 25,
        marginTop: 22,

    },
    ViewButton: {
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
        marginBottom: 10

    },
    TouchButton: {
        backgroundColor: COLORS.colorB,
        width: Dimensions.get('window').width * 0.9,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 48,
        marginBottom: 20,
        shadowColor: COLORS.colorB,
        shadowOffset: { width: 0, height: 7 },
        shadowOpacity: 0.2,
        elevation: 5,
        shadowRadius: 1,
    },
    TextAllow: {
        fontSize: 14,
        fontWeight: '700',
        fontFamily: FONTS.FontRegular,
        color: COLORS.colorBackground
    }
})

export default Permission;
