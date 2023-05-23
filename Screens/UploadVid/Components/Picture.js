import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image
} from 'react-native';
import { COLORS, FONTS } from '../../../Constants/Constants';
const { height, width } = Dimensions.get('screen');
import { useTranslation } from 'react-i18next';
import Close from '../../../assets/Images/close.svg';
import Tick from '../../../assets/Images/tick1.svg';
import Image1 from '../../../assets/Images/imageId1.svg';
import Image2 from '../../../assets/Images/imageId2.svg';
import Image3 from '../../../assets/Images/imagenew.svg';
import Image4 from '../../../assets/Images/imageId4.svg';

const Picture = ({ navigation }) => {
    const { t } = useTranslation();


    return (

        <View style={styles.View3}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.textPhoto}>{t('common:HowTo')}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: height * 0.02, justifyContent: 'center' }}>

              <Image source={require('../../../assets/Images/Group8810.png')} />
            </View>

        </View>
    )
}

export default Picture;

const styles = StyleSheet.create({
    View3: {
        width: width * 0.87,
        height: height * 0.31,
        margin: 4,
        backgroundColor: "#F2F2F2",
        marginTop: width * 0.08,
        marginBottom: width * 0.08,
        borderRadius: 8,
    },
    textPhoto: {
        fontSize: 14,
        fontFamily: FONTS.FontSemiB,
        color: COLORS.colorDark,
        paddingTop: 17,
        fontWeight: '700'
    },
    viewCard: {
        width: width * 0.19,
        height: height * 0.12,
        borderRadius: 4,
        opacity: 3,
        borderWidth: 0.5,
        borderColor: "#828282",
        backgroundColor: '#D9D9D9',
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 7 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    }
})