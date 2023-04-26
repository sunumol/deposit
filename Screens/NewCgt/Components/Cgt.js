
import React, { useState, useEffect, useCallback, useRef } from 'react';
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
    FlatList,
    Button
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS, FONTS } from '../../../Constants/Constants';
const { height, width } = Dimensions.get('screen');
// import moment from 'moment/moment';
// import { useTranslation } from 'react-i18next';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { api } from '../../../Services/Api';
import { useDispatch } from 'react-redux';
import {CalenderModal} from './CalenderModal'
import CgtModal from '../../SelectCustomNewCgt/Components/Modal';
import moment from 'moment';





const Cgt = ({navigation,data,date,setModalVisible1,setModalVisible2,rescheduledata,slotlistrefresh}) => {
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~',reschedulecgt)
    const [status, setStatus] = useState(false);
    const weekDay = [];
    const year = [];
    const [slotlist,setSlotlist] = useState([]);
    const [currentDate, setCurrentDate] = useState(date);
    const [reschedulecgt, setReschedulecgt] = useState('')
    const [selectedItem1, setSelectedItem1] = useState()
    const [ModalVisible, setModalVisible] = useState(false)
    const [enab,setEnab]=useState(false)
    const dispatch = useDispatch()

    const ChooseDate = (day) => {
        console.log("day selection...", day)
        setSelectedItem1(day)
    }

    const OnPress = (item)=>{
        if(!status){
            setStatus(true)
           
        }else{
          navigation.navigate('SelectCustomer')
        }
    }
useEffect(()=>{setReschedulecgt(rescheduledata)},[rescheduledata])

 useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
        setStatus(false)
       console.log('CGT',slotlist)

      // do something
    });

    return unsubscribe;
  
  }, [navigation]);

  const createCGT = async (time) => {




    let date1 = (moment(date).utc().format("DD-MM-YYYY"))
    // let selectedtime = route?.params?.data?.time
        let selectedtime = moment(time.time, ["h:mm A"]).format("HH:mm");
    let time1 = selectedtime.slice(0, 5);





    console.log('schedule time123========>>>>>', date1, time1)

    const data = {
        "employeeId": 1,
        "customerId": reschedulecgt.primaryCustomerId,
        "scheduleStartTime": date1 + " " + time1
    }
    await api.createCGT(data).then((res) => {
        console.log('------------------- create CGT res', res)
        // setCustomerList(res?.data?.body)
        setModalVisible(true)
        setEnab(true)
    })
        .catch((err) => {
            console.log('-------------------err', err?.response)
        })
};

    const renderItem = ({ item ,index}) => {
        return (
            <View style={{ justifyContent: 'space-around', margin: 5 }}>
                <TouchableOpacity 
                // onPress={() => { item.availabilityStatu == "notAvailable" ? navigation.navigate('Activities',{data:item}):
                //  navigation.navigate('SelectCustomerNewCgt',{data : item,date :date,
                // }) }}
                onPress={() => { 

                    if(reschedulecgt){

                        if(data[index+1]?.availabilityStatu == "notAvailable" ){
                            setModalVisible1(true)
                         } else if(data[index]?.time == "06:30 PM" ){
                            setModalVisible2(true)
                         }
                         else{
                            createCGT(item)
                         }

                    
                    }else{
                        if(data[index+1]?.availabilityStatu == "notAvailable" ){
                            setModalVisible1(true)
                         } else if(data[index]?.time == "06:30 PM" ){
                            setModalVisible2(true)
                         }
                         else{
                             item.availabilityStatu == "notAvailable" ? navigation.navigate('Activities',{data:item}):
                      navigation.navigate('SelectCustomerNewCgt',{data : item,date :date,
                     })
                         }

                    }
                 
                
                     }}
                    style={[styles.Touch, { borderColor: item.availabilityStatu == "partiallyAvailable"  ? 'rgba(242, 153, 74, 1)': item.availabilityStatu == "fullyAvailable"  ? 'rgba(39, 174, 96, 1)':item.availabilityStatu == "fullyAllocated"  ? 'rgba(234, 64, 71, 1)':item.availabilityStatu == "notAvailable"  ? 'rgba(155, 81, 224, 1)':null, backgroundColor: COLORS.colorBackground }]}>
                    <Text style={[styles.timeText1, { color: item.availabilityStatu == "partiallyAvailable"  ? 'rgba(242, 153, 74, 1)': item.availabilityStatu == "fullyAvailable"  ? 'rgba(39, 174, 96, 1)':item.availabilityStatu == "fullyAllocated"  ? 'rgba(234, 64, 71, 1)':item.availabilityStatu == "notAvailable"  ? 'rgba(155, 81, 224, 1)':null }]}>{item.time}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={{top:0}}>
            <View style={{ alignItems: 'center', justifyContent: 'center' ,marginBottom:0,marginTop:10}}>
                <Text style={styles.timeText}>Time slots</Text>
            </View>

            <View style={{ alignItems: 'center', justifyContent: 'center' ,marginBottom:10}}>
                <FlatList
                    data={data}
                    style={{ marginTop: 10, }}
                    numColumns={3}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}

                />
            </View>
            <CgtModal ModalVisible={ModalVisible}
                        onPressOut={() => {
                            setModalVisible(false)
                            slotlistrefresh()
                            // navigation.navigate('NewCgt')
                        }}

                        navigation={navigation}
                        //  onPressOut={() => setModalVisible(!ModalVisible)}
                        setModalVisible={setModalVisible} />

           
        </View>
    )
}

export default Cgt;

const styles = StyleSheet.create({
    timeText: {
        color: '#171930',
        fontSize: 17,
        fontFamily: FONTS.FontSemiB,
        top:-5
        
    },
    timeText1: {

        fontSize: 16,
        fontFamily: FONTS.FontRegular
    },
    Touch: {
        borderWidth: 1,
        width: width * 0.26,
        height: width * 0.118,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
    },
    daterow: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
})
