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

const Cgt = ({ navigation, data, date, selectedData }) => {

    const [ModalVisible, setModalVisible] = useState(false)
    const [ModalVisible2, setModalVisible2] = useState(false)

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

    const renderItem = ({ item, index }) => {
        return (
            <View style={{ justifyContent: 'space-around', margin: 5 }} key={index}>
                <TouchableOpacity
                    onPress={() => {
                        if (data[index + 1]?.availabilityStatu == "notAvailable" || data[index]?.time == "06:30 PM" || item.availabilityStatu == "notAvailable") {
                            setModalVisible(true)
                        } else {
                            rescheduleAPi(item.time)
                        }
                    }}
                    style={[styles.Touch, { borderColor: item.availabilityStatu == "partiallyAvailable" ? 'rgba(242, 153, 74, 1)' : item.availabilityStatu == "fullyAvailable" ? 'rgba(39, 174, 96, 1)' : item.availabilityStatu == "fullyAllocated" ? 'rgba(234, 64, 71, 1)' : item.availabilityStatu == "notAvailable" ? 'rgba(155, 81, 224, 1)' : null, backgroundColor: COLORS.colorBackground }]}>
                    <Text style={[styles.timeText1, { color: item.availabilityStatu == "partiallyAvailable" ? 'rgba(242, 153, 74, 1)' : item.availabilityStatu == "fullyAvailable" ? 'rgba(39, 174, 96, 1)' : item.availabilityStatu == "fullyAllocated" ? 'rgba(234, 64, 71, 1)' : item.availabilityStatu == "notAvailable" ? 'rgba(155, 81, 224, 1)' : null }]}>{item.time}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={{ top: 0 }}>
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
            <ModalError
                ModalVisible={ModalVisible}
                setModalVisible={setModalVisible}
                navigation={navigation} />
            <SuccessModal
                ModalVisible={ModalVisible2}
                setModalVisible2={setModalVisible2}
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
})
