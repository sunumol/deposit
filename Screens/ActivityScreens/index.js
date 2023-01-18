import React from 'react';
import {
    StatusBar,
    Platform,
    StyleSheet,
    SafeAreaView,
    View,
    ScrollView
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Statusbar from '../../Components/StatusBar';
import { FONTS, COLORS } from '../../Constants/Constants';
import HeaderDashBoard from '../../Components/RepayHeader';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AllTab from './Components/AllTab';
import MeetTab from './Components/MeetTab';
import CallTab from './Components/CallTab';

const Activityscreens = ({ navigation }) => {
    const isDarkMode = true;
    const Tab = createMaterialTopTabNavigator();

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container1} />
            <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={COLORS.colorB} />

            <HeaderDashBoard navigation={navigation} name="Activity" />


            <Tab.Navigator
             screenOptions={{
                tabBarLabelStyle: { focused: true,fontSize: 14,fontFamily:FONTS.FontSemiB},
                tabBarStyle: { backgroundColor: COLORS.colorB },
                tabBarIndicatorStyle:{backgroundColor:"#A5AFFB",height:5},
                tabBarInactiveTintColor:'#D0C9D6',
                tabBarActiveTintColor: COLORS.colorBackground ,
                
              }}>
                <Tab.Screen name="All" component={AllTab} />
                <Tab.Screen name="meet" component={MeetTab} />
                <Tab.Screen name="call" component={CallTab} />
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