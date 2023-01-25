import React from "react";
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, FONTS } from '../Constants/Constants';
import { useTranslation } from 'react-i18next';

const App = ({ visible, setOccupationModalVisible, setOccupation, onPressOut, salary }) => {
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
                        <Text style={styles.modalTextHead}>{t('common:Occupation')}</Text>
                        <TouchableOpacity style={styles.textTouch}
                            onPress={() => {
                                setOccupation(t('common:Daily'))
                                setOccupationModalVisible(!visible)
                            }
                            }>
                            <Text style={styles.modalText}>{t('common:Daily')}</Text>
                            <View style={{ paddingRight: 10 }}>
                                <Icon
                                    name="checkbox-blank-circle-outline"
                                    color={COLORS.DSMuted}
                                    size={18}
                                />
                            </View>
                        </TouchableOpacity >
                        <View style={styles.lineView} />
                        <TouchableOpacity style={styles.textTouch} onPress={() => {
                            setOccupation(salary ? t('common:Salary') : t('common:Salary2'))
                            setOccupationModalVisible(!visible)
                        }
                        }>
                            <Text style={styles.modalText}>{salary ? t('common:Salary') : t('common:Salary2')}</Text>
                            <View style={{ paddingRight: 10 }}>
                                <Icon
                                    name="checkbox-blank-circle-outline"
                                    color={COLORS.DSMuted}
                                    size={18}
                                />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.lineView} />
                        <TouchableOpacity style={styles.textTouch} onPress={() => {
                            setOccupation(t('common:Farmer'))
                            setOccupationModalVisible(!visible)
                        }
                        }>
                            <Text style={styles.modalText}>{t('common:Farmer')}</Text>
                            <View style={{ paddingRight: 10 }}>
                                <Icon
                                    name="checkbox-blank-circle-outline"
                                    color={COLORS.DSMuted}
                                    size={18}
                                />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.lineView} />

                        <TouchableOpacity style={styles.textTouch} onPress={() => {
                            setOccupation(t('common:Business'))
                            setOccupationModalVisible(!visible)
                        }
                        }>
                            <Text style={styles.modalText}>{t('common:Business')}</Text>
                            <View style={{ paddingRight: 10 }}>
                                <Icon
                                    name="checkbox-blank-circle-outline"
                                    color={COLORS.DSMuted}
                                    size={18}
                                />
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
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,
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
        textAlign: 'center',
        fontFamily: FONTS.FontRegular,
        fontSize: 15,
        fontWeight: '700',
        //: 17,
        marginTop: 20,
        marginBottom: 10
    },
    lineView: {
        borderWidth: 0.9,
        borderColor: COLORS.Gray6,
        backgroundColor: COLORS.Gray6,
        opacity: 0.5
    },

});

export default App;