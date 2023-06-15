import React from "react";
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from 'react-i18next';

// --------------- Component Imports ------------------------
import { COLORS, FONTS } from '../../../Constants/Constants';
import Image1  from '../../../assets/Images/tick1.svg';

const { height, width } = Dimensions.get('screen');

const CorrectionModal = ({ visible1, onPressOut, onPress1, getDLEConfirmation }) => {
console.log("onpress data",visible1)
    const { t } = useTranslation();

    return (

        <Modal
            animationType="fade"
            transparent={true}
            visible={visible1}
            onRequestClose={onPress1}
        >
            <View style={styles.mainContainer} >

                <TouchableOpacity
                    onPressOut={onPressOut}
                    style={styles.touchableStyle} >
                </TouchableOpacity>

                <View style={styles.modalContainer}>
                    <View style={{ paddingTop: width * 0.045 }}>
                        <Image1 width={40} height={40} />
                    </View>

                    <View style={{ paddingTop: width * 0.04 }}>

                        <Text style={styles.textdesc}>All corrections have been submitted</Text>
                       
                    </View>

                    <TouchableOpacity style={styles.buttonStyle} onPress={onPressOut}>
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
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalContainer: {
        width: Dimensions.get('window').width * 0.92,
        height: Dimensions.get('window').width * 0.56,
        backgroundColor: COLORS.colorBackground,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonStyle: {
        backgroundColor: COLORS.colorB,
        width: Dimensions.get('window').width * 0.34,
        height: 48,
        borderRadius: 54,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: width * 0.065,
        marginBottom: 21
    },
    buttonTextStyle: {
        color: COLORS.colorBackground,
        fontFamily: FONTS.FontRegular,
        fontWeight: '700',
        fontSize: 14,
        letterSpacing: 0.64,
    },
    textdesc: {
        fontSize: 14,
        textAlign: 'center',
        color: "#3B3D43",
        fontFamily: FONTS.FontSemiB,
    },
});

export default CorrectionModal;