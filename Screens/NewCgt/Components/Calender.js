
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon1 from 'react-native-vector-icons/SimpleLineIcons'
import moment from 'moment'

// -------------------- Component Imports -------------------
import { COLORS, FONTS } from '../../../Constants/Constants';

const CalendarStrips = ({ setNewDates, getCGTslot }) => {

  const dispatch = useDispatch()

  const [leftArrow, setLeftArrow] = useState(false)
  const [rightArrow, setRightArrow] = useState(false)
  const [month, setMonth] = useState()

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [maxDate, setMaxDate] = useState(new Date(new Date().setDate(new Date().getDate() + 29)))

  const IncrementMonth = () => {
    const today = new Date();
    let next;

    if (today.getMonth() === 11) {
      next = new Date(today.getFullYear() + 1, 0, 1);
    } else {
      next = new Date(today.getFullYear(), today?.getMonth() + 1, 1);
    }
    setSelectedDate(next)
  }

  useEffect(() => {
    if (selectedDate) {
      let s = selectedDate.toString();
      function parseAsUTC(s) {
        let months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun',
          'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
        let b = s.split(/\W/);
        return new Date(Date.UTC(b[3], months.indexOf(b[1].toLowerCase()),
          b[2], b[4], b[5], b[6]));
      }
      setNewDates(parseAsUTC(s).toISOString())
      setMonth(parseAsUTC(s).toISOString())

    }
  }, [selectedDate])

  useEffect(() => {
    const today = new Date();
    if (month) {
      if (moment(today).format("MMMM YYYY") === moment(month).format("MMMM YYYY")) {
        setLeftArrow(false)
        setRightArrow(true)

      } else {
        setLeftArrow(true)
        setRightArrow(false)
      }
      if (moment(today).format("MMMM YYYY") === moment(maxDate).format("MMMM YYYY")) {
        setLeftArrow(false)
        setRightArrow(false)
      }
    }
  }, [month])

  const DecrementMonth = () => {
    const today = new Date();
    setSelectedDate(today)
  }


  return (
    <View style={styles.container}>
      <View style={{
        flexDirection: 'row', marginTop: 25, justifyContent: 'space-between',
        marginLeft: 15, marginRight: 15
      }}>
        <View>
          {leftArrow
            ? <TouchableOpacity onPress={DecrementMonth}>
              <Icon1 name="arrow-left" size={14} color={"#171930"} />
            </TouchableOpacity>
            : null}
        </View>
        <View>
          <Text style={styles.YearText}>{moment(month).format('MMMM')}{" '"}{moment(month).format('YY')}</Text>
        </View>

        <View>
          {rightArrow
            ? <TouchableOpacity onPress={IncrementMonth}>
              <Icon1 name="arrow-right" size={14} color={"#171930"} />
            </TouchableOpacity>
            : null}

        </View>
      </View>

      <CalendarStrip
        calendarAnimation={{ type: 'sequence', duration: 30 }}
        scrollable={true}
        scrollerPaging={true}
       
        style={{ height: 100, paddingTop: 0, paddingBottom: 0 }}
        iconContainer={{ flex: 0.1 }}
        selectedDate={selectedDate}
        iconLeftStyle={{ fontSize: 15, marginLeft: 15, width: 20, height: 15, color: "#171930" }}
        iconRightStyle={{ marginRight: 15, width: 20, height: 15, color: "#171930" }}
        maxDate={maxDate}
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
                    : COLORS.colorBackground
              }}
              onPress={() => {
                dispatch({
                  type: 'SET_CREATE_DATE_CGT',
                  payload: item?.date._d,
                });
                AsyncStorage.setItem('DATECGT', item?.date._d);
                setSelectedDate(item?.date._d)
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
                color: selectedDate && moment(selectedDate).format('DD-MM-YYYY') === moment(item?.date).format('DD-MM-YYYY') ? COLORS.colorBackground : '#171930', fontSize: 15, fontFamily: FONTS.FontSemiB
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
