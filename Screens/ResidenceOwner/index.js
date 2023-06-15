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
import Owner from './Components/Owner';
import ModalSave from '../../Components/ModalSave';
import ReasonModal from './Components/ReasonModal';
import ErrorModal from './Components/ErrorModal';
import { api } from '../../Services/Api';
import { useSelector } from 'react-redux';

const ResidenceOwner = ({ navigation, }) => {
    const route = useRoute();
    console.log("route name",);
    const isDarkMode = true
    const { t } = useTranslation();
    const [lang, setLang] = useState('')
    const [BStatus, setBstatus] = useState(false)
    const [state,setState] = useState()
    const [ModalVisible,setModalVisible] = useState(false)
    const [ModalReason,setModalReason] = useState(false)
    const [ModalError, setModalError] = useState(false)
    const [proofType,setProoftype] = useState('')
    const [imageurl,setImageUrl] = useState('')
    const [relation,setRelation] = useState('')
    const [relative,setRelative] = useState('')
    const [custID,setCustId] = useState('')
    const activityId = useSelector(state => state.activityId);
    useEffect(() => {
        getData()
    }, [])
    useEffect(() => {
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


     // ------------------save and update residence owner detail ------------------

     const UpdateResidenceowner = async () => {
        console.log('api called',activityId,proofType,imageurl,relation,relative)

        const data = {
            "activityId": activityId,
            "ownerShipProofType": proofType == 'Electricity Bill' ? 'ELECTRICITY_BILL' : proofType == 'Water Bill' ? 'WATER_BILL' : 'BUILDING_TAX_RECEIPT',
            "imageUrl": imageurl,
            "relationShipWithCustomer": relation,
            "ownersName": relative
        }
        await api.UpdateResidenceowner(data).then((res) => {
            console.log('-------------------res  update Residence owner', res)
            if (res?.status) {
                if(Purposes == 'Spouse'){
               // navigation.navigate('ContinuingGuarantor') 
               navigation.navigate('ContinuingGuarantor',{relation:'Spouse'}) 

                }else{
                    navigation.navigate('ContinuingGuarantor',{relation:'other'})  
                    //navigation.navigate('ContinuingGuarantor')  

                }
            }
        }).catch((err) => {
            console.log('-------------------err  update Residence Owner', err?.response)
        })
    };



// device back api call------------------

const UpdateResidenceowner_backButton = async () => {
    console.log('api called',activityId,proofType,imageurl,relation,relative)

    const data = {
        "activityId": activityId,
        "ownerShipProofType": proofType,
        "imageUrl": imageurl,
        "relationShipWithCustomer": relation,
        "ownersName": relative
    }
    await api.UpdateResidenceowner(data).then((res) => {
        console.log('-------------------res  update Residence owner', res)
        if (res?.status) {
          
           // navigation.navigate('ContinuingGuarantor') 
           navigation.navigate('Profile') 

        }
    }).catch((err) => {
        console.log('-------------------err  update Residence Owner', err?.response)
    })
};





   
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
            <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={"#002B59"} />

            <Header name="Current Residence Owner" navigation={navigation} setState={state} onPress={handleGoBack} />

            <View style={styles.ViewContent}>
                <Owner navigation={navigation} 
                setState={setState}
                 proofType1={setProoftype}
                 imageUrl1={setImageUrl}
                  relation1={setRelation} 
                  relative1={setRelative}
                  isCheck={route?.params?.isCheck}  />
            </View>


            <ModalSave
                Press ={()=>{
                    setModalVisible(false),
                    setModalReason(true)
               
                }}
                Press1={()=>{UpdateResidenceowner_backButton(),setModalVisible(false)}}
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
                setModalVisible={setModalVisible}
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

export default ResidenceOwner;


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