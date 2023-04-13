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
import Icon from 'react-native-vector-icons/AntDesign';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS, FONTS } from '../../Constants/Constants';
import Statusbar from '../../Components/StatusBar';
import Header from '../../Components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Details from './Components/Details';
import CreditModal from './Components/CreditModal';
const { height, width } = Dimensions.get('screen');
import Icon1 from 'react-native-vector-icons/Entypo'
import { api } from '../../Services/Api';
import { useSelector } from 'react-redux';
import ModalSave from '../../Components/ModalSave';
import ReasonModal from '../DetailedCheck/Components/ReasonModal';
import ErrorModal from '../DetailedCheck/Components/ErrorModal';

const IncomeDetailsSpouse = ({ navigation, }) => {

    const isDarkMode = true
    const { t } = useTranslation();
    const [lang, setLang] = useState('')
    const [statusChange, setStatusChange] = useState(false)
    const [relationShip,setRelationship] =useState('Spouse')
    const [Amount, setAmount] = useState('')
    const [ModalVisible, setModalVisible] = useState(false)
    const [Purpose, setPurpose] = useState('')
    const [days, setDays] = useState('')
    const [Month, setMonth] = useState('')
    const [Avg, setAvg] = useState('')
    const [Buttons, setButtons] = useState(false)
    const [MonthsCustom, setMonthCustom] = useState('')
    const [Credit, setCredit] = useState('')
    const [Salary, setSalary] = useState('')
    const [StateChange1, setStateChange1] = useState(false)
    const [ButtonSP, setButtonSP] = useState(false)
    const [incomedetail,setIncomedetail] =useState('')
    const [incomedetailfield,setIncomedetailfield] =useState('')
    const activityId = useSelector(state => state.activityId);
    const [ModalVisible1,setModalVisible1] = useState(false)
    const [ModalReason,setModalReason] = useState(false)
    const [ModalError, setModalError] = useState(false)

    useEffect(() => {
        getData()
       // setRelationship(route?.params?.relationShip)
        getIncomeDetails()
            console.log("statecha nge.....",Purpose)
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

        // navigation.goBack()
             setModalVisible1(true)
         return true; // Returning true from onBackPress denotes that we have handled the event
     }, [navigation]);
 
     useFocusEffect(
         React.useCallback(() => {
             BackHandler.addEventListener('hardwareBackPress', handleGoBack);
 
             return () =>
             
                 BackHandler.removeEventListener('hardwareBackPress', handleGoBack);
         }, [handleGoBack]),
     );
 
    const ButtonClick = () => {
    
        if (Amount !== '' && Avg !== '' && Month !== '') {
            setStateChange1(true)
           // setStatusChange(true)
           saveIncomeDetails()

        } else {
            setStateChange1(false)
           // setStatusChange(false)
        }
    }

    useEffect(() => {
        if (MonthsCustom === '' || Purpose === '' || Salary === '') {
            setButtonSP(false)
        } else {
            setButtonSP(true)
        }
    }, [MonthsCustom, Purpose, Salary])

    useEffect(() => {
        console.log('month',Amount,Avg,Purpose)
        if (Amount === null || Avg === null || Purpose === null) {
            setButtons(false)
        } else {
            setButtons(true)
        }
    }, [Amount, Avg, Month])
    


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


       // ------------------getIncomeDetails detail ------------------

       const getIncomeDetails = async () => {
        console.log('api called')

        const data = {
           "activityId": activityId,
            "relationShip": relationShip

        }
        await api.getIncomeDetails(data).then((res) => {
            console.log('-------------------res getIncomeDetails', res?.data?.body?.incomeDetailsFieldHeadders)
            if (res?.status) {
                setIncomedetail(res?.data?.body)
                setIncomedetailfield(res?.data?.body?.incomeDetailsFieldHeadders)
                setAmount(res?.data?.body?.field1)
                setMonth(res?.data?.body?.field2)
                setPurpose(res?.data?.body?.field2)
                setAvg(res?.data?.body?.field3)
            }
        }).catch((err) => {
            console.log('-------------------err getIncomeDetails', err?.response)
        })
    };
    // ------------------ ------------------




           // ------------------saveIncomeDetails detail ------------------

           const saveIncomeDetails = async () => {
            console.log('api called')
    
            const data = {
                "activityId": activityId,
                "relationShip": relationShip,
                "field1": Amount,
                "field2": Purpose,
                "field3": Avg
    
            }
            await api.saveIncomeDetails(data).then((res) => {
                console.log('-------------------res saveIncomeDetails', res?.data?.body)
                if (res?.status) {    
                 navigation.navigate('Proceed')
                }
            }).catch((err) => {
                console.log('-------------------err saveIncomeDetails', err?.response)
            })
        };
        // ------------------ ------------------






    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container1} />
            <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

            <Header name="Income Details" navigation={navigation} onPress={handleGoBack} />
            {/* <View style={styles.Header}>
            <View style={{ left: 15, alignItems: 'center', justifyContent: 'center', top: -3 }}>
                <TouchableOpacity onPress={() => { StateChange1 === false ? navigation.goBack() : setStateChange1(false) }} style={{ padding: 0 }}>
        
                    <Icon size={17} color={"white"} name="left" />
                </TouchableOpacity>
            </View>

            <View style={{ left: lang == 'en' ? -10 : 5 }}>
                <Text style={[styles.textPrivacy, {
                    fontSize: 16, color: COLORS.colorBackground,

                    fontFamily: FONTS.FontRegular,
                    fontWeight: '700',
                    marginTop: 10,
                    marginBottom: 16,
                    left: -5
                }]}>Income Details</Text>
            </View>

            <View></View>
        </View> */}
            <View style={styles.ViewContent}>
                {/* <Details navigation={navigation} setStatusChange={setStatusChange} setStatusChange2={statusChange} /> */}
                <View style={styles.mainContainer}>
                <ScrollView>
                 
                        <View style={styles.containerBox}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={styles.circleView}>
                                    <Text style={styles.shortText}>AA</Text>
                                </View>
                                <View style={{ flexDirection: 'column', flex: 1, marginLeft: 12 }}>
                                    <Text style={styles.nameText}>{incomedetail?.name}</Text>
                                    <Text style={styles.underText}>{incomedetail?.occupation}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', left: -5 }}>
                                    <Text style={styles.dateText}>{relationShip}</Text>
                                </View>
                            </View>
                        </View> 

                 
                        <View>
                            <View>
                                <Text style={styles.TextElect}>{incomedetailfield?.field1}</Text>
                            </View>
                            <View style={styles.SelectBox}>
                              
                                <TextInput
                                    style={[{
                                        fontSize: 14, color: '#1A051D',
                                        fontFamily: FONTS.FontRegular, left: 15,width:'95%'
                                    }]}
                                    value={Amount?.toString()}
                                    keyboardType={'number-pad'}
                                    //label={'₹'}
                                    onChangeText={(text) => setAmount(text)} />
                            </View>

                            <View>
                                <Text style={styles.TextElect}>{incomedetailfield?.field2}</Text>
                            </View>
                            <View style={styles.SelectBox}>
                            <TouchableOpacity style={[styles.SelectBox,{justifyContent:'space-between'}]} onPress={() => setModalVisible(true)}>
                                <Text style={[styles.textSelect]}>{Purpose ? Purpose :'Select'}</Text>

                                <Icon1 name="chevron-down" size={18} color={'#808080'} style={{ marginRight: 10 }} />
                            </TouchableOpacity>
                                {/* <TextInput
                                    style={[{ fontSize: 14, color: '#1A051D', fontFamily: FONTS.FontRegular, left: 5 }]}
                                    value={Month?.toString()}
                                    keyboardType={'number-pad'}
                                    onChangeText={(text) => setMonth(text)} /> */}
                            </View>

                            <View>
                                <Text style={styles.TextElect}>{incomedetailfield?.field3}</Text>
                            </View>
                            <View style={styles.SelectBox}>
                                <Text style={[styles.RS, { color: Avg === '' ? '#808080' : '#1A051D' }]}>₹</Text>
                                <TextInput
                                    style={[{ fontSize: 14, color: '#1A051D', fontFamily: FONTS.FontRegular, left: 5,width:'95%' }]}
                                    value={Avg?.toString()}
                                    keyboardType={'number-pad'}
                                    onChangeText={(text) => setAvg(text)} />
                            </View>
                        </View> 
                </ScrollView>
              {console.log('878787',Buttons)}
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity style={[styles.buttonView, { backgroundColor: Buttons ? COLORS.colorB : 'rgba(224, 224, 224, 1)' }]}
                            onPress={() => ButtonClick()}>
                            <Text style={[styles.continueText, { color: Buttons ? COLORS.colorBackground : '#979C9E' }]}>Continue</Text>
                        </TouchableOpacity>
                    </View> 
            </View>
            </View>

            <CreditModal
                visible={ModalVisible}
                setPurpose={setPurpose}
                setModalVisible={setModalVisible}
                onPressOut={() => setModalVisible(!ModalVisible)}
            />


<ModalSave
                Press ={()=>{
                    setModalVisible1(false),
                    setModalReason(true)
               
                }}
                Press1={()=>{saveIncomeDetails(),setModalVisible1(false)}}
                ModalVisible={ModalVisible1}
                setModalVisible={setModalVisible1}
                onPressOut={() => {
                    setModalVisible1(false)
                   

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

export default IncomeDetailsSpouse;


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
    },
    Header: {
        backgroundColor: COLORS.colorB,
        height: 48,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textPrivacy: {
        color: COLORS.colorBackground,
        fontSize: 16,
        fontFamily: FONTS.FontRegular,
        fontWeight: '700',
        marginTop: 10,
        marginBottom: 16,
        left: -5
    },
    textSelect: {
        fontSize: 14,
        color: 'rgba(128, 128, 128, 1)',
        fontFamily: FONTS.FontRegular,
        marginLeft: 15
    },

    TextElect: {
        fontSize: 12,
        color: '#3B3D43',
        fontFamily: FONTS.FontRegular,
        marginTop: 10
    },
    RS: {
        fontSize: 15,
        fontFamily: FONTS.FontRegular,
        left: 5
    },
    continueText: {
        fontSize: 14,
        fontFamily: FONTS.FontBold,
        color: COLORS.colorBackground,
        letterSpacing: 0.64
    },
    mainContainer: {
        flex: 1,
        //paddingHorizontal: 20,
        backgroundColor: COLORS.colorBackground
    },
    buttonView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 54,
        height: 45,
        marginBottom: 0,
        width: width * 0.88,

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
    SelectBox1: {
        backgroundColor: '#FCFCFC',
        borderRadius: 8,
        borderWidth: 1,
        width: width * 0.89,
        height: width * 0.12,
        borderColor: 'rgba(236, 235, 237, 1)',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: width * 0.02,
        marginBottom: width * 0.02
    },
    textSelect: {
        fontSize: 14,
        color: 'rgba(128, 128, 128, 1)',
        fontFamily: FONTS.FontRegular,
        marginLeft: 10
    },

    containerBox: {
        borderWidth: 1,
        borderColor: COLORS.colorBorder,
        marginTop: 5,
        flexDirection: 'row',
        backgroundColor: COLORS.colorBackground,
        shadowColor: 'rgba(0, 0, 0, 0.4)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        elevation: 10,
        shadowRadius: 7,
        borderRadius: 8,
        paddingRight: 12,
        paddingLeft: 15,
        paddingTop: 12,
        paddingBottom: 14,
        marginBottom: 10
    },
    circleView: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(158, 200, 148, 1)',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    shortText: {
        fontSize: 18,
        fontFamily: FONTS.FontSemiB,
        color: COLORS.colorBackground,

    },
    nameText: {
        fontSize: 14,
        fontFamily: FONTS.FontSemiB,
        color: COLORS.colorDark,
    },
    underText: {
        fontSize: 12,
        fontFamily: FONTS.FontRegular,
        color: COLORS.colorDark,
    },
    dateText: {
        fontSize: 12,
        fontFamily: FONTS.FontRegular,
        color: COLORS.colorDark,
        marginLeft: 5
    },
})