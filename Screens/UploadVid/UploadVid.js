
import React, { useState, useEffect, useCallback } from 'react';
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
import { useSelector } from 'react-redux';
// ----------------- Components Imports ------------
import { COLORS } from '../../Constants/Constants';
import Statusbar from '../../Components/StatusBar';
import Header from '../../Components/Header';
import UploadImage from './Components/UploadImage';
import ModalSave from '../../Components/ModalSave';
import ErrorModal from '../DetailedCheck/Components/ErrorModal';
import ReasonModal from '../DetailedCheck/Components/ReasonModal';
import { useFocusEffect } from '@react-navigation/native';
import { api } from '../../Services/Api';

const UploadVid = ({ navigation }) => {

  const routes = useRoute();
  const isDarkMode = true;
  const { t } = useTranslation();

  const [exitApp, setExitApp] = useState(0);
  const [custID, setCustId] = useState();
  const [ModalVisible, setModalVisible] = useState(false)
  const [ModalReason, setModalReason] = useState(false)
  const [ModalError, setModalError] = useState(false)
  const [frontimage, setFrontimage] = useState('')
  const [backimage, setBackimage] = useState('')
  const activityId = useSelector(state => state.activityId);
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




  const handleGoBack = useCallback(() => {

    // navigation.goBack()
    setModalVisible(true)
    return true; // Returning true from onBackPress denotes that we have handled the event
  }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handleGoBack);

      return () =>

        BackHandler.removeEventListener('hardwareBackPress', handleGoBack);
    }, [handleGoBack]),
  );



  // ------------------ get Conduct DLE basic detail Village Api Call Start ------------------
  const updateRejection = async () => {
    console.log('api called for rejection')
    const data = {
      "activityStatus": 'Submitted wrong data',
      "employeeId": 1,
      "activityId": activityId
    }
    await api.updateActivity(data).then((res) => {
      console.log('-------------------res get Village', res)
      setModalError(true)
      setModalReason(false)
      setTimeout(() => {
        navigation.navigate('Profile')
      }, 1000);

    }).catch((err) => {
      console.log('-------------------err get Village', err)
    })
  };
  // ------------------ HomeScreen Api Call End ------------------



  async function uploadVoterID() {



    const data = {
      "activityId": activityId,
      "cgFrontImage": frontimage,
      "cgBackImage": backimage
    }
    await api.saveCGvoterid(data).then((res) => {
      console.log('-------------------res CG voter id upload', res)
      if (res?.status) {
        navigation.navigate('Profile')

      }
    })
      .catch((err) => {
        console.log('-------------------err CG voter id upload', err)
        navigation.navigate('Profile')
      })
  }
  // --------

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container1} />
      <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor="#002B59" />

      <Header navigation={navigation} name="Upload Voter ID" onPress={handleGoBack} />
      <View style={styles.container2}>
        {/* <UploadImage navigation={navigation} id={Number(custID)}/> */}
        <UploadImage navigation={navigation} id={9252} setFrontimage={setFrontimage} setBackimage={setBackimage} />
      </View>


      <ModalSave
        Press={() => {
          setModalVisible(false),
            setModalReason(true)

        }}
        Press1={() => { uploadVoterID(), setModalVisible(false) }}
        ModalVisible={ModalVisible}
        setModalVisible={setModalVisible}
        onPressOut={() => {
          setModalVisible(false)


        }}
        navigation={navigation} />


      <ReasonModal
        onPress1={() => {
          updateRejection()
          // setModalError(true)
        }}
        ModalVisible={ModalReason}
        onPressOut={() => setModalReason(!ModalReason)}
        setModalVisible={setModalReason}
      />


      <ErrorModal
        ModalVisible={ModalError}
        onPressOut={() => {
          setModalError(!ModalError)
          setModalReason(!ModalReason)
        }}
        setModalVisible={setModalError}
        navigation={navigation}
      />
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
