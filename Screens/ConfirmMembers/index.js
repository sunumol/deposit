import { StyleSheet, Text, View, BackHandler, StatusBar, SafeAreaView, Platform, TextInput, ScrollView, TouchableOpacity, Pressable } from 'react-native'
import React, { useCallback, useState, useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SearchIcon from 'react-native-vector-icons/Feather'
import Icon1 from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

// ---------------- Component Import ---------------------
import Statusbar from '../../Components/StatusBar';
import Header from '../../Components/RepayHeader';
import { FONTS, COLORS } from '../../Constants/Constants';
import SelectTab from './Components/SelectTab';
import ReasonModal from './Components/ReasonModal';
import ErrorModal from './Components/ErrorModal';
import { api } from '../../Services/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MemberModal from './Components/MemberModal';

String.prototype.replaceAt = function (index, replacement) {
  return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}
const ConfirmMembers = ({ navigation }) => {

  const isDarkMode = true;

  const [text, onChangeText] = useState('');
  const [selectedItem, setSelectedItem] = useState();
  const [dataSelected, setDataSelected] = useState();
  const [dataSelectedID, setDataSelectedID] = useState();
  const [tccustomerlist, setTccustomerlist] = useState();
  const [ModalError, setModalError] = useState(false)
  const [ModalReason, setModalReason] = useState(false)
  const [rejectReason, setRejectReason] = useState()
  const [status,setStatus] = useState(false)
  const [ModalVisible4,setModalVisible4] = useState(false)
  const [clearpop,setClearPop] = useState(false)
  // -----------Redux State ---------------------------------
  const dispatch = useDispatch()
  const customerList = useSelector(state => state.customerList);
  const customerID = useSelector(state => state.customerID);
  const cgtCustomerDetails = useSelector(state => state.cgtCustomerDetails);



  const datas = [
    {
      id: 1,
      Title: 'Suspected fraud',
      isChecked: false
    },
    {
      id: 2,
      Title: 'Non cooperative',
      isChecked: false
    },
    {
      id: 3,
      Title: 'Submitted wrong data',
      isChecked: false
    },
    {
      id: 4,
      Title: 'KYC mismatch',
      isChecked: false
    },
    {
      id: 5,
      Title: 'Others',
      isChecked: false
    },
  ]

  String.prototype.replaceAt = function (index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
  }
  const handleGoBack = useCallback(() => {
    navigation.navigate('CreateTrustCircle')
    return true; // Returning true from onBackPress denotes that we have handled the event
  }, [navigation]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleGoBack,
    );
    return () => backHandler.remove();
  }, [handleGoBack]);

  const [data, setData] = useState()

  const OnchangeNumber = (num) => {
    console.log('qqqq-----', num)
  if(num === ''){
    onChangeText(num)
      //setTccustomerlist([])
      setData([])
    }else if (!(/^[^!-\/:-@\.,[-`{-~]+$/.test(num) || num === '')) {
      
      // getTclist(num)
    }else{
      onChangeText(num)
      getCustomerLists(num)
      setModalVisible4(true)
    }
  }



  { console.log('============redux customer id ', selectedItem) }
  useEffect(() => {
    if (ModalError == true) {
      const timer = setTimeout(() => {
        setModalError(false)
        setModalReason(false)
        navigation.navigate('Profile')
        //  console.log('This will run after 1 second!', ModalVisibles)
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [ModalError])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setSelectedItem('')
      onChangeText('')
      // do something
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {

  getTCDetails(customerList)
    // getTclist()
    console.log("idbhh..", customerList,customerID)
    getCustomerLists()
  }, []);

  // ------------------ get Slot Api Call Start ------------------
  const getTCDetails = async (id) => {
    console.log("id..", id)
    const data = {
      "customerId": Number(id)
    };
    await api.getCGTDetailsTCMembers(data).then((res) => {
      console.log('------------------- CGT slot res', res?.data?.body)
      setDataSelected(res?.data?.body)

    }).catch((err) => {
      console.log('-------------------err246', err?.response)
    })
  };
  // ------------------ get slot Api Call End ------------------

  // ------------------ get Slot Api Call Start ------------------
  const getCustomerLists = async (phone) => {
    console.log('List------>>', phone)
    const data = {
      "employeeId": 1,
      "customerNameOrNumber": phone,
      "addedTcIds": [cgtCustomerDetails?.primaryCustomerId]

    };
    console.log("data of tc list",data)
    if(phone){
      setClearPop(true)
     }
    await api.getCustomerListForTc(data).then((res) => {
      console.log("api response123",res)
      const data = res?.data?.body?.filter((item, index) => !customerID.includes(item?.id))
      setTccustomerlist(data)     
      setData(data)
      setStatus(true)
    //  console.log("data length")
    }).catch((err) => {
      console.log('-------------------err123', err?.response)
      setData('')
    })
  };
  // ------------------ get slot Api Call End ------------------getCustomerList

  // ------------------ Update Activity Reject Api Call Start ------------------
  const updateActivityReject = async () => {
    const data = {
      "customerId": Number(selectedItem),
      "status": rejectReason,
      "tcMemberIds": []
    };
    await api.rejectTrustCircleMembers(data).then((res) => {
      console.log('-------------------res789', res?.data)
      if (res?.status) {
        setRejectReason()
        setModalError(true)
      }
    })
      .catch((err) => {
        console.log('-------------------err789', err?.response)
      })
  };


  //   // ------------------ Update Activity Reject Api Call End ------------------
  //   const getTclist = async (phone) => {
  //     console.log('api called confirm',cgtCustomerDetails.primaryCustomerId,customerID)
  //     const data = {
  //         "employeeId":1,
  //         "customerNameOrNumber":phone,
  //         "addedTcIds":customerID?[customerID,cgtCustomerDetails?.primaryCustomerId]:[cgtCustomerDetails?.primaryCustomerId]
  //     }
  //     console.log("data called",data)
  //     await api.getCustomerListForTc(data).then((res) => {
  //         console.log('-------------------res getCustomerListForTc', res?.data?.body)
  //         if (res?.status) {
  //         setTccustomerlist(res?.data?.body)
  //         setData(res?.data?.body)
  //         }
  //     }).catch((err) => {
  //         console.log('-------------------getCustomerListForTc', err?.response)
  //     })
  // };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container1} />
      <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={"#002B59"} />

      <Header navigation={navigation} name="Confirm Member" onPress={handleGoBack} />

      <Pressable  onPress={()=>{setClearPop(false),
          onChangeText('')
        
         }} style={styles.mainContainer}>
        <ScrollView showsVerticalScrollIndicator={false}   keyboardShouldPersistTaps={'handled'} >
          <View style={{ padding: 20, paddingTop: 2 }}>
            {!selectedItem ?
              <View style={styles.searchBox}>
                <TextInput
                  placeholder='Enter name or mobile number'
                  placeholderTextColor={"#808080"}
                  onChangeText={(text) => OnchangeNumber(text)}
                  value={text}
                  maxLength={25}
                  style={{ flex: 1, color: COLORS.colorDark, fontSize: 14, fontFamily: FONTS.FontMedium }}

                />
                <SearchIcon color={"#808080"} name="search" size={18} style={{ right: 5 }} />
              </View> : null}
            {text?.length === 0 && !selectedItem
              ?
              <>
                <Text style={styles.recentlyText}>Recently added customers</Text>
                {tccustomerlist?.map((item, index) =>
                  <>
                  
                    <TouchableOpacity onPress={() => {
                      getTCDetails(item?.id)
                      setSelectedItem(item?.id)
                    }}>
                      <Text style={styles.dataText}>{item.name}</Text>
                    </TouchableOpacity>
                    {index !== tccustomerlist?.length - 1
                      ? <View style={styles.lineView} />
                      : null
                    }
                  </>
                )}
              </>
              : null
            }
            {text.length > 0 && clearpop && !selectedItem
              ?
              <View style={{ borderWidth: 1, paddingTop: 12, paddingBottom: 15, borderColor: COLORS.colorBorder, marginTop: 10, borderRadius: 8 }}>

{console.log('{=}{=}{=}{=}{=}',data,data.length,status)}

                {data?.length == 0 && status  && <Text style={{
                  fontSize: 14,
                  fontFamily: FONTS.FontRegular,
                  color: COLORS.colorDark,
                  fontWeight: '400', paddingHorizontal: 10, paddingTop: 5
                }}>No results Found</Text>}


                { data && data?.map((item, index) =>
                  <>

                    <TouchableOpacity style={{ flexDirection: 'row', paddingHorizontal: 15 }}
                      onPress={() => {
                        onChangeText('')
                        getTCDetails(item?.id)
                        console.log("customerID", customerID)
                        setSelectedItem(item?.id)
                      }}>
                      <View style={{ flex: 1, flexDirection: 'row' }}>

                        <View style={{ flexDirection: 'column' }}>
                          <Text style={styles.nameText}>{item.name}</Text>
                          <View style={{ flexDirection: 'row' }}>
                            <View style={{ paddingTop: 5, paddingRight: 1 }}>
                              <Icon1 name="location-outline" color={"black"} />
                            </View>
                            <Text style={[styles.idText, { paddingTop: 4 }]}>{item?.pin}</Text>
                          </View>
                        </View>
                      </View>
                      <Text style={[styles.numText, { paddingLeft: 6 }]}>{item?.mobile?.replace(/^.{0}/g, '', " ").slice(-10).replaceAt(3, "X").replaceAt(4, "X").replaceAt(5, "X").replaceAt(6, "X").replaceAt(7, "X")}</Text>
                    </TouchableOpacity>

                    {index !== data?.length - 1
                      ? <View style={styles.lineView} />
                      : null
                    }
                  </>
                )}
              </View>
              : null
            }

            {dataSelected
              ?
              <SelectTab item={dataSelected} />
              : null
            }

          </View>
        </ScrollView>
        {dataSelected
          ?

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 10 }}>

            <TouchableOpacity style={[styles.buttonView, { backgroundColor: COLORS.colorLight }]}
              onPress={() => setModalReason(true)}>
              <Text style={[styles.continueText, { color: COLORS.colorB }]}>Reject</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {

              const data = [...customerList]
              data.push(dataSelected)

              const ids = [...customerID]
              ids.push(selectedItem)

              dispatch({
                type: 'SET_SELECTED_CUSTOMERLIST',
                payload: data,
              });
              dispatch({
                type: 'SET_SELECTED_CUSTOMERID',
                payload: ids,
              });
              navigation.navigate('CreateTrustCircle')
            }}
              style={[styles.buttonView, { backgroundColor: COLORS.colorB }]}>
              <Text style={[styles.continueText, { color: COLORS.colorBackground }]}>Confirm</Text>
            </TouchableOpacity>
          </View>
          : null
        }
      </Pressable>

      <ReasonModal
        onPress1={updateActivityReject}
        ModalVisible={ModalReason}
        onPressOut={() => setModalReason(!ModalReason)}
        setModalVisible={setModalReason}
        setRejectReason={setRejectReason}
        data={datas}
      />
        {/* <MemberModal
               press1={(value) => {
                onChangeText('')
                getTCDetails(value)
                setSelectedItem(value)
                setModalVisible4(false)
               }}
                Memberlist={data}
                ModalVisible={ModalVisible4}
                onPressOut={() => setModalVisible4(false)}
                setModalVisible={setModalVisible4}



            /> */}

      <ErrorModal
        ModalVisible={ModalError}
        onPressOut={() => setModalError(!ModalError)}
        setModalVisible={setModalError}
      />
    </SafeAreaProvider>
  )
}

export default ConfirmMembers;

const styles = StyleSheet.create({
  container1: {
    flex: 0,
    backgroundColor: "#002B59",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  mainContainer: {
    flex: 1,
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
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 54,
    height: 48,
    marginBottom: 20,
    width: '48%'
  },
  continueText: {
    fontSize: 14,
    fontFamily: FONTS.FontBold,
    color: COLORS.colorBackground,
    letterSpacing: 0.64
  }
})
