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
    ActivityIndicator,
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
import DLE from './Components/DLE';
import CGTModal from './Components/CGTModal';
import { api } from '../../Services/Api';
import { useSelector } from 'react-redux';
import CGTstatus from '../../Components/CGTstatus';

const DLESchedule = ({ navigation,route}) => {
    //const route = useRoute();
    console.log("route name=======>",route?.params);
    const isDarkMode = true
    const { t } = useTranslation();
    const [lang, setLang] = useState('')
    const [status, setstatus] = useState(true)
    const [tcdetail,setTcdetail] = useState('')
    const [details, setdetails] = useState();
    const [ModalVisible1, setModalVisible1] = useState(false)
    const [ModalVisible2, setModalVisible2] = useState(false)
    const cgtCustomerDetails = useSelector(state => state.cgtCustomerDetails);
    const activityId = useSelector(state => state.activityId);
    useEffect(() => {
        getData()
        getDLEschedule()
        getDetails()
    }, [])

    const getData = async () => {
        try {
            const lang = await AsyncStorage.getItem('user-language')
            setLang(lang)

        } catch (e) {
            console.log(e)
        }
    }
    const getDetails = async () => {
        const data = {
            "activityId": activityId
        };
        await api.getCGTDetails(data).then((res) => {
            console.log('-------------------res123', res)
            setdetails(res?.data?.body)
            getDLEschedule(res?.data?.body?.primaryCustomerId)
        })
            .catch((err) => {
             
                console.log('-------------------err123', err?.response)
            })
    };
    

            // ------------------ get Slot Api Call Start ------------------
            const getDLEschedule = async (value) => {
                console.log('api called')
                 const data = {
                    //"employeeId": route?.params?.customerID,
                    "customerId":value,
                 };
                 await api.getDLEschedule(data).then((res) => {
                 
                     console.log('------------------- DLE res', res,data)
                     setTcdetail(res?.data?.body)
                     setstatus(false)
                    
                   
         
                 })
                     .catch((err) => {
                        setstatus(false)
                         console.log('-------------------err', err?.response)
                     })
             };
             // 

    const handleGoBack = useCallback(() => {

        //navigation.navigate('Profile')
        setModalVisible2(true)

        return true; // Returning true from onBackPress denotes that we have handled the event
    }, [navigation]);
    


    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
console.log('focus==========')
            getDLEschedule()

        });
        getData();
        return unsubscribe;
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
            <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={"#002B59"}/>

            <Header name="Schedule DLE Check" navigation={navigation} onPress={handleGoBack} />

        {/* {status
         ?

         <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, }}>
         <ActivityIndicator size={30} color={COLORS.colorB} />
     </View>
        :   */}
        <View style={styles.ViewContent}>
                {/* <Text style={{color:'red'}} onPress={()=>setModalVisible1(true)}>MODAL</Text> */}
          {tcdetail &&   <DLE navigation={navigation}
                 set={route?.params?.set} 
                 list ={tcdetail}/>
                 }
            </View>
{/* } */}




            <CGTstatus
                Press={() => {setModalVisible2(false),navigation.navigate('ActivityScreens') }}
                Press1={() => {setModalVisible2(false),navigation.navigate('Profile') }}
                ModalVisible={ModalVisible2}
                setModalVisible={setModalVisible2}
                onPressOut={() => {
                    setModalVisible2(false)
                }}
                navigation={navigation}
            />
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