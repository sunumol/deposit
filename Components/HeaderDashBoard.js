import React, { useState,useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    Modal,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Icon1 from "react-native-unicons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

import { api } from '../Services/Api'
import { COLORS, FONTS } from '../Constants/Constants';

const { height, width } = Dimensions.get('screen');

const HeaderDashBoard = ({ navigation, notificationCounts }) => {

    const [ModalVisible, setModalVisible] = useState(false)
    const { t } = useTranslation();
    const [custID, setCustId] = useState()

    useEffect(() => {
        AsyncStorage.getItem("CustomerId").then((value) => {
            setCustId(value)
        })
    }, [])

    async function LogoutApi() {
        console.log("inside custid",custID)
        const data = {
            id: custID
        }
        await api.logoutApi(data).then((res) => {
            if (res?.status == 200) {
                console.log(res)
                // navigation.navigate('LoginScreen')
                // AsyncStorage.removeItem('Token')
                // AsyncStorage.removeItem('CustomerId')
                setModalVisible(false)
                navigation.reset({
                    index: 0,
                    routes: [{name: 'PinScreen'}],
                });
            }else{
                console.log("re",res)
            }
        }).catch((err) => {
            console.log('-------------------err', err?.response)
        })
    }

    return (
        <View style={styles.Header}>
            <View style={{ marginBottom: 12, left: -15 }}>
                <Image source={require('../assets/image/logo-white.png')}
                    style={{ width: 160, height: 35 }}
                    resizeMode='contain' />
            </View>

            <View style={{ flexDirection: 'row', left: -8 }}>
                <TouchableOpacity onPress={() => navigation.navigate('NotificationScreen')}>
                    <Icon1.Bell color={COLORS.colorBackground} width={25} height={25} />
                    <View style={styles.IconView}>
                        <Text style={styles.textCount}>{notificationCounts?.notificationCount}</Text>
                    </View>
                </TouchableOpacity>

                <View style={{ marginLeft: 25 }}>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Icon name="ios-power"
                            size={23}
                            color={COLORS.colorBackground} />
                    </TouchableOpacity>
                </View>

            </View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={ModalVisible}
                onRequestClose={() => {
                    setModalVisible(false)
                }}>
                <TouchableOpacity onPressOut={() => setModalVisible(false)}
                    style={{ backgroundColor: "#000000aa", flex: 1, alignItems: 'center', justifyContent: 'center', opacity: 5 }} >
                    <View style={styles.ModalView1}>

                        <Text style={[styles.TextDelete1, { textAlign: 'center' }]}>{t('common:LogoutMsg')}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 22, paddingBottom: 22 }}>
                            <TouchableOpacity style={[styles.ButtonCancel, { marginRight: 10 }]} onPress={()=>LogoutApi()}  >
                                <Text style={styles.text2}>{t('common:Yes')}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.ButtonContinue} onPress={() => setModalVisible(false)}>
                                <Text style={styles.textC}>{t('common:No')}</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </TouchableOpacity>
            </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
    Header: {
        backgroundColor: COLORS.colorB,
        height: 60,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    IconView: {
        backgroundColor: "red",
        width: 15,
        height: 15,
        borderRadius: 7.5,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 10
    },
    textCount: {
        color: COLORS.colorBackground,
        fontSize: 9,
        fontFamily: FONTS.FontSemiB
    },
    ButtonCancel: {
        width: 138,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.colorLight,
        borderRadius: 48,

    },
    ButtonContinue: {
        backgroundColor: COLORS.colorB,
        width: 138,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 48,

    },
    ModalView1: {
        backgroundColor: COLORS.colorBackground,
        width: width * 0.92,
        // height:height/4,
        alignItems: 'center',
        //justifyContent:'space-around',
        //padding: 21,
        borderRadius: 8

    },
    text2: {
        color: COLORS.colorB,
        fontFamily: FONTS.FontMedium,
        fontSize: 14
    },
    textC: {
        fontFamily: FONTS.FontRegular,
        fontWeight: 'bold',
        fontSize: 14,
        opacity: 5,
        color: COLORS.colorBackground
    },
    TextDelete1: {
        fontSize: 16,
        fontFamily: FONTS.FontRegular,
        fontWeight: '400',
        color: "#3B3D43",
        paddingTop: 27
    },
})
export default HeaderDashBoard;