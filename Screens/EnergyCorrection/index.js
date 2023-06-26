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
import Energy from './Components/Energy';
import { api } from '../../Services/Api';
import { useSelector } from 'react-redux';
import ModalSave from '../../Components/ModalSave';
import ErrorModal from '../DetailedCheck/Components/ErrorModal';
import ReasonModal from '../DetailedCheck/Components/ReasonModal';

const EnergyCorrection = ({ navigation, }) => {
    const route = useRoute();
    console.log("route name",);
    const isDarkMode = true
    const { t } = useTranslation();
    const [lang, setLang] = useState('')
    const [BStatus, setBstatus] = useState(false)
    const [ModalVisible,setModalVisible] = useState(false)
    const [ModalReason,setModalReason] = useState(false)
    const [ModalError, setModalError] = useState(false)
    const [Amount1, setAmount1] = useState('')
    const [Purpose1, setPurpose1] = useState('')
    const [days1, setDays1] = useState('')
    const [customerId,setCustomerId] = useState('')
    const [energyUtilityId,setEnergyUtilityId] = useState('')
    const activityId = useSelector(state => state.activityId);
    const [custID,setCustId] = useState('')

    useEffect(() => {
        getData()
        AsyncStorage.getItem("CustomerId").then((value) => {
            setCustId(value)
        })
    }, [])

    const getData = async () => {
        try {
            const lang = await AsyncStorage.getItem('user-language')
            setLang(lang)

        } catch (e) {
            console.log(e)
        }
    }



          // ------------------ get Conduct DLE basic detail Village Api Call Start ------------------
          const updateRejection = async () => {
            console.log('api called for rejection')
            const data = {
                "activityStatus":'Submitted wrong data',
                "employeeId":Number(custID),
                "activityId":activityId
            }
            await api.updateActivity(data).then((res) => {
                console.log('-------------------updateActivity', res)
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

         const saveEnergyUtilities = async () => {
            console.log('api called')
        
            const data = {
                "activityId": activityId,
                "customerId": customerId,
                "energyUtilityId": energyUtilityId,
                "averageElectrictyBill": Amount1,
                "cookingFuelType": Purpose1,
                "cylinderLastingDays":days1
        
            }
            await api.saveEnergyUtilities(data).then((res) => {
                console.log('-------------------res saveEnergyUtilities', res,data)
                if (res?.status) {
                    navigation.navigate('Profile'),
                    setModalVisible(false)
                }
            }).catch((err) => {
                console.log('-------------------err saveEnergyUtilities', err?.response)
            })
        };
    
    

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container1} />
            <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={"#002B59"}/>

            <Header name="Energy Utilities" navigation={navigation} onPress={handleGoBack}/>

            <View style={styles.ViewContent}>
             <Energy navigation={navigation} 
             setAmount1={setAmount1}
             setPurpose1={setPurpose1}
             setDays1={setDays1}
             setCustomerId={setCustomerId}
             setEnergyUtilityId={setEnergyUtilityId}/>
  
            </View>


            <ModalSave
                Press ={()=>{
                    setModalVisible(false),
                    setModalReason(true)
               
                }}
                Press1={()=>{saveEnergyUtilities()}}
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

export default EnergyCorrection;


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