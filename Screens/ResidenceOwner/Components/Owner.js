import {
    StyleSheet,
    Text,
    View,
    BackHandler,
    StatusBar,
    SafeAreaView,
    Platform,
    TextInput,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    Image,
    Pressable,
    ToastAndroid
} from 'react-native'
import React, { useCallback, useState, useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Statusbar from '../../../Components/StatusBar';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../../../Components/RepayHeader';
import { FONTS, COLORS } from '../../../Constants/Constants';
import { useDispatch } from 'react-redux';
import Icon1 from 'react-native-vector-icons/Entypo'
import Icon2 from 'react-native-vector-icons/Entypo';
import Search from 'react-native-vector-icons/Feather';
import Media from '../../../assets/image/media.svg';
import Media1 from '../../../assets/image/Media2.svg'
const { height, width } = Dimensions.get('screen');
import OwnerModal from './OwnerModal';
import RelationModal from './RelationModal';
import ImagePicker from 'react-native-image-crop-picker';
import Image2 from '../../../assets/Images/cakes.svg';
import { api } from '../../../Services/Api';
import { useSelector } from 'react-redux';


const DetailChecks = ({ navigation, setState, proofType1, imageUrl1, relation1, relative1 }) => {

    const isDarkMode = true;
    const [text, onChangeText] = useState('');
    const activityId = useSelector(state => state.activityId);
    const [ModalVisible, setModalVisible] = useState(false)
    const [ModalVisible1, setModalVisible1] = useState(false)
    const [selectedItem, setSelectedItem] = useState()
    const [ButtonStatus, setButtonStatus] = useState(false)
    const [ModalError, setModalError] = useState(false)
    const [ModalReason, setModalReason] = useState(false)
    const [checked, setChecked] = useState(false);
    const toggleCheckbox = () => setChecked(!checked);
    const [Purpose, setPurpose] = useState(null)
    const [Purposes, setPurposes] = useState(null)
    const [imageStatus, setImageStatus] = useState(false)
    const [Relation, setRelation] = useState('')
    const [Image1, setImage] = useState('')
    const [Imageurl, setImageurl] = useState('')
    const [status, setStatus] = useState(false)
    const [UploadStatus, setUploadStatus] = useState(false)
    const [NameStatus, setNamestatus] = useState(false)
    const [spousedetail, setSpousedetail] = useState('')
    const [ownersName, setOwnersName] = useState('')
    const [error, setError] = useState('')
    const [NameValid,setNameValid] = useState(false)
    const [ImagesFSet, setImagesFSet] = useState()
    const [ImagesBSet, setImagesBSet] = useState()

    useEffect(() => {

        getResidenceowner()
    }, [])


    useEffect(() => {

        console.log("purpose print....", Purposes)
        setState(Purpose)
        setPurpose(Purpose)
        proofType1(Purpose)
        setPurposes(Purposes)
        relation1(Purposes)
        setRelation(Relation)


        //setStatus(true)
    }, [Purpose, Relation])


    // ------------------spouse detail ------------------

    const getSpousedetail = async () => {
        console.log('api called', activityId)

        const data = {
            "activityId": activityId

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
    // ------------------ ------------------



    // ------------------get residence owner detail ------------------

    const getResidenceowner = async () => {
        console.log('api called')

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

                if (res?.data?.body?.ownerShipProofType) {
                    setImageStatus(true)
                    setUploadStatus(false)
                }
                getSpousedetail()
            }
        }).catch((err) => {
            console.log('-------------------err Residence Owner', err?.response)
        })
    };
    // ------------------ ------------------




    // ------------------save and update residence owner detail ------------------

    const UpdateResidenceowner = async () => {
        console.log('api called', activityId)

        const data = {
            "activityId": activityId,
            "ownerShipProofType": Purpose,
            "imageUrl": Image1,
            "relationShipWithCustomer": Purposes,
            "ownersName": ownersName ? ownersName : spousedetail?.name
        }
        await api.UpdateResidenceowner(data).then((res) => {
            console.log('-------------------res  update Residence owner', res)
            if (res?.status) {
                if (Purposes == 'Spouse') {
                    //navigation.navigate('ContinuingGuarantor') 
                    navigation.navigate('ContinuingGuarantor', { relation: 'Spouse' })

                } else {
                    navigation.navigate('ContinuingGuarantor', { relation: 'other' })
                    // navigation.navigate('ContinuingGuarantor')  

                }
            }
        }).catch((err) => {
            console.log('-------------------err  update Residence Owner', err?.response)
        })
    };
    // ------------------ ------------------

    const UploadImage = () => {

        //Choose Image from gallery
        ImagePicker.openPicker({
            //width: 300,
            // height: 200,
            cropping: true
        }).then(image => {
            console.log("IMAGE", image.path);
            setImage(image.path)
            setUploadStatus(false)
            uploadFile(image.path, image)
        });
    }


    async function uploadFile(imagevalue, image) {
        console.log('api called')
        let data = new FormData();
        data.append('multipartFile', {
            name: 'aaa.jpg',
            type: image.mime,
            uri: imagevalue
        })

        await api.uploadFile(data).then((res) => {
            console.log('-------------------res file upload', res?.data[0]?.body)
            if (res?.status) {
                setImageurl(res?.data[0]?.body)
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


    return (


        <View style={styles.mainContainer}>

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

                                <Text style={[styles.textSelect, { color: '#1A051D', marginLeft: 8 }]}>Select</Text>}

                    <Icon1 name="chevron-down" size={18} color={'#808080'} style={{ marginRight: 10 }} />
                </TouchableOpacity>

                <Pressable style={[styles.UploadCard, { opacity: Purpose ? 4 : 0.3 }]} onPress={() => { Purpose ? UploadImage() : null }} >
                    {console.log("Purpose print.....", Purpose)}

                    {!imageStatus ?
                        <View style={{ alignItems: 'flex-start', flex: 1, marginLeft: 25 }}>
                            <View >
                                <Media1 width={30} height={30} />
                            </View>
                        </View> : UploadStatus ?
                            <View style={{ alignItems: 'flex-start', flex: 1, marginLeft: 25 }}>
                                <View >
                                    <Media width={30} height={30} />
                                </View>
                            </View> : <View style={{ alignItems: 'flex-start', flex: 1, marginLeft: 10 }}>
                                <Image source={{ uri: Image1 }} style={{ width: 55, height: 65, borderRadius: 6 }} />
                            </View>}
                    <View style={[styles.Line, { borderColor: Purpose ? "#F2F2F2" : "grey" }]} />
                    <View style={{ flexDirection: 'column', left: -20 }}>
                        <Text style={[styles.UploadText, { color: NameStatus || Purpose ? '#1A051D' : '#808080' }]}>Upload photo</Text>
                        <Text style={[styles.Prooftext]}>Proof of ownership</Text>
                    </View>

                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Icon2 name="chevron-right" size={18} color={'#808080'} style={{ marginRight: 15 }} />
                    </View>
                </Pressable>
                <View>
                    <Text style={styles.proof}>Relationship with Customer</Text>
                </View>
                <TouchableOpacity style={styles.SelectBox} onPress={() => { setModalVisible1(true), getSpousedetail() }} >
                    {Purposes === null ? <Text style={styles.textSelect}>Select</Text> :
                        <Text style={[styles.textSelect, { color: '#1A051D', marginLeft: 8 }]}>{Purposes}</Text>}
                    <Icon1 name="chevron-down" size={18} color={'#808080'} style={{ marginRight: 10 }} />
                </TouchableOpacity>


                {Purposes == 'Spouse' ?
                    <View style={styles.containerBox}>
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
                            <View style={{ flexDirection: 'row', }}>
                                <Image2 width={11} height={11} top={3} />
                                <Text style={styles.dateText}>{spousedetail?.dateOfBirth}</Text>
                            </View>
                        </View>
                    </View> :
                    Purposes ?
                        <>
                            <View>
                                <Text style={styles.proof}>Name</Text>
                            </View>
                            <View style={styles.SelectBox}>
                                <TextInput
                                    value={ownersName}
                                    maxLength={30}
                                    style={styles.TextInputBranch}
                                    onChangeText={(text) => {
                                        setNameValid(false)
                                        const firstDigitStr = String(text)[0];
                                        if (firstDigitStr == ' ') {
                                            containsWhitespace(text)
                                            // 👇️ this runs
                                            setOwnersName('')
                                            ToastAndroid.show("Please enter a valid name ", ToastAndroid.SHORT);
                                           
                                        }
                                        
                                       else  if (/^[^!-\/:-@\.,[-`{-~1234567890₹~`|•√π÷×¶∆€¥$¢^°={}%©®™✓]+$/.test(text) || text === '') {
                                            setOwnersName(text),
                                             relative1(text)
                                        }
                                    }}
                                // onFocus={() => setPstatus(false)}
                                // onKeyPress={() => setPstatus(false)}

                                />
                            </View>
                        </> : null

                }

            </ScrollView>

            <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => (Purpose && Purposes == 'Spouse' ? Purposes : ownersName?.length>2 && Image1) ? UpdateResidenceowner() : console.log("helo")}
                    style={[styles.Button1, { backgroundColor: (Purpose && Purposes == 'Spouse' ? Purposes : ownersName?.length>2 && Image1 ) ? COLORS.colorB : 'rgba(224, 224, 224, 1)' }]}
                >
                    <Text style={[styles.text1, { color: (Purpose && Purposes == 'Spouse' ? Purposes : ownersName?.length>2 && Image1 ) ? COLORS.colorBackground : '#979C9E' }]}>Continue</Text>
                </TouchableOpacity>
            </View>
            <OwnerModal
                visible={ModalVisible}
                setPurpose={setPurpose}
                setUploadStatus={setUploadStatus}
                setModalVisible={setModalVisible}
                setImageStatus={setImageStatus}
                setNamestatus={setNamestatus}
                onPressOut={() => setModalVisible(!ModalVisible)}
            // navigation={navigation}

            />
            <RelationModal
                visible={ModalVisible1}
                setRelation={setRelation}
                setPurposes={setPurposes}
                setModalVisible={setModalVisible1}
                setStatus={setStatus}
                Error={error}
                onPressOut={() => setModalVisible1(!ModalVisible1)}
            // navigation={navigation}

            />
        </View>




    )
}

export default DetailChecks;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
        // justifyContent:'center',
        //  alignItems:'center'
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
        //backgroundColor: 'pink',
        elevation: 1,
        shadowColor: '#000000',
        alignItems: 'center',
        //justifyContent:'space-around',
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
        // borderColor: '#F2F2F2',
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