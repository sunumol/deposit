
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon1 from 'react-native-vector-icons/SimpleLineIcons'
import moment from 'moment'

// -------------------- Component Imports -------------------
import { COLORS, FONTS } from '../../../Constants/Constants';

const CalendarStrips = ({ setNewDates,NewDates }) => {

  const dispatch = useDispatch()

  const [Month, setMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() + 29)))
  const [ArrowEnable, setArrowEnable] = useState(false)
  const [NewDate, setNewDate] = useState(new Date())
  const [MonthStatus, setMonthStatus] = useState(false)
  const [ArrowRight, setArrowRight] = useState(true)
  const [currentD,setCurrentD] = useState(new Date())

  useEffect(() => {
    const today = new Date();
    let next;
    if (today.getMonth() === 11) {
      next = new Date(today.getFullYear() + 1, 0, 1);
    } else {
      next = new Date(today.getFullYear(), today?.getMonth() + 1, 1);
    }

    if (moment(selectedDate).format("MMMM YYYY") === moment(next).format("MMMM YYYY")) {
      setArrowEnable(true)
      setArrowRight(false)
    } else {
      setArrowEnable(false)
      setArrowRight(true)
    }
  }, [selectedDate])

  const IncrementMonth = () => {
    const today = new Date();
    let next;
    if (today.getMonth() === 11) {
      next = new Date(today.getFullYear() + 1, 0, 1);
    } else {
      next = new Date(today.getFullYear(), today?.getMonth() + 1, 1);
    }
    setMonth(next)
    setSelectedDate(next)
    dispatch({
      type: 'SET_CREATE_DATE_CGT',
      payload: next
    });
    AsyncStorage.setItem('DATECGT', next);
    setNewDates(next)
    setTimeout(() => {
      setNewDates(next)
    }, 1000)
  }

  const DecrementMonth = () => {
    setMonth(new Date())
    setSelectedDate(new Date())
    dispatch({
      type: 'SET_CREATE_DATE_CGT',
      payload: new Date()
    });
    AsyncStorage.setItem('DATECGT', new Date());
    setNewDates(new Date())
    setTimeout(() => {
      setNewDates(new Date())
    }, 1000)
  }

  const onWeekChanged = (start, end) => {
    setMonthStatus(false)
    const today = new Date();
    const Data = end.toString()
    const Moment = moment(Data).utc().format('MMMM YYYY')
    setMonth(Data)
    if (moment(selectedDate).format('MMMM YYYY') !== moment(end).format('MMMM YYYY')) {
      IncrementMonth()
      setArrowEnable(true)
      setArrowRight(true)
    }

    // else if (moment(today).format('MMMM YYYY') === moment(start).format('MMMM YYYY')) {
    //   setSelectedDate(new Date())
    // } 
    else if (Moment == moment(NewDate).format("MMMM YYYY")) {
      setArrowEnable(false)
      setArrowRight(true)
    } else if (moment(endDate).format("MMMM YYYY") == Moment) {
      
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
        onWeekScrollStart={(event) =>console.log(event,'------------------')}
        iconContainer={{ flex: 0.1 }}
        selectedDate={selectedDate}
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
                borderColor: selectedDate && moment(selectedDate).format('DD-MM-YYYY') === moment(item?.date).format('DD-MM-YYYY') ? COLORS.colorB :
                  '#E5E8EB',
                borderWidth: 0.5,
                backgroundColor:
                selectedDate && moment(selectedDate).format('DD-MM-YYYY') === moment(item?.date).format('DD-MM-YYYY') ? COLORS.colorB
                    :   COLORS.colorBackground
              }}
              onPress={() => {
                dispatch({
                  type: 'SET_CREATE_DATE_CGT',
                  payload: item?.date._d,
                });
                AsyncStorage.setItem('DATECGT', item?.date._d);
                setNewDates(item?.date._d)
                setTimeout(() => {
                  setNewDates(item?.date._d)
                }, 1000)
                setSelectedDate(item?.date._d),
                  setMonth(item?.date._d),
                  setMonthStatus(true)
                
              }}>
              <Text
                style={{
                  color: selectedDate && moment(selectedDate).format('DD-MM-YYYY') === moment(item?.date).format('DD-MM-YYYY') ?
                    COLORS.colorBackground : '#171930',
                  fontSize: 11,
                  textTransform: 'capitalize',
                  fontFamily: FONTS.FontRegular
                }}>{moment(item?.date).format('DD-MM-YYYY') === moment(new Date()).format('DD-MM-YYYY') ? 'Today' : moment(item?.date).format('ddd')}</Text>
              <Text style={{
                color: selectedDate &&moment(selectedDate).format('DD-MM-YYYY') === moment(item?.date).format('DD-MM-YYYY')

                  ? COLORS.colorBackground :   '#171930', fontSize: 15, fontFamily: FONTS.FontSemiB
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
