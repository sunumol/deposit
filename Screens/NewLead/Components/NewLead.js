
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

const NewLead1 = ({ navigation }) => {
    const { t } = useTranslation();
    const [Name, setName] = useState('')
    const [Mobile, setMobile] = useState('')
    const [Pincode, setPincode] = useState('')
    const [Village, setVillage] = useState('')
    const [BStatus, setBstatus] = useState(false)
    const [Button, setButton] = useState(false)
    const [ModalVisible, setModalVisible] = useState(false)
    const [VStatus,setVStatus] = useState(false)

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
        setBstatus(true)
        setVillage(text)
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
                                setMobile(text)

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
                                setVStatus(true)

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
                    </View>}


                </ScrollView>
            </KeyboardAvoidingView>
            <View style={styles.ViewVerify} >

                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity style={[styles.Button1, { backgroundColor: Button ? COLORS.colorB : '#ECEBED' }]}
                        onPress={() => Button ? setModalVisible(true) : setModalVisible(false)}>
                        <Text style={[styles.text1, { color: Button ? COLORS.colorBackground : '#979C9E' }]}>{t('common:Confirm')}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <LeadModal ModalVisible={ModalVisible}
                onPress={() => OnpressOut1()}
                onPressOut={() => setModalVisible(!ModalVisible)}
                setModalVisible={setModalVisible} />
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