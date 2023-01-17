import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View, Dimensions, Image, Animated } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, FONTS } from '../Constants/Constants';
import { useTranslation } from 'react-i18next';
const width = Dimensions.get('window').width;

const App = ({ visible, onPressOut, close ,setModalVisible}) => {
    const { t } = useTranslation();
    const [data, setData] = useState([{
        id: 1,
        description: t('common:1'),
        checked: false,
    },
    {
        id: 2,
        description: t('common:2'),
        checked: false,
    },
    {
        id: 3,
        description:t('common:3'),
        checked: false,
    },
    ])


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                setModalVisible(!visible)
            }}
        >
            <View style={styles.mainContainer} >
                <TouchableOpacity
                    onPressOut={onPressOut}
                    style={styles.touchableStyle} >
                </TouchableOpacity>
                <View style={styles.centeredView2}>
                    <View style={styles.modalView}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: 27, marginRight: 31, paddingBottom: 20, paddingTop: 26 }}>
                            <Text style={styles.modalTextHead}>{t('common:TrustCircle')}</Text>

                            <TouchableOpacity onPress={onPressOut}>
                                <Icon
                                    name="close"
                                    color={'#000000'}
                                    size={23}
                                    style={{ fontWeight: 'bold' }}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.lineView} />
                        <View style={{ alignItems: 'center' }}>
                            <Image
                                style={{ width: Dimensions.get('window').width * 0.8, height: Dimensions.get('window').height * 0.4 }}
                                source={(require('../assets/Images/tc-concept.png'))}
                            />
                        </View>
                        <View style={{ marginBottom: 27 }}>
                            {data.map((item, index) => {
                                return (
                                    <View style={{
                                        flexDirection: 'row',
                                        marginTop: index === 0 ? 0 : Dimensions.get('window').height * 0.03, marginHorizontal: 20
                                    }}>
                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                            <View style={{ width: 39, height: 39, backgroundColor: '#003874', borderRadius: 19.5, alignItems: 'center', justifyContent: 'center', marginLeft: 0, marginTop: 5 }}>
                                                <Text style={{ color: 'white', fontWeight: '700', fontFamily: FONTS.FontRegular, fontSize: 16 }}>{item.id}</Text>
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Text style={{ color: '#000000', paddingLeft: 20, fontSize: 16, fontWeight: '400', fontFamily: FONTS.FontRegular, fontSize: 16, lineHeight: 24 }}>{item.description}</Text>
                                            </View>
                                        </View>
                                    </View>
                                )
                            })
                            }
                        </View>

                    </View>
                </View>

            </View>
        </Modal>

    );
};

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor:'#000000aa',
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
        alignItems: 'center',
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
        color: COLORS.colorBlack,
        fontFamily: FONTS.FontRegular,
        fontSize: 22,
        fontWeight: '700',
    },
    lineView: {
        borderWidth: 0.9,
        borderColor: COLORS.Gray6,
        backgroundColor: COLORS.Gray6,
        opacity: 0.5
    },

});

export default App;