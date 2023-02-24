import React, { useState, useEffect, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    KeyboardAvoidingView,
    StatusBar,
    ScrollView,
    Dimensions,
    BackHandler
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
const { height, width } = Dimensions.get('screen');

const DLE = ({ navigation, set }) => {
    const isDarkMode = true;
    const [lang, setLang] = useState('')
    const [ModalVisible1, setModalVisible1] = useState(false)
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
    const handleGoBack = useCallback(() => {
        setModalVisible1(true)
        return true; // Returning true from onBackPress denotes that we have handled the event
    }, [navigation]);

    useFocusEffect(
        React.useCallback(() => {
            BackHandler.addEventListener('hardwareBackPress', handleGoBack);

            return () =>
                BackHandler.removeEventListener('hardwareBackPress', handleGoBack);
        }, [handleGoBack]),
    );

    const Data = [
        {
            id: 1,
            name: 'Athira Anil',
            number: '961XXXXX77',
            Pincode: '682555',
            Status: 'Schedule DLE',
            Initial: 'AA',
            color: 'rgba(140, 206, 194, 1)',
            color1: 'rgba(155, 81, 224, 1)',
            backgroundColor: 'rgba(155, 81, 224, 0.1)',
            width: width * 0.24
        },
        {
            id: 2,
            name: 'Aiswarya Thomas',
            number: '987XXXXX22',
            Pincode: '686666',
            Status: 'Schedule DLE',
            Initial: 'AT',
            color: 'rgba(140, 172, 206, 1)',
            color1: 'rgba(155, 81, 224, 1)',
            backgroundColor: 'rgba(155, 81, 224, 0.1)',
            width: width * 0.24
        },
        {
            id: 3,
            name: 'Elizabeth Immanuel',
            number: '828XXXXX00',
            Pincode: '686666',
            Status: 'Schedule DLE',
            Initial: 'EI',
            color: 'rgba(158, 200, 148, 1)',
            color1: 'rgba(155, 81, 224, 1)',
            backgroundColor: 'rgba(155, 81, 224, 0.1)',
            width: width * 0.24
        },
        {
            id: 4,
            name: 'Manjusha Mohan',
            number: '777XXXXX12',
            Pincode: 'Kakkanad',
            Status: 'Schedule DLE',
            Initial: 'MM',
            color: 'rgba(200, 148, 148, 1)',
            color1: 'rgba(155, 81, 224, 1)',
            backgroundColor: 'rgba(155, 81, 224, 0.1)',
            width: width * 0.24
        },
        {
            id: 5,
            name: 'Bestin Babu',
            number: '678XXXXX99',
            Pincode: 'Kakkanad',
            Status: 'TC approval pending',
            Initial: 'BB',
            color: 'rgba(200, 170, 148, 1)',
            color1: 'rgba(39, 174, 96, 1)',
            backgroundColor: 'rgba(39, 174, 96, 0.1)',
            width: width * 0.35
        },
    ]
    return (

        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, marginTop: 15 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {Data.map((item) => {
                    return (
                        <View style={[styles.viewCard, { borderColor: !status ? 'white' : status && item.id == 3 ? COLORS.colorB : 'white', borderWidth: 2 }]}>
                            <View style={[styles.circleStyle, { backgroundColor: !status ? item.color : status && item.id == 3 ? COLORS.colorB : item.color, marginLeft: width * 0.03 }]}>
                                {!status ?
                                    <Text style={styles.circleText}>{item.Initial}</Text> :
                                    status && item.id == 3 ?
                                        <Icon4 name='check' size={20} color={COLORS.colorBackground} /> :
                                        <Text style={styles.circleText}>{item.Initial}</Text>}
                                {/* // !status && item.id == 3 ?
                                // <Text style={styles.circleText}>{item.Initial }</Text>:
                                // <Icon4 name='check' size={20} color={COLORS.colorBackground}/>} */}
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                <View style={{ flexDirection: 'column', paddingLeft: 12, paddingTop: 5 }}>

                                    <Text style={styles.nameText}>{item.name}</Text>


                                    <View style={{ flexDirection: 'row', }}>
                                        <View style={{ paddingTop: 5, paddingRight: 1 }}>
                                            <Icon1 name="location-outline" color={"black"} />
                                        </View>
                                        <Text style={[styles.idText, { paddingTop: 4 }]}>{item.Pincode}</Text>
                                    </View>


                                </View>

                                <View style={{ flexDirection: 'column', top: 0, alignItems: 'flex-end', flex: 1, paddingRight: width * 0.04 }}>

                                    <Text style={[styles.numText, {}]}>{item.number}</Text>
                                    <TouchableOpacity onPress={() => {navigation.navigate('ScheduleMeet')}}
                                        // item.id === 5 ? setModalVisible1(true) : setStatus(!status) }}
                                        style={[styles.ViewExplain, { right: 0, backgroundColor: item.backgroundColor, width: item.width }]}>
                                        <Text style={[styles.explainText, { color: item.color1 }]}>{item.Status}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>

                    )
                })}
            </ScrollView>

            {!set ? <View style={{ alignItems: 'center', justifyContent: 'center', position: 'absolute', left: 0, right: 0, bottom: 0, marginBottom: 20 }}>
                <TouchableOpacity onPress={() => navigation.navigate('ScheduleMeet')}
                    style={[styles.Button1, { backgroundColor: COLORS.colorB }]}
                >
                    <Text style={[styles.textB, { color: COLORS.colorBackground }]}>Schedule DLE</Text>
                </TouchableOpacity>
            </View> : null}
            {/* <ApprovalModal ModalVisible={ModalVisible1}
                 onPressOut={() => {
                 setModalVisible1(false)}}
                //navigation.navigate('NewCgt')}}
               
                 navigation={navigation}
              //  onPressOut={() => setModalVisible(!ModalVisible)}
                setModalVisible={setModalVisible1} /> */}
            <ModalSchedule
                ModalVisible={ModalVisible1}
                setModalVisible={setModalVisible1}
                onPressOut={() => {
                    setModalVisible1(false)
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
        marginBottom: width * 0.03,
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        elevation: 2,
        shadowRadius: 7,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5
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
        color: '#9B51E0'
    },
    ViewExplain: {
        backgroundColor: 'rgba(155, 81, 224, 0.1)',
        width: width * 0.32,
        // backgroundColor:'red',
        borderRadius: 3,
        height: width * 0.06,
        alignItems: 'center',
        justifyContent: 'center'


    }
})