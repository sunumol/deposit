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
import Search from '../../../assets/image/search2.svg'
import Icon1 from 'react-native-vector-icons/Entypo';
import ImagePicker from 'react-native-image-crop-picker';
import { api } from '../../../Services/Api';
import { useSelector } from 'react-redux';




const { height, width } = Dimensions.get('screen');

const Vehicles = ({ navigation, vehicleslist }) => {
  console.log("vehicleslist......vehicleslist==============",vehicleslist)

    const isDarkMode = true;
    const [text, onChangeText] = useState('');
    const [ModalVisible, setModalVisible] = useState(false)
    const [selectedItem, setSelectedItem] = useState()
    const [ButtonStatus, setButtonStatus] = useState(false)
    const [ModalError, setModalError] = useState(false)
    const [ModalReason, setModalReason] = useState(false)
    const [checked, setChecked] = useState(false);
    const [numbers, setNumbers] = useState('')
    const [number, setNumber] = useState(false)
    const [SearchStatus, setSearchStatus] = useState(false)
    const [vehicleslist1, setvehicleslist] = useState([])
    const [mergedList, setmergedList] = useState([])
    const toggleCheckbox = () => setChecked(!checked);
    const activityId = useSelector(state => state.activityId);
    const [LastPage,setLastPage] = useState()

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

    const Owner = [
        {
            id: 1,
            name: 'Anil Kumar',
            vehicle: 'Maruti Suzuki Alto',
            number: 'KL34E3278',
            year: '2017'
        },
        {
            id: 2,
            name: 'Anil Kumar',
            vehicle: 'Maruti Suzuki Swift',
            number: 'KL24H779',
            year: '2013'
        }
    ]

    // useEffect(()=>{
    // setvehicleslist([vehicle])
    // },[vehicle])

    // useEffect(() => {
    //     setmergedList([])
    //     if (vehicle || vehicleslist) {
    //         const data = vehicle.concat(vehicleslist);
    //         // mergedList.push({...vehicle,...vehicleslist })
    //         console.log('length=======', data)
    //     }
    // }, [vehicle, vehicleslist])


    const getVehicleDetails = async () => {
        console.log('api called', activityId)

        const data = {
            "activityId": activityId,

        }
        await api.getVehicleDetails(data).then((res) => {
            console.log('-------------------res getVehicleDetails', res?.data?.body?.length)
            if (res?.data?.body) {
                setNumbers(res?.data?.body?.length)
                let temp = vehicleslist
                console.log("vehickelost pass",vehicleslist)
                console.log("vehcle api data",res?.data?.body)
                setvehicleslist(res?.data?.body)
                // temp  = temp.concat(res?.data?.body)
                // setvehicleslist([...temp])
            }
        }).catch((err) => {
            console.log('-------------------err getVehicleDetails', err)
        })
    };
  

    // ------------------get fetchVehicleDetailsForDle detail ------------------

    const saveVehicleDetails = async () => {
        console.log('api called1')

        const data = vehicleslist
        await api.saveVehicleDetails(data).then((res) => {
            console.log('-------------------res fetchVehicleDetailsForDle', res)
            if (res?.status) {
                //getLastPage()
                navigation.navigate('EnergyUtility')
            }
        }).catch((err) => {
            console.log('-------------------err fetchVehicleDetailsForDle', err?.response)
        })
    };

    const saveVehicleDetails_AddNew = async () => {
        console.log('api called1')

        const data = vehicleslist
        await api.saveVehicleDetails(data).then((res) => {
            console.log('-------------------res fetchVehicleDetailsForDle', res)
            if (res?.status) {
                navigation.navigate('AddVehicle')
            }
        }).catch((err) => {
            console.log('-------------------err fetchVehicleDetailsForDle', err?.response)
            navigation.navigate('AddVehicle')
        })
    };


    useEffect(() => {
        getVehicleDetails()
        console.log("veh",vehicleslist1)
        console.log("USEEFFECT INSIDE")
    }, [])

    const getLastPage = async () => {
        console.log("LASTPAGE", activityId)
        const data = {
            "activityId": activityId
        }
        await api.getLastPage(data).then((res) => {
            console.log("last page upadte", res?.data)
            if (res?.data?.body?.isLasCorrectin == true) {

                getDLEConfirmation()

            } else if (res?.data?.body?.isLasCorrectin == false && res?.data?.body?.nextPage == 1) {
                navigation.navigate('DetailCheck')
            } else if (res?.data?.body?.isLasCorrectin == false && res?.data?.body?.nextPage == 2) {
                navigation.navigate('ResidenceOwner')
            } else if (res?.data?.body?.isLasCorrectin == false && res?.data?.body?.nextPage == 3) {
                navigation.navigate('ContinuingGuarantor')
            } else if (res?.data?.body?.isLasCorrectin == false && res?.data?.body?.nextPage == 4) {
                navigation.navigate('AddVehicle')
            } 
            // else if (res?.data?.body?.isLasCorrectin == false && res?.data?.body?.nextPage == 5) {
            //     navigation.navigate('VehicleOwn')
            // }
             else if (res?.data?.body?.isLasCorrectin == false && res?.data?.body?.nextPage == 5) {
                navigation.navigate('EnergyUtility')
            } else if (res?.data?.body?.isLasCorrectin == false && res?.data?.body?.nextPage == 7) {
                navigation.navigate('IncomeDetails')
            } else if (res?.data?.body?.isLasCorrectin == false && res?.data?.body?.nextPage == 8) {
                navigation.navigate('IncomeDetailsSpouse')
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
                navigation.navigate('Proceed')

            }

        }).catch((err) => {
            console.log('-------------------err spousedetail1', err?.response)

        })
    };  

    const getLastPage1 = async () => {
        console.log("LASTPAGE", activityId)
        const data = {
            "activityId": activityId
        }
        await api.getLastPage(data).then((res) => {
            console.log("last page upadte", res?.data)
            if (res?.data?.body?.isLasCorrectin == true) {
    
                setLastPage(res?.data?.body?.isLasCorrectin)
    
            }
    
        }).catch((err) => {
            console.log('-------------------err DLESTAUS', err?.response)
    
        })
    };
    
    useEffect(()=>{
        getLastPage1()
    },[])

    return (

        <>
            <View style={styles.mainContainer}>
                <ScrollView>

                    <View>
                        <Text style={styles.vehText}>Vehicles owned ({vehicleslist1?.length})</Text>
                    </View>
                    <View>

                       
                        {vehicleslist1 ? vehicleslist1.map((item) => {
                           
                            return (
                                <View style={styles.containerBox1}>
                                    <View style={{
                                        flexDirection: 'row', justifyContent: 'space-around',
                                        paddingTop: width * 0.04, marginLeft: width * 0.05,marginBottom:5
                                    }}>
                                        <View style={{ flexDirection: 'column', flex: 1, alignItems: 'flex-start' }}>
                                            <Text style={styles.TextOwner}>{item?.ownersName}</Text>
                                            <Text style={[styles.TextOwner, { paddingTop: 5, width: width * 0.35 }]}>{item?.model}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center', left: -9 }}>
                                            {Data.map((item) => {
                                                return (
                                                    <View style={{ flexDirection: 'column', }}>
                                                        <Text style={{ fontSize: 6, color: "#C4C4C4" }}>{item?.label}</Text>
                                                    </View>
                                                )
                                            })}
                                        </View>
                                        <View style={{ flexDirection: 'column', flex: 1, left: -25 }}>
                                            <Text style={styles.TextOwner}>{item?.vehicleNumber}</Text>
                                            <Text style={[styles.TextOwner, { paddingTop: 5 }]}>{item?.year}</Text>
                                        </View>
                                    </View>

                                </View>
                            )
                        }):null}

                    </View>

                    <View style={{ alignItems: 'flex-end' }}>
                        <TouchableOpacity style={[styles.buttonView1, { backgroundColor: 'rgba(0, 56, 116, 0.1)' }]}
                            onPress={() => saveVehicleDetails_AddNew()} >
                            <Icon1 name="plus" size={18} color={COLORS.colorB} />
                            <Text style={[styles.continueText, { color: COLORS.colorB, marginLeft: 5 }]}>Add New</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>

                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity style={[styles.buttonView, { backgroundColor: COLORS.colorB }]} onPress={() => saveVehicleDetails()}>
                        <Text style={[styles.continueText, { color: COLORS.colorBackground }]}>{LastPage ? 'Confirm' :'Continue' }</Text>
                    </TouchableOpacity>
                </View>
            </View>




        </>
    )
}

export default Vehicles;

const styles = StyleSheet.create({


    mainContainer: {
        flex: 1,
        //paddingHorizontal: 20,
        backgroundColor: COLORS.colorBackground
    },
    vehText: {
        fontFamily: FONTS.FontSemiB,
        color: '#000000',
        fontSize: 14
    },
    Num: {
        color: '#1A051D',
        fontSize: 14,
        fontFamily: FONTS.FontRegular,
        left: 6,
        // backgroundColor:'red',
        width: width * 0.6
    },
    continueText: {
        fontSize: 14,
        fontFamily: FONTS.FontBold,
        color: COLORS.colorBackground,
        letterSpacing: 0.64
    },

    buttonView1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 54,
        height: 45,
        marginBottom: 20,
        width: width * 0.35,

    },
    buttonView: {

        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 54,
        height: 48,
        marginBottom: 5,
        width: width * 0.90,

    },
    continueText: {
        fontSize: 14,
        fontFamily: FONTS.FontBold,

        letterSpacing: 0.64
    },
    TextOwner: {
        fontFamily: FONTS.FontSemiB,
        color: '#1A051D',
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
    skip: {
        fontSize: 14,
        color: COLORS.colorB,
        fontFamily: FONTS.FontSemiB
    },
    SearhView: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.colorB,
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerBox: {
        marginTop: 10,
        flexDirection: 'row',
        backgroundColor: COLORS.colorBackground,
        shadowColor: 'rgba(0, 0, 0, 0.4)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        elevation: 5,
        shadowRadius: 7,
        borderRadius: 15,
        marginRight: 15,
        marginLeft: 2,
        alignItems: 'center',
        marginBottom: 14,
        width: width * 0.88,
        height: width * 0.20
    },
    circleView: {
        width: 40,
        height: 40,
        backgroundColor: '#9EC894',
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
    containerBox1: {
        marginTop: 6,
        //flexDirection: 'row',
        backgroundColor: COLORS.colorBackground,
        shadowColor: 'rgba(0, 0, 0, 0.4)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        elevation: 5,
        shadowRadius: 7,
        borderRadius: 15,
        marginRight: 15,
        marginLeft: 2,
        //alignItems: 'center',
        marginBottom: 14,
        width: width * 0.88,
        //height: width * 0.20
    },
    owner: {
        color: '#808080',
        fontFamily: FONTS.FontRegular,
        fontSize: 12
    },
    NameStyle: {
        color: '#1A051D',
        fontSize: 12,
        fontFamily: FONTS.FontSemiB
    }







})