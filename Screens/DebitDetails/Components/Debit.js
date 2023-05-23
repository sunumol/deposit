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
    TouchableOpacity
} from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Image1 from '../../../assets/image/BANK1.svg';
import { FONTS, COLORS } from '../../../Constants/Constants';
import Icon1 from 'react-native-vector-icons/Entypo'


const { height, width } = Dimensions.get('screen');

const Debit = ({ navigation }) => {
    const [Amount, setAmount] = useState('')
    const [ModalVisible, setModalVisible] = useState(false)
    const [Purpose, setPurpose] = useState('')
    const [EMI, setEMI] = useState('')
    const [Frequency, setFrequency] = useState('')
    const [Avg, setAvg] = useState('')
    const [Buttons, setButtons] = useState(false)
    const [ButtonSP, setButtonSP] = useState(false)
    const [MonthsCustom, setMonthCustom] = useState('')
    const [Credit, setCredit] = useState('')
    const [Salary, setSalary] = useState('')
    const [StateChange, setStateChange] = useState(false)


    useEffect(() => {
        if (Salary === '' || Purpose === '') {
            setButtons(false)
        } else {
            setButtons(true)
        }
    }, [Salary, Purpose])


    useEffect(() => {
        if (EMI === '' || Frequency === '') {
            setButtonSP(false)
        } else {
            setButtonSP(true)
        }
    }, [EMI, Frequency])

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

    return (

        <>
            <View style={styles.mainContainer}>
                <ScrollView>
                    {!StateChange ?
                        <View style={styles.containerBox}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={styles.circleView}>
                                    <Text style={styles.shortText}>AA</Text>
                                </View>
                                <View style={{ flexDirection: 'column', flex: 1, marginLeft: 12 }}>
                                    <Text style={styles.nameText}>Athira Anil</Text>
                                    <Text style={styles.underText}>Daily wage labourer</Text>
                                </View>
                                <View style={{ flexDirection: 'row', left: -5 }}>
                                    <Text style={styles.dateText}>Customer</Text>
                                </View>
                            </View>
                        </View> :


                        <View style={styles.containerBox}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={[styles.circleView, { backgroundColor: 'rgba(200, 148, 148, 1)' }]}>
                                    <Text style={styles.shortText}>AK</Text>
                                </View>
                                <View style={{ flexDirection: 'column', flex: 1, marginLeft: 12 }}>
                                    <Text style={styles.nameText}>Anil Kumar</Text>
                                    <Text style={styles.underText}>Salaried employee</Text>
                                </View>
                                <View style={{ flexDirection: 'row', left: -5 }}>
                                    <Text style={styles.dateText}>Spouse</Text>
                                </View>
                            </View>
                        </View>}

                    {!StateChange ?
                        <View style={styles.containerBox1}>
                            <View style={{ flexDirection: 'column', }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image1 />
                                    <Text style={[styles.BankName, { paddingLeft: width * 0.02 }]}>IDFC Bank LTD</Text>
                                </View>
                                <Text style={styles.EMItEXT}>EMI</Text>

                                <View style={styles.SelectBox1}>
                                    <Text style={[styles.RS, { color: Salary === '' ? '#808080' : '#1A051D' }]}>₹</Text>
                                    <TextInput
                                     contextMenuHidden={true}
                                        maxLength={10}
                                        keyboardType={'number-pad'}
                                        style={[{
                                            fontSize: 14, color: '#1A051D',
                                            fontFamily: FONTS.FontRegular, left: 5, top: 2,
                                        }]}
                                        value={Salary}
                                        
                                        onChangeText={(text) => setSalary(text)} />
                                </View>
                            </View>

                            <View style={{
                                flexDirection: 'column',
                                justifyContent: 'space-between', alignItems: 'center'
                            }}>
                                <View style={{ flexDirection: 'column', marginBottom: 10, marginLeft: 10 }}>
                                    {Data.map((item) => {
                                        return (
                                            <View style={{ flexDirection: 'column', }}>
                                                <Text style={{ fontSize: 6, color: "#C4C4C4" }}>{item.label}</Text>
                                            </View>
                                        )
                                    })}
                                </View>

                                <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                                    {Data.map((item) => {
                                        return (
                                            <View style={{ flexDirection: 'column', }}>
                                                <Text style={{ fontSize: 6, color: "#C4C4C4" }}>{item.label}</Text>
                                            </View>
                                        )
                                    })}
                                </View>

                            </View>
                            <View style={{ flexDirection: 'column', }}>


                                <Text style={styles.BankName}>₹50,000.00</Text>

                                <Text style={styles.EMItEXT}>Repayment Frequency</Text>

                                <TouchableOpacity style={styles.SelectBox} onPress={() => setPurpose('Monthly')} >
                                    {!Purpose ?
                                        <Text style={styles.textSelect}>Select</Text> :
                                        <Text style={[styles.textSelect, { color: '#1A051D', marginLeft: 8 }]}>{Purpose}</Text>}
                                    {/* <Icon1 name="chevron-down" size={18} color={'#808080'} style={{ marginRight: 10 }} /> */}
                                </TouchableOpacity>


                            </View>
                        </View> :
                        <View style={styles.containerBox1}>
                            <View style={{ flexDirection: 'column', }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image1 />
                                    <Text style={[styles.BankName, { paddingLeft: width * 0.02 }]}>IDFC Bank LTD</Text>
                                </View>
                                <Text style={styles.EMItEXT}>EMI</Text>
                                <View style={styles.SelectBox1}>
                                    <Text style={[styles.RS, { color: EMI === '' ? '#808080' : '#1A051D' }]}>₹</Text>
                                    <TextInput
                                     contextMenuHidden={true}
                                        keyboardType={'number-pad'}
                                        maxLength={10}
                                        value={EMI}
                                        style={[{
                                            fontSize: 14, color: '#1A051D', top: 2,
                                            fontFamily: FONTS.FontRegular, left: 5,
                                        }]}
                                        onChangeText={(text) => setEMI(text)} />
                                </View>
                            </View>

                            <View style={{
                                flexDirection: 'column',
                                justifyContent: 'space-between', alignItems: 'center'
                            }}>
                                <View style={{ flexDirection: 'column', marginBottom: 10, marginLeft: 10 }}>
                                    {Data.map((item) => {
                                        return (
                                            <View style={{ flexDirection: 'column', }}>
                                                <Text style={{ fontSize: 6, color: "#C4C4C4" }}>{item.label}</Text>
                                            </View>
                                        )
                                    })}
                                </View>

                                <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                                    {Data.map((item) => {
                                        return (
                                            <View style={{ flexDirection: 'column', }}>
                                                <Text style={{ fontSize: 6, color: "#C4C4C4" }}>{item.label}</Text>
                                            </View>
                                        )
                                    })}
                                </View>

                            </View>
                            <View style={{ flexDirection: 'column', }}>


                                <Text style={styles.BankName}>₹70,000.00</Text>

                                <Text style={styles.EMItEXT}>Repayment Frequency</Text>

                                <TouchableOpacity style={styles.SelectBox} onPress={() => setFrequency('Monthly')} >
                                    {!Frequency ?
                                        <Text style={styles.textSelect}>Select</Text> :
                                        <Text style={[styles.textSelect, { color: '#1A051D', marginLeft: 8 }]}>{Frequency}</Text>}
                                    {/* <Icon1 name="chevron-down" size={18} color={'#808080'} style={{ marginRight: 10 }} /> */}
                                </TouchableOpacity>


                            </View>
                        </View>
                    }

                </ScrollView>
                {!StateChange ?
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity style={[styles.buttonView, { backgroundColor: Buttons ? COLORS.colorB : 'rgba(224, 224, 224, 1)' }]}
                            onPress={() => Buttons ? setStateChange(true) : console.log("heloo")}>
                            <Text style={[styles.continueText, { color: Buttons ? COLORS.colorBackground : '#979C9E' }]}>Continue</Text>
                        </TouchableOpacity>
                    </View> :

                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity style={[styles.buttonView, { backgroundColor: ButtonSP ? COLORS.colorB : 'rgba(224, 224, 224, 1)' }]}
                            onPress={() => ButtonSP ? navigation.navigate('Proceed') : console.log("heloo")}>
                            <Text style={[styles.continueText, { color: ButtonSP ? COLORS.colorBackground : '#979C9E' }]}>Continue</Text>
                        </TouchableOpacity>
                    </View>}
            </View>

            {/* <CreditModal
                visible={ModalVisible}
                setPurpose={setPurpose}
                setModalVisible={setModalVisible}
                onPressOut={() => setModalVisible(!ModalVisible)}
            /> */}


        </>
    )
}

export default Debit;

const styles = StyleSheet.create({

    TextElect: {
        fontSize: 12,
        color: '#3B3D43',
        fontFamily: FONTS.FontRegular,
        marginTop: 10
    },
    BankName: {
        color: '#1A051D',
        fontFamily: FONTS.FontSemiB,
        fontSize: 12,

    },
    continueText: {
        fontSize: 14,
        fontFamily: FONTS.FontBold,
        color: COLORS.colorBackground,
        letterSpacing: 0.64
    },
    mainContainer: {
        flex: 1,
        //paddingHorizontal: 20,
        backgroundColor: COLORS.colorBackground
    },
    buttonView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 54,
        height: 45,
        marginBottom: 0,
        width: width * 0.88,

    },
    SelectBox: {
        backgroundColor: '#FCFCFC',
        borderRadius: 8,
        borderWidth: 1,
        width: width * 0.30,
        height: width * 0.11,
        borderColor: 'rgba(236, 235, 237, 1)',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: width * 0.02,
        marginBottom: width * 0.02,
        fontSize: 14,
        color: '#1A051D',
        fontFamily: FONTS.FontRegular,
        //left: 5
    },
    SelectBox1: {
        backgroundColor: '#FCFCFC',
        borderRadius: 8,
        borderWidth: 1,
        width: width * 0.30,
        height: width * 0.11,
        borderColor: 'rgba(236, 235, 237, 1)',
        alignItems: 'center',
        flexDirection: 'row',
        //justifyContent:'center',
        //justifyContent: 'space-between',
        marginTop: width * 0.02,
        marginBottom: width * 0.02,

        //left: 5
    },
    RS: {
        fontSize: 15,
        fontFamily: FONTS.FontRegular,
        left: 5,

    },
    textSelect: {
        fontSize: 14,
        color: 'rgba(128, 128, 128, 1)',
        fontFamily: FONTS.FontRegular,
        marginLeft: 10
    },

    containerBox: {
        borderWidth: 1,
        borderColor: COLORS.colorBorder,
        marginTop: 5,
        flexDirection: 'row',
        backgroundColor: COLORS.colorBackground,
        shadowColor: 'rgba(0, 0, 0, 0.4)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        elevation: 10,
        shadowRadius: 7,
        borderRadius: 8,
        paddingRight: 12,
        paddingLeft: 15,
        paddingTop: 12,
        paddingBottom: 14,
        marginBottom: 10
    },
    containerBox1: {
        borderWidth: 1,
        borderColor: COLORS.colorBorder,
        marginTop: 5,
        flexDirection: 'row',
        backgroundColor: COLORS.colorBackground,
        shadowColor: 'rgba(0, 0, 0, 0.4)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        elevation: 10,
        // justifyContent:'center',
        alignItems: 'center',
        // alignItems: 'center',
        justifyContent: 'space-between',
        shadowRadius: 7,
        borderRadius: 8,
        paddingRight: 12,
        paddingLeft: 15,
        paddingTop: 12,
        paddingBottom: 14,
        marginBottom: 10,
        height: width * 0.40
    },
    circleView: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(158, 200, 148, 1)',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
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
        marginLeft: 5
    },
    EMItEXT: {
        fontSize: 12,
        color: '#808080',
        fontFamily: FONTS.FontRegular,
        paddingTop: width * 0.02
    }
})