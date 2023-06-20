import React, { useEffect } from "react";
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, FONTS } from '../../../Constants/Constants';
import { useTranslation } from 'react-i18next';
import Icon1 from 'react-native-vector-icons/Fontisto';
const OwnerModal = ({ visible, onPressOut,setModalVisible,setRelation,setPurpose,Purpose,Error}) => {
    const { t } = useTranslation();
   // console.log("setRelation....",setRelation)


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
                        <Text style={styles.modalTextHead}>Select Relation</Text>
                        <View style={styles.lineView} />
                        <TouchableOpacity style={styles.textTouch}
                            onPress={() => {
                               // setRelation("Self")
                              // setStatus(true)
                                setPurpose('Customer')
                                setModalVisible(!visible)
                            }
                            }>
                            <Text style={styles.modalText}>Customer</Text>
                            <View style={{ paddingRight: 10 }}>
   
                             {Purpose == 'Customer'? 
                                <Icon1 name="radio-btn-active" size={18} color={COLORS.colorB} /> :
                                
                                <Icon1 name="radio-btn-passive" size={18}  color={COLORS.DSMuted} />}
                            </View>
                        </TouchableOpacity >
                        {!Error &&
                        <>
                        <View style={styles.lineView} />
                        <TouchableOpacity style={styles.textTouch} onPress={() => {
                            setPurpose("Spouse")
                            setModalVisible(!visible)
                        }
                        }>
                            <Text style={styles.modalText}>Spouse</Text>
                            <View style={{ paddingRight: 10 }}>
                            
                            {Purpose == "Spouse" ? 
                                <Icon1 name="radio-btn-active" size={18} color={COLORS.colorB} /> :
                                
                                <Icon1 name="radio-btn-passive" size={18}  color={COLORS.DSMuted}/>}
                            </View>
                        </TouchableOpacity>
                        </>}
                     


           
            


            
            
            

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