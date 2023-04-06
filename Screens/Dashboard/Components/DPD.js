import React, { useState, useEffect } from 'react';
import {
    View,
    Image,
    Dimensions,
    StyleSheet,
    Text,
   ActivityIndicator
} from 'react-native';
import { useTranslation } from 'react-i18next';
const { height, width } = Dimensions.get('screen');
import { FONTS, COLORS } from '../../../Constants/Constants';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/AntDesign';
import DPDPriority from './DPDpriority';
import { api } from '../../../Services/Api';


const DPD = () => {
    const { t } = useTranslation();
    const [EMPID, setEMPID] = useState('1')
    const [Sort,setSort] = useState('arrear')
    const [DpdData1, setDpdData1] = useState([])
    const [CustomDetails,setCustomDetails] = useState([])
    const [stateRefresh,setStateRefresh]=useState(false)
    const [Status,setStatus] = useState(true)
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
    // <Icon2 name='arrowdown' size={14} color={item.color} style={{ marginTop: 5 }} />}
    useEffect(() => {
        getDPDOverview()
    }, [stateRefresh])

    const getDPDOverview = () => {
        console.log("inside api",EMPID,Sort)
        
        api.DPDOverview(EMPID,Sort).then(result => {
            if (result) {
                console.log("avail....", result.data.body)
                setDpdData1(result?.data?.body?.customerDpdDetails)
                setCustomDetails(result?.data?.body?.customerDueDetails)
                setStateRefresh(false)
                setStatus(false)
            }
        })
            .catch(err => {
                console.log("DPD OVERVIEW---->", err);
                setStatus(false)
            });
    }
    return (
        <>
              {Status ?
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, }}>
                    <ActivityIndicator size={30} color={COLORS.colorB} />
                </View> :
        <View style={{ backgroundColor: COLORS.colorBackground, flex: 1 }}>

            <View style={{ justifyContent: 'flex-start', marginTop: 10, marginLeft: 16 }}>
                <Text style={styles.Target}>DPD Overview</Text>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}>

                <View style={styles.Card}>
                    <View style={{ flexDirection: 'row', marginTop: 12, }}>
                        <Text style={styles.NameText}>1-30</Text>
                    </View>

                    <View style={{ top: 0 }}>
                        <Text style={styles.MonthText}>{DpdData1?.SEG_1_TO_30?.dpdCount}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginBottom: width * 0.025, top: -5, alignItems: 'center', justifyContent: 'center' }}>
                    {DpdData1?.SEG_1_TO_30?.dpdCount >= DpdData1?.SEG_1_TO_30?.changeInDpdCount ? 
                        <Icon1 name='arrowup' size={14} color={'rgba(235, 87, 87, 1)'} style={{ marginTop: 5 }} />:
                        <Icon2 name='arrowdown' size={14} color={'rgba(39, 174, 96, 1)'} style={{ marginTop: 5 }} />}

                        <Text style={[styles.NameText,{color: DpdData1?.SEG_1_TO_30?.dpdCount >= DpdData1?.SEG_1_TO_30?.changeInDpdCount ? 'rgba(235, 87, 87, 1)':'rgba(39, 174, 96, 1)'}]}>{DpdData1?.SEG_1_TO_30?.changeInDpdCount}</Text>
                        <Text style={[styles.NameText, { fontFamily: FONTS.FontRegular, fontSize: 13, marginLeft: 5 }]}>last month</Text>
                    </View>


                </View>

                <View style={styles.Card}>
                    <View style={{ flexDirection: 'row', marginTop: 12, }}>
                        <Text style={styles.NameText}>31-60</Text>
                    </View>

                    <View style={{ top: 0 }}>
                        <Text style={styles.MonthText}>{DpdData1?.SEG_31_TO_60?.dpdCount}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginBottom: width * 0.025, top: -5, alignItems: 'center', justifyContent: 'center' }}>

                    {DpdData1?.SEG_31_TO_60?.dpdCount >= DpdData1?.SEG_31_TO_60?.changeInDpdCount ? 
                        <Icon1 name='arrowup' size={14} color={'rgba(235, 87, 87, 1)'} style={{ marginTop: 5 }} />:
                        <Icon2 name='arrowdown' size={14} color={'rgba(39, 174, 96, 1)'} style={{ marginTop: 5 }} />}

                        <Text style={[styles.NameText,{color: DpdData1?.SEG_31_TO_60?.dpdCount >= DpdData1?.SEG_31_TO_60?.changeInDpdCount ? 'rgba(235, 87, 87, 1)':'rgba(39, 174, 96, 1)'} ]}>{DpdData1?.SEG_31_TO_60?.changeInDpdCount}</Text>
                        <Text style={[styles.NameText, { fontFamily: FONTS.FontRegular, fontSize: 13, marginLeft: 5 }]}>last month</Text>
                    </View>


                </View>
            </View>

            <View style={{ alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}>

                <View style={styles.Card}>
                    <View style={{ flexDirection: 'row', marginTop: 12, }}>
                        <Text style={styles.NameText}>61-90</Text>
                    </View>

                    <View style={{ top: 0 }}>
                        <Text style={styles.MonthText}>{DpdData1?.SEG_61_TO_90?.dpdCount}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginBottom: width * 0.025, top: -5, alignItems: 'center', justifyContent: 'center' }}>
                    {DpdData1?.SEG_61_TO_90?.dpdCount >= DpdData1?.SEG_61_TO_90?.changeInDpdCount ? 
                        <Icon1 name='arrowup' size={14} color={'rgba(235, 87, 87, 1)'} style={{ marginTop: 5 }} />:
                        <Icon2 name='arrowdown' size={14} color={'rgba(39, 174, 96, 1)'} style={{ marginTop: 5 }} />}
      

                        <Text style={[styles.NameText, {color: DpdData1?.SEG_61_TO_90?.dpdCount >= DpdData1?.SEG_61_TO_90?.changeInDpdCount ? 'rgba(235, 87, 87, 1)':'rgba(39, 174, 96, 1)'}]}>{DpdData1?.SEG_61_TO_90?.changeInDpdCount}</Text>
                        <Text style={[styles.NameText, { fontFamily: FONTS.FontRegular, fontSize: 13, marginLeft: 5 }]}>last month</Text>
                    </View>


                </View>

                <View style={styles.Card}>
                    <View style={{ flexDirection: 'row', marginTop: 12, }}>
                        <Text style={styles.NameText}>90 above</Text>
                    </View>

                    <View style={{ top: 0 }}>
                        <Text style={styles.MonthText}>{DpdData1?.SEG_90_ABOVE?.dpdCount}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginBottom: width * 0.025, top: -5, alignItems: 'center', justifyContent: 'center' }}>

                    {DpdData1?.SEG_90_ABOVE?.dpdCount >= DpdData1?.SEG_90_ABOVE?.changeInDpdCount ? 
                        <Icon1 name='arrowup' size={14} color={'rgba(235, 87, 87, 1)'} style={{ marginTop: 5 }} />:
                        <Icon2 name='arrowdown' size={14} color={'rgba(39, 174, 96, 1)'} style={{ marginTop: 5 }} />}

                        <Text style={[styles.NameText, { color: DpdData1?.SEG_90_ABOVE?.dpdCount >= DpdData1?.SEG_90_ABOVE?.changeInDpdCount ? 'rgba(235, 87, 87, 1)':'rgba(39, 174, 96, 1)', }]}>{DpdData1?.SEG_90_ABOVE?.changeInDpdCount}</Text>
                        <Text style={[styles.NameText, { fontFamily: FONTS.FontRegular, fontSize: 13, marginLeft: 5 }]}>last month</Text>
                    </View>


                </View>
            </View>
            <DPDPriority  CustomDetails={CustomDetails} setStateRefresh={setStateRefresh} setSort={setSort}/>

        </View>}
        </>
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
        left: 2,
        marginTop: width * 0.01
    },
    MonthText: {
        fontSize: 32,
        color: COLORS.colorB,
        fontFamily: FONTS.FontSemiB,
        color: 'rgba(235, 87, 87, 1)'
    },

})