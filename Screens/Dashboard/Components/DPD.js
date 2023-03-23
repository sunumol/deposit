import React from 'react';
import {
    View,
    Image,
    Dimensions,
    StyleSheet,
    Text,
    FlatList
} from 'react-native';
import { useTranslation } from 'react-i18next';
const { height, width } = Dimensions.get('screen');
import { FONTS, COLORS } from '../../../Constants/Constants';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/AntDesign';
import DPDPriority from './DPDpriority';

const DPD = () => {
    const { t } = useTranslation();

    const Data = [
        {
            id: 1,
            Date1: '1-30',
            Date2: '14',
            Date3: '04',
            color: 'rgba(235, 87, 87, 1)',
        },
        {
            id: 2,
            Date1: '31-60',
            Date2: '10',
            Date3: '04',
            color: 'rgba(39, 174, 96, 1)'
        },
        {
            id: 3,
            Date1: '61-90',
            Date2: '06',
            Date3: '01',
            color: 'rgba(235, 87, 87, 1)',
        },
        {
            id: 4,
            Date1: '90 above',
            Date2: '02',
            Date3: '03',
            color: 'rgba(39, 174, 96, 1)'
        },
    ]

    return (
        <View style={{backgroundColor:COLORS.colorBackground,flex:1}}>

            <View style={{ justifyContent: 'flex-start', marginTop: 10, marginLeft: 16 }}>
                <Text style={styles.Target}>DPD Overview</Text>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <FlatList
                    data={Data}
                    keyExtractor={item => item.id}
                    horizontal={false}
                    numColumns={2}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={styles.Card}>
                                <View style={{ flexDirection: 'row', marginTop: 12, }}>
                                    <Text style={styles.NameText}>{item.Date1}</Text>
                                </View>

                                <View style={{ top: 0 }}>
                                    <Text style={styles.MonthText}>{item.Date2}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', marginBottom: width * 0.025, top: -5, alignItems: 'center', justifyContent: 'center' }}>
                                    {item?.id == 1 || item.id == 3 ?
                                        <Icon1 name='arrowup' size={14} color={item.color} style={{ marginTop: 5 }} /> :
                                        <Icon2 name='arrowdown' size={14} color={item.color} style={{ marginTop: 5 }} />}
                                    <Text style={[styles.NameText, { color: item.color, }]}>{item.Date3}</Text>
                                    <Text style={[styles.NameText, { fontFamily: FONTS.FontRegular, fontSize: 13, marginLeft: 5 }]}>last month</Text>
                                </View>

                            </View>
                        )
                    }}
                />
            </View>
            <DPDPriority />

        </View>
    )
}

export default DPD;

const styles = StyleSheet.create({
    Target: {
        fontFamily: FONTS.FontSemiB,
        color: 'rgba(35, 31, 32, 1)',
        fontSize: 14,
        marginBottom: 6
    },
    Card: {
        backgroundColor: COLORS.colorBackground,
        width: width * 0.43,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        elevation: 5,
        shadowRadius: 1,
        alignItems: 'center',
        margin: 8,


    },
    CircleView: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: COLORS.colorB,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 9
    },
    NameText: {
        fontSize: 14,
        color: COLORS.colorDark,
        fontFamily: FONTS.FontMedium,

        marginTop: width * 0.01
    },
    MonthText: {
        fontSize: 32,
        color: COLORS.colorB,
        fontFamily: FONTS.FontSemiB,
        color: 'rgba(235, 87, 87, 1)'
    },

})