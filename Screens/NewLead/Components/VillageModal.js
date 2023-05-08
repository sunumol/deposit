import React, { useState, useEffect } from "react";
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback } from "react-native";
import { COLORS, FONTS } from '../../../Constants/Constants';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { height, width } = Dimensions.get('screen');
import Image1 from '../assets/tick.svg';


const VillageModal = ({ ModalVisible, onPressOut, vilageLists, setVillage, setVillageEnable, setButton, setVillageList, setVillageStatus }) => {
    console.log("village list", vilageLists, ModalVisible)
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
            onRequestClose={() => {
               // onPressOut()
            }}
        >
            <View style={styles.mainContainer} >
                <TouchableOpacity onPressOut={() => {
                    onPressOut()
                }}
                    style={{ flex: 1, alignItems: 'center', justifyContent: 'center', opacity: 5 }} >



                    <View style={styles.modalContainer}>
                        <View>
                            {vilageLists?.length > 0
                                ? <View style={{ alignItems: 'center' }}>
                                    <View style={styles.ViewMapBranch1}>
                                        {vilageLists?.map((item, index) => {
                                            return (

                                                <TouchableOpacity onPress={() => {
                                                    setVillage(item)
                                                    setVillageEnable(true)
                                                    setButton(true)
                                                    setVillageList([])
                                                    setVillageStatus(false)

                                                    setBstatus(false)
                                                    onPressOut()
                                                }}>
                                                    <View style={{}}>

                                                        <Text style={styles.ItemNameBranch1}>{item}</Text>
                                                        {vilageLists?.length - 1 !== index ?
                                                            <View style={styles.Line} /> : null}
                                                    </View>
                                                </TouchableOpacity>

                                            )
                                        })}
                                    </View>
                                </View>
                                : <View style={[styles.ViewMapBranch, { height: width * 0.15, }]}>
                                <View style={{ paddingTop: width * 0.05 }}>

                                    <Text style={styles.ItemNameBranch}>No results found</Text>

                                </View>
                            </View> }
                        </View>
                    </View>



                </TouchableOpacity>
            </View>
        </Modal>

    );
};

const styles = StyleSheet.create({
    mainContainer: {
        //backgroundColor: "#000000aa",
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalContainer: {
        // width: Dimensions.get('window').width * 0.9,
        // height: Dimensions.get('window').width * 0.33,
        // backgroundColor: COLORS.colorBackground,

        // alignItems: 'center',
        // justifyContent: 'center',
      flex:0.09,
      marginTop:width*0.6
        // borderWidth: 1,
        // paddingLeft: width * 0.02,
        // borderColor: 'rgba(236, 235, 237, 1)',
        // borderRadius: 8,

        // backgroundColor: '#FCFCFC',
        // alignSelf: 'flex-start'
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
        marginTop: width * 0.07,
        marginBottom: 21
    },
    ViewMapBranch1: {
        width: width * 0.9,
        // height: height * 0.16,
        borderWidth: 1,
        paddingLeft: width * 0.02,
        borderColor: 'rgba(236, 235, 237, 1)',
        borderRadius: 8,
       // marginTop: width * 0.68,
        backgroundColor: '#FCFCFC',
        alignSelf: 'flex-start'
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
    ViewMapBranch: {
        width: width * 0.9,
        height: width * 0.28,
        borderWidth: 1,
        paddingLeft: width * 0.02,
        borderColor: 'rgba(236, 235, 237, 1)',
        borderRadius: 8,
        marginTop: width * 0.60,
        backgroundColor: '#FCFCFC'
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
    ItemNameBranch: {
        paddingLeft: width * 0.02,
        color: "#1A051D",
        fontSize: 12,
        fontFamily: FONTS.FontRegular
    },
    ItemNameBranch1: {
        paddingLeft: width * 0.02,
        color: "#1A051D",
        fontSize: 12,
        fontFamily: FONTS.FontRegular,
        paddingBottom:12,
        paddingTop:12
    },
    Line: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(242, 242, 242, 1)',
        width: width * 0.85,
        // paddingTop: width * 0.035
    },
});

export default VillageModal;