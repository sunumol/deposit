import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import { COLORS, FONTS } from '../../../Constants/Constants';
const { height, width } = Dimensions.get('screen');
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Activity from '../assets/Activity.svg';
import Calendar from '../assets/Calendar.svg';
import Collect from '../assets/Collect.svg';
import NewCall from '../assets/NewCall.svg';
import NewLead from '../assets/NewLead.svg';
import NewUser from '../assets/NewUser.svg';

const ItemTabs = (props) => {
    const { t } = useTranslation();
    const [Lang, setLang] = useState('')
    const [ModalVisible1, setModalVisible1] = useState(false)


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
        <View style={{ paddingBottom: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 21 }}>
                <TouchableOpacity style={[styles.tabContainer]}>
                    <Activity />
                    <Text style={styles.titleText}>Activity</Text>
                    <View style={styles.badgeView}>
                        <Text style={styles.badgeText}>4</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tabContainer]}>
                    <Calendar />
                    <Text style={styles.titleText}>Calendar</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 21 }}>
                <TouchableOpacity style={[styles.tabContainer]}>
                    <NewLead />
                    <Text style={styles.titleText}>New Lead</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tabContainer]}>
                    <NewUser />
                    <Text style={styles.titleText}>New CGT</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 21 }}>
                <TouchableOpacity style={[styles.tabContainer]}>
                    <NewCall />
                    <Text style={styles.titleText}>New Call</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tabContainer]}>
                    <Collect />
                    <Text style={styles.titleText}>Collect</Text>
                    <View style={styles.badgeView}>
                        <Text style={styles.badgeText}>4</Text>
                    </View>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    tabContainer: {
        width: Dimensions.get('window').width * 0.42,
        height: 125,
        backgroundColor: COLORS.colorBackground,
        borderRadius: 15,
        shadowColor: 'rgba(0, 0, 0, 0.4)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        elevation: 7,
        shadowRadius: 7,
        alignItems: 'center',
        justifyContent: 'center'

    },
    titleText: {
        paddingTop: 15,
        fontSize: 14,
        fontFamily: FONTS.FontMedium,
        color: COLORS.colorDark,
    },
    badgeView: {
        backgroundColor: '#EA4047',
        width: 26,
        height: 26,
        borderRadius: 13,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: -12,
        right: 0
    },
    badgeText: {
        fontSize: 14,
        fontFamily: FONTS.FontBold,
        color: COLORS.colorBackground,
    }
})
export default ItemTabs;