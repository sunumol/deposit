;
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../../../Constants/Constants';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

const MeetTab = (props) => {
    const { t } = useTranslation();
    const [Lang, setLang] = useState('')
    console.log("state....",props.state)
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

        <View

            style={styles.boxStyle} key={props.id}>
            <View style={{ flex: 1, flexDirection: 'row' }}>

                <View style={[styles.circleStyle, { backgroundColor: '#B9BB70' }]}>
                    <Text style={styles.circleText}>{props.item.short}</Text>
                </View>

                <View style={{ flexDirection: 'column', paddingLeft: 12, paddingTop: 5 }}>
                    <Text style={styles.nameText}>{props.item.name}</Text>
                    <View style={{ flexDirection: 'row', }}>
                        <View style={{ paddingTop: 5, paddingRight: 1 }}>
                            <Icon1 name="location-outline" color={"black"} />
                        </View>
                        <Text style={[styles.idText, { paddingTop: 4 }]}>{props.item.text}</Text>
                    </View>
                </View>

            </View>

            <View style={{ flexDirection: 'column', paddingTop: 5, alignItems: 'flex-end' }}>
                <View style={{ flexDirection: 'row' }}>
                    {/* <Icon2 name="phone-in-talk-outline" color={"black"} size={15} /> */}
                    <Text style={[styles.numText, { paddingLeft: 6 }]}>{props.item.number}</Text>
                </View>
            
            {props.state ? 
                <View style={[styles.leadContainer, { backgroundColor: 'rgba(155, 81, 224, 0.1)' }]}>

                <Text style={[styles.leadText, { color: "#9B51E0" }]}>{props.state}</Text>
                </View>:null}

            </View>


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
export default MeetTab;