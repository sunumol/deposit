import {
    StyleSheet,
    Text,
    View,
    BackHandler,
    StatusBar,
    SafeAreaView,
    Platform,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
    TextInput
} from 'react-native'
import React, { useCallback, useState, useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Statusbar from '../../Components/StatusBar';
import { useFocusEffect } from '@react-navigation/native';
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';

// ------------- Componenets Import ------------------------
import Header from '../../Components/RepayHeader';
import { FONTS, COLORS } from '../../Constants/Constants';
import RejectModal from './Components/RejectModal';
import ErrorModal from './Components/ErrorModal';
import ReasonModal from './Components/ReasonModal';
import { api } from '../../Services/Api';
import Verified from '../../assets/Verified.svg'
import EditAddModal from './Components/EditAddModal';

// ------------- Import Image --------
import Date from './Images/Date.svg';
import { useSelector } from 'react-redux';
import CGTstatus from '../../Components/CGTstatus';
const { height, width } = Dimensions.get('screen');

const CgtCustomer = ({ navigation, route }) => {

    const isDarkMode = true;
    // const route = useRoute();
    const customerId = useSelector(state => state.customer_ID);
    const [ModalVisible, setModalVisible] = useState(false)
    const [ModalError, setModalError] = useState(false)
    const [ModalReason, setModalReason] = useState(false)
    const [ModalVisible2, setModalVisible2] = useState(false)
    const [details, setDetails] = useState()
    const [custID, setCustId] = useState()
    const [Status, setStatus] = useState(true)
    const [rejectReason, setRejectReason] = useState()
    const [EditAddsModal, setEditsModal] = useState(false)
    const [Address, setAddress] = useState()
    const [AddressStatus, setAddressStatus] = useState(false)
    const [Name, setName] = useState('')
    const [NameStatus, setNameStatus] = useState(false)
    const [NameChange,setNameChange] = useState(false)
    const [AddressChange,setAddressChange] = useState(false)

    const data = [
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

    const activityId = useSelector(state => state.activityId);

    // -----------Redux State ---------------------------------
    const dispatch = useDispatch()

    const handleGoBack = useCallback(() => {
        setModalVisible2(true)
        // navigation.goBack()

        return true; // Returning true from onBackPress denotes that we have handled the event
    }, [navigation]);

    useFocusEffect(
        React.useCallback(() => {
            BackHandler.addEventListener('hardwareBackPress', handleGoBack);

            return () =>
                BackHandler.removeEventListener('hardwareBackPress', handleGoBack);
        }, [handleGoBack]),
    );

    String.prototype.replaceAt = function (index, replacement) {
        return this.substring(0, index) + replacement + this.substring(index + replacement.length);
    }

    const removeEmojis = (string) => {
        // emoji regex from the emoji-regex library
        const regex = /\uD83C\uDFF4(?:\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74)\uDB40\uDC7F|\u200D\u2620\uFE0F)|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC68(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3]))|\uD83D\uDC69\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\uD83D\uDC68(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)\uFE0F|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDD6-\uDDDD])(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\uD83D\uDC69\u200D[\u2695\u2696\u2708])\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC68(?:\u200D(?:(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D[\uDC66\uDC67])|\uD83C[\uDFFB-\uDFFF])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF4\uD83C\uDDF2|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDB5\uDDB6\uDDD1-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDEEB\uDEEC\uDEF4-\uDEF9]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD70\uDD73-\uDD76\uDD7A\uDD7C-\uDDA2\uDDB0-\uDDB9\uDDC0-\uDDC2\uDDD0-\uDDFF])|(?:[#*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEF9]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD70\uDD73-\uDD76\uDD7A\uDD7C-\uDDA2\uDDB0-\uDDB9\uDDC0-\uDDC2\uDDD0-\uDDFF])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC69\uDC6E\uDC70-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD26\uDD30-\uDD39\uDD3D\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDD1-\uDDDD])/g

        return string?.replace(regex, '')
    }

    useEffect(() => {
        if (ModalError == true) {
            const timer = setTimeout(() => {
                setModalError(false)
                setModalReason(false)
                navigation.navigate('Profile')
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [ModalError])

    useEffect(() => {
        getDetails()
        AsyncStorage.getItem("CustomerId").then((value) => {
            setCustId(value)
        })
    }, [])

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            console.log('focus==========')
            getDetails()

        });

        return unsubscribe;
    }, [navigation]);


    // ------------------ GET Setails Cgt Api Call Start ------------------
    const getDetails = async () => {
        const data = {
            "activityId": activityId
        };
        await api.getCGTDetails(data).then((res) => {
            console.log('-------------------res123', res)
            setDetails(res?.data?.body)
            setAddress(res?.data?.body?.address)
            setName(res?.data?.body?.customerName)
            setStatus(false)
        })
            .catch((err) => {
                setStatus(false)
                console.log('-------------------err123', err?.response)
            })
    };
    // ------------------ GET Setails Cgt  Api Call End ------------------

    // ------------------ Update Activity Confirm Api Call Start ------------------
    const updateActivity = async () => {
        const data = {
            "activityStatus": "kyc verified",
            "employeeId": Number(custID),
            "activityId": activityId
        };
        await api.updateActivity(data).then((res) => {
            console.log('-------------------updateActivity', res)
            if (res?.status) {
                setModalVisible(true)
                dispatch({
                    type: 'SET_CGT_CUSTOMERdETAILS',
                    payload: details,
                });
            }
        })
            .catch((err) => {
                console.log('-------------------err246', err?.response)
            })
    };
    // ------------------ Update Activity Confirm Api Call End ------------------

    // ------------------ Update Activity Reject Api Call Start ------------------
    const updateActivityReject = async () => {
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ACTIVITY REJECYED')
        const data = {
            "activityStatus": rejectReason,
            "employeeId": Number(custID),
            "activityId": activityId
        };
        await api.updateActivity(data).then((res) => {
            console.log("rejectreason", rejectReason)
            console.log('-------------------res789', res?.data)
            if (res?.status) {
                setModalError(true)
                setRejectReason()
            }
        })
            .catch((err) => {
                console.log('-------------------err789', err?.response)
            })
    };
    // ------------------ Update Activity Reject Api Call End ------------------

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

    const EditAddress = () => {

        const data = {
            "customerId": customerId,
            "address": Address
        }
        console.log("data of banner", data)
        api
            .EditAddress(data)
            .then((result) => {
                if (result) {
                    console.log("result succe", result)
                    updateActivity()

                }
            })
            .catch((err) => {
                console.log("banner banner 3333 ---->", err?.response);
            });
    };


    const EditName = () => {

        const data = {
            "customerId": customerId,
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
                console.log("banner banner 3333 ---->", err?.response);
            });
    };

const ConfirmButton = ()=>{
    if(NameChange && AddressChange){
        EditName()
        EditAddress()
       
        
    }
    if(NameChange){
        EditName()
        updateActivity()
    }else if(AddressChange){
        EditAddress()
        //updateActivity()
    }else{
        updateActivity()
    }
}
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container1} />
            <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={"#002B59"} />

            <Header navigation={navigation} name="CGT" onPress={handleGoBack} />

            {Status ?
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, }}>
                    <ActivityIndicator size={30} color={COLORS.colorB} />
                </View> :
                <View style={styles.mainContainer}>
                    <ScrollView showsVerticalScrollIndicator={false} >
                        <View style={styles.boxView}>
                            <View style={styles.contentView}>
                                <Text style={styles.timeText}>{details?.cgtTime?.slice(0, -3)} PM</Text>
                                <Text style={styles.dateText}>{details?.cgtDate ? moment(new Date(details?.cgtDate)).format("ddd, DD MMM") : ''}</Text>
                            </View>
                            <TouchableOpacity style={styles.editView} onPress={() => {
                                navigation.navigate('SelectCalendar', { selectedData: [activityId], title: 'New CGT' }),
                                    AsyncStorage.removeItem('DATECGT')
                            }}>
                                <Date />
                                <Text style={styles.changeText}>Reschedule CGT</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.searchBox}>
                            {/* <View style={styles.boxStyle}>
                                <View style={{ flex: 1, flexDirection: 'row' }}>


                                    <View style={{ flexDirection: 'column', paddingLeft: 12, paddingTop: 5 }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={[styles.nameText, { paddingRight: 5 }]}>{details?.customerName}</Text>
                                            {details?.varificationStatus
                                                ? <Verified width={18} height={18} />
                                                : null}
                                        </View>
                                        <View style={{ flexDirection: 'row', }}>
                                            <View style={{ paddingTop: 5, paddingRight: 1 }}>
                                                <Icon1 name="location-outline" color={"black"} />
                                            </View>
                                            <Text style={[styles.idText, { paddingTop: 4 }]}>{details?.pin}</Text>
                                        </View>
                                    </View>
                                </View> */}

                            {/* <View style={{ flexDirection: 'column', paddingTop: 5, alignItems: 'flex-end' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                     
                                        <Text style={[styles.numText, { paddingLeft: 6 }]}>{details?.mobileNumber?.replace(/^.{0}/g, '', " ").slice(-10).replaceAt(3, "X").replaceAt(4, "X").replaceAt(5, "X").replaceAt(6, "X").replaceAt(7, "X")}</Text>
                                    </View>
                                </View> */}

                            {/* </View> */}

                            <View style={{ paddingHorizontal: 17, marginBottom: 0, marginTop: 15 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ paddingHorizontal: 0, marginBottom: 5 }}>
                                        <Text style={styles.headTextTitle}>Name</Text>

                                    </View>
                                    {!NameStatus && !details?.varificationStatus&&
                                    <TouchableOpacity style={[styles.EditTouch, { marginLeft: width * 0.52 }]} onPress={() => setNameStatus(true)} >
                                        <Text style={[styles.changeText, { paddingLeft: 0 }]}>Edit</Text>
                                    </TouchableOpacity>}
                                </View>
                                {NameStatus ? <View style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: 10
                                }}>
                                    <TextInput style={styles.textInput}
                                        value={removeEmojis(Name)}
                                    maxLength={20}
                                        onChangeText={(text) => {
                                            //setAddress(text)
                                            const firstDigitStr = String(text)[0];
                                            if (firstDigitStr == ' ') {
                                                setName('')
                                            } else if (/^[a-zA-Z ]+$/g.test(text) || text === '') {
                                                setName(text)
                                                setNameChange(true)
                                            } else {

                                            }

                                        }}
                                    />
                                </View> :
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={[styles.nameText, { paddingRight: 5,fontFamily:FONTS.FontMedium }]}>{details?.customerName}</Text>

                                        {details?.varificationStatus
                                            ? <Verified width={18} height={18} />
                                            : null}
                                    </View>}
                            </View>
                            <View style={{ flexDirection: 'row',paddingLeft:17 }}>
                                            <View style={{ paddingTop: 5, paddingRight: 1 }}>
                                                <Icon1 name="location-outline" color={"black"} />
                                            </View>
                                            <Text style={[styles.idText, { paddingTop: 4 }]}>{details?.pin}</Text>
                                        </View>
                            <View style={styles.lineView} />
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 17, }}>
                                <View style={{ flexDirection: 'column', flex: 1, marginRight: 10, marginTop: 10 }}>
                                    <Text style={styles.headTextTitle}>Mobile</Text>
                                    <Text style={styles.subText}>{details?.mobileNumber?.replace(/^.{0}/g, '', " ").slice(-10).replaceAt(3, "X").replaceAt(4, "X").replaceAt(5, "X").replaceAt(6, "X").replaceAt(7, "X")}</Text>
                                </View>
                            </View>
                            <View style={styles.lineView} />
                            <View style={{ paddingHorizontal: 17, marginTop: 10 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={styles.headTextTitle}>Address</Text>
                                    {!AddressStatus && !details?.varificationStatus &&
                                    <TouchableOpacity style={[styles.EditTouch]} onPress={() => setAddressStatus(true)} >
                                        <Text style={[styles.changeText, { paddingLeft: 0 }]}>Edit</Text>
                                    </TouchableOpacity>}
                                </View>
                                {!AddressStatus ?
                                    <Text style={[styles.subText, { maxWidth: 270 }]}>{details?.address}</Text>
                                    : <View style={{
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <TextInput style={styles.textInput}
                                            value={removeEmojis(Address)}
                                            multiline={true}
                                            onChangeText={(text) => {
                                                //setAddress(text)
                                                const firstDigitStr = String(text)[0];
                                                if (firstDigitStr == ' ') {
                                                    setAddress('')
                                                } else if (/^[a-zA-Z1234567890,.:()/ ]+$/g.test(text) || text === '') {
                                                    setAddress(text)
                                                    setAddressChange(true)
                                                } else {

                                                }

                                            }}
                                        />
                                    </View>}
                            </View>
                            <View style={styles.lineView} />
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 17, }}>
                                <View style={{ flexDirection: 'column', flex: 1, marginRight: 10, marginTop: 10 }}>
                                    <Text style={styles.headTextTitle}>Aadhaar ID</Text>
                                    <Text style={styles.subText}>{details?.aadharNumber}</Text>
                                </View>
                            </View>

                            <>
                                <View style={styles.lineView} />
                                <View style={{ paddingHorizontal: 17, marginBottom: details?.spouseVoterId ? 0 : 10, marginTop: 10 }}>
                                    <Text style={styles.headTextTitle}>Voter ID</Text>
                                    <Text style={styles.subText}>{details?.voterId}</Text>
                                </View>
                            </>

                            {details?.spouseVoterId &&
                                <>
                                    <View style={styles.lineView} />
                                    <View style={{ paddingHorizontal: 17, paddingBottom: 16, marginTop: 10 }}>
                                        <Text style={styles.headTextTitle}>Spouse Voter ID</Text>
                                        <Text style={styles.subText}>{details?.spouseVoterId}</Text>
                                    </View>
                                </>}

                        </View>

                    </ScrollView>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                        <TouchableOpacity style={[styles.buttonView, { backgroundColor: COLORS.colorLight }]}
                            onPress={() => setModalReason(true)}>
                            <Text style={[styles.continueText, { color: COLORS.colorB }]}>Reject</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() =>ConfirmButton()}
                            style={[styles.buttonView, { backgroundColor: COLORS.colorB }]}>
                            <Text style={[styles.continueText, { color: COLORS.colorBackground }]}>Confirm</Text>
                        </TouchableOpacity>
                    </View>

                </View>}

            <RejectModal
                onPress1={() => {
                    setModalVisible(!ModalVisible)
                }}
                ModalVisible={ModalVisible}
                onPressOut={() => {
                    setModalVisible(!ModalVisible)
                    navigation.navigate('CreateTrustCircle', { customerDetails: details })
                }}
                onPressClose={() => {
                    setModalVisible(!ModalVisible)
                    navigation.navigate('CreateTrustCircle', { customerDetails: details })
                }}
                setModalVisible={setModalVisible}
            />

            <ErrorModal
                ModalVisible={ModalError}
                onPressOut={() => {
                    setModalError(!ModalError)
                    setModalReason(!ModalReason)
                    navigation.navigate('Profile')
                }}
                setModalVisible={setModalError}
            />

            <ReasonModal
                onPress1={updateActivityReject}
                ModalVisible={ModalReason}
                onPressOut={() => setModalReason(!ModalReason)}
                setModalVisible={setModalReason}
                setRejectReason={setRejectReason}
                data={data}
            />

            <CGTstatus
                Press={() => { setModalVisible2(false), updateActivity(), navigation.navigate('ActivityScreens') }}
                Press1={() => { setModalVisible2(false), navigation.navigate('ActivityScreens') }}
                ModalVisible={ModalVisible2}
                setModalVisible={setModalVisible2}
                onPressOut={() => {
                    setModalVisible2(false)
                }}
                navigation={navigation}
            />

            <EditAddModal
                onPress1={updateActivityReject}
                ModalVisible={EditAddsModal}
                onPressOut={() => { getDetails(), setEditsModal(!EditAddsModal) }}
                setModalVisible={setEditsModal}
                navigation={navigation}
                Address={Address}
                custID={customerId}
                setAddress={setAddress}
            />

        </SafeAreaProvider>
    )
}

export default CgtCustomer;

const styles = StyleSheet.create({
    container1: {
        flex: 0,
        backgroundColor: "#002B59",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    mainContainer: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: COLORS.colorBackground
    },
    text1: {
        fontFamily: FONTS.FontBold,
        fontSize: 14,
        fontWeight: '700'
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
    textInput: {
        marginTop: width * 0.03,
        width: width * 0.8,
        //height: width * 0.15,
        backgroundColor: '#FCFCFC',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(236, 235, 237, 1)',
        color: "#1A051D",
        fontFamily: FONTS.FontRegular,
        fontSize: 14,
        paddingLeft: width * 0.025
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
        borderWidth: 1,
        borderColor: COLORS.colorBorder,
        borderRadius: 8,
        marginTop: 23,
        marginBottom:25
    },
    lineView: {
        borderWidth: 0.6,
        borderColor: COLORS.Gray6,
        backgroundColor: COLORS.Gray6,
        opacity: 0.5,
        marginTop: 13,
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
        letterSpacing: 0.64
    },
    boxStyle: {
        paddingHorizontal: 15,
        paddingTop: 12,
        flexDirection: 'row'
    },
    circleStyle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    circleText: {
        fontSize: 18,
        fontFamily: FONTS.FontSemiB,
        color: COLORS.colorBackground,
        fontWeight: '600',
    },
    circleText: {
        fontSize: 18,
        fontFamily: FONTS.FontSemiB,
        color: COLORS.colorBackground,
        fontWeight: '600',
    },
    headTextTitle: {
        fontSize: 13,
        fontFamily: FONTS.FontSemiB,
        color: COLORS.colorDark,
    },
    subText: {
        fontSize: 12,
        fontFamily: FONTS.FontRegular,
        color: COLORS.colorDark,
        paddingTop: 3
    },
    Button1: {
        width: width * 0.87,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.colorB,
        marginTop: 31,
        flexDirection: 'row',
        borderRadius: 40,
        marginBottom: 20
    },
    viewCard: {
        backgroundColor: COLORS.colorBackground,
        width: width * 0.88,
        borderRadius: 8,
        height: width * 0.22,
        marginBottom: width * 0.03,
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        elevation: 2,
        shadowRadius: 7,
        marginTop: width * 0.045,
        marginLeft: 2
    },
    NumTexts: {
        color: '#1A051D',
        fontFamily: FONTS.FontRegular,
        fontSize: 12
    },
    EditTouch: {
        backgroundColor: COLORS.colorLight,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 54,
        height: 24,
        marginBottom: 0,
        width: '20%'
    }
})