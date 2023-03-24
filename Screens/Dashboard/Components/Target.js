import React from 'react';
import {
    View,
    Image,
    Dimensions,
    StyleSheet,
    Text
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { COLORS, FONTS } from '../../../Constants/Constants';
const { height, width } = Dimensions.get('screen');
import Image1 from '../../../assets/image/Frame.svg';
import Image2 from '../../../assets/image/Group.svg';
import Icon1 from 'react-native-vector-icons/AntDesign';
import TargetLoad from './TargetLoader';

const Target = () => {
    const { t } = useTranslation();

    const Data = [
        {
            id: 1,
            Image: '',
            Name: 'Customers',
            Month: '14',
            Date: '04'
        },
        {
            id: 2,
            Image: '',
            Name: 'Loans',
            Month: '09',
            Date: '01'
        },
    ]
    return (
        <View style={{backgroundColor:COLORS.colorBackground,flex:1}}>

            <TargetLoad />
            <View style={{marginTop:width*0.05}}>
            <View style={{ justifyContent: 'flex-start', marginLeft: 16 }}>
                <Text style={styles.Target}>Pending target</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 16 }}>
                {Data.map((item) => {
                    return (
                        <View style={styles.Card}>

                            <View style={{ flexDirection: 'row', marginTop: 12, marginLeft: 12, marginRight: 12 }}>
                                <View style={styles.CircleView}>
                                    {item.id === 1 ? <Image2 width={22} height={22} /> : <Image1 width={22} height={22} />}
                                </View>

                                <Text style={styles.NameText}>{item.Name}</Text>
                            </View>

                            <View style={{ marginLeft: width * 0.15, top: -5 }}>
                                <Text style={styles.MonthText}>{item.Month}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginBottom: width * 0.025, marginLeft: width * 0.1, top: -5 }}>
                                <Icon1 name='arrowup' size={14} color={'rgba(39, 174, 96, 1)'} style={{ marginTop: 5 }} />
                                <Text style={[styles.NameText, { color: 'rgba(39, 174, 96, 1)', }]}>{item.Date}</Text>
                                <Text style={[styles.NameText, { fontFamily: FONTS.FontRegular, left: 5 }]}>last month</Text>
                            </View>
                        </View>
                    )
                })}
            </View>
            </View>
        </View>
    )
}

export default Target;

const styles = StyleSheet.create({
    Target: {
        fontFamily: FONTS.FontSemiB,
        color: 'rgba(35, 31, 32, 1)',
        fontSize: 14
    },
    Card: {
        backgroundColor: COLORS.colorBackground,
        width: width * 0.44,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        elevation: 5,
        shadowRadius: 1,

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
        fontSize: 12,
        color: COLORS.colorDark,
        fontFamily: FONTS.FontMedium,

        marginTop: width * 0.01
    },
    MonthText: {
        fontSize: 24,
        color: COLORS.colorB,
        fontFamily: FONTS.FontSemiB
    }
})