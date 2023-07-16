
;
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity,Linking, Alert } from 'react-native';
import { COLORS, FONTS } from '../../../../Constants/Constants';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import ActivityModal from '../components/ActiveModal';
import { useDispatch } from 'react-redux';
import { api } from '../../../../Services/Api';




const   ActiveTab = (props) => {
console.log('props====',props)
    const { t } = useTranslation();
    const [Lang, setLang] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [enab, setEnab] = useState(false)
    const dispatch = useDispatch()
    const [details, setDetails] = useState()
    useEffect(() => {
        getData()
    }, [])
    const getRandomColor = (value) => {
        // console.log('Random',value)
         let mobilenum = value?.charAt(value.length-1)
         if (mobilenum == '0'){
           var color = '#94BCC8'
         }else if (mobilenum == '1'){
           var color ='#9EC894'
         }else if (mobilenum == '2'){
             var color ='#8CACCE'
           }else if (mobilenum == '3'){
             var color ='#CE748F'
           }else if (mobilenum == '4'){
             var color ='#8CA785'
           }else if (mobilenum == '5'){
             var color = '#6979F8'
           }else if (mobilenum == '6'){
             var color ='#9EC894'
           }else if (mobilenum == '7'){
             var color ='#8CACCE'
           }else if (mobilenum == '8'){
             var color ='#CE748F'
           }else if (mobilenum == '9'){
             var color ='#8CA785'
           }else if(value == null || '' ){
             var color = '#C8BD94'
           }

        return color;
    }

    String.prototype.replaceAt = function (index, replacement) {
        return this.substring(0, index) + replacement + this.substring(index + replacement.length);
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
            setLang(lang)
        } catch (e) {
            console.log(e)
        }
    }



    // ------------------get cgt status ------------------

    const getCgtStatus = async (id) => {
        console.log('api called',id)

        const data = {
            "activityId": id,


        }
        await api.getCgtStatus(data).then((res) => {
            console.log('-------------------res getCgtStatus', res?.data?.body)
      
           
                if (res?.data?.body?.status == 'START') {
                    props.navigation.navigate('CgtCustomer')
                } else if (res?.data?.body?.status  == 'KCY_VERIFIED') {
                    props.navigation.navigate('CreateTrustCircle')
                } else if (res?.data?.body?.status  == 'ADD_TC') {
                    props.navigation.navigate('CreateTrustCircle')
                } else if (res?.data?.body?.status  == 'TC_CREATED') {
                   props. navigation.navigate('DLESchedule')
                   
                } else if (res?.data?.body?.status  == 'FAILED') {
                    console.log('failed+++')
                   // props.navigation.navigate('EnergyUtility')
                }else if (res?.data?.body?.status  == null){
                    props.navigation.navigate('CGT')
                }
            
        }).catch((err) => {
            console.log('-------------------err  getCgtStatus', err)
        })
    };
    // ------------------ ------------------


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
               // props.navigation.navigate('ResidenceOwner')
                //props.navigation.navigate('UploadAdhaar')
                getDlePageNumber(id, res?.data?.body?.occupation,res?.data?.body)
                console.log("spose detail", res?.data?.body)

            }
        }).catch((err) => {
            setError(err?.response?.status)
            //props.navigation.navigate('ContinuingGuarantor')
            console.log('-------------------err spousedetail1', err?.response?.status)
            getDlePageNumber(id,err?.response?.status)
        })
    };


    // ------------------getDlePageNumberdetail ------------------

    const getDlePageNumber = async (id,occupation) => {
        console.log('api called')

        const data = {
            "activityId": id,


        }
        await api.getDlePageNumber(data).then((res) => {
            console.log('-------------------res getDlePageNumber', res?.data?.body)
            if (res?.status) {
                if (res?.data?.body == 1) {
                    // if (DLEStatus) {
                    //     props.navigation.navigate('CustomerDetails')
                    // } else {
                         props.navigation.navigate('DetailCheck')
                     //}
 
                 }else if (res?.data?.body == 10) {
                     props.navigation.navigate('CustomerDetails')
                   
                 }
                  else if (res?.data?.body == 2) {
                     props.navigation.navigate('ResidenceOwner')
                 } else if (res?.data?.body == 3) {
                 
                     props.navigation.navigate('ContinuingGuarantor')
                 } else if (res?.data?.body == 4) {
                     if (occupation == 500) {
                         props.navigation.navigate('UploadAdhaar')
                       
                     } else {
                         props.navigation.navigate('AddVehicle')
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
                     console.log("error handle",error)
                     if(occupation == 500){
                       //  props.navigation.navigate('IncomeDetails', { relationShip: 'Customer' })
                         props.navigation.navigate('Proceed')
                     }
                     else if (occupation !== 'UNEMPLOYED') {
                         props.navigation.navigate('IncomeDetailsSpouse', { relationShip: 'Spouse' })
                     } else{
                         props.navigation.navigate('Proceed')
                     }
                 } else if (res?.data?.body == 9) {
                     console.log("occ",occupation)
                     if (occupation == 500) {
                         props.navigation.navigate('UploadVid')
                        //
                     } else {
                         props.navigation.navigate('AddVehicle')
                     }
                    
                 } 
           
            }
        }).catch((err) => {
            console.log('-------------------err  getDlePageNumber', err)
        })
    };
    // ------------------ ------------------
    const openDialScreen = (userPhone) => {
        console.log("inside diale")
        let number = '';
        if (Platform.OS === 'ios') {
            number = `telprompt:${userPhone}`;
        } else {
            number = `tel:${userPhone}`;
        }
        Linking.openURL(number);
    };

    return (
        <>
      
            <TouchableOpacity
                style={styles.boxStyle}
                key={props?.id}
                onPress={() => {
                    if (props?.details?.purpose === 'Leads Follow Up') {
                        setModalVisible(true)
                    } else if (props?.details?.purpose === 'Explain Trust Circle') {

                        if (!props?.meet) {
                            openDialScreen(props?.phoneNumber)
                            AsyncStorage.setItem('CallActivity_id', JSON.stringify(props?.details?.activityId));
                            AsyncStorage.setItem('CallActivityDetails', JSON.stringify(props?.details));
                            console.log('hehheheheh')
                        }

                        setModalVisible(true)
                    } else if (props?.details?.purpose === 'Conduct CGT') {
                        dispatch({
                            type: 'SET_CGT_ACTIVITY_ID',
                            payload: props?.details?.activityId,
                        });
                        dispatch({
                            type: 'SET_CGT_ACTIVITY',
                            payload:props?.details,
                        });
                        dispatch({
                            type: 'SET_CUSTOMER_ID',
                            payload: props?.details?.customerId,
                        });
                       // props.navigation.navigate('CGT')
                       getCgtStatus(props?.details?.activityId)

                        console.log("activity customer id",props?.details)
                        //console.log("props passing",props?.details?.customerId)
                        
                    } else if (props?.details?.purpose === 'Conduct DLE') {
                        // setModalVisible(true)

                        getSpousedetail(item?.activityId)
                        setDetails(item)
                        // getDlePageNumber(item.activityId)
                    }

                }}
            >
                <View style={{ flex: 1, flexDirection: 'row' }}>

                    <View style={{ backgroundColor: getRandomColor(props?.phoneNumber),
                          width: 50,
                          height: 50,
                          borderRadius: 25,
                          alignItems: 'center',
                          justifyContent: 'center',
                    }}>
                        <Text style={styles.circleText}>{getInitials(props?.name)}</Text>
                    </View>

                    <View style={{ flexDirection: 'column', paddingLeft: 12, paddingTop: 5 }}>
                        <Text style={styles.nameText}>{props?.name}</Text>
                        <View style={{ flexDirection: 'row', }}>
                            <View style={{ paddingTop: 5, paddingRight: 1 }}>
                                <Icon1 name="location-outline" color={"black"} />
                            </View>
                            <Text style={[styles.idText, { paddingTop: 4 }]}>{props?.text ? props?.text : props?.village}</Text>
                        </View>
                    </View>

                </View>

                <View style={{ flexDirection: 'column', paddingTop: 5, alignItems: 'flex-end' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon2 name="phone-in-talk-outline" color={"black"} size={15} />
                        <Text style={[styles.numText, { paddingLeft: 6 }]}>
                            {props?.phoneNumber?.replace(/^.{0}/g, '', " ").slice(-10).replaceAt(3, "X").replaceAt(4, "X").replaceAt(5, "X").replaceAt(6, "X").replaceAt(7, "X")}</Text>
                    </View>
                    {props?.details?.purpose === 'Leads Follow Up' &&
                        <View
                            style={[styles.leadContainer, { backgroundColor: COLORS.LightYellow }]}>
                            <Text style={[styles.leadText, { color: COLORS.DarkYellow }]}>{t('common:LeadsFollowUp')}</Text>
                        </View>
                    }
                    {props?.details?.purpose === 'Explain Trust Circle' &&
                        <View
                            style={[styles.leadContainer, { backgroundColor: COLORS.LightPurple }]}>
                            <Text style={[styles.leadText, { color: COLORS.DarkPurple }]}>{t('common:ExplainTrustCircle')}</Text>
                        </View>
                    }

                    {props?.details?.purpose === 'Conduct CGT' &&
                        <View style={[styles.leadContainer, { backgroundColor: COLORS.LightBlue }]}>
                            <Text style={[styles.leadText, { color: COLORS.DarkBlue }]}>{t('common:ConductCGT')}</Text>
                        </View>
                    }
                    {props?.details?.purpose === 'Conduct DLE' &&
                        <View
                            style={[styles.leadContainer, { backgroundColor: COLORS.LightPurple }]}>
                            <Text style={[styles.leadText, { color: COLORS.DarkPurple }]}>Conduct DLE</Text>
                        </View>
                    }
                </View>

            </TouchableOpacity>
            <ActivityModal visible={modalVisible}
                onPressOut={() => setModalVisible(!modalVisible)}
                meet={props?.status === 'Explain Trust Circle' ? false : true}
                details={props?.details} setEnab={props?.setEnab}
            />
        </>
    )
}

const styles = StyleSheet.create({
    boxStyle: {
        backgroundColor: COLORS.colorBackground,
        borderColor: COLORS.colorBorder,
        borderRadius: 8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        elevation: 7,
        padding: 10,
        marginTop: 10,
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
    timeDropStyle: {
        fontSize: 11,
        fontFamily: FONTS.FontMedium,
        color: COLORS.colorDSText,
        paddingTop: 10,
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
    headText: {
        fontSize: 12,
        fontFamily: FONTS.FontSemiB,
        color: COLORS.colorDark,
        letterSpacing: 0.64,
        paddingTop: 5,
        paddingLeft: 8
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
export default ActiveTab;
