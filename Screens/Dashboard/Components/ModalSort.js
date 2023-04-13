import React, { useEffect, useState } from 'react';
import {
    View,
    Image,
    Dimensions,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,

} from 'react-native';
import { RadioButton } from 'react-native-paper';
import { COLORS, FONTS } from '../../../Constants/Constants';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';
const { height, width } = Dimensions.get('screen');

const ModalSort = ({ ModalVisible, onPressOut, setModalVisible, setSortData,setStateRefresh}) => {
    const [checked, setChecked] = React.useState('first');
    const { t } = useTranslation();
    // console.log("setSort.....", setSortData,checked)

// useEffect(()=>{
//    // setSortData(checked)
//     // console.log("setSort.....", setSortData,checked)
// },[checked])
  
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={ModalVisible}
            onRequestClose={() => {
                setModalVisible(false)
            }}>
            <TouchableOpacity onPressOut={() => setModalVisible(false)}
                style={{ flex: 1, backgroundColor: "#000000aa", }}>

                <TouchableOpacity onPressOut={() => setModalVisible(false)}>
                    <View style={styles.ModalsubView} >
                        <View style={styles.ModalView1}>
                            {/*<Text style={styles.TextDelete}>{t('common:AreS1')} ?</Text>*/}

                            <View>
                                <View style={styles.View1}>
                                    <Text style={styles.Loantext}>Arrear amount</Text>
                                    <RadioButton
                                        value="first"
                                        uncheckedColor={"#D0C9D6"}
                                        color={COLORS.colorB}
                                        status={checked === 'first' ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            setChecked('first')
                                            setSortData('arrear')
                                            setModalVisible(false)
                                            setStateRefresh(true)
                                            //sortFunction
                                        }}
                                    />
                                </View>

                                <View style={styles.ViewLine} />

                                <View style={styles.view2}>
                                    <Text style={styles.Loantext}>DPD</Text>
                                    <RadioButton
                                        value="second"
                                        uncheckedColor={"#D0C9D6"}
                                        color={COLORS.colorB}
                                        status={checked === 'second' ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            setChecked('second')
                                            setSortData('dpd')
                                            setModalVisible(false)
                                            setStateRefresh(true)
                                           // sortFunction
                                        }
                                        }
                                    />
                                </View>

                            </View>


                        </View>
                    </View>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    )
}

const styles = StyleSheet.create({
    ModalView1: {
        backgroundColor: COLORS.colorBackground,
        width: width * 0.45,
        height: height * 0.12,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: width * 0.05,
        //padding: 21,
        borderRadius: 8,
        marginTop:width*0.02

    },
    ModalsubView: {
        opacity: 5,
        left: 0,
        right: 0,
        alignItems: 'flex-end',
        top: 0,
        justifyContent: 'center',
        paddingTop: width *1.165,
        position: 'absolute'
    },
    View1: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        marginLeft:10,
        marginRight:10
    },
    Loantext: {
        fontSize: 12,
        color: "#3B3D43",
        fontFamily: FONTS.FontRegular,
        paddingLeft: width * 0.02
    },
    ViewLine: {
        width: width * 0.45,
        height: 1,
        backgroundColor: '#F2F2F2',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: width * 0.01,
        marginBottom: width * 0.01
    },
    view2: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        marginLeft:10,
        marginRight:10
    }
})

export default ModalSort;