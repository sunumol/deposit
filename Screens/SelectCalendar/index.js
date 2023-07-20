
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    StatusBar,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
    Text
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';

// -------------- Component Imports -------------------------
import CalenderModal from './Components/CalenderModal';
import CgtModal from '../SelectCustomNewCgt/Components/Modal';
import { api } from '../../Services/Api';
import { COLORS, FONTS } from '../../Constants/Constants';
import Statusbar from '../../Components/StatusBar';
import Header from '../../Components/RepayHeader';
import Cgt from './Components/Cgt';
import CalendarStrips from './Components/Calender';

const Calendar = ({ navigation, route }) => {

    const isDarkMode = true

    const [slotlist, setSlotlist] = useState([]);
    const [NewDates, setNewDates] = useState(new Date())
    const [status, setStatus] = useState(true)
    const [ModalVisible1, setModalVisible1] = useState(false)
    const [ModalVisible, setModalVisible] = useState(false)
    const [custID, setCustId] = useState('')
    const [Dates, setDate] = useState(new Date())

   
    useEffect(() => {
        AsyncStorage.getItem("CustomerId").then((value) => {
            setCustId(value)
        })

    }, [])

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                console.log('Screen was focused');
                // Do something when the screen is unfocused
                // Useful for cleanup functions
            };
        }, [])
    );

    const callback = () => {
        getCGTslot()
    }

    // Function to convert time to minutes since midnight
    function convertToMinutes(time) {

        // Split the time string into hours, minutes, and AM/PM
        const [hourString, minuteString, period] = time.split(/:| /);
        let hours = parseInt(hourString);
        const minutes = parseInt(minuteString);

        // Adjust hours for PM time
        if (period === 'PM' && hours !== 12) {
            hours += 12;
        }

        // Convert to minutes
        const totalMinutes = hours * 60 + minutes;
        return totalMinutes;
    }


    // ------------------ get Slot Api Call Start ------------------
    const getCGTslot = async (value) => {
        var date1 = moment(Dates, "HH:mm:ss").format("hh:mm A")
        const data = {
            "employeeId": custID ? Number(custID) : Number(value),
            "selectedDate": moment(NewDates).utc().format('DD-MM-YYYY')
        };
        console.log('+++++++++',custID,'/////',value)
        await api.getCGTslot(data).then((res) => {
           // console.log("data print", NewDates)
            const temp = res?.data?.body[0].sloatActivityList
            temp.forEach((element, index) => {

                const minutes1 = convertToMinutes(date1);
                const minutes2 = convertToMinutes(element?.time);
                if (minutes1 < minutes2 && moment(NewDates).utc().format('DD-MM-YYYY') === moment(Dates).utc().format('DD-MM-YYYY')) {
                    element.selection = true;

                } else if (minutes1 > minutes2 && moment(NewDates).utc().format('DD-MM-YYYY') === moment(Dates).utc().format('DD-MM-YYYY')) {
                    element.selection = false;

                } else if (moment(NewDates).utc().format('DD-MM-YYYY') !== moment(Dates).utc().format('DD-MM-YYYY')) {
                    element.selection = true;
                }

             //   console.log("temp data", temp)

               // console.log("temp data", temp)
            })
            setSlotlist(temp);
            //setSlotlist(res?.data?.body[0].sloatActivityList);
            setStatus(false)
        }).catch((err) => {
            console.log('-------------------err', err?.response)
            setStatus(false)
        })
    };
    // ------------------ get slot Api Call End ------------------

    useEffect(() => {
        getCGTslot()
    }, []);

    useEffect(() => {
        getCGTslot()
    }, [NewDates]);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container1} />
            <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={"#002B59"} />

            <Header navigation={navigation} name={route?.params?.title} />
            {status ?
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, }}>
                    <ActivityIndicator size={30} color={COLORS.colorB} />
                </View> :
                <View style={styles.ViewContent}>

                    <CalendarStrips
                        callback={callback}
                        setNewDates={setNewDates}
                        NewDates={NewDates}
                        getCGTslot={() => getCGTslot()}
                    />

                    <View style={{ flex: 1 }}>
                        <Cgt
                            navigation={navigation}
                            data={slotlist}
                            date={NewDates}
                            setModalVisible1={setModalVisible1}
                            slotlistrefresh={getCGTslot}
                            selectedData={route?.params?.selectedData}
                            status={route?.params?.title}
                        />
                    </View>

                    <CalenderModal
                        ModalVisible={ModalVisible1}
                        onPress1={() => {
                            setModalVisible1(false)
                        }}
                        onPressOut={() => {
                            setModalVisible1(!ModalVisible1)
                        }}
                        setModalVisible={setModalVisible1}
                    />
                    <CgtModal ModalVisible={ModalVisible}
                        onPressOut={() => {
                            setModalVisible(false)
                        }}
                        navigation={navigation}
                        setModalVisible={setModalVisible} />

                </View>}

        </SafeAreaProvider>
    )
}

export default Calendar;

const styles = StyleSheet.create({
    container1: {
        flex: 0,
        backgroundColor: "#002B59",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    ViewContent: {
        flex: 1,
        backgroundColor: COLORS.colorBackground,
    },
    text: {
        fontWeight: '400',
        fontFamily: FONTS.FontRegular,
        fontSize: 14,
        marginTop: 21,
        marginLeft: 21,
        marginRight: 21,
        textAlign: 'justify',
        color: "#1A051D",
    },
    Head: {
        fontFamily: FONTS.FontExtraBold,
        fontSize: 18,
        fontWeight: '800',
        color: "#1A051D",
        paddingTop: 31
    },
    viewHead: {
        marginTop: Dimensions.get('window').height * 0.02,
        marginBottom: 0,
        marginLeft: 21
    },
    scheduleButton: {
        backgroundColor: COLORS.unScheduleBackground,
        height: 48,
        marginBottom: 27,
        marginHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    scheduleText: {
        fontFamily: FONTS.FontSemiB,
        fontSize: 14,
        color: COLORS.colorB,
        paddingRight: 10
    },

})
