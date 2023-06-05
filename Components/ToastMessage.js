import React, { useState, useEffect } from "react";
import {Modal, StyleSheet, Text, View } from "react-native";
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

// --------------- Componnet Imports ------------------
import { COLORS, FONTS } from '../Constants/Constants';


const ToastMessage = ({ ModalVisible, customerName }) => {
  
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
        >
             <View style={{flex:1, justifyContent:'flex-end',marginHorizontal:16,marginBottom:25,}}>
            <View style={styles.mainContainer} >
                <Text style={{textAlign:'center',
                fontFamily:FONTS.FontRegular,
                color:COLORS.colorBackground,
                fontSize:12}}>Hi {customerName}, We have noticed that you are signing in from a new device</Text>
            </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "#000000aa",
       paddingHorizontal:40,
       paddingVertical:10,
       alignItems:'center',
       justifyContent:'center',
       borderRadius:50
    },
    touchableStyle: {
        flex: 1
    },
    modalContainer: {
        marginHorizontal: 20,
        backgroundColor: COLORS.colorBackground,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default ToastMessage;