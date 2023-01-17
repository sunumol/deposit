import React,{useEffect} from 'react';
import { StyleSheet, BackHandler, SafeAreaView, View,ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CustomStatusBar from './Component/CustomStatusbar';
import Statusbar from '../../Components/StatusBar';
import Language from './Component/Language';
const SplashScreen = ({navigation}) => {
    const isDarkMode = true
    // useEffect(() => {
    //    setTimeout(() => navigation.navigate('IntroScreen'), 3000);
       
    //   }, []);

    return (
        <>
            <SafeAreaProvider>
                <SafeAreaView style={styles.container} />
                <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'}  backgroundColor= {"#002B59"}/>
            
          
            
                 <View style={{justifyContent:'center',flex:1}}>
                 <CustomStatusBar
                    barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                    
                />
                    <Language navigation={navigation}/>
        
                </View> 
            </SafeAreaProvider>
        </>
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