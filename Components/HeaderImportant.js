import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image
} from 'react-native';
import { COLORS, FONTS } from '../Constants/Constants'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SvgUri } from 'react-native-svg';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import Home from '../assets/Images/Vector.svg';
const HeaderImportant = ({ name, details, navigation }) => {
    return (
        <View style={styles.Header}>
            <View style={{ flex: 1, alignItems: 'center', paddingLeft: Dimensions.get('window').width * 0.08 }}>
                <Text style={[styles.textPrivacy]}>{name}</Text>
            </View>
            <TouchableOpacity style={{ paddingRight: Dimensions.get('window').width*0.08, paddingTop: 16 }} onPress={() => navigation.navigate('Profile')}>
                <Home
                    
                    width={21}
                    height={21}
                />
            </TouchableOpacity>
        </View>
    )
}

export default HeaderImportant;

const styles = StyleSheet.create({

    Header: {
        flex: 0,
        backgroundColor: COLORS.colorB,
        height: 55,
        flexDirection: 'row',
    },
    textPrivacy: {
        color: COLORS.colorBackground,
        fontSize: 16,
        fontFamily: FONTS.FontSemiB,
        fontWeight: '600',
        marginTop: 16,
        marginBottom: 16
    }
})