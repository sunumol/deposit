import React, { useState, useEffect } from "react";
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { COLORS, FONTS } from '../../../Constants/Constants';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { height, width } = Dimensions.get('screen');



const PinModal = ({ ModalVisible, onPressOut, setModalVisible,onPress }) => {
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
            onRequestClose={() => {
                setModalVisible(!ModalVisible)
            }}
        >
            <View style={styles.mainContainer} >

                <TouchableOpacity
                    onPressOut={onPressOut}
                    style={styles.touchableStyle} >
                </TouchableOpacity>

                <View style={styles.modalContainer}>
                <Text style={[styles.textdesc1,
                { paddingTop: width * 0.05, textAlign: 'center' }]}>PIN Expired</Text>
                        <Text style={[styles.textdesc,
                             { paddingTop: width * 0.02, textAlign: 'center' }]}>Your PIN has expired. Please reset</Text>
                

                    <TouchableOpacity style={styles.buttonStyle} onPress={()=>setModalVisible(false)}>
                        <Text style={styles.buttonTextStyle}>Reset</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    onPressOut={onPressOut}
                    style={styles.touchableStyle} >
                </TouchableOpacity>
            </View>
        </Modal>

    );
};

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "#000000aa",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalContainer: {
        width: Dimensions.get('window').width * 0.82,
        height: Dimensions.get('window').width * 0.43,
        backgroundColor: COLORS.colorBackground,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },

    textStyle: {
        fontFamily: FONTS.FontRegular,
        color: COLORS.colorDark,
        fontWeight: '600',
        textAlign: "center",
        fontSize: 15
    },
    buttonStyle: {
        backgroundColor: COLORS.colorB,
        width: Dimensions.get('window').width * 0.70,
        height: 46,
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
    textLoan: {
        color: "#1A051D",
        fontFamily: FONTS.FontRegular,
        fontSize: 14,
        paddingLeft: width * 0.02
    },
    textReq: {
        fontFamily: FONTS.FontSemiB,
        fontWeight: '600',
        color: "#3B3D43",
        paddingTop: width * 0.05
    },
    TextSub: {
        fontSize: 14,
        color: "#1A051D",
        fontFamily: FONTS.FontRegular
    },
    ViewDesc: {
        width: width * 0.8,
        height: width * 0.18,
        backgroundColor: "#F2F2F2",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
    },
    textdesc: {
        fontSize: 14,
        color: "#3B3D43",
        fontFamily: FONTS.FontRegular,
    },
    textdesc1: {
        fontSize: 18,
        color: "#3B3D43",
        fontFamily: FONTS.FontSemiB,
    },
});

export default PinModal;