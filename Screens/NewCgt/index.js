
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
    BackHandler
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
import { useDispatch } from 'react-redux';

const NewCgt = ({ navigation, }) => {
    const route = useRoute();
    console.log("route name",);
    const isDarkMode = true
    const { t } = useTranslation();
    const [lang, setLang] = useState('');
    const [BStatus, setBstatus] = useState(false);
    const [slotlist,setSlotlist] = useState([]);
    const [enab,setEnab]=useState(false)
    const [ selectedDate,setSelectedDate] = useState(moment().format());
    const dispatch = useDispatch()
    useEffect(() => {
        getData(),
        getCGTslot()
    }, [])

    const getData = async () => {
        try {
            const lang = await AsyncStorage.getItem('user-language')
            setLang(lang)

        } catch (e) {
            console.log(e)
        }
    }


    const callback =(value) =>{
       // const date = moment(value).utc().format('DD-MM-YYYY')
        setSelectedDate(value)
        getCGTslot(value)
     
    }


              // ------------------ get Slot Api Call Start ------------------
              const getCGTslot = async (date) => {
                console.log('api called',date)
                console.log("selectedDate",selectedDate)
                 const data = {
                     "employeeId": 1,
                     "selectedDate":  moment(date ? date : selectedDate ).utc().format('DD-MM-YYYY')
                 };
                 await api.getCGTslot(data).then((res) => {
                    dispatch({
                        type: 'SET_ACTIVITY',
                        payload:res?.data?.body[0].sloatActivityList,
                    });
                    console.log("data print",data)
                     console.log('------------------- CGT slot res', res.data?.body[0].sloatActivityList)
                      setSlotlist(res?.data?.body[0].sloatActivityList);
                      setEnab(false)
                   
         
                 })
                     .catch((err) => {
                         console.log('-------------------err', err?.response)
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

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
        
            getCGTslot()
       
        });

        return unsubscribe;
    }, [navigation,enab]);

    {console.log('====fkjkfjkjfkjrf',enab)}
    
    useEffect(() => {
        getCGTslot()
    }, [enab]);

 



    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container1} />
            <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

            <Header navigation={navigation} name={"New CGT"}  activity = {true} onPress={handleGoBack} />
            <View style={styles.ViewContent}>
          
           
                <CalendarStrips callback ={callback}/>
                <Cgt navigation={navigation} data ={slotlist}  date ={selectedDate}  setEnab={setEnab}/>
              
                {/* <DatePicker/> */}


            </View>

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
