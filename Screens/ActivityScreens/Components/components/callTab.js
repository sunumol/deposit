
;
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity,Dimensions } from 'react-native';
import { COLORS, FONTS } from '../../../../Constants/Constants';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import ActivityModal from '../components/ActiveModal';
import { useDispatch } from 'react-redux';
const { height, width } = Dimensions.get('screen');
const MeetTab = (props) => {
    
    const { t } = useTranslation();
    const [Lang, setLang] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [details, setDetails] = useState()
    const [enab,setEnab]=useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        getData()
       
    }, [])


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



    const getData = async () => {
        try {
            const lang = await AsyncStorage.getItem('user-language')
            setLang(lang)
        } catch (e) {
            console.log(e)
        }
    }



    return (
        <>
            <View style={{ marginBottom:5}}>
                <Text style={[styles.timeDropStyle, { paddingTop: props?.time ? 18 : 0 }]}>{props?.time}</Text>
                {props?.data?.map((item, index) => {
                  
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                setDetails(item)
                                dispatch({
                                    type: 'SET_CGT_ACTIVITY_ID',
                                    payload: props?.details?.activityId,
                                  });
                                item?.purpose === 'Conduct CGT' ? props.navigation.navigate('CGT'):setModalVisible(true)
                            }}
                            style={[styles.boxStyle, { marginTop: props?.time ? 10 : 0 }]} key={props?.id}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>

                                <View style={[styles.circleStyle, { backgroundColor: getRandomColor()}]}>
                                    {/* <Text numberOfLines={1} style={styles.circleText}>{(item.customerName)}</Text> */}
                                    <Text numberOfLines={1} style={styles.circleText}>{getInitials(item?.customerName)}</Text>
                                </View>

                                <View style={{ flexDirection: 'column', paddingLeft: 12, paddingTop: 5 }}>
                                    <Text style={styles.nameText}>{item?.customerName}</Text>
                                    <View style={{ flexDirection: 'row', }}>
                                        <View style={{ paddingTop: 5, paddingRight: 1 }}>
                                            <Icon1 name="location-outline" color={"black"} />
                                        </View>
                                        <Text style={[styles.idText, { paddingTop: 4 }]}>{item?.pin}</Text>
                                        {/* <TouchableOpacity onPress={()=>props.navigation.navigate('DetailCheck')}>
                           
                                </TouchableOpacity> */}
                                    </View>
                                </View>

                            </View>

                            <View style={{ flexDirection: 'column', paddingTop: 5, alignItems: 'flex-end' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon2 name="phone-in-talk-outline" color={"black"} size={15} />
                                    <Text style={[styles.numText, { paddingLeft: 6 }]}>{item?.mobileNumber}</Text>
                                </View>
                                {/* {item?.purpose == "Conduct DLE"
                                    ? <TouchableOpacity
                                        onPress={() => props.navigation.navigate('DetailCheck')}
                                        style={[styles.leadContainer, { backgroundColor: 'rgba(186, 134, 205, 0.1)' }]}>
                                        <Text style={[styles.leadText, { color: '#F2994A' }]}>Conduct DLE</Text>
                                    </TouchableOpacity>
                                    : item?.purpose == "Conduct CGT"?
                                    <TouchableOpacity style={[styles.leadContainer, { backgroundColor: props?.meet ? COLORS.LightBlue : COLORS.LightPurple }]} onPress={()=>{
                                        dispatch({
                                            type: 'SET_CGT_ACTIVITY_ID',
                                            payload: item?.activityId,
                                          });
                                          props.navigation.navigate('CGT')
                                    } }>
                                        <Text style={[styles.leadText, { color: props?.meet ? COLORS.DarkBlue : COLORS.DarkPurple }]}>{item?.purpose ? t('common:ConductCGT') : t('common:ExplainTrustCircle')}</Text>
                                    </TouchableOpacity>:null} */}
                               {item?.purpose === 'Leads Follow Up' &&
                               <TouchableOpacity onPress={()=>setModalVisible(true)}
                               style={[styles.leadContainer, { backgroundColor: COLORS.LightYellow }]}>
                                   <Text style={[styles.leadText, { color: COLORS.DarkYellow }]}>{t('common:LeadsFollowUp')}</Text>
                               </TouchableOpacity>}
                               {item?.purpose === 'Explain Trust Circle' &&
                      <TouchableOpacity onPress={()=>setModalVisible(true)}
                     style={[styles.leadContainer, { backgroundColor: COLORS.LightPurple }]}>
                        <Text style={[styles.leadText, { color: COLORS.DarkPurple }]}>{t('common:ExplainTrustCircle')}</Text>
                    </TouchableOpacity>
                }
                      {item?.purpose === 'Conduct CGT' &&
                    <TouchableOpacity onPress={()=>{
                        dispatch({
                            type: 'SET_CGT_ACTIVITY_ID',
                            payload: props?.details?.activityId,
                          });
                        props.navigation.navigate('CGT')

                    }}
                    style={[styles.leadContainer, { backgroundColor: COLORS.LightBlue }]}>
                        <Text style={[styles.leadText, { color: COLORS.DarkBlue }]}>{t('common:ConductCGT')}</Text>
                    </TouchableOpacity>
                }
                   {item?.purpose  === 'Collection' &&
                      <TouchableOpacity onPress={()=>setModalVisible(true)}
                    style={[styles.leadContainer, { backgroundColor: COLORS.LightGreen }]}>
                        <Text style={[styles.leadText, { color: COLORS.DarkGreen }]}>{t('common:CollectionFollowUp')}</Text>
                    </TouchableOpacity>
                }
                                    {/* <TouchableOpacity style={[styles.leadContainer, { backgroundColor: props?.meet ? COLORS.LightBlue : COLORS.LightPurple }]} onPress={()=>{
                                        dispatch({
                                            type: 'SET_CGT_ACTIVITY_ID',
                                            payload: item?.activityId,
                                          });
                                          props.navigation.navigate('CGT')
                                    } }>
                                        <Text style={[styles.leadText, { color: props?.meet ? COLORS.DarkBlue : COLORS.DarkPurple }]}>{props?.meet ? t('common:ConductCGT') : t('common:ExplainTrustCircle')}</Text>
                                    </TouchableOpacity>} */}

                            </View>

                        </TouchableOpacity>
                    )
                })}
                <ActivityModal visible={modalVisible} onPressOut={() => setModalVisible(!modalVisible)} meet={props.meet} details={details} setEnab={props?.setEnab}/>
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
