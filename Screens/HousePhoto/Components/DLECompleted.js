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
import LottieView from 'lottie-react-native';

const { height, width } = Dimensions.get('screen');

const DLECompleted = ({ navigation }) => {
    const [ButtonS, setButtonS] = useState(false)
  
    // useEffect(() => {
    //     setTimeout(() => setButtonS(true)
    //    // navigation.navigate('HousePhoto')
    //     , 3000);
    // }, [])



    const handleGoBack = useCallback(() => {
    
            navigation.navigate('Profile')
        
        return true; // Returning true from onBackPress denotes that we have handled the event
      }, [navigation]);
    
      useFocusEffect(
        React.useCallback(() => {
          BackHandler.addEventListener('hardwareBackPress', handleGoBack);
    
          return () =>
            BackHandler.removeEventListener('hardwareBackPress', handleGoBack);
        }, [handleGoBack]),
      );

    return (

        <>
            <View style={styles.mainContainer}>
                <ScrollView>
                    <View style={{flex:1,marginTop:150, alignItems:'center',
                            justifyContent:'center',}}>
                    
                    <LottieView source={require('./tickcongrats.json')} autoPlay loop={true} style={{ width:200,height:200}} />

                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.textD1}>DLE is Completed</Text>
                  
                    </View>

                </ScrollView>
                <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() =>  navigation.navigate('Profile')}
                    style={[styles.Button1, { backgroundColor: COLORS.colorB,marginBottom:20}]}
                >
                    <Text style={[styles.text1, { color:  COLORS.colorBackground }]}>Continue</Text>
                </TouchableOpacity>
            </View>
             
            </View>



        </>
    )
}

export default DLECompleted;

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
       justifyContent:'center',
       alignItems:'center',
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
        fontSize: 20,
        color: 'rgba(0, 56, 116, 1)',
        fontFamily: FONTS.FontSemiB
    },

    textD2: {
        fontSize: 12,
        color: '#808080',
        fontFamily: FONTS.FontRegular,
        paddingTop: width * 0.01
    },
    Button1: {
        width: width * 0.87,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.colorB,
        marginTop: 31,
        marginLeft: 12,
        marginRight: 12,
        borderRadius: 40,
        marginBottom: 0
    },
    text1: {
        fontFamily: FONTS.FontBold,
        fontSize: 14,
        fontWeight: '700'
    },

})