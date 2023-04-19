
import React, { useState, useEffect, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    KeyboardAvoidingView,
    StatusBar,
    ScrollView,
    Dimensions,
    BackHandler,
    ActivityIndicator
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS, FONTS } from '../../Constants/Constants';
import Statusbar from '../../Components/StatusBar';
import Header from '../../Components/RepayHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Cgt from './Components/Cgt';
import CalendarStrips from './Components/Calender';
import moment from 'moment';
import { api } from '../../Services/Api';
import { useDispatch, useSelector } from 'react-redux';


const NewCgt = ({ navigation, date }) => {
    const route = useRoute();

    console.log("rEDUX DATA", date);
    const isDarkMode = true
    const [CgtDate, setCgtDate] = useState('')
    const { t } = useTranslation();
    const [lang, setLang] = useState('');
    const [BStatus, setBstatus] = useState(false);
    const [slotlist, setSlotlist] = useState([]);
    const [enab, setEnab] = useState(false)
    const [selectedDate, setSelectedDate] = useState(moment().format());
    const [NewDates, setNewDates] = useState(new Date())
    const cgtdate = useSelector(state => state?.NewcgtSlot)
    const [status,setStatus] = useState(true)
   
    const dispatch = useDispatch()

    useEffect(() => {
        getData(),
       // getCGTslot()

        //  setCgtDate(useSelector(state => state?.NewcgtSlot));
        console.log("slectedDATE data pass", NewDates)
    }, [])

    const getData = async () => {
        try {
            const lang = await AsyncStorage.getItem('user-language')
           const Cgtdate = await AsyncStorage.getItem('DATECGT')
           console.log("cgtdate async",Cgtdate)
            setLang(lang)
            //setNewDates(Cgtdate)
            getCGTslot_callback(Cgtdate)

        } catch (e) {
            console.log(e)
        }
    }
    useFocusEffect(
        React.useCallback(() => {
            getData()

           // const Cgtdate =  AsyncStorage.getItem('DATECGT')
          console.log('Screen was focused',NewDates);
          
          // Do something when the screen is focused
          return () => {
            console.log('Screen was focused');
            // Do something when the screen is unfocused
            // Useful for cleanup functions
          };
        }, [])
      );
    

    const callback = (value) => {
        console.log("callback called", value)

        // const date = moment(value).utc().format('DD-MM-YYYY')
        setSelectedDate(value)
        getCGTslot()
        console.log("date of passing", NewDates)
    }
 
    // ------------------ get Slot Api Call Start ------------------
    const getCGTslot = async (date) => {
        // console.log("function set",date)
        console.log('api called', NewDates)
        //console.log("selectedDate", selectedDate)
        const data = {
            "employeeId": 1,
            "selectedDate": moment(NewDates).utc().format('DD-MM-YYYY')
        };
        await api.getCGTslot(data).then((res) => {
            dispatch({
                type: 'SET_ACTIVITY',
                payload: res?.data?.body[0].sloatActivityList,
            });
            console.log("data print", NewDates)
            console.log('------------------- CGT slot res', res.data?.body[0].sloatActivityList)
            setSlotlist(res?.data?.body[0].sloatActivityList);
            setStatus(false)
            setEnab(false)
            


        })
            .catch((err) => {
                console.log('-------------------err', err?.response)
                setStatus(false)
            })
    };
    // ------------------ get slot Api Call End ------------------


        // ------------------ get Slot Api Call Start ------------------
        const getCGTslot_callback = async (cgtdate) => {
            // console.log("function set",date)
            console.log('api called',cgtdate,NewDates)
            //console.log("selectedDate", selectedDate)
            const data = {
                "employeeId": 1,
                "selectedDate": moment(cgtdate?cgtdate:NewDates).utc().format('DD-MM-YYYY')
            };
            await api.getCGTslot(data).then((res) => {
                dispatch({
                    type: 'SET_ACTIVITY',
                    payload: res?.data?.body[0].sloatActivityList,
                });
                console.log("data print", NewDates)
                console.log('------------------- CGT slot res', res.data?.body[0].sloatActivityList)
                setSlotlist(res?.data?.body[0].sloatActivityList);
                setStatus(false)
                setEnab(false)
                
    
    
            })
                .catch((err) => {
                    console.log('-------------------err slot', err?.response)
                    setStatus(false)
                })
        };

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




    { console.log('====fkjkfjkjfkjrf', enab) }

    useEffect(() => {
        getCGTslot()
        console.log("API CALLED")
    }, []);
    useEffect(() => {
        getCGTslot(NewDates)
        console.log("API CALLED")
    }, [NewDates]);

    useEffect(() => {
        if (NewDates !== NewDates) {
            setNewDates(NewDates)
        }
        //callback()
        console.log("selected date INDEX PRINT", NewDates)
    }, [NewDates])


    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container1} />
            <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

            <Header navigation={navigation} name={"New CGT"} activity={true} onPress={handleGoBack} />
            {status ? 
                <View style={{alignItems:'center',justifyContent:'center',flex:1,}}>
                <ActivityIndicator size={30} color={COLORS.colorB}/>
                </View>:
            <View style={styles.ViewContent}>
                <CalendarStrips callback={callback} setNewDates={setNewDates} NewDates={NewDates} getCGTslot={()=>getCGTslot()} />
                <Cgt navigation={navigation} data={slotlist} date={NewDates} setEnab={setEnab} />

                {/* <DatePicker/> */}


            </View>}

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
        // justifyContent: 'center',
        //alignItems: 'center',
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
    }
})
