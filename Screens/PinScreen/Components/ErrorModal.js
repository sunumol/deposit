import React from "react";
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View,BackHandler } from "react-native";
import { COLORS, FONTS } from '../../../Constants/Constants';
import { useTranslation } from 'react-i18next';
import Image1 from '../../../assets/image/Ex.svg';
import RNExitApp from 'react-native-exit-app';
const { width } = Dimensions.get('screen');

const ValidModal = ({ ModalVisible, onPressOut, setModalVisible, Validation }) => {
  
    const { t } = useTranslation();
  
    return (

        <Modal
            animationType="fade"
            transparent={true}
            visible={ModalVisible}
            onRequestClose={() => {
                setModalVisible(false)
                RNExitApp.exitApp();
            }}
        >
            <View style={styles.mainContainer} >
                <TouchableOpacity
                    onPressOut={onPressOut}
                    style={styles.touchableStyle} >
                </TouchableOpacity>
                <View style={styles.modalContainer}>
                    <Image1 style={{ marginTop: 15, marginBottom: 8 }} height={width*0.07} width={width*0.07}/>
                        <View>
                            <Text style={[styles.textStyle,{marginHorizontal:15}]}>{Validation}</Text>
                        </View> 
                    <TouchableOpacity style={styles.buttonStyle} onPressOut={()=>{
                        setModalVisible(false)
                        RNExitApp.exitApp();
                    }}>
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
       marginHorizontal:16,
       marginVertical:16,
        backgroundColor: COLORS.colorBackground,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
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
        marginTop: 20,
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

export default ValidModal;