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
import Cgt from './Components/Cgt';
import { api } from '../../Services/Api';
import CalendarStrips from './Components/Calender';
import moment from 'moment';
import DLEModal from './Components/DLEModal';
const { height, width } = Dimensions.get('screen');

const ScheduleMeet = ({ navigation, }) => {
    const route = useRoute();
    console.log("route name",);
    const isDarkMode = true
    const { t } = useTranslation();
    const [lang, setLang] = useState('')
    const [BStatus, setBstatus] = useState(false)
    const [selectedDate, setSelectedDate] = useState('')
    const [ModalVisible, setModalVisible] = useState(false)

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
        if (BStatus) {
            setBstatus(false)
        } else {
            navigation.goBack()
        }
        return true; // Returning true from onBackPress denotes that we have handled the event
    }, [navigation]);

    useFocusEffect(
        React.useCallback(() => {
            BackHandler.addEventListener('hardwareBackPress', handleGoBack);

            return () =>
                BackHandler.removeEventListener('hardwareBackPress', handleGoBack);
        }, [handleGoBack]),
    );
    const callback = (value) => {
        // const date = moment(value).utc().format('DD-MM-YYYY')
        setSelectedDate(value)
        ScheduleDLE(value)


    }

    // ------------------ get Slot Api Call Start ------------------
    const ScheduleDLE = async (date) => {
        console.log('api called')
        const data = {
            "customerId": 1,
            "tcMemberId": 11177,
            "scheduleDate": moment(date ? date : selectedDate).utc().format('DD-MM-YYYY')
        };
        await api.ScheduleDLE(data).then((res) => {

            console.log('------------------- Schedule DLE res', res.data)
                setModalVisible(true)

        })
            .catch((err) => {
                console.log('-------------------err', err?.response)
            })
    };
    // ------------------ get slot Api Call End ------------------


    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container1} />
            <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

            <Header navigation={navigation} name={"Schedule Meeting"} />
            <View style={styles.ViewContent}>


                <CalendarStrips callback={callback} />
                {/* <Cgt navigation={navigation} /> */}


                <View style={{ alignItems: 'center', justifyContent: 'center', bottom: 10, position: 'absolute', left: 25 }}>
                    {selectedDate
                        ? <TouchableOpacity style={[styles.Button1,
                        { backgroundColor: COLORS.colorB }]} onPress={() => ScheduleDLE()}>
                            <Text style={[styles.text1, { color: COLORS.colorBackground, paddingLeft: width * 0.02 }]}>Continue</Text>
                        </TouchableOpacity>
                        :
                        <View style={[styles.Button1, { backgroundColor: '#ECEBED' }]} >
                            <Text style={[styles.text1, { color: '#979C9E', paddingLeft: width * 0.02 }]}>Continue</Text>
                        </View>
                    }

                </View>

                <DLEModal

                    ModalVisible={ModalVisible}
                    onPressOut={() => {
                        setModalVisible(false)
                    }}
                    navigation={navigation}
                    setModalVisible={setModalVisible} />


            </View>

        </SafeAreaProvider>
    )
}

export default ScheduleMeet;


const styles = StyleSheet.create({
    container1: {
        flex: 0,
        backgroundColor: "#002B59",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    ViewContent: {
        // justifyContent: 'center',
        //alignItems: 'center',
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
    text1: {
        fontFamily: FONTS.FontBold,
        fontSize: 14,
        fontWeight: '700'
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
    Button1: {
        width: width * 0.87,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.colorB,
        marginTop: 31,
        flexDirection: 'row',
        borderRadius: 40,
        marginBottom: 20
    },
})