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
import EnergyModal from './EnergyModal';
import { api } from '../../../Services/Api';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CorrectionModal from './CorrectionModal';
const { height, width } = Dimensions.get('screen');

const Energy = ({ navigation, setAmount1, setPurpose1, setDays1,
    setCustomerId, setEnergyUtilityId, route,isCheck,Correction }) => {
    const [Amount, setAmount] = useState(null)
    const [ModalVisible, setModalVisible] = useState(false)
    const [ModalVisibleC, setModalVisibleC] = useState(false)
    const isLastPage = useSelector(state => state.isLastPage);
    const [Purpose, setPurpose] = useState('')
    const [days, setDays] = useState('')
    const [utilities, setUtilities] = useState('')
    const [relationShip, setRelationship] = useState('')
    const [Buttons, setButtons] = useState(false)
    const [Correct1,setCorrect1] = useState(Correction)
    const activityId = useSelector(state => state.activityId);
    const [ZeroStatus, setZeroStatus] = useState(false)
    const [ZeroDays, setZeroDays] = useState(false)
    const [customerdetail, setCustomerDetail] = useState('')
    const [spouseDetail, setSpousedetail] = useState()
    const [LastPage, setLastPage] = useState(isCheck)
    const [ActivityId, setActivityId] = useState()
    { console.log("activityid print", activityId, route?.params?.isLastPage, isLastPage,isCheck) }
    useEffect(() => {
        // getLastPage1()
        if(!Correct1){
            getEnergyUtilities()
        }
       
        getSpousedetail()
        getCustomerdetail()
    }, [])
    useEffect(() => {

        AsyncStorage.getItem("CallActivity").then((value) => {
            console.log("value od asybc", value)
            setActivityId(value)
            // getLastPage1(value)

        })
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
                setRelationship('Spouse')
                setSpousedetail(res?.data?.body?.occupation)
                // setRelationship('Customer')
            }
        }).catch((err) => {
            console.log('-------------------err spousedetail', err?.response)
            setRelationship('Customer')
        })
    };
    // ------------------ ------------------


    // ------------------getEnergyUtilities detail ------------------

    const getEnergyUtilities = async () => {
        console.log('api called')

        const data = {
            "activityId": activityId


        }
        await api.getEnergyUtilities(data).then((res) => {
            console.log('-------------------res getEnergyUtilities', res?.data?.body)
            if (res?.status) {
                setUtilities(res?.data?.body)
                setAmount(res?.data?.body?.averageElectrictyBill)
                setPurpose(res?.data?.body?.cookingFuelType)
                setDays(res?.data?.body?.cylinderLastingDays)
                setAmount1(res?.data?.body?.averageElectrictyBill)
                setPurpose1(res?.data?.body?.cookingFuelType)
                setDays1(res?.data?.body?.cylinderLastingDays)
                setCustomerId(res?.data?.body?.customerId)
                setEnergyUtilityId(res?.data?.body?.energyUtilityId)
            }
        }).catch((err) => {
            console.log('-------------------err getEnergyUtilities', err?.response)
        })
    };
    // ------------------ ------------------



    // ------------------getEnergyUtilities detail ------------------

    const saveEnergyUtilities = async () => {
        console.log('api called')

        const data = {
            "activityId": activityId,
            "customerId": utilities.customerId,
            "energyUtilityId": utilities.energyUtilityId,
            "averageElectrictyBill": Amount,
            "cookingFuelType": Purpose,
            "cylinderLastingDays": days

        }
        await api.saveEnergyUtilities(data).then((res) => {
            console.log('-------------------res saveEnergyUtilities', res)
            if (res?.status) {
                if (isCheck == true) {
                    console.log("inside")
                    setModalVisibleC(true)
                } else {
                    getLastPage()
                   
                }

                // if(customerdetail !== 'UNEMPLOYED'){
                // navigation.navigate('IncomeDetails', { relationShip: relationShip })
                // }else if(customerdetail == 'UNEMPLOYED' && spouseDetail !== 'UNEMPLOYED' ){
                //     navigation.navigate('IncomeDetailsSpouse')
                // }else if(customerdetail == 'UNEMPLOYED' && spouseDetail == 'UNEMPLOYED'){
                //     saveIncomeDetails_Spouse()
                //     navigation.navigate('Proceed')
                // }
                // else{
                //     saveIncomeDetails_Spouse()
                //     navigation.navigate('Proceed')
                // }
            }
        }).catch((err) => {
            console.log('-------------------err saveEnergyUtilities', err)
        })
    };
    // ------------------ ------------------

    useEffect(() => {
        console.log('Use.....', Amount, days, Purpose)

        if (Purpose == 'LPG Cylinder') {
            if ((Amount === '' || Amount === null) || (Purpose === '' || Purpose === null) || (days === '' || days === null)) {
                setButtons(false)
            } else {
                setButtons(true)
                setPurpose(Purpose)
                setPurpose1(Purpose)
            }
        } else {
            if ((Amount === '' || Amount === null) || (Purpose === '' || Purpose === null)) {
                setButtons(false)
            } else {
                setButtons(true)
                setPurpose(Purpose)
                setPurpose1(Purpose)
            }
        }
    }, [Amount, days, Purpose])

    const getCustomerdetail = async () => {
        console.log('api called')

        const data = {
            "activityId": activityId
        }
        await api.getCustomerdetail(data).then((res) => {
            console.log('-------------------res customerdetail', res.data.body?.occupation)
            if (res?.status) {
                setCustomerDetail(res.data.body?.occupation)
                //setSpousedetail(res?.data?.body)
            }
        }).catch((err) => {
            console.log('-------------------err spousedetail', err?.response)
        })
    };

    const saveIncomeDetails_Spouse = async () => {
        console.log('api called')

        const data = {
            "activityId": activityId,
            "relationShip": 'Spouse',
            "field1": '',
            "field2": '',
            "field3": ''

        }
        await api.saveIncomeDetails(data).then((res) => {
            console.log('-------------------res saveIncomeDetails', data)
            if (res?.status) {

            }
        }).catch((err) => {
            console.log('-------------------err saveIncomeDetails', err?.response)
        })
    };

    const getLastPage = async () => {
        console.log("LASTPAGE", activityId)
        const data = {
            "activityId": activityId
        }
        await api.getLastPage(data).then((res) => {
            console.log("last page upadte", res?.data)
            if (res?.data?.body?.isLasCorrectin == false && res?.data?.body?.nextPage == 6) {
                if (customerdetail !== 'UNEMPLOYED') {
                    navigation.navigate('IncomeDetails', { relationShip: relationShip ,Correction:Correct1})
                } else if (customerdetail == 'UNEMPLOYED' && spouseDetail !== 'UNEMPLOYED') {
                    navigation.navigate('IncomeDetailsSpouse',{Correction:Correct1})
                } else if (customerdetail == 'UNEMPLOYED' && spouseDetail == 'UNEMPLOYED') {
                    saveIncomeDetails_Spouse()
                    navigation.navigate('Proceed')
                }
                else {
                    saveIncomeDetails_Spouse()
                    navigation.navigate('Proceed')
                }
            }
            else if (res?.data?.body?.isLasCorrectin == true && res?.data?.body?.nextPage == 1) {
                navigation.navigate('DetailCheck',{ Correction:Correct1})
            } else if (res?.data?.body?.isLasCorrectin == true && res?.data?.body?.nextPage == 2) {
                navigation.navigate('ResidenceOwner',{ Correction:Correct1})
            } else if (res?.data?.body?.isLasCorrectin == true && res?.data?.body?.nextPage == 3) {
                navigation.navigate('ContinuingGuarantor',{ Correction:Correct1})
            } else if (res?.data?.body?.isLasCorrectin == true && res?.data?.body?.nextPage == 4) {
                navigation.navigate('AddVehicle',{ Correction:Correct1})
            } else if (res?.data?.body?.isLasCorrectin == true && res?.data?.body?.nextPage == 5) {
                navigation.navigate('VehicleOwn',{ Correction:Correct1})
            } else if (res?.data?.body?.isLasCorrectin == true && res?.data?.body?.nextPage == 7) {
                if (customerdetail !== 'UNEMPLOYED') {
                    navigation.navigate('IncomeDetails', { relationShip: relationShip,
                        isCheck:res?.data?.body?.isLasCorrectin ,Correction:Correct1})
                } else if (customerdetail == 'UNEMPLOYED' && spouseDetail !== 'UNEMPLOYED') {
                    navigation.navigate('IncomeDetailsSpouse',{isCheck:res?.data?.body?.isLasCorrectin, Correction:Correct1})
                } else if (customerdetail == 'UNEMPLOYED' && spouseDetail == 'UNEMPLOYED') {
                    saveIncomeDetails_Spouse()
                    navigation.navigate('Proceed')
                }
                else {
                    saveIncomeDetails_Spouse()
                    navigation.navigate('Proceed')
                }
            } else if (res?.data?.body?.isLasCorrectin == false && res?.data?.body?.nextPage == 7) {
                if (customerdetail !== 'UNEMPLOYED') {
                    navigation.navigate('IncomeDetails', { relationShip: relationShip,isCheck:res?.data?.body?.isLasCorrectin , Correction:Correct1})
                } else if (customerdetail == 'UNEMPLOYED' && spouseDetail !== 'UNEMPLOYED') {
                    navigation.navigate('IncomeDetailsSpouse',{isCheck:res?.data?.body?.isLasCorrectin, Correction:Correct1})
                } else if (customerdetail == 'UNEMPLOYED' && spouseDetail == 'UNEMPLOYED') {
                    saveIncomeDetails_Spouse()
                    navigation.navigate('Proceed')
                }
                else {
                    saveIncomeDetails_Spouse()
                    navigation.navigate('Proceed')
                }
            } else if (res?.data?.body?.isLasCorrectin == false && res?.data?.body?.nextPage == 8) {
                navigation.navigate('IncomeDetailsSpouse',{ Correction:Correct1})
            }else{
                navigation.navigate('IncomeDetails', { relationShip: relationShip,isCheck:res?.data?.body?.isLasCorrectin , Correction:Correct1})
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
                setModalVisibleC(false)
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Proceed' }],
                });
                // navigation.navigate('Proceed')

            }

        }).catch((err) => {
            console.log('-------------------err spousedetail1', err?.response)

        })
    };

    { console.log("modalvisibel", ModalVisibleC) }

    const getLastPage1 = async (value) => {
        console.log("LASTPAGE called", value)
        const data = {
            "activityId": value ? value : act
        }
        await api.getLastPage(data).then((res) => {
            console.log("last page upadte CA;LL", res?.data)
            if (res?.data?.body?.isLasCorrectin == true) {

                setLastPage(res?.data?.body?.isLasCorrectin)

            }

        }).catch((err) => {
            console.log('-------------------err DLESTAUS', err?.response)

        })
    };



    return (

        <>
            <View style={styles.mainContainer}>
                <ScrollView>

                    <View>
                        <Text style={styles.TextElect}>Average electricity bill amount</Text>
                    </View>

                    <View style={styles.SelectBox}>
                        <Text style={[styles.RS, { color: Amount === null ? '#808080' : '#1A051D' }]}>₹</Text>
                        <TextInput
                            style={[{ fontSize: 14, color: '#000', fontFamily: FONTS.FontRegular, left: 5, width: width * 0.84, }]}
                            value={Amount?.toString()}
                            keyboardType={'number-pad'}
                            maxLength={5}
                            contextMenuHidden={true}
                            onChangeText={(text) => {
                                const firstDigitStr = String(text)[0];
                                setZeroStatus(false)
                                //  setAmount(text)
                                // const firstDigitStr = String(num)[0];
                                if (text === '' || text === ',' || text === '.') {
                                    setZeroStatus(false)
                                    setAmount('')
                                }
                                else if (Number(text) == 0) {

                                    setZeroStatus(true)
                                    console.log("number log", text)
                                } else if (text[0] === '0') {
                                    console.log("number log", text)
                                }
                                else if (/^[^!-\/:-@\.,[-`{-~ ]+$/.test(text) || text === "") {
                                    setAmount(text)
                                    setZeroStatus(false)
                                }
                            }
                            } />
                    </View>
                    {ZeroStatus &&
                        <Text style={{ color: 'red', fontSize: 9, paddingTop: 3, fontFamily: FONTS.FontRegular }}>Amount cannot be ₹0</Text>}
                    <View>
                        <Text style={styles.TextElect}>Cooking fuel type</Text>
                    </View>

                    <TouchableOpacity style={styles.SelectBox1} onPress={() => setModalVisible(true)} >
                        {!Purpose ?
                            <Text style={styles.textSelect}>Select</Text> :
                            <Text style={[styles.textSelect, { color: '#1A051D', marginLeft: 8 }]}>{Purpose}</Text>}
                        {/* <Icon1 name="chevron-down" size={18} color={'#808080'} style={{ marginRight: 10 }} /> */}
                    </TouchableOpacity>

                    {(Purpose == 'LPG Cylinder' || Purpose == 'LPG Cylender') &&
                        <View>
                            <Text style={styles.TextElect}>Average days a cylinder will last</Text>
                        </View>}

                    {(Purpose == 'LPG Cylinder' || Purpose == 'LPG Cylender') &&
                        <View style={styles.SelectBox}>
                            <TextInput
                                placeholder="Enter number of days"
                                placeholderTextColor={"#808080"}
                                style={[{ fontSize: 14, color: '#1A051D', fontFamily: FONTS.FontRegular, left: 5, width: width * 0.5 }]}
                                value={days?.toString()}
                                keyboardType={'number-pad'}
                                maxLength={2}
                                contextMenuHidden={true}
                                onChangeText={(text) => {
                                    setZeroDays(false)
                                    if (text === '' || text === ',' || text === '.') {
                                        setZeroDays(false)
                                        setDays('')
                                    }
                                    else if (Number(text) == 0) {

                                        setZeroDays(true)
                                        console.log("number log", text)
                                    }
                                    else if (text[0] === '0') {
                                        console.log("number log", text)
                                    }
                                    else if (/^[^!-\/:-@\.,[-`{-~ ]+$/.test(text) || text === "") {
                                        setDays(text),
                                            setDays1(text)
                                    }
                                }
                                } />
                        </View>}
                    {ZeroDays &&
                        <Text style={{ color: 'red', fontSize: 9, paddingTop: 3, fontFamily: FONTS.FontRegular }}>Days cannot be 0</Text>}
                </ScrollView>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity style={[styles.buttonView, { backgroundColor: Buttons ? COLORS.colorB : 'rgba(224, 224, 224, 1)' }]}
                        onPress={() => Buttons ? saveEnergyUtilities() : console.log("hello")}>
                        <Text style={[styles.continueText, { color: Buttons ? COLORS.colorBackground : 'rgba(151, 156, 158, 1)' }]}>{isCheck == true ? 'Submit' : 'Continue'}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <EnergyModal
                visible={ModalVisible}
                setPurpose={setPurpose}
                Purpose={Purpose}
                setModalVisible={setModalVisible}
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

        </>
    )
}

export default Energy;

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



})