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
    BackHandler,
    ActivityIndicator
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
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

String.prototype.replaceAt = function (index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}


const CompleteTab = ({ navigation }) => {
    const route = useRoute();
    const [Lang, setLang] = useState('')
    const { t } = useTranslation();
    const dispatch = useDispatch()
    const [completeloan,setCompleteloan] = useState('');
    const [pendopen,setPendopen] = useState(false)
    const [deposopen,setDeposopen] = useState(false)
    const [deposittime, setdeposittime] = useState('');
    const [hoursleft, sethoursleft] = useState('');
    const [completedcollectionstatus, setcompletedcollectionstatus] = useState(false);
   
 


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
        const id = await  AsyncStorage.getItem("CustomerId")
        console.log('search------->>>>>123', )
        const data = {
            agentId: id
        }

        await api.getcompletedCollections(data).then((res) => {
          console.log('------------------- getcompletedCollections res', res.data.body)
            setCompleteloan(res?.data?.body)
            setcompletedcollectionstatus(true)
            const dateToday = new Date();
            const dateExpired = new Date((new Date(res?.data?.body?.firstCollectionTime)));
            var Difference_In_Time = dateExpired.getTime() - dateToday.getTime();
            setdeposittime(Difference_In_Time)
            var seconds = moment.duration(Difference_In_Time).seconds();
            var minutes = moment.duration(Difference_In_Time).minutes();
            var hours = Math.trunc(moment.duration(Difference_In_Time).asHours());
            sethoursleft(hours)
            console.log('date checking',dateToday,'[]',dateExpired,'[]',Difference_In_Time,'[][][]',hours)
        })
          .catch((err) => {
            console.log('-------------------getcompletedCollections  err', err)
           
          })
      };



  


    return (
        <>
{
    completedcollectionstatus ? 
    <View style={styles.mainContainer}>
    <ComCard details={completeloan} hoursleft={hoursleft} deposittime={deposittime} />





               <View style={[styles.containerTab]}>
               
                        <View style={{flex:8,flexDirection:'row' ,justifyContent:'space-around'}}>
                        <View style={styles.Card1}>
                            <Image1 />
                        </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center',flex:4 }}>
                        <View style={{ marginLeft: width * 0.03,alignItems:'center',flexDirection:'row' }}>
                            <Text style={styles.timeText}>Deposit Pending ₹{completeloan?.depositPendingSum} </Text>
                           
                           
                        {/* <View style={{ marginLeft: width * 0.025 }}> */}
                                
                        </View>
                        
                        </View>

                        <View style={{justifyContent:'center',alignItems:'center',flexDirection:'row',flex:1.2,marginRight: width * 0.01}} >
                        <View style={[styles.Card1, { backgroundColor: 'rgba(235, 87, 87, 0.1)',marginRight:5 }]}>
                                <Img2 />
                            </View> 
                                    <Text style={styles.badgeText}>{completeloan?.depositPendingDetailsDTOS?.length}</Text>
                                </View>
                         
                  
                    </View>
                    <View style={{ flex:1,marginRight:width * 0.03}}>

                            <TouchableOpacity
                                onPress={() => {
                                setPendopen(!pendopen)
                                setDeposopen(false)
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


                <>
                        {pendopen &&
                            <View>


                                {completeloan?.depositPendingDetailsDTOS?.map((item) => {
                                    return (
                                        <TouchableOpacity
                                        onPress={()=>{navigation.navigate('Collection'),
                                        dispatch({
                                            type: 'SET_SELECTED_LOANCUSTOMERID',
                                            payload: item?.customerId,
                                          });}}
                                            style={styles.boxStyle} >
                                            <View style={{ flex: 1, flexDirection: 'row' }}>

                                                <View style={[styles.circleStyle, { backgroundColor: getRandomColor(item?.mobileNumber)}]}>
                                                    <Text style={styles.circleText}>{getInitials(item?.customerName)}</Text>
                                                </View>

                                                <View style={{ flexDirection: 'column', paddingLeft: 12, paddingTop: 5 }}>
                                                    <Text style={styles.nameText}>{item?.customerName}</Text>
                                                    <View style={{ flexDirection: 'row', }}>
                                                        <View style={{ paddingTop: 5, paddingRight: 1 }}>
                                                            <Icon1 name="location-outline" color={"black"} />
                                                        </View>
                                                        <Text style={[styles.idText, { paddingTop: 3 }]}>{item?.village ? item?.village : 'Other'}</Text>
                                                    </View>
                                                </View>

                                            </View>

                                            <View style={{ flexDirection: 'column', paddingTop: 5, alignItems: 'flex-end' }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Icon2 name="phone-call" color={"black"} size={11} style={{ top: 4 }} />
                                                    <Text style={[styles.numText, { paddingLeft: 6 }]}>{item?.mobileNumber?.replace(/^.{0}/g, '', " ").slice(-10).replaceAt(3, "X").replaceAt(4, "X").replaceAt(5, "X").replaceAt(6, "X").replaceAt(7, "X")}</Text>
                                                </View>


                                                <Text style={[styles.leadText, { color: item?.dueDatePassed === 'true' ? 'red' :'#000000' }]}>₹{item?.amount ? item?.amount : 0}</Text>


                                            </View>

                                        </TouchableOpacity>
                                    );
                                })}

                            </View>}

                    </>

          


                <View style={[styles.containerTab]}>
               
               <View style={{flex:8,flexDirection:'row' ,justifyContent:'space-around'}}>
               <View style={styles.Card1}>
               <Image2 />
               </View>

           <View style={{ flexDirection: 'row', alignItems: 'center',flex:4 }}>
               <View style={{ marginLeft: width * 0.03,alignItems:'center',flexDirection:'row' }}>
                   <Text style={styles.timeText}>Deposited ₹{completeloan?.depositedSum} </Text>
                  
                  
               {/* <View style={{ marginLeft: width * 0.025 }}> */}
                       
               </View>
               
               </View>

               <View style={{justifyContent:'center',alignItems:'center',flexDirection:'row',flex:1.2,marginRight: width * 0.01}} >
               <View style={[styles.Card1, { backgroundColor: 'rgba(39, 174, 96, 0.1)',marginRight:5 }]}>
               <Img1 />
                   </View> 
                           <Text style={styles.badgeText}>{completeloan?.depositedDetailsDTOS?.length}</Text>
                       </View>
                
         
           </View>
           <View style={{ flex:1,marginRight:width * 0.03}}>

                   <TouchableOpacity
                       onPress={() => {
                        setDeposopen(!deposopen)
                        setPendopen(false)
                       }}
                   >
                       <Icon name={deposopen ? "chevron-up" :"chevron-down"}
                           color={COLORS.colorB}
                           size={25}
                           style={{ paddingLeft: 13 }}

                       />
                   </TouchableOpacity>
               </View>
       </View>



                <>
                        {deposopen &&
                            <View>


                                {completeloan?.depositedDetailsDTOS?.map((item) => {
                                    return (
                                        <TouchableOpacity
                                        onPress={()=>{navigation.navigate('Collection'),
                                        dispatch({
                                            type: 'SET_SELECTED_LOANCUSTOMERID',
                                            payload:item?.customerId,
                                          });}}
                                            style={styles.boxStyle} >
                                            <View style={{ flex: 1, flexDirection: 'row' }}>

                                                <View style={[styles.circleStyle, { backgroundColor: getRandomColor(item?.mobileNumber)}]}>
                                                    <Text style={styles.circleText}>{getInitials(item?.customerName)}</Text>
                                                </View>

                                                <View style={{ flexDirection: 'column', paddingLeft: 12, paddingTop: 5 }}>
                                                    <Text style={styles.nameText}>{item?.customerName}</Text>
                                                    <View style={{ flexDirection: 'row', }}>
                                                        <View style={{ paddingTop: 5, paddingRight: 1 }}>
                                                            <Icon1 name="location-outline" color={"black"} />
                                                        </View>
                                                        <Text style={[styles.idText, { paddingTop: 3 }]}>{item?.village ? item?.village : 'Other'}</Text>
                                                    </View>
                                                </View>

                                            </View>

                                            <View style={{ flexDirection: 'column', paddingTop: 5, alignItems: 'flex-end' }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Icon2 name="phone-call" color={"black"} size={11} style={{ top: 4 }} />
                                                    <Text style={[styles.numText, { paddingLeft: 6 }]}>{item?.mobileNumber?.replace(/^.{0}/g, '', " ").slice(-10).replaceAt(3, "X").replaceAt(4, "X").replaceAt(5, "X").replaceAt(6, "X").replaceAt(7, "X")}</Text>
                                                </View>


                                                <Text style={[styles.leadText, { color: item?.dueDatePassed === 'true' ? 'red' :'#000000' }]}>₹{item?.amount ? item?.amount : 0 }</Text>


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
</View> :
<View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, }}>
                    <ActivityIndicator size={30} color={COLORS.colorB} />
</View>
}
           

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
        color: COLORS.colorDark,
        marginTop:2.5
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
        //flex:1,
        width: width * 0.90,
        backgroundColor: 'rgba(242, 242, 242, 1)',
       // backgroundColor:'green',
        flexDirection: 'row',
        marginTop: width * 0.06,
        borderWidth: 0.5,
        borderRadius: 6,
        borderColor: COLORS.colorBorder,
        justifyContent:'space-between',
        alignItems: 'center',
        height: width * 0.13,
        //justifyContent:'center'
    },
    timeText: {
        fontFamily: FONTS.FontSemiB,
        color: COLORS.colorDark,
        fontSize: 12
    }




})