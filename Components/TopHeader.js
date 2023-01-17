import React, { useState } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { COLORS, FONTS } from '../Constants/Constants'
const Header2 = ({ name,details, navigation }) => {
    return (
        <View style={styles.Header}>
            {details
            ?
            <View style={styles.detailsContainer}>
            <Text style={[styles.helloText,{fontWeight:'600'}]}>Hello, Anamika</Text>
            <Text style={[styles.helloText,{fontWeight:'400'}]}>Here are your details</Text>
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
        flex:0.5
    },
    helloText:{
        color: COLORS.colorBackground,
        fontSize: 12,
        fontFamily: FONTS.FontRegular,
    },
    Header: {
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
        fontWeight: '600',
        marginTop: 16,
        marginBottom: 16
    }
})