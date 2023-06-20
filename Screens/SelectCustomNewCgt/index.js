import {
  StyleSheet, Text, View, BackHandler, StatusBar,
  SafeAreaView, Platform, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions, Pressable
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Icon1 from 'react-native-vector-icons/Ionicons'
import moment from 'moment';
import SearchIcon from 'react-native-vector-icons/Feather'
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
// -------------- Component Imports ------------------------
import Statusbar from '../../Components/StatusBar';
import Header from '../../Components/RepayHeader';
import { FONTS, COLORS } from '../../Constants/Constants';
import { api } from '../../Services/Api';
import SelectedTab from './Components/SelectedTab';
import CgtModal from './Components/Modal';
import MemberModal from './Components/MemberModal';
// ----------- Image Imports ---------
import Edit from './Images/Vector.svg'

const { height, width } = Dimensions.get('screen');

const SelectCustomerNewCgt = ({ navigation, route }) => {

  const isDarkMode = true;
  const { t } = useTranslation();

  const [text, onChangeText] = useState('');
  const [selectedItem, setSelectedItem] = useState();
  const [ModalVisible, setModalVisible] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(route?.params?.date)
  const [enab, setEnab] = useState(false)
  const [status, setStatus] = useState(true)
  const [EmptyList, setEmptyList] = useState(false)
  const [ModalVisible4,setModalVisible4] = useState(false)
  const [reschedulecgt, setReschedulecgt] = useState('')
  const [clearpop,setClearPop] = useState(false)
  const [custID,setCustId] = useState('')
  const [searchcustomerlist, setsearchcustomerlist] = useState();


  
  const handleGoBack = () => {
    if (text?.length > 0) {
      onChangeText('')
      setEmptyList(false)
    } else {
      navigation.goBack()
    }
    return true
  }

  useEffect(() => {
    setReschedulecgt(route?.params?.rescheduledata)
  }, [route?.params?.rescheduledata])

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleGoBack,
    );
    return () => backHandler.remove();
  }, [handleGoBack]);

  String.prototype.replaceAt = function (index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
  }

  useEffect(() => {
    AsyncStorage.getItem("CustomerId").then((value) => {
        setCustId(value)
    })

}, [])

  const OnchangeNumber = (num) => {
    setSelectedItem(null)
    console.log("HELO EMOJI")
    const firstDigitStr = String(num)[0];
    if (firstDigitStr == ' ') {
      onChangeText('')
      setEmptyList(false)
    }
    else if (/^[a-zA-Z1234567890 ]+$/.test(num) || num === '') {
      onChangeText(num)
      let searchword = num;
      if (num !== '') {
        setEmptyList(true)
      } else {
        setEmptyList(false)
      }
      getCustomerList(searchword)
    
    } else if (text?.length > 1) {
      setEmptyList(false)
    }
  }

  // ------------------ get Customer List Api Call Start ------------------
  const getCustomerList = async (searchvalue) => {
const empid = await AsyncStorage.getItem("CustomerId")
    console.log('search------->>>>>', searchvalue,clearpop,text)
    const data = {
      // "employeeId":Number(custID),
      "employeeId":Number(empid),
      "customerNameOrNumber": searchvalue ? searchvalue : ''
    };
    if(searchvalue){
     setClearPop(true)
    }
    await api.getCustomerList(data).then((res) => {
      console.log('------------------- customer list res', res,data.customerNameOrNumber)
      if(data.customerNameOrNumber){
        setsearchcustomerlist(res?.data?.body)
     
      }else{
       
      setCustomerList(res?.data?.body)
      }
      setStatus(false)
    })
      .catch((err) => {
        console.log('-------------------err', err?.response)
        setStatus(false)
      })
  };
  // ------------------------- end -----------------------------------------------

  // ------------------ get Customer List Api Call Start -----------------------------
  const createCGT = async () => {
    let selectedtime = moment(route?.params?.data?.time, ["h:mm A"]).format("HH:mm");
    let time = selectedtime.slice(0, 5);
    const data = {
      "employeeId":Number(custID),
      "customerId": reschedulecgt ? reschedulecgt.primaryCustomerId : selectedItem.id,
      "scheduleStartTime": moment(route?.params?.date).format("DD-MM-YYYY") + " " + time
    }
    await api.createCGT(data).then((res) => {
      console.log('------------------- create CGT res', res)
      setModalVisible(true)
      setEnab(true)
    }).catch((err) => {
      console.log('-------------------err', err?.response)
    })
  };
  // --------------- end --------------------------------------------------------------------

  useEffect(() => {
    getCustomerList()
  }, [enab])


  useEffect(() => {
    getCustomerList()

  }, [])

  const removeEmojis = (string) => {
    // emoji regex from the emoji-regex library
    const regex = /\uD83C\uDFF4(?:\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74)\uDB40\uDC7F|\u200D\u2620\uFE0F)|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC68(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3]))|\uD83D\uDC69\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\uD83D\uDC68(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)\uFE0F|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDD6-\uDDDD])(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\uD83D\uDC69\u200D[\u2695\u2696\u2708])\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC68(?:\u200D(?:(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D[\uDC66\uDC67])|\uD83C[\uDFFB-\uDFFF])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF4\uD83C\uDDF2|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDB5\uDDB6\uDDD1-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDEEB\uDEEC\uDEF4-\uDEF9]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD70\uDD73-\uDD76\uDD7A\uDD7C-\uDDA2\uDDB0-\uDDB9\uDDC0-\uDDC2\uDDD0-\uDDFF])|(?:[#*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEF9]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD70\uDD73-\uDD76\uDD7A\uDD7C-\uDDA2\uDDB0-\uDDB9\uDDC0-\uDDC2\uDDD0-\uDDFF])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC69\uDC6E\uDC70-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD26\uDD30-\uDD39\uDD3D\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDD1-\uDDDD])/g
  
    return string?.replace(regex, '')
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container1} />
      <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={"#002B59"} />

      <Header navigation={navigation} name={t('common:SelectCM')} onPress={handleGoBack} />
      {status ?
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, }}>
          <ActivityIndicator size={30} color={COLORS.colorB} />
        </View> :
        <Pressable 
        onPress={()=>{
          setClearPop(false),
          onChangeText(''),
          getCustomerList(''),
          setStatus(false)}} style={styles.mainContainer}>
          <ScrollView 
       //   keyboardShouldPersistTaps={'always'}
          keyboardDismissMode={'on-drag'}
          showsVerticalScrollIndicator={false} >
            <View style={styles.boxView}>
              <View style={styles.contentView}>
                <Text style={styles.timeText}>{route?.params?.data.time}</Text>
                <Text style={styles.dateText}>{moment(selectedDate).utc().format("ddd")}, {moment(selectedDate).utc().format("DD MMM")}</Text>
              </View>

              < TouchableOpacity style={styles.editView} onPress={() => navigation.navigate('NewCgt')}>
                <Edit />
                <Text style={styles.changeText}>{t('common:Change')}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.searchBox}>
              <TextInput
              contextMenuHidden={true}
                placeholder={t('common:EnterNORM')}
                placeholderTextColor={'#808080'}
                onChangeText={(text) => OnchangeNumber(text)}
                value={removeEmojis(text)}
                maxLength={25}
                
                style={{ flex: 1, color: COLORS.colorDark, fontSize: 14, fontFamily: FONTS.FontMedium }}
              />
              <SearchIcon color={"#808080"} name="search" size={18} style={{ right: 5 }} />
            </View>
            {text?.length === 0 && !selectedItem
              ?
              <>
                <Text style={styles.recentlyText}>{t('common:RecentCust')}</Text>
                <>
                  {customerList?.map((item, index) =>
                    <>
                      <TouchableOpacity onPress={() => { setSelectedItem(item), console }}>
                        <Text style={styles.dataText}>{item.name ? item.name : item?.mobile.replace(/^.{0}/g, '').replaceAt(4, "X").replaceAt(5, "X").replaceAt(6, "X").replaceAt(7, "X")}</Text>
                      </TouchableOpacity>
                      {index !== 10
                        ? <View style={styles.lineView} />
                        : null
                      }
                    </>
                  )}
                </>
              </>
              : null
            }

            <View >
              {text?.length >  0 && clearpop && !selectedItem && searchcustomerlist?.length>0
                ?
                <View style={{ borderWidth: customerList?.length > 0 ? 1 : 0, paddingTop: customerList?.length > 0 ? 12 : 0, paddingBottom: customerList?.length > 0 ? 12 : 2, borderColor: COLORS.colorBorder, marginTop: 10, borderRadius: 8 }} >
                  {searchcustomerlist?.map((item, index) =>
                
                    <>
                      <TouchableOpacity style={{ flexDirection: 'row', paddingHorizontal: 15, }}
                        onPress={() => {
                          setSelectedItem(item)
                          onChangeText('')
                        }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>

                          <View style={{ flexDirection: 'column' }}>
                            <Text style={styles.nameText}>{item.name ? item.name : item?.mobile.replace(/^.{0}/g, '').replaceAt(4, "X").replaceAt(5, "X").replaceAt(6, "X").replaceAt(7, "X")}</Text>
                            <View style={{ flexDirection: 'row' }}>
                              {item?.pin ? (<View style={{ paddingTop: 5, paddingRight: 1 }}>
                                <Icon1 name="location-outline" color={"black"} />
                              </View>) : null}
                              <Text style={[styles.idText, { paddingTop: 4 }]}>{item.pin ? item.pin : null}</Text>
                            </View>
                          </View>
                        </View>
                        <Text style={[styles.numText, { paddingLeft: 6 }]}>{item?.mobile?.replace(/^.{0}/g, '').slice(-10).replaceAt(3, "X").replaceAt(4, "X").replaceAt(5, "X").replaceAt(6, "X").replaceAt(7, "X")}</Text>
                      </TouchableOpacity>

                      {searchcustomerlist?.length - 1 !== index
                        ? <View style={styles.lineView} />
                        : null
                      }
                    </>
                  )}

                </View>
                : null
              }
            </View>
            {
              searchcustomerlist?.length === 0 &&  clearpop  &&EmptyList && (
                <View style={styles.ViewMapBranch}>
                  <Text style={[styles.nameText, { padding: 10 }]}>No results found</Text>
                </View>
              )
            }
            {selectedItem
              ? <SelectedTab item={selectedItem} setEnab={setEnab} />
              : null
            }

          </ScrollView>
          {selectedItem
            ?
            <TouchableOpacity style={styles.buttonView}
              onPress={() => createCGT()}
            >
              <Text style={styles.continueText}>{t('common:Confirm')}</Text>
            </TouchableOpacity>
            : null
          }
        </Pressable>}

      <CgtModal ModalVisible={ModalVisible}
        onPressOut={() => {
          setModalVisible(false)
          navigation.navigate('Profile')
        }}
        navigation={navigation}
        setModalVisible={setModalVisible}
      />


{/* <MemberModal
               press1={(value) => {
                onChangeText('')
                setSelectedItem(value)
                setModalVisible4(false)
               }}
                Memberlist={customerList}
                ModalVisible={ModalVisible4}
                onPressOut={() => setModalVisible4(false)}
                setModalVisible={setModalVisible4}



            /> */}
    </SafeAreaProvider>
  )
}

export default SelectCustomerNewCgt;

const styles = StyleSheet.create({
  container1: {
    flex: 0,
    backgroundColor: "#002B59",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    //backgroundColor:'red'
    backgroundColor: COLORS.colorBackground
  },
  editView: {
    borderRadius: 48,
    backgroundColor: COLORS.colorLight,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13,
    paddingVertical: 6
  },
  contentView: {
    flexDirection: 'column',
  },
  boxView: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.colorBorder,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  timeText: {
    fontSize: 12,
    fontFamily: FONTS.FontSemiB,
    color: COLORS.colorB,
  },
  dateText: {
    fontSize: 14,
    fontFamily: FONTS.FontRegular,
    color: COLORS.colorBlack,
  },
  changeText: {
    fontSize: 12,
    fontFamily: FONTS.FontMedium,
    color: COLORS.colorB,
    paddingLeft: 8
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: COLORS.colorBorder,
    borderRadius: 8,
    marginTop: 23
  },
  recentlyText: {
    fontSize: 14,
    fontFamily: FONTS.FontSemiB,
    color: COLORS.Black,
    paddingTop: 30,
    paddingBottom: 38
  },
  dataText: {
    fontSize: 14,
    fontFamily: FONTS.FontMedium,
    color: COLORS.colorDark,
  },
  lineView: {
    borderWidth: 0.6,
    borderColor: COLORS.Gray6,
    backgroundColor: COLORS.Gray6,
    opacity: 0.5,
    marginTop: 13,
    marginBottom: 16
  },
  nameText: {
    fontSize: 12,
    fontFamily: FONTS.FontBold,
    color: COLORS.colorDark,
    fontWeight: '600',
  },
  idText: {
    fontSize: 11,
    fontFamily: FONTS.FontRegular,
    color: COLORS.colorDark,
    paddingTop: 3,
    width: 110
  },
  numText: {
    fontSize: 12,
    fontFamily: FONTS.FontRegular,
    color: COLORS.colorDark,
    fontWeight: '400',
  },
  buttonView: {
    backgroundColor: COLORS.colorB,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 54,
    height: 48,
    marginBottom: 25
  },
  continueText: {
    fontSize: 14,
    fontFamily: FONTS.FontBold,
    color: COLORS.colorBackground,
    letterSpacing: 0.64
  },
  ViewMapBranch: {
    width: width * 0.89,
    height: width * 0.15,
    borderWidth: 1,
    paddingLeft: width * 0.01,
    borderColor: 'rgba(236, 235, 237, 1)',
    borderRadius: 8,
    backgroundColor: '#FCFCFC',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop:5
  },
})