import { StyleSheet, Text, View, BackHandler, StatusBar, SafeAreaView, Platform, TextInput, ScrollView, TouchableOpacity, Pressable } from 'react-native'
import React, { useCallback, useState, useEffect, useRef } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SearchIcon from 'react-native-vector-icons/Feather'
import Icon1 from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

// ---------------- Component Import ---------------------
import Statusbar from '../../Components/StatusBar';
import Header from '../../Components/RepayHeader';
import { FONTS, COLORS } from '../../Constants/Constants';
import SelectTab from './Components/SelectTab';
import ReasonModal from './Components/ReasonModal';
import ErrorModal from './Components/ErrorModal';
import { api } from '../../Services/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MemberModal from './Components/MemberModal';
import IconD from 'react-native-vector-icons/AntDesign';
import EditAddModal from './Components/EditAddressModal';


String.prototype.replaceAt = function (index, replacement) {
  return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}
const ConfirmMembers = ({ navigation }) => {

  const isDarkMode = true;
  const searchRef = useRef();

  const dispatch = useDispatch()
  const [text, onChangeText] = useState('');
  const [selectedItem, setSelectedItem] = useState();
  const [dataSelected, setDataSelected] = useState();
  const [dataSelectedID, setDataSelectedID] = useState();
  const [tccustomerlist, setTccustomerlist] = useState();
  const [ModalError, setModalError] = useState(false)
  const [ModalReason, setModalReason] = useState(false)
  const [rejectReason, setRejectReason] = useState()
  const [status, setStatus] = useState(false)
  const [ModalVisible4, setModalVisible4] = useState(false)
  const [clearpop, setClearPop] = useState(false)
  const [custID, setCustId] = useState('')
  const TC_Customer_id = useSelector(state => state.TC_Customer_idADD);
  const [searchcustomerlist, setsearchcustomerlist] = useState();
  const [AddressId, setAddressId] = useState('')
  const [NameChange,setNameChange] = useState(false)
  const [AddressChange,setAddressChange] = useState(false)


  const [Address, setAddress] = useState()
  // -----------Redux State ---------------------------------

  const customerList = useSelector(state => state.customerList);
  const customerID = useSelector(state => state.customerID);
  const cgtCustomerDetails = useSelector(state => state.cgtCustomerDetails);
  const activityId = useSelector(state => state.activityId);
  const agentId = useSelector(state => state.AgentId);
  const [AddressStatus, setAddressStatus] = useState(false)
  const [Name, setName] = useState('')
  const [NameStatus, setNameStatus] = useState(false)

  const datas = [
    {
      id: 1,
      Title: 'Suspected fraud',
      isChecked: false
    },
    {
      id: 2,
      Title: 'Non cooperative',
      isChecked: false
    },
    {
      id: 3,
      Title: 'Submitted wrong data',
      isChecked: false
    },
    {
      id: 4,
      Title: 'KYC mismatch',
      isChecked: false
    },
    {
      id: 5,
      Title: 'Others',
      isChecked: false
    },
  ]

  String.prototype.replaceAt = function (index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
  }
  const handleGoBack = useCallback(() => {
    navigation.navigate('CreateTrustCircle')
    return true; // Returning true from onBackPress denotes that we have handled the event
  }, [navigation]);


  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleGoBack,
    );
    return () => backHandler.remove();
  }, [handleGoBack]);

  const [data, setData] = useState()

  const OnchangeNumber = (num) => {
    console.log('qqqq-----', num)
    const firstDigitStr = String(num)[0];

    if (firstDigitStr == ' ') {
      //onChangeText(num)
      //setTccustomerlist([])
      setData([])
    }
    //  else if(num === ''){
    //   onChangeText(num)
    //     //setTccustomerlist([])
    //     setData([])
    // }
    else if (!(/^[a-zA-Z0123456789 ]+$/.test(num) || num === '')) {

      // getTclist(num)
    } else {
      onChangeText(num)
      getCustomerLists(num)
      setModalVisible4(true)
    }
  }

  const removeEmojis = (string) => {
    // emoji regex from the emoji-regex library
    const regex = /\uD83C\uDFF4(?:\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74)\uDB40\uDC7F|\u200D\u2620\uFE0F)|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC68(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3]))|\uD83D\uDC69\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\uD83D\uDC68(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)\uFE0F|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDD6-\uDDDD])(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\uD83D\uDC69\u200D[\u2695\u2696\u2708])\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC68(?:\u200D(?:(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D[\uDC66\uDC67])|\uD83C[\uDFFB-\uDFFF])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF4\uD83C\uDDF2|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDB5\uDDB6\uDDD1-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDEEB\uDEEC\uDEF4-\uDEF9]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD70\uDD73-\uDD76\uDD7A\uDD7C-\uDDA2\uDDB0-\uDDB9\uDDC0-\uDDC2\uDDD0-\uDDFF])|(?:[#*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEF9]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD70\uDD73-\uDD76\uDD7A\uDD7C-\uDDA2\uDDB0-\uDDB9\uDDC0-\uDDC2\uDDD0-\uDDFF])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC69\uDC6E\uDC70-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD26\uDD30-\uDD39\uDD3D\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDD1-\uDDDD])/g

    return string?.replace(regex, '')
  }


  { console.log('============redux customer id ', selectedItem) }
  useEffect(() => {
    if (ModalError == true) {
      const timer = setTimeout(() => {
        setModalError(false)
        setModalReason(false)
        navigation.navigate('Profile')
        //  console.log('This will run after 1 second!', ModalVisibles)
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [ModalError])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setSelectedItem('')
      onChangeText('')
      // do something
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    AsyncStorage.getItem("CustomerId").then((value) => {

      setCustId(value)
      getCustomerLists()
      console.log("custis", value)
    })
    getTCDetails(customerList)

    // getTclist()
    console.log("idbhh..", customerList, customerID)

  }, []);

  // ------------------ get Slot Api Call Start ------------------
  const getTCDetails = async (id) => {
    console.log("id..", id)
    dispatch({
      type: 'SET_TCCUSTOMER_ID',
      payload: id,
    });


    const data = {
      "customerId": id ? id : selectedItem
    };
    await api.getCGTDetailsTCMembers(data).then((res) => {
      console.log('------------------- CGT slot res', res?.data?.body)
      setAddress(res?.data?.body?.address)
      setName(res?.data?.body?.customerName)
      setDataSelected(res?.data?.body)

    }).catch((err) => {
      console.log('-------------------err246', err?.response)
    })
  };
  // ------------------ get slot Api Call End ------------------

  // ------------------ get Slot Api Call Start ------------------
  const getCustomerLists = async (phone) => {
    console.log('List------>>', phone, custID, agentId)
    const data = {
      "employeeId": custID ? Number(custID) : Number(agentId),
      "customerNameOrNumber": phone ? phone : "",
      "addedTcIds": [cgtCustomerDetails?.primaryCustomerId]

    };
    console.log("data of tc list", data)
    if (phone) {
      setClearPop(true)
    }
    await api.getCustomerListForTc(data).then((res) => {

      console.log("api response123", res?.data?.body?.length)
      const data1 = res?.data?.body?.filter((item, index) => !customerID.includes(item?.id))
      console.log('?????????', data.customerNameOrNumber)

      if (data?.customerNameOrNumber) {
        setData(data1)
      } else {
        setTccustomerlist(data1)
        console.log("data1 tcc", data1)

      }

      setStatus(true)
      console.log("data length", data?.length)
    }).catch((err) => {
      console.log('-------------------err123', err?.response)
      setData('')
    })
  };
  // ------------------ get slot Api Call End ------------------getCustomerList

  // ------------------ Update Activity Reject Api Call Start ------------------
  const updateActivityReject = async () => {
    const data = {
      "customerId": Number(selectedItem),
      "status": rejectReason,
      "tcMemberIds": []
    };
    await api.rejectTrustCircleMembers(data).then((res) => {
      console.log('-------------------res789', res?.data)
      if (res?.status) {
        setRejectReason()
        setModalError(true)
      }
    })
      .catch((err) => {
        console.log('-------------------err789', err?.response)
      })
  };






  // ------------------ Update Activity Reject Api Call Start ------------------
  const TCMemberadded = async () => {
    const data = {
      "activityId": activityId,
      "memberId": selectedItem,

    };
    await api.addNewTrustCircleMember(data).then((res) => {
      console.log('-------------------addNewTrustCircleMember', res?.data)

    })
      .catch((err) => {
        console.log('-------------------addNewTrustCircleMember error', err?.response, activityId)
      })
  };


  //   // ------------------ Update Activity Reject Api Call End ------------------
  //   const getTclist = async (phone) => {
  //     console.log('api called confirm',cgtCustomerDetails.primaryCustomerId,customerID)
  //     const data = {
  //         "employeeId":1,
  //         "customerNameOrNumber":phone,
  //         "addedTcIds":customerID?[customerID,cgtCustomerDetails?.primaryCustomerId]:[cgtCustomerDetails?.primaryCustomerId]
  //     }
  //     console.log("data called",data)
  //     await api.getCustomerListForTc(data).then((res) => {
  //         console.log('-------------------res getCustomerListForTc', res?.data?.body)
  //         if (res?.status) {
  //         setTccustomerlist(res?.data?.body)
  //         setData(res?.data?.body)
  //         }
  //     }).catch((err) => {
  //         console.log('-------------------getCustomerListForTc', err?.response)
  //     })
  // };

  const OnSearchAction = () => {

    searchRef?.current?.focus()
    setClearPop(false),
      onChangeText('')
    // getCustomerList(''),
    // setStatus(false)
  }

  const EditAddress = () => {

    const data = {
      "customerId": selectedItem,
      "address": Address
    }
    console.log("data of banner", data)
    api
      .EditAddress(data)
      .then((result) => {
        if (result) {
          console.log("result succe", result)
          TCMemberadded()
        }
      })
      .catch((err) => {
        { console.log("addres print", Address, custID) }
        console.log("banner banner 3333 ---->", err?.response);
      });
  };


  const EditName = () => {

    const data = {
      "customerId": selectedItem,
      "fullName": Name
    }
    console.log("data of banner", data)
    api
      .EditName(data)
      .then((result) => {
        if (result) {
          console.log("result succe", result)
    
        }
      })
      .catch((err) => {
        { console.log("addres print", Address, custID) }
        console.log("banner banner 3333 ---->", err?.response);
      });
  };


  const ConfirmButton = () => {
  
    if(NameChange && AddressChange){
      EditName()
      EditAddress()
   
      navigation.navigate('CreateTrustCircle')
  }
  if(NameChange){
      EditName()
      TCMemberadded()
      navigation.navigate('CreateTrustCircle')
  }else if(AddressChange){
      EditAddress()
      
      navigation.navigate('CreateTrustCircle')
  }else{
    TCMemberadded()
    navigation.navigate('CreateTrustCircle')
  }
  }


  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container1} />
      <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={"#002B59"} />

      <Header navigation={navigation} name="Confirm Member" onPress={handleGoBack} />

      <Pressable onPress={() => {
        // setClearPop(false),
        //   onChangeText('')

      }} style={styles.mainContainer}>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'} >
          <View style={{ padding: 20, paddingTop: 2 }}>
            {!selectedItem ?
              <View style={styles.searchBox}>
                <SearchIcon color={"#808080"} name="search" size={18} style={{ right: 5 }} />
                <TextInput
                  ref={searchRef}
                  contextMenuHidden={true}
                  placeholder='Enter name or mobile number'
                  placeholderTextColor={"#808080"}
                  onChangeText={(text) => OnchangeNumber(text)}
                  value={removeEmojis(text)}
                  maxLength={25}
                  style={{ flex: 1, color: COLORS.colorDark, fontSize: 14, fontFamily: FONTS.FontMedium }}

                />
                {text?.length > 0 &&
                  <TouchableOpacity onPress={() => OnSearchAction()}>
                    <IconD size={16} color={"#808080"} name="close" style={{ right: 5 }} />
                    {/* <SearchIcon color={"#808080"} name="search" size={18} style={{ right: 5 }} /> */}
                  </TouchableOpacity>}
              </View> : null}
            {text?.length === 0 && !selectedItem
              ?
              <>
                <Text style={styles.recentlyText}>Recently added customers</Text>
                {tccustomerlist?.map((item, index) =>
                  <>

                    <TouchableOpacity onPress={() => {
                      getTCDetails(item?.id)
                      setSelectedItem(item?.id)
                    }}>
                      <Text style={styles.dataText}>{item.name}</Text>
                    </TouchableOpacity>
                    {index !== tccustomerlist?.length - 1
                      ? <View style={styles.lineView} />
                      : null
                    }
                  </>
                )}
              </>
              : null
            }
            {text.length > 0 && clearpop && !selectedItem
              ?
              <View style={{ borderWidth: 1, paddingTop: 12, paddingBottom: 15, borderColor: COLORS.colorBorder, marginTop: 10, borderRadius: 8 }}>

                {data?.length == 0 && status && <Text style={{
                  fontSize: 14,
                  fontFamily: FONTS.FontRegular,
                  color: COLORS.colorDark,
                  fontWeight: '400', paddingHorizontal: 10, paddingTop: 5
                }}>No results found</Text>}


                {data && data?.map((item, index) =>
                  <>

                    <TouchableOpacity style={{ flexDirection: 'row', paddingHorizontal: 15 }}
                      onPress={() => {
                        onChangeText('')
                        getTCDetails(item?.id)

                        console.log("customerID", customerID)
                        setSelectedItem(item?.id)
                      }}>
                      <View style={{ flex: 1, flexDirection: 'row' }}>

                        <View style={{ flexDirection: 'column' }}>
                          <Text style={styles.nameText}>{item.name}</Text>
                          <View style={{ flexDirection: 'row' }}>
                            <View style={{ paddingTop: 5, paddingRight: 1 }}>
                              <Icon1 name="location-outline" color={"black"} />
                            </View>
                            <Text style={[styles.idText, { paddingTop: 4 }]}>{item?.pin}</Text>
                          </View>
                        </View>
                      </View>
                      <Text style={[styles.numText, { paddingLeft: 6 }]}>{item?.mobile?.replace(/^.{0}/g, '', " ").slice(-10).replaceAt(3, "X").replaceAt(4, "X").replaceAt(5, "X").replaceAt(6, "X").replaceAt(7, "X")}</Text>
                    </TouchableOpacity>

                    {index !== data?.length - 1
                      ? <View style={styles.lineView} />
                      : null
                    }
                  </>
                )}
              </View>
              : null
            }
            {console.log("dataSelected", dataSelected)}
            {dataSelected
              ?
              <SelectTab item={dataSelected}
                navigation={navigation}
                Address={AddressStatus}
                AddressTextInput={Address}
                setAddressTextInput={setAddress}
                setAddress={setAddressStatus}
                Name={Name}
                setName={setName}
                NameStatus={NameStatus}
                setNameStatus={setNameStatus}
                custID={selectedItem}
                getTCDetails={getTCDetails} />
              : null
            }

          </View>
        </ScrollView>
        {dataSelected
          ?

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15 }}>

            <TouchableOpacity style={[styles.buttonView, { backgroundColor: COLORS.colorLight }]}
              onPress={() => setModalReason(true)}>
              <Text style={[styles.continueText, { color: COLORS.colorB }]}>Reject</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {

              const data = [...customerList]
              data.push(dataSelected)

              const ids = [...customerID]
              ids.push(selectedItem)

              dispatch({
                type: 'SET_SELECTED_CUSTOMERLIST',
                payload: data,
              });
              dispatch({
                type: 'SET_SELECTED_CUSTOMERID',
                payload: ids,
              });
              ConfirmButton()
            }}
              style={[styles.buttonView, { backgroundColor: COLORS.colorB }]}>
              <Text style={[styles.continueText, { color: COLORS.colorBackground }]}>Confirm</Text>
            </TouchableOpacity>
          </View>
          : null
        }
      </Pressable>

      <ReasonModal
        onPress1={updateActivityReject}
        ModalVisible={ModalReason}
        onPressOut={() => setModalReason(!ModalReason)}
        setModalVisible={setModalReason}
        setRejectReason={setRejectReason}
        data={datas}
      />
      {/* <MemberModal
               press1={(value) => {
                onChangeText('')
                getTCDetails(value)
                setSelectedItem(value)
                setModalVisible4(false)
               }}
                Memberlist={data}
                ModalVisible={ModalVisible4}
                onPressOut={() => setModalVisible4(false)}
                setModalVisible={setModalVisible4}



            /> */}

      <ErrorModal
        ModalVisible={ModalError}
        onPressOut={() => setModalError(!ModalError)}
        setModalVisible={setModalError}
      />


    </SafeAreaProvider>
  )
}

export default ConfirmMembers;

const styles = StyleSheet.create({
  container1: {
    flex: 0,
    backgroundColor: "#002B59",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  mainContainer: {
    flex: 1,
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
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 54,
    height: 48,
    marginBottom: 20,
    width: '48%'
  },
  continueText: {
    fontSize: 14,
    fontFamily: FONTS.FontBold,
    color: COLORS.colorBackground,
    letterSpacing: 0.64
  }
})
