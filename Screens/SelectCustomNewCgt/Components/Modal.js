import React from "react";
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from 'react-i18next';

// --------------- Component Imports ------------------------
import { COLORS, FONTS } from '../../../Constants/Constants';

// ------------- Image Imports --------------------
import Image1 from '../../NewLead/assets/tick.svg';

const { height, width } = Dimensions.get('screen');

const CgtModal = ({ ModalVisible, onPressOut, setModalVisible, navigation, }) => {

    const { t } = useTranslation();

    return (

        <Modal
            animationType="fade"
            transparent={true}
            visible={ModalVisible}
            onRequestClose={() => {
                setModalVisible(!ModalVisible)
                navigation.navigate('Profile')
            }}
        >
            <View style={styles.mainContainer}>
                <TouchableOpacity onPressOut={() => {
                    setModalVisible(!ModalVisible)
                    navigation.navigate('Profile')
                }}
                    style={{ flex: 1, alignItems: 'center', justifyContent: 'center', opacity: 5 }}
                >

                    <View style={styles.modalContainer}>
                        <View style={{ paddingTop: width * 0.08 }}>
                            <Image1 />
                        </View>
                        <Text style={[styles.textdesc,{ paddingTop: width * 0.02, textAlign: 'center' }]}>{t('common:CgtDesc')}</Text>

                        <TouchableOpacity style={styles.buttonStyle} onPress={() => {
                            onPressOut()
                            navigation.navigate('Profile')
                        }}>
                            <Text style={styles.buttonTextStyle}>{t('common:Okay')}</Text>
                        </TouchableOpacity>
                    </View>
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
        height: Dimensions.get('window').width * 0.63,
        backgroundColor: COLORS.colorBackground,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
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
    textdesc: {
        fontSize: 14,
        color: "#3B3D43",
        fontFamily: FONTS.FontSemiB,
    },
});

export default CgtModal;