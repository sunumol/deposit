import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  Platform,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  BackHandler
} from 'react-native'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon1 from 'react-native-vector-icons/Entypo'
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// -------------- Component Imports ------------------------------
import Header from '../../Components/Header';
import ErrorModal1 from './components/ErrorModal1';
import ErrorModal2 from './components/ErrorModal2';
import ReasonModal from '../DetailedCheck/Components/ReasonModal';
import ModalSave from '../../Components/ModalSave';
import { COLORS, FONTS } from '../../Constants/Constants';
import Statusbar from '../../Components/StatusBar';
import ErrorModal from './components/ErrorModal';
import RelationModal from './components/RelationModal';
import Resend from '../../assets/Images/resend.svg'
import OTPInputView from '../../Components/OTPInputView'
import { api } from '../../Services/Api';

// -------------- Image Imports ---------------------
import Call from '../../assets/image/calls.svg';
import Image1 from '../../assets/Images/cakes.svg';

const { height, width } = Dimensions.get('screen');

const ContinuingGuarantor = ({ navigation, route }) => {

  const isDarkMode = true;
  const { t } = useTranslation();
  const otpInput2 = React.createRef();
  const activityId = useSelector(state => state.activityId);
  const scrollViewRef = useRef();

  const [Name,setName] = useState('')
  const [number, onChangeNumber] = useState('')
  const [relation, setRelation] = useState()
  const [Purpose, setPurpose] = useState(null)
  const [Purposes, setPurposes] = useState(null)
  const [customerNumber, setCustomerNumber] = useState('')
  const [spousedetail, setSpousedetail] = useState('')
  const [invalidotp, setInvalidotp] = useState(false)
  const [OtpValue, setOtpValue] = useState('')
  const [timerCount, setTimer] = useState(30)
  const [IsOtp1, setIsOtp1] = useState(false)
  const [verifyotpstatus, setVerifyotpstatus] = useState(false)
  const [ModalError, setModalError] = useState(false)
  const [ModalVisible1, setModalVisible1] = useState(false)
  const [status, setStatus] = useState(false)
  const [ModalError2, setModalError2] = useState(false)
  const [maxError, setMaxError] = useState(false)
  const [otp, setOtp] = useState(false)
  const [ResendOtps, setResendOtp] = useState(false)
  const [ModalVisible, setModalVisible] = useState(false)
  const [ModalReason, setModalReason] = useState(false)
  const [ModalError1, setModalError1] = useState(false)
  const [PhoneValid, setPhoneValid] = useState(false)
  const [ResendState,setResendState] = useState()

  const [lang, setLang] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const getData = async () => {
    try {
      const mob = await AsyncStorage.getItem('Mobile')
      const lang = await AsyncStorage.getItem('user-language')
      setLang(lang)
      setCustomerNumber(mob)
    } catch (e) {
      console.log('mob', e)
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

  useEffect(() => {
    console.log("route?.params?.relation",route?.params?.relation)
    getCGdetails()
    getSpousedetail()
  }, [])

  useEffect(() => {
    setPurpose(Purpose)
    setPurposes(Purposes)
    if (Purposes) {
      setRelation(Purposes)
    }
  }, [Purposes, relation])


  useEffect(() => {
    if (route?.params?.relation == "Spouse") {
      setRelation('Spouse')
     
    }
  
  }, [])

  useEffect(() => {
    if (!OtpValue) {
      setOtp(false)
    }
  }, [OtpValue])

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
        setResendOtp(true)
      }, 1000)
      setIsOtp1(true)
      setResendOtp(true)
      setStatus(true)
      setTimer(30)
    } else {
      setTimeout(() => {
        setIsOtp1(true)
        setResendOtp(true)
        setStatus(true)
      }, 1000)
      setIsOtp1(true)
      setResendOtp(true)
      setStatus(true)
    }
  }

  const CountDownResend = () => {
    setTimer(30)
    setStatus(true)
    setIsOtp1(true)
    //setMaxError(true)
  }

  // ------------------ get Conduct DLE basic detail Village Api Call Start ------------------
  const updateRejection = async () => {
    const data = {
      "activityStatus": 'Submitted wrong data',
      "employeeId": 1,
      "activityId": activityId
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
  }, []);

  // ------------------spouse detail ------------------
  const getSpousedetail = async () => {
    const data = {
      "activityId": activityId
    }
    await api.getSpousedetail(data).then((res) => {
      console.log('-------------------res spousedetail co-app', activityId)
      if (res?.status) {
        console.log('-------------------res spousedetail co-app',res?.data?.body)
        setSpousedetail(res?.data?.body)
        setRelation('Spouse')
      }
    }).catch((err) => {
      console.log('-------------------err spousedetail', err?.response)
    })
  };
  // ------------------ ------------------

  // ------------------get CG detail ------------------
  const getCGdetails = async () => {
    const data = {
      "activityId": activityId
    }
    await api.getCGdetails(data).then((res) => {
      console.log('-------------------res getCGdetails', res)
      if (res?.status) {
        if (res?.data?.body?.relationShip == 'Spouse') {
          getSpousedetail()
          setRelation('Spouse')
        }
      }
    }).catch((err) => {
      console.log('-------------------err getCGdetails', err?.response)
    })
  };
  // ------------------ ------------------------------------------------

  // ------------------ verifyCG detail --------------------------------
  const verifyCG = async (num) => {
    console.log("verify resend come",maxError,IsOtp1,timerCount)
    const data = {
      "activityId": activityId,
      "mobileNumber": "+91" + num,
      "name":relation !== 'Spouse' ? Name : "",
      "relationShip": relation
    }
    await api.verifyCG(data).then((res) => {
      console.log('-------------------res verifyCG------1', res)
      if (res?.status) {
        setMaxError(false)
        setIsOtp1(true)
        setVerifyotpstatus(true)
        setStatus(true)
        setTimer(30)
      }
    }).catch((err) => {
      setVerifyotpstatus(true)
      setStatus(false)
      setTimer(0)
      console.log('-------------------err verifyCG', err?.response?.data?.message)
      if (err?.response?.data?.message.includes('Maximum number of OTPs are exceeded.')) {
        setIsOtp1(true)
        setMaxError(true)
        setErrorMessage(err?.response?.data?.message)
        setTimeout(() => {
          setMaxError(false)
          setTimer(0)
        }, 5000);
      } else if (err?.response?.data?.message === "Mobile number cannot be same as that of the Customer") {
        setModalError2(true)
      } else {
        setMaxError(false)
      }
    })
  };
  // --------------------------------------------------------------------------------------------------------------

  // ------------------verifyCG detail -----------------------------
  async function ResendOtp() {
    setInvalidotp(false)
    otpInput2.current.clear()
    const data = {
      "activityId": activityId,
      "mobileNumber": "+91" + number,
      "name":relation !== 'Spouse' ? Name : "",
      "relationShip": relation
    }
    await api.verifyCG(data).then((res) => {
      console.log('-------------------res verifyCG', res)
      if (res?.status) {
        CountDownResend()
        setStatus(true)
        setTimer(30)
      }
    }).catch((err) => {
      if (err?.response?.data?.message) {
        setResendOtp(false)
        setStatus(false)
        setTimer(0)
      }
      if (err?.response?.data?.message.includes('Maximum number of OTPs are exceeded.')) {
        setErrorMessage(err?.response?.data?.message)
        setMaxError(true)
        setTimeout(() => {
          setMaxError(false)
        }, 3000);
      }
      console.log('-------------------err verifyCG', err?.response)
    })
  };
  // ------------------ ----------------------------------------------

  // ------------------verifyCG detail ------------------------------------------------------------------------------
  const verifyCGOTP = async (mobnumber) => {
    const data = {
      "activityId": activityId,
      "otp": OtpValue
    }
    await api.verifyCGOTP(data).then((res) => {
      console.log('-------------------res verifyCG', res)
      if (res?.status) {
        setIsOtp1(false)
        if(relation !== 'Spouse'){
          navigation.navigate('UploadVid')
        }else{
          navigation.navigate('AddVehicle')
        }
      
      }
    }).catch((err) => {
      if (err?.response?.data?.message == 'You entered wrong OTP') {
        setInvalidotp(true)
        setOtp(true)
        setResendOtp(true)
      } else if (err?.response?.data?.message === 'Maximum number of OTPs are exceeded. Please try after 30 minutes.') {
        setResendOtp(false)
        setInvalidotp(true)
        setOtp(true)
      }
    })
  };
  // ------------------ -------------------------------------------------

  const verifyPhone = (Phone) => {
    var reg = /^([0-9])\1{9}$/;
    return reg.test(Phone);
  }

  const GETOTP_Validation = (num) => {
    setPhoneValid(false)
   
    const firstDigitStr = String(num)[0];
    if (num?.length != 10 || num == "") {
      setPhoneValid(true)
    } else if (firstDigitStr === '1' || firstDigitStr === '2' || firstDigitStr === '3' || firstDigitStr === '4' || firstDigitStr === '5' || firstDigitStr === '0') {
      setPhoneValid(true)
      if(num?.length === 10){
        onChangeNumber('')
   
      }
      console.log("inside first digit",number)

    } else if (verifyPhone(num)) {
      setPhoneValid(true)
      console.log("inside second digit")
   
    } else if (!(/^\d{10}$/.test(num))) {
      setPhoneValid(true)
      
      console.log("inside third digit")
    }
    // else if(PhoneValid && num?.length === 10){
    //   onChangeNumber(null)
    // }
    else {

      verifyCG(num)
    }
  }

  const OnchangeNumbers = (num) => {
    setPhoneValid(false)
    setMaxError(false)
    if (/^[^!-\/:-@\.,[-`{-~ ]+$/.test(num) || num === '') {
      if ("+91" + num == customerNumber) {
        setModalError(true)
        setTimer(null)
        setResendOtp(false)
        onChangeNumber('')
        console.log("")
      } else {
        onChangeNumber(num)
        if (num?.length == 10) {
          GETOTP_Validation(num)
        }
        onChangeNumber(num)
        setOtpValue('')
      }
    } else {

    }
  }

  const getInitials = (name) => {
    let initials;
    const nameSplit = name?.split(" ");
    const nameLength = nameSplit?.length;
    if (nameLength > 1) {
      initials =
        nameSplit[0].substring(0, 1) +
        nameSplit[nameLength - 1].substring(0, 1);
    } else if (nameLength === 1) {
      initials = nameSplit[0].substring(0, 1);
    } else return;
    return initials.toUpperCase();
  };

  function containsWhitespace(str) {
    return /\s/.test(str);
}

useEffect(()=>{
  if(PhoneValid){
    onChangeNumber('')
  }
},[PhoneValid])

  return (
    <SafeAreaProvider>

      <SafeAreaView style={styles.container1} />
      <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={"#002B59"} />

      <Header navigation={navigation} name="Co-Applicant" onPress={handleGoBack} />

      <View style={styles.mainContainer}>

        <KeyboardAvoidingView style={{ flex: 1 }}
          {...(Platform.OS === 'ios' && { behavior: 'position' })}
        >
          <ScrollView ref={scrollViewRef}   keyboardShouldPersistTaps={'handled'}
            onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
            <View style={{ flex: 1 }}>
              <Text style={styles.headerText}>Relationship with Customer</Text>
              <TouchableOpacity onPress={() => relation == 'Spouse' ? setModalVisible1(false) : setModalVisible1(true)} style={styles.dropDown}>
                <Text style={styles.spouseText}>{relation ? relation : 'Select'}</Text>
                {relation !== 'Spouse' &&  <Icon1 name="chevron-down" size={18} color={'#808080'} />}
              </TouchableOpacity>
              {relation == 'Spouse' ? <View style={styles.containerBox}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View style={styles.circleView}>
                    <Text style={styles.shortText}>{getInitials(spousedetail?.name)}</Text>
                  </View>
                  <View style={{ flexDirection: 'column', flex: 1, marginLeft: 12 }}>
                    <Text style={styles.nameText}>{spousedetail?.name}</Text>

                    {spousedetail?.occupation == 'DAILY_WAGE_LABOURER,' ?
                      <Text style={styles.underText}>Daily Wage Labourer</Text> :
                      spousedetail?.occupation == 'SALARIED_EMPLOYEE' ?
                        <Text style={styles.underText}>Salaried Employee</Text> :
                        spousedetail?.occupation == 'BUSINESS_SELF_EMPLOYED' ?
                          <Text style={styles.underText}>Business Self Employed</Text> :
                          <Text style={styles.underText}>Farmer</Text>}

                  </View>
                  <View style={{ flexDirection: 'row', left: -5 }}>

                    <Image1 width={11} height={11} top={3} />
                    <Text style={styles.dateText}>{spousedetail?.dateOfBirth}</Text>
                  </View>
                </View>
              </View> : null}

              {relation !== 'Spouse' ?
              <View>
              <Text style={styles.mobileText}>Name</Text>
              <View style={[styles.inPutStyle, { backgroundColor:COLORS.colorBackground, }]}>
                <TextInput
                  placeholder=''
                  value={Name}
                  maxLength={25}
                  style={[styles.textIn1,
                  {

                    color: COLORS.colorDark
                  }]}
                  onChangeText={(text) => {
                    const firstDigitStr = String(text)[0];
                    if (firstDigitStr == ' ') {
                        containsWhitespace(text)
                        // 👇️ this runs
                        setName('')
                       // ToastAndroid.show("Please enter a valid name ", ToastAndroid.SHORT);
                        console.log('The string contains whitespace', Name);
                    }
                    else if (/^[^!-\/:-@\.,[-`{-~1234567890₹~`|•√π÷×¶∆€¥$¢^°={}%©®™✓]+$/.test(text) || text === '') {
                        setName(text)
                        console.log("verify daat1")
                    }


                
                  }}
                  placeholderTextColor={COLORS.colorDark}
                  keyboardType="email-address"
                 
                />
                </View>
                </View>:null}

         

              <Text style={styles.mobileText}>Mobile Number</Text>
              <View style={[styles.inPutStyle, { backgroundColor: IsOtp1 && status === true ? '#ECEBED' : COLORS.colorBackground, }]}>
                <TextInput
                  placeholder=''
                  value={number}
                  maxLength={10}
                  style={[styles.textIn1,
                  {

                    color: IsOtp1 && status === true ? '#808080' : COLORS.colorDark
                  }]}
                  onChangeText={(text) => {
                    console.log("text length",text?.length)
                  
                    OnchangeNumbers(text)
                    setInvalidotp(false)
                    setMaxError(false)
                  }}
                  placeholderTextColor={COLORS.colorDark}
                  keyboardType="numeric"
                  editable={IsOtp1 && status === true ? false : true}
                />
                {number?.length === 10 &&
                  <View style={styles.CallView}>
                    <Call width={16} height={16} />
                  </View>}
              </View>
              {PhoneValid &&
                <Text style={{
                  fontFamily: FONTS.FontRegular, color: "red", paddingTop: width * 0.02,
                  fontSize: 12
                }}>Please enter a valid Mobile Number</Text>}


              {/* #################################################################### */}

              {(number?.length === 10 && !PhoneValid) &&
                <View style={styles.ViewOtp}>
                  <Text style={styles.textOtp}>{t('common:EnterOtp')} </Text>


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
                      setInvalidotp(false)
                      // if (code.length === 4) {
                      //   // if (code == '1091') {
                      //   //   navigation.navigate('Permission')
                      //   // }
                      //   // else {
                      //   //   console.log("otp value//...", OtpValue)
                      //   // }
                      // }
                    })}
                  />

                  {invalidotp ?
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 12, marginBottom: 5 }}>
                      <Text style={{ color: "#EB5757", fontFamily: FONTS.FontRegular, fontSize: 12, textAlign: 'center' }}>{t('common:otpValid')}</Text>
                    </View> : null}

                  {IsOtp1 && status === true &&
                    <View style={{ marginTop: Dimensions.get('window').height * 0.03 }}>
                      <Text style={styles.TextResend}>{t('common:Resend')} 00:{timerCount < 10 ? '0' : ''}{timerCount}</Text>
                    </View>
                  }

                  {timerCount === 0 ?
                      <TouchableOpacity onPress={() => ResendOtp()} style={{ padding: 18 }}>
                        <View style={{ flexDirection: 'row', }}>
                          <Resend style={{ width: 9, height: 11, top: 3, marginRight: 6, }} resizeMode="contain" />
                          <Text style={styles.TextResend1} >{t('common:Resend1')}</Text>
                        </View>
                      </TouchableOpacity> : null}

                </View>
              }

              {/* ############################################################################ */}

              {maxError === true ?
                 lang == "en" ?
                 <View style={{ marginTop: Dimensions.get('window').height * 0.03, }}>
                     <Text style={{ color: "#EB5757", fontFamily: FONTS.FontRegular, fontSize: 12, textAlign: 'center', width: width * 0.8 }}>{t('common:Valid2')}</Text>
                     <Text style={{ color: "#EB5757", fontFamily: FONTS.FontRegular, fontSize: 12, textAlign: 'center' }}>Please try after {errorMessage.replace(/\D/g, '')} minutes</Text>
                 </View>
                 :
                 <View style={{ marginTop: Dimensions.get('window').height * 0.03, }}>
                     <Text style={{ color: "#EB5757", fontFamily: FONTS.FontRegular, fontSize: 12, textAlign: 'center', width: width * 0.8 }}>{t('common:Valid2')}</Text>
                     <Text style={{ color: "#EB5757", fontFamily: FONTS.FontRegular, fontSize: 12, textAlign: 'center' }}>{errorMessage.replace(/\D/g, '')} {t('common:Valid3')}</Text>
                 </View>
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
            Purpose={Purpose}
            relation={relation}
            onPressOut={() => setModalVisible1(!ModalVisible1)}
          />

          <ErrorModal
            ModalVisible={ModalError}
            onPressOut={() => {
              setModalError(!ModalError)
            }}
            setModalVisible={setModalError}
          />

          <ErrorModal2
            ModalVisible={ModalError2}
            onPressOut={() => {
              setModalError2(!ModalError2)
              onChangeNumber('')
            }}
            setModalVisible={setModalError2}
          />

          <ModalSave
            Press={() => {
              setModalVisible(false),
                setModalReason(true)
            }}
            Press1={() => { navigation.navigate('Profile'), setModalVisible(false) }}
            ModalVisible={ModalVisible}
            setModalVisible={setModalVisible}
            onPressOut={() => {
              setModalVisible(false)
            }}
            navigation={navigation}
          />

          <ReasonModal
            onPress1={() => {
              updateRejection()
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

          <TouchableOpacity onPress={() => OtpValue?.length === 4 && number?.length === 10 && relation ? verifyCGOTP() : console.log("geki")}
            style={[styles.buttonView, { backgroundColor: OtpValue?.length === 4 && number?.length === 10 && relation ? COLORS.colorB : '#E0E0E0' }]}>
            <Text style={[styles.continueText, { color: OtpValue?.length === 4 && number?.length === 10 && relation ? COLORS.colorBackground : COLORS.colorWhite3 }]}>Continue</Text>
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
  TextResend1: {
    fontSize: 12,
    color: COLORS.colorB,
    fontFamily: FONTS.FontExtraBold,
    fontWeight: 'bold',
    marginTop: 2
  },
})