
import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Image,
    Dimensions,
    StyleSheet,
    Text,
    FlatList,
    Keyboard,
    TouchableWithoutFeedback,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    ToastAndroid,
    Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'
import { COLORS, FONTS } from '../../../Constants/Constants';
const { height, width } = Dimensions.get('screen');
import TextInputBox from './TextInput';
import Image1 from '../assets/Vector.svg';
import { useTranslation } from 'react-i18next';
import LeadModal from './LeadModal';
import ValidModal from './ValidModal';
import { api } from '../../../Services/Api'
import AsyncStorage from '@react-native-async-storage/async-storage';
import VillageModal from './VillageModal';


const NewLead1 = ({ navigation, setVillageStatus, VillageStatus }) => {
    const { t } = useTranslation();
    const [Name, setName] = useState('')
    const [Mobile, setMobile] = useState('')
    const [Pincode, setPincode] = useState('')
    const [Village, setVillage] = useState('')
    //const [BStatus, setBstatus] = useState(false)
    const [Button, setButton] = useState(false)
    const [ModalVisible, setModalVisible] = useState(false)
    const [VStatus, setVStatus] = useState(false)
    const [ValidModal1, setValidModal1] = useState(false)
    const [Message, setMessage] = useState('')
    const [ResultError, setResultError] = useState(false)
    const [VillageEnable, setVillageEnable] = useState(false)
    const [vilageList, setVillageList] = useState([])
    const [isFocused, setIsFocused] = useState(false);
    const [addressFocus, setAddressFocus] = useState(false);
    const [addressFocus1, setAddressFocus1] = useState(false);
    const [customerNumber, setCustomerNumber] = useState('');
    const [ModalVillage, setModalVillage] = useState(false)
    const adddressRef = useRef();
    const MobileRef = useRef();
    const [error, setError] = useState({
        Name: true,
        Mobile: true,
        Pincode: true,
        Village: true,
    })

    useEffect(() => {
        if (VillageStatus == true) {
            setVillageStatus(false)
        }
    }, [])

    const OnpressOut1 = () => {

        setModalVisible(!ModalVisible)
        setName(null)
        setVillage(null)
        setMobile(null)
        setPincode(null)
        setVillageStatus(false)
        // setBstatus(false)
        setButton(false)
        setVStatus(false)
        navigation.navigate('Profile')
        console.log("lead modal okay", Name, Mobile, Pincode, Village)
    }

    const OnchangeNumber = (num) => {
        if (/^[^!-\/:-@\.,[-`{-~ ]+$/.test(num) || num === '') {
            setMobile(num)

        } else {
            ToastAndroid.show(t('common:Valid'), ToastAndroid.SHORT);
        }
    }

    const getData = async () => {
        try {
            const mob = await AsyncStorage.getItem('Mobile')
            const mob1 = mob.slice(3)
            setCustomerNumber(mob1)
            console.log('phoe', mob1)

        } catch (e) {
            console.log('mob', e)
        }
    }


    useEffect(() => {

        getData();


        /// getSpousedetail()
    }, []);
    async function getVillage(text) {
        const data = {
            "pin": Pincode,
            "villageName": text,
        }
        await api.getNewLeadVillage(data).then((res) => {
            console.log('-------------------res', res?.data?.body)
            setVillageList(res?.data?.body)
            setVillageStatus(true)
            //setModalVillage(true)
            setVillageList(res?.data?.body)
            //setBstatus(true)
        })
            .catch((err) => {
                console.log('-------------------err', err?.response)
            })
    }
    const Validation = () => {
        console.log('££££233', Mobile)
        const firstDigitStr = String(Mobile)[0];
        if (Mobile?.length != 10 || Mobile == "") {
            setMessage('Please enter a valid mobile number')
            setValidModal1(true)
        } else if (firstDigitStr === '1' || firstDigitStr === '2' || firstDigitStr === '3' || firstDigitStr === '4' || firstDigitStr === '5' || firstDigitStr === '0') {
            setMessage('Please enter a valid mobile number')
            setValidModal1(true)
        } else if (verifyPhone(Mobile)) {
            setMessage('Please enter a valid mobile number')
            setValidModal1(true)
        } else if (!(/^\d{10}$/.test(Mobile))) {
            setMessage('Please enter a valid mobile number')
            setValidModal1(true)
        }
        else if (Mobile === customerNumber) {
            setMessage('Please enter a valid mobile number')
            setValidModal1(true)
        }
        else {
            onSubmit()
        }
    }
    async function onSubmit() {
        //    MobileRef.blur();
        //    adddressRef.blur();
        setResultError(true)
        const data = {
            "leadName": Name,
            "mobileNumber": "+91" + Mobile,
            "pin": Pincode,
            "village": Village
        }
        await api.createLead(data).then((res) => {
            if (res?.status == 200) {
                if (res?.data?.body == 'This number is already registered') {
                    setMessage('The number is already registered')
                    setValidModal1(true)
                }
                else if (res?.data?.body == 'Lead generated') {
                    setModalVisible(true)
                    setIsFocused(false)

                }
            }
            console.log('-------------------res', res)
        })
            .catch((err) => {
                console.log('-------------------err', err?.response)
            })
    }

    const verifyPhone = (Phone) => {
        var reg = /^([0-9])\1{9}$/;
        return reg.test(Phone);
    }

    function containsWhitespace(str) {
        return /\s/.test(str);
    }




    return (
        <>
            <View style={styles.ViewContent}>

                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    style={{ flex: 1, backgroundColor: 'white' }}>
                    <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps ={'always'}  keyboardDismissMode={'on-drag'} >

                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>


                            <TextInputBox
                                returnKeyType="next"
                                ref={adddressRef}
                                //pointerEvents="none"
                                name={t('common:Name')}
                                value={Name}
                                color={"#1A051D"}
                                maxLength={40}
                                keyboardType1={'email-address'}
                                onFocus={() => setAddressFocus(true)}
                                onBlur={() => setAddressFocus(false)}

                                onSubmitEditing={() => MobileRef.current.focus()}
                                // edit={AccStatus}
                                onChangeText={(text) => {
                                    const firstDigitStr = String(text)[0];
                                    if (firstDigitStr == ' ') {
                                        containsWhitespace(text)
                                        // 👇️ this runs
                                        setName('')
                                        ToastAndroid.show("Please enter a valid name ", ToastAndroid.SHORT);
                                        console.log('The string contains whitespace', Name);
                                    }
                                    else if (/^[^!-\/:-@\.,[-`{-~1234567890₹~`|•√π÷×¶∆€¥$¢^°={}%©®™✓]+$/.test(text) || text === '') {
                                        setName(text)
                                        console.log("verify daat1")
                                    }


                                }}
                            />



                            <TextInputBox
                                ref={MobileRef}
                                name={t('common:SmartPhone')}
                                value={Mobile}
                                keyboardType1={'numeric'}
                                color={"#1A051D"}
                                maxLength={10}
                                onChangeText={(text) => {
                                    OnchangeNumber(text)
                                }}
                                onBlur={() => true}
                            />

                            <TextInputBox
                                name={t('common:Pincode')}
                                value={Pincode}
                                keyboardType1={'numeric'}
                                color={"#1A051D"}
                                maxLength={6}
                                onChangeText={(text) => {
                                    setVillage(null)
                                    setVStatus(false)
                                    console.log("village......", Village)
                                    // setPincode(text)

                                    if (/^[^!-\/:-@\.,[-`{-~ ]+$/.test(text) || text === '') {
                                        setPincode(text)
                                        console.log("pincode", text)
                                        setPincode(text)

                                        if (text?.length === 6) {
                                            setVStatus(true)
                                        }
                                    }
                                    //      else if(text?.length==6){
                                    //         setPincode(text)
                                    //         setVStatus(true)
                                    //    }
                                    else {
                                        ToastAndroid.show('Please enter a valid pincode', ToastAndroid.SHORT);
                                    }
                                }}
                            />
                        </View>

                        {VStatus &&
                            <View style={{ paddingTop: width * 0.05, }}>
                                <Text style={styles.TextName}>{t('common:Village')}</Text>

                                <View style={{ alignItems: 'center' }}>
                                    <View style={[styles.textInput1, { flexDirection: 'row', alignItems: 'center', }]} >

                                        <Image1 />
                                        <TextInput
                                            value={Village}
                                            keyboardType1={'email-address'}
                                            style={styles.TextInputBranch}
                                            onChangeText={(text) => {

                                                setVillageEnable(false)
                                                if (text == '') {
                                                    console.log(" if ", Village)
                                                    setVillageList([])
                                                    setVillageStatus(false)
                                                    setVillage(text)
                                                    setButton(false)
                                                    
                                                }
                                                else 
                                                if (!(/^[^!-\/:-@\.,[-`{-~1234567890₹~`|•√π÷×¶∆€¥$¢^°={}%©®™✓]+$/.test(text))) {
                                                    setVillageList([])
                                                    setVillageStatus(false)
                                                    setVillage('')
                                                    // setBstatus(false)
                                                    setButton(false)
                                                    console.log("else if ", Village,text)
                                                } else {
                                                    setVillage(text)
                                                    getVillage(text)
                                                }
                                            }} />
                                    </View>
                                    {VillageStatus &&
                                        <View>
                                            {vilageList?.length > 0
                                                ? <View style={{ alignItems: 'center' }}>
                                                    <View style={styles.ViewMapBranch1}>
                                                        {vilageList?.map((item, index) => {
                                                            return (

                                                                <TouchableOpacity onPress={() => {
                                                                    setVillage(item)
                                                                    setVillageEnable(true)
                                                                    setButton(true)
                                                                    setVillageList([])
                                                                    setVillageStatus(false)

                                                                    // setBstatus(false)
                                                                }}>
                                                                    <View style={{}}>

                                                                        <Text style={[styles.ItemNameBranch, { marginTop: 10, marginBottom: 10 }]}>{item}</Text>
                                                                        {vilageList?.length - 1 !== index ?
                                                                            <View style={styles.Line} /> : null}
                                                                    </View>
                                                                </TouchableOpacity>

                                                            )
                                                        })}
                                                    </View>
                                                </View>
                                                : null}
                                        </View>}
                                    {VillageStatus &&
                                        <View>
                                            {vilageList?.length == 0 && VillageStatus ? <View style={[styles.ViewMapBranch, { height: width * 0.15, }]}>
                                                <View style={{ paddingTop: width * 0.05 }}>

                                                    <Text style={styles.ItemNameBranch}>No results found</Text>

                                                </View>
                                            </View> : null}
                                        </View>}
                                </View>
                            </View>}

                    </ScrollView>
                </KeyboardAvoidingView>


                <TouchableOpacity
                    style={[styles.Button1, { backgroundColor: Button && Name?.length >= 3 && Mobile?.length === 10 && Pincode?.length === 6 && VillageEnable && Village ? COLORS.colorB : '#ECEBED' }]}
                    disabled={Button && Name?.length >= 3 && Mobile?.length === 10 && Pincode?.length === 6 && VillageEnable && Village ? false : true}
                    onPress={() => Validation()}>
                    <Text style={[styles.text1, { color: Button && Name?.length >= 3 && Mobile?.length === 10 && Pincode?.length === 6 && VillageEnable && Village ? COLORS.colorBackground : '#979C9E' }]}>{t('common:Confirm')}</Text>
                </TouchableOpacity>

                <LeadModal ModalVisible={ModalVisible}
                    onPress={() => OnpressOut1()}
                    onPressOut={() => {
                        setModalVisible(!ModalVisible)
                        navigation.navigate('Profile')
                    }}
                    navigation={navigation}
                    setModalVisible={setModalVisible} />

                <ValidModal
                    Validation={Message}
                    ModalVisible={ValidModal1}
                    //  villageList={vilageList}
                    onPressOut={() => setValidModal1(!ValidModal1)}
                    setModalVisible={setValidModal1}
                />


                <VillageModal
                    ModalVisible={ModalVillage}
                    onPressOut={() => setModalVillage(!VillageModal)}
                    setModalVisible={setModalVillage}
                    vilageLists={vilageList}
                    setVillage={setVillage}
                    setVillageEnable={setVillageEnable}
                    setButton={setButton}
                    setVillageList={setVillageList}
                    setVillageStatus={setVillageStatus}

                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    ViewIFSC: {
        justifyContent: 'center',
        paddingLeft: width * 0.03,
        paddingTop: width * 0.05
    },
    ViewVerify: {
        alignItems: 'center',
        justifyContent: 'center',
        left: 0,
        right: 0,
        bottom: 0,

    },
    TextName: {
        fontFamily: FONTS.FontRegular,
        fontSize: 12,
        color: 'rgba(59, 61, 67, 1)',
        paddingBottom: width * 0.02,
        paddingLeft: 6
    },
    textInput: {
        width: width * 0.9,
        height: width * 0.15,
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(236, 235, 237, 1)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: width * 0.02,
        paddingLeft: width * 0.025
    },
    FindText: {
        fontSize: 12,
        color: COLORS.colorB,
        fontFamily: FONTS.FontSemiB,
        paddingRight: width * 0.01
    },
    ifsc: {
        color: "#1A051D",
        fontFamily: FONTS.FontRegular,
        fontSize: 15
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
        marginBottom: 20
    },
    text1: {
        fontFamily: FONTS.FontBold,
        fontSize: 14,
        fontWeight: '700'
    },
    textInput1: {
        width: width * 0.9,
        height: width * 0.14,
        backgroundColor: '#FCFCFC',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(236, 235, 237, 1)',
        color: "#1A051D",
        fontFamily: FONTS.FontRegular,
        fontSize: 15,
        paddingLeft: width * 0.025,
        alignItems: 'center'
    },
    Line: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(242, 242, 242, 1)',
        width: width * 0.85,
        // paddingTop: width * 0.035
    },
    TextInputBranch: {
        color: "#1A051D",
        fontSize: 12,
        width: width * 0.5,
        fontFamily: FONTS.FontRegular,
        paddingLeft: width * 0.02,
        width: width * 0.78,


    },
    ViewMapBranch: {
        width: width * 0.9,
        height: width * 0.28,
        borderWidth: 1,
        paddingLeft: width * 0.02,
        borderColor: 'rgba(236, 235, 237, 1)',
        borderRadius: 8,
        marginTop: width * 0.025,
        backgroundColor: '#FCFCFC'
    },
    ViewMapBranch1: {
        width: width * 0.9,
        // height: height * 0.16,
        borderWidth: 1,
        paddingLeft: width * 0.02,
        borderColor: 'rgba(236, 235, 237, 1)',
        borderRadius: 8,
        marginTop: width * 0.025,
        backgroundColor: '#FCFCFC',
        alignSelf: 'flex-start'
    },
    ItemNameBranch: {
        paddingLeft: width * 0.02,
        color: "#1A051D",
        fontSize: 12,
        fontFamily: FONTS.FontRegular
    },

})

export default NewLead1;