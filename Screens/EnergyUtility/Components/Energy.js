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
const { height, width } = Dimensions.get('screen');

const Energy = ({ navigation,setAmount1,setPurpose1,setDays1,setCustomerId,setEnergyUtilityId  }) => {
    const [Amount, setAmount] = useState('')
    const [ModalVisible, setModalVisible] = useState(false)
    const [Purpose, setPurpose] = useState('')
    const [days, setDays] = useState('')
    const [utilities,setUtilities] = useState('') 
    const [relationShip,setRelationship] = useState('')
    const [Buttons, setButtons] = useState(false)
    const activityId = useSelector(state => state.activityId);


    useEffect(()=>{
        getEnergyUtilities()
        getSpousedetail()
    },[])
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
        "cylinderLastingDays":days

    }
    await api.saveEnergyUtilities(data).then((res) => {
        console.log('-------------------res saveEnergyUtilities', res)
        if (res?.status) {
            navigation.navigate('IncomeDetails',{relationShip: relationShip})
        }
    }).catch((err) => {
        console.log('-------------------err saveEnergyUtilities', err?.response)
    })
};
// ------------------ ------------------

useEffect(() => {
    console.log('Use.....', Amount, days, Purpose)

    if(Purpose == 'LPG Cylinder'){
         if ((Amount === ''||Amount ===  null) || (Purpose === ''||Purpose === null )|| (days === ''|| days ===  null)) {
        setButtons(false)
    } else {
        setButtons(true)
    }}else{
        if ((Amount === ''|| Amount ===  null) || (Purpose === ''|| Purpose === null )) {
            setButtons(false)
        } else {
            setButtons(true)
        } 
    }
}, [Amount, days, Purpose])
    return (

        <>
            <View style={styles.mainContainer}>
                <ScrollView>
                 
                    <View>
                        <Text style={styles.TextElect}>Average electricity bill amount</Text>
                    </View>
                  
                    <View style={styles.SelectBox}>
                        <Text style={[styles.RS, { color: Amount === '' ? '#808080' : '#1A051D' }]}>₹</Text>
                        <TextInput
                            style={[{ fontSize: 14, color: '#000', fontFamily: FONTS.FontRegular, left: 5, width: width * 0.84, }]}
                            value={Amount?.toString()}
                            keyboardType={'number-pad'}
                            maxLength={5}
                            onChangeText={(text) => {
                                if (/^[^!-\/:-@\.,[-`{-~ ]+$/.test(text) || text === "") {
                                    setAmount(text)
                                }
                            }
                               } />
                    </View>
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

                    {(Purpose == 'LPG Cylinder'|| Purpose == 'LPG Cylender' ) &&
                        <View style={styles.SelectBox}>
                            <TextInput
                                placeholder="Enter number of days"
                                placeholderTextColor={"#808080"}
                                style={[{ fontSize: 14, color: '#1A051D', fontFamily: FONTS.FontRegular, left: 5, width: width * 0.5 }]}
                                value={days?.toString()}
                                keyboardType={'number-pad'}
                                maxLength={2}
                                onChangeText={(text) => {
                                    if (/^[^!-\/:-@\.,[-`{-~ ]+$/.test(text) || text === "") {
                                        setDays(text),
                                        setDays1(text)
                                    }
                                }
                                } />
                        </View>}
                </ScrollView>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity style={[styles.buttonView, { backgroundColor: Buttons ? COLORS.colorB: 'rgba(224, 224, 224, 1)' }]}
                        onPress={() =>saveEnergyUtilities()}>
                        <Text style={[styles.continueText, { color: Buttons ? COLORS.colorBackground :'rgba(151, 156, 158, 1)' }]}>Continue</Text>
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