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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import ActivityModal from './ActivityModal';
import CalenderModal from './CalenderModal';
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/Entypo';
const { height, width } = Dimensions.get('screen');
import { useSelector } from 'react-redux';

const Activities = ({ navigation ,data}) => {
   const route = useRoute();
   // console.log("route name", data);
   // const slot = useSelector(state => state.slot)
    const isDarkMode = true
    const { t } = useTranslation();
    const [lang, setLang] = useState('')
    const [ModalVisible, setModalVisible] = useState(false)
    const [ModalVisible1, setModalVisible1] = useState(false)
    const [list,setList] = useState(data?.data)


    const Data = [
        {
            id: 1,
            name: 'Elizabeth Immanuel',
            place: '682025',
            phone: '828XXXXX00',
            Initial: 'EI',
            color: 'rgba(158, 200, 148, 1)'
        },
        {
            id: 2,
            name: 'Sismi Joseph',
            place: '682025',
            phone: '666XXXXX00',
            Initial: 'SJ',
            color: 'rgba(148, 200, 169, 1)'
        },
        {
            id: 3,
            name: 'Ashly James',
            place: '682025',
            phone: '787XXXXX00',
            Initial: 'AJ',
            color: 'rgba(148, 156, 200, 1)'
        },
        {
            id: 4,
            name: 'Joby George',
            place: '682025',
            phone: '897XXXXX55',
            Initial: 'JG',
            color: 'rgba(200, 148, 198, 1)'
        },
        {
            id: 5,
            name: 'Aparna Thomas',
            place: '682025',
            phone: '787XXXXX00',
            Initial: 'AT',
            color: 'rgba(200, 148, 148, 1)'
        }
    ]

    const CGT = [
        {
            id: 1,
            name: 'Maria Joseph',
            place: 'Palarivattom',
            phone: '787XXXXX00',
            Initial: 'MJ',
            color: 'rgba(162, 148, 200, 1)'
        },
    ]
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

    const  getRandomColor =()=> {
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
    


    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ paddingTop: width * 0.03 }}>

                    <Text style={styles.textTime}>{data?.time} ({data?.data?.length})</Text>

                    <Text style={[styles.textActive, { paddingBottom: width * 0.03 }]}>CALL</Text>

                    {list?.map((item) => {
                        console.log('------->>>>>>',item)
                        if(item.ActivityType == 'CALL'){
                        return (
                            <View style={styles.viewCard}>
                                <View style={[styles.circleStyle, { backgroundColor: getRandomColor(), marginLeft: width * 0.03 }]}>
                                    <Text style={styles.circleText}>{getInitials(item.customerName ? item.customerName : item.mobileNumber)}</Text>
                                </View>

                                <View style={{ flexDirection: 'row',justifyContent:'space-between',flex:1}}>
                                    <View style={{ flexDirection: 'column', paddingLeft: 12, paddingTop: 5 }}>

                                        <Text style={styles.nameText}>{item.customerName ? item.customerName : item.mobileNumber}</Text>


                                        <View style={{ flexDirection: 'row', }}>
                                            <View style={{ paddingTop: 5, paddingRight: 1 }}>
                                                <Icon1 name="location-outline" color={"black"} />
                                            </View>
                                            <Text style={[styles.idText, { paddingTop: 4 }]}>{item.pin}</Text>
                                        </View>


                                    </View>

                                    <View style={{ flexDirection: 'column', top: 0,alignItems:'flex-end',flex:1,paddingRight:width*0.04 }}>

                                        <Text style={[styles.numText, {  }]}>{item.mobileNumber}</Text>
                                        <View style={[styles.ViewExplain, { right: 0 }]}>
                                            <Text style={styles.explainText}> {item.purpose} </Text>
                                        </View>
                                    </View>
                                </View>
                                {/* <View style={{ flexDirection: 'column', top: -8,  }}>
               
                                      <Text style={[styles.numText, {marginLeft: width*0.1}]}>789XXXXX33</Text>
                                   
                                    <View style={styles.ViewExplain}>
                                    <Text style={styles.explainText}>Explain Trust Circle</Text>
                                    </View>
                                </View> */}
                            </View>

                        )
                            }
                    })}
                </View>

                <Text style={[styles.textActive, { paddingBottom: width * 0.03 }]}>CGT</Text>

                {list?.map((item) => {
                    console.log('CGT listing activities',item.activityType)
                    if(item.activityType == 'MEET'){
                    return (
                        <View style={styles.viewCard}>
                             <View style={[styles.circleStyle, { backgroundColor: "#A294C8", marginLeft: width * 0.03,alignItems:'center' }]}>
                                <Text style={styles.circleText}>{getInitials(item?.customerName ? item?.customerName : item?.mobileNumber)}</Text>
                            </View> 

                     
                             <View style={{ flexDirection: 'row' ,justifyContent:'space-between',flex:1,paddingRight:width*0.04}}>
                                <View style={{ flexDirection: 'column', paddingLeft: 12, paddingTop: 5, }}>

                                    <Text style={styles.nameText}>{item.customerName ? item.customerName : item?.mobileNumber}</Text>


                                    <View style={{ flexDirection: 'row', }}>
                                        <View style={{ paddingTop: 5, paddingRight: 1 }}>
                                            <Icon1 name="location-outline" color={"black"} />
                                        </View>
                                        <Text style={[styles.idText, { paddingTop: 4 }]}>{item.pin}</Text>
                                    </View>


                                </View>

                                <View style={{ flexDirection: 'column', top: 5,alignItems:'flex-end',flex:1 }}>

                                    <Text style={[styles.numText, {}]}>{item.mobileNumber}</Text>
                                    <View style={[styles.ViewExplain, { backgroundColor: item?.purpose == 'Conduct CGT' ? 'rgba(47, 128, 237, 0.1)' :'rgba(39, 174, 96, 0.1)', width: width * 0.27, marginLeft: width * 0.03 }]}>
                                        <Text style={[styles.explainText, { color: item?.purpose == 'Conduct CGT' ? 'rgba(47, 128, 237, 1)' : "#27AE60" }]}>{item?.purpose}</Text>
                                    </View>
                                </View>
                            </View> 

                        </View>
                    )
                    }
                })}


            </ScrollView>
            <View style={styles.ViewButton} >
                <TouchableOpacity style={styles.Button1} onPress={() => setModalVisible1(true)} >
                    <Icon3 size={30} color={'#FFFFFF'} name="plus" />
                </TouchableOpacity>
            </View>


            <ActivityModal
                ModalVisible={ModalVisible}

                onPressOut={() => {
                    setModalVisible(!ModalVisible)
                    navigation.navigate('SelectCustomerNewCgt')
                }}
                setModalVisible={setModalVisible}
            />


            <CalenderModal
                ModalVisible={ModalVisible1}
                onPress1={() => {
                    setModalVisible1(false)
                  //  setModalVisible(true)
                }}
                onPressOut={() => {
                    setModalVisible1(!ModalVisible1)
                    navigation.navigate('NewCgt')
                }}
                setModalVisible={setModalVisible1}
            />
        </>
    )
}

export default Activities;


const styles = StyleSheet.create({
    text1: {
        fontFamily: FONTS.FontRegular,
        color: '#1A051D',
        fontSize: 12
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
        justifyContent:'center'
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
    Button1: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(148, 166, 200, 5)',
        marginTop: width * 0.04,
        marginLeft: 12,
        marginRight: 12,
        borderRadius: 40,
        marginBottom: 20,
        borderRadius: 30
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
        height: width * 0.22,
        marginBottom: width * 0.03,
       alignItems: 'center',
        flexDirection: 'row',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        elevation: 2,
        shadowRadius: 7,
        marginLeft: 5,
        marginRight: 5
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
        width:width*0.3
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