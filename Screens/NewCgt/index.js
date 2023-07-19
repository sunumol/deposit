
import React, { useState, useEffect, useCallback } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    StatusBar,
    BackHandler,
    ActivityIndicator
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ------------- Component Imports --------------------------
import Cgt from './Components/Cgt';
import CalendarStrips from './Components/Calender';
import { api } from '../../Services/Api';
import CalenderModal from './Components/CalenderModal';
import CgtModal from '../SelectCustomNewCgt/Components/Modal';
import ErrorModal from './Components/ErrorModal';
import { COLORS } from '../../Constants/Constants';
import Statusbar from '../../Components/StatusBar';
import Header from '../../Components/RepayHeader';

const NewCgt = ({ navigation, route }) => {

    const isDarkMode = true
    const dispatch = useDispatch()

    const [slotlist, setSlotlist] = useState([]);
    const [NewDates, setNewDates] = useState()
    const [status, setStatus] = useState(true)
    const [ModalVisible1, setModalVisible1] = useState(false)
    const [ModalVisible2, setModalVisible2] = useState(false)
    const [ModalVisible, setModalVisible] = useState(false)
    const [BStatus, setBstatus] = useState(false);
    const [Dates, setDate] = useState(new Date())
    const [custID,setCustId] = useState('')

    useFocusEffect(
        React.useCallback(() => {
            console.log('Screen was focused', NewDates);
            // Do something when the screen is focused
            return () => {
                console.log('Screen was focused');
                // Do something when the screen is unfocused
                // Useful for cleanup functions
            };
        }, [])
    );

    useEffect(() => {
        AsyncStorage.getItem("CustomerId").then((value) => {
            setCustId(value)
        })
    
    }, [])

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

    // Convert times to minutes

    const callback = (value) => {
        getCGTslot()
    }

    // ------------------ get Slot Api Call Start ------------------
    const getCGTslot = async (date) => {
        var date1 = moment(Dates, "HH:mm:ss").format("hh:mm A")
        var date2 = "07:00 AM"

        console.log("selected date", moment(NewDates).utc().format('DD-MM-YYYY'),custID)

        const data = {
            "employeeId":Number(custID),
            "selectedDate": moment(NewDates).utc().format('DD-MM-YYYY')
        };
        await api.getCGTslot(data).then((res) => {
            dispatch({
                type: 'SET_ACTIVITY',
                payload: res?.data?.body[0].sloatActivityList,
            });
          


            // Compare the times
            console.log("compare dates", moment(NewDates).utc().format('DD-MM-YYYY'), moment(Dates).utc().format('DD-MM-YYYY'))
  //  if (moment(NewDates).utc().format('DD-MM-YYYY') === moment(Dates).utc().format('DD-MM-YYYY')) {
                const temp = res?.data?.body[0].sloatActivityList
                temp.forEach((element, index) => {

                    const minutes1 = convertToMinutes(date1);
                    const minutes2 = convertToMinutes(element?.time);
                    if (minutes1 < minutes2 && moment(NewDates).utc().format('DD-MM-YYYY') === moment(Dates).utc().format('DD-MM-YYYY') ) {
                        element.selection = true;

                    } else if (minutes1 > minutes2 && moment(NewDates).utc().format('DD-MM-YYYY') === moment(Dates).utc().format('DD-MM-YYYY')) {
                        element.selection = false;

                    }else if(moment(NewDates).utc().format('DD-MM-YYYY') !== moment(Dates).utc().format('DD-MM-YYYY')){
                        element.selection = true;
                    }
                   
                   // console.log("temp data", temp)
                })
                setSlotlist(temp);
            // } else  {
            //     console.log("hai i am in",moment(NewDates).utc().format('DD-MM-YYYY') > moment(Dates).utc().format('DD-MM-YYYY'))
            //     const temp = res?.data?.body[0].sloatActivityList
            //     temp.forEach((element, index) => {
            //        element.selection = true;

            //     })
            //     setSlotlist(temp);
            // }


            setStatus(false)
        })
            .catch((err) => {
                console.log('-------------------err', err?.response)
                setStatus(false)
            })
    };

    // ------------------ get slot Api Call End ------------------
    const handleGoBack = useCallback(() => {
        if (BStatus) {
            setBstatus(false)
        } else {
            navigation.navigate('Profile')
        }
        return true; // Returning true from onBackPress denotes that we have handled the event
    }, [navigation]);

    useFocusEffect(
        React.useCallback(() => {
            BackHandler.addEventListener('hardwareBackPress', handleGoBack);

            return () =>
                BackHandler.removeEventListener('hardwareBackPress', handleGoBack);
        }, [handleGoBack]),
    );

    useEffect(() => {
        getCGTslot()
    }, []);

    useEffect(() => {
        getCGTslot(NewDates)
    }, [NewDates]);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container1} />
            <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={"#002B59"} />

            <Header navigation={navigation} name={"New CGT"} activity={true} onPress={handleGoBack} />
            {status ?
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, }}>
                    <ActivityIndicator size={30} color={COLORS.colorB} />
                </View> :
                <View style={styles.ViewContent}>

                    <CalendarStrips
                        callback={callback}
                        setNewDates={setNewDates}
                        getCGTslot={() => getCGTslot()}
                    />

                    <Cgt
                        navigation={navigation}
                        data={slotlist}
                        date={NewDates}
                        setModalVisible1={setModalVisible1}
                        setModalVisible2={setModalVisible2}
                        rescheduledata={route?.params?.reschedule}
                        slotlistrefresh={getCGTslot}
                    />

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

                    <ErrorModal
                        ModalVisible={ModalVisible2}
                        onPress1={() => {
                            setModalVisible2(false)
                        }}
                        onPressOut={() => {
                            setModalVisible2(!ModalVisible2)
                        }}
                        setModalVisible={setModalVisible2}
                    />

                    <CgtModal ModalVisible={ModalVisible}
                        onPressOut={() => {
                            setModalVisible(false)
                        }}
                        navigation={navigation}
                        setModalVisible={setModalVisible}
                    />

                </View>
            }

        </SafeAreaProvider>
    )
}

export default NewCgt;

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
})
