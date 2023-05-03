import React, { useState, useEffect } from "react";
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { COLORS, FONTS } from '../../../Constants/Constants';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { height, width } = Dimensions.get('screen');
import Image1 from '../../../assets/image/call.svg';


const CallModal = ({ ModalVisible, onPressOut, setModalVisible, onPress }) => {
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

        >
            <View style={styles.mainContainer} >

                <TouchableOpacity

                    style={styles.touchableStyle} >
                </TouchableOpacity>

                <View style={styles.modalContainer}>
                    <View style={{ paddingTop: width * 0.065 }}>
                        <Image1 />
                    </View>

                    {Lang == 'en' ?
                        <View>
                            <Text style={[styles.textdesc,
                            { fontFamily: FONTS.FontBold, paddingTop: width * 0.06, }]}>Your last call status has not </Text>
                            <Text style={[styles.textdesc,
                            { fontFamily: FONTS.FontBold }]}>been updated.</Text>
                        </View> :

                        <Text style={[styles.textdesc,
                        { fontFamily: FONTS.FontBold, paddingTop: width * 0.06, }]}>{t('common:statusModal1')}</Text>
                    }

                    <Text style={[styles.textdesc, { paddingTop: width * 0.05 }]}>{t('common:statusModal2')}</Text>

                    <TouchableOpacity style={styles.buttonStyle} onPress={() =>onPressOut()}>
                        <Text style={styles.buttonTextStyle}>{t('common:Okay')}</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity

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
        width: Dimensions.get('window').width * 0.90,
        height: Dimensions.get('window').width * 0.74,
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
        width: Dimensions.get('window').width * 0.36,
        height: 46,
        borderRadius: 54,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: width * 0.07,
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
        //paddingTop: width * 0.02,
        textAlign: 'center',
        color: "#1A051D",
        fontFamily: FONTS.FontRegular,
    },

});

export default CallModal;