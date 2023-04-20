
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



const Cgt = ({navigation,data,date}) => {
    console.log('',date)
    const [status, setStatus] = useState(false);
    const weekDay = [];
    const year = [];
    const [slotlist,setSlotlist] = useState([]);
    const [currentDate, setCurrentDate] = useState(date);
    const [DateStatus, setDateStatus] = useState(false)
    const [selectedItem1, setSelectedItem1] = useState()
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


 useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
        setStatus(false)
       console.log('CGT',slotlist)

      // do something
    });

    return unsubscribe;
  
  }, [navigation]);



    const renderItem = ({ item }) => {
        return (
            <View style={{ justifyContent: 'space-around', margin: 5 }}>
                <TouchableOpacity 
                onPress={() => { item.availabilityStatu == "notAvailable" ? navigation.navigate('Activities',{data:item}):
                 navigation.navigate('SelectCustomerNewCgt',{data : item,date :date,
                }) }}
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
