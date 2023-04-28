
import React, { useState,useEffect } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View, Dimensions, FlatList } from "react-native";
import { COLORS, FONTS } from '../../../Constants/Constants';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import { useTranslation } from 'react-i18next';
import Image1 from '../assets/Image1.svg';
import Image2 from '../assets/image2.svg';
import Image3 from '../assets/image3.svg';
import Image4 from '../assets/bankpaccount.svg';
import Image5 from '../assets/Frame.svg';
import Image6 from '../assets/language.svg';
import Image7 from '../assets/lock.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from "../../../Services/Api";
const MoreModal = ({ ModalVisible, onPressOut, setModalVisible, setOtpValue, navigation }) => {
    const { t } = useTranslation();
    const [Lang, setLang] = useState('')

    useEffect(() => {
        getData()
       // getBankData()
    }, [])

    const getData = async () => {
        try {
            const lang = await AsyncStorage.getItem('user-language')
            setLang(lang)

        } catch (e) {
            console.log(e)
        }
    }

      // ------------------ get Details Api call Start ------------------
      async function getBankData() {
        console.log('api called')
        const data = {
            id: 2
        }
        await api.BankAccount(data).then((res) => {
            console.log(res.data.body, '----------------------------------->>>>>>>>>>>>>>>>>>>>>>')
            navigation.navigate('AddBank1')
        }).catch((err) => {
            console.log(err, '----------------------------------->>>>>>>>>>>>>>>>>>>>>>')
            navigation.navigate('AddBank2')
        })
    }
    // ----------
    const Data = [
        {
            id: 1,
            title: 'Bank Account'
        },
        {
            id: 2,
            title: 'Language'
        },
        {
            id: 3,
            title: 'Change MPIN'
        },
        {
            id: 4,
            title: 'Loan History'
        },
        {
            id: 5,
            title: 'About Us'
        },
        {
            id: 6,
            title: 'FAQ'
        },
    ]

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getData()
            //Put your Data loading function here instead of my loadData()
        });

        return unsubscribe;
    }, [navigation]);
    const renderItem = ({ item }) => {
        return (
            <View style={{ margin: 10 }}>
                <TouchableOpacity style={{
                    width: width * 0.18, height: width * 0.14,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: "#00387426",
                }}>

                </TouchableOpacity>
                <Text style={{ fontFamily: FONTS.FontRegular, fontSize: 12, color: "#333333" }}>{item.title}</Text>
            </View>
        )
    }
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
                                    <TouchableOpacity style={styles.touch} onPress={()=>navigation.navigate('FAQ')}>
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
        // height: height * 0.28,
        // alignItems: 'center',
        // borderTopLeftRadius: 15,
        // borderTopRightRadius: 15,
        // borderBottomStartRadius: 30,
        // borderBottomEndRadius: 30,
        //  justifyContent:'center',

        // padding: 15
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
