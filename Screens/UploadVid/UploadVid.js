import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  StatusBar,
  BackHandler,
  ToastAndroid
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { useRoute } from '@react-navigation/native';

// ----------------- Components Imports ------------
import { COLORS } from '../../Constants/Constants';
import Statusbar from '../../Components/StatusBar';
import Header2 from '../../Components/Header2';
import UploadImage from './Components/UploadImage';

const UploadVid = ({ navigation }) => {

  const routes = useRoute();
  const isDarkMode = true;
  const { t } = useTranslation();

  const [exitApp, setExitApp] = useState(0);
  const [custID, setCustId] = useState()

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const id = await AsyncStorage.getItem('CustomerId')
      setCustId(id)
      console.log('---------id---------', id)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleGoBack,
    );
    return () => backHandler.remove();
  }, [exitApp]);

  const handleGoBack = () => {
    if (routes.name === "UploadVid") {
      if (exitApp === 0) {
        setExitApp(exitApp + 1);
        console.log("exit app uploadvid", exitApp)
        ToastAndroid.show("Press back again to exit.", ToastAndroid.SHORT);
      } else if (exitApp === 1) {
        BackHandler.exitApp();
        console.log("exit app else", exitApp)
      }
      setTimeout(() => {
        setExitApp(0)
      }, 3000);
      return true;
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container1} />
      <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor="#002B59" />

      <Header2 navigation={navigation} name={t('common:UploadV')} />
      <View style={styles.container2}>
        {/* <UploadImage navigation={navigation} id={Number(custID)}/> */}
        <UploadImage navigation={navigation} id={9252} />
      </View>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container1: {
    flex: 0,
    backgroundColor: "#002B59",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container2: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: COLORS.colorBackground,
    paddingBottom: 15,
  }
})

export default UploadVid;