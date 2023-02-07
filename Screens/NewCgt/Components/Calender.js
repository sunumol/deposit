import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, StyleSheet,Text} from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment'
import { COLORS, FONTS } from '../../../Constants/Constants';

const CalendarStrips = () => {
  const [Month, setMonth] = useState(new Date())
  const [NewDate, setNewDate] = useState('')
  const [year, setYear] = useState('')
  const [MonthState, setMonthState] = useState('')



  useEffect(() => {
    const dt  = new Date();
    console.log("new Date(",dt)
    var month = dt.getMonth(),
    year = dt.getFullYear();
    var FirstDay = new Date(year, month, 1);
    console.log("firstDay.....",FirstDay)

 

    // let FormatMonth = moment(d).format("MMMM");
    // let Format = moment(d).format("YY");
    // console.log("Month date....", Format, FormatMonth)
    // setMonthState(FormatMonth)
    // setYear(Format)

    let Moment = moment(Month).format("MM/DD/YYYY")
    setTimeout(() => {
      setNewDate(Moment)
    }, 1000)
    setNewDate(Moment)
    console.log("new date.....", Moment, NewDate)
  })
  let datesWhitelist = [{
    start: moment(),
    end: moment().add(3, 'days')  // total 4 days enabled
  }];

  const onDateSelected = (selectedDate) => {
    console.log("selecteddATE....", selectedDate)
  }

  let customDatesStyles = [];
  let startDate = moment();
  for (let i = 0; i < 6; i++) {
    customDatesStyles.push({
      startDate: startDate.clone().add(i, 'days'), // Single date since no endDate provided
      dateNameStyle: styles.dateNameStyle,
      dateNumberStyle: styles.dateNumberStyle,
      // Random color...
      dateContainerStyle: { backgroundColor: `#${(`#00000${(Math.random() * (1 << 24) | 0).toString(16)}`).slice(-6)}` },
    });
  }

  const onWeekScrollEnd = (start,end)=>{
      console.log("onWeekScrollEnd",start,end)
  }

  return (
    <View style={styles.container}>

      {/* <View style={{alignItems:'center',justifyContent:'center',marginTop:20}}>
      <Text style={styles.YearText}>{MonthState} '{year}</Text>
      </View> */}

      <CalendarStrip
        scrollable
        // customDatesStyles={customDatesStyles}
        style={{ height: 140, paddingTop: 20, paddingBottom: 0 }}
        onWeekChanged={onWeekScrollEnd}
        calendarHeaderStyle={{ color: '#171930' }}
        dateNumberStyle={{ color: '#171930', fontSize: 15, }}
        dateNameStyle={{ color: '#171930', fontSize: 15, textTransform: 'capitalize',fontFamily:FONTS.FontRegular }}
        iconContainer={{ flex: 0.1 }}
        highlightDateNameStyle={{ fontSize: 12, color: COLORS.colorBackground, textTransform: 'capitalize',fontFamily:FONTS.FontRegular }}
        highlightDateNumberStyle={{ fontSize: 12, color: COLORS.colorBackground ,fontFamily:FONTS.FontSemiB}}
        highlightDateContainerStyle={{ backgroundColor: COLORS.colorB, width: 40, height: 50, borderRadius: 8 }}
        selectedDate={moment().format("YYYY-MM-DD")}
        iconLeftStyle={{ fontSize: 15, marginLeft: 15, width: 20, height: 15 }}
        iconRightStyle={{ marginRight: 15, width: 20, height: 15 }}
        onDateSelected={onDateSelected}
        
        
        //calendarHeaderFormat={moment().format('MMM YY')}
        //startingDate={moment()}
        minDate={moment()}
        numDaysInWeek={5}
      //  onDateSelected={onDateSelected}

      />
    </View>

  )
}


const styles = StyleSheet.create({
  YearText:{
    fontSize:17,
    color:"#171930",
    fontFamily:FONTS.FontSemiB
  }
});

export default CalendarStrips;