import React, { useState, useEffect } from "react";
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { COLORS, FONTS } from '../../../Constants/Constants';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { height, width } = Dimensions.get('screen');
import Image1 from '../../../assets/image/warning.svg';
import Icon1 from 'react-native-vector-icons/Octicons';

const ApprovalModal = ({ ModalVisible, onPressOut, setModalVisible, onPress, navigation ,list}) => {
    const [state, setState] = useState(null);
    const { t } = useTranslation();
    const [Lang, setLang] = useState('')
    const [BStatus, setBstatus] = useState(false)

    useEffect(() => {
        getData()
        console.log('-----jkkjjj',list)
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
                setModalVisible(!ModalVisible)
                navigation.navigate('NewCgt')
            }}
        >
            <TouchableOpacity onPressOut={onPressOut}
                style={{ backgroundColor: "#000000aa", flex: 1, alignItems: 'center', justifyContent: 'center', opacity: 5 }} >



                <View style={styles.modalContainer}>
                    <View style={{ paddingTop: width * 0.03,paddingBottom:width*0.04 }}>
                        <Image1 />
                    </View>



                    <View style={{alignItems:'center',justifyContent:'center',marginBottom:10}}>
                        <Text style={styles.appText}>Waiting for Trust Circle Approval by:</Text>
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                        {list.map((item,index)=>{
                            if(item.dleScheduleStatus === 'TC approval pending'){
                                return(
                                    <View style={{ flexDirection: 'row' }}>
                                    <Icon1 name="dot-fill" size={10} color={'#1A051D'} style={{ marginTop: 5 }} />
                                    <Text style={styles.name}>{item.name}</Text>
                                   </View>
                                        )
                            }
                          
                       
                        })
                    }
                       
                       

                    </View>
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => {
                        onPressOut()
                        
                        navigation.navigate('DLESchedule')
                    }}>
                        <Text style={styles.buttonTextStyle}>{t('common:Okay')}</Text>
                    </TouchableOpacity>
                </View>

            </TouchableOpacity>
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
       // height: Dimensions.get('window').width * 0.61,
        backgroundColor: COLORS.colorBackground,
        borderRadius: 20,
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
    appText: {
        fontSize: 14,
        color: '#3B3D43',
        fontFamily: FONTS.FontSemiB,

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
        color: "#3B3D43",
        fontFamily: FONTS.FontSemiB,
    },
    name: {
        color: '#1A051D',
        fontFamily: FONTS.FontRegular,
        fontSize: 14,
        marginLeft: 8
    }

});

export default ApprovalModal;