import React, { useState, useEffect } from "react";
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View, BackHandler } from "react-native";
import Icon1 from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS } from '../../../Constants/Constants';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { height, width } = Dimensions.get('screen');


const MemberModal = ({ ModalVisible, onPressOut, setModalVisible,ModalVisible2,ModalVisible3,navigation ,Memberlist,press1}) => {
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
                setModalVisible(!ModalVisible)
            }}
        >
            <View style={styles.mainContainer} >
                <TouchableOpacity
                    onPressOut={onPressOut}
                    style={styles.touchableStyle1} >
        </TouchableOpacity>
                <View style={styles.modalContainer}>

              
                                        {Memberlist?.length > 0
                                            ? 
                                                <View style={styles.ViewMapBranch1}>
                                                    {Memberlist?.map((item) => {
                                                        return (
                                                            <View style={{ borderBottomWidth: 1, paddingTop: 12, paddingBottom: 15, borderColor: COLORS.colorBorder,  borderRadius: 8 }}>




                                                            <TouchableOpacity style={{ flexDirection: 'row', paddingHorizontal: 15 }}
                                                            onPress={() => {
                                                                press1(item)
                                                            }}>
                                                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                      
                                                              <View style={{ flexDirection: 'column' }}>
                                                                <Text style={styles.nameText}>{item.name}</Text>
                                                                <View style={{ flexDirection: 'row' }}>
                                                                  <View style={{ paddingTop: 5, paddingRight: 1 }}>
                                                                    <Icon1 name="location-outline" color={"black"} />
                                                                  </View>
                                                                  <Text style={[styles.idText, { paddingTop: 4 }]}>{item?.pin}</Text>
                                                                </View>
                                                              </View>
                                                            </View>
                                                            <Text style={[styles.numText, { paddingLeft: 6 }]}>{item?.mobile?.replace(/^.{0}/g, '', " ").slice(-10).replaceAt(3, "X").replaceAt(4, "X").replaceAt(5, "X").replaceAt(6, "X").replaceAt(7, "X")}</Text>
                                                          </TouchableOpacity>
                                                          </View>

                                                        )
                                                    })}
                                                </View>
                                       
                                            : 
                                            <>
                                            {Memberlist?.length == 0 &&  <Text style={{
                                                fontSize: 14,
                                                fontFamily: FONTS.FontRegular,
                                                color: COLORS.colorDark,
                                                fontWeight: '400', paddingHorizontal: 10, paddingBottom: 15,paddingTop:5
                                              }}>No results found</Text>}
                                              </>
                                            }
                                   
                 


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

        flex: 1,
        borderWidth:1

    },
    touchableStyle1: {

        height: Dimensions.get('window').width * 0.35,
       
   
    },
    touchableStyle: {
    
        height: Dimensions.get('window').height * 0.5,
     
   
    },
    modalContainer: {
        width: Dimensions.get('window').width * 0.9,
        marginLeft: Dimensions.get('window').width * 0.04,
     
        backgroundColor: COLORS.colorBackground,
        borderRadius: 10,
        paddingTop:7,
        shadowColor: 'rgba(0, 0, 0, 0.4)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        elevation: 5,
        shadowRadius: 7,
        borderWidth:1,
        borderColor: COLORS.colorBorder,

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
        fontSize: 16
    },
    ButtonCancel: {
        width: 138,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00387426',
        borderRadius: 48,
        marginLeft: 25

    },
    ButtonContinue: {
        backgroundColor: COLORS.colorB,
        width: 138,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 48,
        marginRight: 25

    },

    textC: {
        fontFamily: FONTS.FontRegular,
        fontWeight: 'bold',
        fontSize: 14,
        opacity: 5,
        color: COLORS.colorBackground
    },
    ItemNameBranch: {
        paddingLeft: width * 0.01,
        color: "#1A051D",
        fontSize: 14,
        fontFamily: FONTS.FontRegular
    },
    Line: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(242, 242, 242, 1)',
        width: width * 0.85,
        paddingTop: width * 0.035
    },

});

export default MemberModal;