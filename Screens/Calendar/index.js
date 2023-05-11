import React, { useState, useEffect, useCallback } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    StatusBar,
    Dimensions,
    BackHandler,
    ActivityIndicator,
    Text,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
const { height, width } = Dimensions.get('screen');
// -------------- Component Imports -------------------------
import { api } from '../../Services/Api';
import { COLORS, FONTS } from '../../Constants/Constants';
import Statusbar from '../../Components/StatusBar';
import Header from '../../Components/RepayHeader';
import Cgt from './Components/Cgt';
import CalendarStrips from './Components/Calender';
import Icon from 'react-native-vector-icons/SimpleLineIcons'

const Calendar = ({ navigation, route }) => {

    const isDarkMode = true

    const [slotlist, setSlotlist] = useState([]);
    const [NewDates, setNewDates] = useState(new Date())
    const [status, setStatus] = useState(true)
    const [BStatus, setBstatus] = useState(false);
    const [unScheduledActivities, setUnScheduledActivities] = useState();

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

    // ------------------ get Slot Api Call Start ------------------
    const getCGTslot = async (date) => {
        const data = {
            "employeeId": 1,
            "selectedDate": moment(NewDates).utc().format('DD-MM-YYYY')
        };
        await api.getCGTslot(data).then((res) => {
            console.log("data print", NewDates)
            console.log('------------------- CGT slot res', res?.data?.body[0]?.nonTimeSlotedActivities)
            setSlotlist(res?.data?.body[0].sloatActivityList);
            setUnScheduledActivities(res?.data?.body[0].nonTimeSlotedActivities)
            setStatus(false)
        }).catch((err) => {
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

            <Header navigation={navigation} name={"Calendar"} activity={true} onPress={handleGoBack} />
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

                    <View style={{ flex: 1,marginBottom:width*0.18 }}>
                        <Cgt 
                        navigation={navigation} 
                        data={slotlist} 
                        date={NewDates} 
                        slotlistrefresh={getCGTslot} 
                        />
                    </View>
                    <View style={{ flex: 0.2, justifyContent: 'flex-end' }}>
                        <TouchableOpacity 
                        style={styles.scheduleButton} 
                        onPress={() => navigation.navigate('CalendarActivity', {
                            data: unScheduledActivities, 
                            date: NewDates,
                        })}>
                            <Text style={styles.scheduleText}>Unscheduled Activities</Text>
                            <Icon name="arrow-right" size={12} color={COLORS.colorB} />
                        </TouchableOpacity>
                    </View>
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
    }
})