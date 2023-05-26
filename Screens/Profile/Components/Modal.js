import React, { useState, useEffect } from "react";

import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from 'react-i18next';
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
// ------------------- Component Imports --------------------
import { COLORS, FONTS } from '../../../Constants/Constants';
import { api } from '../../../Services/Api'

// ---------- Image Imports ------------------------
import Image1 from '../../../assets/image/call.svg';
import Disable from '../../../assets/disable.svg'
import Enable from '../../../assets/enable.svg'

const { height, width } = Dimensions.get('screen');

const CallModal = ({ ModalVisible, onPressOut }) => {

    const { t } = useTranslation();


    const [enableContinue, setEnableContinue] = useState(false)
    const [selectedCallData, setSelectedCallData] = useState()
    const [id, setId] = useState()

    String.prototype.replaceAt = function (index, replacement) {
        return this.substring(0, index) + replacement + this.substring(index + replacement.length);
    }
    { console.log('----datra--', selectedCallData) }

    // ------------------ Activity Update Api Call Start ------------------
    const updateActivity = async () => {
        const data = {
            "employeeId": 1,
            "activityStatus": id,
            "activityId": selectedCallData?.activityId

        };
        await api.updateActivity(data).then((res) => {
            console.log('-------------------res update', res?.data)
            // if(res)
            AsyncStorage.removeItem('CallActivity')
            AsyncStorage.removeItem('CallActivityDetails')
            onPressOut();
            setEnableContinue(false)
        })
            .catch((err) => {
                console.log('-------------------err123', err)
            })
    };
    // ------------------ Activity Update Api Call End ------------------

    const selectstatus = (value) => {
        setId(value)
        console.log('activity', value)
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

    useEffect(() => {
        AsyncStorage.getItem("CallActivityDetails").then((value) => {
            setSelectedCallData(JSON.parse(value))
        })
    }, [])
    const [data, setData] = useState([
        {
            id: "Not interested",
            title: t('common:Notinterested'),
            checked: false
        },
        {
            id: "Not reachable",
            title: t('common:Notreachable'),
            checked: false
        },
        {
            id:'Explain Trust Circle',
            title: t('common:ExplainedTrustCircle'),
            checked: false
        }
    ])

    return (

        <Modal
            animationType="fade"
            transparent={true}
            visible={ModalVisible}>

            <View style={styles.mainContainer} >
                <View style={styles.modalContainer}>
                    <View style={{ paddingTop: width * 0.065, alignItems: 'center' }}>
                        <Image1 />
                    </View>
                    <View>
                        <Text style={[styles.textdesc,
                        { fontFamily: FONTS.FontBold, paddingTop: width * 0.06, }]}>Your last call status has not </Text>
                        <Text style={[styles.textdesc,
                        { fontFamily: FONTS.FontBold }]}>been updated.</Text>
                    </View>

                    <Text style={[styles.textdesc, { paddingTop: height * 0.01 }]}>{t('common:statusModal2')}</Text>

                    <View
                        style={{
                            flexDirection: 'row',
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            marginBottom: 30,
                            marginHorizontal: 16,
                            borderRadius: 8,
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            elevation: 5,
                            shadowRadius: 2,
                            backgroundColor: COLORS.colorBackground,
                            marginTop: height * 0.03
                        }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={[styles.circleStyle, { backgroundColor: '#94BCC8' }]}>
                                <Text numberOfLines={1} style={styles.circleText}>{getInitials(selectedCallData?.customerName)}</Text>
                            </View>
                            {console.log('---customerName', selectedCallData?.purpose)}
                            <View style={{ flexDirection: 'column', paddingLeft: 12, paddingTop: 5 }}>
                                <Text style={styles.nameText}>{selectedCallData?.customerName}</Text>
                                <View style={{ flexDirection: 'row', }}>
                                    <View style={{ paddingTop: 5, paddingRight: 1 }}>
                                        <Icon1 name="location-outline" color={"black"} />
                                    </View>
                                    <Text style={[styles.idText, { paddingTop: 4 }]}>{selectedCallData?.pin}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <View style={{ flexDirection: 'row', paddingTop: 4, alignSelf: 'flex-end' }}>
                                <Icon2 name="phone-in-talk-outline" color={"black"} size={15} />
                                <Text style={[styles.numText, { paddingLeft: 6 }]}>{selectedCallData?.mobileNumber?.replace(/^.{0}/g, '').slice(-10)?.replaceAt(3, "X")?.replaceAt(4, "X")?.replaceAt(5, "X")?.replaceAt(6, "X")?.replaceAt(7, "X")}</Text>
                            </View>
                            <View style={[styles.leadContainer, { backgroundColor: COLORS.LightPurple, alignSelf: 'flex-end' }]}>
                                <Text style={[styles.leadText, { color: COLORS.DarkPurple }]}>{t('common:ExplainTrustCircle')}</Text>
                            </View>
                        </View>

                    </View>
                    {data.map((item, index) => {
                        return (
                            <>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        paddingHorizontal: 20,
                                        marginRight: 10
                                    }}>

                             {index === 2 && selectedCallData?.purpose == 'Explain Trust Circle'
                                   ? <Text style={styles.textStyle}>{selectedCallData?.purpose == 'Explain Trust Circle'?item.title:'Eligibility not checked'}</Text>
                                   :<Text style={styles.textStyle}>{item.title}</Text>
                                }

                                    {enableContinue && id && item.id === id
                                        ? <Enable width={18} height={18} onPress={() => {
                                            setEnableContinue(false)
                                            setId()

                                        }} />
                                        : <Disable width={18} height={18} onPress={() => {
                                            setEnableContinue(true)
                                            setId(index === 2 ? selectedCallData?.purpose !== 'Explain Trust Circle'?item.id:'Eligibility not checked':item.id)
                                            selectstatus(item.id)

                                        }
                                        } />
                                    }
                                </View>
                                {index !== 2
                                    ? <View style={styles.lineView} />
                                    : <View style={{ marginTop: 10 }} />}
                            </>
                        )
                    })}

                    <TouchableOpacity
                        style={[styles.continueView, { backgroundColor: id ? COLORS.colorB : COLORS.colorBorder }]}
                        onPress={() => { updateActivity() }}
                        disabled={id ? false : true}>
                        <Text style={[styles.continueText, { color: id ? COLORS.colorBackground : COLORS.colorWhite2 }]}>{t('common:Submit')}</Text>
                    </TouchableOpacity>


                </View>
            </View>
        </Modal>

    );
};

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "#000000aa",
        flex: 1,
        justifyContent: 'center'
    },
    modalContainer: {
        marginHorizontal: 16,
        backgroundColor: COLORS.colorBackground,
        borderRadius: 20,
    },
    textStyle: {
        fontFamily: FONTS.FontRegular,
        color: COLORS.colorDark,
        fontWeight: '600',
        textAlign: "center",
        fontSize: 15
    },
    buttonStyle: {
        backgroundColor: COLORS.colorB,
        height: 46,
        borderRadius: 54,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: width * 0.07,
        marginBottom: 21
    },
    buttonTextStyle: {
        color: COLORS.colorBackground,
        fontFamily: FONTS.FontRegular,
        fontWeight: '700',
        fontSize: 14,
        letterSpacing: 0.64,
    },
    textLoan: {
        color: "#1A051D",
        fontFamily: FONTS.FontRegular,
        fontSize: 14,
        paddingLeft: width * 0.02
    },
    textReq: {
        fontFamily: FONTS.FontSemiB,
        fontWeight: '600',
        color: "#3B3D43",
        paddingTop: width * 0.05
    },
    TextSub: {
        fontSize: 14,
        color: "#1A051D",
        fontFamily: FONTS.FontRegular
    },
    ViewDesc: {
        width: width * 0.8,
        height: width * 0.18,
        backgroundColor: "#F2F2F2",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
    },
    textdesc: {
        fontSize: 14,
        textAlign: 'center',
        color: "#1A051D",
        fontFamily: FONTS.FontRegular,
    },
    statusText: {
        fontSize: 14,
        fontFamily: FONTS.FontBold,
        color: COLORS.colorBlack,
        textAlign: 'center',
        paddingTop: 20,
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
    textStyle: {
        fontSize: 14,
        fontFamily: FONTS.FontRegular,
        color: COLORS.colorDark,
    },
    continueText: {
        textAlign: 'center',
        fontFamily: FONTS.FontBold,
        fontSize: 14,
        letterSpacing: 0.64,
        color: COLORS.colorBackground
    },
    continueView: {
        height: 48,
        borderRadius: 43,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.colorB,
        marginVertical: 22,
        marginHorizontal: 15,
    },
    lineView: {
        borderWidth: 0.9,
        borderColor: COLORS.Gray6,
        backgroundColor: COLORS.Gray6,
        opacity: 0.5,
        marginVertical: 20
    },
    leadText: {
        fontSize: 11,
        fontFamily: FONTS.FontSemiB,
    },
    leadContainer: {
        padding: 4,
        borderRadius: 3,
        marginTop: 2,
    },
});

export default CallModal;