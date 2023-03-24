import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment'
import { COLORS, FONTS } from '../../../Constants/Constants';
import Icon1 from 'react-native-vector-icons/SimpleLineIcons'
import { set } from 'lodash';
import { format } from 'date-fns';

const CalendarStrips = () => {
  const [Month, setMonth] = useState(new Date())
  const [StartDay, setStartDay] = useState(new Date())
  const [Maxdate, setMaxDate] = useState(new Date())
  const [Maxweek, setMaxweek] = useState(new Date())
  const [NDate, setNDate] = useState('')
  const [Format, setFormat] = useState('')
  const [NewDate, setNewDate] = useState('')
  const [year, setYear] = useState('')
  const [Status, setStatus] = useState(false)
  const [DateArray, setDateArray] = useState([])
  const [YearArray, setYearArray] = useState([])
  const [MonthInc, setMonthInc] = useState('')
  //  const [MonthState,setMonthState]
  const [currentDate, setCurrentDate] = useState('')
  const [MonthState, setMonthState] = useState('')
  const [state, setState] = useState('')




  //------------------------------------------------------- SetState ----------------------------------------
  const [selectedDate, setSelectedDate] = useState(new Date())



  useEffect(() => {
    const dt = new Date();
    //console.log("new Date(",dt)
    // var month = dt.getMonth(),
    //   year = dt.getFullYear();
    // var FirstDay = new Date(year, month, 1);
    // // console.log("firstDay.....",FirstDay)



    let FormatMonth = moment(dt).format("MMMM");
    let Format = moment(dt).format("YY");
    //  console.log("Month date....", Format, FormatMonth)
    setMonthState(FormatMonth)
    setYear(Format)

    let Moment = moment(Month).format("MM/DD/YYYY")
    setTimeout(() => {
      setNewDate(Moment)
    }, 1000)
    setNewDate(Moment)
    //console.log("new date.....", Moment, NewDate)
  })


  const onDateSelected = (selectedDate) => {
    console.log("selecteddATE....", selectedDate)
  }



  const getFullYear = () => {
    let curr_date = new Date();
    let year = curr_date.getFullYear()
    let month = curr_date.getMonth()
    //  console.log("year prints....",year,month,curr_date)
    let date = new Date(year, month, 1);
    //for (let i=0;date.getFullYear() === year;i++) {

    date.setDate(date.getDate() + 1);
    //  console.log("year prints repeat....",new Date(date))
    YearArray.push(new Date(date))
    //  console.log("yearv array....",YearArray)
    //  }

  }

  function get_all_dates(year, month) {


    let date = new Date(year, month, 1);


    let dates = [];

    for (let i = 0; date.getFullYear() === year; i++) {


      const Data = new Date(date);
      //   console.log("new", Data)
      // setYearArray(Data)
      date.setDate(date.getDate() + 1);
      const year1 = [new set(Data)]

      //  YearArray.map((item)=>{
      //    console.log("loop inside",moment(item).format("DD MMMM YYYY"))
      //    console.log("\n");
      //  })




      //YearArray.push(Data)

    }


  }


  let curr_date = new Date();
  get_all_dates(curr_date.getFullYear(), curr_date.getMonth());

  useEffect(() => {
    getFullYear()

  }, [])

  useEffect(() => {
    if (Month !== Month)
      setTimeout(() => {
        setMonth(Month)
      }, 1000);
    //  console.log("useeffect", Month)
  }, [Month])

  useEffect(() => {
    if (StartDay !== StartDay)
      setTimeout(() => {
        setStartDay(StartDay)
        setMonthInc(MonthInc)
      }, 1000);
    //console.log("useeffect", StartDay)
  }, [StartDay, MonthInc])

  useEffect(() => {
    if (Status) {
      setMonth(Month)
      //   var date = new Date(), y = Month.getFullYear(), m = Month.getMonth();
      // var firstDay = new Date(y, m, 1);
      // // setStartDay(firstDay)
      //   console.log('Count is more that 5');
    } else {
      //console.log('Count is less that 5');
    }
  }, []);



  const IncrementMonth = () => {
    //   const my_date = new Date();
    //  const monthFormat =  moment(Month).format("MMMM")
    // console.log("max date....Month",Month)
    // console.log("Format....",Format)
    // console.log("NDATE....",NDate)
    // if (NDate !== Format) {

    //   new Date(Month.setMonth(Month.getMonth() + 1));
    //   setTimeout(() => {
    //     setMonth(Month)
    //   }, 2000);
    //   setMonth(Month)
    //   setStatus(true)
    //   const CurrentDate1 = moment(Month).format("MMMM YYYY")
    //   setNDate(CurrentDate1)
    //   console.log("INC DATE", moment(Month).format("MMMM"));
    //   // console.log("Month increment.....", Month)

    //   var date = new Date(), y = Month.getFullYear(), m = Month.getMonth();
    //   var firstDay = new Date(y, m, 1);
    //   setTimeout(() => {
    //     setStartDay(firstDay)
    //   }, 1000)
    //   setStartDay(firstDay)
    // }
    // else {
    //   console.log("else case")
    //   console.log("print first day", firstDay)
    //   console.log("first day state....", Month)
    // }
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
    // setMonth(next)
    console.log("------", next);

  }

  const DecrementMonth = () => {

    setStartDay(new Date())
    setSelectedDate(new Date())

  }

  useEffect(() => {
    console.log("mAXdaTE....", Maxdate)
    new Date(Maxdate.setMonth(Month?.getMonth() + 1));

    const Format1 = moment(Maxdate).format("MMMM YYYY")
    setFormat(Format1)
    console.log("dATE maximum....", Format, Format1, Maxdate)

  }, [])



  const onWeekChanged = (start, end) => {
    console.log("start end.....", start)

    console.log("\n")


    const Data = end.toString()


    console.log("end print", Data)
    const Moment = moment(Data).utc().format('MMMM YYYY')
    console.log('?Momemnt.....', Moment)
    setMonth(Data)

  }

  useEffect(() => {


    setMaxweek(Maxweek)
    console.log("USEEFFECT CALLINGff.....", Maxweek)
  }, [])

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
      {/* {DateArray.map((item)=>{
  console.log("item...",moment(item).format('DD'))
  return(
    <View style={{flexDirection:'row'}}>
       <Text>{moment(item).format('DD')}</Text> 
    </View>
  )
})} */}


      <CalendarStrip
        scrollable={true}
        scrollerPaging={true}
        // customDatesStyles={customDatesStyles}
        style={{ height: 100, paddingTop: 0, paddingBottom: 0 }}
        onWeekChanged={onWeekChanged}
        calendarHeaderStyle={{ color: '#171930' }}
        dateNumberStyle={{ color: '#171930', fontSize: 15, }}
        dateNameStyle={{ color: '#171930', fontSize: 15, textTransform: 'capitalize', fontFamily: FONTS.FontRegular }}
        iconContainer={{ flex: 0.1 }}
        highlightDateNameStyle={{ fontSize: 12, color: COLORS.colorBackground, textTransform: 'capitalize', fontFamily: FONTS.FontRegular }}
        highlightDateNumberStyle={{ fontSize: 12, color: COLORS.colorBackground, fontFamily: FONTS.FontSemiB }}
        highlightDateContainerStyle={{ backgroundColor: COLORS.colorB, width: 40, height: 50, borderRadius: 8 }}
        selectedDate={StartDay}
        //selectedDate={StartDay !== StartDay ?  StartDay : StartDay}
        // iconLeftStyle={<Icon1 name="arrow-left" size={14} color={"#171930"} />}
        //  iconRightStyle={   <Icon1 name="arrow-right" size={14} color={"#171930"} style={{ marginRight: 15, width: 20, height: 15,color:"#171930"}} />}
        iconLeftStyle={{ fontSize: 15, marginLeft: 15, width: 20, height: 15, color: "#171930" }}
        iconRightStyle={{ marginRight: 15, width: 20, height: 15, color: "#171930" }}
        onDateSelected={onDateSelected}
        maxDate={new Date(new Date().setDate(new Date().getDate() + 30))}
        showMonth={false}
        minDate={new Date()}
        rightSelector={true}
        Type={'parallel'}
        scrollToOnSetSelectedDate={selectedDate}
        //leftSelector={}
        //minDate={StartDay}
        //calendarHeaderFormat={moment().format('MMM YY')}
        //startingDate={moment()}
        // minDate={StartDay !== StartDay ? setTimeout(() => {
        //   StartDay
        // }, (1000)):alert(StartDay)}
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
              {console.log('-----------------', item, '---------------------')}

            </TouchableOpacity>
          )
        }}
        numDaysInWeek={5}
      //  onDateSelected={onDateSelected}

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