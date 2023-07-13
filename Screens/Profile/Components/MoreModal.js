
import React, { useState,useEffect } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View, Dimensions } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

// ----------- Component Im[]
import { COLORS, FONTS } from '../../../Constants/Constants';

// ------------- Image Imports -----------
import Image2 from '../assets/image2.svg';
import Image3 from '../assets/image3.svg';
import Image7 from '../assets/lock.svg';


const width = Dimensions.get('window').width;

const MoreModal = ({ ModalVisible, onPressOut, setModalVisible, navigation }) => {
   
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

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getData()
            //Put your Data loading function here instead of my loadData()
        });
        return unsubscribe;
    }, [navigation]);
    
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
                <View style={styles.centeredView2}>

                    <View style={styles.ModalView}>

                        <View style={styles.Line} />

                        <View style={{ justifyContent: 'center' }}>
                     
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around',
                             marginTop: width * 0.08, marginBottom: 35 }}>

                                <View style={{ alignItems: 'center', justifyContent: 'center',paddingRight:Lang=='en' ? width*0.0:-5, }}>
                                    <TouchableOpacity style={styles.touch} onPress={() => {
                                        setModalVisible(!ModalVisible)
                                        navigation.navigate('AboutUs')
                                    }}>
                                        <Image3 />
                                    </TouchableOpacity>
                                    <Text style={styles.text}>{t('common:AboutUs')}</Text>
                                </View>

                                <View style={{ alignItems: 'center', justifyContent: 'center' ,paddingRight:Lang == 'en' ? width*0.01:0,}} >
                                    <TouchableOpacity style={styles.touch} onPress={()=>{
                                        setModalVisible(!ModalVisible)
                                        navigation.navigate('FAQ')}}>
                                        <Image2 />
                                    </TouchableOpacity>
                                    <Text style={styles.text}>{t('common:FAQQ')}</Text>
                                </View>

                                <View style={{ alignItems: 'center', justifyContent: 'center' ,left:Lang == 'en' ? 0 : -5}} >
                                    <TouchableOpacity style={styles.touch}
                                    onPress={() => {
                                        setModalVisible(!ModalVisible)
                                        navigation.navigate('ChangeMPIN')
                                    }}>
                                        <Image7 />
                                    </TouchableOpacity>
                                    <Text style={styles.text}>{t('common:MPIN')}</Text>
                                </View>
                            </View>
                            
                        </View>

                    </View>
                </View>
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
    centeredView2: {
        justifyContent: "flex-end",
    },
    ModalView: {
        backgroundColor: COLORS.colorBackground,
        width: width,
        marginTop: 'auto',
    },
    text: {
        fontFamily: FONTS.FontRegular,
        fontSize: 12,
        color: "#333333",
        paddingTop: width * 0.03
    },
    touch: {
        width: width * 0.18,
        height: width * 0.14,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 56, 116, 0.05)',
    },
    Line: {
        width: width * 0.25,
        height: width * 0.012,
        backgroundColor: "#D9D9D9",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: width * 0.03,
        marginLeft: width * 0.38,
    },
});

export default MoreModal;