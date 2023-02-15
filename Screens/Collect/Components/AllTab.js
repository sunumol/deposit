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
import Image1 from '../Images/IMG2.svg';
import Image2 from '../Images/IMG2.svg';
import Image3 from '../Images/IMG3.svg';

const ItemTabs = ({ navigation }) => {
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
        <View style={{ flex: 1, backgroundColor: COLORS.colorBackground, alignItems: 'center', justifyContent: 'center' }}>
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={styles.ViewCard}>
                <View style={styles.Card1}>
                    <Image1 />
                </View>
                </View>

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    ViewCard: {
        width: width * 0.90,
        height: width * 0.28,
        backgroundColor:COLORS.colorBackground,
        elevation: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        shadowColor: '#000000',
        marginTop: 20,
        marginLeft:10,
        marginRight:10,
        marginBottom:10
    },
    Card1:{
        backgroundColor:'rgba(242, 153, 74, 0.1)',
        width:50,
        height:50,
        borderRadius:25,
        alignItems:'center',
        justifyContent:'center'
    }
})
export default ItemTabs;