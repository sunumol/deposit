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
import { COLORS, FONTS } from '../../../../Constants/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const { height, width } = Dimensions.get('screen');
import Image1 from '../../Images/IMG3.svg';
import Image2 from '../../Images/greenCash.svg';
import Img1 from '../../Images/p1.svg';
import Img2 from '../../Images/p2.svg';
import ComCard from './ComCard';
import { api } from '../../../../Services/Api';




const CompleteTab = ({ navigation }) => {
    const route = useRoute();
    const [Lang, setLang] = useState('')
    const { t } = useTranslation();
    const [completeloan,setCompleteloan] = useState('');
    const [pendopen,setPendopen] = useState(false)
    const [deposopen,setDeposopen] = useState(false)
   
    const [data, setData] = useState([{
        id: 1,
        title: 'Deposit Pending ₹33,000',
        badge: 3,
        color: 'rgba(235, 87, 87, 0.1)',
        open: false
    }, {
        id: 2,
        title: 'Deposited ₹15,224',
        badge: 2,
        color: 'rgba(39, 174, 96, 0.1)',
        open: false
    },

    ])


    const Data1 = [
        {
            id: 1,
            name: 'Aiswarya Thomas',
            place: 'Kakkanad',
            phone: '987XXXXX22',
            Initial: 'AT',
            Amount: '₹18,724',
            color1: 'rgba(39, 174, 96, 1)',
            color: 'rgba(148, 166, 200, 1)'
        },
        {
            id: 2,
            name: 'Anjana Thomas',
            place: 'Kakkanad',
            phone: '987XXXXX22',
            Initial: 'AT',
            Amount: '₹14,276',
            color1: 'rgba(235, 87, 87, 1)',
            color: 'rgba(148, 200, 153, 1)'
        },
    ]

    const Data2 = [
        {
            id: 1,
            name: 'Ashly James',
            place: 'Kakkanad',
            phone: '987XXXXX22',
            Initial: 'AT',
            Amount: '₹7,500',
            color1: 'rgba(39, 174, 96, 1)',
            color: 'rgba(148, 166, 200, 1)'
        },
        {
            id: 2,
            name: 'Anupama S',
            place: 'Kakkanad',
            phone: '987XXXXX22',
            Initial: 'AJ',
            Amount: '₹7,724',
            color1: 'rgba(235, 87, 87, 1)',
            color: 'rgba(200, 148, 148, 1)'
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

useEffect(()=>{
    getcompletedCollections()
},[])

       // ------------------getcompletedCollections Call Start ------------------
       async function getcompletedCollections()  {
       
        console.log('search------->>>>>123', )
        const data = {
            agentId: 1
        }

        await api.getcompletedCollections(data).then((res) => {
          console.log('------------------- getcompletedCollections res', res.data.body)
   setCompleteloan(res?.data?.body)
         
         
        })
          .catch((err) => {
            console.log('-------------------getcompletedCollections  err', err)
           
          })
      };



  


    return (
        <>

            <View style={styles.mainContainer}>
                <ComCard details={completeloan} />


         

                <View style={[styles.containerTab, { backgroundColor:  'rgba(255, 255, 255, 1)' }]}>
                           
                                    <View style={[styles.Card1, { backgroundColor: 'rgba(235, 87, 87, 0.1)' }]}>
                                        <Image1 />
                                    </View>

                                <View style={{ justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ marginLeft: width * 0.03 }}>
                                        <Text style={styles.timeText}>Deposit Pending ₹33,000 </Text>
                                    </View>

                                  
                                        <View style={[styles.Card1, { backgroundColor: 'rgba(235, 87, 87, 0.1)', marginLeft: width * 0.05 }]}>
                                            <Img2 />
                                        </View> 
                                       
                                    <View style={{ marginLeft: width * 0.025 }}>
                                        <Text style={styles.badgeText}>3</Text>
                                    </View>
                                    <View style={{ marginLeft:  width * 0.033 }}>

                                        <TouchableOpacity
                                            onPress={() => {
                                            setPendopen(!pendopen)
                                            }}
                                        >
                                            <Icon name={pendopen ? "chevron-up" :"chevron-down"}
                                                color={COLORS.colorB}
                                                size={25}
                                                style={{ paddingLeft: 13 }}

                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{ alignItems: 'center', flexDirection: 'row' }}>

                                    {/* <View style={{flex:1,alignItems:'flex-end'}}>
                     
                                    </View> */}
                                </View>
                            </View>


                            <>
                                    {pendopen &&
                                        <View>


                                            {completeloan?.depositPendingDetailsDTOS?.map((item) => {
                                                return (
                                                    <TouchableOpacity
                                                        style={styles.boxStyle} >
                                                        <View style={{ flex: 1, flexDirection: 'row' }}>

                                                            <View style={[styles.circleStyle, { backgroundColor: 'rgba(148, 166, 200, 1)' }]}>
                                                                <Text style={styles.circleText}>K</Text>
                                                            </View>

                                                            <View style={{ flexDirection: 'column', paddingLeft: 12, paddingTop: 5 }}>
                                                                <Text style={styles.nameText}>{item?.customerName}</Text>
                                                                <View style={{ flexDirection: 'row', }}>
                                                                    <View style={{ paddingTop: 5, paddingRight: 1 }}>
                                                                        <Icon1 name="location-outline" color={"black"} />
                                                                    </View>
                                                                    <Text style={[styles.idText, { paddingTop: 4 }]}>{item?.village}</Text>
                                                                </View>
                                                            </View>

                                                        </View>

                                                        <View style={{ flexDirection: 'column', paddingTop: 5, alignItems: 'flex-end' }}>
                                                            <View style={{ flexDirection: 'row' }}>
                                                                <Icon2 name="phone-call" color={"black"} size={11} style={{ top: 4 }} />
                                                                <Text style={[styles.numText, { paddingLeft: 6 }]}>{item?.mobileNumber}</Text>
                                                            </View>


                                                            <Text style={[styles.leadText, { color: item?.dueDatePassed === 'true' ? 'red' :'#000000' }]}>{item?.amount}</Text>


                                                        </View>

                                                    </TouchableOpacity>
                                                );
                                            })}

                                        </View>}

                                </>

                            <View style={[styles.containerTab, { backgroundColor: 'rgba(255, 255, 255, 1)' }]}>
                              
                                    <View style={[styles.Card1, { backgroundColor: 'rgba(39, 174, 96, 0.1)' }]}>
                                        <Image2 /></View>

                                <View style={{ justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ marginLeft: width * 0.03 }}>
                                        <Text style={styles.timeText}>Deposited ₹15,224</Text>
                                    </View>

                                 
                                        <View style={[styles.Card1, { backgroundColor: 'rgba(39, 174, 96, 0.1)', marginLeft: width * 0.155 }]}>
                                            <Img1 /></View>
                                    <View style={{ marginLeft: width * 0.025 }}>
                                        <Text style={styles.badgeText}>3</Text>
                                    </View>
                                    <View style={{ marginLeft: width * 0.036 }}>

                                        <TouchableOpacity
                                            onPress={() => {
                                                setDeposopen(!deposopen)
                                                // const nextList = [...data];
                                                // nextList[index].open = !nextList[index].open;
                                                // setData(nextList);
                                            }}
                                        >
                                            <Icon name={ deposopen ?  "chevron-up": "chevron-down"}
                                                color={COLORS.colorB}
                                                size={25}
                                                style={{ paddingLeft: 13 }}

                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{ alignItems: 'center', flexDirection: 'row' }}>

                                    {/* <View style={{flex:1,alignItems:'flex-end'}}>
                     
                                    </View> */}
                                </View>
                            </View>



                            <>
                                    {deposopen &&
                                        <View>


                                            {completeloan?.depositedDetailsDTOS?.map((item) => {
                                                return (
                                                    <TouchableOpacity
                                                        style={styles.boxStyle} >
                                                        <View style={{ flex: 1, flexDirection: 'row' }}>

                                                            <View style={[styles.circleStyle, { backgroundColor: 'rgba(148, 166, 200, 1)' }]}>
                                                                <Text style={styles.circleText}>K</Text>
                                                            </View>

                                                            <View style={{ flexDirection: 'column', paddingLeft: 12, paddingTop: 5 }}>
                                                                <Text style={styles.nameText}>{item?.customerName}</Text>
                                                                <View style={{ flexDirection: 'row', }}>
                                                                    <View style={{ paddingTop: 5, paddingRight: 1 }}>
                                                                        <Icon1 name="location-outline" color={"black"} />
                                                                    </View>
                                                                    <Text style={[styles.idText, { paddingTop: 4 }]}>{item?.village}</Text>
                                                                </View>
                                                            </View>

                                                        </View>

                                                        <View style={{ flexDirection: 'column', paddingTop: 5, alignItems: 'flex-end' }}>
                                                            <View style={{ flexDirection: 'row' }}>
                                                                <Icon2 name="phone-call" color={"black"} size={11} style={{ top: 4 }} />
                                                                <Text style={[styles.numText, { paddingLeft: 6 }]}>{item?.mobileNumber}</Text>
                                                            </View>


                                                            <Text style={[styles.leadText, { color: item?.dueDatePassed === 'true' ? 'red' :'#000000' }]}>{item?.amount}</Text>


                                                        </View>

                                                    </TouchableOpacity>
                                                );
                                            })}

                                        </View>}

                                </>

                {/* {data.map((item, index) => {
                    return (
                        <>
                       
                            {item.id === 1 ?


                                <>
                                    {item.open &&
                                        <View>


                                            {Data1.map((item) => {
                                                return (
                                                    <TouchableOpacity
                                                        style={styles.boxStyle} >
                                                        <View style={{ flex: 1, flexDirection: 'row' }}>

                                                            <View style={[styles.circleStyle, { backgroundColor: item.color }]}>
                                                                <Text style={styles.circleText}>{item.Initial}</Text>
                                                            </View>

                                                            <View style={{ flexDirection: 'column', paddingLeft: 12, paddingTop: 5 }}>
                                                                <Text style={styles.nameText}>{item.name}</Text>
                                                                <View style={{ flexDirection: 'row', }}>
                                                                    <View style={{ paddingTop: 5, paddingRight: 1 }}>
                                                                        <Icon1 name="location-outline" color={"black"} />
                                                                    </View>
                                                                    <Text style={[styles.idText, { paddingTop: 4 }]}>{item.place}</Text>
                                                                </View>
                                                            </View>

                                                        </View>

                                                        <View style={{ flexDirection: 'column', paddingTop: 5, alignItems: 'flex-end' }}>
                                                            <View style={{ flexDirection: 'row' }}>
                                                                <Icon2 name="phone-call" color={"black"} size={11} style={{ top: 4 }} />
                                                                <Text style={[styles.numText, { paddingLeft: 6 }]}>{item.phone}</Text>
                                                            </View>


                                                            <Text style={[styles.leadText, { color: item.color1 }]}>{item.Amount}</Text>


                                                        </View>

                                                    </TouchableOpacity>
                                                );
                                            })}

                                        </View>}

                                </> : item.id === 2 ?
                                    <>
                                        {item.open &&
                                            <View>


                                                {Data2.map((item) => {
                                                    return (
                                                        <TouchableOpacity
                                                            style={styles.boxStyle} >
                                                            <View style={{ flex: 1, flexDirection: 'row' }}>

                                                                <View style={[styles.circleStyle, { backgroundColor: item.color }]}>
                                                                    <Text style={styles.circleText}>{item.Initial}</Text>
                                                                </View>

                                                                <View style={{ flexDirection: 'column', paddingLeft: 12, paddingTop: 5 }}>
                                                                    <Text style={styles.nameText}>{item.name}</Text>
                                                                    <View style={{ flexDirection: 'row', }}>
                                                                        <View style={{ paddingTop: 5, paddingRight: 1 }}>
                                                                            <Icon1 name="location-outline" color={"black"} />
                                                                        </View>
                                                                        <Text style={[styles.idText, { paddingTop: 4 }]}>{item.place}</Text>
                                                                    </View>
                                                                </View>

                                                            </View>

                                                            <View style={{ flexDirection: 'column', paddingTop: 5, alignItems: 'flex-end' }}>
                                                                <View style={{ flexDirection: 'row' }}>
                                                                    <Icon2 name="phone-call" color={"black"} size={11} style={{ top: 4 }} />
                                                                    <Text style={[styles.numText, { paddingLeft: 6 }]}>{item.phone}</Text>
                                                                </View>


                                                                <Text style={[styles.leadText, { color: item.color1 }]}>{item.Amount}</Text>


                                                            </View>

                                                        </TouchableOpacity>
                                                    );
                                                })}
                                            </View>}
                                    </>
                                    : null}


                        </>
                    )
                })
                } */}
            </View>

        </>
    )
}

export default CompleteTab;


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: COLORS.colorBackground,
        alignItems: 'center',
    },
    badgeText: {
        fontSize: 12,
        fontFamily: FONTS.FontBold,
        color: COLORS.colorDark
    },
    Card1: {
        backgroundColor: 'rgba(39, 174, 96, 0.1)',
        width: 34,
        height: 34,
        borderRadius: 17,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: width * 0.02,
        marginTop: 3
    },
    PlaceText: {
        fontFamily: FONTS.FontSemiB,
        fontSize: 12,
        color: COLORS.colorDark
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
        marginTop: 15,
        borderWidth: 1,
        borderColor: COLORS.colorBorder,
        flexDirection: 'row',
        width: width * 0.90,
        //alignItems:'center',
        //justifyContent:'center'
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
        fontSize: 12,
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
    containerTab: {
        width: width * 0.90,
        backgroundColor: 'rgba(242, 242, 242, 1)',
        //elevation:2,
        flexDirection: 'row',
        marginTop: width * 0.06,
        borderWidth: 0.5,
        borderRadius: 6,
        borderColor: COLORS.colorBorder,
        alignItems: 'center',
        height: width * 0.13
        //justifyContent:'center'
    },
    timeText: {
        fontFamily: FONTS.FontSemiB,
        color: COLORS.colorDark,
        fontSize: 12
    }




})