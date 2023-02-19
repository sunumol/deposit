import {
    StyleSheet,
    Text,
    View,
    Animated,
    Easing,
    BackHandler,
    StatusBar,
    SafeAreaView,
    Platform,
    TextInput,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Statusbar from '../../../Components/StatusBar';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../../../Components/RepayHeader';
import { FONTS, COLORS } from '../../../Constants/Constants';
import Icon1 from 'react-native-vector-icons/Entypo'


const { height, width } = Dimensions.get('screen');

const Energy = ({ navigation }) => {
    const [ButtonS, setButtonS] = useState(false)
    let rotateValueHolder = new Animated.Value(0);


    useEffect(() => {
        startImageRotateFunction()
    }, [])
    const startImageRotateFunction = () => {
        rotateValueHolder.setValue(0);
        Animated.timing(rotateValueHolder, {
            toValue: 1,
            duration: 3000,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start(() => startImageRotateFunction());
    };

    const RotateData = rotateValueHolder.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });


    return (

        <>
            <View style={styles.mainContainer}>
                <ScrollView>
                    <View style={{ alignItems:'center',
                            justifyContent:'center',}}>
                    <Animated.Image
                        style={{
                            width: 200,
                            height: 200,
                           
                            transform: [{ rotate: RotateData }],
                        }}
                        source={require('../../../assets/image/homeB.png')}
                    />
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.textD1}>Data sent to Customer for verification.</Text>
                        <Text style={styles.textD2}>You may proceed after Customer confirms data.</Text>
                    </View>

                </ScrollView>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity style={[styles.buttonView, { backgroundColor: ButtonS ? COLORS.colorB : 'rgba(224, 224, 224, 1)' }]}
                        onPress={() => setButtonS(true)}>
                        <Text style={[styles.continueText, { color: ButtonS ? COLORS.colorBackground : '#979C9E' }]}>Proceed</Text>
                    </TouchableOpacity>
                </View>
            </View>



        </>
    )
}

export default Energy;

const styles = StyleSheet.create({

    TextElect: {
        fontSize: 12,
        color: '#3B3D43',
        fontFamily: FONTS.FontRegular,
        marginTop: 10
    },
    continueText: {
        fontSize: 14,
        fontFamily: FONTS.FontBold,
        color: COLORS.colorBackground,
        letterSpacing: 0.64
    },
    mainContainer: {
        flex: 1,
        //paddingHorizontal: 20,
        backgroundColor: COLORS.colorBackground
    },
    buttonView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 54,
        height: 45,
        marginBottom: 0,
        width: width * 0.88,

    },
    SelectBox: {
        backgroundColor: '#FCFCFC',
        borderRadius: 8,
        borderWidth: 1,
        width: width * 0.89,
        height: width * 0.12,
        borderColor: 'rgba(236, 235, 237, 1)',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: width * 0.02,
        marginBottom: width * 0.02
    },
    textSelect: {
        fontSize: 14,
        color: 'rgba(128, 128, 128, 1)',
        fontFamily: FONTS.FontRegular,
        marginLeft: 10
    },
    textD1: {
        fontSize: 14,
        color: '#000000',
        fontFamily: FONTS.FontSemiB
    },

    textD2: {
        fontSize: 12,
        color: '#808080',
        fontFamily: FONTS.FontRegular,
        paddingTop: width * 0.01
    }

})