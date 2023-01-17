import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View, Dimensions, BackHandler } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, FONTS } from '../Constants/Constants';
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from '@react-navigation/native';

const App = ({ visible, setLoanModalVisible, setLoan, onPressOut, navigation }) => {
    const { t } = useTranslation();

    const [state, setState] = useState(null);

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
                        <Text style={styles.modalTextHead}>{t('common:AnyLoan')}</Text>

                        <TouchableOpacity style={styles.textTouch} onPress={() => {
                            setLoan(t('common:Yes'))
                            setState('yes');
                            setLoanModalVisible(!visible)
                        }
                        }>
                            <Text style={styles.modalText}>{t('common:Yes')}</Text>
                            <View style={{ paddingRight: 10 }}>
                                {state === 'yes'
                                    ? <Icon
                                        name="checkbox-blank-circle"
                                        color={COLORS.colorB}
                                        size={18}
                                    />
                                    : <Icon
                                        name="checkbox-blank-circle-outline"
                                        color={COLORS.DSMuted}
                                        size={18}
                                    />
                                }
                            </View>
                        </TouchableOpacity >
                        <View style={styles.lineView} />
                        <TouchableOpacity style={styles.textTouch} onPress={() => {
                            setLoan(t('common:No'))
                            setState('No');
                            setLoanModalVisible(!visible)
                        }
                        }>
                            <Text style={styles.modalText}>{t('common:No')}</Text>
                            <View style={{ paddingRight: 10 }}>
                                {state === 'No'
                                    ? <Icon
                                        name="checkbox-blank-circle"
                                        color={COLORS.colorB}
                                        size={18}
                                    />
                                    : <Icon
                                        name="checkbox-blank-circle-outline"
                                        color={COLORS.DSMuted}
                                        size={18}
                                    />
                                }
                            </View>
                        </TouchableOpacity>
                        <View style={styles.lineView} />
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
    modalView: {
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        elevation: 7,
        shadowRadius: 1,
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,
        width: Dimensions.get('window').width,
        paddingBottom: 9
    },
    textTouch: {
        paddingVertical: 21,
        paddingHorizontal: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    modalText: {
        color: COLORS.colorBlack,
        fontFamily: FONTS.FontRegular,
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 16,
        opacity: 0.7
    },
    modalTextHead: {
        color: '#3B3D43',
        textAlign: 'center',
        fontFamily: FONTS.FontRegular,
        fontSize: 15,
        fontWeight: '700',
        lineHeight: 24,
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