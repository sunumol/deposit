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
import House from './Components/House';
import { useSelector } from 'react-redux';
import ModalSave from '../../Components/ModalSave';
import ReasonModal from '../DetailedCheck/Components/ReasonModal';
import ErrorModal from '../DetailedCheck/Components/ErrorModal';
import ExitModal from '../Proceed/Components/ExitModal';
import { api } from '../../Services/Api';

const ResidenceOwner = ({ navigation, }) => {
    const route = useRoute();
    console.log("route name",);
    const isDarkMode = true
    const { t } = useTranslation();
    const [lang, setLang] = useState('')
    const [BStatus, setBstatus] = useState(false)
    const [state,setState] = useState()
    const [imagedata,setImagedata] = useState()
    const [ModalVisible,setModalVisible] = useState(false)
    const [ModalVisible1,setModalVisible1] = useState(false)
    const [ModalReason,setModalReason] = useState(false)
    const [ModalError, setModalError] = useState(false)
    const activityId = useSelector(state => state.activityId);

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

        // ------------------save and update residence owner detail ------------------

        const saveHousePhoto = async () => {
            console.log('api called')
    
            const data = {
                "activityId": activityId,
                "imageUrl": imagedata,
             
            }
            await api.saveHousePhoto(data).then((res) => {
                console.log('-------------------res  update house photo', res)
                if (res?.status) {
                   navigation.navigate('DLECompleted')
                }
            }).catch((err) => {
                console.log('-------------------err  update House photo', err?.response)
            })
        };
        // -



    const handleGoBack = useCallback(() => {
        console.log('8888',imagedata)
        if(imagedata){
            setModalVisible(true)
        }else{
            setModalVisible1(true)
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
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container1} />
            <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

            <Header name="House Photo Capture" navigation={navigation} setState={state} onPress={handleGoBack} />

            <View style={styles.ViewContent}>
                <House navigation={navigation} setState={setState} setImagedata1={setImagedata}  />
            </View>


            <ExitModal
                ModalVisible={ModalVisible1}
                onPressOut={() => {
                  setModalVisible1(!ModalVisible1)
                }}
                setModalVisible={setModalVisible1}
                navigation={navigation} 
            />

<ModalSave
                Press ={()=>{
                    setModalVisible(false),
                    setModalReason(true)
               
                }}
                Press1={()=>{saveHousePhoto(),setModalVisible(false)}}
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