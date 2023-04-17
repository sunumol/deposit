import React, { useState, useRef,useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment'
import { COLORS, FONTS } from '../../../Constants/Constants';
import Icon1 from 'react-native-vector-icons/SimpleLineIcons'


const CalendarStrips = () => {

  //------------------------------------------------------- SetState ----------------------------------------
  const [Month, setMonth] = useState(new Date())
  const [StartDay, setStartDay] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() + 30)))

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
    console.log("start end.....", start)
    const Data = end.toString()
    console.log("end print", Data)
    const Moment = moment(Data).utc().format('MMMM YYYY')
    console.log('?Momemnt.....', Moment)
    setMonth(Data)
    if (moment(selectedDate).format('MMMM YYYY') !== moment(end).format('MMMM YYYY')) {
      IncrementMonth()
    }

  }


  return (
    <View style={styles.container}>
      <View style={{
        flexDirection: 'row', marginTop: 25, justifyContent: 'space-between',
        marginLeft: 15, marginRight: 15
      }}>
        <TouchableOpacity onPress={() => DecrementMonth()}>
          <Icon1 name="arrow-left" size={14} color={"#171930"} />
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
                borderColor: moment(selectedDate).format('DD-MM-YYYY') === moment(item.date).format('DD-MM-YYYY') ? COLORS.colorB : '#E5E8EB',
                borderWidth: 0.5,
                backgroundColor: moment(selectedDate).format('DD-MM-YYYY') === moment(item.date).format('DD-MM-YYYY') ? COLORS.colorB : COLORS.colorBackground
              }}
              onPress={() => setSelectedDate(item.date)}>
              <Text
                style={{
                  color: moment(selectedDate).format('DD-MM-YYYY') === moment(item.date).format('DD-MM-YYYY') ? COLORS.colorBackground : '#171930',
                  fontSize: 11,
                  textTransform: 'capitalize',
                  fontFamily: FONTS.FontRegular
                }}>{moment(item.date).format('DD-MM-YYYY') === moment(new Date()).format('DD-MM-YYYY') ? 'Today' : moment(item.date).format('ddd')}</Text>
              <Text style={{ color: moment(selectedDate).format('DD-MM-YYYY') === moment(item.date).format('DD-MM-YYYY') ? COLORS.colorBackground : '#171930', fontSize: 15, fontFamily: FONTS.FontSemiB }}>{moment(item.date).format('DD').replace(/\b0/g, '')}</Text>
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