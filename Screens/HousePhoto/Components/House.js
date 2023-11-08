import {
  StyleSheet,
  Text,
  View,
  BackHandler,
  StatusBar,
  SafeAreaView,
  Platform,
  TextInput,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useState, useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Statusbar from '../../../Components/StatusBar';
import {useFocusEffect} from '@react-navigation/native';
import Header from '../../../Components/RepayHeader';
import {FONTS, COLORS} from '../../../Constants/Constants';
import {useDispatch} from 'react-redux';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';
import Search from 'react-native-vector-icons/Feather';
import Media from '../../../assets/image/house.svg';
import Media1 from '../../../assets/image/Media2.svg';
const {height, width} = Dimensions.get('screen');
import DeleteModal from './DeleteModal';
import ImagePicker from 'react-native-image-crop-picker';
import Image2 from '../../../assets/Images/cakes.svg';
import {api} from '../../../Services/Api';
import {useSelector} from 'react-redux';
import SizeModal from './SizeModal.js';
import Retryuploadimage from './Retryuploadimage';
import Geolocation from '@react-native-community/geolocation';

const DetailChecks = ({navigation, setState, setImagedata1, imagedata}) => {
  const isDarkMode = true;
  const [text, onChangeText] = useState('');
  const activityId = useSelector(state => state.activityId);
  const [ModalVisible2, setModalVisible2] = useState(false);
  const [sizemodalvisble, setsizemodalvisble] = useState(false);
  const [checked, setChecked] = useState(false);
  const toggleCheckbox = () => setChecked(!checked);
  const [Image1, setImage] = useState('');
  const [imageurlfrontfailederror, setimageurlfrontfailederror] = useState(false);
  const [status, setStatus] = useState(false);
  const [UploadStatus, setUploadStatus] = useState(false);
  const [NameStatus, setNamestatus] = useState(false);
  const [urlimagefailed, seturlimagefailed] = useState(false);
  const [delf, setDelf] = useState(false);
  const {height, width} = Dimensions.get('screen');
  const [latitudevalue,setlatitudevalue] = useState('')
  const [longitudevalue,setlongitudevalue] = useState('')

  useEffect(() => {
    getHousePhoto();
  }, []);


  useEffect(()=>{
    Geolocation.getCurrentPosition(info =>{ console.log('geolocation',info?.coords)
    setlatitudevalue(info?.coords?.latitude)
    setlongitudevalue(info?.coords?.longitude)
      }
    );
  },[])

  // ------------------get residence owner detail ------------------

  const getHousePhoto = async () => {
    console.log('api called');

    const data = {
      activityId: Number(activityId),
    };
    await api
      .getHousePhoto(data)
      .then(res => {
        console.log('-------------------get house photo', res?.data?.body);
        if (res?.data?.body) {
          console.log('555');
         // setImage(res?.data?.body);
          setImagedata1(res?.data?.body);
          setDelf(true);
        }
      })
      .catch(err => {
        console.log('-------------------err get house', err?.response);
      });
  };
  // ------------------ ------------------

  // ------------------save and update residence owner detail ------------------

  const saveHousePhoto = async () => {
    console.log('saveHousePhoto   api called', Image1,'[][][][][][][][][]',imagedata);

    const data = {
      activityId: Number(activityId),
      housePhotoUrl: imagedata,
       latitude: latitudevalue,
       longitude: longitudevalue
    };
    await api
      .saveHousePhoto(data)
      .then(res => {
        console.log('-------------------res  update house photo', res);
        if (res?.status) {
          navigation.navigate('DLECompleted');
        }
      })
      .catch(err => {
        console.log(
          '-------------------err  update House photo',
          err?.response,
        );
       
        setImage('');
        setImagedata1('');
        setStatus(false);
        setDelf(false);
      });
  };
  // ------------------ ------------------

  const DeleteHousePhoto = async () => {
    const data = {
      activityId: Number(activityId),
    };
    await api
      .DeleteHousePhoto(data)
      .then(res => {
        console.log('-------------------res  delete house photo', res);
        setImagedata1();
      })
      .catch(err => {
        console.log('-------------------res  delete house photo', res);
      });
  };

  const UploadImage = () => {
    ImagePicker.openCamera({
      width: width,
      height: height,
      hideBottomControls: true,
      freeStyleCropEnabled: true,
      cropping: true,
    }).then(image => {
      console.log('IMAGE', image);
      if (image?.size < 100000) {
        setsizemodalvisble(true);
      } else {
        setImage(image.path);
        setStatus(true);
        setUploadStatus(false);
        setDelf(true);
        uploadFile(image.path, image);
      }
    });
  };

  const DeleteImageModal = () => {
    setModalVisible2(true);
  };

  const DeleteImage = () => {
    DeleteHousePhoto();
    setModalVisible2(false);
    setDelf(false);
    setImage('');
    setImagedata1(null);
  };

  async function uploadFile(imagevalue, image) {
    console.log('api called frm', imagevalue);
    let data = new FormData();
    data.append('multipartFile', {
      name: 'aaa.jpg',
      type: 'image/jpeg',
      uri: imagevalue,
    });

    await api
      .uploadFile(data)
      .then(res => {
        console.log('-------------------res uploadFile file upload', res);
        if (res?.status) {
          setImagedata1(res?.data[0]?.body);
          setStatus(false);
          setimageurlfrontfailederror(false)
        }
      })
      .catch(err => {
        console.log(
          '-------------------err file upload',
          err?.response?.data?.message,
        );
        if (err?.response?.data?.message == 'Maximum upload size exceeded') {
          setsizemodalvisble(true);
        
          setImage('');
          setImagedata1('');
          setStatus(false);
          setDelf(false);
        }
        console.log('image type', imagevalue);
          setTimeout(() => {
            uploadFileRetry(Image1)
          }, 1000);
      });
  }


  async function uploadFileRetry(imagevalue, image) {
    console.log('api called frm', imagevalue);
    let data = new FormData();
    data.append('multipartFile', {
      name: 'aaa.jpg',
      type: 'image/jpeg',
      uri: imagevalue,
    });

    await api
      .uploadFile(data)
      .then(res => {
        console.log('-------------------res uploadFile file upload', res);
        if (res?.status) {
          setImagedata1(res?.data[0]?.body);
          setStatus(false);
          setimageurlfrontfailederror(false)
        }
      })
      .catch(err => {
        console.log(
          '-------------------err file upload',
          err?.response?.data?.message,
        );
        if (err?.response?.data?.message == 'Maximum upload size exceeded') {
          setsizemodalvisble(true);
        
          setImage('');
          setImagedata1('');
          setStatus(false);
          setDelf(false);
        }
        console.log('image type', imagevalue);
        setimageurlfrontfailederror(true)
          setStatus(false);
          setImage('');
          setImagedata1('');
          setStatus(false);
          setDelf(false);
        

      
      });
  }
  // ------------------ HomeScreen Api Call End ------------------
  return (
    <View style={styles.mainContainer}>
      <ScrollView>
        <TouchableOpacity
          style={styles.UploadCard}
          onPress={() => {
            UploadImage();
          }}>
          <View
            style={{
              alignItems: 'flex-start',
              flex: 1,
              marginLeft: 25,
              marginRight: 35,
            }}>
            <Media width={30} height={30} />
          </View>
          <View style={styles.Line} />
          <View style={{flexDirection: 'column', left: -20}}>
            <Text
              style={[
                styles.UploadText,
                {color: NameStatus ? '#1A051D' : '#808080'},
              ]}>
              Take photo
            </Text>
            <Text style={styles.Prooftext}>Take photo of the house</Text>
          </View>

          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Icon2
              name="chevron-right"
              size={18}
              color={'#808080'}
              style={{marginRight: 15}}
            />
          </View>
        </TouchableOpacity>

        {console.log('6666', delf)}
        {delf ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: 11.5,
            }}>
            <TouchableOpacity onPress={() => DeleteImageModal()}>
              <Icon1 name="closecircleo" color="#BDBDBD" size={25} />
            </TouchableOpacity>
          </View>
        ) : null}

        <View style={[Image1 ? styles.ViewH : {}]}>
          <View style={{alignItems: 'center', flex: 0}}>
            {status ? (
              <ActivityIndicator size={30} color={COLORS.DarkBlue} />
            ) : (
              <Image
                source={{uri: Image1 ? Image1 : imagedata}}
                style={{
                  width: width * 0.65,
                  height: width * 0.5,
                  borderRadius: 2,
                }}
                // source={{ uri: imagedata ? imagedata : null }} style={{ width: width * 0.65, height: width * 0.5, borderRadius: 2 }}
                resizeMode="cover"
              />
            )}
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          onPress={() => (imagedata ? saveHousePhoto() : console.log('helo'))}
          style={[
            styles.Button1,
            {
              backgroundColor: imagedata
                ? COLORS.colorB
                : 'rgba(224, 224, 224, 1)',
            },
          ]}>
          <Text
            style={[
              styles.text1,
              {color: Image1 ? COLORS.colorBackground : '#979C9E'},
            ]}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
      <DeleteModal
        ModalVisible={ModalVisible2}
        navigation={navigation}
        DeleteImage={DeleteImage}
        onPressOut={() => setModalVisible2(!ModalVisible2)}
        setModalVisible2={setModalVisible2}
      />

      <SizeModal
        ModalVisible={sizemodalvisble}
        onPressOut={() => {
          setsizemodalvisble(!sizemodalvisble);
        }}
        setModalVisible={setsizemodalvisble}
      />
        <Retryuploadimage
            ModalVisible={imageurlfrontfailederror}
            onPressOut={() => {
              setimageurlfrontfailederror(!imageurlfrontfailederror)
            }}
            setModalVisible={setimageurlfrontfailederror}
          />
    </View>
  );
};

export default DetailChecks;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // justifyContent:'center',
    //  alignItems:'center'
  },
  ViewH: {
    backgroundColor: 'rgba(224, 224, 224, 0.3)',
    width: width * 0.88,
    left: 2,
    height: width * 0.58,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  proof: {
    color: 'rgba(59, 61, 67, 1)',
    fontFamily: FONTS.FontRegular,
    fontSize: 12,
  },
  SelectBox: {
    backgroundColor: '#FCFCFC',
    borderRadius: 8,
    borderWidth: 1,
    width: width * 0.89,
    height: width * 0.12,
    borderColor: 'rgba(236, 235, 237, 1)',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: width * 0.02,
    marginBottom: width * 0.02,
  },
  textSelect: {
    fontSize: 14,
    color: 'rgba(128, 128, 128, 1)',
    fontFamily: FONTS.FontRegular,
    marginLeft: 10,
  },
  Button1: {
    width: width * 0.87,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.colorB,
    marginTop: 31,
    marginLeft: 12,
    marginRight: 12,
    borderRadius: 40,
    marginBottom: 0,
  },
  text1: {
    fontFamily: FONTS.FontBold,
    fontSize: 14,
    fontWeight: '700',
  },
  UploadCard: {
    width: width * 0.88,
    height: width * 0.22,
    marginLeft: 2,
    marginRight: 5,
    backgroundColor: '#FCFCFC',
    //backgroundColor: 'pink',
    elevation: 1,
    shadowColor: '#000000',
    alignItems: 'center',
    //justifyContent:'space-around',
    borderRadius: 6,
    flexDirection: 'row',
    marginTop: width * 0.02,
    marginBottom: width * 0.05,
  },
  NAMEFont: {
    color: 'rgba(26, 5, 29, 1)',
    fontSize: 14,
    fontFamily: FONTS.FontSemiB,
  },
  circleStyle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleText: {
    fontSize: 18,
    fontFamily: FONTS.FontSemiB,
    color: COLORS.colorBackground,
    fontWeight: '600',
  },
  subText: {
    fontSize: 12,
    fontFamily: FONTS.FontRegular,
    color: COLORS.colorDark,
    paddingTop: 3,
  },
  UploadText: {
    fontSize: 14,
    fontFamily: FONTS.FontSemiB,
    color: '#1A051D',
  },
  Prooftext: {
    color: 'rgba(128, 128, 128, 1)',
    fontFamily: FONTS.FontRegular,
    fontSize: 12,
    marginLeft: 0,
  },
  Line: {
    borderWidth: 0.3,
    height: 80,
    borderColor: '#F2F2F2',
    left: -38,
  },
  cardView2: {
    backgroundColor: COLORS.colorBackground,
    width: width * 0.9,
    height: width * 0.2,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: width * 0.03,
    borderColor: 'rgba(236, 235, 237, 1)',
    flexDirection: 'row',
  },
  containerBox: {
    marginTop: 12,
    flexDirection: 'row',
    backgroundColor: COLORS.colorBackground,
    shadowColor: 'rgba(0, 0, 0, 0.4)',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    elevation: 5,
    shadowRadius: 7,
    borderRadius: 8,
    marginRight: 15,
    marginLeft: 2,
    alignItems: 'center',
    marginBottom: 14,
    width: width * 0.88,
    height: width * 0.18,
  },
  circleView: {
    width: 40,
    height: 40,
    backgroundColor: '#CE748F',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
  },
  shortText: {
    fontSize: 18,
    fontFamily: FONTS.FontSemiB,
    color: COLORS.colorBackground,
  },
  nameText: {
    fontSize: 14,
    fontFamily: FONTS.FontSemiB,
    color: COLORS.colorDark,
  },
  underText: {
    fontSize: 12,
    fontFamily: FONTS.FontRegular,
    color: COLORS.colorDark,
  },
  dateText: {
    fontSize: 12,
    fontFamily: FONTS.FontRegular,
    color: COLORS.colorDark,
    marginRight: 12,
    marginLeft: 5,
  },
  TextInputBranch: {
    color: '#1A051D',
    fontSize: 12,
    fontFamily: FONTS.FontRegular,
    paddingLeft: width * 0.02,
    width: width * 0.78,
    height: width * 0.08,
  },
});
