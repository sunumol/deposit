import React from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';
import { COLORS, FONTS } from '../Constants/Constants';
import { useTranslation } from 'react-i18next';

const Header2 = ({ name,details }) => {
    const { t} = useTranslation();
    return (
        <View style={styles.Header}>
            {details
            ?
            <View style={styles.detailsContainer}>
            <Text style={[styles.helloText,{fontWeight:'700'}]}>{t('common:Hello')}, Anamika</Text>
            <Text style={[styles.helloText,{fontWeight:'400'}]}>{t('common:Here')}</Text>
            </View>
            : <Text style={styles.textPrivacy}>{name}</Text>
            }
        </View>
    )
}

export default Header2;

const styles = StyleSheet.create({
    detailsContainer:{
        flexDirection:'column',
        alignItems:'center',
    },
    helloText:{
        color: COLORS.colorBackground,
        fontSize: 12,
        fontFamily: FONTS.FontRegular,
    },
    Header: {
        flex:0,
        backgroundColor: COLORS.colorB,
         height: 55,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textPrivacy: {
        color: COLORS.colorBackground,
        fontSize: 16,
        fontFamily: FONTS.FontRegular,
        fontWeight: '800',
        marginTop:15,
        marginBottom: 16
    }
})