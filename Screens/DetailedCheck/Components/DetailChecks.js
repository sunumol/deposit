import {
    StyleSheet,
    Text,
    View,
    BackHandler,
    StatusBar,
    Keyboard,
    Platform,
    TextInput,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    ToastAndroid,
    Pressable
} from 'react-native'
import React, { useCallback, useEffect, useState, useRef } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Statusbar from '../../../Components/StatusBar';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../../../Components/RepayHeader';
import { FONTS, COLORS } from '../../../Constants/Constants';
import { CheckBox } from 'react-native-elements/dist/checkbox/CheckBox';
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Search from 'react-native-vector-icons/Feather';
import RoadAccessModal from './RoadAccessModal';
import ModalSave from '../../../Components/ModalSave';
import { api } from '../../../Services/Api';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CorrectionModal from './CorrectionModal';


const { height, width } = Dimensions.get('screen');

const
    DetailChecks = ({ navigation, details, nav,isCheck,
         setVillagename1, setPostoffice1, setLandmarkname1,
          setRoadStatus1, setpoststatus, setvillagestatus,
           setbackstate,Correction }) => {
        console.log('????===>>123', setbackstate)

        const isDarkMode = true;
        const villageinput = useRef();
        const postinput = useRef();
        const [text, onChangeText] = useState('');
        const [vstatus, setVstatus] = useState(true)
        const [ButtonStatus, setButtonStatus] = useState(false)
        const [ModalError, setModalError] = useState(false)
        const [roadstatus, setRoadStatus] = useState(details?.accessRoadType)
        const [poststatus, setPostStatus] = useState(true)
        const [landmarkname, setLandmarkname] = useState(details?.landmarkname)
        const [ModalReason, setModalReason] = useState(false)
        const [ModalReason1, setModalReason1] = useState(false)
        const [checked, setChecked] = useState(false);
        const [villagename, setVillagename] = useState(details?.village);
        const [BStatus, setBstatus] = useState(false);
        const [villagenamedata, setVillagenamedata] = useState('');
        const [postofficename, setPostofficename] = useState(details?.postOffice);
        const [PStatus, setPstatus] = useState(false);
        const [postofficenamedata, setPostofficenamedata] = useState('');
        const [postpop, setpostpop] = useState(false);
        const activityId = useSelector(state => state.activityId);
      
        const [ModalVisibleC, setModalVisibleC] = useState(false)
        const isLastPage = useSelector(state => state.isLastPage);
        const [CorrectionStatus,setCorrectionStatus] = useState()
        const [Correct1, setCorrect1] = useState(Correction)

        const toggleCheckbox = () => {
            console.log('66666', villagename, postofficename, landmarkname, roadstatus, vstatus, poststatus)
            // if ((villagename || details?.village) && (postofficename || details?.postOffice) && (landmarkname || details?.landMark) && (roadstatus || details?.accessRoadType)) {

            if (villagename && postofficename && landmarkname.length > 0 && roadstatus && vstatus && poststatus) {
                setChecked(!checked)
            } else {
                setChecked(false)
            }
        }

        String.prototype.replaceAt = function (index, replacement) {
            return this.substring(0, index) + replacement + this.substring(index + replacement.length);
        }

        useEffect(() => {
            if (setbackstate == true) {
                setBstatus(false),
                    setPstatus(false)
            }
        }, [setbackstate])


        useEffect(() => {
            setVillagename(details?.village)
           
            setRoadStatus(details?.accessRoadType)

            if(!Correct1){
            setPostofficename(details?.postOffice)
            setLandmarkname(details?.landMark)
            }

        }, [details])



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

        const searchvillagename = (text) => {
            console.log('VILLAGE NAME ===>>>', text)
            // setVillagename(text)
            setVstatus(false)

            if (text === "" || !/^[a-zA-Z]+$/g.test(text)) {

                setVillagenamedata([])
                setBstatus(false)
                setvillagestatus(false)
                setChecked(false)
                setVillagename('')
                console.log("text special", text)

            }
            else if (!/^[a-zA-Z]+$/g.test(text)) {

                setVillagenamedata([])
                setBstatus(false)
                setvillagestatus(false)
                setChecked(false)

                console.log("text special", text)

            }
            else {

                console.log("text special", text)
                setVillagename(text)
                setVillagename1(text)
                getVillage(text)
            }
            //setVillagename(text)
        }



        const searchpostofficename = (text) => {
            console.log('Post office NAME ===>>>', text)
            // setVillagename(text)
            const firstDigitStr = String(text)[0];
            setPostStatus(false)
            if (text == '' || !/^[a-zA-Z]+$/g.test(text)) {

                setPostofficenamedata([])
                setPstatus(false)
                setpoststatus(false)
                setChecked(false)
                setPostofficename('')
                // } else if (!(/^[^!-\/:-@\.,[-`{-~1234567890]+$/.test(text))) {
            } else if (!/^[a-zA-Z]+$/g.test(text)) {
                setPostofficenamedata([])
                setPstatus(false)
                setpoststatus(false)
                setChecked(false)
            } else if (firstDigitStr == ' ') {

                containsWhitespace(text)
                setPostofficenamedata([])
                setPstatus(false)
                setpoststatus(false)
                setChecked(false)

            }

            else {

                getpostoffice()
                setPostofficename(text?.replace(/\s/g, ''))
                setPostoffice1(text?.replace(/\s/g, ''))
            }
            //setPostofficename(text)
        }



        const searchlandmarkname = (text) => {
            console.log('landmark NAME ===>>>', text)
            const firstDigitStr = String(text)[0];
            if (firstDigitStr == ' ' || firstDigitStr === '1' ||
                firstDigitStr === '2' || firstDigitStr === '3' ||
                firstDigitStr === '4' || firstDigitStr === '5' ||
                firstDigitStr === '6' || firstDigitStr === '7' || firstDigitStr === '8' || firstDigitStr === '0' || firstDigitStr === '9' || !(/^[A-Za-z1234567890 ]+$/.test(text)) || text === '') {
                containsWhitespace(text)
                // 👇️ this runs
                setLandmarkname('')
                setLandmarkname1('')
                ToastAndroid.show("Please enter a valid landmark ", ToastAndroid.SHORT);
                console.log('The string contains whitespace',);
            }
            else if (/^[A-Za-z1234567890 ]+$/.test(text) || text === '') {
                setLandmarkname(text)
                setLandmarkname1(text)
                setChecked(false)
                console.log("inside this land", text)
            }

            else {
                //setLandmarkname()
                setLandmarkname(text)
                setLandmarkname1(text)
                console.log("inside this land else", text)
                setChecked(false)
                // setLandmarkname(text)
                // setLandmarkname1(text)
            }

        }



        // ------------------ get Conduct DLE basic detail Village Api Call Start ------------------
        const getVillage = async (value) => {
            console.log('api called', details?.pin)
            const data = {
                "pin": details?.pin,
                // "pin": 688540,
                "villageName": value
            }
            await api.getVillage(data).then((res) => {
                console.log('-------------------res get Village', res.data, data)
                if (res?.status) {
                    setVillagenamedata(res?.data?.body)
                    setBstatus(true)
                    setvillagestatus(true)
                }
            }).catch((err) => {
                console.log('-------------------err get Village', err?.response)
            })
        };
        // ------------------ HomeScreen Api Call End ------------------



        // ------------------ get Conduct DLE basic detail Village Api Call Start ------------------
        const getpostoffice = async (value) => {
            console.log('api called')
            const data = {
                "pin": details?.pin,
                //"pin": 688540,
                "postOfficeName": value
            }
            await api.getpostoffice(data).then((res) => {
                console.log('-------------------res get Post', res?.data?.body)
                if (res?.status) {
                    setPostofficenamedata(res?.data?.body)
                    //setModalVisible4(true)
                    setPstatus(true)
                    setpoststatus(true)
                }
            }).catch((err) => {
                console.log('-------------------err get Post', err?.response)
            })
        };

        useEffect(() => {

            AsyncStorage.getItem("CorrectionStatus").then((value) => {
                setCorrectionStatus(value)
            })
        }, [])
        // ------------------ get Conduct DLE basic detail Village Api Call Start ------------------
        const onsubmit = async (value) => {

            console.log('api called')
            const data = {
                "customerId": details?.customerId,
                "customerName": details?.customerName,
                "address": details?.address,
                "district": details?.district,
                "village": villagename ? villagename : details?.village,
                "accessRoadType": roadstatus ? roadstatus : details?.accessRoadType,
                "postOffice": postofficename ? postofficename : details?.postOffice,
                "landMark": landmarkname ? landmarkname : details?.landMark,
                "pin": details?.pin
            }
            await api.savebasicdetail(data).then((res) => {
                console.log('-------------------res update', res?.data)
                if (res?.status) {
                    console.log("HELLO SAVE SUCCESS", res?.data)
                    if (isCheck) {
                        setModalVisibleC(true)
        
                        AsyncStorage.removeItem('CorrectionStatus')
                        console.log("am here")
                    }else{
                        getLastPage()
                    }
                  


                    // navigation.navigate('VehicleOwn') 
                }
            }).catch((err) => {
                console.log('-------------------err update', err?.response)
            })
        };

        function containsWhitespace(str) {
            return /\s/.test(str);
        }

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
                console.log("last page upadte", res?.data,CorrectionStatus)
               if (res?.data?.body?.isLasCorrectin == false && res?.data?.body?.nextPage == 10) {
                     //setModalVisibleC(true)
                    console.log("am here",CorrectionStatus)
                    navigation.navigate('CustomerDetails')
                }
                else if (res?.data?.body?.isLasCorrectin == false && res?.data?.body?.nextPage == 2) {
                    navigation.navigate('ResidenceOwner',{Correction:Correct1})
                }
                else if (res?.data?.body?.isLasCorrectin == false && res?.data?.body?.nextPage == 6) {
                    navigation.navigate('EnergyUtility',{Correction:Correct1})
                } else if (res?.data?.body?.isLasCorrectin == false && res?.data?.body?.nextPage == 3) {
                    navigation.navigate('ContinuingGuarantor',{Correction:Correct1})
                }
                else if (res?.data?.body?.isLasCorrectin == false && res?.data?.body?.nextPage == 7) {
                    navigation.navigate('IncomeDetails',{Correction:Correct1})
                } else if (res?.data?.body?.isLasCorrectin == false && res?.data?.body?.nextPage == 8) {
                    navigation.navigate('IncomeDetailsSpouse')
                }
                else if (res?.data?.body?.isLasCorrectin == false && res?.data?.body?.nextPage == 10) {
                    navigation.navigate('CustomerDetails')
                }
                else if (res?.data?.body?.isLasCorrectin == true && res?.data?.body?.nextPage == 2) {
                    navigation.navigate('ResidenceOwner',{isCheck:res?.data?.body?.isLasCorrectin,Correction:Correct1})
                } else if (res?.data?.body?.isLasCorrectin == true && res?.data?.body?.nextPage == 3) {
                    navigation.navigate('ContinuingGuarantor',{isCheck:res?.data?.body?.isLasCorrectin,Correction:Correct1})
                }


                else if (res?.data?.body?.isLasCorrectin == true && res?.data?.body?.nextPage == 6) {
                    navigation.navigate('EnergyUtility',{isCheck:res?.data?.body?.isLasCorrectin,Correction:Correct1})
                }
                else if (res?.data?.body?.isLasCorrectin == true && res?.data?.body?.nextPage == 7) {
                    navigation.navigate('IncomeDetails',{isCheck:res?.data?.body?.isLasCorrectin,Correction:Correct1})
                } else if (res?.data?.body?.isLasCorrectin == true && res?.data?.body?.nextPage == 8) {
                    navigation.navigate('IncomeDetailsSpouse')
                } else if (res?.data?.body?.isLasCorrectin == true && res?.data?.body?.nextPage == 10) {
                  setModalVisibleC(true)
                }

            }).catch((err) => {
                console.log('-------------------err DLESTAUS', err?.response)

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
                console.log('-------------------err CONFIRMATION', err?.response)

            })
        };

        return (


            <Pressable onPress={() => { setPstatus(false), setpoststatus(false), setBstatus(false), setvillagestatus(false) }} style={styles.mainContainer}>
                {/* <ScrollView showsVerticalScrollIndicator={false}
                    //keyboardShouldPersistTaps={'handled'}
                    keyboardShouldPersistTaps ={'never'} 
                    keyboardDismissMode={'on-drag'}  > */}
                <View style={styles.searchBox}>
                    <View style={styles.boxStyle}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>

                            <View style={[styles.circleStyle, { backgroundColor: 'rgba(105, 121, 248, 1)' }]}>
                                <Text style={styles.circleText}>{getInitials(details?.customerName)}</Text>
                            </View>

                            <View style={{ flexDirection: 'column', paddingLeft: 12, paddingTop: 5 }}>
                                <Text style={styles.nameText}>{details?.customerName}</Text>
                                <View style={{ flexDirection: 'row', }}>
                                    <View style={{ paddingTop: 5, paddingRight: 1 }}>
                                        <Icon1 name="location-outline" color={"black"} />
                                    </View>
                                    <Text style={[styles.idText, { paddingTop: 4 }]}>{details?.village ? details?.village : details?.pin}</Text>
                                </View>
                            </View>

                        </View>

                        <View style={{ flexDirection: 'column', paddingTop: 5, alignItems: 'flex-end' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon2 name="phone-in-talk-outline" color={"black"} size={15} />
                                <Text style={[styles.numText, { paddingLeft: 6 }]}>{details?.mobile?.replace(/^.{0}/g, '', " ").slice(-10).replaceAt(3, "X").replaceAt(4, "X").replaceAt(5, "X").replaceAt(6, "X").replaceAt(7, "X")}</Text>
                            </View>
                        </View>

                    </View>
                    <View style={styles.lineView} />
                    <View style={{ paddingHorizontal: 17, flexDirection: 'row' }}>

                        <View style={{ flex: 0.7 }}>
                            <Text style={styles.headTextTitle}>Address</Text>
                        </View>
                        <View style={{ flex: 2 }}>
                            <Text style={[styles.subText, { maxWidth: 200 }]}>{details?.address ? details?.address : '-'}</Text>
                        </View>

                    </View>
                    <View style={styles.lineView} />





                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 17, }}>


                        <View style={{ flex: 0.7 }}>
                            <Text style={styles.headTextTitle}>District</Text>
                        </View>
                        <View style={{ flex: 2 }}>
                            <Text style={styles.subText}>{details?.district ? details?.district : '-'}</Text>
                        </View>

                        {/* <Success height={23} width={24} /> */}
                    </View>




                    <View style={styles.lineView} />



                    <View style={{ paddingHorizontal: 17, flexDirection: 'row' }}>

                        <View style={{ flex: 0.7, marginTop: width * 0.04 }}>
                            <Text style={styles.headTextTitle}>Village</Text>
                        </View>

                        <View style={{ flex: 2 }}>
                            <View style={[styles.textInput, { flexDirection: 'row' }]}>
                                <View style={styles.borderVillage}>
                                    <TextInput
                                        ref={villageinput}
                                        value={removeEmojis(villagename)}
                                        placeholder={"Search village"}
                                        contextMenuHidden={true}
                                        placeholderTextColor="#808080"
                                        editable={details?.village ? false : true}
                                        style={[styles.TextInputBranch, { width: width * 0.48, color: 'rgba(26, 5, 29, 1)', fontSize: 12, left: 3 }]}
                                        onChangeText={(text) => {
                                            if (text.length == 25) {
                                                Keyboard.dismiss();
                                            }
                                            searchvillagename(text)
                                        }}
                                        maxLength={25}
                                        onFocus={() => { setBstatus(false), setvillagestatus(false) }}
                                        onKeyPress={() => { setBstatus(false), setvillagestatus(false) }}
                                        blurOnSubmit={true}
                                    />
                                    {!details?.village
                                        ?
                                        <TouchableOpacity onPress={() => villageinput?.current?.focus()} >
                                            <Search name="search" size={17} style={{ marginRight: 15 }} color={'#1A051D'} />
                                        </TouchableOpacity>

                                        : null}
                                </View>
                            </View>

                            {BStatus ?
                                (<View style={{ paddingTop: 10 }}>
                                    {villagenamedata?.length > 0
                                        ? <>
                                            {villagenamedata?.map((item) => {
                                                return (
                                                    <TouchableOpacity onPress={() => {
                                                        setBstatus(false)
                                                        setvillagestatus(false)
                                                        setVillagename(item)
                                                        setVillagename1(item)
                                                        setVstatus(true)
                                                    }}>
                                                        <View style={[styles.ViewBankMap, { paddingTop: 0 }]}>
                                                            <Text style={styles.ItemNameBranch}>{item}</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                )
                                            })}
                                        </> :
                                        <View style={[styles.ViewBankMap, { paddingTop: 0 }]}>
                                            <Text style={styles.ItemNameBranch}>No results found</Text>
                                        </View>}
                                </View>) : null
                            }
                        </View>
                    </View>

                    <View style={styles.lineView} />
                    <View style={{ paddingHorizontal: 17, flexDirection: 'row' }}>
                        <View style={{ flex: 0.7, marginTop: width * 0.02 }}>
                            <Text style={styles.headTextTitle}>Access road type</Text>
                        </View>
                        <View style={{ flex: 2 }}>
                            <TouchableOpacity style={styles.SelectBox} onPress={() => setModalReason1(true)}>
                                <Text style={[styles.textSelect, { color: !roadstatus ? '#808080' : '#1A051D' }]}>{roadstatus ? roadstatus : (details?.accessRoadType ? details?.accessRoadType : 'Select')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.lineView} />
                    <View style={{ paddingHorizontal: 17, flexDirection: 'row' }}>
                        <View style={{ flex: 0.7, marginTop: width * 0.04 }}>
                            <Text style={styles.headTextTitle}>Post Office</Text>
                        </View>
                        <View style={{ flex: 2 }}>
                            <View style={[styles.textInput, { flexDirection: 'row' }]}>
                                <View style={styles.borderVillage}>
                                    <TextInput
                                        ref={postinput}
                                        value={removeEmojis(postofficename)}
                                        style={styles.TextInputBranch}
                                        contextMenuHidden={true}
                                        maxLength={25}
                                        onChangeText={(text) => {


                                            if (text?.length == 25) {
                                                Keyboard.dismiss()
                                            }


                                            searchpostofficename(text)
                                        }}
                                        onFocus={() => { setPstatus(false), setpoststatus(false) }}
                                        onKeyPress={() => { setPstatus(false), setpoststatus(false) }}

                                    />
                                    <TouchableOpacity onPress={() => postinput?.current?.focus()} >
                                        <Search name="search" size={17} style={{ marginRight: 15 }} color={'#1A051D'} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {PStatus ?

                                (<View style={{ paddingTop: 10 }}>
                                    {postofficenamedata?.length > 0
                                        ? <>
                                            {postofficenamedata?.map((item) => {

                                                return (
                                                    <TouchableOpacity onPress={() => {
                                                        setPstatus(false)
                                                        setpoststatus(false)
                                                        // setBranchStatus(false)
                                                        // setSearchStatus(true)
                                                        setPostofficename(item)
                                                        setPostoffice1(item)
                                                        setPostStatus(true)
                                                        // setBankBranchNameId(item.id)
                                                        // setCloseBranch(true)
                                                        // setDetailsStatus(false)
                                                    }}>
                                                        <View style={styles.ViewBankMap}>

                                                            <Text style={styles.ItemNameBranch}>{item}</Text>
                                                            {/* {item.id == 1 &&
                                                        <View style={styles.Line} />} */}
                                                        </View>
                                                    </TouchableOpacity>
                                                )
                                            })}
                                        </> :
                                        <View style={styles.ViewBankMap}>
                                            <Text style={styles.ItemNameBranch}>No results found</Text>
                                        </View>}
                                </View>) : null


                            }

                        </View>
                    </View>


                    <View style={styles.lineView} />
                    <View style={{ paddingHorizontal: 17, paddingBottom: 16, flexDirection: 'row' }}>
                        <View style={{ flex: 0.7, marginTop: width * 0.04 }}>
                            <Text style={styles.headTextTitle}>Landmark</Text>
                        </View>
                        <View style={{ flex: 2 }}>
                            <View style={[styles.textInput, { flexDirection: 'row' }]}>


                                <View style={{ flexDirection: 'row' }}>

                                    <TextInput
                                        placeholder={"Landmark"}
                                        placeholderTextColor="#808080"
                                        value={removeEmojis(landmarkname)}
                                        contextMenuHidden={true}
                                        style={styles.TextInputBranch}
                                        numberOfLines={2}
                                        maxLength={40}
                                        onChangeText={(text) => searchlandmarkname(text)}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>

                </View>


                <View style={{ flexDirection: 'row', left: -15 }}>
                    <View style={{ marginTop: 5 }}>
                        <CheckBox
                            checked={checked}
                            onPress={toggleCheckbox}
                            // Use ThemeProvider to make change for all checkbox
                            iconType="material-community"
                            checkedIcon="checkbox-marked"
                            uncheckedIcon="checkbox-blank-outline"
                            checkedColor={COLORS.colorB}
                        />
                    </View>
                    <View style={{ flexDirection: 'column', left: -5 }}>
                        <Text style={[styles.TextCheck, { paddingTop: width * 0.05 }]}>The above address is checked and found to </Text>
                        <Text style={styles.TextCheck}>be correct</Text>
                    </View>

                </View>

                <View style={{
                    flexDirection: 'row', justifyContent: 'space-between', marginTop: width * 0.0,
                    paddingLeft: 10, paddingRight: 10
                }}>

                    {/* <TouchableOpacity style={[styles.buttonView, { backgroundColor: 'rgba(229, 231, 250, 1)' }]}
                        onPress={() => setModalReason(true)}>
                        <Text style={[styles.continueText, { color: COLORS.colorB }]}>Reject</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity onPress={() => checked ? onsubmit() : console.log('')}
                        style={[styles.buttonView, { backgroundColor: checked ? COLORS.colorB : 'rgba(236, 235, 237, 1)' }]}>
                        <Text style={[styles.continueText, { color: checked ? COLORS.colorBackground : '#979C9E' }]}>{!isCheck ? 'Confirm' :'Submit'}</Text>
                    </TouchableOpacity>
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
                {/* </ScrollView> */}
                {/* <ErrorModal
                ModalVisible={ModalError}
                onPressOut={() => {
                    setModalError(!ModalError)
                    setModalReason(!ModalReason)
                    navigation.navigate('Profile')
                }}
                setModalVisible={setModalError}
                navigation={navigation} 
            />

            <ReasonModal
                onPress1={() => {
                    // setModalVisible(false)
                    setModalError(true)
                }}
                ModalVisible={ModalReason}
                onPressOut={() => setModalReason(!ModalReason)}
                setModalVisible={setModalReason}
            /> */}

                {/* 
            <PostModal
               press1={(value) => {

                setPstatus(false)
                setPostofficename(value)
                setPostoffice1(value)
                setPostStatus(true)
                setModalVisible4(false)
               }}
                postlist={postofficenamedata}
                ModalVisible={ModalVisible4}
                onPressOut={() => setModalVisible4(false)}
                setModalVisible={setModalVisible4}



            /> */}




                <RoadAccessModal
                    onPress1={(value) => {
                        console.log('====>>Road', value?.Title)
                        setRoadStatus(value?.Title)
                        setRoadStatus1(value?.Title)
                        setModalReason1(false)
                        // setModalError(true)
                    }}
                    ModalVisible={ModalReason1}
                    onPressOut={() => setModalReason1(!ModalReason1)}
                    setModalVisible={setModalReason1}
                />





            </Pressable>





        )
    }

export default DetailChecks;

const styles = StyleSheet.create({
    textInput: {
        width: width * 0.56,
        height: width * 0.12,
        backgroundColor: "rgba(252, 252, 252, 1)",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(236, 235, 237, 1)',
        color: "#1A051D",
        fontFamily: FONTS.FontRegular,
        fontSize: 15,
        paddingLeft: width * 0.025,
        alignItems: 'center',
        marginLeft: 5
    },
    TextCheck: {
        fontSize: 12,
        fontFamily: FONTS.FontRegular,
        color: '#3B3D43'
    },
    searchText1: {
        color: '#808080',
        fontSize: 15,
        fontFamily: FONTS.FontRegular,
        marginLeft: 15
    },
    container1: {
        flex: 0,
        backgroundColor: "#002B59",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    SelectBox: {
        backgroundColor: '#FCFCFC',
        borderRadius: 8,
        borderWidth: 1,
        width: width * 0.56,
        height: width * 0.12,
        borderColor: 'rgba(236, 235, 237, 1)',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginTop: width * 0.02,
        marginBottom: width * 0.02,
        marginLeft: 5
    },
    textSelect: {
        fontSize: 12,
        color: 'rgba(128, 128, 128, 1)',
        fontFamily: FONTS.FontRegular,
        marginLeft: 10,
        left: 0
    },
    borderVillage: {
        // borderRadius: 8,
        // borderWidth: 1,
        /// width: width * 0.80,
        // height: width * 0.12,
        //borderColor: 'rgba(236, 235, 237, 1)',
        //marginTop: width * 0.02,
        //backgroundColor:'red',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',

    },
    ItemNameBranch: {
        paddingLeft: 4,
        color: "#1A051D",
        fontSize: 12,
        fontFamily: FONTS.FontRegular
    },
    mainContainer: {
        flex: 1,
        //paddingHorizontal: 20,
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

        borderWidth: 1,
        borderColor: COLORS.colorBorder,
        borderRadius: 8,
        marginTop: 15,


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
        width: '88%'
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
        // marginLeft: 12,
        // marginRight: 12,
        borderRadius: 40,
        marginBottom: 20
    },
    viewCard: {
        backgroundColor: COLORS.colorBackground,
        width: width * 0.92,
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
        marginTop: width * 0.045
    },
    NumTexts: {
        color: '#1A051D',
        fontFamily: FONTS.FontRegular,
        fontSize: 12
    },
    buttonView: {

        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 54,
        height: 48,
        marginBottom: 20,
        width: '100%'
    },
    continueText: {
        fontSize: 14,
        fontFamily: FONTS.FontBold,
        color: COLORS.colorBackground,
        letterSpacing: 0.64
    },
    TextInputBranch: {
        color: 'rgba(26, 5, 29, 1)',
        fontSize: 12,
        fontFamily: FONTS.FontRegular,
        paddingLeft: 3,
        width: width * 0.46,
        // backgroundColor:'red'
        //height: width * 0.08
    },
    ViewBankMap: {
        width: width * 0.56,
        height: width * 0.13,
        borderWidth: 1,
        alignItems: 'center',
        paddingLeft: width * 0.02,
        borderColor: 'rgba(236, 235, 237, 1)',
        borderRadius: 8,
        flexDirection: 'row',
        marginLeft: 5
    },

})