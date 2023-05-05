import React, { useCallback, useEffect, useState } from 'react';
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
import { useDispatch,useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CallModal from '../Profile/Components/Modal';


const Activityscreens = ({ navigation ,id}) => {
  console.log("id pass not in",id)
  const isDarkMode = true;
  const Tab = createMaterialTopTabNavigator();
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const [idw, setId] = useState(null)
  const activityId = useSelector(state => state.CallFlag);

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
    const unsubscribe = navigation.addListener("focus", () => {
      console.log("inside addeventlistener",AsyncStorage.getItem('CallActivity'))
      const langg = AsyncStorage.getItem('CallActivity')
      console.log("log active",activityId)
     getData()
     AsyncStorage.getItem("CallActivity").then((value) => {
      dispatch({
        type: 'SET_CALL-FLAG',
        payload: value
      });
  
       console.log("value of new item",value)
       setTimeout(()=>{
        setId(value);
       },1000)
     setId(value);
     console.log("value of new item",idw)
  })
  .then(res => {
      //do something else
  });
    });

    return unsubscribe;
  }, [navigation]);

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


  const getData = async () => {

    try {
      const lang1 =JSON.parse(await AsyncStorage.getItem('CallActivity'))
      console.log("no modal data inside", lang1)
    //  (await AsyncStorage.getItem('CallActivity'))
      //setId(lang1)
      setTimeout(()=>{
        setId(lang1)
      },1000)
      setId(lang1)
      console.log("getdata pass", idw)
    
    } catch (e) {
      console.log(e)
    }
  }



  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container1} />
      <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={"#002B59"} />

      <HeaderDashBoard navigation={navigation} name={t('common:Activity')} />


      <Tab.Navigator
        initialRouteName={idw== null ? t('common:All') : t('common:Call')}
        screenOptions={{
          tabBarLabelStyle: { focused: true, fontSize: 14, fontFamily: FONTS.FontSemiB },
          tabBarStyle: { backgroundColor: COLORS.colorB },
          tabBarIndicatorStyle: { backgroundColor: "#A5AFFB", height: 5 },
          tabBarInactiveTintColor: '#D0C9D6',
          tabBarActiveTintColor: COLORS.colorBackground,

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