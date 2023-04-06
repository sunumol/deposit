import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView ,PermissionsAndroid} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

// --------------- Component Imports ---------------------
import CustomStatusBar from './Component/CustomStatusbar';
import Statusbar from '../../Components/StatusBar';
import LinearGradient from 'react-native-linear-gradient';

const SplashScreen = ({ navigation }) => {
    
    const isDarkMode = true

    useEffect(() => {
        setTimeout(() => getData(), 3000);
    }, []);
   
    const getData = async () => {
        try {
          const Token = await AsyncStorage.getItem('Token')
          console.log('--------Token',Token)
          if (Token) {
            isGrantedPermissions()
          } else {
            navigation.navigate('LoginScreen')
          }
        } catch (e) {
          console.log(e)
        }
      }
      
      const isGrantedPermissions = async () => {
        const camera = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA)
        const Location = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        if (camera && Location) {
            const Pin = await AsyncStorage.getItem('Pin')
            const PinDate = await AsyncStorage.getItem('PinDate')
            const ExpiredDate = await AsyncStorage.getItem('ExpiredDate')
            console.log(Pin,PinDate,ExpiredDate)
            if (Pin && PinDate) {
                navigation.navigate('PinScreen')
            } else {
                navigation.navigate('CreatePin')
            }
        } else {
            navigation.navigate('Permission')
        }
    };

    return (
            <SafeAreaProvider>
                <SafeAreaView style={styles.container} />
                <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={'#002B59'} />

                <LinearGradient colors={['#003874', '#6034B7']} start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} style={{ justifyContent: 'center', flex: 1 }}>
                    <CustomStatusBar
                        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                    />
                </LinearGradient>
            </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#002B59",
        color: "white"

    },
});

export default SplashScreen;