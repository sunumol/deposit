
import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment'
import { COLORS, FONTS } from '../../../Constants/Constants';
import Icon1 from 'react-native-vector-icons/SimpleLineIcons'
const width = Dimensions.get('window').width * 0.15

const CalendarStrips = ({ callback }) => {



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
  const [NewDate,setNewDate] = useState(new Date())


  useEffect(() => {
    const dates = getDatesBetween(StartDay, endDate);
    console.log(dates, dates.length)
    setDateList(dates)
    setInitialDate(dates[0])

  }, []);


  const handleCallBack = (value) => callback(value)

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
    console.log(today, "-----today-----")
    let next;
    if (today.getMonth() === 11) {
      next = new Date(today.getFullYear() + 1, 0, 1);
    } else {
      next = new Date(today.getFullYear(), today?.getMonth() + 1, 1);
    }
    setStartDay(next)
    setSelectedDate(next)
    console.log("------", next);
  }

  const DecrementMonth = () => {
    setStartDay(new Date())
    setSelectedDate(new Date())
  }

  const onWeekChanged = (start, end) => {
 
    const Data = end.toString()
    console.log("end print", Data)
    const Moment = moment(Data).utc().format('MMMM YYYY')
    console.log('?Momemnt.....', Moment)
    setMonth(Data)
    console.log("Month display",moment(NewDate).format("MMMM YYYY"),Moment)
    // setSelectedDate(Data)
    if (moment(selectedDate).format('MMMM YYYY') !== moment(end).format('MMMM YYYY')) {
      IncrementMonth()
      setArrowEnable(true)
    }
    // else if(Moment ==  moment(NewDate).format("MMMM YYYY")){
    //   setArrowEnable(false)
    // }

  }



  return (
    <View style={styles.container}>
      <View style={{
        flexDirection: 'row', marginTop: 25, justifyContent: 'space-between',
        marginLeft: 15, marginRight: 15
      }}>

        <TouchableOpacity onPress={() => DecrementMonth()}>
          {ArrowEnable &&
            <Icon1 name="arrow-left" size={14} color={"#171930"} />}
        </TouchableOpacity>

 

        <View style={{}}>

          <Text style={styles.YearText}>{moment(Month).format("MMMM")} '{moment(Month).format("YY")}</Text>
        </View>
  
        <TouchableOpacity onPress={() => IncrementMonth()}>
          <Icon1 name="arrow-right" size={14} color={"#171930"} />
        </TouchableOpacity>
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
                borderColor: moment(selectedDate).format('DD-MM-YYYY') === moment(item?.date).format('DD-MM-YYYY') ? COLORS.colorB : '#E5E8EB',
                borderWidth: 0.5,
                backgroundColor: moment(selectedDate).format('DD-MM-YYYY') === moment(item?.date).format('DD-MM-YYYY') ? COLORS.colorB : COLORS.colorBackground
              }}
              onPress={() => {
                setSelectedDate(item?.date._d),
                handleCallBack(item?.date._d),
                setMonth(item?.date._d),
                console.log("selct date", item?.date._d)
              }}>
              <Text
                style={{
                  color: moment(selectedDate).format('DD-MM-YYYY') === moment(item?.date).format('DD-MM-YYYY') ? COLORS.colorBackground : '#171930',
                  fontSize: 11,
                  textTransform: 'capitalize',
                  fontFamily: FONTS.FontRegular
                }}>{moment(item?.date).format('DD-MM-YYYY') === moment(new Date()).format('DD-MM-YYYY') ? 'Today' : moment(item?.date).format('ddd')}</Text>
              <Text style={{ color: moment(selectedDate).format('DD-MM-YYYY') === moment(item?.date).format('DD-MM-YYYY') ? COLORS.colorBackground : '#171930', fontSize: 15, fontFamily: FONTS.FontSemiB }}>{moment(item?.date).format('DD').replace(/\b0/g, '')}</Text>
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
