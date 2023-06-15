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
import { CheckBox } from 'react-native-elements/dist/checkbox/CheckBox';
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Search from 'react-native-vector-icons/Feather';
import Image1 from '../../../assets/Images/cakes.svg';
import { api } from '../../../Services/Api';
import { useDispatch ,useSelector} from 'react-redux';

const { height, width } = Dimensions.get('screen');

const Details = ({ navigation, details, spouse }) => {
    console.log('====', details)
    const isDarkMode = true;
    const [text, onChangeText] = useState('');
    const [ModalVisible, setModalVisible] = useState(false)
    const [selectedItem, setSelectedItem] = useState()
    const [ButtonStatus, setButtonStatus] = useState(false)
    const [ModalError, setModalError] = useState(false)
    const [ModalReason, setModalReason] = useState(false)
    const [checked, setChecked] = useState(false);
    const [LastPage,setLastPage] = useState()
    const dispatch = useDispatch()
    const activityId = useSelector(state => state.activityId);

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

    const onsubmit = async (value) => {

        console.log('api called')
        const data = {
            "customerId": details?.customerId,
            "customerName": details?.customerName,
            "address": details?.address,
            "district": details?.district,
            "village":details?.village,
            "accessRoadType": details?.accessRoadType,
            "postOffice":  details?.postOffice,
            "landMark":  details?.landMark,
            "pin": details?.pin
        }
        console.log("details check details",data)
        await api.savebasicdetail(data).then((res) => {
            console.log('-------------------res update', res?.data)
            if (res?.status) {
                dispatch({
                    type: 'SET_DLE_STATUS',
                    payload:true
                  });
                navigation.navigate('ResidenceOwner')
              // navigation.navigate('VehicleOwn') 
            }
        }).catch((err) => {
            console.log('-------------------err update', err?.response)
        })
    };


    const getLastPage = async () => {
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
        getLastPage()
    },[])

    return (

        <>
            <View style={styles.mainContainer}>
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View style={styles.searchBox}>
                        <View style={styles.boxStyle}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>

                                <View style={[styles.circleStyle, { backgroundColor: 'rgba(105, 121, 248, 1)' }]}>
                                    <Text style={styles.circleText}>{getInitials(details?.customerName)}</Text>
                                </View>

                                <View style={{ flexDirection: 'column', paddingLeft: 12, paddingTop: 5 }}>
                                    <Text style={styles.nameText}>{details?.customerName}</Text>
                                    <View style={{ flexDirection: 'row', }}>
                                        <View style={{ paddingTop: 5, paddingRight: 1 }}>
                                            <Icon1 name="location-outline" color={"black"} />
                                        </View>
                                        <Text style={[styles.idText, { paddingTop: 4 }]}>{details?.pin}</Text>
                                    </View>
                                </View>

                            </View>

                            <View style={{ flexDirection: 'column', paddingTop: 5, alignItems: 'flex-end' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon2 name="phone-in-talk-outline" color={"black"} size={15} />
                                    <Text style={[styles.numText, { paddingLeft: 6 }]}>{details?.mobile?.replace(/^.{0}/g, '', " ").slice(-10).replaceAt(3, "X").replaceAt(4, "X").replaceAt(5, "X").replaceAt(6, "X").replaceAt(7, "X")}</Text>
                                </View>
                            </View>

                        </View>
                        <View style={styles.lineView} />
                        <View style={{ paddingLeft: 15, paddingRight: 25, flexDirection: 'row' }}>
                            <View style={{ flex: 1.2, marginTop: width * 0.009 }}>
                                <Text style={styles.headTextTitle}>Address</Text>
                            </View>
                            <View style={{ flex: 2, flexWrap: 'wrap' }}>
                                <Text style={[styles.subText, { maxWidth: 200 }]}>{details?.address ? details?.address : '-'} </Text>
                            </View>

                        </View>
                        <View style={styles.lineView} />
                        <View style={{ paddingHorizontal: 17, }}>
                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                <View style={{ flex: 1.2, marginTop: width * 0.0009 }}>
                                    <Text style={styles.headTextTitle}>District</Text>
                                </View>
                                <View style={{ flex: 2 }}>
                                    <Text style={styles.subText}>{details?.district}</Text>
                                </View>


                            </View>


                            {/* <Success height={23} width={24} /> */}
                        </View>
                        <View style={styles.lineView} />
                        <View style={{ paddingLeft: 15, paddingRight: 25, flexDirection: 'row' }}>
                            <View style={{ flex: 1.2, marginTop: width * 0.009 }}>
                                <Text style={styles.headTextTitle}>Village</Text>
                            </View>
                            <View style={{ flex: 2 }}>
                                <Text style={styles.subText}>{details?.village}</Text>
                            </View>


                        </View>

                        <View style={styles.lineView} />
                        <View style={{ paddingLeft: 15, paddingRight: 25, paddingBottom: 16, flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 1.2, marginTop: width * 0.0065 }}>
                                <Text style={styles.headTextTitle}>Access road</Text>
                                <Text style={styles.headTextTitle}>type</Text>
                            </View>
                            <View style={{ flex: 2 }}>
                                <Text style={styles.subText}>{details?.accessRoadType}</Text>
                            </View>


                        </View>


                        <View style={styles.lineView} />
                        <View style={{ paddingLeft: 15, paddingRight: 25, paddingBottom: 16, flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 1.2, marginTop: width * 0.0065 }}>
                                <Text style={styles.headTextTitle}>Post Office</Text>
                            </View>
                            <View style={{ flex: 2 }}>
                                <Text style={styles.subText}>{details?.postOffice}</Text>
                            </View>


                        </View>


                        <View style={styles.lineView} />
                        <View style={{ paddingLeft: 15, paddingRight: 25, paddingBottom: 16, flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 1.2, marginTop: width * 0.0065 }}>
                                <Text style={styles.headTextTitle}>Landmark</Text>
                            </View>
                            <View style={{ flex: 2 }}>
                                <Text style={styles.subText}>{details?.landMark}</Text>
                            </View>


                        </View>

                    </View>

                    {spouse ?
                        <>
                            <View style={{ marginTop: width * 0.05 }}>
                                <Text style={styles.TextSp}>Spouse details</Text>
                            </View>

                            <View style={styles.containerBox}>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={[styles.circleView, { backgroundColor: 'rgba(117, 181, 195, 1)' }]}>
                                        <Text style={styles.shortText}>{getInitials(spouse?.name)}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'column', flex: 1, marginLeft: 12 }}>
                                        <Text style={styles.nameText}>{spouse?.name}</Text>

                                        <Text style={[styles.underText,{textTransform:'capitalize'}]}>{spouse?.occupation?.replace(/_/g, ' ')}</Text> 
        

                                    </View>
                                    <View style={{ flexDirection: 'row', }}>
                                        <Image1 width={11} height={11} top={3} />
                                        <Text style={styles.dateText}>{spouse?.dateOfBirth}</Text>
                                    </View>
                                </View>
                            </View>
                        </> : null}
                </ScrollView>

                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => onsubmit()}
                        style={[styles.Button1, { backgroundColor: COLORS.colorB }]}
                    >
                        <Text style={[styles.text1, { color: COLORS.colorBackground }]}>{LastPage ? 'Confirm' :'Continue' }</Text>
                    </TouchableOpacity>
                </View>
            </View>




        </>
    )
}

export default Details;

const styles = StyleSheet.create({
    TextCheck: {
        fontSize: 12,
        fontFamily: FONTS.FontRegular,
        color: '#3B3D43'
    },
    TextSp: {
        fontFamily: FONTS.FontSemiB,
        color: 'rgba(0, 0, 0, 1)',
        fontSize: 14
    },
    NAMEFont: {
        color: 'rgba(26, 5, 29, 1)',
        fontSize: 14,
        fontFamily: FONTS.FontSemiB
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
        marginBottom: 0
    },
    text1: {
        fontFamily: FONTS.FontBold,
        fontSize: 14,
        fontWeight: '700'
    },
    searchText1: {
        color: '#808080',
        fontSize: 15,
        fontFamily: FONTS.FontRegular,
        marginLeft: 15
    },
    cardView2: {
        backgroundColor: COLORS.colorBackground,
        width: width * 0.90,
        height: width * 0.2,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: width * 0.03,
        borderColor: 'rgba(236, 235, 237, 1)',
        flexDirection: 'row'
    },
    container1: {
        flex: 0,
        backgroundColor: "#002B59",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    borderVillage: {
        borderRadius: 8,
        borderWidth: 1,
        width: width * 0.80,
        height: width * 0.12,
        borderColor: 'rgba(236, 235, 237, 1)',
        marginTop: width * 0.02,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    mainContainer: {
        flex: 1,
        //paddingHorizontal: 20,
        backgroundColor: COLORS.colorBackground
    },
    editView: {
        borderRadius: 48,
        backgroundColor: COLORS.colorLight,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 13,
        paddingVertical: 6
    },
    contentView: {
        flexDirection: 'column',
    },
    boxView: {
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.colorBorder,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    timeText: {
        fontSize: 12,
        fontFamily: FONTS.FontSemiB,
        color: COLORS.colorB,
    },

    changeText: {
        fontSize: 12,
        fontFamily: FONTS.FontMedium,
        color: COLORS.colorB,
        paddingLeft: 8
    },
    searchBox: {

        borderWidth: 1,
        borderColor: COLORS.colorBorder,
        borderRadius: 8,
        marginTop: 20,


    },

    lineView: {
        borderWidth: 0.6,
        borderColor: COLORS.Gray6,
        backgroundColor: COLORS.Gray6,
        opacity: 0.5,
        marginTop: 13,
        marginBottom: 16
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
    buttonView: {

        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 54,
        height: 48,
        marginBottom: 20,
        width: '48%'
    },
    continueText: {
        fontSize: 14,
        fontFamily: FONTS.FontBold,

        letterSpacing: 0.64
    },
    boxStyle: {
        paddingHorizontal: 15,
        paddingTop: 12,
        flexDirection: 'row'
    },
    circleStyle: {
        width: 40,
        height: 40,
        borderRadius: 20,
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
    headTextTitle: {
        fontSize: 13,
        fontFamily: FONTS.FontSemiB,
        color: COLORS.colorDark,
    },
    subText: {
        fontSize: 12,
        fontFamily: FONTS.FontRegular,
        color: COLORS.colorDark,
        paddingTop: 3
    },
    Button16: {
        width: width * 0.87,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.colorB,
        marginTop: 31,
        flexDirection: 'row',
        // marginLeft: 12,
        // marginRight: 12,
        borderRadius: 40,
        marginBottom: 20
    },
    viewCard: {
        backgroundColor: COLORS.colorBackground,
        width: width * 0.92,
        borderRadius: 8,
        height: width * 0.22,
        marginBottom: width * 0.03,
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        elevation: 2,
        shadowRadius: 7,
        marginTop: width * 0.045
    },
    NumTexts: {
        color: '#1A051D',
        fontFamily: FONTS.FontRegular,
        fontSize: 12
    },
    buttonView: {

        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 54,
        height: 48,
        marginBottom: 20,
        width: '48%'
    },
    continueText: {
        fontSize: 14,
        fontFamily: FONTS.FontBold,
        color: COLORS.colorBackground,
        letterSpacing: 0.64
    },
    containerBox: {
        marginTop: 20,
        flexDirection: 'row',
        backgroundColor: COLORS.colorBackground,
        shadowColor: 'rgba(0, 0, 0, 0.4)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        elevation: 5,
        shadowRadius: 7,
        borderRadius: 8,
        marginRight: 15,
        marginLeft: 2,
        alignItems: 'center',
        marginBottom: 14,
        width: width * 0.88,
        height: width * 0.18
    },
    circleView: {
        width: 40,
        height: 40,

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


})