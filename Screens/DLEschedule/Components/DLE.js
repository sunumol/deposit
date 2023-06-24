import React, { useState, useEffect, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    ActivityIndicator,
    KeyboardAvoidingView,
    StatusBar,
    ScrollView,
    Dimensions,
    BackHandler,
    Alert
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS, FONTS } from '../../../Constants/Constants';
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon4 from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { t } from 'i18next';
import ApprovalModal from './ApprovalModal';
import { set } from 'date-fns';
import ModalSchedule from '../../../Components/ModalSchedule';
import ModalDLESchedule from '../../../Components/ModalDLESchedule';
const { height, width } = Dimensions.get('screen');

const DLE = ({ navigation, set, list }) => {
    console.log('====>>>********************', list)
    const isDarkMode = true;
    const [lang, setLang] = useState('')
    const [ModalVisible, setModalVisible] = useState(false)
    const [ModalVisible1, setModalVisible1] = useState(false)
    const [ModalVisible2, setModalVisible2] = useState(false)
    const [status, setStatus] = useState(false)

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const lang = await AsyncStorage.getItem('user-language')
            setLang(lang)

        } catch (e) {
            console.log(e)
        }
    }
    String.prototype.replaceAt = function (index, replacement) {
        return this.substring(0, index) + replacement + this.substring(index + replacement.length);
    }
    
    // const handleGoBack = useCallback(() => {
    //     setModalVisible1(true)
    //     return true; // Returning true from onBackPress denotes that we have handled the event
    // }, [navigation]);

    // useFocusEffect(
    //     React.useCallback(() => {
    //         BackHandler.addEventListener('hardwareBackPress', handleGoBack);

    //         return () =>
    //             BackHandler.removeEventListener('hardwareBackPress', handleGoBack);
    //     }, [handleGoBack]),
    //);



    const getRandomColor = (value) => {
        // console.log('Random',value)
         let mobilenum = value.charAt(value.length-1)
         if (mobilenum == '0'){
           var color = '#5a8ae8'
         }else if (mobilenum == '1'){
           var color ='#356e8f'
         }else if (mobilenum == '2'){
             var color ='#1a445c'
           }else if (mobilenum == '3'){
             var color ='#1a5c5a'
           }else if (mobilenum == '4'){
             var color ='#5c4c1a'
           }else if (mobilenum == '5'){
             var color = '#5a8ae8'
           }else if (mobilenum == '6'){
             var color ='#356e8f'
           }else if (mobilenum == '7'){
             var color ='#1a5c5a'
           }else if (mobilenum == '8'){
             var color ='#5c4c1a'
           }else if (mobilenum == '9'){
             var color ='#1a445c'
           }else if(value == null || '' ){
             var color = '#1a445c'
           }
        //  console.log('Random',mobilenum)
        // var letters = '0123456789ABCDEF';
        // var color = '#';
        // for (var i = 0; i < 3; i++) {
        //     color += letters[Math.floor(Math.random() * 8)];
        // }
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



    return (

        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, marginTop: 0 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{marginBottom:width*0.25}}>
             {list == '' ?
               
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1,marginTop:width*0.8 }}>
                {/* <ActivityIndicator size={30} color={COLORS.colorB} /> */}
            </View>
           
             : <>
              {list?.map((item) => {
                    return (
                        <TouchableOpacity  onPress={() => { item.dleScheduleStatus == "Conduct DLE" ? setModalVisible2(true) : item.dleScheduleStatus == "TC approval pending" ? setModalVisible(true) : navigation.navigate('ScheduleMeet',{id:item.id}) }} style={[styles.viewCard, { borderColor: 'white', borderWidth: 2 }]}>


                            <View style={[styles.circleStyle, { backgroundColor: getRandomColor(item?.mobileNumber) }]}>
                                {/* <Text numberOfLines={1} style={styles.circleText}>{(item.customerName)}</Text> */}
                                <Text numberOfLines={1} style={styles.circleText}>{getInitials(item.name)}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                <View style={{ flexDirection: 'column', paddingLeft: 12, paddingTop: 5 }}>

                                    <Text style={styles.nameText}>{item.name}</Text>


                                    <View style={{ flexDirection: 'row', }}>
                                        <View style={{ paddingTop: 5, paddingRight: 1 }}>
                                            <Icon1 name="location-outline" color={"black"} />
                                        </View>
                                        <Text style={[styles.idText, { paddingTop: 4 }]}>{item.villageOrPin}</Text>
                                    </View>


                                </View>

                                <View style={{ flexDirection: 'column', top: 0, alignItems: 'flex-end', flex: 1, paddingRight: width * 0.04 }}>

                                    <Text style={[styles.numText, {}]}>{item?.mobileNumber?.replace(/^.{0}/g, '', " ").slice(-10).replaceAt(3, "X").replaceAt(4, "X").replaceAt(5, "X").replaceAt(6, "X").replaceAt(7, "X")}</Text>
                                    <View

                                        style={[styles.ViewExplain, { right: 0, backgroundColor: item.dleScheduleStatus == "Conduct DLE" ? "rgba(186, 134, 205, 0.1)" : item.dleScheduleStatus == "TC approval pending" ? "rgba(39, 174, 96, 0.1)" : "rgba(155, 81, 224, 0.1)",width:item?.dleScheduleStatus== "TC approval pending" ? 126:item?.width}]}>
                                        <Text style={[styles.explainText, { marginHorizontal: 7, marginVertical: 1, color: item.dleScheduleStatus == "Conduct DLE" ? "rgba(242, 153, 74, 1)" : item.dleScheduleStatus == "TC approval pending" ? "rgba(39, 174, 96, 1)" : "rgba(155, 81, 224, 1)" }]}>{item.dleScheduleStatus}</Text>
                                    </View>
                                </View>
                            </View>

                        </TouchableOpacity>

                    )
                })}
                </>  
                }
                </View>
            </ScrollView>

            {/* {!set ? <View style={{ alignItems: 'center', justifyContent: 'center', position: 'absolute', left: 0, right: 0, bottom: 0, marginBottom: 20 }}>
                <TouchableOpacity onPress={() => navigation.navigate('ScheduleMeet')}
                    style={[styles.Button1, { backgroundColor: COLORS.colorB }]}
                >
                    <Text style={[styles.textB, { color: COLORS.colorBackground }]}>Schedule DLE</Text>
                </TouchableOpacity>
            </View> : null} */}




            <ApprovalModal
                ModalVisible={ModalVisible}
                onPressOut={() => {
                    setModalVisible(false)
                }}
                //navigation.navigate('NewCgt')}}

                navigation={navigation}
                //  onPressOut={() => setModalVisible(!ModalVisible)}
                setModalVisible={setModalVisible}
                list={list} />




            <ModalSchedule
               
                ModalVisible={ModalVisible1}
                setModalVisible={setModalVisible1}
                onPressOut={() => {
                    setModalVisible1(false)
                    setModalVisible(true)
                }}
                navigation={navigation} />




            <ModalDLESchedule
               
                ModalVisible={ModalVisible2}
                setModalVisible={setModalVisible2}
                onPressOut={() => {
                    setModalVisible2(false)
                   

                }}
                navigation={navigation} />
        </View>
    )
}

export default DLE;


const styles = StyleSheet.create({
    text1: {
        fontFamily: FONTS.FontRegular,
        color: '#1A051D',
        fontSize: 12
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
    textB: {
        fontFamily: FONTS.FontSemiB,
        fontSize: 14,
        //fontWeight: '700'
    },
    textBold: {
        fontSize: 12,
        color: '#1A051D',
        fontFamily: FONTS.FontBold
    },
    textReg: {
        fontSize: 12,
        color: '#1A051D',
        fontFamily: FONTS.FontRegular
    },
    viewCard1: {
        backgroundColor: COLORS.colorB,
        // width: width * 0.06,
        borderRadius: 6,
        height: width * 0.22,
        marginBottom: width * 0.03,
        //alignItems: 'center',
        flexDirection: 'row',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        elevation: 2,
        shadowRadius: 7,
        justifyContent: 'center',

        // marginLeft:50,
        // marginRight:50
    },
    ViewId: {
        backgroundColor: COLORS.colorB,
        width: 50,
        height: 50,
        marginRight: width * 0.05,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: width * 0.03
    },
    TextID: {
        fontSize: 14,
        color: COLORS.colorBackground,
        fontFamily: FONTS.FontBold
    },
    TextView: {
        paddingTop: width * 0.02,
        paddingLeft: width * 0.02,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginBottom: width * 0.03
    },
    ViewButton: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        marginRight: width * 0.03,
        marginBottom: 2
        //top:0
    },

    textConfirm: {
        color: COLORS.colorBackground,
        fontFamily: FONTS.FontBold,
        fontSize: 14,
        fontWeight: '700'
    },
    textTime: {
        fontSize: 11,
        fontFamily: FONTS.FontRegular,
        color: 'rgba(0, 0, 0, 0.54)',
        paddingBottom: width * 0.05
    },
    textActive: {
        fontSize: 12,
        color: 'rgba(26, 5, 29, 1)',
        fontFamily: FONTS.FontSemiB,
        paddingBottom: width * 0.05
    },
    viewCard: {
        backgroundColor: COLORS.colorBackground,
        width: width * 0.86,
        borderRadius: 6,
        height: width * 0.20,
        //marginBottom: width * 0.03,
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        elevation: 2,
        shadowRadius: 7,
        marginLeft: 5,
        marginRight: 5,
        marginTop: width * 0.04
    },
    circleStyle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: width * 0.03,
        marginTop: width * 0.03
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
        width: width * 0.35
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
    explainText: {
        fontSize: 11,
        fontFamily: FONTS.FontSemiB,
        color: '#9B51E0',
    
    },
    ViewExplain: {
        backgroundColor: 'rgba(155, 81, 224, 0.1)',
       // width:126,
        // backgroundColor:'red',
        borderRadius: 3,
       // height: width * 0.06,
        alignItems: 'center',
        justifyContent: 'center'


    }
})