import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import moment from 'moment';
// var esLocale = require('moment/locale/es');
import PropTypes from 'prop-types';
// import { ReactPropTypes } from "react";
import Icon1 from 'react-native-vector-icons/AntDesign'

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


export default class DatePicker extends Component {
    constructor() {
        super();
        this.state = {
            arrowCount: 0,
            weekObject: [],
            selectedDate: {
                day: null,
                date: null
            },
            Month: new Date(),
            MonthData: 'February',
            todaysDateIndex:'',
            neDate:'',
            MonthArray:[],
            newMonth:moment(new Date()).format("MM/DD/YYYY")
            
        };
      
    }
    async componentDidMount() {
        await moment.locale(this.props.locale);
        await this.setState({
            selectedDate: {
                day: moment(this.props.startDate).format("ddd").slice(0, 3),
                date: moment(this.props.startDate).format(this.props.dateFormat)
            }
        });
        console.log(moment(this.props.startDate).format("ddd").slice(0, 3))
        console.log(moment(this.props.startDate).format(this.props.dateFormat))
        this.dateCreator();      
    }

componentDidUpdate(){
    let Month = this.state.Month;
    let Moment = moment(Month).format("MM/DD/YYYY")
    this.setState({neDate:Moment})
    console.log("componentDid...",this.state.newMonth)
}


    shouldComponentUpdate(nextProps, nextState) {
        return (
            this.state.weekObject != nextState.weekObject ||
            this.state.selectedDate != nextState.selectedDate
        );
    }

    dateCreator = () => {
        const daysArray = days;

        let weekObject = [...this.state.weekObject];
        weekObject[this.state.arrowCount] = [];
        let todaysDateIndex = daysArray.indexOf(moment().format("ddd").slice(0, 3));
        console.log("days array....", daysArray.indexOf(moment().format("ddd").slice(0, 7)))
        this.setState({todaysDateIndex:todaysDateIndex})
        for (let day in daysArray) {
            console.log("day in daysArray", day)
            let selectedWeekDaySet =
                day - todaysDateIndex + this.state.arrowCount * 5;
            console.log("selectedWeekDaySet", selectedWeekDaySet)
            let calenderDay = daysArray[day];
            let dateObject = {
                day: calenderDay,

                date: moment()
                    .add(selectedWeekDaySet, "day")
                    .format(this.props.dateFormat),
                monthYear: moment()
                    .add(selectedWeekDaySet, "day")
                    .format("MMMM YYYY"),
                month: moment()
                    .add(selectedWeekDaySet, "day")
                    .format("MM"),
                year: moment()
                    .add(selectedWeekDaySet, "day")
                    .format("YY"),
                shortDate: moment()
                    .add(selectedWeekDaySet, "day")
                    .format("L"),
                shortDateTime: moment()
                    .add(selectedWeekDaySet, "day")
                    .format()
            };
            console.log("day loop", moment()
                .add(selectedWeekDaySet, "day")
                .format("MMMM YYYY"))
            weekObject[this.state.arrowCount][day] = dateObject;
        }

        this.setState({ weekObject });
        console.log("weekObject.....",this.state.weekObject)
    };

    handlePress = async date => {
        if (
            this.state.selectedDate.day == date.day &&
            this.state.selectedDate.date == date.date
        ) {
            this.setState({ selectedDate: { day: null, date: null } });
        } else {
            let dates = {
                day: date.day,
                date: date.date,
                monthYear: date.monthYear,
                month: date.month,
                year: date.year,
                shortDate: date.shortDate,
                shortDateTime: date.shortDateTime
            }
            await this.setState({
                selectedDate: {
                    day: date.day,
                    date: date.date
                }
            });
            await this.props.selected(dates)
        }
    };

    handleArrowChange = time => {
        this.setState({ arrowCount: this.state.arrowCount - time }, () => {
            this.dateCreator();
        });
    };

    handleArrowMonth = () => {
 

        //console.log("Month state....",this.state.Month)
        var Month = this.state.Month;
        // var d = new Date("February 2023");
        // console.log("new date....",d)
        // console.log(d.toLocaleDateString());
        Month.setMonth(Month.getMonth() + 1);
        var Months = moment(Month).format("MMMM")
        console.log("Month after", moment(Month).format("MMMM"));
        setTimeout(() => {
            this.setState({ MonthArray: Months })
        }, (1000));
        this.setState({ MonthArray: [...this.state.MonthArray,Months] })
        // let Month_Array = [];
        // this.state.MonthArray.map((item)=>{
        //     Month_Array.push(item)
        //     console.log("Array Data....",item)
        //     this.setState({MonthArray:Month_Array})
        // })
        // this.setState([...this.state.MonthArray,Months])
        console.log("monthdata sttate....", this.state.MonthArray)
    }

    componentDidUpdate(){
        var Month = this.state.Month;
        // var d = new Date("February 2023");
        // console.log("new date....",d)
        // console.log(d.toLocaleDateString());
        Month.setMonth(Month.getMonth() + 1);
        var Months = moment(Month).format("MMMM YYYY")
        console.log("Month after", moment(Month).format("MMMM YYYY"));
        setTimeout(() => {
            this.setState({ MonthData: Months })
        }, (1000));

        console.log("monthdata sttate....", this.state.MonthData)
    }


    handleMonthYearComponent = () => {
        if (this.state.weekObject.length > 0)
            return <Text style={Styles.dateComponentYearText}>{this.state.MonthData}</Text>
    }


    handleDateComponentDisplay = () => {
        return this.state.weekObject[this.state.arrowCount].map((date, index) => {
            console.log("date print weekobject",date)
            let isPressed =
                this.state.selectedDate.day == date.day &&
                this.state.selectedDate.date == date.date;
            return (
                <TouchableOpacity
                    key={index}
                    onPress={() => this.handlePress(date)}
                    style={Styles.dateComponentDateTouchable}
                >
                    <Text style={{ color: this.props.depressedColor }}>
                        {this.state.newMonth == date.shortDate ? "Today" : date.day}
                    </Text>
                    <View style={{ backgroundColor: isPressed ? this.props.pressedColor : 'transparent', borderRadius: 25, width: 20 }}>
                        <Text style={{ color:this.state.newMonth == date.shortDate ? "red": this.props.depressedColor, textAlign: 'center' }}>
                            {date.date}
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        });
    };

    render() {
        return (
            <View style={Styles.dateComponentView}>

         
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <TouchableOpacity onPress={() => this.handleArrowMonth()}>
                        <Icon1 name="left" size={20} />
                    </TouchableOpacity>

                    {this.handleMonthYearComponent()}

                    <TouchableOpacity onPress={() => this.handleArrowChange(-1)}>
                        <Icon1 name="right" size={20} />
                    </TouchableOpacity>
                </View>

                <View style={Styles.dateComponentDateView}>
                    <Text />
                    <TouchableOpacity
                    // onPress={() => this.handleArrowChange(1)}
                    >
                        <Icon1 name="left" size={20} />
                    </TouchableOpacity>
                    {this.state.weekObject.length != 0 &&
                        this.handleDateComponentDisplay()}
                    <TouchableOpacity onPress={() => this.handleArrowChange(-1)}>
                        <Icon1 name="right" size={20} />
                    </TouchableOpacity>
                </View>


            </View>
        );
    }
}
DatePicker.defaultProps = {
    iconSize: 30,
    dateFormat: "D",
    pressedColor: "#fff",
    depressedColor: "#7d7c7b",
    locale: 'es'//-mx
}

DatePicker.propTypes = {
    iconSize: PropTypes.number,
    dateFormat: PropTypes.string,
    pressedColor: PropTypes.string,
    depressedColor: PropTypes.string,
    selected: PropTypes.func,
    locale: PropTypes.string
}


const Styles = StyleSheet.create({
    dateComponentView: {
        flex: 1, flexDirection: "column", alignItems: 'center'
    },
    dateComponentYearText: {
        color: "blue", fontSize: 20
    },
    dateComponentDateTouchable: {
        flex: 1,
        flexDirection: "column",
        color: "#7d7c7b",
        alignItems: "center"
    },
    dateComponentDateView: {
        flex: 1, flexDirection: "row", marginTop: 10
    }
})