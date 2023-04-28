import React from "react";
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, FONTS } from '../../../Constants/Constants';
import { useTranslation } from 'react-i18next';

const EnergyModal = ({ visible, onPressOut, setModalVisible, setPurpose, Purpose
}) => {
    const { t } = useTranslation();
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
                        <Text style={styles.modalTextHead}>Cooking fuel type</Text>
                        <View style={styles.lineView} />
                        <TouchableOpacity style={styles.textTouch}
                            onPress={() => {
                                setPurpose('LPG Cylinder')

                                setModalVisible(!visible)

                            }
                            }>
                            <Text style={styles.modalText}>LPG Cylinder</Text>
                            <View style={{ paddingRight: 10 }}>
                                {Purpose == 'LPG Cylinder' ?
                                    <Icon
                                        name="checkbox-blank-circle"
                                        color={COLORS.colorB}
                                        size={18}
                                    /> :
                                    <Icon
                                        name="checkbox-blank-circle-outline"
                                        color={COLORS.DSMuted}
                                        size={18}
                                    />}
                            </View>
                        </TouchableOpacity >
                        <View style={styles.lineView} />
                        <TouchableOpacity style={styles.textTouch} onPress={() => {
                            setPurpose("Others")
                            setModalVisible(!visible)

                        }
                        }>
                            <Text style={styles.modalText}>Others</Text>
                            <View style={{ paddingRight: 10 }}>
                                {Purpose == 'Others' ?
                                <Icon
                                    name="checkbox-blank-circle"
                                    color={COLORS.colorB}
                                    size={18}
                                />:
                                <Icon
                                    name="checkbox-blank-circle-outline"
                                    color={COLORS.DSMuted}
                                    size={18}
                                />}
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

export default EnergyModal;