import {
    StyleSheet,
    Text,
    View,
    BackHandler,
    StatusBar,
    SafeAreaView,
    Platform,
    TextInput,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Image1 from '../../../assets/image/dig.svg';
import { FONTS, COLORS } from '../../../Constants/Constants';
import Icon1 from 'react-native-vector-icons/FontAwesome';


const { height, width } = Dimensions.get('screen');

const History = ({ navigation }) => {
    const [Data, setData] = useState([
        {
            Id: 1,
            Date: '31 Dec ‘22',
            cash: 'Cash',
            paid: 'Paid by Aiswarya Thomas',
            amount: '₹600',
            color: 'rgba(234, 64, 71, 1)'
        },
        {
            Id: 2,
            Date: '31 Nov ‘22',
            cash: 'Cash',
            paid: 'Paid by Anjana Thomas',
            amount: '₹1,000',
            color: 'rgba(234, 64, 71, 1)'
        },
        {
            Id: 3,
            Date: '31 Oct ‘22',
            cash: 'Digital',
            paid: '',
            amount: '₹1,000',
            color: 'rgba(0, 56, 116, 1)'
        },
        {
            Id: 4,
            Date: '31 Sep ‘22',
            cash: 'Cash',
            paid: 'Paid by Anjana Thomas',
            amount: '₹1,000',
            color: 'rgba(234, 64, 71, 1)'
        },
    ])

    return (

        <>

            <View style={styles.mainContainer}>

                <View>
                    {Data.map((item) => {
                        return (
                            <View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between',marginBottom:width*0.05,marginTop:width*0.05 }}>

                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={styles.DateText}>{item.Date}</Text>
                                        {item.Id !== 3 ? 
                                        <View style={styles.RsCard}>
                                            <Icon1 name="rupee" size={14} color={'#4F4F4F'} />
                                        </View>:
                                        <Image1 width={18} height={18} marginRight={10} marginLeft={2} />}
                                        <Text style={[styles.NumText, { marginRight: 10 }]}>{item.cash}</Text>

                                        {item.paid !== '' ?
                                            <View style={styles.Card1}>
                                                <Text style={[styles.NumText, { paddingLeft: 2, paddingRight: 2 }]}>{item.paid}</Text>
                                            </View> : null}
                                    </View>

                                    <Text style={[styles.AmtText, { color: item.color }]}>{item.amount}</Text>
                                </View>
                                <View style={styles.Line} />
                            </View>
                        )
                    })}
                </View>





            </View>
        </>
    )
}

export default History;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 10,
        backgroundColor: COLORS.colorBackground
    },
    ViewCard: {
        width: width * 0.92,
        height: width * 0.35,
        backgroundColor: COLORS.colorBackground,
        elevation: 2,
        // alignItems: 'center',
        flexDirection: 'row',
        // justifyContent: 'center',
        borderRadius: 15,
        shadowColor: '#000000',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: width*0.05
    },
    Card1: {
        backgroundColor: '#F2F2F2',

        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    TextCust: {
        fontFamily: FONTS.FontRegular,
        fontSize: 12,
        color: 'rgba(128, 128, 128, 1)'
    },
    NumText: {
        color: '#3B3D43',
        fontSize: 11,
        fontFamily: FONTS.FontMedium,

    },
    AmtText: {

        fontSize: 14,
        fontFamily: FONTS.FontSemiB
    },
    DateText: {
        color: '#000000',
        fontFamily: FONTS.FontRegular,
        fontSize: 12,
        marginRight: 5
    },
    RsCard: {
        width: 18,
        height: 18,
        borderWidth: 1,
        borderColor: '#4F4F4F',
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight:10
    },
    Line:{
       borderBottomWidth:0.6,
       borderColor:'#F2F2F2'

    }

})