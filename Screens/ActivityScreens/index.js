import React, { useCallback, useEffect } from 'react';
import {
  StatusBar,
  Platform,
  StyleSheet,
  SafeAreaView,
  BackHandler
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useDispatch, useStore } from 'react-redux';
import { useNetInfo } from "@react-native-community/netinfo";
// --------------- Component Imports ----------------------
import AllTab from './Components/AllTab';
import MeetTab from './Components/MeetTab';
import CallTab from './Components/CallTab';
import Statusbar from '../../Components/StatusBar';
import { FONTS, COLORS } from '../../Constants/Constants';
import HeaderDashBoard from '../../Components/RepayHeader';
import NetworkScreen from '../../Components/NetworkError2';
import { api } from '../../Services/Api';
const Activityscreens = ({ navigation, route }) => {

  const isDarkMode = true;
  const Tab = createMaterialTopTabNavigator();
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const netInfo = useNetInfo();
 
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

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch({
        type: 'SET_SELECTED_CUSTOMERLIST',
        payload: [],
      });
      dispatch({
        type: 'SET_SELECTED_CUSTOMERID',
        payload: [],
      });
    });
    return unsubscribe;
  }, [navigation]);





  return (
    <>


    <SafeAreaProvider>

      <SafeAreaView style={styles.container1} />
      <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={"#002B59"} />

      <HeaderDashBoard navigation={navigation} name={t('common:Activity')} />

      <Tab.Navigator
        initialRouteName={route?.params?.id ? t('common:Call') : t('common:All')}
        screenOptions={{
          tabBarLabelStyle: { focused: true, fontSize: 14, fontFamily: FONTS.FontSemiB },
          tabBarStyle: { backgroundColor: COLORS.colorB },
          tabBarIndicatorStyle: { backgroundColor: "#A5AFFB", height: 5 },
          tabBarInactiveTintColor: '#D0C9D6',
          tabBarActiveTintColor: COLORS.colorBackground,

        }}>
        <Tab.Screen name={t('common:All')} component={AllTab} navigation={navigation} />
        <Tab.Screen name={t('common:Meet')} component={MeetTab} navigation={navigation} />
        <Tab.Screen name={t('common:Call')} component={CallTab} navigation={navigation}/>
      </Tab.Navigator>


    </SafeAreaProvider> 
    </>
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
  },
})

export default Activityscreens;