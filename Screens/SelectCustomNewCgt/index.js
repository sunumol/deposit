
import {
  StyleSheet, Text, View, BackHandler, StatusBar,
  SafeAreaView, Platform, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions, Pressable
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Icon1 from 'react-native-vector-icons/Ionicons'
import moment from 'moment';
import SearchIcon from 'react-native-vector-icons/Feather'
import { useTranslation } from 'react-i18next';

// -------------- Component Imports ------------------------
import Statusbar from '../../Components/StatusBar';
import Header from '../../Components/RepayHeader';
import { FONTS, COLORS } from '../../Constants/Constants';
import { api } from '../../Services/Api';
import SelectedTab from './Components/SelectedTab';
import CgtModal from './Components/Modal';
import MemberModal from './Components/MemberModal';
// ----------- Image Imports ---------
import Edit from './Images/Vector.svg'

const { height, width } = Dimensions.get('screen');

const SelectCustomerNewCgt = ({ navigation, route }) => {

  const isDarkMode = true;
  const { t } = useTranslation();

  const [text, onChangeText] = useState('');
  const [selectedItem, setSelectedItem] = useState();
  const [ModalVisible, setModalVisible] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(route?.params?.date)
  const [enab, setEnab] = useState(false)
  const [status, setStatus] = useState(true)
  const [EmptyList, setEmptyList] = useState(false)
  const [ModalVisible4,setModalVisible4] = useState(false)
  const [reschedulecgt, setReschedulecgt] = useState('')
  const [clearpop,setClearPop] = useState(false)

  const handleGoBack = () => {
    if (text?.length > 0) {
      onChangeText('')
      setEmptyList(false)
    } else {
      navigation.goBack()
    }
    return true
  }

  useEffect(() => {
    setReschedulecgt(route?.params?.rescheduledata)
  }, [route?.params?.rescheduledata])

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleGoBack,
    );
    return () => backHandler.remove();
  }, [handleGoBack]);

  String.prototype.replaceAt = function (index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
  }

  const OnchangeNumber = (num) => {
    setSelectedItem(null)
    if (/^[^!-\/:-@\.,[-`{-~]+$/.test(num) || num === '') {
      onChangeText(num)
      let searchword = num;
      if (num !== '') {
        setEmptyList(true)
      } else {
        setEmptyList(false)
      }
      getCustomerList(searchword)
    
    } else if (text?.length > 1) {
      setEmptyList(false)
    }
  }

  // ------------------ get Customer List Api Call Start ------------------
  const getCustomerList = async (searchvalue) => {

    console.log('search------->>>>>', searchvalue,clearpop)
    const data = {
      "employeeId": 1,
      "customerNameOrNumber": searchvalue ? searchvalue : ' '
    };
    if(searchvalue){
     setClearPop(true)
    }
    await api.getCustomerList(data).then((res) => {
      console.log('------------------- customer list res', res.data.body)
      setCustomerList(res?.data?.body)
      
      setStatus(false)
    })
      .catch((err) => {
        console.log('-------------------err', err?.response)
        setStatus(false)
      })
  };
  // ------------------------- end -----------------------------------------------

  // ------------------ get Customer List Api Call Start -----------------------------
  const createCGT = async () => {
    let selectedtime = moment(route?.params?.data?.time, ["h:mm A"]).format("HH:mm");
    let time = selectedtime.slice(0, 5);
    const data = {
      "employeeId": 1,
      "customerId": reschedulecgt ? reschedulecgt.primaryCustomerId : selectedItem.id,
      "scheduleStartTime": moment(route?.params?.date).format("DD-MM-YYYY") + " " + time
    }
    await api.createCGT(data).then((res) => {
      console.log('------------------- create CGT res', res)
      setModalVisible(true)
      setEnab(true)
    }).catch((err) => {
      console.log('-------------------err', err?.response)
    })
  };
  // --------------- end --------------------------------------------------------------------

  useEffect(() => {
    getCustomerList()
  }, [enab])


  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container1} />
      <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={"#002B59"} />

      <Header navigation={navigation} name={t('common:SelectCM')} onPress={handleGoBack} />
      {status ?
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, }}>
          <ActivityIndicator size={30} color={COLORS.colorB} />
        </View> :
        <Pressable 
        onPress={()=>{setClearPop(false),
          onChangeText(''),
          setStatus(false)}} style={styles.mainContainer}>
          <ScrollView 
       //   keyboardShouldPersistTaps={'always'}
          keyboardDismissMode={'on-drag'}
          showsVerticalScrollIndicator={false} >
            <View style={styles.boxView}>
              <View style={styles.contentView}>
                <Text style={styles.timeText}>{route?.params?.data.time}</Text>
                <Text style={styles.dateText}>{moment(selectedDate).utc().format("ddd")}, {moment(selectedDate).utc().format("DD MMM")}</Text>
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
                maxLength={25}
                
                style={{ flex: 1, color: COLORS.colorDark, fontSize: 14, fontFamily: FONTS.FontMedium }}
              />
              <SearchIcon color={"#808080"} name="search" size={18} style={{ right: 5 }} />
            </View>
            {text?.length === 0 && !selectedItem
              ?
              <>
                <Text style={styles.recentlyText}>{t('common:RecentCust')}</Text>
                <>
                  {customerList?.map((item, index) =>
                    <>
                      <TouchableOpacity onPress={() => { setSelectedItem(item), console }}>
                        <Text style={styles.dataText}>{item.name ? item.name : item?.mobile.replace(/^.{0}/g, '').replaceAt(4, "X").replaceAt(5, "X").replaceAt(6, "X").replaceAt(7, "X")}</Text>
                      </TouchableOpacity>
                      {index !== 10
                        ? <View style={styles.lineView} />
                        : null
                      }
                    </>
                  )}
                </>
              </>
              : null
            }

            <View >
              {text?.length >  0 && clearpop && !selectedItem
                ?
                <View style={{ borderWidth: customerList?.length > 0 ? 1 : 0, paddingTop: customerList?.length > 0 ? 12 : 0, paddingBottom: customerList?.length > 0 ? 12 : 2, borderColor: COLORS.colorBorder, marginTop: 10, borderRadius: 8 }} >
                  {customerList?.map((item, index) =>
                
                    <>
                      <TouchableOpacity style={{ flexDirection: 'row', paddingHorizontal: 15, }}
                        onPress={() => {
                          setSelectedItem(item)
                          onChangeText('')
                        }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>

                          <View style={{ flexDirection: 'column' }}>
                            <Text style={styles.nameText}>{item.name ? item.name : item?.mobile.replace(/^.{0}/g, '').replaceAt(4, "X").replaceAt(5, "X").replaceAt(6, "X").replaceAt(7, "X")}</Text>
                            <View style={{ flexDirection: 'row' }}>
                              {item?.pin ? (<View style={{ paddingTop: 5, paddingRight: 1 }}>
                                <Icon1 name="location-outline" color={"black"} />
                              </View>) : null}
                              <Text style={[styles.idText, { paddingTop: 4 }]}>{item.pin ? item.pin : null}</Text>
                            </View>
                          </View>
                        </View>
                        <Text style={[styles.numText, { paddingLeft: 6 }]}>{item?.mobile?.replace(/^.{0}/g, '').slice(-10).replaceAt(3, "X").replaceAt(4, "X").replaceAt(5, "X").replaceAt(6, "X").replaceAt(7, "X")}</Text>
                      </TouchableOpacity>

                      {customerList?.length - 1 !== index
                        ? <View style={styles.lineView} />
                        : null
                      }
                    </>
                  )}

                </View>
                : null
              }
            </View>
            {
              customerList?.length === 0 &&  clearpop  &&EmptyList && (
                <View style={styles.ViewMapBranch}>
                  <Text style={[styles.nameText, { padding: 10 }]}>No results found</Text>
                </View>
              )
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
            >
              <Text style={styles.continueText}>{t('common:Confirm')}</Text>
            </TouchableOpacity>
            : null
          }
        </Pressable>}

      <CgtModal ModalVisible={ModalVisible}
        onPressOut={() => {
          setModalVisible(false)
          navigation.navigate('Profile')
        }}
        navigation={navigation}
        setModalVisible={setModalVisible}
      />


{/* <MemberModal
               press1={(value) => {
                onChangeText('')
                setSelectedItem(value)
                setModalVisible4(false)
               }}
                Memberlist={customerList}
                ModalVisible={ModalVisible4}
                onPressOut={() => setModalVisible4(false)}
                setModalVisible={setModalVisible4}



            /> */}
    </SafeAreaProvider>
  )
}

export default SelectCustomerNewCgt;

const styles = StyleSheet.create({
  container1: {
    flex: 0,
    backgroundColor: "#002B59",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    //backgroundColor:'red'
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
    borderWidth: 0.6,
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
  },
  ViewMapBranch: {
    width: width * 0.89,
    height: width * 0.15,
    borderWidth: 1,
    paddingLeft: width * 0.01,
    borderColor: 'rgba(236, 235, 237, 1)',
    borderRadius: 8,
    backgroundColor: '#FCFCFC',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
})
