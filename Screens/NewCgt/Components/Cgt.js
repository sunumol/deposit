
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    FlatList,
} from 'react-native';

// ------------------ Component Imports -------------------------
import { COLORS, FONTS } from '../../../Constants/Constants';
import CgtModal from '../../SelectCustomNewCgt/Components/Modal';

const { height, width } = Dimensions.get('screen');

const Cgt = ({ navigation, data, date, setModalVisible1, setModalVisible2, slotlistrefresh }) => {

    const [ModalVisible, setModalVisible] = useState(false)
    

    const renderItem = ({ item, index }) => {
        return (
            <View style={{ justifyContent: 'space-around', margin: 5 }} key={index}>
                <TouchableOpacity
                    onPress={() => {
                        if (data[index + 1]?.availabilityStatu == "notAvailable") {
                            setModalVisible1(true)
                        } else if (data[index]?.time == "06:30 PM") {
                            setModalVisible2(true)
                        }
                        else {
                            item.availabilityStatu == "notAvailable" ? navigation.navigate('Activities', { data: item }) :
                                navigation.navigate('SelectCustomerNewCgt', {
                                    data: item, date: date,
                                })
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
            <CgtModal
                ModalVisible={ModalVisible}
                onPressOut={() => {
                    setModalVisible(false)
                    slotlistrefresh()
                }}
                navigation={navigation}
                setModalVisible={setModalVisible}
            />
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
})
