import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View, Dimensions } from "react-native";
import { COLORS, FONTS } from '../Constants/Constants';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import { useTranslation } from 'react-i18next';
const App = ({ ModalVisible, onPressOut, setModalVisible, setOtpValue, navigation, setOtpFetch, ConfirmOtp, otpMessage }) => {
    const { t } = useTranslation();
    return (

        <Modal
            animationType="fade"
            transparent={true}
            visible={ModalVisible}
            onRequestClose={() => {
                setModalVisible(!ModalVisible)
            }}>
            <View style={styles.mainContainer} >
                <TouchableOpacity
                    onPressOut={onPressOut}
                    style={styles.touchableStyle} >
                </TouchableOpacity>
                <View style={styles.centeredView2}>
                    <View style={styles.ModalView}>
                        <Text style={styles.textHead}>{t('common:Sms1')}</Text>
                        <Text style={styles.otpnumber}>{otpMessage}</Text>
                        <View style={{ flexDirection: 'row', marginTop: 25, marginBottom: 20 }}>
                            <TouchableOpacity style={styles.DenyTouch} onPress={() => {
                               setOtpFetch(false)
                                setModalVisible(!ModalVisible)}}>
                                <Text style={styles.DenyText}>{t('common:Deny')}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.allowTouch} onPress={() => {
                                setOtpValue(otpMessage)
                                setModalVisible(!ModalVisible)
                                ConfirmOtp(otpMessage)}}>
                                <Text style={styles.allowText}>{t('common:Allow1')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>

        </Modal>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "#000000aa",
        flex: 1,
    },
    touchableStyle: {
        flex: 1,
        height: Dimensions.get('window').height,

    },
    centeredView2: {
        justifyContent: "flex-end",
    },
    ModalView: {
        backgroundColor: COLORS.colorBackground,
        width: width,
        marginTop: 'auto',
        // height: height * 0.28,
        alignItems: 'center',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,

        // justifyContent: 'space-around',
        // padding: 15
    },
    allowText: {
        color: COLORS.colorBackground,
        fontSize: 16,
        fontFamily: FONTS.FontMedium
    },
    DenyText: {
        color: COLORS.colorB,
        fontSize: 16,
        fontFamily: FONTS.FontMedium
    },
    DenyTouch: {
        width: Dimensions.get('window').width * 0.43,
        height: Dimensions.get('window').height * 0.065,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#00387426",
        borderRadius: 48,
        marginRight: 7.5
    },
    allowTouch: {
        width: Dimensions.get('window').width * 0.43,
        height: Dimensions.get('window').height * 0.065,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#003874",
        borderRadius: 48,
        marginLeft: 7.5,
        marginBottom: 5
    },
    textHead: {
        fontFamily: FONTS.FontSemiB,
        fontWeight: '700',
        fontSize: 14,
        color: "#000000",
        paddingTop: width * 0.06,
        textAlign: 'center'
    },
    otpnumber: {
        color: "#003874",
        fontSize: 34,
        fontFamily: FONTS.FontMedium,
        marginTop: 20,
        fontWeight: '600'
    }
});

export default App;