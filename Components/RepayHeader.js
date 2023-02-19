import React, { useState } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { COLORS, FONTS } from '../Constants/Constants';
import Icon from 'react-native-vector-icons/AntDesign';
import ModalSchedule from './ModalSchedule';
const Header = ({ name, navigation, back, activity, popup }) => {
    const [ModalVisible1, setModalVisible1] = useState(false)
    return (
        <>
            <View style={styles.Header}>
                <View style={{ left: 15, alignItems: 'center', justifyContent: 'center', top: -3 }}>
                    <TouchableOpacity onPress={() => {
                        if (back) {
                            navigation.navigate('CGT')
                        }
                        else if (activity) {
                            navigation.navigate('Profile')
                        } else if (popup) {
                            setModalVisible1(true)
                        }
                        else {
                            navigation.goBack()
                        }
                    }}>
                        <Icon size={17} color={"white"} name="left" />
                    </TouchableOpacity>
                </View>

                <View style={{ left: -10 }}>
                    <Text style={styles.textPrivacy}>{name}</Text>
                </View>

                <View></View>

            </View>
            <ModalSchedule
                ModalVisible={ModalVisible1}
                setModalVisible={setModalVisible1}
                onPressOut={() => {
                    setModalVisible1(false)
                }}
                navigation={navigation} />
        </>
    )
}

export default Header;

const styles = StyleSheet.create({
    Header: {
        backgroundColor: COLORS.colorB,
        height: 48,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textPrivacy: {
        color: COLORS.colorBackground,
        fontSize: 16,
        fontFamily: FONTS.FontRegular,
        fontWeight: '700',
        marginTop: 10,
        marginBottom: 16,
        textAlign: 'center'
    },
})