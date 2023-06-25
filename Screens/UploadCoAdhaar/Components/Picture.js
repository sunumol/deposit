import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
} from 'react-native';
import { COLORS, FONTS } from '../../../Constants/Constants';
import { SvgUri } from 'react-native-svg';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import { useTranslation } from 'react-i18next';
const { height, width } = Dimensions.get('screen');
import Image1 from '../../../assets/Images/i1.svg';
import Image2 from '../../../assets/Images/i2.svg';
import Image3 from '../../../assets/Images/images2.svg';
import Image4 from '../../../assets/Images/i4.svg';
import ImageC from '../../../assets/Images/close.svg';
import ImageT from '../../../assets/Images/tick1.svg';
const Picture = ({ navigation }) => {
    const { t } = useTranslation();

    return (
        <View style={styles.View3}>
            <Text style={styles.textPhoto}>{t('common:HowTo')}</Text>

            <Image source={require('../../../assets/ImageFolder/Group.png')}/>
  
        </View>
    )
}

export default Picture;

const styles = StyleSheet.create({
    View3: {
        width: width * 0.88,
        height: height * 0.295,
        // paddingRight:17,
        // height: 265,
        backgroundColor: "#F2F2F2",
        marginTop: height * 0.02,
        alignItems: 'center',
        borderRadius: 8,
        //justifyContent: 'center',
        // flex: 1
    },
    textPhoto: {
        fontSize: 14,
        fontFamily: FONTS.FontSemiB,
        color: COLORS.colorDark,
        marginTop: 20,
        marginBottom: width*0.05,
        fontWeight: '700'
    },
    viewCard: {
        width: width * 0.35,
        height: width * 0.23,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#828282",
        backgroundColor: '#D9D9D9',
        marginRight: width * 0.012,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: width * 0.012,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 7 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    ViewSub: {
        flexDirection: 'row',
        paddingTop: height * 0.015,
        justifyContent: 'space-between'
    },
    ViewSub1: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingTop: 19
    },
})