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
import Statusbar from '../../../Components/StatusBar';
import { FONTS, COLORS } from '../../../Constants/Constants';
import HeaderDashBoard from '../../../Components/RepayHeader';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Trend from './Trend';
import History from './History';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const DetailTab = ({ navigation,loandetail,loanIDs }) => {




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

      



            <Tab.Navigator
             screenOptions={{
                tabBarLabelStyle: { focused: true,fontSize: 13.5,fontFamily:FONTS.FontSemiB},
                tabBarStyle: { backgroundColor: COLORS.colorBackground,elevation:2},
                tabBarInactiveTintColor:'#BDBDBD',
                tabBarIndicatorStyle:{backgroundColor:COLORS.colorB,height:5},
                tabBarActiveTintColor: COLORS.colorDark ,
                
              }}>
                <Tab.Screen name={'Payment History'} component={History} navigation={navigation} initialParams={{loanIDs:loanIDs}}/>
                <Tab.Screen name={'Trend'} component={Trend} navigation={navigation} initialParams={{loanIDs:loanIDs}}/>
             
               
            </Tab.Navigator>

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

export default DetailTab;