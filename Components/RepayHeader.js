import React, { useState } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { COLORS, FONTS } from '../Constants/Constants';
import Icon from 'react-native-vector-icons/AntDesign';
const Header = ({ name, navigation }) => {
    return (
        <View style={styles.Header}>
            <View style={{left:15,alignItems:'center',justifyContent:'center',top:-3}}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon size={17} color={"white"} name="left"/>
                </TouchableOpacity>
            </View>

            <View style={{left:-10}}>
                <Text style={styles.textPrivacy}>{name}</Text>
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
        textAlign: 'center'
    },
})