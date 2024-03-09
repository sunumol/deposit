import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  View,
  BackHandler,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import BlueTitleBar from './Components/BlueTitleBar';
import ConfirmReferenceNumber from './Components/ConfirmReferenceNumber';
import DepositedAmount from './Components/DepositedAmount';
import EntityName from './Components/EntityName';
import ReferenceNumber from './Components/ReferenceNumber';
import Remarks from './Components/Remarks';
import SubmitButton from './Components/SubmitButton';
// import UploadPhoto from './Components/UploadPhoto';

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
  // Define options for the entity dropdown list
  const entityOptions = ['Entity 1', 'Entity 2', 'Entity 3'];

  // State variable to hold the selected entity
  const [selectedEntity, setSelectedEntity] = useState(null);

  // Function to handle the selection of an entity
  const handleSelectEntity = (entity) => {
    setSelectedEntity(entity);
  };

  return (
    <View style={styles.container}>
      {/* Blue Title Bar */}
      <BlueTitleBar title="Deposit" />

      {/* Deposited Amount Component */}
      <DepositedAmount />

      {/* Entity Name Component with Dropdown */}
      <EntityName
        options={entityOptions}
        selectedOption={selectedEntity}
        onSelect={handleSelectEntity}
      />
      <ReferenceNumber />
      <ConfirmReferenceNumber />
      {/* <UploadPhoto /> */}
      <Remarks />
      <SubmitButton />

      {/* Add other components/content of your application */}
    </View>
  );
};

export default Deposit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
