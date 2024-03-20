import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  View,
  BackHandler,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Header from '../../Components/Header';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Statusbar from '../../Components/StatusBar';
import Deposits from './Components/Deposits';

const Deposit = ({ navigation }) => {
  const route = useRoute();
  console.log('route name');
  const isDarkMode = true;
  const { t } = useTranslation();
  const [lang, setLang] = useState('');
  const [BStatus, setBstatus] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const lang = await AsyncStorage.getItem('user-language');
      setLang(lang);
    } catch (e) {
      console.log(e);
    }
  };

  const handleGoBack = useCallback(() => {
    navigation.goBack();

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
      <Header navigation={navigation} name={t('common:Deposit')} onPress={handleGoBack} />
      <View style={styles.container}>
        <Deposits/>
      </View>
    </SafeAreaProvider>
  );
};

export default Deposit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  container1: {
    flex: 0,
    backgroundColor: "#002B59",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
