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


const ItemTabs = (props) => {
    const { t } = useTranslation();
    const [Lang, setLang] = useState('')
    const [ModalVisible1, setModalVisible1] = useState(false)


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
            <TouchableOpacity style={[styles.tabContainer]} onPress={()=>props.navigation.navigate('ActivityScreens')}>
                {props.image}
                <Text style={styles.titleText}>{props.title}</Text>
                {props.notification
                    ? <View style={styles.badgeView}>
                        <Text style={styles.badgeText}>4</Text>
                    </View> : null}

            </TouchableOpacity>

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