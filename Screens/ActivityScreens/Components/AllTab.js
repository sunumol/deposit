import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { useNetInfo } from "@react-native-community/netinfo";

// -------------- Component Imports --------------------------
import { COLORS, FONTS } from '../../../Constants/Constants';
import NetworkScreen from '../../../Components/NetworkError2';
import DropTab from '../Components/components/dropTab';
import MeetTab from './components/MeetTab';
import { api } from '../../../Services/Api';

const ItemTabs = ({ navigation }) => {

    const { t } = useTranslation();
    const netInfo = useNetInfo();

    const [slottedlisting, setSlottedListing] = useState()
    const [nonslottedActivities, setNonslottedActivities] = useState()
    const [collectiondata, setCollectiondata] = useState()
    const [dleopen, setDleopen] = useState(false)
    const [collectionopen, setCollectionopen] = useState(false)
    const [enab, setEnab] = useState(false)

    // ------------------ Activity Listing Api Call Start ------------------
    const ActivityListingApiCall = async () => {
        const data = {
            "employeeId": 1
        };
        await api.activitylistingscreenApi(data).then((res) => {
            res?.data?.body?.slottedActivities.forEach(function (item) {
                item.open = false
            })
            console.log('-------------------res all', res?.data?.body?.slottedActivities)
            setSlottedListing(res?.data?.body?.slottedActivities)
            setNonslottedActivities(res?.data?.body?.nonSlottedActivities)
            setEnab(false)
        }).catch((err) => {
            console.log('-------------------err', err)
        })
    };
    // ------------------ Activity Api Call End ------------------

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setDleopen(false)
            setCollectionopen(false)
            ActivityListingApiCall()
        });
        return unsubscribe;
    }, [navigation, enab]);

    useEffect(() => {
        ActivityListingApiCall()
    }, [enab]);

    return (
        <>
            {netInfo.isConnected
                ?
                <ScrollView style={{ flex: 1, backgroundColor: COLORS.colorBackground }}>
                    <View style={{ paddingHorizontal: 20, marginBottom: 10 }}>

                        <>
                            <TouchableOpacity
                                onPress={() => {
                                    setCollectionopen(!collectionopen)
                                    slottedlisting.forEach(function (item) {
                                        item.open = false
                                    })
                                    if (dleopen) {
                                        setDleopen(!dleopen)
                                    }
                                }}
                                style={[styles.containerTab, { backgroundColor: collectionopen ? 'rgba(242, 242, 242, 0.5)' : COLORS.backgroundColor }]}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ color: 'rgba(242, 153, 74, 1)', fontSize: 14, fontFamily: FONTS.FontSemiB }}>Collection Follow Ups </Text>
                                </View>
                                <View style={{ justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={[styles.badgeContainer, { backgroundColor: COLORS.LightYellow }]}>
                                        <Text style={[styles.badgeText, { color: COLORS.DarkYellow }]}>{collectiondata?.length ? collectiondata?.length : '0'}</Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setCollectionopen(!collectionopen)
                                            slottedlisting.forEach(function (item) {
                                                item.open = false
                                            })
                                            if (dleopen) {
                                                setDleopen(!dleopen)
                                            }
                                        }}
                                    >
                                        <Icon name={collectionopen ? "chevron-up" : "chevron-down"}
                                            color={COLORS.DarkYellow}
                                            size={25}
                                            style={{ paddingLeft: 13 }}

                                        />
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                            {collectionopen
                                ?
                                <>
                                    <View>
                                        {collectiondata ? (
                                            <MeetTab
                                                data={collectiondata}
                                                time={'Collection Follow up'}
                                                setEnab={setEnab}
                                                meet={true}
                                                navigation={navigation}
                                            />) : null}
                                    </View>
                                </> : null}
                        </>

                        <>
                            <TouchableOpacity
                                onPress={() => {
                                    setDleopen(!dleopen)
                                    slottedlisting.forEach(function (item) {
                                        item.open = false
                                    })
                                    if (collectionopen) {
                                        setCollectionopen(!collectionopen)
                                    }
                                }}
                                style={[styles.containerTab, { backgroundColor: ' rgba(155, 81, 224, 0.1) ' }]}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.timeText1}>DLE Activities</Text>
                                </View>
                                <View style={{ justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={[styles.badgeContainer, { backgroundColor: COLORS.LightPurple }]}>
                                        <Text style={[styles.badgeText, { color: COLORS.DarkPurple }]}>{nonslottedActivities?.length}</Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setDleopen(!dleopen)
                                            slottedlisting.forEach(function (item) {
                                                item.open = false
                                            })
                                            if (collectionopen) {
                                                setCollectionopen(!collectionopen)
                                            }
                                        }}
                                    >
                                        <Icon name={dleopen ? "chevron-up" : "chevron-down"}
                                            color={COLORS.DarkPurple}
                                            size={25}
                                            style={{ paddingLeft: 13 }}

                                        />
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                            {dleopen
                                ?
                                <>
                                    <View>
                                        {nonslottedActivities ? (<MeetTab
                                            data={nonslottedActivities}
                                            time={'DLE Activities'}
                                            setEnab={setEnab}
                                            meet={true}
                                            navigation={navigation}
                                        />) : null}
                                    </View>
                                </> : null}
                        </>

                        {slottedlisting?.map((item, index) => {
                            return (
                                <>
                                    {item.data.length > 0 ? <TouchableOpacity
                                        onPress={() => {

                                            const updatedItems = [...slottedlisting];

                                            slottedlisting.map((item, indexes) => {
                                                if (indexes === index) {
                                                    updatedItems[indexes].open = !updatedItems[indexes].open;
                                                    setSlottedListing(updatedItems);
                                                    console.log('hhhehhehe---  open --', item.open)
                                                } else {
                                                    updatedItems[indexes].open = false;
                                                    setSlottedListing(updatedItems);
                                                    console.log('hhhehhehe---  closed --', item.open)
                                                }

                                            })

                                            setDleopen(false)
                                            setCollectionopen(false)
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

                                                    const updatedItems = [...slottedlisting];

                                                    slottedlisting.map((item, indexes) => {
                                                        if (indexes === index) {
                                                            updatedItems[indexes].open = !updatedItems[indexes].open;
                                                            setSlottedListing(updatedItems);
                                                            console.log('hhhehhehe---  open --', item.open)
                                                        } else {
                                                            updatedItems[indexes].open = false;
                                                            setSlottedListing(updatedItems);
                                                            console.log('hhhehhehe---  closed --', item.open)
                                                        }

                                                    })

                                                    setDleopen(false)
                                                    setCollectionopen(false)

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
                                                {item.callCount > 0 ? (
                                                    <>
                                                        <Text style={styles.timeDropStyle}>{item.startTime} ({item.callCount})</Text>
                                                        <Text style={styles.headText}>{t('common:Call')}</Text>
                                                    </>) : null}
                                                {item.data.map((item, index) => {
                                                    if (item.activityType == 'CALL') {
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
                                                {item.meetCount > 0 ? (
                                                    <>
                                                        <Text style={styles.timeDropStyle}>{item.startTime}   ({item.meetCount})</Text>
                                                        <Text style={styles.headText}>{t('common:Meet')}</Text>
                                                    </>) : null}
                                                {item.data.map((item) => {
                                                    if (item.activityType == 'MEET') {
                                                        return (
                                                            <DropTab
                                                                id={item.id}
                                                                short={item.short}
                                                                name={item.customerName}
                                                                text={item?.pin}
                                                                village={item?.villageName}
                                                                phoneNumber={item.mobileNumber}
                                                                color={item.color}
                                                                status={item.purpose}
                                                                setEnab={setEnab}
                                                                details={item}
                                                                navigation={navigation}
                                                            />
                                                        );
                                                    }
                                                })}
                                            </View>
                                        </> : null}
                                </>
                            )
                        })}
                    </View>
                </ScrollView>
                : <NetworkScreen />
            }
        </>
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
    timeText1: {
        fontSize: 14,
        fontFamily: FONTS.FontSemiB,
        color: "rgba(155, 81, 224, 1)"
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