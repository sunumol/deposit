
import React, { useState, useEffect} from 'react';
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
const [custID,setCustId] = useState('')
    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const Cgtdate = await AsyncStorage.getItem('DATECGT')
            getCGTslot_callback(Cgtdate)

        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        AsyncStorage.getItem("CustomerId").then((value) => {
            setCustId(value)
            getCGTslot(value)
        })
    
    }, [])
    useFocusEffect(
        React.useCallback(() => {
            getData()
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
    const getCGTslot = async (value) => {
        const data = {
            "employeeId": custID?Number(custID): Number(value),
            "selectedDate": moment(NewDates).utc().format('DD-MM-YYYY')
        };
        await api.getCGTslot(data).then((res) => {
            console.log("data print", NewDates)
            setSlotlist(res?.data?.body[0].sloatActivityList);
            setStatus(false)
        }).catch((err) => {
            console.log('-------------------err', err?.response)
            setStatus(false)
        })
    };
    // ------------------ get slot Api Call End ------------------

    // ------------------ get Slot Api Call Start ------------------
    const getCGTslot_callback = async (cgtdate) => {
        const data = {
            "employeeId":Number(custID),
            "selectedDate": moment(cgtdate ? cgtdate : NewDates).utc().format('DD-MM-YYYY')
        };
        await api.getCGTslot(data).then((res) => {

            setSlotlist(res?.data?.body[0].sloatActivityList);
            setStatus(false)
        })
            .catch((err) => {
                console.log('-------------------err slot', err?.response)
                setStatus(false)
            })
    };

    useEffect(() => {
 
    }, []);

    useEffect(() => {
        getCGTslot(NewDates)
    }, [NewDates]);

    useEffect(() => {
        if (NewDates !== NewDates) {
            setNewDates(NewDates)
        }
    }, [NewDates])

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container1} />
            <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

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
