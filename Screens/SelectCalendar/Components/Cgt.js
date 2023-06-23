import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    FlatList,
} from 'react-native';
import moment from 'moment';

// -------------- Component Imports -------------------------
import { COLORS, FONTS } from '../../../Constants/Constants';
import ModalError from './CalenderModal';
import { api } from '../../../Services/Api'
import SuccessModal from './ModalSuccess'

const { height, width } = Dimensions.get('screen');

const Cgt = ({ navigation, data, date, selectedData, status }) => {

    const [ModalVisible, setModalVisible] = useState(false)
    const [ModalVisible2, setModalVisible2] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const rescheduleAPi = async (timestart) => {
        var hrs = Number(timestart.match(/^(\d+)/)[1]);
        var mnts = Number(timestart.match(/:(\d+)/)[1]);
        var format = timestart.match(/\s(.*)$/)[1];
        if (format == "PM" && hrs < 12) hrs = hrs + 12;
        if (format == "AM" && hrs == 12) hrs = hrs - 12;
        var hours = hrs.toString();
        var minutes = mnts.toString();
        if (hrs < 10) hours = "0" + hours;
        if (mnts < 10) minutes = "0" + minutes;
        var timeend = hours + ":" + minutes;
        const dates = moment(date).utc().format('DD-MM-YYYY')
        console.log(timeend);
        if (timeend && dates) {
            const data = {
                "activityId": selectedData?.length <= 1 ? selectedData[0] : '',
                "activityIdList": selectedData?.length > 1 ? selectedData : [],
                "dateTime": `${dates} ${timeend}`,
            };
            await api.setReshedule(data).then((res) => {
                console.log('----------------->>>>', res)
                if (res?.status) {
                    setModalVisible2(true)
                }
            }).catch((err) => {
                console.log('-------------------err slot', err?.response)
            })
        }
    };

    const rescheduleAPiDLE = async () => {
        const dates = moment(date).utc().format('DD-MM-YYYY')
        const data = {
            "activityId": selectedData?.length <= 1 ? selectedData[0] : '',
            "activityIdList": selectedData?.length > 1 ? selectedData : [],
            "dateTime": `${dates} ${'00:00'}`,
        };
        await api.setReshedule(data).then((res) => {
            console.log('----------------->>>>', res)
            if (res?.status) {
                setModalVisible2(true)
            }
        }).catch((err) => {
            console.log('-------------------err slot', err?.response)
        })

    };

    const renderItem = ({ item, index }) => {
        return (
            <View style={{ justifyContent: 'space-around', margin: 5 }} key={index}>
                <TouchableOpacity
        
                    onPress={() => {
                        if(item?.selection == true ){
                        if (data[index + 1]?.availabilityStatu == "notAvailable" || item.availabilityStatu == "notAvailable") {
                            setModalVisible(true)
                            setErrorMessage('Reschedule meet activities from calendar')
                        } else if (data[index]?.time == "06:30 PM") {
                            setModalVisible(true)
                            setErrorMessage('Two free slots are needed for CGT.')
                        }
                        else {
                            rescheduleAPi(item.time)
                        }
                    }
                    }}
                    style={[styles.Touch, { borderColor:item.availabilityStatu == "partiallyAvailable" &&  item?.selection == true ? 'rgba(242, 153, 74, 1)' :
                        item.availabilityStatu == "partiallyAvailable" &&  item?.selection == false ? 'rgb(211, 211, 211)' :
                         item.availabilityStatu == "fullyAvailable" && item?.selection == true ? 'rgba(39, 174, 96, 1)' : 
                         item.availabilityStatu == "fullyAllocated" && item?.selection == true ? 'rgba(234, 64, 71, 1)' : 
                         item.availabilityStatu == "fullyAllocated" && item?.selection == false ? 'rgb(211, 211, 211)' :
                         item.availabilityStatu == "notAvailable" && item?.selection == false ? 'rgb(211, 211, 211)' :
                         item.availabilityStatu == "notAvailable" && item?.selection == true ? 'rgba(162, 148, 200, 1)':
                          item.availabilityStatu == "fullyAvailable" && item?.selection == false &&
                         'rgb(211, 211, 211)' , backgroundColor: COLORS.colorBackground }]}>
                    <Text style={[styles.timeText1, { color: 
                        item.availabilityStatu == "partiallyAvailable" &&  item?.selection == true ? 'rgba(242, 153, 74, 1)' :
                        item.availabilityStatu == "partiallyAvailable" &&  item?.selection == false ? 'rgb(211, 211, 211)' :
                         item.availabilityStatu == "fullyAvailable" && item?.selection == true ? 'rgba(39, 174, 96, 1)' : 
                         item.availabilityStatu == "fullyAllocated" && item?.selection == true ? 'rgba(234, 64, 71, 1)' : 
                         item.availabilityStatu == "fullyAllocated" && item?.selection == false ? 'rgb(211, 211, 211)' :
                         item.availabilityStatu == "notAvailable" && item?.selection == false ? 'rgb(211, 211, 211)' :
                         item.availabilityStatu == "notAvailable" && item?.selection == true ? 'rgba(162, 148, 200, 1)':
                          item.availabilityStatu == "fullyAvailable" && item?.selection == false &&
                         'rgb(211, 211, 211)' }]}>{item.time}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={{ top: 0, flex: 1 }}>
            {status === 'New CGT'
                ? <>
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 0, marginTop: 10 }}>
                        <Text style={styles.timeText}>Time slots</Text>
                    </View>

                    <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                        <FlatList
                            data={data}
                            style={{ marginTop: 10, }}
                            numColumns={3}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </>

                : <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 20, marginHorizontal: 16 }}>

                    <TouchableOpacity style={[styles.continueView, {
                        backgroundColor: COLORS.colorB, shadowColor: '#000000',
                        shadowOffset: { width: 0, height: 7 },
                        shadowOpacity: 0.1,
                        shadowRadius: 3,
                        elevation: 2
                    }]} disabled={false}
                        onPress={rescheduleAPiDLE}>
                        <Text style={[styles.continueText, { color: COLORS.colorBackground }]}>CONTINUE</Text>
                    </TouchableOpacity>

                </View>
            }
            <ModalError
                ModalVisible={ModalVisible}
                setModalVisible={setModalVisible}
                navigation={navigation}
                errorMessage={errorMessage} />
            <SuccessModal
                ModalVisible={ModalVisible2}
                setModalVisible2={setModalVisible2}
                onPressOut={()=> { navigation.navigate('Profile'),setModalVisible2(false)}}
                navigation={navigation} />
        </View>
    )
}

export default Cgt;

const styles = StyleSheet.create({
    timeText: {
        color: '#171930',
        fontSize: 17,
        fontFamily: FONTS.FontSemiB,
        top: -5
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
    continueText: {
        textAlign: 'center',
        fontFamily: FONTS.FontRegular,
        fontSize: 14,
        fontWeight: '700',
        lineHeight: 17,
        letterSpacing: 0.64,
    },
    continueView: {
        height: 48,
        borderRadius: 54,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
