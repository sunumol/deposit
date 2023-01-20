import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, Image, Animated } from "react-native";
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, FONTS } from '../../../../Constants/Constants';
import { useTranslation } from 'react-i18next';
import Modal from "react-native-modal";
import Disable from '../../Images/disable.svg'
import Enable from '../../Images/enable.svg'
import { Colors } from "react-native/Libraries/NewAppScreen";

const App = ({ visible, onPressOut, meet }) => {
    const [enableContinue, setEnableContinue] = useState(false)
    const [id, setId] = useState()
    const [data, setData] = useState([
        {
            id: 1,
            title: 'Not interested',
            checked: false
        },
        {
            id: 2,
            title: 'Not reachable',
            checked: false
        },
        {
            id: 3,
            title: meet === true ? 'Eligibility not checked' : 'Explained Trust Circle',
            checked: false
        }
    ])
{console.log("hdhfjhdskjgkghkerhkg----",meet)}
    return (
        <Modal isVisible={visible}
            onBackButtonPress={onPressOut}
            onBackdropPress={onPressOut}
            style={{ margin: 0 }}>
            <View style={styles.mainContainer}>
                <View style={styles.modalContainer}>
                    <Text style={styles.statusText}>Status</Text>
                    <View style={{ flexDirection: 'row', paddingHorizontal: 20, paddingTop: 20 }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={[styles.circleStyle, { backgroundColor: '#94BCC8' }]}>
                                <Text style={styles.circleText}>AJ</Text>
                            </View>

                            <View style={{ flexDirection: 'column', paddingLeft: 12, paddingTop: 5 }}>
                                <Text style={styles.nameText}>Ashly James</Text>
                                <View style={{ flexDirection: 'row', }}>
                                    <View style={{ paddingTop: 5, paddingRight: 1 }}>
                                        <Icon1 name="location-outline" color={"black"} />
                                    </View>
                                    <Text style={[styles.idText, { paddingTop: 4 }]}>682025</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', paddingTop: 4 }}>
                            <Icon2 name="phone-in-talk-outline" color={"black"} size={15} />
                            <Text style={[styles.numText, { paddingLeft: 6 }]}>878XXXXX00</Text>
                        </View>

                    </View>

                    {data.map((item, data) => {
                        return (
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    paddingHorizontal: 20,
                                    paddingTop: 40,
                                    marginRight: 10
                                }}>

                                <Text style={styles.textStyle}>{item.title}</Text>
                                {enableContinue && id && item.id === id
                                    ? <Enable width={18} height={18} onPress={() => {
                                        setEnableContinue(false)
                                        setId()

                                    }} />
                                    : <Disable width={18} height={18} onPress={() => {
                                        setEnableContinue(true)
                                        setId(item.id)
                                    }
                                    } />
                                }
                            </View>
                        )
                    })}

                    <TouchableOpacity
                        style={[styles.continueView, { backgroundColor: id ? COLORS.colorB : COLORS.colorBorder }]}
                        onPress={onPressOut}
                        disabled={id ? false : true}>
                        <Text style={[styles.continueText, { color: id ? COLORS.colorBackground : COLORS.colorWhite2 }]}>Submit</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>

    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    modalContainer: {
        width: '100%',
        backgroundColor: COLORS.colorBackground,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    statusText: {
        fontSize: 14,
        fontFamily: FONTS.FontBold,
        color: COLORS.colorBlack,
        textAlign: 'center',
        paddingTop: 20
    },
    circleStyle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    circleText: {
        fontSize: 18,
        fontFamily: FONTS.FontSemiB,
        color: COLORS.colorBackground,
        fontWeight: '600',
    },
    circleText: {
        fontSize: 18,
        fontFamily: FONTS.FontSemiB,
        color: COLORS.colorBackground,
        fontWeight: '600',
    },
    nameText: {
        fontSize: 12,
        fontFamily: FONTS.FontBold,
        color: COLORS.colorDark,
        fontWeight: '600',
    },
    idText: {
        fontSize: 11,
        fontFamily: FONTS.FontRegular,
        color: COLORS.colorDark,
        paddingTop: 3,
        width: 110
    },
    numText: {
        fontSize: 12,
        fontFamily: FONTS.FontRegular,
        color: COLORS.colorDark,
        fontWeight: '400',
    },
    textStyle: {
        fontSize: 14,
        fontFamily: FONTS.FontRegular,
        color: COLORS.colorDark,
    },
    continueText: {
        textAlign: 'center',
        fontFamily: FONTS.FontBold,
        fontSize: 14,
        letterSpacing: 0.64,
        color: COLORS.colorBackground
    },
    continueView: {
        height: 48,
        borderRadius: 43,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.colorB,
        marginVertical: 22,
        marginHorizontal: 15
    },

});

export default App;