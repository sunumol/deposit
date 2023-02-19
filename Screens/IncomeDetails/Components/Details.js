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
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Statusbar from '../../../Components/StatusBar';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../../../Components/RepayHeader';
import { FONTS, COLORS } from '../../../Constants/Constants';
import Icon1 from 'react-native-vector-icons/Entypo'
import CreditModal from './CreditModal';

const { height, width } = Dimensions.get('screen');

const Details = ({ navigation }) => {
    const [Amount, setAmount] = useState('')
    const [ModalVisible, setModalVisible] = useState(false)
    const [Purpose, setPurpose] = useState('')
    const [days, setDays] = useState('')
    const [Month, setMonth] = useState('')
    const [Avg, setAvg] = useState('')
    const [Buttons, setButtons] = useState(false)
    const [MonthsCustom, setMonthCustom] = useState('')
    const [Credit, setCredit] = useState('')
    const [Salary, setSalary] = useState('')
    const [StateChange, setStateChange] = useState(false)
    const [ButtonSP, setButtonSP] = useState(false)


    const ButtonClick = (text) => {
        setAvg(text)
        if (Amount !== '' && Avg !== '' && Month !== '') {
            setButtons(true)

        } else {
            setButtons(false)
        }
    }

    useEffect(() => {
        if (MonthsCustom === '' || Purpose === '' || Salary === '') {
            setButtonSP(false)
        } else {
            setButtonSP(true)
        }
    }, [MonthsCustom, Purpose, Salary])

    useEffect(() => {
        if (Amount === '' || Avg === '' || Month === '') {
            setButtons(false)
        } else {
            setButtons(true)
        }
    }, [Amount, Avg, Month])

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
                        <View>
                            <View>
                                <Text style={styles.TextElect}>Highest monthly income earned in last 12 months</Text>
                            </View>
                            <View style={styles.SelectBox}>
                                <Text style={[styles.RS, { color: Amount === '' ? '#808080' : '#1A051D' }]}>₹</Text>
                                <TextInput
                                    style={[{
                                        fontSize: 14, color: '#1A051D',
                                        fontFamily: FONTS.FontRegular, left: 5
                                    }]}
                                    value={Amount}
                                    keyboardType={'number-pad'}
                                    //label={'₹'}
                                    onChangeText={(text) => setAmount(text)} />
                            </View>

                            <View>
                                <Text style={styles.TextElect}>No. of months in last 12 months with similar income (Within 10% of highest)</Text>
                            </View>
                            <View style={styles.SelectBox}>
                                <TextInput
                                    style={[{ fontSize: 14, color: '#1A051D', fontFamily: FONTS.FontRegular, left: 5 }]}
                                    value={Month}
                                    keyboardType={'number-pad'}
                                    onChangeText={(text) => setMonth(text)} />
                            </View>

                            <View>
                                <Text style={styles.TextElect}>Average monthly income in remaining months</Text>
                            </View>
                            <View style={styles.SelectBox}>
                                <Text style={[styles.RS, { color: Avg === '' ? '#808080' : '#1A051D' }]}>₹</Text>
                                <TextInput
                                    style={[{ fontSize: 14, color: '#1A051D', fontFamily: FONTS.FontRegular, left: 5 }]}
                                    value={Avg}
                                    keyboardType={'number-pad'}
                                    onChangeText={(text) => setAvg(text)} />
                            </View>
                        </View> :
                        <View>
                            <View>
                                <Text style={styles.TextElect}>No. of months continuously employed with current employer</Text>
                            </View>
                            <View style={styles.SelectBox}>
                                <TextInput
                                    style={[{ fontSize: 14, color: '#1A051D', fontFamily: FONTS.FontRegular, left: 5 }]}
                                    value={MonthsCustom}
                                    keyboardType={'number-pad'}
                                    //label={'₹'}
                                    onChangeText={(text) => setMonthCustom(text)} />
                            </View>

                            <View>
                                <Text style={styles.TextElect}>Salary credit method</Text>
                            </View>
                            <TouchableOpacity style={styles.SelectBox1} onPress={() => setModalVisible(true)} >
                                {!Purpose ?
                                    <Text style={styles.textSelect}>Select</Text> :
                                    <Text style={[styles.textSelect], { color: '#1A051D', marginLeft: 8 }}>{Purpose}</Text>}
                                <Icon1 name="chevron-down" size={18} color={'#808080'} style={{ marginRight: 10 }} />
                            </TouchableOpacity>

                            <View>
                                <Text style={styles.TextElect}>Net monthly salary</Text>
                            </View>
                            <View style={styles.SelectBox}>
                                <Text style={[styles.RS, { color: Salary === '' ? '#808080' : '#1A051D' }]}>₹</Text>
                                <TextInput
                                    keyboardType={'number-pad'}
                                    style={[{ fontSize: 14, color: '#1A051D', fontFamily: FONTS.FontRegular, left: 5 }]}
                                    value={Salary}
                                    onChangeText={(text) => setSalary(text)} />
                            </View>
                        </View>}
                </ScrollView>
                {!StateChange ?
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity style={[styles.buttonView, { backgroundColor: Buttons ? COLORS.colorB : 'rgba(224, 224, 224, 1)' }]}
                            onPress={() => setStateChange(true)}>
                            <Text style={[styles.continueText, { color: Buttons ? COLORS.colorBackground : '#979C9E' }]}>Continue</Text>
                        </TouchableOpacity>
                    </View> :

                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity style={[styles.buttonView, { backgroundColor: ButtonSP ? COLORS.colorB : 'rgba(224, 224, 224, 1)' }]}
                            onPress={() => ButtonSP ? navigation.navigate('DebitDetails') : console.log("helo")}>
                            <Text style={[styles.continueText, { color: ButtonSP ? COLORS.colorBackground : '#979C9E' }]}>Continue</Text>
                        </TouchableOpacity>
                    </View>}
            </View>

            <CreditModal
                visible={ModalVisible}
                setPurpose={setPurpose}
                setModalVisible={setModalVisible}
                onPressOut={() => setModalVisible(!ModalVisible)}
            />


        </>
    )
}

export default Details;

const styles = StyleSheet.create({

    TextElect: {
        fontSize: 12,
        color: '#3B3D43',
        fontFamily: FONTS.FontRegular,
        marginTop: 10
    },
    RS: {
        fontSize: 15,
        fontFamily: FONTS.FontRegular,
        left: 5
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
        width: width * 0.89,
        height: width * 0.12,
        borderColor: 'rgba(236, 235, 237, 1)',
        alignItems: 'center',
        flexDirection: 'row',
        // justifyContent: 'space-between',
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
})