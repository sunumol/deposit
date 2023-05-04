import React, { useState, useEffect } from "react";
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View, BackHandler } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, FONTS } from '../Constants/Constants';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { height, width } = Dimensions.get('screen');
import Image1 from '../assets/image/excm.svg';

const ModalSave = ({ ModalVisible, onPressOut, setModalVisible, navigation ,Press,Press1}) => {
    const [state, setState] = useState(null);
    const { t } = useTranslation();
    const [Lang, setLang] = useState('')

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
                onPressOut()
            }}
        >
            <View style={styles.mainContainer} >
                <TouchableOpacity
                    onPressOut={onPressOut}
                    style={styles.touchableStyle} >
                </TouchableOpacity>
                <View style={styles.modalContainer}>
                <Text style={[styles.textdesc, { paddingTop: width * 0.01, textAlign: 'center',fontSize:20,fontWeight:'bold' }]}>Unsaved Changes
                    </Text>

                    <Text style={[styles.textdesc, { paddingTop: width * 0.01, textAlign: 'center' }]}>Do you want to save or discard them
                    </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 22, paddingBottom: 5,alignItems:'center' }}>


                    <TouchableOpacity style={[styles.ButtonCancel, { marginRight: 10 }]} onPress={() => navigation.navigate('Profile')}>
                            <Text style={styles.text2}>Discard</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.ButtonContinue, { }]} onPress={() => {Press1()}}>
                            <Text style={styles.textC}>Save</Text>
                        </TouchableOpacity>
                     
                       
                    </View>
                    <TouchableOpacity onPress={() => Press()}>
                    <Text style={[styles.textdesc, { paddingTop: width * 0.04, textAlign: 'center',color:'red' ,fontWeight:'bold',marginTop:5}]}>Reject Member
                    </Text>
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
    touchableStyle: {
        flex: 1,
        height: Dimensions.get('window').height,
       
   
    },
    modalContainer: {
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').width * 0.55,
        backgroundColor: COLORS.colorBackground,
        marginHorizontal:Dimensions.get('window').width * 0.05,
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
        width: Dimensions.get('window').width * 0.36,
        height: 46,
        borderRadius: 54,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: width * 0.04,
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
        color: "#1A051D",
        fontFamily: FONTS.FontRegular,
    },
    text2: {
        color: COLORS.colorB,
        fontFamily: FONTS.FontMedium,
        fontSize: 14
    },
    ButtonCancel: {
        width: 138,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00387426',
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

    textC: {
        fontFamily: FONTS.FontRegular,
        fontWeight: 'bold',
        fontSize: 14,
        opacity: 5,
        color: COLORS.colorBackground
    },

});

export default ModalSave;