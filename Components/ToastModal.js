import React from "react";
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from 'react-i18next';

// --------- Component Imports ------------------------
import { COLORS, FONTS } from '../Constants/Constants';

// --------- Image Imports ------------------------
import Image1 from '../assets/image/Ex.svg';

const { height, width } = Dimensions.get('screen');

const ToastModal = ({ ModalVisible, onPressOut, setModalVisible, Validation }) => {

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
                <View style={styles.modalContainer}>
                    <Image1 style={{ marginTop: 24, marginBottom: 8 }} height={width * 0.07} width={width * 0.07} />

                    <View>

                        <Text style={[styles.textStyle,{marginHorizontal:15}]}>{Validation}</Text>
                    </View>
                    <TouchableOpacity style={styles.buttonStyle} onPressOut={onPressOut}>
                        <Text style={styles.buttonTextStyle}>{t('common:Okay')}</Text>
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
    },
    modalContainer: {
        marginHorizontal: 20,
        height: Dimensions.get('window').width * 0.45,
        backgroundColor: COLORS.colorBackground,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    touchableStyle: {
        flex: 1,
    },
    textStyle: {
        fontFamily: FONTS.FontRegular,
        color: COLORS.colorDark,
        fontWeight: '600',
        textAlign: "center",
        fontSize: 14
    },
    buttonStyle: {
        backgroundColor: COLORS.colorB,
        width: Dimensions.get('window').width * 0.35,
        height: 46,
        borderRadius: 54,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 18,
        marginBottom: 21
    },
    buttonTextStyle: {
        color: COLORS.colorBackground,
        fontFamily: FONTS.FontRegular,
        fontWeight: '700',
        fontSize: 12,
        letterSpacing: 0.64,
    }
});

export default ToastModal;