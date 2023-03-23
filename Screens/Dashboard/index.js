import React,{useCallback,useState} from 'react';
import {
    StatusBar,
    Platform,
    StyleSheet,
    SafeAreaView,
    View,
    ScrollView,
    BackHandler,
    Dimensions
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS, FONTS } from '../../Constants/Constants';
import Statusbar from '../../Components/StatusBar';
import Header from '../../Components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import DPD from './Components/DPD';
import Summary from './Components/Summary';
import Target from './Components/Target';


const Dashboard= ({ navigation, }) => {
    const isDarkMode = true;
    const Tab = createMaterialTopTabNavigator();
    const { t } = useTranslation();
    
    const handleGoBack = useCallback(() => {
        navigation.goBack()
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
        <SafeAreaProvider>
        <SafeAreaView style={styles.container1} />
        <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={"#002B59"} />

        <Header navigation={navigation} name={'Dashboard'} />


        <Tab.Navigator
         screenOptions={{
            tabBarLabelStyle: { focused: true,fontSize: 14,fontFamily:FONTS.FontSemiB},
            tabBarStyle: { backgroundColor: COLORS.colorB },
            tabBarIndicatorStyle:{backgroundColor:"#A5AFFB",height:5},
            tabBarInactiveTintColor:'#D0C9D6',
            tabBarActiveTintColor: COLORS.colorBackground ,
            
          }}>
            <Tab.Screen name={'Target'} component={Target} navigation={navigation} />
            <Tab.Screen name={'DPD'} component={DPD} navigation={navigation} />
            <Tab.Screen name={'Summary'} component={Summary} />
        </Tab.Navigator>

    </SafeAreaProvider>
    )
}

export default Dashboard;


const styles = StyleSheet.create({
    container1: {
        flex: 0,
        backgroundColor: "#002B59",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    ViewContent: {
        // justifyContent: 'center',
        //  alignItems: 'center',
        flex: 1,
        backgroundColor: COLORS.colorBackground,
        padding: 20
    },
    text: {
        fontWeight: '400',
        fontFamily: FONTS.FontRegular,
        fontSize: 14,
        marginTop: 21,
        marginLeft: 21,
        marginRight: 21,
        textAlign: 'justify',
        color: "#1A051D",
    },
    Head: {
        fontFamily: FONTS.FontExtraBold,
        fontSize: 18,
        fontWeight: '800',
        color: "#1A051D",
        paddingTop: 31
    },
    viewHead: {
        marginTop: Dimensions.get('window').height * 0.02,
        marginBottom: 0,
        marginLeft: 21
    }
})