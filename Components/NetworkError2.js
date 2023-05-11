import React, { useCallback, useEffect } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    Text,
    View,
    StatusBar,
    Platform,
    TouchableOpacity,
    BackHandler
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS, FONTS } from '../Constants/Constants';
// import Statusbar from '../../Components/StatusBar';
import NetworkImage from '../Screens/NetWorkError/Images/Network.svg';
import { useFocusEffect } from '@react-navigation/native';

const NetworkScreen = ({ navigation }) => {
    const isDarkMode = true;
    const handleGoBack = useCallback(() => {
      
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
        // <SafeAreaProvider style={{ backgroundColor: COLORS.colorBackground }} >
        
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor: COLORS.colorBackground }}>
                <NetworkImage />
                <View style={{ marginTop: 34 }}>
                    <Text style={styles.textStyle}>Unable to connect to internet.</Text>
                    <Text style={styles.textStyle}>Please check your connectivity.</Text>
                </View>
                <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={styles.tryText}>Try again</Text>
                </TouchableOpacity>
            </View>
        // </SafeAreaProvider>
    )
}

export default NetworkScreen;


const styles = StyleSheet.create({
    container1: {
        flex: 0,
        backgroundColor: "#002B59",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.colorBackground,
    },
    textStyle: {
        color: '#1E293B',
        fontFamily: FONTS.FontSemiB,
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 20,
        letterSpacing: 0.64,
        textAlign: 'center'
    },
    buttonContainer:{ 
        backgroundColor: COLORS.colorB, 
        width: 125,
        height:46,
        borderRadius:54,
        alignItems:'center',
        justifyContent:'center',
        marginTop:25
    },
    tryText:{
        color: COLORS.colorBackground,
        fontFamily: FONTS.FontBold,
        fontSize: 14,
        fontWeight: '700',
        letterSpacing: 0.64,
        textAlign: 'center'
    }

});