import React, { useState, useEffect, useCallback, useRef } from 'react';
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
    FlatList,
    Button
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS, FONTS } from '../../../Constants/Constants';
const { height, width } = Dimensions.get('screen');
// import moment from 'moment/moment';
// import { useTranslation } from 'react-i18next';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { PagerView } from 'react-native-pager-view';
import {
    addDays,
    eachWeekOfInterval,
    subDays,
    eachDayOfInterval,
    format,
    isToday,
    eachYearOfInterval,
    eachMonthOfInterval,
    addWeeks
} from 'date-fns';
// import Swiper from 'react-native-swiper'
const Cgt = () => {
    const [status, setStatus] = useState(false);
    const weekDay = [];
    const year = [];
    const ref = React.useRef(PagerView);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [DateStatus, setDateStatus] = useState(false)
    const [selectedItem1, setSelectedItem1] = useState()
    const Data = [
        {
            id: 1,
            slot: '7:00 AM',
            bgcolor: 'rgba(242, 153, 74, 1)',
            color: 'rgba(242, 153, 74, 1)'
        },
        {
            id: 2,
            slot: '7:30 AM',
            bgcolor: 'rgba(242, 153, 74, 1)',
            color: 'rgba(242, 153, 74, 1)'
        },
        {
            id: 3,
            slot: '08:00 AM',
            bgcolor: 'rgba(242, 153, 74, 1)',
            color: 'rgba(242, 153, 74, 1)'
        },
        {
            id: 4,
            slot: '08:30 AM',
            bgcolor: 'rgba(242, 153, 74, 1)',
            color: 'rgba(242, 153, 74, 1)'
        },
        {
            id: 5,
            slot: '09:00 AM',
            bgcolor: 'rgba(234, 64, 71, 1)',
            color: 'rgba(234, 64, 71, 1)'
        },
        {
            id: 6,
            slot: '09:30 AM',
            bgcolor: 'rgba(155, 81, 224, 1)',
            color: 'rgba(155, 81, 224, 1)'
        },
        {
            id: 7,
            slot: '10:00 AM',
            bgcolor: 'rgba(155, 81, 224, 1)',
            color: 'rgba(155, 81, 224, 1)'
        },
        {
            id: 8,
            slot: '10:30 AM',
            bgcolor: 'rgba(39, 174, 96, 1)',
            Color: '#808080'
        },
        {
            id: 9,
            slot: '11:00 AM',
            bgcolor: 'rgba(39, 174, 96, 1)',
            Color: '#808080'

        },
        {
            id: 10,
            slot: '11:30 AM',
            bgcolor: 'rgba(242, 153, 74, 1)',
            color: 'rgba(242, 153, 74, 1)'
        },
        {
            id: 11,
            slot: '12:00 PM',
            bgcolor: 'rgba(39, 174, 96, 1)',
            Color: '#808080'

        },
        {
            id: 12,
            slot: '12:30 PM',
            bgcolor: 'rgba(39, 174, 96, 1)',
            Color: '#808080'

        },
        {
            id: 13,
            slot: '01:00 PM',
            bgcolor: 'rgba(39, 174, 96, 1)',
            Color: '#808080'
        },
        {
            id: 14,
            slot: '01:30 PM',
            bgcolor: 'rgba(39, 174, 96, 1)',
            Color: '#808080'
        },
        {
            id: 15,
            slot: '02:00 PM',
            bgcolor: 'rgba(39, 174, 96, 1)',
            Color: '#808080'
        },
        {
            id: 16,
            slot: '02:30 PM',
            bgcolor: 'rgba(242, 153, 74, 1)',
            color: 'rgba(242, 153, 74, 1)'
        },
        {
            id: 17,
            slot: '03:00 PM',
            bgcolor: 'rgba(39, 174, 96, 1)',
            Color: '#808080'
        },
        {
            id: 18,
            slot: '03:30 PM',
            bgcolor: 'rgba(39, 174, 96, 1)',
            Color: '#808080'
        },

        {
            id: 20,
            slot: '04:00 PM',
            bgcolor: 'rgba(39, 174, 96, 1)',
            Color: '#808080'
        },
        {
            id: 21,
            slot: '04:30 PM',
            bgcolor: 'rgba(39, 174, 96, 1)',
            Color: '#808080'
        },
        {
            id: 22,
            slot: '05:00 PM',
            bgcolor: 'rgba(39, 174, 96, 1)',
            Color: '#808080'
        },
        {
            id: 23,
            slot: '05:30 PM',
            bgcolor: 'rgba(39, 174, 96, 1)',
            Color: '#808080'
        },
        {
            id: 23,
            slot: '06:00 PM',
            bgcolor: 'rgba(242, 153, 74, 1)',
            color: 'rgba(242, 153, 74, 1)'
        },
        {
            id: 24,
            slot: '06:30 PM',
            bgcolor: 'rgba(39, 174, 96, 1)',
            Color: '#808080'
        }
    ]



    const dates = eachWeekOfInterval(
        {
            start: subDays(new Date(), 14),
            end: addDays(new Date(), 14),
        },
        {
            weekStartsOn: 1,
        },
    ).reduce((acc, cur) => {
        const allDays = eachDayOfInterval({
            start: cur,
            end: addDays(cur, 4),
        });

        weekDay.push(allDays);

        return weekDay;
    });
    console.log(dates);
    console.log("current date....", currentDate)

    const ChooseDate = (day) => {
        console.log("day selection...", day)
        setSelectedItem1(day)
    }

    const renderItem = ({ item }) => {
        return (
            <View style={{ justifyContent: 'space-around', margin: 5 }}>
                <TouchableOpacity onPress={() => setStatus(!status)}
                    style={[styles.Touch, { borderColor: item.bgcolor, backgroundColor: item.id == 8 && status ? 'rgba(39, 174, 96, 1)' : COLORS.colorBackground }]}>
                    <Text style={[styles.timeText1, { color: item.id == 8 && status ? COLORS.colorBackground : item.color }]}>{item.slot}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={{}}>

            {/* <View style={{marginTop:"10%",marginBottom:20}}>
            <Swiper style={{height:50,}} 
            showsPagination={false}
            showsButtons={true}
            buttonWrapperStyle={{
                top:-296,
         
               
            }}>
                 
                {weekDay.map((week, i) => {
                    return (
                        <View key={i}>
                            <View style={styles.daterow}>
                                {week.map(day => {
                                    const txt = format(day, 'EEE');
                                    const isSelected1 = (selectedItem1 === day);
                                    console.log("text console....",isSelected1)
                                    return (

                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ flexDirection: 'column' }}>
                                   <TouchableOpacity onPress={()=>ChooseDate(day)} style={{backgroundColor:isSelected1 ? COLORS.colorB:COLORS.colorBackground,
                                    width:width*0.1,height:width*0.12,alignItems:'center',justifyContent:'center',borderRadius:10,}}>
                                                <Text style={{ color:isSelected1?  COLORS.colorBackground : '#171930',
                                                fontSize: 11,fontFamily:FONTS.FontRegular,}}>{isToday(day)
                                                    ? 'Today':txt}</Text>
                                                <Text style={{ color:isSelected1?  COLORS.colorBackground : '#171930',
                                                 fontSize: 15,fontFamily:FONTS.FontSemiB}}>{day.getDate()}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )
                                })}
                            </View>
                        </View>
                    )
                })}
                </Swiper>
       
            </View> */}

            <View style={{ margin: 20, marginRight: 40, marginLeft: 40 }}>
                {/* <Swiper 
style={{height:50,marginTop:"300%"}} 
            showsPagination={false}
            showsButtons={true}
            buttonWrapperStyle={{
               // top:-296,
         
               
            }}> */}

                {weekDay.map((week, i) => {
                    return (
                        <View key={i}>
                            <View style={styles.daterow}>
                                {week.map(day => {
                                    const txt = format(day, 'EEE');
                                    const isSelected1 = (selectedItem1 === day);
                                    console.log("text console....", isSelected1)
                                    return (

                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ flexDirection: 'column' }}>
                                                <TouchableOpacity onPress={() => ChooseDate(day)} style={{
                                                    backgroundColor: isSelected1 ? COLORS.colorB : COLORS.colorBackground,
                                                    width: width * 0.1, height: width * 0.12, alignItems: 'center', justifyContent: 'center', borderRadius: 10,
                                                }}>
                                                    <Text style={{
                                                        color: isSelected1 ? COLORS.colorBackground : '#171930',
                                                        fontSize: 11, fontFamily: FONTS.FontRegular,
                                                    }}>{isToday(day)
                                                        ? 'Today' : txt}</Text>
                                                    <Text style={{
                                                        color: isSelected1 ? COLORS.colorBackground : '#171930',
                                                        fontSize: 15, fontFamily: FONTS.FontSemiB
                                                    }}>{day.getDate()}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )
                                })}
                            </View>
                        </View>
                    )
                })}
                {/* </Swiper> */}
            </View>

            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.timeText}>Time slots</Text>
            </View>

            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <FlatList
                    data={Data}
                    style={{ marginTop: 10, }}
                    numColumns={3}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}

                />
            </View>


        </View>
    )
}

export default Cgt;

const styles = StyleSheet.create({
    timeText: {
        color: '#171930',
        fontSize: 17,
        fontFamily: FONTS.FontSemiB,

        paddingTop: width * 0.1
    },
    timeText1: {

        fontSize: 16,
        fontFamily: FONTS.FontRegular
    },
    Touch: {
        borderWidth: 1,
        width: width * 0.26,
        height: width * 0.1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
    },
    daterow: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
})