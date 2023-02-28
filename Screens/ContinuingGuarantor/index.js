import {
  StyleSheet, Text, View, StatusBar, SafeAreaView, Platform,
  TextInput, TouchableOpacity, Dimensions, ScrollView, KeyboardAvoidingView, Image
} from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import Header from '../../Components/RepayHeader';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS, FONTS } from '../../Constants/Constants';
import Statusbar from '../../Components/StatusBar';
import Icon1 from 'react-native-vector-icons/Entypo'
import Call from '../../assets/image/calls.svg';
const { height, width } = Dimensions.get('screen');
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { useTranslation } from 'react-i18next';
import Image1 from '../../assets/Images/cakes.svg';

const ContinuingGuarantor = ({ navigation }) => {
  const isDarkMode = true;
  const { t } = useTranslation();
  const [number, onChangeNumber] = useState()
  const [OtpValue, setOtpValue] = useState('')
  const [timerCount, setTimer] = useState(30)
  const [IsOtp1, setIsOtp1] = useState(false)
  const [Bstatus, setBstatus] = useState(false)
  const [IsOtp2, setIsOtp2] = useState(true)


  useEffect(() => {
    if (number) {
      let interval = setInterval(() => {
        setTimer(lastTimerCount => {
          lastTimerCount <= 1 && clearInterval(interval)
          return lastTimerCount - 1
        })
      }, 1000)
      console.log(interval)
      if (timerCount === 0) {

        console.log("timer count useEffect", timerCount)
      }//each count lasts for a second
      //cleanup the interval on complete
      return () => clearInterval(interval)
    }
  }, [number]);



  const OnchangeNumbers = (num) => {
    if (/^[^!-\/:-@\.,[-`{-~ ]+$/.test(num) || num === '') {
      onChangeNumber(num)

    } else {

      // ToastAndroid.show(t('common:Valid'), ToastAndroid.SHORT);
    }
  }

  const scrollViewRef = useRef();
  return (
    <SafeAreaProvider>

      <SafeAreaView style={styles.container1} />
      <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={"#002B59"} />

      <Header navigation={navigation} name={"Continuing Guarantor"} />

      <View style={styles.mainContainer}>

        <KeyboardAvoidingView style={{ flex: 1 }}
          {...(Platform.OS === 'ios' && { behavior: 'position' })}
        >
          <ScrollView ref={scrollViewRef}
            onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
            <View style={{ flex: 1 }}>
              <Text style={styles.headerText}>Relationship with Customer</Text>
              <View style={styles.dropDown}>
                <Text style={styles.spouseText}>Spouse</Text>
                <Icon1 name="chevron-down" size={18} color={'#808080'} />
              </View>
              <View style={styles.containerBox}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View style={styles.circleView}>
                    <Text style={styles.shortText}>AK</Text>
                  </View>
                  <View style={{ flexDirection: 'column', flex: 1, marginLeft: 12 }}>
                    <Text style={styles.nameText}>Anil Kumar</Text>
                    <Text style={styles.underText}>Daily wage labourer</Text>
                  </View>
                  <View style={{ flexDirection: 'row', left: -5 }}>

                    <Image1 width={11} height={11} top={3} />
                    <Text style={styles.dateText}>12/10/1972</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.mobileText}>Mobile Number</Text>
              <View style={styles.inPutStyle}>
                <TextInput

                  placeholder=''
                  value={number}
                  maxLength={10}
                  style={styles.textIn1}
                  onChangeText={(text) => {
                    OnchangeNumbers(text)
                    setOtpValue('')
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
              {number?.length === 10 &&
                <View style={styles.ViewOtp}>
                  <Text style={styles.textOtp} onPress={() => navigation.navigate('PreClosure')}>{t('common:EnterOtp')} </Text>

                  <OTPInputView
                    style={[styles.OtpInput, {}]}
                    pinCount={4}
                    code={OtpValue}

                    onCodeChanged={otp => setOtpValue(otp)}
                    // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                    // onCodeChanged = {code => { this.setState({code})}}
                    autoFocusOnLoad={false}
                    codeInputFieldStyle={{ color: '#090A0A', borderRadius: 8, backgroundColor: '#FCFCFC', }}
                    placeholderTextColor="black"
                    onCodeFilled={(code => {

                      if (code && code == '1091') {
                        navigation.navigate('Permission')
                        // setOtp(false)
                      }
                      else {
                        console.log("otp value//...", OtpValue)
                        // setOtp(true)
                        // setCount(1)
                      }
                    })}
                  />



                  <View style={{ marginTop: Dimensions.get('window').height * 0.03 }}>
                    <Text style={styles.TextResend}>{t('common:Resend')} 00:{timerCount < 10 ? '0' : ''}{timerCount}</Text>
                  </View>
                </View>}


              <Call />
            </View>
          </ScrollView>

          <TouchableOpacity onPress={() => OtpValue?.length === 4 && number?.length === 10 ? navigation.navigate('AddVehicle') : console.log("geki")}
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
    fontFamily: FONTS.FontRegular
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


})