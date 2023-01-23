import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView
} from 'react-native';
import { COLORS, FONTS } from '../../../Constants/Constants';
const { height, width } = Dimensions.get('screen');
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DropTab from '../Components/components/dropTab'


const ItemTabs = (props) => {
    const { t } = useTranslation();
    const [Lang, setLang] = useState('')
    const [dropStatus, setDropStatus] = useState(false)
    const [data, setData] = useState([{
        id: 1,
        startTime: '07:00 AM ',
        endTime: '10:00 AM',
        badge: 4,
        open: false
    }, {
        id: 1,
        startTime: '10:00 AM',
        endTime: '01:00 PM',
        badge: 3,
        open: false
    },
    {
        id: 1,
        startTime: '01:00 PM',
        endTime: '04:00 PM',
        badge: 4,
        open: false
    },
    {
        id: 1,
        startTime: '04:00 PM',
        endTime: '07:00 PM',
        badge: 2,
        open: false
    }])
    const [listData, setListData] = useState([
        {
            id: '1',
            short: 'EI',
            name: 'Elizabeth Immanuel Ko...',
            text: 'Kaippattur',
            phoneNumber: '828XXXXX00',
            color: '#C8BD94',
            status: 'Lead',
        },
        {
            id: '2',
            short: 'AJ',
            name: 'Ashly James',
            text: '682025',
            phoneNumber: '878XXXXX00',
            color: '#94BCC8',
            status: 'Explain',
        },
        {
            id: '3',
            short: 'NM',
            name: 'Sismi Joseph',
            text: '682025',
            phoneNumber: '965XXXXX00',
            color: '#9EC894',
            status: 'Explain',
        }
    ])
    const [meetData, setMeetData] = useState([
        {
            id: '1',
            short: 'KA',
            name: 'Kripa Anil',
            text: '682025',
            phoneNumber: '677XXXXX00',
            color: '#94BCC8',
            status: 'Conduct',
        },

    ])




    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const lang = await AsyncStorage.getItem('user-language')
            setLang(lang)

        } catch (e) {
            console.log(e)
        }
    }
    return (
        <ScrollView style={{ flex: 1, backgroundColor: COLORS.colorBackground }}>
            <View style={{ paddingHorizontal: 20 }}>
                {data.map((item, index) => {
                    return (
                        <>
                            <View style={[styles.containerTab,{backgroundColor:item.open?'rgba(242, 242, 242, 0.5)':COLORS.backgroundColor}]}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.timeText}>{item.startTime} - {item.endTime}</Text>
                                </View>
                                <View style={{ justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={styles.badgeContainer}>
                                        <Text style={styles.badgeText}>{item.badge}</Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => {
                                            const nextList = [...data];
                                            nextList[index].open = !nextList[index].open;
                                            setData(nextList);
                                        }}
                                    >
                                        <Icon name={item.open ? "chevron-up" : "chevron-down"}
                                            color={COLORS.colorB}
                                            size={25}
                                            style={{ paddingLeft: 13 }}

                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {item.open
                                ?
                                <>
                                    <View>
                                        <Text style={styles.timeDropStyle}>07:00 AM (3)</Text>
                                        <Text style={styles.headText}>{t('common:Call')}</Text>
                                        {listData.map((item) => {
                                            return (
                                                <DropTab
                                                    id={item.id}
                                                    short={item.short}
                                                    name={item.name}
                                                    text={item.text}
                                                    phoneNumber={item.phoneNumber}
                                                    color={item.color}
                                                    status={item.status}
                                                    details={item}
                                                />
                                            );
                                        })}

                                    </View>
                                    <View>
                                        <Text style={styles.timeDropStyle}>08:30 AM (1)</Text>
                                        <Text style={styles.headText}>{t('common:Meet')}</Text>
                                        {meetData.map((item) => {
                                            return (
                                                <DropTab
                                                    id={item.id}
                                                    short={item.short}
                                                    name={item.name}
                                                    text={item.text}
                                                    phoneNumber={item.phoneNumber}
                                                    color={item.color}
                                                    status={item.status}
                                                    details={item}
                                                />
                                            );
                                        })}

                                    </View>
                                </> : null}


                        </>
                    )
                })
                }

            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    containerTab: {
        width: '100%',
        paddingHorizontal: 17,
        paddingVertical: 13,
        borderWidth: 1,
        borderColor: COLORS.colorBorder,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 6,
        marginTop: 15
    },
    badgeContainer: {
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: 'rgba(234, 64, 71, 0.1)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    badgeText: {
        fontSize: 12,
        fontFamily: FONTS.FontBold,
        color: COLORS.colorRed
    },
    timeText: {
        fontSize: 14,
        fontFamily: FONTS.FontSemiB,
        color: COLORS.colorB,
    },
    timeDropStyle: {
        fontSize: 11,
        fontFamily: FONTS.FontMedium,
        color: COLORS.colorDSText,
        paddingTop: 15,
        paddingLeft: 8

    },
    headText: {
        fontSize: 12,
        fontFamily: FONTS.FontSemiB,
        color: COLORS.colorDark,
        letterSpacing: 0.64,
        paddingTop: 5,
        paddingLeft: 8
    }
})
export default ItemTabs;