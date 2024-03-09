import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import { COLORS, FONTS } from '../../../Constants/Constants';
const { height, width } = Dimensions.get('screen');
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CallModal from './Modal';

const ItemTabs = (props) => {
    const { t } = useTranslation();
    const [Lang, setLang] = useState('')
    const [ModalVisible, setModalVisible] = useState(false)
    console.log('Home Screen click@@@@@@@=========', props)
    console.log('Sunu props.index = ', props.index)

    useEffect(() => {
        getData()

    }, [])

    const getData = async () => {
        try {
            const lang = await AsyncStorage.getItem('user-language')
            setLang(lang)

        } catch (e) {
            console.log(e)
        }
    }
    return (
        <>
            <TouchableOpacity style={[styles.tabContainer]} onPress={() => {
                console.log('sunu inside props.index = ', props.index);
                if (props.index === 0) {
                    props.navigation.navigate('ActivityScreens')
                } else if (props.index === 1) {
                    props.navigation.navigate('Calendar')
                } else if (props.index === 2) {
                    props.navigation.navigate('NewLead')
                } else if (props.index === 5) {
                    props.navigation.navigate('Dashboard')
                } else if (props.index === 3) {
                    props.navigation.navigate('NewCgt')
                    AsyncStorage.removeItem('DATECGT')
                } else if (props.index === 4) {
                    props.navigation.navigate('Collect')
                } else if (props.index === 6) {
                    props.navigation.navigate('Deposit')
                }
            }}>
                {props.image}
                <Text style={styles.titleText}>{props.title}</Text>

                {props.notification
                    ?
                    <>

                        {props.index === 0 ?

                            <>
                                {
                                    props?.notificationCounts?.activityCount != 0 ? <View style={styles.badgeView}>
                                        <Text style={[styles.badgeText, { color: 'white' }]}>{props?.notificationCounts?.activityCount}</Text>
                                    </View> : null
                                }
                            </>





                            : props.index === 4 ?


                                <>
                                    {
                                        props?.notificationCounts?.collectCount != 0 ?
                                            <View style={styles.badgeView}>
                                                <Text style={[styles.badgeText, { color: 'white' }]}>{props?.notificationCounts?.collectCount}</Text>
                                            </View> : null
                                    }
                                </>
                                : null}


                    </>
                    : null}
                {console.log("pros pass", props.notificationCounts)}
            </TouchableOpacity>

            <CallModal ModalVisible={ModalVisible}
                onPress={() => OnpressOut1()}
                //onPressOut={() => setModalVisible(!ModalVisible)}
                setModalVisible={setModalVisible} />
        </>
    )
}

const styles = StyleSheet.create({
    tabContainer: {
        width: '47%',
        height: 125,
        backgroundColor: COLORS.colorBackground,
        borderRadius: 15,
        shadowColor: 'rgba(0, 0, 0, 2.7)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        elevation: 10,
        shadowRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,


    },
    titleText: {
        paddingTop: 15,
        fontSize: 14,
        fontFamily: FONTS.FontMedium,
        color: COLORS.colorDark,
    },
    badgeView: {
        backgroundColor: '#EA4047',
        width: 26,
        height: 26,
        borderRadius: 13,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: -12,
        right: 0
    },
    badgeText: {
        fontSize: 14,
        fontFamily: FONTS.FontBold,
        color: COLORS.colorBackground,
    }
})
export default ItemTabs;