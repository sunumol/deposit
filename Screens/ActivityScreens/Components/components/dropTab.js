
;
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../../../../Constants/Constants';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import ActivityModal from '../components/ActiveModal';
import { useDispatch } from 'react-redux';
const ActiveTab = (props) => {
    const { t } = useTranslation();
    const [Lang, setLang] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [enab, setEnab] = useState(false)
    const dispatch = useDispatch()
    const [details, setDetails] = useState()
    useEffect(() => {
        getData()
    }, [])
    const getRandomColor = () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 3; i++) {
            color += letters[Math.floor(Math.random() * 8)];
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

    // ------------------getDlePageNumberdetail ------------------

    const getDlePageNumber = async (id) => {
        console.log('api called')

        const data = {
            "activityId": id,


        }
        await api.getDlePageNumber(data).then((res) => {
            console.log('-------------------res getDlePageNumber', res?.data?.body)
            if (res?.status) {
                if (res?.data?.body == 1) {
                    props.navigation.navigate('DetailCheck')
                } else if (res?.data?.body == 2) {
                    props.navigation.navigate('ResidenceOwner')
                } else if (res?.data?.body == 3) {
                    props.navigation.navigate('ContinuingGuarantor')
                } else if (res?.data?.body == 4) {
                    props.navigation.navigate('UploadVid')
                } else if (res?.data?.body == 5) {
                    props.navigation.navigate('EnergyUtility')
                } else if (res?.data?.body == 6) {
                    props.navigation.navigate('VehicleOwn')
                } else if (res?.data?.body == 7) {
                        props.navigation.navigate('IncomeDetails', { relationShip: 'Customer' })
                    } else if (res?.data?.body == 8) {
                        props.navigation.navigate('IncomeDetails', { relationShip: 'Spouse' })
                    } else if (res?.data?.body == 9) {
                        props.navigation.navigate('HousePhoto')

                    }
                //props.navigation.navigate('DetailCheck')
            }
        }).catch((err) => {
            console.log('-------------------err  getDlePageNumber', err)
        })
    };
    // ------------------ ------------------


    return (
        <>
            <TouchableOpacity
                style={styles.boxStyle}
                key={props?.id}
                onPress={() => {
                 if(props?.details?.purpose === 'Leads Follow Up'){
                    setModalVisible(true)
                 }else if(props?.details?.purpose === 'Explain Trust Circle'){
                    setModalVisible(true)
                 }else if(props?.details?.purpose === 'Conduct CGT'){
                    dispatch({
                        type: 'SET_CGT_ACTIVITY_ID',
                        payload: props?.details?.activityId,
                    });
                   
                    //console.log("props passing",props?.details?.customerId)
                    props.navigation.navigate('CGT')
                 }else if(props?.details?.purpose === 'Conduct DLE'){
                   // setModalVisible(true)
                 
                    
                   
                    setDetails(item)
                    getDlePageNumber(item.activityId)
                 }
                
                }}
            >
                <View style={{ flex: 1, flexDirection: 'row' }}>

                    <View style={[styles.circleStyle, { backgroundColor: getRandomColor() }]}>
                        <Text style={styles.circleText}>{getInitials(props?.name)}</Text>
                    </View>

                    <View style={{ flexDirection: 'column', paddingLeft: 12, paddingTop: 5 }}>
                        <Text style={styles.nameText}>{props?.name}</Text>
                        <View style={{ flexDirection: 'row', }}>
                            <View style={{ paddingTop: 5, paddingRight: 1 }}>
                                <Icon1 name="location-outline" color={"black"} />
                            </View>
                            <Text style={[styles.idText, { paddingTop: 4 }]}>{props?.text}</Text>
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
                        <TouchableOpacity 
                            style={[styles.leadContainer, { backgroundColor: COLORS.LightYellow }]}>
                            <Text style={[styles.leadText, { color: COLORS.DarkYellow }]}>{t('common:LeadsFollowUp')}</Text>
                        </TouchableOpacity>
                    }
                    {props?.details?.purpose === 'Explain Trust Circle' &&
                        <TouchableOpacity 
                            style={[styles.leadContainer, { backgroundColor: COLORS.LightPurple }]}>
                            <Text style={[styles.leadText, { color: COLORS.DarkPurple }]}>{t('common:ExplainTrustCircle')}</Text>
                        </TouchableOpacity>
                    }

                    {props?.details?.purpose === 'Conduct CGT' &&
                        <TouchableOpacity  style={[styles.leadContainer, { backgroundColor: COLORS.LightBlue }]}>
                            <Text style={[styles.leadText, { color: COLORS.DarkBlue }]}>{t('common:ConductCGT')}</Text>
                        </TouchableOpacity>
                    }
                    {props?.details?.purpose === 'Conduct DLE' &&
                        <TouchableOpacity 
                            style={[styles.leadContainer, { backgroundColor: COLORS.LightPurple }]}>
                            <Text style={[styles.leadText, { color: COLORS.DarkPurple }]}>Conduct DLE</Text>
                        </TouchableOpacity>
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
export default ActiveTab;
