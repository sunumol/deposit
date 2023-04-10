import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    Dimensions,
    KeyboardAvoidingView,
    Modal,
    ScrollView,

} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
const { height, width } = Dimensions.get('screen');
import { COLORS, FONTS } from '../../../Constants/Constants';

const ModalPhoto = ({ ModalVisible, setModalVisible, GalleryOpen, CameraOpen, onPressOut }) => {

    const { t } = useTranslation();

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={ModalVisible}
            onRequestClose={onPressOut}>

            <TouchableOpacity onPressOut={onPressOut}
                style={{ backgroundColor: "#000000aa", flex: 1, alignItems: 'center', justifyContent: 'center', opacity: 5 }} >
                <View style={styles.ModalView}>
                    <TouchableOpacity style={styles.ButtonPic1} onPress={() => CameraOpen()}>
                        <Text style={styles.text1}>{t('common:TakePh')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.ButtonPic2} onPress={() => GalleryOpen()} >
                        <Text style={styles.text2}>{t('common:Choose')}</Text>
                    </TouchableOpacity>

                </View>

            </TouchableOpacity>
        </Modal>

    )
}

const styles = StyleSheet.create({
    ButtonPic1: {
        backgroundColor: COLORS.colorB,
        width: width * 0.87,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 48
    },
    ButtonPic2: {
        width: width * 0.87,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.colorLight,
        borderRadius: 48
    },
    ModalView: {
        backgroundColor: COLORS.colorBackground,
        width: width,
        marginTop: 'auto',
        height: height * 0.18,
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 12

    },
    text1: {
        color: COLORS.colorBackground,
        fontFamily: FONTS.FontMedium,
        fontSize: 14,
        fontWeight: '700',
    },
    text2: {
        color: COLORS.colorB,
        fontFamily: FONTS.FontMedium,
        fontSize: 16
    },
})

export default ModalPhoto;