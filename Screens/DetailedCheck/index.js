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
import DetailChecks from './Components/DetailChecks';
import { api } from '../../Services/Api';
import { useSelector } from 'react-redux';
import ModalSave from '../../Components/ModalSave';
import ReasonModal from './Components/ReasonModal';



const DetailCheck = ({ navigation, route }) => {
    console.log('====>>Activity id', route?.params?.data)
    // const route = useRoute();

    const isDarkMode = true
    const { t } = useTranslation();
    const [lang, setLang] = useState('')
    const [BStatus, setBstatus] = useState(false)
    const [basicdetail, setBasicdetail] = useState('')
    const [ModalVisible, setModalVisible] = useState(false)
    const [ModalReason, setModalReason] = useState(false)

    // const [activityId,setActivityId] = useState(route?.params?.data)
    const activityId = useSelector(state => state.activityId);

    useEffect(() => {
        getData()
        getConductDLEbasicdetail()
    }, [])



    // ------------------ get Conduct DLE basic detail start Api Call Start ------------------
    const getConductDLEbasicdetail = async () => {
        console.log('api called')
        const data = {
            "activityId": activityId


        }
        await api.ConductDLEbasicdetail(data).then((res) => {
            console.log('-------------------res ConductDLEbasicdetail12', res)
            if (res?.status) {
                setBasicdetail(res?.data?.body)
            }
        }).catch((err) => {
            console.log('-------------------err ConductDLEbasicdetail', err?.response)
        })
    };
    // ------------------ HomeScreen Api Call End ------------------

    const getData = async () => {
        try {
            const lang = await AsyncStorage.getItem('user-language')
            setLang(lang)

        } catch (e) {
            console.log(e)
        }
    }

    const handleGoBack = useCallback(() => {

        // navigation.goBack()
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

            <Header name="Detailed Eligibility Check" navigation={navigation} />

            <View style={styles.ViewContent}>
                <DetailChecks navigation={navigation} details={basicdetail} />
            </View>


            <ModalSave
                Press={() => {
                    setModalVisible(false),
                        setModalReason(true)
                }}
                ModalVisible={ModalVisible}
                setModalVisible={setModalVisible}
                onPressOut={() => {
                    setModalVisible(false)


                }}
                navigation={navigation} />


            <ReasonModal
                onPress1={() => {
                    // setModalVisible(false)
                    setModalError(true)
                }}
                ModalVisible={ModalReason}
                onPressOut={() => setModalReason(!ModalReason)}
                setModalVisible={setModalReason}
            />

        </SafeAreaProvider>
    )
}

export default DetailCheck;


const styles = StyleSheet.create({
    container1: {
        flex: 0,
        backgroundColor: "#002B59",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    ViewContent: {
        // justifyContent: 'center',
        //  alignItems: 'center',
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