import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    Image,
    Pressable,
    ToastAndroid
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';

// ------------- Component Imports -------------------------
import Icon1 from 'react-native-vector-icons/Entypo'
import Icon2 from 'react-native-vector-icons/Entypo';
import Media from '../../../assets/image/media.svg';
import Media1 from '../../../assets/image/Media2.svg';
import { FONTS, COLORS } from '../../../Constants/Constants';
import OwnerModal from './OwnerModal';
import RelationModal from './RelationModal';
import ImagePicker from 'react-native-image-crop-picker';
import Image2 from '../../../assets/Images/cakes.svg';
import { api } from '../../../Services/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CorrectionModal from './CorrectionModal';
import Image1s from '../../../assets/Images/cakes.svg';

const { height, width } = Dimensions.get('screen');

const DetailChecks = ({ navigation, setState, proofType1,
    imageUrl1, relation1, relative1, isCheck, Correction,activityIds }) => {

        
    const activityId = useSelector(state => state.activityId);

    const [ModalVisible, setModalVisible] = useState(false)
    const [ModalVisible1, setModalVisible1] = useState(false)
    const [Purpose, setPurpose] = useState(null)
    const [Purposes, setPurposes] = useState(null)
    const [imageStatus, setImageStatus] = useState(false)
    const [Relation, setRelation] = useState('')
    const [Image1, setImage] = useState(null)
    const [Correct1, setCorrect1] = useState(Correction)
    const [UploadStatus, setUploadStatus] = useState(false)
    const [NameStatus, setNamestatus] = useState(false)
    const [spousedetail, setSpousedetail] = useState('')
    const [ownersName, setOwnersName] = useState('')
    const [error, setError] = useState('')
    const [emoji, setEmoji] = useState(false)
    const [ModalVisibleC, setModalVisibleC] = useState(false)
    const isLastPage = useSelector(state => state.isLastPage);
    const [id,setId] = useState(activityIds)
    const [CorrectionStatus, setCorrectionStatus] = useState(isCheck)
    const [CustomerDetail, setCustomerDetail] = useState([])

    useEffect(() => {
        console.log("activity id from correction",activityIds,id)
        if (!Correct1) {
            getResidenceowner()
            getCustomerdetail()
        }

    }, [])

    useEffect(() => {

        AsyncStorage.getItem("CorrectionStatus").then((value) => {
            if (!value) {
                //  getResidenceowner()
            }
        })
    }, [])

    useEffect(() => {
        setState(Purpose)
        setPurpose(Purpose)
        proofType1(Purpose)
        setPurposes(Purposes)
        relation1(Purposes)
        setRelation(Relation)
    }, [Purpose, Relation])

    // -------------------------------- spouse detail -----------------------------------------
    const getSpousedetail = async () => {
        const data = {
            "activityId": activityId?activityId:id
        }
        await api.getSpousedetail(data).then((res) => {
            console.log('-------------------res spousedetail', res)
            if (res?.status) {
                setSpousedetail(res?.data?.body)
            }
        }).catch((err) => {
            setError(err?.response?.status)
            console.log('-------------------err spousedetail', err?.response?.status, activityId)
        })
    };
    // ----------------------------------  end  ---------------------------------------------------

    // -------------------------- get residence owner detail ------------------------------

    const getResidenceowner = async () => {
        const data = {
            "activityId": activityId
           
        }
        await api.getResidenceowner(data).then((res) => {
            console.log('-------------------res Residence owner', res?.data?.body)
            if (res?.status) {
                setPurposes(res?.data?.body?.relationShipWithCustomer)
                setPurpose(res?.data?.body?.ownerShipProofType)
                setImage(res?.data?.body?.imageUrl)
                if (res?.data?.body?.relationShipWithCustomer != 'Spouse') {
                    setOwnersName(res?.data?.body?.ownersName)
                    relative1(res?.data?.body?.ownersName)
                }
                if (res?.data?.body?.ownerShipProofType && res?.data?.body?.imageUrl !== null) {
                    setImageStatus(true)
                    setUploadStatus(false)
                }
                getSpousedetail()
            }
        }).catch((err) => {
            console.log('-------------------err Residence Owner', err?.response)
        })
    };
    // ---------------------------------- End ------------------------------------------------

    // ------------------save and update residence owner detail ------------------
    const UpdateResidenceowner = async () => {
        const data = {
             "activityId": activityId?activityId:id,
            "ownerShipProofType": Purpose,
            "imageUrl": Image1,
            "relationShipWithCustomer": Purposes,
            "ownersName": ownersName ? ownersName : spousedetail?.name
        }
        console.log("data", data)
        await api.UpdateResidenceowner(data).then((res) => {
            console.log('-------------------res  update Residence owner', isCheck)
            if (isCheck) {
                setModalVisibleC(true)
                console.log("sauccess")
            } else {
                getLastPage()
            }
        }).catch((err) => {
            console.log('-------------------err  update Residence Owner', err?.response)
        })
    };
    // ------------------------------------------ End ---------------------------------------

    const UploadImage = () => {
        //Choose Image from gallery
        ImagePicker.openCamera({
            width: width * 1.2,
            height: height*0.7,
            hideBottomControls: true,
            cropping: true,
           // useFrontCamera:false
        }).then(image => {
            console.log("IMAGE", image.path);
            setImage(image.path)
            setUploadStatus(false)
            setImageStatus(true)
            uploadFile(image.path, image)
        });
    }

    async function uploadFile(imagevalue, image) {
        let data = new FormData();
        data.append('multipartFile', {
            name: 'aaa.jpg',
            type: image.mime,
            uri: imagevalue
        })

        await api.uploadFile(data).then((res) => {
            console.log('-------------------res file upload', res?.data[0]?.body)
            if (res?.status) {
                setImage(res?.data[0]?.body)
                imageUrl1(res?.data[0]?.body)
            }
        }).catch((err) => {
            console.log('-------------------err file upload', err)
        })
    };
    // ------------------ HomeScreen Api Call End ------------------

    function containsWhitespace(str) {
        return /\s/.test(str);
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

    function hasEmoji(text) {
        console.log("text has emogi")
        const emojiRegex = /[\u{1F000}-\u{1FFFF}\u{200D}\u{FE0F}]/u; // Emoji regular expression pattern
        if (emojiRegex.test(text)) {
            setEmoji(true)
            console.log("text true", text)
            setOwnersName('')

        } else {
            console.log("text false", text)
        }
    }
    // useEffect(() => {
    //     console.log("emoji pass", emoji)
    //     if (emoji) {
    //         setOwnersName('')
    //     }
    // })


    const removeEmojis = (string) => {
        // emoji regex from the emoji-regex library
        const regex = /\uD83C\uDFF4(?:\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74)\uDB40\uDC7F|\u200D\u2620\uFE0F)|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC68(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3]))|\uD83D\uDC69\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\uD83D\uDC68(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)\uFE0F|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDD6-\uDDDD])(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\uD83D\uDC69\u200D[\u2695\u2696\u2708])\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC68(?:\u200D(?:(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D[\uDC66\uDC67])|\uD83C[\uDFFB-\uDFFF])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF4\uD83C\uDDF2|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDB5\uDDB6\uDDD1-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDEEB\uDEEC\uDEF4-\uDEF9]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD70\uDD73-\uDD76\uDD7A\uDD7C-\uDDA2\uDDB0-\uDDB9\uDDC0-\uDDC2\uDDD0-\uDDFF])|(?:[#*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEF9]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD70\uDD73-\uDD76\uDD7A\uDD7C-\uDDA2\uDDB0-\uDDB9\uDDC0-\uDDC2\uDDD0-\uDDFF])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC69\uDC6E\uDC70-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD26\uDD30-\uDD39\uDD3D\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDD1-\uDDDD])/g

        return string?.replace(regex, '')
    }
    useEffect(() => {

        AsyncStorage.getItem("CorrectionStatus").then((value) => {
            setCorrectionStatus(value)
        })
    }, [])

    const getLastPage = async () => {
        console.log("LASTPAGE", activityId)
        const data = {
            "activityId": activityId?activityId:id
        }
        await api.getLastPage(data).then((res) => {
            console.log("last page upadte", res?.data, res?.data?.body?.nextPage, CorrectionStatus)

            if (res?.data?.body?.isLasCorrectin == false && res?.data?.body?.nextPage == 2) {

                navigation.navigate('ContinuingGuarantor', { isCheck: res?.data?.body?.isLasCorrectin, Correction: Correct1 })
            }
            else
                if (res?.data?.body?.isLasCorrectin == false && res?.data?.body?.nextPage == 6) {
                    navigation.navigate('EnergyUtility', { isCheck: res?.data?.body?.isLasCorrectin, Correction: Correct1 })
                } else if (res?.data?.body?.isLasCorrectin == false && res?.data?.body?.nextPage == 3) {
                    navigation.navigate('ContinuingGuarantor', { isCheck: res?.data?.body?.isLasCorrectin, Correction: Correct1 })
                } else if (res?.data?.body?.isLasCorrectin == true && res?.data?.body?.nextPage == 3) {
                    navigation.navigate('ContinuingGuarantor', { isCheck: res?.data?.body?.isLasCorrectin, Correction: Correct1 })
                }
                else if (res?.data?.body?.isLasCorrectin == false && res?.data?.body?.nextPage == 7) {
                    navigation.navigate('IncomeDetails', { isCheck: res?.data?.body?.isLasCorrectin, Correction: Correct1 })
                } else if (res?.data?.body?.isLasCorrectin == false && res?.data?.body?.nextPage == 8) {
                    navigation.navigate('IncomeDetailsSpouse', { isCheck: res?.data?.body?.isLasCorrectin, Correction: Correct1 })
                }
                else if (res?.data?.body?.isLasCorrectin == true && res?.data?.body?.nextPage == 2) {
                    if (Purposes == 'Spouse') {
                        navigation.navigate('ContinuingGuarantor', { relation: 'Spouse', isCheck: res?.data?.body?.isLasCorrectin, Correction: Correct1 })
                    } else {
                        navigation.navigate('ContinuingGuarantor', { relation: 'other', isCheck: res?.data?.body?.isLasCorrectin, Correction: Correct1 })
                    }

                } else if (res?.data?.body?.isLasCorrectin == true && res?.data?.body?.nextPage == 6) {
                    navigation.navigate('EnergyUtility', { isCheck: res?.data?.body?.isLasCorrectin, Correction: Correct1 })
                } else if (res?.data?.body?.isLasCorrectin == true && res?.data?.body?.nextPage == 7) {
                    navigation.navigate('IncomeDetails', { isCheck: res?.data?.body?.isLasCorrectin, Correction: Correct1 })
                } else if (res?.data?.body?.isLasCorrectin == true && res?.data?.body?.nextPage == 8) {
                    navigation.navigate('IncomeDetailsSpouse', { isCheck: res?.data?.body?.isLasCorrectin, Correction: Correct1 })
                }

        }).catch((err) => {
            console.log('-------------------err spousedetail1', err?.response)

        })
    };


    const getDLEConfirmation = async () => {
        const data = {
             "activityId": activityId?activityId:id
           
        }
        await api.getCorrectionNotify(data).then((res) => {

            if (res?.status) {
                setModalVisibleC(false)
                AsyncStorage.removeItem('CorrectionStatus')
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Proceed' }],
                })
            }

        }).catch((err) => {
            console.log('-------------------err spousedetail1', err?.response)

        })
    };

    const getCustomerdetail = async () => {
        console.log('api called customer',activityId,id)

        const data = {
             "activityId": activityId?activityId:id
          
        }
        await api.getCustomerdetail(data).then((res) => {
            console.log('-------------------res customerdetail', res.data.body)
            if (res?.status) {
                setCustomerDetail(res.data.body)
                //setSpousedetail(res?.data?.body)
            }
        }).catch((err) => {
            console.log('-------------------err customerdetail', err?.response)
        })
    };


    return (


        <View style={styles.mainContainer}>

            <>
                <ScrollView>
                    <View>
                        <Text style={styles.proof}>Ownership proof type</Text>
                    </View>

                    <TouchableOpacity style={styles.SelectBox} onPress={() => setModalVisible(true)}>
                        {Purpose == 'ELECTRICITY_BILL' ?
                            <Text style={[styles.textSelect, { color: '#1A051D', marginLeft: 8 }]}>Electricity Bill</Text> :
                            Purpose == 'WATER_BILL' ?
                                <Text style={[styles.textSelect, { color: '#1A051D', marginLeft: 8 }]}>Water Bill</Text> :
                                Purpose == 'BUILDING_TAX_RECEIPT' ?
                                    <Text style={[styles.textSelect, { color: '#1A051D', marginLeft: 8 }]}>Building Tax Receipt</Text> :

                                    <Text style={[styles.textSelect, { color: 'rgba(128, 128, 128, 1)', marginLeft: 8 }]}>Select</Text>}

                        <Icon1 name="chevron-down" size={18} color={'#808080'} style={{ marginRight: 10 }} />
                    </TouchableOpacity>

                    <Pressable style={[styles.UploadCard, { opacity: Purpose ? 4 : 0.3 }]} onPress={() => { Purpose ? UploadImage() : null }} >
                        {!imageStatus ?
                            <View style={{ alignItems: 'flex-start', flex: 1, marginLeft: 25 }}>
                                <View >
                                    <Media1 width={30} height={30} />
                                </View>
                            </View>
                            : UploadStatus ?
                                <View style={{ alignItems: 'flex-start', flex: 1, marginLeft: 25 }}>
                                    <View >
                                        <Media width={30} height={30} />
                                    </View>
                                </View>
                                :
                                <View style={{ alignItems: 'flex-start', flex: 1, marginLeft: 10 }}>
                                    <Image source={{ uri: Image1 }}
                                        style={{ width: 55, height: 65, borderRadius: 6 }}
                                    />
                                </View>
                        }
                        <View style={[styles.Line, { borderColor: Purpose ? "#F2F2F2" : "grey" }]} />
                        <View style={{ flexDirection: 'column', left: -20 }}>
                            <Text style={[styles.UploadText, { color: NameStatus || Purpose ? '#1A051D' : '#808080' }]}>Take Photo</Text>
                            <Text style={[styles.Prooftext]}>Proof of ownership</Text>
                        </View>

                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Icon2 name="chevron-right" size={18} color={'#808080'} style={{ marginRight: 15 }} />
                        </View>
                    </Pressable>
                    <View>
                        <Text style={styles.proof}>Relationship with Customer</Text>
                    </View>
                    <TouchableOpacity style={styles.SelectBox} onPress={() => { setModalVisible1(true), getSpousedetail(), setOwnersName(null),getCustomerdetail() }} >
                        {Purposes === null ?
                            <Text style={[styles.textSelect, { color: 'rgba(128, 128, 128, 1)', }]}>Select</Text>
                            :
                            <Text style={[styles.textSelect, { color: '#1A051D', marginLeft: 8 }]}>{Purposes}</Text>
                        }
                        <Icon1 name="chevron-down" size={18} color={'#808080'} style={{ marginRight: 10 }} />
                    </TouchableOpacity>

                    {Purposes == 'Spouse' ?
                        <View style={styles.containerBox}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={styles.circleView}>
                                    <Text style={styles.shortText}>{getInitials(spousedetail?.name)}</Text>
                                </View>

                                <View style={{ flexDirection: 'column', flex: 1, marginLeft: 12, }}>

                                    <Text style={styles.nameText}>{spousedetail?.name}</Text>
                                    <Text style={[styles.underText, { textTransform: 'capitalize' }]}>{spousedetail?.occupation?.replace(/_/g, ' ')}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', }}>
                                    <Image2 width={11} height={11} top={3} />
                                    <Text style={styles.dateText}>{spousedetail?.dateOfBirth}</Text>
                                </View>
                            </View>
                        </View> :
                        Purposes !== 'Self' ?
                            <>
                                <View>
                                    <Text style={styles.proof}>Name</Text>
                                </View>
                                <View style={styles.SelectBox}>
                                    <TextInput
                                        value={removeEmojis(ownersName)}
                                        maxLength={30}
                                        keyboardType="email-address"
                                        style={styles.TextInputBranch}
                                        contextMenuHidden={true}
                                        onChangeText={(text) => {
                                            const firstDigitStr = String(text)[0];
                                            if (firstDigitStr == ' ') {
                                                containsWhitespace(text)
                                                // 👇️ this runs
                                                setOwnersName('')
                                                ToastAndroid.show("Please enter a valid name ", ToastAndroid.SHORT);
                                            }

                                            else if (/^[A-Za-z ]+$/.test(text) || text === '') {
                                                setOwnersName(text),
                                                    relative1(text)
                                            }
                                        }}
                                    />
                                </View>
                            </> : <View style={styles.containerBox}>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={[styles.circleView, { backgroundColor: 'rgba(206, 116, 143, 1)' }]}>
                                        <Text style={styles.shortText}>{getInitials(CustomerDetail?.name)}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'column', flex: 1, marginLeft: 12 }}>
                                        <Text style={styles.nameText}>{CustomerDetail?.name}</Text>


                                        <Text style={[styles.underText, { textTransform: 'capitalize' }]}>{CustomerDetail?.occupation?.replace(/_/g, ' ')}</Text>
                                    </View>


                                    <View style={{ flexDirection: 'row', }}>
                                        <Image1s width={11} height={11} top={3} />
                                        <Text style={styles.dateText}>{CustomerDetail?.dateOfBirth}</Text>
                                    </View>

                                </View>
                            </View>
                    }

                </ScrollView>

                <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>

                    <TouchableOpacity onPress={() => (Purpose && Purposes && (Purposes != 'Spouse' && Purposes != 'Self'  ? ownersName?.length > 2 : Purposes) && Image1) ? UpdateResidenceowner() : console.log("helo")}

                        style={[styles.Button1, { backgroundColor: (Purpose && Image1 && Purposes && (Purposes != 'Spouse'&& Purposes != 'Self'  ? ownersName?.length > 2 : Purposes)) ? COLORS.colorB : 'rgba(224, 224, 224, 1)' }]}
                    >
                        <Text style={[styles.text1, { color: (Purpose && Purposes && (Purposes != 'Spouse' && Purposes != 'Self'  ? ownersName?.length > 2 : Purposes) && Image1) ? COLORS.colorBackground : '#979C9E' }]}>{isCheck ? 'Submit' : 'Continue'}</Text>
                    </TouchableOpacity>
                </View>
            </>
            <OwnerModal
                visible={ModalVisible}
                setPurpose={setPurpose}
                setUploadStatus={setUploadStatus}
                setModalVisible={setModalVisible}
                setImageStatus={setImageStatus}
                setNamestatus={setNamestatus}
                setImage={setImage}
                onPressOut={() => setModalVisible(!ModalVisible)}
            />
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
            <RelationModal
                visible={ModalVisible1}
                setPurposes={setPurposes}
                setModalVisible={setModalVisible1}
                Error={error}
                onPressOut={() => setModalVisible1(!ModalVisible1)}
            />
        </View>
    )
}

export default DetailChecks;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    proof: {
        color: 'rgba(59, 61, 67, 1)',
        fontFamily: FONTS.FontRegular,
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
    textSelect: {
        fontSize: 14,
        color: 'rgba(128, 128, 128, 1)',
        fontFamily: FONTS.FontRegular,
        marginLeft: 10
    },
    Button1: {
        width: width * 0.87,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.colorB,
        marginTop: 31,
        marginLeft: 12,
        marginRight: 12,
        borderRadius: 40,
        marginBottom: 0
    },
    text1: {
        fontFamily: FONTS.FontBold,
        fontSize: 14,
        fontWeight: '700'
    },
    UploadCard: {
        width: width * 0.88,
        height: width * 0.22,
        marginLeft: 2,
        marginRight: 5,
        backgroundColor: '#FCFCFC',
        elevation: 1,
        shadowColor: '#000000',
        alignItems: 'center',
        borderRadius: 6,
        flexDirection: 'row',
        marginTop: width * 0.02,
        marginBottom: width * 0.05,
    },
    NAMEFont: {
        color: 'rgba(26, 5, 29, 1)',
        fontSize: 14,
        fontFamily: FONTS.FontSemiB
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
    subText: {
        fontSize: 12,
        fontFamily: FONTS.FontRegular,
        color: COLORS.colorDark,
        paddingTop: 3
    },
    UploadText: {
        fontSize: 14,
        fontFamily: FONTS.FontSemiB,
        color: '#1A051D',
    },
    Prooftext: {
        color: 'rgba(128, 128, 128, 1)',
        fontFamily: FONTS.FontRegular,
        fontSize: 12,
        marginLeft: 0
    },
    Line: {
        borderWidth: 0.3,
        height: 78,
        left: -38
    },
    cardView2: {
        backgroundColor: COLORS.colorBackground,
        width: width * 0.90,
        height: width * 0.2,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: width * 0.03,
        borderColor: 'rgba(236, 235, 237, 1)',
        flexDirection: 'row'
    },
    containerBox: {
        marginTop: 12,
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
        backgroundColor: '#CE748F',
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
    TextInputBranch: {
        color: "#1A051D",
        fontSize: 14,
        fontFamily: FONTS.FontRegular,
        paddingLeft: width * 0.02,
        width: width * 0.88,
        height: width * 0.11,
    },
})