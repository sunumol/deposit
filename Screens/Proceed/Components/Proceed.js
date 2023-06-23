import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import React, { useState,useEffect } from 'react'
import LottieView from 'lottie-react-native';
import { useRoute } from '@react-navigation/native';

import { FONTS, COLORS } from '../../../Constants/Constants';

const { height, width } = Dimensions.get('screen');

const Energy = ({ navigation }) => {
    const route = useRoute();

    const [ButtonS, setButtonS] = useState( false)
   
    useEffect(() => {
        if(route?.params?.status){
            setButtonS(true)
        }
    }, [route])
    
    return (
        <>
            <View style={styles.mainContainer}>
                <ScrollView>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>

                        {ButtonS
                            ? <LottieView source={require('../Assets/shakehand.json')} autoPlay loop={true} style={{ width: 200, height: 200 }} />
                            : <LottieView source={require('../Assets/hour-glass.json')} autoPlay loop={true} style={{ width: 200, height: 200 }} />
                        }
                    </View>

                    {!ButtonS ?
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={styles.textD1}>Data sent to Customer for verification.</Text>
                            <Text style={styles.textD2}>You may proceed after Customer confirms data.</Text>
                        </View> :

                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={styles.textD1}>Customer has confirmed the data</Text>

                        </View>}

                </ScrollView>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    {ButtonS ? <TouchableOpacity style={[styles.buttonView, { backgroundColor: COLORS.colorB }]}
                        onPress={() => navigation.navigate('HousePhoto')}
                        >
                        <Text style={[styles.continueText, { color: COLORS.colorBackground }]}>Proceed</Text>
                    </TouchableOpacity> :
                        <TouchableOpacity style={[styles.buttonView, { backgroundColor: 'rgba(224, 224, 224, 1)' }]}
                          //  onPress={() => setButtonS(true)}
                            >
                            <Text style={[styles.continueText, { color: '#979C9E' }]}>Proceed</Text>
                        </TouchableOpacity>}
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