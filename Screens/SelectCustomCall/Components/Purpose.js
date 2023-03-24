;
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { COLORS, FONTS } from '../../../Constants/Constants';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon1 from 'react-native-vector-icons/Entypo'
const { height, width } = Dimensions.get('screen');
import PurposeModal from './PurposeModal';


const Purpose = ({ navigation ,setState}) => {
    const { t } = useTranslation();
    const [Lang, setLang] = useState('')
    const [ModalVisible, setModalVisible] = useState(false)
    const [ModalVisible1, setModalVisible1] = useState(false)
    const [Purpose,setPurpose] = useState(null)
    useEffect(() => {
        getData()
        console.log("purpose print....",Purpose)
        setState(Purpose)
    }, [Purpose])

    const getData = async () => {
        try {
            const lang = await AsyncStorage.getItem('user-language')
            setLang(lang)
        } catch (e) {
            console.log(e)
        }
    }
    return (

        <View>
            <View style={{ paddingTop: width * 0.04 }}>
                <Text style={styles.purpose}>Purpose</Text>
            </View>

            <TouchableOpacity style={styles.Border} onPress={() => setModalVisible1(true)}>
                <Text style={[styles.textSelect,{color:Purpose ? '#1A051D':'#808080'}]}>{!Purpose ? 'Select' : Purpose}</Text>
                {/* <Icon1 name="chevron-down" size={20} color={"#808080"} style={{ marginRight: 10 }} /> */}
            </TouchableOpacity>

            <PurposeModal
                visible={ModalVisible1}
                setPurpose ={setPurpose}
                setModalVisible={setModalVisible1}
                onPressOut={() => setModalVisible1(!ModalVisible1)}
                navigation={navigation}
               
            />

    
        </View>

    )
}

const styles = StyleSheet.create({
    timeDropStyle: {
        fontSize: 11,
        fontFamily: FONTS.FontMedium,
        color: COLORS.colorDSText,
        paddingTop: 18,
    },
    Border: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: width * 0.12,
        borderWidth: 1,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: width * 0.02,
        borderColor: '#ECEBED',
        backgroundColor:'#FCFCFC'
    },
    textSelect: {
        marginLeft: 10,
        fontSize: 14,
        color: "#808080",
        fontFamily: FONTS.FontRegular
    },
    purpose: {
        fontFamily: FONTS.FontRegular,
        color: "#3B3D43",
        fontSize: 12,
    },
    boxStyle: {
        backgroundColor: COLORS.colorBackground,
        borderColor: COLORS.colorBorder,
        borderRadius: 8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        elevation: 7,
        padding: 10,
        marginTop: 10,
        borderWidth: 1,
        borderColor: COLORS.colorBorder,
        flexDirection: 'row'
    },
    circleStyle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    circleText: {
        fontSize: 18,
        fontFamily: FONTS.FontSemiB,
        color: COLORS.colorBackground,
        fontWeight: '600',
    },
    circleText: {
        fontSize: 18,
        fontFamily: FONTS.FontSemiB,
        color: COLORS.colorBackground,
        fontWeight: '600',
    },
    nameText: {
        fontSize: 12,
        fontFamily: FONTS.FontBold,
        color: COLORS.colorDark,
        fontWeight: '600',
    },
    idText: {
        fontSize: 11,
        fontFamily: FONTS.FontRegular,
        color: COLORS.colorDark,
        paddingTop: 3,
        width: 110
    },
    numText: {
        fontSize: 12,
        fontFamily: FONTS.FontRegular,
        color: COLORS.colorDark,
        fontWeight: '400',
    },
    approveContainer: {
        width: 98,
        height: 35,
        borderRadius: 54,
        shadowColor: 'rgba(0, 0, 0, 0.12',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        elevation: 7,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.colorB
    },
    textApprove: {
        fontSize: 12,
        fontFamily: FONTS.FontSemiB,
        fontWeight: '600',
    },
    rejectContainer: {
        width: 98,
        height: 35,
        borderRadius: 54,
        backgroundColor: COLORS.colorLight,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    leadText: {
        fontSize: 11,
        fontFamily: FONTS.FontSemiB,
        fontWeight: '600',

    },
    leadContainer: {
        padding: 4,
        borderRadius: 3,
        marginTop: 2,
        maxWidth: 150
    },


});
export default Purpose;