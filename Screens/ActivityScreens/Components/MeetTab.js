
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { COLORS, FONTS } from '../../../Constants/Constants';
const { height, width } = Dimensions.get('screen');
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MeetTab from '../Components/components/MeetTab';
import { api } from '../../../Services/Api';
import { useNetInfo } from "@react-native-community/netinfo";
import NetworkScreen from '../../../Components/NetworkError2';

const ItemTabs = ({ navigation }) => {
    const { t } = useTranslation();
    const [Lang, setLang] = useState('')
    const [ModalVisible1, setModalVisible1] = useState(false)
    const [slottedlisting, setSlottedListing] = useState([])
    const [nonSlottedActivities, setNonslottedListing] = useState([])
    const netInfo = useNetInfo();
    const [enab, setEnab] = useState(false)
    const [custID, setCustId] = useState('')
    const [meetData, setMeetData] = useState([
        // {
        //     id: 1,
        //     data: [{
        //         id: 1,
        //         short: 'AA',
        //         name: 'Athira Anil',
        //         text: '682025',
        //         phoneNumber: '968XXXXX66',
        //         color: '#6979F8',
        //         status: 'Conduct',
        //     }],
        //     time: '12:30 PM (1)'
        // },
        {
            id: 2,
            data: [{
                id: 1,
                short: 'RP',
                name: 'Reshmi P',
                text: 'Kakkanad',
                phoneNumber: '777XXXXX66',
                color: '#75B5C4',
                status: 'Conduct',
            }],
            time: '01:30 PM (1)'
        },
        {
            id: 3,
            data: [{
                id: 1,
                short: 'SJ',
                name: 'Sismi Joseph',
                text: '682044',
                phoneNumber: '635XXXXX11',
                color: '#80C475',
                status: 'Conduct',

            }],
            time: '03:30 PM (1)'
        },

        {
            id: 5,
            data: [{
                id: 1,
                short: 'AA',
                name: 'Athira Anil',
                text: '682025',
                phoneNumber: '968XXXXX66',
                color: '#8CCEC2',
                status: 'Conduct DLE',
            }],

            time: '05:00 PM (3)'
        },
        {
            id: 6,
            data: [{
                id: 1,
                short: 'AT',
                name: 'Aiswarya Thomas',
                text: '686666',
                phoneNumber: '987XXXXX22',
                color: '#8CACCE',
                status: 'Conduct DLE',
            }],

        },
        {
            id: 7,
            data: [{
                id: 1,
                short: 'EI',
                name: 'Elizabeth Immanuel K...',
                text: '682044',
                phoneNumber: '635XXXXX11',
                color: '#9EC894',
                status: 'Conduct DLE',
            }],

        },
        {
            id: 8,
            data: [{
                id: 1,
                short: 'AA',
                name: 'Manjusha Mohan Puthe...',
                text: 'Kakkanad',
                phoneNumber: '968XXXXX66',
                color: '#C89494',
                status: 'Conduct DLE',
            }],
            time: '05:00 PM (3)'
        },
        {
            id: 9,
            data: [{
                id: 1,
                short: 'BB',
                name: 'Bestin Babu',
                text: 'Kakkanad',
                phoneNumber: '678XXXXX99',
                color: '#C8AA94',
                status: 'Conduct DLE',
            }],

        },
    ])


    const ActivityListingApiCall = async (value) => {
        const data = {
            "employeeId": Number(value),
            "activityType": "MEET"
        };
        console.log("data call2",data)
        await api.activitylistingscreenApi(data).then((res) => {
            console.log('-------------------res meet', res?.data?.body?.slottedActivities)
            setSlottedListing(res?.data?.body?.slottedActivities)
            setNonslottedListing(res?.data?.body?.nonSlottedActivities)
            setEnab(false)
        })
            .catch((err) => {
                console.log('-------------------err', err?.response)
            })
    };


    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            AsyncStorage.getItem("CustomerId").then((value) => {
                setCustId(value)
                ActivityListingApiCall(value)
            })
            


        });
        getData();
        return unsubscribe;
    }, [navigation, enab]);


    useEffect(() => {
        AsyncStorage.getItem("CustomerId").then((value) => {
            setCustId(value)
            ActivityListingApiCall(value)
        })
    
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
        <>
            {netInfo.isConnected
                ?

                <ScrollView style={{ flex: 1, backgroundColor: COLORS.colorBackground }}>

                    <View style={{ paddingHorizontal: 20, marginBottom: 10 }}>
                        <>
                            {nonSlottedActivities ? (<MeetTab
                                // id={id}
                                data={nonSlottedActivities}
                                time={'DLE Activities'}
                                setEnab={setEnab}
                                meet={true}
                                navigation={navigation}
                            />) : null}
                            {
                                slottedlisting.map((item, index) => {

                                    return (
                                        <>
                                            {item.data.length ? (<MeetTab
                                                id={item.id}
                                                data={item.data}
                                                time={item.time}
                                                setEnab={setEnab}
                                                meet={true}
                                                navigation={navigation}
                                            />) : null}
                                        </>
                                    )
                                })
                            }
                        </>
                    </View>
                </ScrollView> :
                <NetworkScreen />
            }
        </>
    )
}

const styles = StyleSheet.create({

})
export default ItemTabs;
