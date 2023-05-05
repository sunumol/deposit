import React, { useState, useEffect } from "react";
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { COLORS, FONTS } from '../../../Constants/Constants';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { height, width } = Dimensions.get('screen');
import Image1 from '../../../assets/image/Ex.svg';



const ErrorModal2 = ({ ModalVisible, onPressOut,onPress1 }) => {
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
            onRequestClose={onPressOut}
        >
            <View style={styles.mainContainer} >

                <TouchableOpacity
                    onPressOut={onPressOut}
                    style={styles.touchableStyle} >
                </TouchableOpacity>

                <View style={styles.modalContainer}>
                    <View style={{ paddingTop: width * 0.05 }}>
                    <Image1 style={{ marginTop: 0, marginBottom: 8 }} height={width*0.07} width={width*0.07}/>
              
                    </View>

                    <View style={{ paddingTop: width * 0.02,paddingHorizontal: width *0.05 }}>
                      
                        <Text style={styles.textdesc}>Mobile number cannot be same as</Text>
                        <Text style={styles.textdesc}>that of that customer</Text>
                    </View>


                    <TouchableOpacity style={styles.buttonStyle} onPress={() => {
                        onPressOut()
                 
                    }}>
                        <Text style={styles.buttonTextStyle}>{t('common:Okay')}</Text>
                    </TouchableOpacity>


                </View>

          
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
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').width * 0.49,
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
        fontSize: 15
    },
    buttonStyle: {
        backgroundColor: COLORS.colorB,
        width: Dimensions.get('window').width * 0.30,
        height: 48,
        borderRadius: 54,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: width * 0.05,
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
        color: "#3B3D43",
        fontFamily: FONTS.FontRegular,
    },

});

export default ErrorModal2;