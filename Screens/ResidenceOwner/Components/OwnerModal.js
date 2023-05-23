import React,{useState} from "react";
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon1 from 'react-native-vector-icons/Fontisto'
import { COLORS, FONTS } from '../../../Constants/Constants';
import { useTranslation } from 'react-i18next';

const OwnerModal = ({ visible, onPressOut,setModalVisible,setPurpose,setNamestatus,setImage,
    setUploadStatus,setImageStatus}) => {
    const { t } = useTranslation();
    const [owner,setOwner] = useState('')
    return (

        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onPressOut}
        >
            <View style={styles.mainContainer} >
                <TouchableOpacity
                    onPressOut={onPressOut}
                    style={styles.touchableStyle} >
                </TouchableOpacity>
                <View style={styles.centeredView2}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTextHead}>Ownership Proof</Text>
                        <View style={styles.lineView} />
                        <TouchableOpacity style={styles.textTouch}
                            onPress={() => {
                                setPurpose('ELECTRICITY_BILL')
                                setOwner('ELECTRICITY_BILL')
                                setUploadStatus(true)
                                setImage('')
                                setModalVisible(!visible)
                                setImageStatus(true)
                                setNamestatus(true)
                            }
                            }>
                            <Text style={styles.modalText}>Electricity Bill</Text>
                            <View style={{ paddingRight: 10 }}>
                            { owner == 'ELECTRICITY_BILL'
                                ?  
                                <Icon1 name="radio-btn-active" size={18} color={COLORS.colorB} /> 
                                :
                                <Icon1 name="radio-btn-passive" size={18}  color={COLORS.DSMuted} />
                        
                                }
                            </View>
                        </TouchableOpacity >
                        <View style={styles.lineView} />
                        <TouchableOpacity style={styles.textTouch} onPress={() => {
                            setPurpose("WATER_BILL")
                            setOwner('WATER_BILL')
                            setModalVisible(!visible)
                            setUploadStatus(true)
                            setImage('')
                            setImageStatus(true)
                            setNamestatus(true)
                        }
                        }>
                            <Text style={styles.modalText}>Water bill</Text>
                            <View style={{ paddingRight: 10 }}>
                            { owner == 'WATER_BILL'
                                ?  
                                <Icon1 name="radio-btn-active" size={18} color={COLORS.colorB} /> 
                                :
                                <Icon1 name="radio-btn-passive" size={18}  color={COLORS.DSMuted} />
                        
                                }
                            </View>
                        </TouchableOpacity>
                        <View style={styles.lineView} />
                        <TouchableOpacity style={styles.textTouch} onPress={() => {
                            setPurpose('BUILDING_TAX_RECEIPT')
                            setOwner('BUILDING_TAX_RECEIPT')
                            setModalVisible(!visible)
                            setUploadStatus(true)
                            setImageStatus(true) 
                            setImage('')
                            setNamestatus(true)
                        }
                        }>
                            <Text style={styles.modalText}>Building Tax Receipt</Text>
                            <View style={{ paddingRight: 10 }}>
                            { owner == 'BUILDING_TAX_RECEIPT'
                                ?  
                                <Icon1 name="radio-btn-active" size={18} color={COLORS.colorB} /> 
                                :
                                <Icon1 name="radio-btn-passive" size={18}  color={COLORS.DSMuted}/>
                        
                                }
                            </View>
                        </TouchableOpacity>
                  

            

                    </View>
                </View>
            </View>
        </Modal>

    );
};

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "#000000aa",
        flex: 1
    },
    touchableStyle: {
        flex: 1,
        height: Dimensions.get('window').height,
    },
    centeredView2: {
        justifyContent: "flex-end",
    },
    modalView: {
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        elevation: 5,
        shadowRadius: 2,
        // borderBottomStartRadius: 30,
        // borderBottomEndRadius: 30,
        width: Dimensions.get('window').width,
        paddingBottom: 7
        // height:Dimensions.get('window').height*0.3
    },
    textTouch: {
        paddingVertical: 20,
        paddingHorizontal: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        color: COLORS.colorBlack,
        fontFamily: FONTS.FontRegular,
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 17,
        opacity: 0.7

    },
    modalTextHead: {
        color: '#3B3D43',
        textAlign: 'left',
        fontFamily: FONTS.FontSemiB,
        fontSize: 15,
        marginLeft: 25,
        marginTop: 22,
        marginBottom: 15
    },
    lineView: {
        borderWidth: 0.5,
        borderColor: COLORS.Gray6,
        backgroundColor: COLORS.Gray6,
        opacity: 0.5
    },

});

export default OwnerModal;