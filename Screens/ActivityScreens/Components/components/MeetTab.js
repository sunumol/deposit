import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { COLORS, FONTS } from '../../../../Constants/Constants';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import ActivityModal from '../components/ActiveModal';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '../../../../Services/Api';
import CallModal from '../../../Profile/Components/Modal';


const MeetTab = (props) => {
 
    const { t } = useTranslation();
    const [Lang, setLang] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [details, setDetails] = useState()
    const [enab, setEnab] = useState(false)
    const dispatch = useDispatch()
    const [callStatus, setCallStatus] = useState(false)
    const [ModalCall, setModalCall] = useState(false)
    const [spouseDetail, setSpousedetail] = useState('')
    const [customerdetail, setCustomerDetail] = useState('')
    const DLEStatus = useSelector(state => state?.DLEStatus);
    useEffect(() => {
        getData()
    }, [])

    String.prototype.replaceAt = function (index, replacement) {
        return this.substring(0, index) + replacement + this.substring(index + replacement.length);
    }

    const getRandomColor = () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 3; i++) {
            color += letters[Math.floor(Math.random() * 8)];
        }
        return color;
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



    const getData = async () => {

        try {

            const lang = await AsyncStorage.getItem('user-language')
            const lang1 = await AsyncStorage.getItem('CallActivity')
            setLang(lang)
        } catch (e) {
            console.log(e)
        }
    }


    const getCustomerdetail = async (activityId) => {
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

    useEffect(() => {
        if (spouseDetail !== spouseDetail) {
            setSpousedetail(spouseDetail)
        }
        console.log("spousedetail useef", spouseDetail)
    }, [spouseDetail])
    // ------------------getDlePageNumberdetail ------------------

    const getDlePageNumber = async (id, occupation) => {


        const data = {
            "activityId": id,


        }
        await api.getDlePageNumber(data).then((res) => {
            console.log("cust api", customerdetail)
            console.log('-------------------res getDlePageNumber', res?.data?.body, spouseDetail)
            if (res?.status) {
                if (res?.data?.body == 1) {
                   // if (DLEStatus) {
                   //     props.navigation.navigate('CustomerDetails')
                   // } else {
                        props.navigation.navigate('DetailCheck')
                    //}

                } else if (res?.data?.body == 2) {
                    props.navigation.navigate('ResidenceOwner')
                } else if (res?.data?.body == 3) {
                    props.navigation.navigate('ContinuingGuarantor')
                } else if (res?.data?.body == 4) {
                    if (occupation) {
                        props.navigation.navigate('AddVehicle')
                    } else {
                        props.navigation.navigate('UploadVid')
                    }

                } else if (res?.data?.body == 5) {
                    
                    props.navigation.navigate('VehicleOwn')
                } else if (res?.data?.body == 6) {
                    props.navigation.navigate('EnergyUtility')
                } else if (res?.data?.body == 7) {
                    props.navigation.navigate('IncomeDetails', { relationShip: 'Customer' })
                    // if (occupation !== 'UNEMPLOYED') {

                    //     props.navigation.navigate('IncomeDetails', { relationShip: 'Customer' })
                    // } else if (occupation == 'UNEMPLOYED' && spouseDetail !== 'UNEMPLOYED') {
                    //     props.navigation.navigate('IncomeDetailsSpouse', { relationShip: 'Spouse' })
                    // } else if (occupation == 'UNEMPLOYED' && spouseDetail == 'UNEMPLOYED') {
                    //     navigation.navigate('Proceed')
                    // }
                    // props.navigation.navigate('IncomeDetails', { relationShip: 'Customer' })
                } else if (res?.data?.body == 8) {
                    if (occupation !== 'UNEMPLOYED') {
                        props.navigation.navigate('IncomeDetailsSpouse', { relationShip: 'Spouse' })
                    } else {
                        props.navigation.navigate('Proceed')
                    }
                } else if (res?.data?.body == 9) {
                    props.navigation.navigate('HousePhoto')
                } else if (res?.data?.body == 10) {
                    props.navigation.navigate('AddVehicle')
                }
                //props.navigation.navigate('DetailCheck')
            }
        }).catch((err) => {
            console.log('-------------------err  getDlePageNumber', err)
        })
    };
    // ------------------ ------------------

    const openDialScreen = (userPhone) => {
        let number = '';
        if (Platform.OS === 'ios') {
            number = `telprompt:${userPhone}`;
        } else {
            number = `tel:${userPhone}`;
        }
        Linking.openURL(number);
    };


    const getSpousedetail = async (id) => {
        const data = {
            "activityId": id
        }
        await api.getSpousedetail(data).then((res) => {
            console.log('-------------------res spousedetail co-app', res?.data?.body?.occupation)
            if (res?.status) {
                dispatch({
                    type: 'SET_SPOUSE_OCCUPATION',
                    payload: res?.data?.body?.occupation,
                });

                setSpousedetail(res?.data?.body?.occupation)
                //props.navigation.navigate('DetailCheck')
                getDlePageNumber(id, res?.data?.body?.occupation)
                console.log("spose detail", res?.data?.body)

            }
        }).catch((err) => {
            console.log('-------------------err spousedetail1', err?.response)
            getDlePageNumber(id)
        })
    };

    return (
        <>
            <View style={{ marginBottom: 0 }}>
                <Text style={[styles.timeDropStyle, { paddingTop: props.time ? 18 : 0 }]}>{props.time} ({props?.data?.length})</Text>
                {/* <Text style={[styles.timeDropStyle, { paddingTop: props.time ? 18 : 0 }]}>{props?.time} ({props?.data?.length})</Text> */}

                {props?.data?.map((item, index) => {
                    console.log("props data", item)
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                if (item.purpose == "Conduct DLE") {
                                    dispatch({
                                        type: 'SET_CGT_ACTIVITY_ID',
                                        payload: item.activityId,
                                    });

                                    AsyncStorage.setItem('CallActivity', JSON.stringify(item?.activityId));
                                    setDetails(item)
                                  //  props.navigation.navigate('ContinuingGuarantor')
                                    getSpousedetail(item?.activityId)
                                   
                                   // getCustomerdetail(item?.activityId)

                                } else if (item?.purpose == 'Conduct CGT') {
                                    dispatch({
                                        type: 'SET_CGT_ACTIVITY_ID',
                                        payload: item.activityId,
                                    });
                                    props.navigation.navigate('CGT')


                                } else {
                                    AsyncStorage.setItem('CallActivity', JSON.stringify(item?.activityId));
                                    console.log("item id", item?.activityId)
                                    if (!props?.meet) {
                                        openDialScreen(item?.mobileNumber)
                                    }

                                    setModalVisible(true)
                                    setDetails(item)
                                }
                            }}
                            style={[styles.boxStyle, { marginTop: props.time ? 10 : 0 }]} key={props.id}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>

                                <View style={[styles.circleStyle, { backgroundColor: getRandomColor() }]}>
                                    <Text numberOfLines={1} style={styles.circleText}>{getInitials(item.customerName)}</Text>
                                </View>

                                <View style={{ flexDirection: 'column', paddingLeft: 12, paddingTop: 5 }}>
                                    <Text style={[styles.nameText, { maxWidth: 100 }]}>{item?.customerName}</Text>
                                    <View style={{ flexDirection: 'row', }}>
                                        <View style={{ paddingTop: 5, paddingRight: 1 }}>
                                            <Icon1 name="location-outline" color={"black"} />
                                        </View>
                                        <Text style={[styles.idText, { paddingTop: 4 }]}>{item?.pin ? item?.pin : item?.villageName}</Text>
                                        <TouchableOpacity onPress={() => props.navigation.navigate('DetailCheck')}>

                                        </TouchableOpacity>
                                    </View>
                                </View>

                            </View>

                            <View style={{ flexDirection: 'column', paddingTop: 5, alignItems: 'flex-end' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon2 name="phone-in-talk-outline" color={"black"} size={15} />
                                    <Text style={[styles.numText, { paddingLeft: 6 }]}>{item?.mobileNumber?.replace(/^.{0}/g, '', " ").slice(-10).replaceAt(3, "X").replaceAt(4, "X").replaceAt(5, "X").replaceAt(6, "X").replaceAt(7, "X")}</Text>
                                </View>
                                {item.purpose == "Conduct DLE"
                                    ? <View

                                        style={[styles.leadContainer, { backgroundColor: COLORS.LightPurple }]}>
                                        <Text style={[styles.leadText, { color: COLORS.DarkPurple }]}>Conduct DLE</Text>
                                    </View>
                                    : item.purpose == 'Conduct CGT' ?
                                        <View style={[styles.leadContainer, { backgroundColor: props.meet ? COLORS.LightBlue : COLORS.LightPurple }]}>
                                            <Text style={[styles.leadText, { color: props.meet ? COLORS.DarkBlue : COLORS.DarkPurple }]}>{t('common:ConductCGT')}</Text>
                                        </View> :
                                        item.purpose == 'Leads Follow Up' ?
                                            <View
                                                style={[styles.leadContainer, { backgroundColor: COLORS.LightYellow }]}>
                                                <Text style={[styles.leadText, { color: COLORS.DarkYellow }]}>{t('common:LeadsFollowUp')}</Text>
                                            </View> :
                                            <View style={[styles.leadContainer, { backgroundColor: COLORS.LightPurple }]}>
                                                <Text style={[styles.leadText, { color: COLORS.DarkPurple }]}>{t('common:ExplainTrustCircle')}</Text>
                                            </View>}

                            </View>

                        </TouchableOpacity>
                    )
                })}
                <ActivityModal visible={modalVisible} onPressOut={() => setModalVisible(!modalVisible)} meet={props.meet} details={details} setEnab={props.setEnab} />

                <CallModal
                    ModalVisible={ModalCall}
                    onPressOut={() => { setModalCall(!ModalCall), navigation.navigate('ActivityScreens') }}
                    setModalVisible={setModalCall}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    timeDropStyle: {
        fontSize: 11,
        fontFamily: FONTS.FontMedium,
        color: COLORS.colorDSText,
        //paddingTop: 18,
    },
    boxStyle: {
        backgroundColor: COLORS.colorBackground,
        borderColor: COLORS.colorBorder,
        borderRadius: 8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        elevation: 7,
        padding: 10,
        borderWidth: 1,
        borderColor: COLORS.colorBorder,
        flexDirection: 'row'
    },
    circleStyle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    circleText: {
        fontSize: 18,
        fontFamily: FONTS.FontSemiB,
        color: COLORS.colorBackground,
        fontWeight: '600',
    },
    circleText: {
        fontSize: 18,
        fontFamily: FONTS.FontSemiB,
        color: COLORS.colorBackground,
        fontWeight: '600',
    },
    nameText: {
        fontSize: 12,
        fontFamily: FONTS.FontBold,
        color: COLORS.colorDark,
        fontWeight: '600',
    },
    idText: {
        fontSize: 11,
        fontFamily: FONTS.FontRegular,
        color: COLORS.colorDark,
        paddingTop: 3,
        width: 110
    },
    numText: {
        fontSize: 12,
        fontFamily: FONTS.FontRegular,
        color: COLORS.colorDark,
        fontWeight: '400',
    },
    approveContainer: {
        width: 98,
        height: 35,
        borderRadius: 54,
        shadowColor: 'rgba(0, 0, 0, 0.12',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        elevation: 7,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.colorB
    },
    textApprove: {
        fontSize: 12,
        fontFamily: FONTS.FontSemiB,
        fontWeight: '600',
    },
    rejectContainer: {
        width: 98,
        height: 35,
        borderRadius: 54,
        backgroundColor: COLORS.colorLight,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    leadText: {
        fontSize: 11,
        fontFamily: FONTS.FontSemiB,
        fontWeight: '600',

    },
    leadContainer: {
        padding: 4,
        borderRadius: 3,
        marginTop: 2,
        maxWidth: 150
    },


});
export default MeetTab;

