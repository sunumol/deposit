import React, { useState, useEffect } from "react";
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { COLORS, FONTS } from '../../../Constants/Constants';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { height, width } = Dimensions.get('screen');
import Image1 from '../Images/check.svg';


const RejectModal = ({ ModalVisible, onPressOut, onPress1, setModalVisible,onPressClose }) => {
    const [state, setState] = useState(null);
    const { t } = useTranslation();
    const [Lang, setLang] = useState('')
    const [BStatus, setBstatus] = useState(false)

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

        <Modal
        animationType="fade"
        transparent={true}
        visible={ModalVisible}
        onRequestClose={onPressClose}>

        <TouchableOpacity onPressOut={onPressClose}
            style={{ backgroundColor: "#000000aa", flex: 1, alignItems: 'center', justifyContent: 'center', opacity: 5 }} >
            <View style={styles.ModalView1}>
                {/*<Text style={styles.TextDelete}>{t('common:AreS1')} ?</Text>*/}

                <View style={{ paddingTop: width * 0.07 }}>
                        <Image source={require('../Images/check.png')}
                            resizeMode={"contain"}
                            style={{ width: width * 0.15, height: width * 0.15 }} />
                    </View>

                    <View style={{ paddingTop: width * 0.01 }}>
                        <Text style={styles.textdesc}>You have confirmed the<Text style={[styles.textdesc, { fontFamily: FONTS.FontBold }]}> KYC </Text></Text>
                        <Text style={styles.textdesc}>details of the Customer</Text>
                    </View>

                    <TouchableOpacity style={styles.buttonStyle} onPress={onPressClose}>
                        <Text style={styles.buttonTextStyle}>{t('common:Okay')}</Text>
                    </TouchableOpacity>
              

            </View>

        </TouchableOpacity>
    </Modal>
    );
};

const styles = StyleSheet.create({
    ViewButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 22,
        paddingBottom: 22
    },
    Touch1: {
        backgroundColor: "#000000aa",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 5
    },
    ModalView1: {
        backgroundColor: COLORS.colorBackground,
        width: width * 0.92,
        // height:height/4,
        alignItems: 'center',
        //justifyContent:'space-around',
        //padding: 21,
        borderRadius: 8

    },
    ButtonCancel: {
        width: 138,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.colorLight,
        borderRadius: 48,

    },
    ButtonContinue: {
        backgroundColor: COLORS.colorB,
        width: 138,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 48,

    },
    TextDelete1: {
        fontSize: 16,
        fontFamily: FONTS.FontRegular,
        fontWeight: '400',
        color: "#3B3D43",
        paddingTop: 27
    },
    TextDelete: {
        fontSize: 14,
        fontFamily: FONTS.FontBold,
        color: "#3B3D43",
        paddingTop: 16
    },
    textC: {
        fontFamily: FONTS.FontRegular,
        fontWeight: 'bold',
        fontSize: 14,
        opacity: 5,
        color: COLORS.colorBackground
    },
    text2: {
        color: COLORS.colorB,
        fontFamily: FONTS.FontMedium,
        fontSize: 16
    },
    mainContainer: {
        backgroundColor: "#000000aa",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 5
    },
    touchableStyle0: {
        flex: 1,
        height: Dimensions.get('window').height,

    },
    textdesc: {
        fontSize: 14,
        //paddingTop: width * 0.02,
        textAlign: 'center',
        color: "#1A051D",
        fontFamily: FONTS.FontRegular,
    },
    buttonStyle: {
        backgroundColor: COLORS.colorB,
        width: Dimensions.get('window').width * 0.33,
        height: 48,
        borderRadius: 54,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: width * 0.06,
        marginBottom: 21
    },
    buttonTextStyle: {
        color: COLORS.colorBackground,
        fontFamily: FONTS.FontRegular,
        fontWeight: '700',
        fontSize: 14,
        letterSpacing: 0.64,
    },

});

export default RejectModal;