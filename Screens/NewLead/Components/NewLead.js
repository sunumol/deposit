
import React, { useEffect, useState } from 'react';
import {
    View,
    Image,
    Dimensions,
    StyleSheet,
    Text,
    FlatList,
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

const NewLead1 = ({ navigation }) => {
    const { t } = useTranslation();
    const [Name, setName] = useState('')
    const [Mobile, setMobile] = useState('')
    const [Pincode, setPincode] = useState('')
    const [Village, setVillage] = useState('')
    const [BStatus, setBstatus] = useState(false)
    const [Button, setButton] = useState(false)
    const [ModalVisible, setModalVisible] = useState(false)
    const [VStatus, setVStatus] = useState(false)
    const [ValidModal1, setValidModal1] = useState(false)
    const [ResultError, setResultError] = useState(false)

    const [vilageList, setVillageList] = useState([])

    const [error, setError] = useState({
        Name: true,
        Mobile: true,
        Pincode: true,
        Village: true,
    })

    const onChangeVillage = (text) => {
        setVillage(text)
        if (text == 'Kakkanad') {
            setBstatus(true)
            setVillage(text)
            setResultError(false)
        } else {
            setResultError(true)
        }

    }

    const OnpressOut1 = () => {
        console.log("lead modal okay")
        setModalVisible(!ModalVisible)
        setName(null)
        setVillage(null)
        setMobile(null)
        setPincode(null)
        setBstatus(false)
        setButton(false)
        setVStatus(false)

    }

    const OnchangeNumber = (num) => {
        if (/^[^!-\/:-@\.,[-`{-~ ]+$/.test(num) || num === '') {
            setMobile(num)

        } else {
            ToastAndroid.show(t('common:Valid'), ToastAndroid.SHORT);
        }
    }


    async function getVillage(text) {
        const data = {
            "pin": Pincode,
            "villageName": text,
        }
        await api.getNewLeadVillage(data).then((res) => {
            console.log('-------------------res', res?.data?.body)
            setVillageList(res?.data?.body)
            setBstatus(true)
        })
            .catch((err) => {
                console.log('-------------------err', err?.response)
            })
    }

    async function onSubmit() {
        const data = {
            "leadName": Name,
            "mobileNumber": Mobile,
            "pin": Pincode,
            "village": Village
        }
        await api.createLead(data).then((res) => {
            if (res?.status == 200) {
                if (res?.data?.body == 'This number is already registered') {
                    setValidModal1(true)
                }
                else if (res?.data?.body == 'Lead generated') {
                    setModalVisible(true)
                }
            }
            console.log('-------------------res', res)
        })
            .catch((err) => {
                console.log('-------------------err', err?.response)
            })
    }


    return (
        <>


            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : null}
                style={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }} >


                        <TextInputBox
                            //pointerEvents="none"
                            name={t('common:Name')}
                            value={Name}
                            color={"#1A051D"}

                            // edit={AccStatus}
                            onChangeText={(text) => {
                                if (/^[^!-\/:-@\.,[-`{-~ ]+$/.test(text) || text === '') {
                                    setName(text)
                        
                                } else {
                                    ToastAndroid.show(t('common:Valid'), ToastAndroid.SHORT);
                                }
                                
                            }}
                        />



                        <TextInputBox
                            name={t('common:SmartPhone')}
                            value={Mobile}
                            keyboardType1={'numeric'}
                            color={"#1A051D"}
                            maxLength={10}
                            onChangeText={(text) => {
                                OnchangeNumber(text)
                            }}
                        />

                        <TextInputBox
                            name={t('common:Pincode')}
                            value={Pincode}
                            keyboardType1={'numeric'}
                            color={"#1A051D"}
                            maxLength={6}
                            onChangeText={(text) => {
                               // setPincode(text)
                                if(text.length==6){
                                    setPincode(text)
                                    setVStatus(true)
                               }
                                else if (/^[^!-\/:-@\.,[-`{-~ ]+$/.test(text) || text === '') {
                                    setPincode(text)
                                   // setVStatus(true)
                                }
                                else {
                                    ToastAndroid.show(t('common:Valid'), ToastAndroid.SHORT);
                                }
                            }}
                        />
                    </View>

                    {VStatus &&
                        <View style={{ paddingTop: width * 0.05, }}>
                            <Text style={styles.TextName}>{t('common:Village')}</Text>

                            <View style={[styles.textInput1, { flexDirection: 'row', }]} >
                                {BStatus &&
                                    <Image1 />}
                                <TextInput
                                    value={Village}
                                    style={styles.TextInputBranch}
                                    onChangeText={(text) => {
                                        setVillage(text)
                                        if (text == '') {
                                            setVillageList([])
                                            setBstatus(false)
                                            setButton(false)
                                        } else {
                                            getVillage(text)
                                        }
                                    }} />
                            </View>
                            {vilageList.length > 0
                                ? <View style={styles.ViewMapBranch1}>
                                    {vilageList.map((item) => {
                                        return (

                                            <TouchableOpacity onPress={() => {
                                                setVillage(item)
                                                setButton(true)
                                                setVillageList([])
                                                setBstatus(false)
                                            }}>
                                                <View style={{ paddingTop: 8 }}>

                                                    <Text style={styles.ItemNameBranch}>{item}</Text>

                                                    <View style={styles.Line} />
                                                </View>
                                            </TouchableOpacity>

                                        )
                                    })}
                                </View>
                                : null}
                            {vilageList.length == 0 && BStatus ? <View style={[styles.ViewMapBranch, { height: width * 0.15, }]}>
                                <View style={{ paddingTop: width * 0.05 }}>

                                    <Text style={styles.ItemNameBranch}>No results found</Text>

                                </View>
                            </View> : null}

                        </View>}


                </ScrollView>
            </KeyboardAvoidingView>
            {/* Button ? setModalVisible(true) : setValidModal1(true) */}
            <TouchableOpacity
                style={[styles.Button1, { backgroundColor: Button &&  Name?.length>=3  && Mobile?.length===10  && Pincode?.length===6 ? COLORS.colorB : '#ECEBED' }]}
                disabled={Button && Name?.length>=3 && Mobile?.length===10 && Pincode?.length===6 ? false : true}
                onPress={onSubmit}>
                <Text style={[styles.text1, { color: Button && Name?.length>=3  && Mobile?.length===10  && Pincode?.length===6? COLORS.colorBackground : '#979C9E' }]}>{t('common:Confirm')}</Text>
            </TouchableOpacity>

            <LeadModal ModalVisible={ModalVisible}
                onPress={() => OnpressOut1()}
                onPressOut={() => setModalVisible(!ModalVisible)}
                setModalVisible={setModalVisible} />

            <ValidModal
                Validation={'The number is already registered'}
                ModalVisible={ValidModal1}
                onPressOut={() => setValidModal1(!ValidModal1)}
                setModalVisible={setValidModal1}
            />
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
        paddingBottom: width * 0.02
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
        paddingTop: width * 0.035
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