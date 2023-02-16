import React,{useCallback} from 'react';
import {
    StatusBar,
    Platform,
    StyleSheet,
    SafeAreaView,
    View,
    ScrollView,
    BackHandler
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Statusbar from '../../Components/StatusBar';
import { FONTS, COLORS } from '../../Constants/Constants';
import HeaderDashBoard from '../../Components/RepayHeader';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AllTab from './Components/AllTab';
import MeetTab from './Components/MeetTab';
import CallTab from './Components/CallTab';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const Activityscreens = ({ navigation }) => {
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

            <HeaderDashBoard navigation={navigation} name={t('common:Activity')} />


            <Tab.Navigator
             screenOptions={{
                tabBarLabelStyle: { focused: true,fontSize: 14,fontFamily:FONTS.FontSemiB},
                tabBarStyle: { backgroundColor: COLORS.colorB },
                tabBarIndicatorStyle:{backgroundColor:"#A5AFFB",height:5},
                tabBarInactiveTintColor:'#D0C9D6',
                tabBarActiveTintColor: COLORS.colorBackground ,
                
              }}>
                <Tab.Screen name={t('common:All')} component={AllTab} navigation={navigation} />
                <Tab.Screen name={t('common:Meet')} component={MeetTab} navigation={navigation} />
                <Tab.Screen name={t('common:Call')} component={CallTab} />
            </Tab.Navigator>

        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container1: {
        flex: 0,
        backgroundColor: "#002B59",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    container2: {
        flex: 1,
        backgroundColor: COLORS.colorBackground,

        //justifyContent: 'center',
    },

})

export default Activityscreens;