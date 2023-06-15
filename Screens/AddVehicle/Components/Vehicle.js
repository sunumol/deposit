import {
    StyleSheet,
    Text,
    View,
    BackHandler,
    StatusBar,
    SafeAreaView,
    Platform,
    TextInput,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    Alert
} from 'react-native'
import React, { useCallback, useState, useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Statusbar from '../../../Components/StatusBar';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../../../Components/RepayHeader';
import { FONTS, COLORS } from '../../../Constants/Constants';
import Search from '../../../assets/image/search2.svg'
import Icon1 from 'react-native-vector-icons/Entypo'
import Purpose from '../../SelectCustomCall/Components/Purpose';
const { height, width } = Dimensions.get('screen');
import OwnerModal from './OwnerModal';
import Image1 from '../../../assets/Images/cakes.svg';
import { api } from '../../../Services/Api';
import ErrorModal from './ErrorModal';
import { useSelector } from 'react-redux';
import VehicleModal from './VehicleModal';

const Vehicle = ({ navigation,setsearchvehicledata }) => {

    const activityId = useSelector(state => state.activityId);

    useEffect(() => {
        const willFocusSubscription = navigation.addListener('focus', () => {
            setPurpose('')
            setSearchStatus2(false)
            setSearchStatus(false)
            setNumbers('')
            console.log("search status.....", SearchStatus)

        });
        return willFocusSubscription;
    }, []);

    const isDarkMode = true;
    const [text, onChangeText] = useState('');
    const [ModalVisible, setModalVisible] = useState(false)
    const [selectedItem, setSelectedItem] = useState()
    const [ButtonStatus, setButtonStatus] = useState(false)
    const [ModalError, setModalError] = useState(false)
    const [ModalReason, setModalReason] = useState(false)
    const [checked, setChecked] = useState(false);
    const [numbers, setNumbers] = useState('')
    const [number, setNumber] = useState(false)
    const [Purpose, setPurpose] = useState('')
    const [SearchStatus, setSearchStatus] = useState(false)
    const [SearchStatus2, setSearchStatus2] = useState(false)
    const [spousedetail, setSpousedetail] = useState('')
    const [Status, setStatus] = useState(false)
    const [ModalVisible1, setModalVisible1] = useState(false)
    const [searchvehicledata, setSearchvehicledata] = useState({})
    const [VehicleStatus, setVehicleStatus] = useState(false)
    const [ModalVehicle, setModalVehicle] = useState(false)
    const [CustomerDetail, setCustomerDetail] = useState([])
    const toggleCheckbox = () => setChecked(!checked);

    const Data = [
        {
            id: 1,
            label: '|'
        },
        {
            id: 2,
            label: '|'
        },
        {
            id: 3,
            label: '|'
        },
        {
            id: 4,
            label: '|'
        },
        {
            id: 5,
            label: '|'
        }
    ]


    useEffect(() => {

        console.log("purpose print....", Purpose)

        setPurpose(Purpose)

        // setRelation(Relation)


        //setStatus(true)
    }, [Purpose])



    useEffect(() => {
        getCustomerdetail()
        getSpousedetail();

    }, [])


    // ------------------spouse detail ------------------

    const getSpousedetail = async () => {
        console.log('api called')

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



    const getCustomerdetail = async () => {
        console.log('api called')

        const data = {
            "activityId": activityId


        }
        await api.getCustomerdetail(data).then((res) => {
            console.log('-------------------res customerdetail', res.data.body)
            if (res?.status) {
                setCustomerDetail(res.data.body)
                //setSpousedetail(res?.data?.body)
            }
        }).catch((err) => {
            console.log('-------------------err spousedetail', err?.response)
        })
    };



    // ------------------get fetchVehicleDetailsForDle detail ------------------

    const fetchVehicleDetailsForDle = async () => {
        console.log('api called')

        const data = {
            "activityId": activityId,
            "relationShip": Purpose,
            "vehicleNumber": numbers
        }
        await api.fetchVehicleDetailsForDle(data).then((res) => {
            console.log('-------------------res fetchVehicleDetailsForDle12388', data, res)
            if (res?.status) {
                if (res?.data?.body) {
                    setSearchvehicledata(res?.data?.body)
                    setsearchvehicledata(res?.data?.body)

                    setSearchStatus2(true)
                } else {

                    setNumbers('')
                    setModalError(true)
                    setStatus(false)
                    setSearchStatus2(false)
                    console.log("inside this", Status)
                }

            }
        }).catch((err) => {
            if (err.response.status == 400) {
                setModalVehicle(true)
                setStatus(true)
                setNumbers('')
            }
            console.log('-------------------err fetchVehicleDetailsForDle', err.response.status, data)
        })
    };
    console.log('++++++++++++++++++', Status)

    // ------------------get fetchVehicleDetailsForDle detail ------------------

    const saveVehicleDetails = async () => {
        console.log('api called1')

        const data = [searchvehicledata]
        await api.saveVehicleDetails(data).then((res) => {
            console.log('-------------------res save vehicle', res)
            if (res?.status) {
                setStatus(!Status)
                navigation.navigate('VehicleOwn')
               
            }
        }).catch((err) => {
            console.log('-------------------err save vehicle', err)
        })
    };


    const StatusChange2 = () => {

        if (numbers?.length > 0) {
            //setSearchStatus2(true)
            setStatus(true)
            fetchVehicleDetailsForDle()
            console.log("search.....", SearchStatus)
        } else {
            setSearchStatus2(false)
            setStatus(true)
            console.log("search rt.....", SearchStatus)
        }

    }

    const OnchangeNumbers = (num) => {
        if (/^[A-Za-z1234567890]+$/.test(num) || num === '') {
            setNumbers(num)

        } else {

            setModalError(true)
            // ToastAndroid.show(t('common:Valid'), ToastAndroid.SHORT);
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
            console.log("last page upadte", res?.data)
            if (res?.data?.body?.isLasCorrectin == true) {

                getDLEConfirmation()

            } else if (res?.data?.body?.isLasCorrectin == false && res?.data?.body?.nextPage == 1) {
                navigation.navigate('DetailCheck')
            } else if (res?.data?.body?.isLasCorrectin == false && res?.data?.body?.nextPage == 2) {
                navigation.navigate('ResidenceOwner')
            } else if (res?.data?.body?.isLasCorrectin == false && res?.data?.body?.nextPage == 3) {
                navigation.navigate('ContinuingGuarantor')
            } else if (res?.data?.body?.isLasCorrectin == false && res?.data?.body?.nextPage == 4) {
                navigation.navigate('AddVehicle')
            } else if (res?.data?.body?.isLasCorrectin == false && res?.data?.body?.nextPage == 5) {
                navigation.navigate('VehicleOwn')
            } else if (res?.data?.body?.isLasCorrectin == false && res?.data?.body?.nextPage == 6) {
                navigation.navigate('EnergyUtility')
            } else if (res?.data?.body?.isLasCorrectin == false && res?.data?.body?.nextPage == 7) {
                navigation.navigate('IncomeDetails')
            } else if (res?.data?.body?.isLasCorrectin == false && res?.data?.body?.nextPage == 8) {
                navigation.navigate('IncomeDetailsSpouse')
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
                navigation.navigate('Proceed')

            }

        }).catch((err) => {
            console.log('-------------------err spousedetail1', err?.response)

        })
    };  
    return (

        <>
            <View style={styles.mainContainer}>
                <ScrollView keyboardShouldPersistTaps={'handled'}>
                    <View>
                        <Text style={styles.TextOwner}>Vehicle owner</Text>
                    </View>

                    <TouchableOpacity style={styles.SelectBox} onPress={() => {
                        setModalVisible1(true)
                    }} >

                        <Text style={[styles.textSelect, { color: '#1A051D', marginLeft: 8 }]}>{Purpose ? Purpose : 'Select'}</Text>

                        <Icon1 name="chevron-down" size={18} color={'#808080'} style={{ marginRight: 10 }} />
                    </TouchableOpacity>
                    <View>
                        <Text style={[styles.TextOwner, { marginTop: 10 }]}>Enter the vehicle number</Text>
                    </View>
                    {Purpose ?
                        <View>
                            <TouchableOpacity style={styles.SelectBox}>


                                <TextInput
                                    // readOnly={true}
                                    // contextMenuHidden={true}
                                   // placeholder='KL34E3278'
                                   // placeholderTextColor='#808080'
                                    value={numbers}
                                    maxLength={10}
                                    style={styles.Num}
                                    //placeholderTextColor="#808080"

                                    onChangeText={(text) => {

                                        OnchangeNumbers(text)


                                    }

                                    }

                                // keyboardType="numeric"
                                />

                                <TouchableOpacity style={styles.SearhView} onPress={() => numbers?.length > 0 ? StatusChange2() : console.log("null")}>
                                    <Search />
                                </TouchableOpacity>
                            </TouchableOpacity>

                        </View>
                        :
                        <View style={styles.SelectBox}>

                            <TextInput
                                editable={false}
                               // placeholder='KL34E3278'
                               // placeholderTextColor='#808080'
                                style={styles.Num}

                            />

                            <View style={styles.SearhView} >


                                <Search />
                            </View>
                        </View>}

                    {(SearchStatus2 && Purpose == "Spouse") ?
                        <View style={styles.containerBox}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={[styles.circleView, { backgroundColor: 'rgba(206, 116, 143, 1)' }]}>
                                    <Text style={styles.shortText}>{getInitials(spousedetail?.name)}</Text>
                                </View>
                                <View style={{ flexDirection: 'column', flex: 1, marginLeft: 12 }}>
                                    <Text style={styles.nameText}>{spousedetail?.name}</Text>


                                    <Text style={[styles.underText,{textTransform:'capitalize'}]}>{spousedetail?.occupation?.replace(/_/g, ' ')}</Text> 



                                </View>


                                <View style={{ flexDirection: 'row', }}>
                                    <Image1 width={11} height={11} top={3} />
                                    <Text style={styles.dateText}>{spousedetail?.dateOfBirth}</Text>
                                </View>

                            </View>
                        </View> : SearchStatus2 && Purpose == "Customer" &&
                        <View style={styles.containerBox}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={[styles.circleView, { backgroundColor: 'rgba(206, 116, 143, 1)' }]}>
                                    <Text style={styles.shortText}>{getInitials(CustomerDetail?.name)}</Text>
                                </View>
                                <View style={{ flexDirection: 'column', flex: 1, marginLeft: 12 }}>
                                    <Text style={styles.nameText}>{CustomerDetail?.name}</Text>


                                    <Text style={[styles.underText,{textTransform:'capitalize'}]}>{CustomerDetail?.occupation?.replace(/_/g, ' ')}</Text> 
                                </View>


                                <View style={{ flexDirection: 'row', }}>
                                    <Image1 width={11} height={11} top={3} />
                                    <Text style={styles.dateText}>{CustomerDetail?.dateOfBirth}</Text>
                                </View>

                            </View>
                        </View>}

                    {SearchStatus2 &&


                        <View>
                            <View style={styles.containerBox1}>
                                <View style={{
                                    flexDirection: 'row', justifyContent: 'space-around',
                                    paddingTop: width * 0.05, marginLeft: width * 0.05
                                }}>
                                    <View style={{ flexDirection: 'column', flex: 1, alignItems: 'flex-start' }}>
                                        <Text style={styles.owner}>Owner name</Text>
                                        <Text style={styles.NameStyle}>{searchvehicledata?.ownersName}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center', left: -9 }}>
                                        {Data.map((item) => {
                                            return (
                                                <View style={{ flexDirection: 'column', }}>
                                                    <Text style={{ fontSize: 6, color: "#C4C4C4" }}>{item?.label}</Text>
                                                </View>
                                            )
                                        })}
                                    </View>
                                    <View style={{ flexDirection: 'column', flex: 1, left: -25 }}>
                                        <Text style={styles.owner}>Vehicle Number</Text>
                                        <Text style={styles.NameStyle}>{searchvehicledata?.vehicleNumber}</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingTop: width * 0.05 }}>
                                    <View style={{ flexDirection: 'column', marginLeft: width * 0.055 }}>
                                        <Text style={styles.owner}>Model</Text>
                                        <View style={{maxWidth:width*0.5}}>
                                        <Text style={styles.NameStyle}>{searchvehicledata?.model}</Text>
                                   </View>
                                    </View>

                                    <View style={{ flexDirection: 'column', alignItems: 'center', flex: 1, left: -15 }}>
                                        {Data.map((item) => {
                                            return (
                                                <View style={{ flexDirection: 'column', }}>
                                                    <Text style={{ fontSize: 6, color: "#C4C4C4" }}>{item?.label}</Text>
                                                </View>
                                            )
                                        })}
                                    </View>

                                    <View style={{ flexDirection: 'column', flex: 1, left: -28 }}>
                                        <Text style={styles.owner}>Year</Text>
                                        <Text style={styles.NameStyle}>{searchvehicledata?.year}</Text>
                                    </View>
                                </View>
                                <View style={{
                                    flexDirection: 'row', justifyContent: 'space-between', marginTop: width * 0.05,
                                    paddingLeft: 20, paddingRight: 20
                                }}>

                                    <TouchableOpacity style={[styles.buttonView1, { backgroundColor: 'rgba(229, 231, 250, 1)' }]}
                                        onPress={() => { setSearchStatus2(false), setNumbers(''), setPurpose(''), setStatus(!Status) }}>
                                        <Text style={[styles.continueText, { color: COLORS.colorB }]}>Reject</Text>
                                    </TouchableOpacity>
                                    {console.log('~~~~~>>>', searchvehicledata)}
                                    <TouchableOpacity onPress={() => saveVehicleDetails()}
                                        style={[styles.buttonView1, { backgroundColor: COLORS.colorB }]}>
                                        <Text style={[styles.continueText, { color: COLORS.colorBackground }]}>Confirm</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>}

                </ScrollView>

                {!Status &&
                    <TouchableOpacity onPress={() => navigation.navigate('EnergyUtility')} style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                        <Text style={styles.skip}>Skip</Text>
                    </TouchableOpacity>}
                {!Status &&
                    <TouchableOpacity style={[styles.buttonView, { backgroundColor: number ? COLORS.colorB : '#E0E0E0' }]}>
                        <Text style={[styles.continueText, { color: number ? COLORS.colorBackground : COLORS.colorWhite3 }]}>Continue</Text>
                    </TouchableOpacity>}
            </View>

            <OwnerModal
                visible={ModalVisible1}
                Purpose={Purpose}
                setPurpose={setPurpose}
                setModalVisible={setModalVisible1}
                setStatus={setStatus}
                onPressOut={() => setModalVisible1(!ModalVisible1)}
            />
            <VehicleModal
                ModalVisible={ModalVehicle}
                onPressOut={() => {
                    setModalVehicle(!ModalVehicle)

                }}
                setModalVisible={setModalVehicle}
            />
            <ErrorModal
                ModalVisible={ModalError}
                onPressOut={() => {
                    setModalError(!ModalError)


                }}
                setModalVisible={setModalError}
            />


        </>
    )
}

export default Vehicle;

const styles = StyleSheet.create({


    mainContainer: {
        flex: 1,
        //paddingHorizontal: 20,
        backgroundColor: COLORS.colorBackground
    },
    buttonView: {
        backgroundColor: COLORS.colorB,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 54,
        height: 48,
        marginBottom: 0,

    },
    Num: {
        color: '#1A051D',
        fontSize: 14,
        fontFamily: FONTS.FontRegular,
        left: 6,
        // backgroundColor:'red',
        width: width * 0.6
    },
    continueText: {
        fontSize: 14,
        fontFamily: FONTS.FontBold,
        color: COLORS.colorBackground,
        letterSpacing: 0.64
    },
    buttonView1: {

        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 54,
        height: 48,
        marginBottom: 20,
        width: width * 0.37,

    },
    continueText: {
        fontSize: 14,
        fontFamily: FONTS.FontBold,

        letterSpacing: 0.64
    },
    TextOwner: {
        fontFamily: FONTS.FontRegular,
        color: '#3B3D43',
        fontSize: 12
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
        justifyContent: 'space-between',
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
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: width * 0.02,
        marginBottom: width * 0.02
    },
    textSelect: {
        fontSize: 14,
        color: 'rgba(128, 128, 128, 1)',
        fontFamily: FONTS.FontRegular,
        marginLeft: 10
    },
    skip: {
        fontSize: 14,
        color: COLORS.colorB,
        fontFamily: FONTS.FontSemiB
    },
    SearhView: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.colorB,
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerBox: {
        marginTop: 10,
        flexDirection: 'row',
        backgroundColor: COLORS.colorBackground,
        shadowColor: 'rgba(0, 0, 0, 0.4)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        elevation: 5,
        shadowRadius: 7,
        borderRadius: 8,
        marginRight: 15,
        marginLeft: 2,
        alignItems: 'center',
        marginBottom: 14,
        width: width * 0.88,
        height: width * 0.18
    },
    circleView: {
        width: 40,
        height: 40,
        backgroundColor: '#9EC894',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 15
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
        marginRight: 12,
        marginLeft: 5
    },
    containerBox1: {
        marginTop: 6,
        //flexDirection: 'row',
        backgroundColor: COLORS.colorBackground,
        shadowColor: 'rgba(0, 0, 0, 0.4)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        elevation: 5,
        shadowRadius: 7,
        borderRadius: 8,
        marginRight: 15,
        marginLeft: 2,
        //alignItems: 'center',
        marginBottom: 14,
        width: width * 0.88,
        // height: width * 0.57
    },
    owner: {
        color: '#808080',
        fontFamily: FONTS.FontRegular,
        fontSize: 12
    },
    NameStyle: {
        color: '#1A051D',
        fontSize: 12,
        fontFamily: FONTS.FontSemiB
    }







})