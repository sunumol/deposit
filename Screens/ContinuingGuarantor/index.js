import {
  StyleSheet, Text, View, StatusBar, SafeAreaView, Platform,Alert,
  TextInput, TouchableOpacity, Dimensions, ScrollView, KeyboardAvoidingView, Image
} from 'react-native'
import React, { useState, useEffect, useRef,useCallback } from 'react'
import Header from '../../Components/RepayHeader';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS, FONTS } from '../../Constants/Constants';
import Statusbar from '../../Components/StatusBar';
import Icon1 from 'react-native-vector-icons/Entypo'
import Call from '../../assets/image/calls.svg';
const { height, width } = Dimensions.get('screen');
import { useTranslation } from 'react-i18next';
import Image1 from '../../assets/Images/cakes.svg';
import { api } from '../../Services/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ErrorModal from './components/ErrorModal';
import RelationModal from './components/RelationModal';
import Resend from '../../assets/Images/resend.svg'
import OTPInputView from '../../Components/OTPInputView'
import { useSelector } from 'react-redux';
import ErrorModal1 from './components/ErrorModal1';
import ReasonModal from '../DetailedCheck/Components/ReasonModal';
import ModalSave from '../../Components/ModalSave';




const ContinuingGuarantor = ({ navigation, route }) => {

  const isDarkMode = true;
  const { t } = useTranslation();
  const otpInput2 = React.createRef();
  const Pin =  AsyncStorage.getItem('Mobile')
  const [number, onChangeNumber] = useState()
  const [relation,setRelation] =useState()
  const [Purpose, setPurpose] = useState(null)
  const [Purposes, setPurposes] = useState(null)
  const [customerNumber,setCustomerNumber] =useState('')
  const [spousedetail,setSpousedetail] = useState('')
  const [invalidotp,setInvalidotp] = useState(false)
  const [cgdetail,setCgdetail] = useState('')
  const [OtpValue, setOtpValue] = useState('')
  const [timerCount, setTimer] = useState(30)
  const [IsOtp1, setIsOtp1] = useState(false)
  const [Bstatus, setBstatus] = useState(false)
  const [IsOtp2, setIsOtp2] = useState(true)
  const [ModalError, setModalError] = useState(false)
  const [ModalVisible1,setModalVisible1] = useState(false)
  const [status, setStatus] = useState(false)


  const [fetOtp, setOtpFetch] = useState(false)
    const [otpMessage, setOtpMessage] = useState()
    const [ModalVisibleError, setModalVisibleError] = useState(false)
    const [maxError, setMaxError] = useState(false)
    const [otp, setOtp] = useState(false)

    const activityId = useSelector(state => state.activityId);
    const [ModalVisible,setModalVisible] = useState(false)
    const [ModalReason,setModalReason] = useState(false)
    const [ModalError1, setModalError1] = useState(false)


  const getData = async () => {
    try {
        const mob = await AsyncStorage.getItem('Mobile')
        setCustomerNumber(mob)
       
    } catch (e) {
        console.log('mob',e)
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

useEffect (()=>{
  getCGdetails()
},[])




useEffect(() => {



  setPurpose(Purpose)
  setPurposes(Purposes)
  //setRelation(Purposes)
if(Purposes){
  console.log('purpose relation',Purposes) 
  setRelation(Purposes)
}

  //setStatus(true)
}, [Purposes, relation])


useEffect(()=>{
  if(route?.params?.relation == "Spouse"){
    setRelation('Spouse')
    getSpousedetail()
  }
},[])

useEffect(() => {
  if (!OtpValue) {
      setOtp(false)
  }
}, [OtpValue])

useEffect(() => {
  setMaxError(false)
}, [])


useEffect(() => {
  if (IsOtp1 && timerCount > 0) {
      setTimeout(() => setTimer(timerCount - 1), 1000);
  } else {
      setStatus(false)
  }
}, [timerCount, IsOtp1]);



const getOtp = () => {
  //bug fixing privacy policy and tc back navigation
  if (IsOtp1 && timerCount === 0) {
      setTimeout(() => {
          setIsOtp1(true)
          setStatus(true)
          setTimer(30)
      }, 1000)
     
      setIsOtp1(true)
      setStatus(true)
      setTimer(30)
  } else {
      setTimeout(() => {
          setIsOtp1(true)
          setStatus(true)
      }, 1000)
     
      setIsOtp1(true)
      setStatus(true)
  }
}
const CountDownResend = () => {
  setTimer(30)
  setStatus(true)
  setIsOtp1(true)
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
    // ------------------ HomeScreen Api Call End ------------------

  useEffect(() => {
  
    getData();
    if (number) {
      let interval = setInterval(() => {
        setTimer(lastTimerCount => {
          lastTimerCount <= 1 && clearInterval(interval)
          return lastTimerCount - 1
        })
      }, 1000)
      //console.log(interval)
      if (timerCount === 0) {

      //  console.log("timer count useEffect", timerCount)
      }//each count lasts for a second
      //cleanup the interval on complete
      return () => clearInterval(interval)
    }
   
   /// getSpousedetail()
  }, [number]);

    // ------------------spouse detail ------------------

    const getSpousedetail = async () => {
      console.log('api called SPOUSE')

      const data = {
             "activityId": activityId
        

      }
      await api.getSpousedetail(data).then((res) => {
          console.log('-------------------res spousedetail', res)
          if (res?.status) {
              setSpousedetail(res?.data?.body)
          }
      }).catch((err) => {
          console.log('-------------------err spousedetail', err?.response)
      })
  };
  // ------------------ ------------------


    // ------------------get CG detail ------------------

    const getCGdetails = async () => {
      console.log('api called GET')

      const data = {
             "activityId": activityId
         

      }
      await api.getCGdetails(data).then((res) => {
          console.log('-------------------res getCGdetails', res)
          if (res?.status) {
            setCgdetail(res?.data?.body)
            if(res?.data?.body?.relationShip == 'Spouse'){
              getSpousedetail()
              console.log('12323434======???????')
              setRelation('Spouse')
            }
          }
      }).catch((err) => {
          console.log('-------------------err getCGdetails', err?.response)
      })
  };
  // ------------------ ------------------


    // ------------------verifyCG detail ------------------

    const verifyCG = async (mobnumber) => {
   //   console.log('api called')

      const data = {
        "activityId":activityId,
        "mobileNumber":"+91"+mobnumber,
        "name":"",
        "relationShip":relation
    
    }
      await api.verifyCG(data).then((res) => {
          console.log('-------------------res verifyCG', res)
          if (res?.status) {
            setMaxError(false)
            setOtpFetch(true)
            setIsOtp1(true)
            getOtp();
            setTimer(30)
          
          }
      }).catch((err) => {
          console.log('-------------------err verifyCG', err?.response)
          if (err?.response?.data?.message === 'Maximum number of OTPs are exceeded. Please try after 30 minutes.') {
            setOtpFetch(false)
            setIsOtp1(true)
            setStatus(false)
            setMaxError(true)
        } else {
            setMaxError(false)
        }
      })
  };
  // ------------------ ------------------


   // ------------------verifyCG detail ------------------

   const ResendOtp = async (mobnumber) => {
    //   console.log('api called')
    setInvalidotp(false)
    otpInput2.current.clear()
       const data = {
         "activityId":activityId,
         "mobileNumber":"+91"+mobnumber,
         "name":"",
         "relationShip":relation
     
     }
       await api.verifyCG(data).then((res) => {
           console.log('-------------------res verifyCG', res)
           if (res?.status) {
           
           }
       }).catch((err) => {
           console.log('-------------------err verifyCG', err?.response)
       })
   };
   // ------------------ ------------------



    // ------------------verifyCG detail ------------------

    const verifyCGOTP = async (mobnumber) => {
      console.log('api called')

      const data = {
        "activityId":activityId,
          "otp": OtpValue
    
    }
      await api.verifyCGOTP(data).then((res) => {
          console.log('-------------------res verifyCG', res)
          if (res?.status) {
            setMaxError(false)
            setOtpFetch(false)
            setIsOtp1(false)
            setOtpFetch(false)
            navigation.navigate('UploadVid') 
          }
      }).catch((err) => {
          console.log('-------------------err verifyCG', err?.response?.data?.message)
          if(err?.response?.data?.message == 'You entered wrong OTP' ){
            setInvalidotp(true)
            setOtp(true)
          }
          
      })
  };
  // ------------------ ------------------






  const OnchangeNumbers = (num) => {
    console.log('%%%5',"91"+num,customerNumber)
    if (/^[^!-\/:-@\.,[-`{-~ ]+$/.test(num) || num === '') {
      if("91"+num == customerNumber){
        setModalError(true)
        onChangeNumber('')
      }else{
      onChangeNumber(num)
      verifyCG(num)
      setOtpValue('')
     
      }
    } else {

      // ToastAndroid.show(t('common:Valid'), ToastAndroid.SHORT);
    }
  }

  const scrollViewRef = useRef();
  return (
    <SafeAreaProvider>

      <SafeAreaView style={styles.container1} />
      <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={"#002B59"} />

      <Header navigation={navigation} name={"Continuing Guarantor"}  onPress={handleGoBack} />

      <View style={styles.mainContainer}>

        <KeyboardAvoidingView style={{ flex: 1 }}
          {...(Platform.OS === 'ios' && { behavior: 'position' })}
        >
          {console.log('relation=====',relation)}
          <ScrollView ref={scrollViewRef}
            onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
            <View style={{ flex: 1 }}>
              <Text style={styles.headerText}>Relationship with Customer</Text>
              <TouchableOpacity onPress={()=>setModalVisible1(true)} style={styles.dropDown}>
                <Text style={styles.spouseText}>{relation ? relation :'Select'}</Text>
                <Icon1 name="chevron-down" size={18} color={'#808080'} />
              </TouchableOpacity>
            {relation == 'Spouse' ?  <View style={styles.containerBox}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View style={styles.circleView}>
                    <Text style={styles.shortText}>AK</Text>
                  </View>
                  <View style={{ flexDirection: 'column', flex: 1, marginLeft: 12 }}>
                    <Text style={styles.nameText}>{spousedetail?.name}</Text>
                    <Text style={styles.underText}>{spousedetail?.occupation}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', left: -5 }}>

                    <Image1 width={11} height={11} top={3} />
                    <Text style={styles.dateText}>{spousedetail?.dateOfBirth}</Text>
                  </View>
                </View>
              </View>:null}
              <Text style={styles.mobileText}>Mobile Number</Text>
              <View style={styles.inPutStyle}>
                <TextInput

                  placeholder=''
                  value={number}
                  maxLength={10}
                  style={styles.textIn1}
                  onChangeText={(text) => {
                    OnchangeNumbers(text)
                    // setOtpValue('')
                  }

                  }
                  placeholderTextColor={COLORS.colorDark}
                  keyboardType="numeric"
                />
                {number?.length === 10 &&
                  <View style={styles.CallView}>
                    <Call width={16} height={16} />
                  </View>}
              </View>



{/* #################################################################### */}

              {number?.length === 10 &&
                <View style={styles.ViewOtp}>
                  <Text style={styles.textOtp} onPress={() => navigation.navigate('PreClosure')}>{t('common:EnterOtp')} </Text>

                  <OTPInputView
      ref={otpInput2}
      autoFocus={true}
      inputCount={4}
      inputCellLength={1}
      offTintColor={!otp ? "lightgrey" : "red"}
      tintColor={!otp ? "lightgrey" : "red"}
      textInputStyle={[styles.imputContainerStyle, { color: '#090A0A', borderRadius: 8, backgroundColor: '#FCFCFC', borderColor: !otp ? "lightgrey" : "red" }]}
      keyboardType="numeric"
      containerStyle={{ marginTop: 7 }}
      handleTextChange={(code => {
          setOtpValue(code)
          if (code.length === 4) {
            if (code == '1091') {
              navigation.navigate('Permission')
              // setOtp(false)
            }
            else {
              console.log("otp value//...", OtpValue)
              // setOtp(true)
              // setCount(1)
            }
          }
      })}

                    
                  />
                    {invalidotp ?
                                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 12, marginBottom: 5 }}>
                                    <Text style={{ color: "#EB5757", fontFamily: FONTS.FontRegular, fontSize: 12, textAlign: 'center' }}>{t('common:otpValid')}</Text>
                                </View> : null}


                { timerCount> 0 ? <View style={{ marginTop: Dimensions.get('window').height * 0.03 }}>
                    <Text style={styles.TextResend}>{t('common:Resend')} 00:{timerCount < 10 ? '0' : ''}{timerCount}</Text>
                  </View>: <TouchableOpacity onPress={()=>ResendOtp()} style={{ marginTop: Dimensions.get('window').height * 0.03,flexDirection:'row' }}>
                  <Resend style={{ width: 9, height: 11, top: 3, marginRight: 6, }} resizeMode="contain" />
                    <Text style={styles.TextResend1}>{t('common:Resend1')}</Text>
                  </TouchableOpacity>}




                </View>
                 
                }


{/* ############################################################################ */}



                            {maxError ?
                                <View style={{ marginTop: Dimensions.get('window').height * 0.03, }}>
                                    <Text style={{ color: "#EB5757", fontFamily: FONTS.FontRegular, fontSize: 12, textAlign: 'center', width: width * 0.8,marginRight:20 }}>{t('common:Valid2')}</Text>
                                    <Text style={{ color: "#EB5757", fontFamily: FONTS.FontRegular, fontSize: 12, textAlign: 'center' }}>{t('common:Valid3')}</Text></View>
                                : null}



              <Call />
            </View>
          </ScrollView>


          <RelationModal
                visible={ModalVisible1}
                setRelation={setRelation}
                setPurposes={setPurposes}
                setModalVisible={setModalVisible1}
                setStatus={setStatus}
                onPressOut={() => setModalVisible1(!ModalVisible1)}
            // navigation={navigation}

            />



          <ErrorModal
                ModalVisible={ModalError}
                onPressOut={() => {
                    setModalError(!ModalError)
                  
                }}
                setModalVisible={setModalError}
            />




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


            <ErrorModal1
                ModalVisible={ModalError1}
                onPressOut={() => {
                    setModalError(!ModalError1)
                    setModalReason(!ModalReason)
                }}
                setModalVisible={setModalError1}
                navigation={navigation} 
            />

          <TouchableOpacity onPress={() => OtpValue?.length === 4 && number?.length === 10 ? verifyCGOTP() : console.log("geki")}
            style={[styles.buttonView, { backgroundColor: OtpValue?.length === 4 && number?.length === 10 ? COLORS.colorB : '#E0E0E0' }]}>
            <Text style={[styles.continueText, { color: OtpValue?.length === 4 && number?.length === 10 ? COLORS.colorBackground : COLORS.colorWhite3 }]}>Continue</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>

      </View>


    </SafeAreaProvider>
  )
}

export default ContinuingGuarantor

const styles = StyleSheet.create({
  container1: {
    flex: 0,
    backgroundColor: "#002B59",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.colorBackground,
    paddingHorizontal: 16
  },
  headerText: {
    fontSize: 12,
    fontFamily: FONTS.FontRegular,
    color: COLORS.colorBlack,
    paddingTop: 21
  },
  dropDown: {
    borderWidth: 1,
    borderColor: COLORS.colorBorder,
    borderRadius: 8,
    padding: 13,
    marginTop: 9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  spouseText: {
    fontSize: 14,
    fontFamily: FONTS.FontRegular,
    color: COLORS.colorDark,
  },
  imputContainerStyle: {
    borderWidth: 1,
    height: 48,
    width: 48,
    fontSize: 12,
    fontWeight: 'bold',
},
  inPutStyle: {
    borderWidth: 1,
    borderColor: COLORS.colorBorder,
    borderRadius: 8,
    paddingLeft: 15,
    //paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 9,
    height: width * 0.14,
    backgroundColor: '#FCFCFC',
    flexDirection: 'row'
  },
  mobileText: {
    fontSize: 12,
    fontFamily: FONTS.FontRegular,
    color: COLORS.colorBlack,
    marginTop: 22
  },
  TextResend: {
    fontSize: 12,
    fontFamily: FONTS.FontMedium,
    //color: COLORS.colorBlack
    color: '#3B3D43',
    fontWeight: '500'
  },
  containerBox: {
    borderWidth: 1,
    borderColor: COLORS.colorBorder,
    marginTop: 20,
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
  },
  circleView: {
    width: 40,
    height: 40,
    backgroundColor: '#CE748F',
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
  ViewOtp: {
    marginTop: Dimensions.get('window').height * 0.11,
    marginBottom: 13,
    alignItems: 'center',
    justifyContent: 'center'

  },
  textOtp: {
    fontSize: 14,
    fontFamily: FONTS.FontSemiB,
    color: COLORS.colorDark,
    marginBottom: 10
    // fontWeight: '700'
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
  buttonView: {
    backgroundColor: COLORS.colorB,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 54,
    height: 48,
    marginBottom: 20
  },
  continueText: {
    fontSize: 14,
    fontFamily: FONTS.FontBold,
    color: COLORS.colorBackground,
    letterSpacing: 0.64
  },
  textIn1: {
    fontSize: 14,
    color: '#1A051D',
    fontFamily: FONTS.FontRegular,
    
    width: width * 0.7

  },
  CallView: {
    width: 35,
    height: 35,
    borderRadius: 17,
    backgroundColor: 'rgba(39, 174, 96, 1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  OtpInput: {
    width: '75%',
    height: 50,
    fontSize: 25,
    borderRadius: 8,
    fontWeight: 'bold',
    color: "black",
    borderColor: '#ECEBED',
    backgroundColor: COLORS.colorBackground

    //margin:5
  },
  TextResend1: {
    fontSize: 12,
    color: COLORS.colorB,
    fontFamily: FONTS.FontExtraBold,
    fontWeight: 'bold',
    marginTop:2
},


})