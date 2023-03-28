import {
  StyleSheet, Text, View, BackHandler, StatusBar,
  SafeAreaView, Platform, TextInput, ScrollView, TouchableOpacity
} from 'react-native'
import React, { useCallback, useState, useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Statusbar from '../../Components/StatusBar';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../../Components/RepayHeader';
import { FONTS, COLORS } from '../../Constants/Constants';
import Edit from './Images/Vector.svg'
import Search from './Images/Search.svg'
import ItemTabs from '../ActivityScreens/Components/AllTab';
import Icon1 from 'react-native-vector-icons/Ionicons'
import SelectedTab from './Components/SelectedTab';
import CgtModal from './Components/Modal';
import SearchIcon from 'react-native-vector-icons/Feather'
import { useTranslation } from 'react-i18next';
import { api } from '../../Services/Api';
import moment from 'moment';




const SelectCustomer = ({ navigation, route }) => {
  const isDarkMode = true;
  const [text, onChangeText] = useState('');
  const [selectedItem, setSelectedItem] = useState();
  const [ModalVisible, setModalVisible] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(route?.params?.date)
  const { t } = useTranslation();

  const handleGoBack = () => {

    if (text.length > 0) {
      onChangeText('')
      console.log("text nulll", text)
    } else {
      navigation.goBack()
    }
    return true
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleGoBack,
    );
    return () => backHandler.remove();
  }, [handleGoBack]);




  // ------------------ get Customer List Api Call Start ------------------
  const getCustomerList = async () => {

    const data = {
      "employeeId": 1,
      "customerNameOrNumber": ''
    };
    await api.getCustomerList(data).then((res) => {
      console.log('------------------- customer list res', res.data.body)
      setCustomerList(res?.data?.body)
    })
      .catch((err) => {
        console.log('-------------------err', err?.response)
      })
  };
  // --



  //   // ------------------ get Customer List Api Call Start ------------------
  //   const createCGT = async () => {

  //     let date = (moment(selectedDate).utc().format("DD-MM-YYYY"))
  //     let selectedtime = route?.params?.data?.time

  //     let time = selectedtime.slice(0,5);





  //     console.log('schedule time',time)

  //     const data = {
  //       "employeeId":1,
  //       "customerId":selectedItem.id,
  //       "scheduleStartTime":date +" " + time
  //   }
  //     await api.createCGT(data).then((res) => {
  //         console.log('------------------- create CGT res', res.data.body)
  //       // setCustomerList(res?.data?.body)
  //        setModalVisible(true)
  //     })
  //         .catch((err) => {
  //             console.log('-------------------err', err?.response)
  //         })
  // };
  // // --



  // ------------------ get Customer List Api Call Start ------------------
  const createCGT = async () => {

    let date = (moment(selectedDate).utc().format("DD-MM-YYYY"))
    let selectedtime = route?.params?.data?.time

    let time = selectedtime.slice(0, 5);





    console.log('schedule time', time)

    const data = {
      "employeeId": 1,
      "customerId": selectedItem.id,
      "scheduleStartTime": date + " " + time
    }
    await api.createCGT(data).then((res) => {
      console.log('------------------- create CGT res', res.data.body)
      // setCustomerList(res?.data?.body)
      setModalVisible(true)
      setEnab(false)
    })
      .catch((err) => {
        console.log('-------------------err', err?.response)
      })
  };
  // --



  useEffect(() => {
    getCustomerList()

  }, [enab])


  const searchText = (e) => {


    let searchword = e;

    setsearchvalue(e);



  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container1} />
      <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={"#002B59"} />

      <Header navigation={navigation} name={t('common:SelectCM')} />

      <View style={styles.mainContainer}>
        <ScrollView showsVerticalScrollIndicator={false} >
          <View style={styles.boxView}>
            <View style={styles.contentView}>
              <Text style={styles.timeText}>{route?.params?.data.time}</Text>
              <Text style={styles.dateText}>{moment(selectedDate).utc().format("ddd")},{moment(selectedDate).utc().format("DD MMM")}</Text>
            </View>

            < TouchableOpacity style={styles.editView} onPress={() => navigation.navigate('NewCgt')}>
              <Edit />
              <Text style={styles.changeText}>{t('common:Change')}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.searchBox}>
            <TextInput
              placeholder={t('common:EnterNORM')}
              placeholderTextColor={'#808080'}
              onChangeText={(text) => OnchangeNumber(text)}
              value={text}
              style={{ flex: 1, color: COLORS.colorDark, fontSize: 14, fontFamily: FONTS.FontMedium }}

            />
            <SearchIcon color={"#808080"} name="search" size={18} style={{ right: 5 }} />
          </View>
          {text.length === 0 && !selectedItem
            ?
            <>
              <Text style={styles.recentlyText}>{t('common:RecentCust')}</Text>
              {customerList?.map((item, index) =>
                <>
                  <TouchableOpacity onPress={() => { setSelectedItem(item), console }}>
                    <Text style={styles.dataText}>{item.name ? item.name : item.mobile}</Text>
                  </TouchableOpacity>
                  {index !== 6
                    ? <View style={styles.lineView} />
                    : null
                  }
                </>
              )}
            </>
            : null
          }
          {text.length > 0 && !selectedItem
            ?
            <View style={{ borderWidth: 1, paddingTop: 12, paddingBottom: 22, borderColor: COLORS.colorBorder, marginTop: 10, borderRadius: 8 }}>
              {customerList?.map((item, index) =>
                <>
                  <TouchableOpacity style={{ flexDirection: 'row', paddingHorizontal: 15, }}
                    onPress={() => {
                      setSelectedItem(item)
                      onChangeText('')
                    }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>

                      <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.nameText}>{item.name ? item.name : item.mobile}</Text>
                        <View style={{ flexDirection: 'row' }}>
                          {item?.pin ? (<View style={{ paddingTop: 5, paddingRight: 1 }}>
                            <Icon1 name="location-outline" color={"black"} />
                          </View>) : null}
                          <Text style={[styles.idText, { paddingTop: 4 }]}>{item.pin ? item.pin : null}</Text>
                        </View>
                      </View>
                    </View>
                    <Text style={[styles.numText, { paddingLeft: 6 }]}>{item.mobile}</Text>
                  </TouchableOpacity>

                  {index !== 2
                    ? <View style={styles.lineView} />
                    : null
                  }
                </>
              )}

              {
                customerList && (
                  <View>
                    <Text style={[styles.nameText, { padding: 10 }]}>No match Found</Text>
                  </View>
                )
              }
            </View>
            : null
          }

          {selectedItem
            ? <SelectedTab item={selectedItem} setEnab={setEnab} />
            : null
          }


        </ScrollView>
        {selectedItem
          ?
          <TouchableOpacity style={styles.buttonView}
            onPress={() => createCGT()}
          //  onPress={()=>setModalVisible(true)}
          >
            <Text style={styles.continueText}>{t('common:Confirm')}</Text>
          </TouchableOpacity>
          : null
        }
      </View>

      <CgtModal ModalVisible={ModalVisible}
        onPressOut={() => {
          setModalVisible(false)
          navigation.navigate('NewCgt')
        }}

        navigation={navigation}
        //  onPressOut={() => setModalVisible(!ModalVisible)}
        setModalVisible={setModalVisible} />
    </SafeAreaProvider>
  )
}

export default SelectCustomer;

const styles = StyleSheet.create({
  container1: {
    flex: 0,
    backgroundColor: "#002B59",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: COLORS.colorBackground
  },
  editView: {
    borderRadius: 48,
    backgroundColor: COLORS.colorLight,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13,
    paddingVertical: 6
  },
  contentView: {
    flexDirection: 'column',
  },
  boxView: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.colorBorder,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  timeText: {
    fontSize: 12,
    fontFamily: FONTS.FontSemiB,
    color: COLORS.colorB,
  },
  dateText: {
    fontSize: 14,
    fontFamily: FONTS.FontRegular,
    color: COLORS.colorBlack,
  },

  changeText: {
    fontSize: 12,
    fontFamily: FONTS.FontMedium,
    color: COLORS.colorB,
    paddingLeft: 8
  },
  searchBox: {

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: COLORS.colorBorder,
    borderRadius: 8,
    marginTop: 23
  },
  recentlyText: {
    fontSize: 14,
    fontFamily: FONTS.FontSemiB,
    color: COLORS.Black,
    paddingTop: 30,
    paddingBottom: 38
  },
  dataText: {
    fontSize: 14,
    fontFamily: FONTS.FontMedium,
    color: COLORS.colorDark,
  },
  lineView: {
    borderWidth: 0.9,
    borderColor: COLORS.Gray6,
    backgroundColor: COLORS.Gray6,
    opacity: 0.5,
    marginTop: 13,
    marginBottom: 16
  },
  nameText: {
    fontSize: 12,
    fontFamily: FONTS.FontBold,
    color: COLORS.colorDark,
    fontWeight: '600',
  },
  idText: {
    fontSize: 11,
    fontFamily: FONTS.FontRegular,
    color: COLORS.colorDark,
    paddingTop: 3,
    width: 110
  },
  numText: {
    fontSize: 12,
    fontFamily: FONTS.FontRegular,
    color: COLORS.colorDark,
    fontWeight: '400',
  },
  buttonView: {
    backgroundColor: COLORS.colorB,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 54,
    height: 48,
    marginBottom: 25
  },
  continueText: {
    fontSize: 14,
    fontFamily: FONTS.FontBold,
    color: COLORS.colorBackground,
    letterSpacing: 0.64
  }

})