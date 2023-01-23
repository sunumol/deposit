
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
    ToastAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'
import { COLORS, FONTS } from '../../../Constants/Constants';
const { height, width } = Dimensions.get('screen');
import TextInputBox from './TextInput';
import Image1 from '../assets/Vector.svg';
import { useTranslation } from 'react-i18next';
import LeadModal from './LeadModal';
import ValidModal from './ValidModal';

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
    const [ResultError,setResultError]  = useState(false)

    const VillageList = [
        {
            id: '1',
            title: 'Kakkanad North'
        },
        {
            id: '2',
            title: 'Kakkanad West'
        }
    ]

    const onChangeVillage = (text) => {
        setVillage(text)
        if(text == 'Kakkanad' ){
            setBstatus(true)
            setVillage(text)
            setResultError(false)
        }else{
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
            // setPhoneNum(null)
          //  setModalVisible1(true)
          //  console.log("restricted values", num, PhoneNum)
             ToastAndroid.show(t('common:Valid'), ToastAndroid.SHORT);
        }
    }

    return (
        <>


            <KeyboardAvoidingView styles={styles.container} behavior='padding'>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }} >


                        <TextInputBox
                            //pointerEvents="none"
                            name={t('common:Name')}
                            value={Name}
                            color={"#1A051D"}

                            // edit={AccStatus}
                            onChangeText={(text) => {
                                setName(text)
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
                                setPincode(text)
                                if(text.length == 6){
                              
                                setVStatus(true)
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
                                    onChangeText={(text) => onChangeVillage(text)} />
                            </View>
                            {BStatus &&
                                <View style={styles.ViewMapBranch}>
                                    {VillageList.map((item) => {
                                        return (
                                            <TouchableOpacity onPress={() => {
                                                setBstatus(false)
                                                setVillage(item.title)
                                                setButton(true)
                                                setResultError(false)
                                            }}>
                                                <View style={{ paddingTop: width * 0.05 }}>

                                                    <Text style={styles.ItemNameBranch}>{item.title}</Text>
                                                    {item.id == 1 &&
                                                        <View style={styles.Line} />}
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    })}
                                </View>}
                                {ResultError && !BStatus &&
                                 <View style={[styles.ViewMapBranch,{ height: width * 0.15,}]}>
                                    <View style={{ paddingTop: width * 0.05 }}>

                                    <Text style={styles.ItemNameBranch}>No results found</Text>
                               
                                </View>
                                </View>}
                        </View>}


                </ScrollView>
            </KeyboardAvoidingView>
            <View style={styles.ViewVerify} >

                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity style={[styles.Button1, { backgroundColor: Button ? COLORS.colorB : '#ECEBED' }]}
                        onPress={() => Button ? setModalVisible(true) : setValidModal1(true)}>
                        <Text style={[styles.text1, { color: Button ? COLORS.colorBackground : '#979C9E' }]}>{t('common:Confirm')}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <LeadModal ModalVisible={ModalVisible}
                onPress={() => OnpressOut1()}
                onPressOut={() => setModalVisible(!ModalVisible)}
                setModalVisible={setModalVisible} />

            <ValidModal
                Validation={t('common:leadValid')}
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
        position: 'absolute',
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
    ItemNameBranch: {
        paddingLeft: width * 0.02,
        color: "#1A051D",
        fontSize: 12,
        fontFamily: FONTS.FontRegular
    },
})

export default NewLead1;