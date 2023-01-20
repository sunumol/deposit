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
import MeetTab from '../Components/components/callTab'


const ItemTabs = (props) => {
    const { t } = useTranslation();
    const [Lang, setLang] = useState('')
    const [ModalVisible1, setModalVisible1] = useState(false)
    const [meetData, setMeetData] = useState([
        {
            id: 1,
            data: [{
                id: 1,
                short: 'AA',
                name: 'Athira Anil',
                text: '682025',
                phoneNumber: '968XXXXX66',
                color: '#6979F8',
                status: 'Conduct',
            }],
            time: '12:30'
        },
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
            time: '01:30'
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
            time: '03:30'
        },
        {
            id: 4,
            data: [{
                id: 1,
                short: 'EI',
                name: 'Elizabeth Immanuel K...',
                text: '682044',
                phoneNumber: '635XXXXX11',
                color: '#C47583',
                status: 'Conduct',
            }],

            time: '04:30'
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
                {
                    meetData.map((item, index) => {
                        return (
                            <MeetTab
                                id={item.id}
                                data={item.data}
                                time={item.time}
                                meet={true}
                            />
                        )
                    })
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({

})
export default ItemTabs;