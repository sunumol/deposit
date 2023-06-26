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
  BackHandler,
  Keyboard
} from 'react-native'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon1 from 'react-native-vector-icons/Entypo'
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import OccupationModal from '../../Components/OccupationModal';

// -------------- Component Imports ------------------------------
import Header from '../../Components/Header';
import ErrorModal1 from './components/ErrorModal1';
import ErrorModal2 from './components/ErrorModal2';
import ErrorModal3 from './components/ErrorModal3'
import ReasonModal from '../DetailedCheck/Components/ReasonModal';
import ModalSave from '../../Components/ModalSave';
import { COLORS, FONTS } from '../../Constants/Constants';
import Statusbar from '../../Components/StatusBar';
import ErrorModal from './components/ErrorModal';
import RelationModal from './components/RelationModal';
import Resend from '../../assets/Images/resend.svg'
import OTPInputView from '../../Components/OTPInputView'
import { api } from '../../Services/Api';
import SmsAndroid from 'react-native-get-sms-android';
import CorrectionModal from './components/CorrectionModal';
import Verifypop2 from './components/VerifyPop2';
// -------------- Image Imports ---------------------
import Call from '../../assets/image/calls.svg';
import Image1 from '../../assets/Images/cakes.svg';
import Verifypop from './components/Verifypop';


const { height, width } = Dimensions.get('screen');

const ContinuingGuarantor = ({ navigation, route }) => {
  console.log("route params", route?.params?.isCheck)
  const isDarkMode = true;
  const { t } = useTranslation();
  const otpInput2 = React.createRef();
  const activityId = useSelector(state => state.activityId);
  const scrollViewRef = useRef();

  const [Name, setName] = useState('')
  const [number, onChangeNumber] = useState('')
  const [relation, setRelation] = useState()
  const [Purpose, setPurpose] = useState(null)
  const [Purposes, setPurposes] = useState(null)
  const [customerNumber, setCustomerNumber] = useState('')
  const [spousedetail, setSpousedetail] = useState('')
  const [invalidotp, setInvalidotp] = useState(false)
  const [invalidotp1, setInvalidotp1] = useState(false)
  const [OtpValue, setOtpValue] = useState('')
  const [timerCount, setTimer] = useState(30)
  const [IsOtp1, setIsOtp1] = useState(false)
  const [Resends, setResends] = useState(false)
  const [verifyotpstatus, setVerifyotpstatus] = useState(false)
  const [ModalError, setModalError] = useState(false)
  const [ModalVisible1, setModalVisible1] = useState(false)
  const [status, setStatus] = useState(false)
  const [ModalError2, setModalError2] = useState(false)
  const [ModalError3, setModalError3] = useState(false)
  const [maxError, setMaxError] = useState(false)
  const [otp, setOtp] = useState(false)
  const [ResendOtps, setResendOtp] = useState()
  const [ModalVisible, setModalVisible] = useState(false)
  const [ModalReason, setModalReason] = useState(false)
  const [ModalError1, setModalError1] = useState(false)
  const [PhoneValid, setPhoneValid] = useState(false)
  const [ResendState, setResendState] = useState()
  const [keyboard1, setKeyboard1] = useState(false)
  const [lang, setLang] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [condirmDate, setConfirmDate] = useState()
  const [fetOtp, setOtpFetch] = useState(false)
  const [occupation, setOccupation] = useState('')
  const [occupationModalVisible, setOccupationModalVisible] = useState(false);
  const [OccupationD, setOccupationD] = useState('')
  const [custID, setCustId] = useState('')
  const [ModalVisibleC, setModalVisibleC] = useState(false)
  const [verifypop, setverifypop] = useState(false);
  const [verifypop2, setverifypop2] = useState(false);
  const isLastPage = useSelector(state => state.isLastPage);
  const [Correct1, setCorrect1] = useState(route?.params?.Correction)


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
    AsyncStorage.getItem("CustomerId").then((value) => {
      setCustId(value)
    })
   // console.log("route?.params?.relation", route?.params?.relation)
    getCGdetails()
    getSpousedetail()
  //  }
    
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
      setResends(true)
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
      "employeeId": Number(custID),
      "activityId": activityId
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

  useEffect(() => {
    getData();
  }, []);


  // ------------------spouse detail ------------------
  const getSpousedetail = async () => {
    const data = {
      "activityId": activityId
    }
    await api.getSpousedetail(data).then((res) => {
     // console.log('-------------------res spousedetail co-app', activityId)
      if (res?.status) {
        console.log('-------------------res spousedetail co-app', res?.data?.body)
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
    //console.log("verify resend come", maxError, IsOtp1, timerCount)
    const data = {
      "activityId": activityId,
      "mobileNumber": "+91" + num,
      "name": relation !== 'Spouse' ? Name : spousedetail?.name,
      "relationShip": relation,
      "occupation": relation !== 'Spouse' ? OccupationD : spousedetail?.occupation
    }
    await api.verifyCG(data).then((res) => {
      console.log('-------------------res verifyCG------otp requesr', res)
      if (res?.status) {
        setMaxError(false)
        setIsOtp1(true)
        setVerifyotpstatus(true)
        setStatus(true)
        setTimer(30)
        setOtpFetch(true)
      }
    }).catch((err) => {
      setVerifyotpstatus(true)
      setStatus(false)
      setTimer(0)
      console.log('-------------------err verifyCG12 otp request', err?.response)
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
        setResends(false)
        setTimer(0)
      } else if (err?.response?.data?.message === "This mobile number already registered") {
        setModalError3(true)
        setResends(false)
        setTimer(0)
      }
      else {
        setMaxError(false)
      }
    })
  };
  // --------------------------------------------------------------------------------------------------------------

  // ------------------verifyCG detail -----------------------------
  async function ResendOtp() {

    setInvalidotp(false)
    setInvalidotp1(false)

   // console.log('==================================', OtpValue?.length)
    if (OtpValue?.length > 0) {
      otpInput2.current.clear()
    }
    const data = {
      "activityId": activityId,
      "mobileNumber": "+91" + number,
      "name": relation !== 'Spouse' ? Name : spousedetail?.name,
      "relationShip": relation,
      "occupation": relation !== 'Spouse' ? OccupationD : spousedetail?.occupation

    }
    await api.verifyCG(data).then((res) => {
      console.log('-------------------res verifyCG',)
      if (res?.status) {
        CountDownResend()
        setResends(true)
        setOtpFetch(true)

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
      } else {
        onChangeNumber('')
        setverifypop2(true)
      }
      console.log('-------------------err verifyCG34', err?.response)
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
      console.log('-------------------res verifyCG')
      if (res?.status) {
        setIsOtp1(false)
        if (route?.params?.isCheck == true) {
          setModalVisibleC(true)
         
        } else {
          getLastPage()
          console.log("route para")
         // 
        }

        // if (relation !== 'Spouse') {
        //   navigation.navigate('UploadVid')
        // } else {
        //   navigation.navigate('AddVehicle')
        // }

      }
    }).catch((err) => {
      console.log('1231241231231231332!@@£@$$!@!',err)
      if (err?.response?.data?.message == 'You entered wrong OTP') {
        setInvalidotp(true)
        setOtp(true)
        setResendOtp(true)
      } else if (err?.response?.data?.message === 'Maximum number of OTPs are exceeded. Please try after 30 minutes.') {
        setResendOtp(false)
        setInvalidotp(true)
        setOtp(true)
      } else {
        
        setverifypop(true)
        setOtp(true)

        setResendOtp(true)
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
      if (num?.length === 10) {
        onChangeNumber('')

      }
     // console.log("inside first digit", number)

    } else if (verifyPhone(num)) {
      setPhoneValid(true)
      //console.log("inside second digit")

    } else if (!(/^\d{10}$/.test(num))) {
      setPhoneValid(true)

     // console.log("inside third digit")
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
        //console.log("")
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

 // { console.log("occupate", OccupationD) }

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

  useEffect(() => {
    if (PhoneValid) {
      onChangeNumber('')
    }
  }, [PhoneValid])
 // { console.log("isotp true", IsOtp1) }


  useEffect(() => {
    if (fetOtp) {
      const interval = setInterval(() => {
        //callMessage()
      }, 3000);
      return () => clearInterval(interval);
    }
    // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [fetOtp])

  // -------------------------------- Fetch Message From device Start -------------------------------------------
  const callMessage = () => {
    var filter = {
      box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all
      minDate: condirmDate, // timestamp (in milliseconds since UNIX epoch)
      maxDate: new Date().getTime(),
      sp_id: 3001,
    };
    SmsAndroid.list(
      JSON.stringify(filter),
      (fail) => {
        console.log('Failed with this error: ' + fail);
      },
      (count, smsList) => {
        console.log('Count: ', count);
        console.log('List: ', smsList);
        var arr = JSON.parse(smsList);

        arr.forEach(function (object) {
          console.log('Object: ' + object);
          console.log('--> sms date' + object.date);
          console.log('--> sms body' + object.body);

          if (object.body.includes('One Time Password')) {
            let match = object.body.match(/\b\d{4}\b/)
            setOtpFetch(false)
            if (match) {
              setOtpFetch(false)
              setOtpValue(match[0])
              //setOtpMessage(match[0])
              console.log("otpmessage.....", match[0])
              console.log("match exist", match)

            }
          }

        });
      },
    );
  };

  const removeEmojis = (string) => {
    // emoji regex from the emoji-regex library
    const regex = /\uD83C\uDFF4(?:\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74)\uDB40\uDC7F|\u200D\u2620\uFE0F)|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC68(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3]))|\uD83D\uDC69\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\uD83D\uDC68(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)\uFE0F|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDD6-\uDDDD])(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\uD83D\uDC69\u200D[\u2695\u2696\u2708])\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC68(?:\u200D(?:(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D[\uDC66\uDC67])|\uD83C[\uDFFB-\uDFFF])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF4\uD83C\uDDF2|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDB5\uDDB6\uDDD1-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDEEB\uDEEC\uDEF4-\uDEF9]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD70\uDD73-\uDD76\uDD7A\uDD7C-\uDDA2\uDDB0-\uDDB9\uDDC0-\uDDC2\uDDD0-\uDDFF])|(?:[#*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEF9]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD70\uDD73-\uDD76\uDD7A\uDD7C-\uDDA2\uDDB0-\uDDB9\uDDC0-\uDDC2\uDDD0-\uDDFF])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC69\uDC6E\uDC70-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD26\uDD30-\uDD39\uDD3D\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDD1-\uDDDD])/g

    return string?.replace(regex, '')
  }

  const getLastPage = async () => {
    console.log("LASTPAGE", activityId)
    const data = {
      "activityId": activityId
    }
    await api.getLastPage(data).then((res) => {
      console.log("last page upadte", res?.data, res?.data?.body?.nextPage)
      if (res?.data?.body?.isLasCorrectin == false && res?.data?.body?.nextPage == 1) {
        navigation.navigate('CustomerDetails',{Correction:Correct1})
      } else if (res?.data?.body?.isLasCorrectin == false && res?.data?.body?.nextPage == 2) {
        if (Purposes == 'Spouse') {
          navigation.navigate('ContinuingGuarantor', { relation: 'Spouse', isCheck: res?.data?.body?.isLasCorrectin,Correction:Correct1 })
        } else {
          navigation.navigate('ContinuingGuarantor', { relation: 'other', isCheck: res?.data?.body?.isLasCorrectin,Correction:Correct1 })
        }

      } else if (res?.data?.body?.isLasCorrectin == false && res?.data?.body?.nextPage == 4) {
        if (relation !== 'Spouse') {
          navigation.navigate('UploadAdhaar', { isCheck: res?.data?.body?.isLasCorrectin,Correction:Correct1 })
        } else {
          navigation.navigate('AddVehicle', { isCheck: res?.data?.body?.isLasCorrectin,Correction:Correct1 })
        }
      } else if (res?.data?.body?.isLasCorrectin == false && res?.data?.body?.nextPage == 5) {
        navigation.navigate('VehicleOwn', { isCheck: res?.data?.body?.isLasCorrectin,Correction:Correct1 })
      } else if (res?.data?.body?.isLasCorrectin == false && res?.data?.body?.nextPage == 6) {
        navigation.navigate('EnergyUtility', { isCheck: res?.data?.body?.isLasCorrectin,Correction:Correct1 })
      } else if (res?.data?.body?.isLasCorrectin == false && res?.data?.body?.nextPage == 7) {
        navigation.navigate('IncomeDetails', { isCheck: res?.data?.body?.isLasCorrectin,Correction:Correct1 })
      } else if (res?.data?.body?.isLasCorrectin == false && res?.data?.body?.nextPage == 8) {
        navigation.navigate('IncomeDetailsSpouse', { isCheck: res?.data?.body?.isLasCorrectin,Correction:Correct1 })
      }
      else if (res?.data?.body?.isLasCorrectin == true && res?.data?.body?.nextPage == 2) {
        navigation.navigate('ResidenceOwner', { isCheck: res?.data?.body?.isLasCorrectin ,Correction:Correct1})
      } else if (res?.data?.body?.isLasCorrectin == true && res?.data?.body?.nextPage == 3) {
        navigation.navigate('ContinuingGuarantor', { isCheck: res?.data?.body?.isLasCorrectin,Correction:Correct1 })
      }


      else if (res?.data?.body?.isLasCorrectin == true && res?.data?.body?.nextPage == 6) {
        navigation.navigate('EnergyUtility', { isCheck: res?.data?.body?.isLasCorrectin,Correction:Correct1 })
      }
      else if (res?.data?.body?.isLasCorrectin == true && res?.data?.body?.nextPage == 7) {
        navigation.navigate('IncomeDetails', { isCheck: res?.data?.body?.isLasCorrectin,Correction:Correct1 })
      } else if (res?.data?.body?.isLasCorrectin == true && res?.data?.body?.nextPage == 8) {
        navigation.navigate('IncomeDetailsSpouse',{Correction:Correct1})
      } else if (res?.data?.body?.isLasCorrectin == true && res?.data?.body?.nextPage == 9) {
        if (relation !== 'Spouse') {
          navigation.navigate('UploadVid', { isCheck: res?.data?.body?.isLasCorrectin,Correction:Correct1 })
        } else {
          navigation.navigate('AddVehicle', { isCheck: res?.data?.body?.isLasCorrectin,Correction:Correct1 })
        }
       
      } else if (res?.data?.body?.isLasCorrectin == false && res?.data?.body?.nextPage == 9) {
        if (relation !== 'Spouse') {
          navigation.navigate('UploadVid', { isCheck: res?.data?.body?.isLasCorrectin,Correction:Correct1 })
        } else {
          navigation.navigate('AddVehicle', { isCheck: res?.data?.body?.isLasCorrectin,Correction:Correct1 })
        }
      }


    }).catch((err) => {
      console.log('-------------------err spousedetail1', err?.response)

    })
  };


  const getDLEConfirmation = async () => {
    const data = {
      "activityId": activityId
    }
    await api.getCorrectionNotify(data).then((res) => {

      if (res?.status) {

        setModalVisibleC(false)
        navigation.reset({
          index: 0,
          routes: [{ name: 'Proceed' }],
        })

      }

    }).catch((err) => {
      console.log('-------------------err spousedetail1', err?.response)

    })
  };

   // ------------------verifyCG detail ------------------------------------------------------------------------------
   const verifyCGOTPBackSave = async (mobnumber) => {
    const data = {
      "activityId": activityId,
      "otp": OtpValue
    }
    await api.verifyCGOTP(data).then((res) => {
      console.log('-------------------res verifyCG', res)
      if (res?.status) {
        navigation.navigate('Profile'),
         setModalVisible(false)
      }
    }).catch((err) => {
  
    
    })
  };

  return (
    <SafeAreaProvider>

      <SafeAreaView style={styles.container1} />
      <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={"#002B59"} />

      <Header navigation={navigation} name="Co-Applicant" onPress={handleGoBack} />

      <View style={styles.mainContainer}>

        <KeyboardAvoidingView style={{ flex: 1 }}
          {...(Platform.OS === 'ios' && { behavior: 'position' })}
        >
          <ScrollView ref={scrollViewRef} keyboardShouldPersistTaps={'handled'}
            onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
            <View style={{ flex: 1 }}>
              <Text style={styles.headerText}>Relationship with Customer</Text>
              <TouchableOpacity onPress={() => relation == 'Spouse' ? setModalVisible1(false) : setModalVisible1(true)} style={styles.dropDown}>
                <Text style={[styles.spouseText, { color: relation ? COLORS.colorDark : COLORS.colorDSText }]}>{relation ? relation : 'Select'}</Text>


                {/* {relation !== 'Spouse' && <Icon1 name="chevron-down" size={18} color={'#808080'} />} */}
              </TouchableOpacity>
              {relation == 'Spouse' ? <View style={styles.containerBox}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View style={styles.circleView}>
                    <Text style={styles.shortText}>{getInitials(spousedetail?.name)}</Text>
                  </View>
                  <View style={{ flexDirection: 'column', flex: 1, marginLeft: 12 }}>
                    <Text style={styles.nameText}>{spousedetail?.name}</Text>


                    <Text style={[styles.underText, { textTransform: 'capitalize' }]}>{spousedetail?.occupation?.replace(/_/g, ' ')}</Text>


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
                  <View style={[styles.inPutStyle, { backgroundColor: COLORS.colorBackground, }]}>
                    <TextInput
                      placeholder=''
                      value={removeEmojis(Name)}
                      maxLength={25}
                      contextMenuHidden={true}
                      style={[styles.textIn1,
                      {
                        left: -6,
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
                        else if (/^[a-zA-Z ]+$/.test(text) || text === '') {
                          setName(text)
                          console.log("verify daat1")
                        }



                      }}
                      placeholderTextColor={COLORS.colorDark}
                      keyboardType="email-address"

                    />
                  </View>
                </View> : null}


              {relation !== 'Spouse' &&
                <View >
                  <Text style={styles.mobileText}>Occupation</Text>
                  <TouchableOpacity style={[styles.dropDownContainmer, { borderColor: COLORS.colorBorder }]} onPress={() => {
                    setOccupationModalVisible(true)
                  }}>
                    {occupation == ''
                      ? <Text style={styles.textStyle}>{t('common:Select')}</Text>
                      : <Text style={styles.textStyleDrop}>{occupation}</Text>
                    }
                  </TouchableOpacity>
                </View>}

              <Text style={styles.mobileText}>Mobile Number</Text>
              <View style={[styles.inPutStyle, { backgroundColor: IsOtp1 && status === true ? '#ECEBED' : COLORS.colorBackground, }]}>
                <TextInput
                  contextMenuHidden={true}
                  placeholder=''
                  value={number}
                  maxLength={10}
                  style={[styles.textIn1,
                  {
                    left: -6,
                    color: IsOtp1 && status === true ? '#808080' : COLORS.colorDark
                  }]}
                  onChangeText={(text) => {
                    console.log("text length", text?.length)

                    OnchangeNumbers(text)
                    setInvalidotp(false)
                    setInvalidotp1(false)
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
                <View style={[styles.ViewOtp, {}]}>
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
                      setInvalidotp1(false)

                      if (code.length < 4) {
                        setOtp(false)
                      }
                    })}
                  />

                  {invalidotp ?
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 12, marginBottom: 5 }}>
                      <Text style={{ color: "#EB5757", fontFamily: FONTS.FontRegular, fontSize: 12, textAlign: 'center' }}>{t('common:otpValid')}</Text>
                    </View> : null}
                  {invalidotp1 ?
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 12, marginBottom: 5 }}>
                      <Text style={{ color: "#EB5757", fontFamily: FONTS.FontRegular, fontSize: 12, textAlign: 'center' }}>Could not Verify</Text>
                    </View> : null}

                  {IsOtp1 && status === true &&
                    <View style={{ marginTop: Dimensions.get('window').height * 0.03 }}>
                      <Text style={styles.TextResend}>{t('common:Resend')} 00:{timerCount < 10 ? '0' : ''}{timerCount}</Text>
                    </View>
                  }

                  {Resends && timerCount === 0 ?
                    <TouchableOpacity onPress={() => { ResendOtp() }} style={{ padding: 18 }} >
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
                  <View style={{ marginTop: Dimensions.get('window').height * 0.03, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: "#EB5757", fontFamily: FONTS.FontRegular, fontSize: 12, textAlign: 'center', width: width * 0.8 }}>{t('common:Valid2')}</Text>
                    <Text style={{ color: "#EB5757", fontFamily: FONTS.FontRegular, fontSize: 12, textAlign: 'center' }}>Please try after {errorMessage.replace(/\D/g, '')} minutes</Text>
                  </View>
                  :
                  <View style={{ marginTop: Dimensions.get('window').height * 0.03, alignItems: 'center', justifyContent: 'center' }}>
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
            <ErrorModal3
            ModalVisible={ModalError3}
            onPressOut={() => {
              setModalError3(!ModalError3)
              onChangeNumber('')
            }}
            setModalVisible={setModalError3}
          />

          <ModalSave
            Press={() => {
              setModalVisible(false),
                setModalReason(true)
            }}
            Press1={() => {navigation.navigate('Profile'),
            setModalVisible(false)}}
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
          <Verifypop
            ModalVisible={verifypop}
            onPressOut={() => setverifypop(!verifypop)}
            setModalVisible={setverifypop}
          />
          <Verifypop2
            ModalVisible={verifypop2}
            onPressOut={() => setverifypop2(!verifypop2)}
            setModalVisible={setverifypop2}
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
          <OccupationModal
            visible={occupationModalVisible}
            setOccupation={setOccupation}
            setState={setOccupationD}
            state={OccupationD}
            setOccupationModalVisible={setOccupationModalVisible}
            onPressOut={() => setOccupationModalVisible(!occupationModalVisible)}
            navigation={navigation}
          />

          <TouchableOpacity onPress={() => OtpValue?.length === 4 && number?.length === 10 && relation ? verifyCGOTP() : console.log("geki")}
            style={[styles.buttonView, { backgroundColor: OtpValue?.length === 4 && number?.length === 10 && relation ? COLORS.colorB : '#E0E0E0' }]}>
            <Text style={[styles.continueText, { color: OtpValue?.length === 4 && number?.length === 10 && relation ? COLORS.colorBackground : COLORS.colorWhite3 }]}>{route?.params?.isCheck ? 'Submit' : 'Continue'}</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>

      </View>
      <CorrectionModal
        visible1={ModalVisibleC}
        onPress1={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'Proceed' }],
          })}
        //getDLEConfirmation={()=>}
        setModalVisible1={setModalVisibleC}
        onPressOut={() => getDLEConfirmation()}
      />
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
  textStyle: {
    color: COLORS.colorDSText,
    fontFamily: FONTS.FontRegular,
    fontSize: 15,
    fontWeight: '400',
    paddingTop: 10
  },
  dropDownContainmer: {
    backgroundColor: COLORS.colorBackground,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.colorBorder,
    width: '100%',
    fontSize: 15,
    fontWeight: FONTS.FontRegular,
    fontWeight: '400',
    paddingLeft: 13,
    color: COLORS.colorDark,
    height: 46,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10

  },
  textStyleHead: {
    color: '#3B3D43',
    fontFamily: FONTS.FontRegular,
    fontSize: 10,
    fontWeight: '400',
    paddingBottom: 7
  },
  textStyleDrop: {
    fontSize: 15,
    fontWeight: FONTS.FontRegular,
    fontWeight: '400',
    paddingTop: 12,
    color: COLORS.colorDark,
  },
})