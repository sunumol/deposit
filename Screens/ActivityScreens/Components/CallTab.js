
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
import CallTab from '../Components/components/callTab';
import { api } from '../../../Services/Api';


const ItemTabs = ({ props, navigation }) => {
    const { t } = useTranslation();
    const [Lang, setLang] = useState('')
    const [ModalVisible1, setModalVisible1] = useState(false)
    const [listing, setListing] = useState([])
    const [enab, setEnab] = useState(false)
    const [meetData, setMeetData] = useState([
        {
            id: 1,
            data: [
                {
                    id: 1,
                    short: 'EI',
                    name: 'Elizabeth Immanuel Ko...',
                    text: '682025',
                    phoneNumber: '828XXXXX00',
                    color: '#C8BD94',
                    status: 'Conduct',
                },
                {
                    id: 2,
                    short: 'AJ',
                    name: 'Ashly James',
                    text: '682025',
                    phoneNumber: '878XXXXX00',
                    color: '#94BCC8',
                    status: 'Conduct',
                }, {
                    id: 3,
                    short: 'SJ',
                    name: 'Sismi Joseph',
                    text: '682025',
                    phoneNumber: '965XXXXX00',
                    color: '#9EC894',
                    status: 'Conduct',
                }],

            time: '07:00 AM'
        },
        {
            id: 2,
            data: [
                {
                    id: 1,
                    short: 'PJ',
                    name: 'Parvathy',
                    text: '682025',
                    phoneNumber: '828XXXXX00',
                    color: '#C8BD94',
                    status: 'Collection',
                },
                {
                    id: 2,
                    short: 'AA',
                    name: 'Athira',
                    text: '682025',
                    phoneNumber: '878XXXXX00',
                    color: '#94BCC8',
                    status: 'Explain',
                }],

            time: '12:30 PM'
        },
    ])




    const ActivityListingApiCall = async () => {
        const data = {
            "employeeId": 1,
            "activityType": "CALL"
        };
        await api.activitylistingscreenApi(data).then((res) => {
            console.log('-------------------res call', res?.data?.body)
            setListing(res?.data?.body)
            setEnab(false)
        })
            .catch((err) => {
                console.log('-------------------err', err?.response)
            })
    };





    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {

            ActivityListingApiCall()

        });
        getData();
        return unsubscribe;
    }, [navigation, enab]);

    { console.log('====fkjkfjkjfkjrf', enab) }

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
            <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>

                {
                    listing.map((item, index) => {

                        return (
                            <>
                                {item?.data.length > 0 ? (<CallTab
                                    id={item.id}
                                    time={item.time}
                                    data={item.data}
                                    setEnab={setEnab}
                                    navigation={navigation}
                                    meet={false} />) : null}
                            </>
                        )
                    })
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    timeDropStyle: {
        fontSize: 11,
        fontFamily: FONTS.FontMedium,
        color: '#F2994A',
        paddingTop: 15,
        paddingLeft: 8
    },
})
export default ItemTabs;
