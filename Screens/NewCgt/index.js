
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

    // const time1 = '7:00 AM';
    // const time2 = '5:30 PM';

    // // Function to convert time to minutes since midnight
    // function convertToMinutes(time) {
    //     // Split the time string into hours, minutes, and AM/PM
    //     const [hourString, minuteString, period] = time.split(/:| /);
    //     let hours = parseInt(hourString);
    //     const minutes = parseInt(minuteString);

    //     // Adjust hours for PM time
    //     if (period === 'PM' && hours !== 12) {
    //         hours += 12;
    //     }

    //     // Convert to minutes
    //     const totalMinutes = hours * 60 + minutes;
    //     return totalMinutes;
    // }

    // // Convert times to minutes
    // const minutes1 = convertToMinutes(time1);
    // const minutes2 = convertToMinutes(time2);

    // // Compare the times
    // if (minutes1 < minutes2) {
    //     console.log(time1 + ' is earlier than ' + time2);
    // } else if (minutes1 > minutes2) {
    //     console.log(time1 + ' is later than ' + time2);
    // } else {
    //     console.log(time1 + ' is the same as ' + time2);
    // }

    const callback = (value) => {
        getCGTslot()
    }

    // ------------------ get Slot Api Call Start ------------------
    const getCGTslot = async (date) => {
        var date1 = moment(Dates, "HH:mm:ss").format("hh:mm A")
        var date2 = "07:00 AM"
        console.log("DATE 1 AND ADET", date1 > date2)
        console.log("new date", moment(Dates, "HH:mm:ss").format("hh:mm A"))
        const data = {
            "employeeId": 1,
            "selectedDate": moment(NewDates).utc().format('DD-MM-YYYY')
        };
        await api.getCGTslot(data).then((res) => {
            dispatch({
                type: 'SET_ACTIVITY',
                payload: res?.data?.body[0].sloatActivityList,
            });
            console.log('------------------- CGT slot res', res?.data?.body[0].sloatActivityList)
            // const Temp = res?.data?.body[0].sloatActivityList.forEach((element, index) => {
            //     if (moment(Dates, "HH:mm:ss").format("hh:mm A") > '7.00 PM') {
            //         element.selection = true;
            //         console.log("TRUE")
            //     } else {
            //         element.selection = false;
            //         console.log("FALSE")
            //     }
            // });
            setSlotlist(res?.data?.body[0].sloatActivityList);
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
            <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

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
