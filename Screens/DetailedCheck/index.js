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
import ErrorModal from './Components/ErrorModal';


const DetailCheck = ({ navigation,route }) => {
    console.log('====>>Activity id',route?.params?.data)
   // const route = useRoute();
        
    const isDarkMode = true
    const { t } = useTranslation();
    const [lang, setLang] = useState('')
    const [BStatus, setBstatus] = useState(false)
    const [basicdetail, setBasicdetail] = useState('')
    const [ModalVisible,setModalVisible] = useState(false)
    const [ModalReason,setModalReason] = useState(false)
    const [ModalError, setModalError] = useState(false)
    const [villagename, setVillagename] = useState('')
    const [roadstatus, setRoadStatus] = useState('')
    const [postofficename, setPostofficename] = useState('')
    const [landmarkname, setLandmarkname] = useState('false')
    const [reason,setReason] = useState('')
   // const [activityId,setActivityId] = useState(route?.params?.data)
   const activityId = useSelector(state => state.activityId);

    useEffect(() => {
        getData()
getConductDLEbasicdetail()
    }, [])




      // ------------------ get Conduct DLE basic detail Village Api Call Start ------------------
      const updateRejection = async () => {
        console.log('api called for rejection')
        const data = {
            "activityStatus":'Submitted wrong data',
            "employeeId":1,
            "activityId":activityId
        }
        await api.updateActivity(data).then((res) => {
            console.log('-------------------res get Village', res)
            setModalError(true)
            setModalReason(false)
            setTimeout(() => {
                navigation.navigate('Profile')  
            }, 1000);
          
        }).catch((err) => {
            console.log('-------------------err get Village', err)
        })
    };
    // ------------------ HomeScreen Api Call End ------------------




     // ------------------ get Conduct DLE basic detail start Api Call Start ------------------
     const getConductDLEbasicdetail = async () => {
        console.log('api called',activityId)
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



     // ------------------ get Conduct DLE basic detail Village Api Call Start ------------------
     const onsubmit = async (value) => {
        
        console.log('api called',villagename)
        const data =  {
            "customerId": basicdetail?.customerId,
            "customerName": basicdetail?.customerName,
            "address": basicdetail?.address,
            "district": basicdetail?.district,
            "village": villagename ? villagename : basicdetail?.village ,
            "accessRoadType":roadstatus ? roadstatus : basicdetail?.accessRoadType,
            "postOffice": postofficename ? postofficename : basicdetail?.postOffice,
            "landMark": landmarkname ? landmarkname : basicdetail?.landMark,
            "pin": basicdetail?.pin
        }
        await api.savebasicdetail(data).then((res) => {
            console.log('-------------------res update', res?.data)
            if (res?.status) {
                navigation.navigate('Profile') 
            }
        }).catch((err) => {
            console.log('-------------------err update', err?.response)
        })
    };

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

            <Header name="Detailed Eligibility Check" navigation={navigation} onPress={handleGoBack} />

            <View style={styles.ViewContent}>
                <DetailChecks navigation={navigation} details ={basicdetail} setVillagename1={setVillagename} setPostoffice1={setPostofficename} setLandmarkname1={setLandmarkname} setRoadStatus1={setRoadStatus}/>
            </View>

            <ModalSave
                Press ={()=>{
                    setModalVisible(false),
                    setModalReason(true)
               
                }}
                Press1={()=>{onsubmit(),setModalVisible(false)}}
                ModalVisible={ModalVisible}
                setModalVisible={setModalVisible}
                onPressOut={() => {
                    setModalVisible(false)
                   

                }}
                navigation={navigation} />


            <ReasonModal
                onPress1={() => {
                     updateRejection()
                   // setModalError(true)
                }}
                ModalVisible={ModalReason}
                onPressOut={() => setModalReason(!ModalReason)}
                setModalVisible={setModalReason}
            />


            <ErrorModal
                ModalVisible={ModalError}
                onPressOut={() => {
                    setModalError(!ModalError)
                    setModalReason(!ModalReason)
                }}
                setModalVisible={setModalError}
                navigation={navigation} 
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
        paddingLeft:20,
        paddingRight:20
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