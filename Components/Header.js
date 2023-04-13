import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { COLORS, FONTS } from '../Constants/Constants';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Header = ({ name, navigation,setStatusChange,setStatusChange1,onPress }) => {
    console.log("setState header.....",name)
    const [lang, setLang] = useState('')
    const { t } = useTranslation();
    useEffect(() => {
        getData()
        if(setStatusChange === true){
            setStatusChange1(false)
        }
       
    }, [setStatusChange])

    const getData = async () => {
        try {
            const lang = await AsyncStorage.getItem('user-language')
            setLang(lang)

        } catch (e) {
            console.log(e)
        }
    }
    return (
        <View style={styles.Header}>
            <View style={{ left: 15, alignItems: 'center', justifyContent: 'center', top: -3 }}>
                <TouchableOpacity onPress={() => name == 'Detailed Eligibility Check' || 'Current Residence Owner' || "Continuing Guarantor"|| "Upload Your Voter ID" || "Add Vehicle" || "Vehicles Owned" || "Energy Utilities"  || "Income Details"  || "House Photo Capture"? onPress() : name =='Activities' ? navigation.navigate('NewCgt'):!setStatusChange ? navigation.goBack() : setStatusChange1(false)} style={{ padding: 0 }}>
                    <Icon size={17} color={"white"} name="left" />
                </TouchableOpacity>
            </View>

            <View style={{ left: lang == 'en' ? -10 : 5 }}>
                <Text style={[styles.textPrivacy, {
                    fontSize: name == t('common:Track') ? 14 : 16, color: COLORS.colorBackground,

                    fontFamily: FONTS.FontRegular,
                    fontWeight: '700',
                    marginTop: 10,
                    marginBottom: 16,
                    left: -5
                }]}>{name}</Text>
            </View>

            <View></View>
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    Header: {
        backgroundColor: COLORS.colorB,
        height: 48,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textPrivacy: {
        color: COLORS.colorBackground,
        fontSize: 16,
        fontFamily: FONTS.FontRegular,
        fontWeight: '700',
        marginTop: 10,
        marginBottom: 16,
        left: -5
    },
})