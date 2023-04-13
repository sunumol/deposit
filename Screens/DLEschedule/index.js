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
import Header from '../../Components/RepayHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import DLE from './Components/DLE';
import CGTModal from './Components/CGTModal';
import { api } from '../../Services/Api';

const DLESchedule = ({ navigation,route}) => {
    //const route = useRoute();
    console.log("route name=======>",route?.params);
    const isDarkMode = true
    const { t } = useTranslation();
    const [lang, setLang] = useState('')
    const [BStatus, setBstatus] = useState(false)
    const [tcdetail,setTcdetail] = useState('')
    const [ModalVisible1, setModalVisible1] = useState(false)

    useEffect(() => {
        getData()
        getDLEschedule()
    }, [])

    const getData = async () => {
        try {
            const lang = await AsyncStorage.getItem('user-language')
            setLang(lang)

        } catch (e) {
            console.log(e)
        }
    }


            // ------------------ get Slot Api Call Start ------------------
            const getDLEschedule = async () => {
                console.log('api called')
                 const data = {
                    //"employeeId": route?.params?.customerID,
                     "customerId":1
                 };
                 await api.getDLEschedule(data).then((res) => {
                 
                     console.log('------------------- DLE res', res?.data?.body)
                     setTcdetail(res?.data?.body)
                    
                   
         
                 })
                     .catch((err) => {
                         console.log('-------------------err', err?.response)
                     })
             };
             // 

    const handleGoBack = useCallback(() => {

        navigation.navigate('Profile')

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

            <Header name="Schedule DLE Check" navigation={navigation} popup={true} onPress={handleGoBack} />

            <View style={styles.ViewContent}>
                {/* <Text style={{color:'red'}} onPress={()=>setModalVisible1(true)}>MODAL</Text> */}
             {  tcdetail && <DLE navigation={navigation}
                 set={route?.params?.set} 
                 list ={tcdetail}/>}
            </View>
            <CGTModal

                ModalVisible={ModalVisible1}
                onPressOut={() => {
                    setModalVisible1(false)
                }}
                //navigation.navigate('NewCgt')}}

                navigation={navigation}
                //  onPressOut={() => setModalVisible(!ModalVisible)}
                setModalVisible={setModalVisible1} />
        </SafeAreaProvider>
    )
}

export default DLESchedule;


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
        paddingLeft: 20,
        paddingRight: 20
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