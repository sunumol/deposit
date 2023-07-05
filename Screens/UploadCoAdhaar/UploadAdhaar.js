import React, { useState, useEffect,useCallback } from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    StatusBar,
    ActivityIndicator,
    BackHandler
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ImagePicker from 'react-native-image-crop-picker';
import Icon1 from 'react-native-vector-icons/AntDesign';
// import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from '@react-navigation/native';

// ------------ Components Imports -----------------------
import { COLORS, FONTS } from '../../Constants/Constants';
import Statusbar from '../../Components/StatusBar';
import Header from '../../Components/Header';
import Picture from './Components/Picture';
import DeleteModal from './Components/DeleteModal';
import ModalPhoto from './Components/ModalPhoto';
import { api } from '../../Services/Api';
import ToastModal from '../../Components/ToastModal';
import ModalSave from '../../Components/ModalSave';
import ImageResizer from '@bam.tech/react-native-image-resizer';  
import SizeModal from '../HousePhoto/Components/SizeModal';
// ------------ Image Imports ---------------------
import BackImage from '../../assets/Images/10.svg';
import FrontImage from '../../assets/Images/9.svg';
import { useSelector } from 'react-redux';
const { height, width } = Dimensions.get('screen');

const UploadAdhaar = ({ navigation }) => {

    const isDarkMode = true
    const { t } = useTranslation();

    const [ImagesF, setImagesF] = useState(null)
    const [ImagesB, setImagesB] = useState(null)
    const [ImagesF1, setImagesF1] = useState(null)
    const [ImagesB1, setImagesB1] = useState(null)
    const [ImagesFSet, setImagesFSet] = useState()
    const [ImagesBSet, setImagesBSet] = useState()
    const [title1, setTitle1] = useState('Front Image')
    const [title2, setTitle2] = useState('Back Image')
    const [title, setTitle] = useState('')
    const [custID, setCustId] = useState()
    const activityId = useSelector(state => state.activityId);
    const [delf, setDelf] = useState(false)
    const [delb, setDelb] = useState(false)
    const [ModalVisible, setModalVisible] = useState(false)
    const [ModalVisible2, setModalVisible2] = useState(false)
    const [Status, setStatus] = useState(false)
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [errorVisible, setErrorVisible] = useState(false)
    const [modalExitAppVisible, setModalExitAppVisible] = useState(false);
    const [TermStatus, setTermStatus] = useState(false)
    const [continueAble, setContinueAble] = useState(false)
    const [SaveModal,setModalsave] = useState(false)
    const [frontimage, setFrontimage] = useState('')
    const [backimage, setBackimage] = useState('')
    const [sizemodalvisble, setsizemodalvisble] = useState(false);

    useEffect(() => {
        getData()
        getCGvoterid()
    }, [])

    const getData = async () => {
        try {
            const id = await AsyncStorage.getItem('CustomerId')
          //  setCustId(id)
            const NumberCustId = Number(id)
            setCustId(NumberCustId)
        } catch (e) {
            console.log(e)
        }
    }

    const handleGoBack = useCallback(() => {

        // navigation.goBack()
        setModalsave(true)
        return true; // Returning true from onBackPress denotes that we have handled the event
      }, [navigation]);
    
      useFocusEffect(
        React.useCallback(() => {
          BackHandler.addEventListener('hardwareBackPress', handleGoBack);
    
          return () =>
    
            BackHandler.removeEventListener('hardwareBackPress', handleGoBack);
        }, [handleGoBack]),
      );
    
    

    const ChooseImageFront = () => {

        //Choose Image from gallery
        ImagePicker.openPicker({
            width: width,
            height:  (width * 3) / 5,
            hideBottomControls:true,
            freeStyleCropEnabled:true,
            cropping: true,
        }).then(image => {
            console.log("IMAGE", image);
            ChooseCameraFrontcropper(image)
            // setImagesFSet(image)
            // setImagesF(image.path)
            // uploadFilefront(image)
            // setModalVisible(false)
            // setDelf(true)
        });
    }

    const ChooseImageBack = () => {
        //Choose Image from gallery
        ImagePicker.openPicker({
            width: width,
            height:  (width * 3) / 5,
            hideBottomControls:true,
            freeStyleCropEnabled:true,
            cropping: true,
        }).then(image => {
            console.log("IMAGE", image);
            ChooseCamerabackcropper(image)
            // setImagesB(image.path)
            // setImagesBSet(image)
            // uploadFileback(image)
            // setModalVisible(false)
            // setDelb(true)
        });
    }
    const ChooseCameraFront = () => {
        
        // Choose Image from Camera
        ImagePicker.openCamera({
            width: width,
            height:  (width * 3) / 5,
            hideBottomControls:true,
            freeStyleCropEnabled:true,
            cropping: true,
            disableCropperColorSetters:true,
            cropperStatusBarColor: 'blue',
      cropperToolbarColor: 'blue',
      cropperActiveWidgetColor: 'blue',
      cropperToolbarWidgetColor: '#3498DB',
        }).then(image => {
            console.log(image);
           // navigation.navigate('CropImage', {details: image?.path})
            ChooseCameraFrontcropper(image)
            // setImagesF(image.path)
            // setImagesFSet(image)
            // uploadFilefront(image)
            // setModalVisible(false)
            // setDelf(true)
        });
    }

    const ChooseCameraBack = () => {
        // Choose Image from Camera
        ImagePicker.openCamera({
            width: width,
            height:  (width * 3) / 5,
            hideBottomControls:true,
            freeStyleCropEnabled:true,
            cropping: true,
        }).then(image => {
            console.log(image);
            ChooseCamerabackcropper(image)
            // setImagesB(image.path)
            // setImagesBSet(image)
            // uploadFileback(image)
            // setModalVisible(false)
            // setDelb(true)
        });
    }



    const ChooseCameraFrontcropper = (value) => {

        ImageResizer.createResizedImage(
            value.path,
            700,
            1280,
            'JPEG',
            100,
             0,
             undefined,
             false,
        )
            .then((response) => {
            console.log('IMAGE1 1=========>>',response);
            if(response?.size < 100000){
                setsizemodalvisble(true)
            }else{
            //setImagesF(response.uri)
            setImagesFSet(response)
            uploadFilefront(response.uri)
            setModalVisible(false)
             setDelf(true)
            }
              // response.uri is the URI of the new image that can now be displayed, uploaded...
              // response.path is the path of the new image
              // response.name is the name of the new image with the extension
              // response.size is the size of the new image
            })
            .catch((err) => {
                console.log('IMAGE1 err=========>>',err);
              // Oops, something went wrong. Check that the filename is correct and
              // inspect err to get more details.
            });
    
    }

    const ChooseCamerabackcropper = (value) => {

        ImageResizer.createResizedImage(
            value.path,
            700,
            1280,
            'JPEG',
            100,
             0,
             undefined,
             false,
        )
            .then((response) => {
                console.log('IMAGE1=========>>',response);
                if(response?.size < 100000){
                    setsizemodalvisble(true)
                }else{
               // setImagesB(response.uri)
                setImagesBSet(response)
                uploadFileback(response.uri)
                setModalVisible(false)
                setDelb(true)
                }
              // response.uri is the URI of the new image that can now be displayed, uploaded...
              // response.path is the path of the new image
              // response.name is the name of the new image with the extension
              // response.size is the size of the new image
            })
            .catch((err) => {
                console.log('IMAGE1=========>>',err);
              // Oops, something went wrong. Check that the filename is correct and
              // inspect err to get more details.
            });
       
    }

    const OpenModal = (title) => {
        console.log("tilt...", title)
        setTitle(title)
        setModalVisible(true)

    }
    const DeleteImage = () => {
        console.log("title....", title)
        if (title == "Front Image") {
            setModalVisible2(false)

            setImagesF("")
            setDelf(false)
        } else {
            setModalVisible2(false)
            setImagesB("")
            setDelb(false)
            console.log("image backs", ImagesB)
        }
    }

    const CameraOpen = () => {
        if (title == "Front Image") {
            ChooseCameraFront()
        } else {
            ChooseCameraBack()
        }
    }

    const GalleryOpen = () => {
        if (title == "Front Image") {
            ChooseImageFront()
        } else {
            ChooseImageBack()
            console.log("image back")
        }
    }

    const DeleteImageModal = (title) => {
        setTitle(title)
        setModalVisible2(true)

    }

    // ------------------get Cg voter id detail ------------------
    const getCGvoterid = async (mobnumber) => {
        console.log('api called')
  
        const data = {
          "activityId":activityId,        
      }
        await api.getCoappAdhaar(data).then((res) => {
            console.log('-------------------res voter id CG', res?.data?.body)
            if (res?.status) {
                setImagesF(res?.data?.body?.cgFrontImage)
                setImagesF1(res?.data?.body?.cgFrontImage)
                setFrontimage(res?.data?.body?.cgFrontImage)
                setImagesB(res?.data?.body?.cgBackImage)
                setImagesB1(res?.data?.body?.cgBackImage)
                setBackimage(res?.data?.body?.cgBackImage)
                if(res?.data?.body?.cgFrontImage){
                    setDelf(true) 
                }if(res?.data?.body?.cgBackImage){
                    setDelb(true)
                } 
            }
        }).catch((err) => {
            console.log('-------------------err  voter id CG', err)
        })
    };


    async function uploadFilefront(imagevalue) {
        console.log('api called front',imagevalue)
        let data = new FormData();
        data.append('multipartFile', {
            name: 'aaa.jpg',
            type: 'image/jpeg',
            uri: imagevalue
        })

        await api.uploadFile(data).then((res) => {
            console.log('-------------------res voter upload front', res?.data[0]?.body)
            if (res?.status) {
                setImagesF1(res?.data[0]?.body)
                setImagesF(res?.data[0].body)
                setFrontimage(res?.data[0]?.body)
            }
        }).catch((err) => {
            console.log('-------------------err voter upload back', err)
        })
    };




    async function uploadFileback(imagevalue) {
        console.log('api called back',imagevalue)
        let data = new FormData();
        data.append('multipartFile', {
            name: 'aaa.jpg',
            type: 'image/jpeg',
            uri: imagevalue
        })

        await api.uploadFile(data).then((res) => {
            console.log('-------------------res voter upload back', res?.data[0]?.body)
            if (res?.status) {
                setImagesB1(res?.data[0]?.body)
                setImagesB(res?.data[0]?.body)
                setBackimage(res?.data[0]?.body)
            }
        }).catch((err) => {
            console.log('-------------------err voter upload back', err)
        })
    };
  // ------------------ uploadVoter Api Call Start------------------
  async function uploadAdhaar() {
 
    setDelf(false)
    setDelb(false)
    setStatus(true)
    setContinueAble(true)
    const data = {
        "activityId":activityId,
        "cgFrontImage": ImagesF1,
        "cgBackImage":  ImagesB1     
    }
    console.log("data save",data)
    await api.SaveCoappAdhaar(data).then((res) => {
        console.log('-------------------res CG voter id upload', res)
        if (res?.status) {
           navigation.navigate('UploadVid')
            setStatus(false)
        }
    })
        .catch((err) => {
            setStatus(false)
            setContinueAble(false)
            console.log('-------------------err CG voter id upload', err?.response)
            if (err?.response?.data?.message === 'Could not read the details.Please upload a new image.' || err?.response?.data?.message === 'Could not verify the ID details. Please upload a new image.'
                || err?.response?.status == 400) {
                setErrorVisible(true)
                setContinueAble(false)
                setStatus(false)
                setDelf(false)
                setDelb(false)
                setImagesF('')
                setImagesB('')

            }
        })
}
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container1} />
            <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor="#002B59" />

            <Header navigation={navigation} name={'Upload Your Aadhaar'} onPress={handleGoBack}/>


            <View style={{ flex: 1, backgroundColor: 'white' }}>
                {/* <View style={{ backgroundColor: 'white', marginTop: 20 }}>

                    <Text style={[styles.textSp, { textAlign: 'center' }]}>Please capture your spouse's Aadhaar</Text>
                    <Text style={[styles.textSp, { textAlign: 'center' }]}>to know your eligibility</Text>

                </View> */}
                <View style={styles.MainView}>
                    <View >
                        {delf ?
                            <View style={styles.CloseView}>
                                <TouchableOpacity onPress={() => DeleteImageModal("Front Image")}  >
                                    <Icon1 name="closecircleo" color="#BDBDBD" size={25} />
                                </TouchableOpacity></View> :
                            <View style={styles.CloseView1}>
                                <TouchableOpacity onPress={() => DeleteImageModal("Front Image")}  >
                                </TouchableOpacity></View>}
                        <TouchableOpacity onPress={() => OpenModal(title1)}
                            style={{

                            }}
                            disabled={continueAble ? true : false}>
                            <View style={styles.View1}>
                                {ImagesF ?
                                    <View style={{ alignItems: 'center', padding: 13 }}>
                                        <Image
                                            source={{ uri: ImagesF }}
                                            style={{ width: width * 0.35, height: height * 0.1, }}
                                        />
                                    </View> :
                                    <FrontImage

                                        style={{ margin: 28, width: 99, height: 73 }}

                                    />

                                }
                            </View>
                            <View style={styles.View2}>

                                <Text style={styles.TextFront}>{t('common:Front')}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginLeft: width * 0.03 }}>
                        {delb ?
                            <View style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: width * 0.03 }}>
                                <TouchableOpacity onPress={() => DeleteImageModal("Back Image")} >
                                    <Icon1 name="closecircleo" color="#BDBDBD" size={25} />
                                </TouchableOpacity>
                            </View> : <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                                <TouchableOpacity onPress={() => DeleteImageModal("Back Image")} style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 11.5, paddingTop: 25 }}>

                                </TouchableOpacity>
                            </View>}
                        <TouchableOpacity style={{}} onPress={() => OpenModal(title2)} disabled={continueAble ? true : false}>

                            <View style={styles.View1}>
                                {ImagesB ?
                                    <View style={{ alignItems: 'center', padding: 13 }}>
                                        <Image source={{ uri: ImagesB }} style={{ width: width * 0.34, height: height * 0.1, }} />
                                    </View> :
                                    <BackImage

                                        style={{ margin: 28, width: 99, height: 73 }} />
                                }
                            </View>
                            <View style={styles.View2}>
                                <Text style={styles.TextFront}>{t('common:Back')}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ alignItems: 'center', }}>
                    <Picture />
                </View>

            </View>
       

            <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.colorBackground, paddingBottom: 10 }}>
                {ImagesF && ImagesB  ?
                    <TouchableOpacity style={styles.Button1} onPress={uploadAdhaar}>
                        <Text style={styles.text1}>{t('common:CONTINUE')}</Text>
                        {Status && <ActivityIndicator size={15} color={COLORS.colorBackground} />}
                    </TouchableOpacity> :
                    <TouchableOpacity style={styles.Button2} >
                        <Text style={styles.textshade}>{t('common:CONTINUE')}</Text>
                    </TouchableOpacity>
                }
            </View>

            <DeleteModal
                ModalVisible={ModalVisible2}
                navigation={navigation}
                DeleteImage={DeleteImage}
                onPressOut={() => setModalVisible2(!ModalVisible2)}
                setModalVisible2={setModalVisible2} />

            <ModalPhoto
                ModalVisible={ModalVisible}
                navigation={navigation}
                CameraOpen={CameraOpen}
                GalleryOpen={GalleryOpen}
                onPressOut={() => setModalVisible(!ModalVisible)}
                setModalVisible2={setModalVisible} />
            <ToastModal
                Validation={t('common:AdharToast')}
                ModalVisible={errorVisible}
                onPressOut={() => setErrorVisible(!errorVisible)}
                setModalVisible={setErrorVisible}
            />
        <ModalSave
        Press={() => {
          setModalsave(false),
            setModalReason(true)

        }}
        Press1={() => { uploadVoterID(), setModalsave(false) }}
        ModalVisible={SaveModal}
        setModalVisible={setModalsave}
        onPressOut={() => {
          setModalsave(false)


        }}
        navigation={navigation} />


<SizeModal
            ModalVisible={sizemodalvisble}
            onPressOut={() => {
              setsizemodalvisble(!sizemodalvisble)
            }}
            setModalVisible={setsizemodalvisble}
          />
        

        </SafeAreaProvider>
    )
}

export default UploadAdhaar;

const styles = StyleSheet.create({
    container1: {
        flex: 0,
        backgroundColor: "#002B59",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    MainView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Dimensions.get('window').width * 0.07
    },
    CloseView: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 11.5,
    },
    CloseView1: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 11.5,
        paddingTop: 25,
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.colorBackground,
        paddingVertical: Dimensions.get('window').height * 0.05,
    },
    TextFront: {
        fontSize: 16,
        fontFamily: FONTS.FontSemiB,
        color: COLORS.colorBackground
    },
    View1: {
        backgroundColor: "#F2F2F2",
        width: width * 0.43,
        height: height * 0.15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ViewCard: {
        backgroundColor: "#82828",
        width: 113,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#828282",
        height: 72
    },
    View2: {
        backgroundColor: COLORS.colorB,
        height: 37,
        width: width * 0.43,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
    },
    Button1: {
        width: width * 0.87,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.colorB,
        marginTop: 15,
        borderRadius: 40,
        flexDirection: 'row',
        bottom: 10,
        shadowColor: COLORS.colorB,
        shadowOffset: { width: 0, height: 7 },
        shadowOpacity: 0.2,
        elevation: 5,
        shadowRadius: 1,
    },
    Button2: {
        width: width * 0.87,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#E0E0E0",
        marginTop: 10,
        borderRadius: 40,
        marginBottom: 5,
    },
    text1: {
        fontSize: 14,
        fontFamily: FONTS.FontRegular,
        color: COLORS.colorBackground,
        fontWeight: 'bold'
    },
    text2: {
        fontSize: 14,
        fontFamily: FONTS.FontBold,
        color: "#979C9E",
    },
    textshade: {
        fontSize: 14,
        fontFamily: FONTS.FontBold,
        fontWeight: 'bold',
        color: "#979C9E"
    },
    View4: {
        backgroundColor: "#E0E0E0",
        width: 113,
        height: 72,
        borderRadius: 4,
        marginLeft: 14,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ModalView: {
        backgroundColor: COLORS.colorBackground,
        width: width,
        marginTop: 'auto',
        height: height * 0.18,
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 12
    },

    ButtonPic1: {
        backgroundColor: COLORS.colorB,
        width: width * 0.87,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 48
    },
    ButtonPic2: {
        width: width * 0.87,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.colorLight,
        borderRadius: 48
    },
    text1: {
        color: COLORS.colorBackground,
        fontFamily: FONTS.FontMedium,
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 7
    },
    text2: {
        color: COLORS.colorB,
        fontFamily: FONTS.FontMedium,
        fontSize: 16
    },
    ModalView1: {
        backgroundColor: COLORS.colorBackground,
        width: width * 0.92,
        alignItems: 'center',
        padding: 21,
        borderRadius: 8
    },
    textC: {
        fontFamily: FONTS.FontRegular,
        fontWeight: 'bold',
        fontSize: 14,
        color: COLORS.colorBackground
    },
    ButtonCancel: {
        width: 138,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.colorLight,
        borderRadius: 48,
    },
    ButtonContinue: {
        backgroundColor: COLORS.colorB,
        width: 138,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 48,
    },
    TextDelete1: {
        fontSize: 16,
        fontFamily: FONTS.FontRegular,
        fontWeight: '400',
        color: "#3B3D43",
        paddingTop: 14
    },
    TextDelete: {
        fontSize: 14,
        fontFamily: FONTS.FontBold,
        color: "#3B3D43",
        paddingTop: 16
    },
    acceptTextStyle: {
        fontFamily: FONTS.FontRegular,
        fontWeight: '400',
        color: '#3B3D43',
        fontSize: 12,
        letterSpacing: 0.01,
        //flex: 1,
        //paddingTop: 5
    },
    termsStyle: {
        color: COLORS.colorB,
        fontFamily: FONTS.FontRegular,
        fontWeight: '700',
        letterSpacing: 0.01,
        fontSize: 12,
        borderBottomWidth: 0.8,
        borderStyle: 'dashed',
        borderColor: COLORS.colorB,
    },
    textSp: {
        color: "#333333",
        fontSize: 12,
        fontFamily: FONTS.FontRegular
    },

})