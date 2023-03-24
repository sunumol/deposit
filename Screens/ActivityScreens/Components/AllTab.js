
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    ScrollView
} from 'react-native';
import { COLORS, FONTS } from '../../../Constants/Constants';
const { height, width } = Dimensions.get('screen');
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DropTab from '../Components/components/dropTab'
import { api } from '../../../Services/Api';
import moment from 'moment';



const ItemTabs = ({ navigation }) => {
    const { t } = useTranslation();
    const [Lang, setLang] = useState('')
    const [dropStatus, setDropStatus] = useState(false)
    const [callcount, setCallcount] = useState();
    const [meetcount, setMeetCount] = useState([]);
    const [listing, setListing] = useState()
    const [enab,setEnab]=useState(false)

  


    const [data, setData] = useState([
        {
            time: "09:00:00",
            data: []
        },
        {
            time: "12:00:00",
            data: [
                {
                    activityId: 52,
                    activityType: "CALL",
                    purpose: "Leads Follow Up",
                    fromTime: "2023-03-03T12:26:15.674",
                    toTime: "2023-02-22T12:00:00",
                    customerName: "Anand451612932",
                    short: "AJ",
                    color: '#94BCC8',
                    mobileNumber: "1092787395",
                    villageName: "Test Village",
                    pin: 2100044061,
                    employeeId: 1,
                    updatedTime: "2023-02-21T16:47:13.745573",
                    updatedBy: "SYSTEM",
                    status: "Not reachable",
                    customerId: null,
                    handled: false
                },
                {
                    activityId: 52,
                    activityType: "MEET",
                    purpose: "Leads Follow Up",
                    fromTime: "2023-03-03T12:26:15.674",
                    toTime: "2023-02-22T12:00:00",
                    short: "AJ",
                    color: '#94BCC8',
                    customerName: "Anand451612932",
                    mobileNumber: "1092787395",
                    villageName: "Test Village",
                    pin: 2100044061,
                    employeeId: 1,
                    updatedTime: "2023-02-21T16:47:13.745573",
                    updatedBy: "SYSTEM",
                    status: "Not reachable",
                    customerId: null, handled: false
                }
                ,]
        },
        {
            time: "12:30:00",
            data: []
        },

    ])




    const [listData, setListData] = useState([

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



    // ------------------ Activity Listing Api Call Start ------------------
    const ActivityListingApiCall = async () => {
        const data = {
            "employeeId": 9252
        };
        await api.activitylistingscreenApi(data).then((res) => {
            console.log('-------------------res', res?.data?.body)
            setListing(res?.data?.body)
            setEnab(false)

        })
            .catch((err) => {
                console.log('-------------------err', err)
            })
    };
    // ------------------ Activity Api Call End ------------------



    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
        
           ActivityListingApiCall()
       
          
        });
getData();
        return unsubscribe;
    }, [navigation,enab]);


    useEffect(() => {
        ActivityListingApiCall()
 }, [enab]);




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
            <View style={{ paddingHorizontal: 20, marginBottom: 10 }}>

                {/* <FlatList
                    data={listing}
                    showsVerticalScrollIndicator={false}
                    renderItem={(item) => {

                        return (
                            <View>
                            {console.log('flatlist-----------',item.item)} 

                                <>
                                    <View style={[styles.containerTab, { backgroundColor: item.open ? 'rgba(242, 242, 242, 0.5)' : COLORS.backgroundColor }]}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.timeText}>{item.item.time} - {item.item.endTime}</Text>
                                        </View>
                                        <View style={{ justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center' }}>
                                            <View style={styles.badgeContainer}>
                                                <Text style={styles.badgeText}>{item.item?.data?.length}</Text>
                                            </View>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    const nextList = [...data];
                                                    nextList[item.index].open = !nextList[item.index].open;
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
                                                <Text style={styles.timeDropStyle}>{item.item.time} (2)</Text>
                                                <Text style={styles.headText}>{t('common:Call')}</Text>

                                                <FlatList
                                                    data={item.item.data}
                                                    renderItem={({ item, index }) => {
                                                        console.log('detials-------', item)


                                                        if (item.activityType == 'CALL') {

                                                            return (
                                                                <DropTab
                                                                    id={item.id}
                                                                    short={item.short}
                                                                    name={item.customerName}
                                                                    text={item.pin}
                                                                    phoneNumber={item.mobileNumber}
                                                                    color={item.color}
                                                                    status={item.purpose}
                                                                    details={item}
                                                                />
                                                            );
                                                        }

                                                    }}




                                                />

                                            </View>
                                            <View>
                                                <Text style={styles.timeDropStyle}>{item.item.time} AM (1)</Text>
                                                <Text style={styles.headText}>{t('common:Meet')}</Text>



                                                <FlatList
                                                    data={item.item.data}
                                                    renderItem={({ item, index }) => {


                                                        if (item.activityType == 'MEET') {
                                                            return (
                                                                <DropTab
                                                                    id={item.id}
                                                                    short={item.short}
                                                                    name={item.customerName}
                                                                    text={item.pin}
                                                                    phoneNumber={item.mobileNumber}
                                                                    color={item.color}
                                                                    status={item.purpose}
                                                                    details={item}
                                                                    navigation={() => navigation.navigate('CGT')}
                                                                />
                                                            );
                                                        }

                                                    }}




                                                />

                                            </View>

                                        </> : null}


                                </>

                            </View>
                        );
                    }}

                /> */}

                {listing?.map((item, index) => {
                 
                
                    return (
                        <>
                         { item.data.length > 0 ?  <TouchableOpacity 
                           onPress={() => {
                            const nextList = [...listing];
                            nextList[index].open = !nextList[index].open;
                            setListing(nextList);
                        }}
                         style={[styles.containerTab, { backgroundColor: item.open ? 'rgba(242, 242, 242, 0.5)' : COLORS.backgroundColor }]}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.timeText}>{item.startTime} - {item.endTime}</Text>
                                </View>
                                <View style={{ justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={styles.badgeContainer}>
                                        <Text style={styles.badgeText}>{item.data.length}</Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => {
                                            const nextList = [...listing];
                                            nextList[index].open = !nextList[index].open;
                                            setListing(nextList);
                                        }}
                                    >
                                        <Icon name={item.open ? "chevron-up" : "chevron-down"}
                                            color={COLORS.colorB}
                                            size={25}
                                            style={{ paddingLeft: 13 }}

                                        />
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity> : null}
                            {item.open
                                ?
                                <>

                                    <View>
                                    {item.callCount >0 ?(   
                                        <>
                                         <Text style={styles.timeDropStyle}>{item.startTime} ({item.callCount})</Text>
                                        <Text style={styles.headText}>{t('common:Call')}</Text>
                                        </>):null}
                                        {item.data.map((item,index) => {
                                            if (item.activityType == 'CALL') {
                                                    console.log('call datasss')
                                                return (
                                                    <DropTab
                                                        id={item.id}
                                                        short={item.short}
                                                        name={item.customerName}
                                                        text={item.pin}
                                                        phoneNumber={item.mobileNumber}
                                                        color={item.color}
                                                        setEnab={setEnab}
                                                        status={item.purpose}
                                                        details={item}
                                                    />
                                                );
                                            }
                                        })}

                                    </View>
                                    <View>
                                       {item.meetCount > 0 ?( 
                                        <>
                                       <Text style={styles.timeDropStyle}>{item.startTime}   ({item.meetCount})</Text>
                                        <Text style={styles.headText}>{t('common:Meet')}</Text>
                                        </>): null}
                                        {item.data.map((item) => {
                                            if (item.activityType == 'MEET') {
                                                return (
                                                    <DropTab
                                                        id={item.id}
                                                        short={item.short}
                                                        name={item.customerName}
                                                        text={item.pin}
                                                        phoneNumber={item.mobileNumber}
                                                        color={item.color}
                                                        status={item.purpose}
                                                        setEnab={setEnab}
                                                        details={item}
                                                        navigation={() => navigation.navigate('CGT',{activityId:item.activityId})}
                                                    />
                                                );
                                            }
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
