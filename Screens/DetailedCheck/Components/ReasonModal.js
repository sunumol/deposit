import React, { useState, useEffect } from "react";
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View, Pressable, } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// ------------------- Component Imports -------------------
import { COLORS, FONTS } from '../../../Constants/Constants';

const { height, width } = Dimensions.get('screen');


const ReasonModal = ({ ModalVisible, onPressOut, onPress1 }) => {

    const [selectedData, setSelectedData] = useState([])
    const [Data, setData] = useState([{
        id: 1,
        Title: 'Suspected fraud',
        isChecked: false
    },
    {
        id: 2,
        Title: 'Non cooperative',
        isChecked: false
    },
    {
        id: 3,
        Title: 'Submitted wrong data',
        isChecked: false
    },
    {
        id: 4,
        Title: 'Unviable household',
        isChecked: false
    },
    {
        id: 5,
        Title: 'Others',
        isChecked: false
    },]
    )

    const [ButtonStatus, setButtonStatus] = useState(false)

    useEffect(() => {
        const check = Data.every(element => element.isChecked === false);
   
        if (check === false) {
            setButtonStatus(true)
        } else {
            setButtonStatus(false);
        }
    }, [Data])

    useEffect(() => {
        Data.forEach(function (item) {
            item.isChecked = false
        })
    }, [])

    return (

        <Modal
            animationType="slide"
            transparent={true}
            visible={ModalVisible}
            onRequestClose={() => {
                Data.forEach(function (item) {
                    item.isChecked = false
                })
                setButtonStatus(false)
                onPressOut()
            }}
        >
            <View style={styles.mainContainer} >
                <TouchableOpacity
                    onPressOut={() => {
                        Data.forEach(function (item) {
                            item.isChecked = false
                        })
                        setButtonStatus(false)
                        onPressOut()
                    }}
                    style={styles.touchableStyle} >
                </TouchableOpacity>
                <View style={styles.centeredView2}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTextHead}>Reason for reject</Text>

                        {Data.map((item, index) => {
                          
                            return (
                                <View style={{ flexDirection: 'column', }} key={item?.id}>
                                    <View style={{
                                        flexDirection: 'row', justifyContent: 'space-between',
                                        paddingLeft: width * 0.06, paddingRight: width * 0.06, alignItems: 'center', marginBottom: width * 0.05, marginTop: width * 0.05
                                    }}>
                                        <Text style={styles.TextTitle}>{item.Title}</Text>
                                        <Pressable onPress={() => {
                                            const nextList = [...Data];
                                            nextList[index].isChecked = !nextList[index].isChecked;
                                            setData(nextList);
                                            if (item.isChecked === true) {
                                                selectedData.push({ item })
                                            } else {
                                                selectedData.splice(index)
                                            }
                                        }} >
                                            <Icon name={item.isChecked ? 'checkbox-marked' : 'checkbox-blank-outline'} size={22} color={item.isChecked ? COLORS.colorB : '#DADADA'} />
                                        </Pressable>
                                    </View>
                                    {item.id !== 5 &&
                                        <View style={styles.lineView} />}
                                </View>
                            )
                        })}

                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity style={[styles.Button1,
                            { backgroundColor: ButtonStatus ? COLORS.colorB : '#ECEBED' }]}
                                onPress={() => {
                                    if (ButtonStatus) {
                                        Data.forEach(function (item) {
                                            item.isChecked = false
                                        })
                                        setButtonStatus(false)
                                        onPress1()
                                    } else {
                                        console.log("hello")
                                    }
                                }}>
                                <Text style={[styles.text1, {
                                    color: ButtonStatus ?
                                        COLORS.colorBackground : '#979C9E', paddingLeft: width * 0.02
                                }]}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    onPressOut={() => {
                        Data.forEach(function (item) {
                            item.isChecked = false
                        })
                        onPressOut()
                    }}
                    style={styles.touchableStyle} >
                </TouchableOpacity>
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
        paddingLeft: 25
    },
    modalView: {
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        elevation: 5,
        shadowRadius: 2,
        width: Dimensions.get('window').width * 0.89,
        paddingBottom: 7
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
        fontSize: 14,
        fontWeight: '700',
        marginTop: 20,
        marginBottom: 10
    },
    lineView: {
        borderWidth: 0.5,
        borderColor: COLORS.Gray6,
        backgroundColor: COLORS.Gray6,
        opacity: 0.5,
    },
    TextTitle: {
        fontSize: 14,
        color: '#3B3D43',
        fontFamily: FONTS.FontRegular
    },
    Button1: {
        width: width * 0.87,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.colorB,
        marginTop: 15,
        flexDirection: 'row',
        borderRadius: 40,
        marginBottom: 15
    },
    text1: {
        fontFamily: FONTS.FontBold,
        fontSize: 14,
        fontWeight: '700'
    },
});

export default ReasonModal;