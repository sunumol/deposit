
import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment'
import { COLORS, FONTS } from '../../../Constants/Constants';
import Icon1 from 'react-native-vector-icons/SimpleLineIcons'
const width = Dimensions.get('window').width * 0.15
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
const CalendarStrips = ({ callback,setNewDates,NewDates,getCGTslot}) => {

  const dispatch = useDispatch()
  console.log("state passed",setNewDates,NewDates,getCGTslot)
  //------------------------------------------------------- SetState ----------------------------------------
  const [Month, setMonth] = useState(new Date())
  const [StartDay, setStartDay] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() + 29)))
  const [dateList, setDateList] = useState([])
  const [initialDate, setInitialDate] = useState()
  const flatListRef = useRef(FlatList);
  const [index, setIndex] = useState(0)
  const [enable, setEnabled] = useState(false)
  const [ArrowEnable, setArrowEnable] = useState(false)
  const [NewDate, setNewDate] = useState(new Date())
  const [MonthStatus, setMonthStatus] = useState(false)
  const [ArrowRight, setArrowRight] = useState(true)


  useEffect(() => {
    const dates = getDatesBetween(StartDay, endDate);
    console.log(dates, dates.length)
    console.log("endDate.....", endDate)
    setDateList(dates)
    setInitialDate(dates[0])

  }, []);


  const handleCallBack = (value) =>

   callback(value)
  

  const nextPress = () => {
    if (!enable) {
      flatListRef?.current?.scrollToIndex({
        animated: true,
        index: index + 5
      });
      setIndex(index + 5)
      setInitialDate(dateList[index + 5])
    }

  };

  const backPress = () => {
    if (index > 0)
      flatListRef?.current?.scrollToIndex({
        animated: true,
        index: index - 5
      });
    setIndex(index - 5)
    setInitialDate(dateList[index - 5])
  };

  const getDatesBetween = (startDate, endDate) => {
    const dates = [];

    // Strip hours minutes seconds etc.
    let currentDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate()
    );

    while (currentDate <= endDate) {
      dates.push(currentDate);

      currentDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 1, // Will increase month if over range
      );
    }

    return dates;
  };


  const IncrementMonth = () => {
    const today = new Date();
  // console.log("endDATE",endDate)
    
    const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
  //  console.log("end date of first day",startOfMonth)
   // console.log(today, "-----today-----")
    let next;
    if (today.getMonth() === 11) {
      next = new Date(today.getFullYear() + 1, 0, 1);
    } else {
      next = new Date(today.getFullYear(), today?.getMonth() + 1, 1);
    }
    setStartDay(next)
    setSelectedDate(next)
console.log("inside ")
 
     if (moment(today).format("MMMM YYYY") !== moment(endDate).format("MMMM YYYY")) {
      //setArrowRight(true)
      setArrowEnable(true)
   //   console.log("same date",moment(next).format("DD MMMM YYYY") , moment(StartDay).format("DD MMMM YYYY"))
     // console.log("inside els if next", moment(today).format("MMMM YYYY") !== moment(endDate).format("MMMM YYYY"))
    } else if (moment(next).format("MMMM YYYY") == moment(endDate).format("MMMM YYYY")) {
      setArrowRight(false)
      setArrowEnable(false)
     // console.log("inside next", moment(next).format("MMMM YYYY") == moment(endDate).format("MMMM YYYY"))
    }
   // console.log("------", next,StartDay);
  }

  const DecrementMonth = () => {
    setStartDay(new Date())
    setSelectedDate(new Date())
  }

  const onWeekChanged = (start, end) => {
       console.log("end date print", start)
    console.log("selctedDate", selectedDate)
    setMonthStatus(false)
    const Data = end.toString()
    const starts = start.toString()
    //  console.log("end print", Data)
 
    const Moment = moment(Data).utc().format('MMMM YYYY')  
     const Moment2 = moment(start).utc().format('MMMM YYYY')
      console.log('?Momemnt.....', Moment)
    setMonth(Data)
    //console.log("Month display", moment(NewDate).format("MMMM YYYY"), Moment)
    // setSelectedDate(Data)

  if (moment(selectedDate).format('MMMM YYYY') !== moment(end).format('MMMM YYYY')) {
     // console.log("if condition", moment(selectedDate).format('MMMM YYYY') !== moment(end).format('MMMM YYYY'))
      IncrementMonth()
     setArrowEnable(true)
      setArrowRight(true)
    }
    else if (Moment == moment(NewDate).format("MMMM YYYY")) {
     // console.log("inside this condition", Moment == moment(NewDate).format("MMMM YYYY"))
      setArrowEnable(false)
      setArrowRight(true)

    } else if (moment(endDate).format("MMMM YYYY") == Moment) {
      getCGTslot()
      console.log("else if condition", moment(endDate).format("MMMM YYYY") == Moment)
      setArrowRight(false)
    } 
  

  }



  return (
    <View style={styles.container}>
      <View style={{
        flexDirection: 'row', marginTop: 25, justifyContent: 'space-between',
        marginLeft: 15, marginRight: 15
      }}>

        <View>
          <TouchableOpacity onPress={() => DecrementMonth()}>
            {ArrowEnable &&
              <Icon1 name="arrow-left" size={14} color={"#171930"} />}
          </TouchableOpacity>
        </View>


        <View style={{}}>

          <Text style={styles.YearText}>{moment(Month).format("MMMM")} '{moment(Month).format("YY")}</Text>
        </View>

        <View>
          {ArrowRight &&
            <TouchableOpacity onPress={() => IncrementMonth()}>
              <Icon1 name="arrow-right" size={14} color={"#171930"} />
            </TouchableOpacity>
          }
        </View>
      </View>


      <CalendarStrip
        calendarAnimation={{ type: 'sequence', duration: 30 }}
        scrollable={true}
        scrollerPaging={true}
        style={{ height: 100, paddingTop: 0, paddingBottom: 0 }}
        onWeekChanged={onWeekChanged}
        iconContainer={{ flex: 0.1 }}
        selectedDate={StartDay}
        iconLeftStyle={{ fontSize: 15, marginLeft: 15, width: 20, height: 15, color: "#171930" }}
        iconRightStyle={{ marginRight: 15, width: 20, height: 15, color: "#171930" }}
        maxDate={endDate}
        showMonth={false}
        minDate={new Date()}
        rightSelector={true}
        Type={'parallel'}
        scrollToOnSetSelectedDate={true}
        useIsoWeekday={false}
        dayComponent={(item) => {

          return (
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                marginHorizontal: 5,
                borderRadius: 10,
                borderColor: moment(selectedDate).format('DD-MM-YYYY') === moment(item?.date).format('DD-MM-YYYY') ? COLORS.colorB :
                  moment(item?.date).format('DD-MM-YYYY') === moment(new Date()).format('DD-MM-YYYY')
                    && MonthStatus === false ? COLORS.colorB : '#E5E8EB',
                borderWidth: 0.5,
                backgroundColor:
                  moment(selectedDate).format('DD-MM-YYYY') === moment(item?.date).format('DD-MM-YYYY') ? COLORS.colorB
                    : moment(item?.date).format('DD-MM-YYYY') === moment(new Date()).format('DD-MM-YYYY')
                      && MonthStatus === false ? COLORS.colorB : COLORS.colorBackground
              }}
              onPress={() => {
                dispatch({
                  type: 'SET_CREATE_DATE_CGT',
                  payload:item?.date._d,
              });
              AsyncStorage.setItem('DATECGT',item?.date._d);
                setNewDates(item?.date._d)
                setTimeout(()=>{
                  setNewDates(item?.date._d)
                },1000)
                setSelectedDate(item?.date._d),
                 // handleCallBack(item?.date._d),
                  setMonth(item?.date._d),
             
                  setMonthStatus(true)
                  getCGTslot()
                console.log("selct date", item?.date._d)
              }}>
              <Text
                style={{
                  color: moment(selectedDate).format('DD-MM-YYYY') === moment(item?.date).format('DD-MM-YYYY') ?
                    COLORS.colorBackground : moment(item?.date).format('DD-MM-YYYY') === moment(new Date()).format('DD-MM-YYYY')
                      && MonthStatus === false ? COLORS.colorBackground : '#171930',
                  fontSize: 11,
                  textTransform: 'capitalize',
                  fontFamily: FONTS.FontRegular
                }}>{moment(item?.date).format('DD-MM-YYYY') === moment(new Date()).format('DD-MM-YYYY') ? 'Today' : moment(item?.date).format('ddd')}</Text>
              <Text style={{
                color: moment(selectedDate).format('DD-MM-YYYY') === moment(item?.date).format('DD-MM-YYYY')

                  ? COLORS.colorBackground : moment(item?.date).format('DD-MM-YYYY') === moment(new Date()).format('DD-MM-YYYY')
                    && MonthStatus === false ? COLORS.colorBackground : '#171930', fontSize: 15, fontFamily: FONTS.FontSemiB
              }}>{moment(item?.date).format('DD').replace(/\b0/g, '')}</Text>
            </TouchableOpacity>
          )
        }}
        numDaysInWeek={5}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  YearText: {
    fontSize: 17,
    color: "#171930",
    fontFamily: FONTS.FontSemiB
  }
});

export default CalendarStrips;
