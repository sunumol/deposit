

import React, { useState, useEffect } from 'react';
import {
    View,
    Image,
    Dimensions,
    StyleSheet,
    Text,
    FlatList,
    TouchableWithoutFeedback,
    TouchableOpacity,
    TextInput,
    Pressable,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';
import AnsModal from './AnsModal';
import Icon from 'react-native-vector-icons/Entypo'
import { api } from '../../../Services/Api';
import { COLORS, FONTS } from '../../../Constants/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { height, width } = Dimensions.get('screen');
import { NetworkInfo } from 'react-native-network-info';
import DeviceInfo from 'react-native-device-info';
import moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useTranslation } from 'react-i18next';

const Generate = ({navigation}) => {
    const { t } = useTranslation();
    const [dob, setDob] = useState('')
    const [MitraID, setSMitraID] = useState('')
    const [ModalVisible, setModalVisible] = useState(false)
    const [ipAdrress, setIPAddress] = useState();
    const [deviceId, setDeviceId] = useState();
    const [phoneSet, setPhoneSet] = useState()
    const [lang, setLang] = useState('')
    const [CustomerId, setCustomerId] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [maxError, setMaxError] = useState(false)
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    useEffect(() => {
        getData()
        NetworkInfo.getIPV4Address().then(ipv4Address => {
            console.log(ipv4Address);
            setIPAddress(ipv4Address)
        });
        // -------------- Get DeviceInfo start----------
        DeviceInfo.getUniqueId().then((uniqueId) => {
            setDeviceId(uniqueId)
        });
        // -------------- Get DeviceInfo End ---------- 
    }, [])

    const getData = async () => {
        try {
            const phone = await AsyncStorage.getItem('Mobile')
            const lang = await AsyncStorage.getItem('user-language')
            const customerId = await AsyncStorage.getItem('CustomerId')
            setCustomerId(customerId)
            setLang(lang)
            console.log("customer async", customerId)
            setPhoneSet(phone)
        } catch (e) {
            console.log(e)
        }
    }


    const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
    
      const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };

      const handleConfirm = (date) => {
        console.log("A date has been picked: ", date);
        setDob(moment(date).format("DD/MM/YYYY"))
        hideDatePicker();
      };

    async function forgotApiCall() {
        console.log("moment format", moment(dob).format('YYYY-MM-YY') + "T00:00:00")
        const data = {
            deviceId: deviceId,
            geoLocation: {
                latitude: "10.0302",//Todo
                longitude: "76.33553"//Todo
            },
            mobile: phoneSet,
            deviceIpAddress: ipAdrress,
            simId: deviceId,
            "otpReason": "FORGOT_PIN",
            id: MitraID,
            dob: moment(dob).format('YYYY-DD-MM') + "T00:00:00"
        }
        console.log("data==============>>>", data)
        
        await api.getForgotOtp(data).then((res) => {
            console.log('response Login Api===================>>>>>>>>>', res?.data?.status)
            if (res?.data?.status == true) {
                setSMitraID('')
                setDob('')
                console.log('response Login Api', res?.data?.status)
                navigation.navigate('ForgotPin')
            }
        }).catch((err) => {
            if (err?.response?.data?.message === "Your answers do not match with our records") {
                setModalVisible(true)
                setSMitraID('')
                setDob('')
            } else if (err?.response?.data?.message.includes('Maximum number of OTPs are exceeded.')) {
                setMaxError(true)
                setErrorMessage(err?.response?.data?.message)
                setTimeout(() => {
                    setMaxError(false)
                }, 5000);
            

            }else{
                setModalVisible(true)
                setSMitraID('')
                setDob('') 
            }
            console.log("err PRINT->", err?.response)



        })
    }
    return (
        <View style={styles.mainContainer}>
            <View>
                <Text style={styles.TextElect}>Your date of birth?</Text>
            </View>
            <View style={styles.SelectBox}>



            <Pressable onPress={showDatePicker}  style={{  
                                                               borderRadius: 8,
                                                              // borderWidth: 1,
                                                              // borderColor: '#ECEBED',
                                                               alignContent:'center',
                                                               width: '100%',
                                                               paddingLeft: 13,
                                                               height:46}} >
                                                   <Text style={{color:dob ? '#000' :'#808080',fontSize:12,fontFamily: FONTS.FontRegular, fontWeight: '400',marginTop:15}}>{dob ? dob : 'DD/MM/YYYY'}</Text>    
                                                   <DateTimePickerModal
                                                               isVisible={isDatePickerVisible}
                                                               mode="date"
                                                               onConfirm={handleConfirm}
                                                               onCancel={hideDatePicker}
                                                               maximumDate={new Date()}
                                                               minimumDate={new Date(1960, 0, 1)}
                                                               androidVariant = 'nativeAndroid'
                                                           />
                                               </Pressable>

                {/* <TextInput
                    style={[{ fontSize: 12, color: '#000', fontFamily: FONTS.FontRegular, left: 10, width: width * 0.84, }]}
                    value={dob}
                    placeholder={"DD/MM/YYYY"}
                    placeholderTextColor={"#808080"}
                    keyboardType={'email-address'}
                    maxLength={10}
                    // contextMenuHidden={true}
                    onChangeText={(text) => {

                        if ((/^[1234567890/]+$/.test(text) || text === '')) {
                            setDob(text)
                            console.log("inside this")
                        }

                    }
                    } /> */}
            </View>

            <View>
                <Text style={styles.TextElect}>Svadhan Mitra ID?</Text>
            </View>
            <View style={styles.SelectBox}>
                

                <TextInput
                    style={[{ fontSize: 12, color: '#000', fontFamily: FONTS.FontRegular, left: 10, width: width * 0.84, }]}
                    value={MitraID}
                    keyboardType={'email-address'}
                    maxLength={9}
                    placeholder={"CXXXXXXXX"}
                    placeholderTextColor={"#808080"}
                    // contextMenuHidden={true}
                    onChangeText={(text) => {
                     
                        if (/^[^!-\/:-@\.,[-`{-~ ]+$/.test(text) || text === '') {
                            setSMitraID(text)
                        }
                    }
                    } />
            </View>

            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: width * 0.09 }}>
                <TouchableOpacity style={[styles.buttonView, { backgroundColor: dob && MitraID ? COLORS.colorB : 'rgba(224, 224, 224, 1)' }]}
                    onPress={() => dob && MitraID ? forgotApiCall() : console.log("hello")}>
                    <Text style={[styles.continueText, { color: dob && MitraID ? COLORS.colorBackground : 'rgba(151, 156, 158, 1)' }]}>Submit</Text>
                </TouchableOpacity>
            </View>

            {maxError &&
                <>
                    {lang == "en" ?
                        <View style={{ marginTop: Dimensions.get('window').height * 0.4,alignItems:'center',justifyContent:'center' }}>
                            <Text style={{ color: "#EB5757", fontFamily: FONTS.FontRegular, fontSize: 12, textAlign: 'center', width: width * 0.8 }}>{t('common:Valid2')}</Text>
                            <Text style={{ color: "#EB5757", fontFamily: FONTS.FontRegular, fontSize: 12, textAlign: 'center' }}>Please try after {errorMessage.replace(/\D/g, '')} minutes</Text></View>
                        :
                        <View style={{ marginTop: Dimensions.get('window').height * 0.4,alignItems:'center',justifyContent:'center' }}>
                            <Text style={{ color: "#EB5757", fontFamily: FONTS.FontRegular, fontSize: 12, textAlign: 'center', width: width * 0.8 }}>{t('common:Valid2')}</Text>
                            <Text style={{ color: "#EB5757", fontFamily: FONTS.FontRegular, fontSize: 12, textAlign: 'center' }}>{errorMessage.replace(/\D/g, '')} {t('common:Valid3')}</Text></View>}
                </>}
            <AnsModal

                ModalVisible={ModalVisible}
                onPressOut={() => setModalVisible(!ModalVisible)}
                setModalVisible={setModalVisible}
            />
        </View>
    )
}

export default Generate;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.colorBackground,
        paddingHorizontal: 20,
        paddingTop: width * 0.07

    },
    TextElect: {
        fontSize: 12,
        color: '#3B3D43',
        fontFamily: FONTS.FontRegular,
        marginTop: 10
    },
    SelectBox: {
        backgroundColor: '#FCFCFC',
        borderRadius: 8,
        borderWidth: 1,
        width: width * 0.89,
        height: width * 0.12,
        borderColor: 'rgba(236, 235, 237, 1)',
        alignItems: 'center',
        flexDirection: 'row',
        // justifyContent: 'space-between',
        marginTop: width * 0.02,
        marginBottom: width * 0.02
    },
    buttonView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 54,
        height: 45,
        marginBottom: 0,
        width: width * 0.84,

    },
    continueText: {
        fontSize: 14,
        fontFamily: FONTS.FontBold,
        color: COLORS.colorBackground,
        letterSpacing: 0.64
    },
})