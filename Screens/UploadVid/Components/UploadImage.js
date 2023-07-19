import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    ActivityIndicator
} from 'react-native';
import { COLORS, FONTS } from '../../../Constants/Constants';
import ImagePicker from 'react-native-image-crop-picker';
import Icon1 from 'react-native-vector-icons/AntDesign';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import Picture from './Picture';
import { useTranslation } from 'react-i18next';
const { height, width } = Dimensions.get('screen');
import BackImage from '../../../assets/Images/10.svg';
import FrontImage from '../../../assets/Images/9.svg';
import DeleteModal from './DeleteModal';
import ModalPhoto from './ModalPhoto';
import { api } from '../../../Services/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ToastModal from '../../../Components/ToastModal';
import SizeModal from '../../HousePhoto/Components/SizeModal';
import { useSelector } from 'react-redux';
import MismatchModal from './MismatchModal';
import ImageResizer from '@bam.tech/react-native-image-resizer';  

const UploadImage = ({ navigation, id, setFrontimage, setBackimage }) => {
    const [ImagesF, setImagesF] = useState(null)
    const [ImagesB, setImagesB] = useState(null)
    const [ImagesF1, setImagesF1] = useState(null)
    const [ImagesB1, setImagesB1] = useState(null)
    const [ImagesFSet, setImagesFSet] = useState()
    const [ImagesBSet, setImagesBSet] = useState()
    const [delf, setDelf] = useState(false)
    const [delb, setDelb] = useState(false)
    const [ModalVisible2, setModalVisible2] = useState(false)
    const [title1, setTitle1] = useState('Front Image')
    const [title2, setTitle2] = useState('Back Image')
    const [title, setTitle] = useState('')
    const [Status, setStatus] = useState(false)
    const [ModalVisible, setModalVisible] = useState(false)
    const { t } = useTranslation();
    const [custID, setCustId] = useState()
    const [errorVisible, setErrorVisible] = useState(false)
    const activityId = useSelector(state => state.activityId);
    const [continueAble, setContinueAble] = useState(false)
    const [MismatchModal1, setMismatchModal1] = useState(false)
  
    const [sizemodalvisble, setsizemodalvisble] = useState(false);

    useEffect(() => {
        getData()
        getCGvoterid()
    }, [])

    const getData = async () => {
        try {
            const id = await AsyncStorage.getItem('CustomerId')
            setCustId(id)
            { console.log(id, '---------id') }
        } catch (e) {
            console.log(e)
        }
    }

    const ChooseImageFront = () => {
        //Choose Image from gallery
        ImagePicker.openPicker({
         compressImageQuality:0.4
        }).then(image => {
            console.log("IMAGE", image.path);
          //  ChooseCameraFrontcropper(image)
          if(image?.size < 100000 || image?.size > 500000){
            setsizemodalvisble(true)
        }else{
            setImagesFSet(image)
            setImagesF(image.path)
            uploadFilefront(image)
            setDelf(true) 
           setModalVisible(false)
        }
        });
    }

    const ChooseImageBack = () => {
        //Choose Image from gallery
        ImagePicker.openPicker({
            compressImageQuality:0.4

        }).then(image => {
            console.log("IMAGE", image.path);
           // ChooseCamerabackcropper(image)
           if(image?.size < 100000 || image?.size > 500000){
            setsizemodalvisble(true)
        }else{
            setImagesB(image.path)
            setImagesBSet(image)
            uploadFileback(image)
            setDelb(true)
            setModalVisible(false)
        }
        });
    }
    const ChooseCameraFront = () => {
        // Choose Image from Camera
        ImagePicker.openCamera({
            compressImageQuality:0.4

        }).then(image => {
            console.log(image);
            // ChooseCameraFrontcropper(image)
            if(image?.size < 100000 || image?.size > 500000){
                setsizemodalvisble(true)
            }else{
            setImagesF(image.path)
            setImagesFSet(image)
            uploadFilefront(image)
            setDelf(true)
            setModalVisible(false)
            }
        });
    }

    const ChooseCameraBack = () => {
        // Choose Image from Camera
        ImagePicker.openCamera({
            compressImageQuality:0.4

        }).then(image => {
            console.log(image);
            //ChooseCamerabackcropper(image)
            if(image?.size < 100000 || image?.size > 500000){
                setsizemodalvisble(true)
            }else{
            setImagesB(image.path)
            setImagesBSet(image)
            uploadFileback(image)
            setDelb(true)
            setModalVisible(false)
            }
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
            setDelf(false)
            setImagesF("")
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
            "activityId": activityId,
        }
        await api.getCGvoterid(data).then((res) => {
            console.log('-------------------res voter id CG', res?.data?.body)
            if (res?.status) {
                setImagesF(res?.data?.body?.cgFrontImage)
                setImagesF1(res?.data?.body?.cgFrontImage)
                setFrontimage(res?.data?.body?.cgFrontImage)
                setImagesB(res?.data?.body?.cgBackImage)
                setImagesB1(res?.data?.body?.cgBackImage)
                setBackimage(res?.data?.body?.cgBackImage)
                if (res?.data?.body?.cgFrontImage) {
                    setDelf(true)
                } if (res?.data?.body?.cgBackImage) {
                    setDelb(true)
                }
            }
        }).catch((err) => {
            console.log('-------------------err  voter id CG', err)
        })
    };
    // ------------------ ------------------


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
        // ------------------ HomeScreen Api Call End ------------------







    // ------------------ uploadVoter Api Call Start------------------
    async function uploadVoterID() {
        console.log('Images Fronf url', ImagesF1)
        console.log('Images back url', ImagesB1)
        setDelf(false)
        setDelb(false)
        setStatus(true)
        setContinueAble(true)
        const data = {
            "activityId": activityId,
            "cgFrontImage": ImagesF1,
            "cgBackImage": ImagesB1
        }
        await api.saveCGvoterid(data).then((res) => {
            console.log('-------------------res CG voter id upload', res)
            if (res?.status) {
                navigation.navigate('AddVehicle')
                setStatus(false)
            }
        })
            .catch((err) => {
                setStatus(false)
                setContinueAble(false)
                console.log('-------------------err CG voter id upload', err)
                if (err?.response?.data?.message === 'Could not read the details.Please upload a new image.' || err?.response?.data?.message === 'Could not verify the ID details. Please upload a new image.'
                  ) {
                    setErrorVisible(true)
                    setContinueAble(false)
                    setStatus(false)
                    setDelf(false)
                    setDelb(false)
                    setImagesF('')
                    setImagesB('')

                }else if (err?.response?.data?.message === 'This ID is already in use. Please upload a new ID.') {
                    setMismatchModal1(true)
                    setContinueAble(false)
                    setStatus(false)
                    setDelf(false)
                    setDelb(false)
                    setImagesF('')
                    setImagesB('')
                }
            })
    }
    // ------------------ uploadAdaar Api Call End ------------------

    return (
        <>
            <View style={{ flex: 1, backgroundColor: 'white' }}>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: Dimensions.get('window').height * 0.07 }}>
                    <View >
                        {delf ?
                            <View style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 11.5 }}>
                                <TouchableOpacity onPress={() => DeleteImageModal("Front Image")}  >
                                    <Icon1 name="closecircleo" color="#BDBDBD" size={25} />
                                </TouchableOpacity></View> :
                            <View style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 11.5, }}>
                                <TouchableOpacity onPress={() => DeleteImageModal("Front Image")}  >
                                    <Icon1 name="closecircleo" color="#FFFFFF" size={25} />
                                </TouchableOpacity></View>}

                        <TouchableOpacity style={{}} onPress={() => OpenModal(title1)} disabled={continueAble ? true : false}>
                            <View style={styles.View1}>
                                {ImagesF ?
                                    <View style={{ alignItems: 'center', padding: 13 }}>
                                        <Image source={{ uri: ImagesF }} style={{ width: width * 0.22, height: height * 0.12, }} />
                                    </View> :
                                    <FrontImage style={{ margin: 28, width: 99, height: 73 }} />}
                            </View>

                            <View style={styles.View2}>
                                <Text style={styles.TextFront}>{t('common:Front')}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginLeft: 16 }}>
                        {delb ?
                            <View style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: width * 0.03 }}>
                                <TouchableOpacity onPress={() => DeleteImageModal("Back Image")} >
                                    <Icon1 name="closecircleo" color="#BDBDBD" size={25} />
                                </TouchableOpacity>
                            </View> : <View style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: width * 0.03 }}>
                                <TouchableOpacity onPress={() => DeleteImageModal("Back Image")} >
                                    <Icon1 name="closecircleo" color="#FFFFFF" size={25} />
                                </TouchableOpacity>
                            </View>}
                        <TouchableOpacity style={{}} onPress={() => OpenModal(title2)} disabled={continueAble ? true : false}>

                            <View style={styles.View1}>
                                {ImagesB ?
                                    <View style={{ alignItems: 'center', padding: 13 }}>
                                        <Image source={{ uri: ImagesB }} style={{ width: width * 0.22, height: height * 0.12, }} />
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
            < View style={{ paddingBottom: 8 }}>
                {ImagesF && ImagesB ?

                    <TouchableOpacity style={styles.Button1}
                        onPress={uploadVoterID}>
                        <Text style={styles.text1}>{t('common:CONTINUE')}</Text>
                        {Status && <ActivityIndicator size={15} color={COLORS.colorBackground} />}
                    </TouchableOpacity> :
                    <TouchableOpacity style={styles.Button2} >
                        <Text style={styles.textshade}>{t('common:CONTINUE')}</Text>
                    </TouchableOpacity>
                }</View>


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
                Validation={'Could not read the details.\nPlease upload a new image.'}
                ModalVisible={errorVisible}
                onPressOut={() => setErrorVisible(!errorVisible)}
                setModalVisible={setErrorVisible}
            />

            <MismatchModal
                Validation={'This ID is already in use. Please upload a new ID.'}
                ModalVisible={MismatchModal1}
                onPressOut={() => setMismatchModal1(!MismatchModal1)}
                setModalVisible={setMismatchModal1}
            />
<SizeModal
            ModalVisible={sizemodalvisble}
            onPressOut={() => {
              setsizemodalvisble(!sizemodalvisble)
            }}
            setModalVisible={setsizemodalvisble}
          />
        </>

    )

}

const styles = StyleSheet.create({
    View1: {
        width: width * 0.4,
        height: height * 0.15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        //marginLeft:5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F2F2F2',
        // padding:20
    },
    textshade: {
        fontSize: 14,
        fontFamily: FONTS.FontBold,
        fontWeight: '700',
        color: "#979C9E"
    },
    View2: {
        backgroundColor: COLORS.colorB,
        height: 37,
        width: width * 0.4,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,

    },
    TextFront: {
        fontSize: 16,
        fontFamily: FONTS.FontSemiB,
        color: COLORS.colorBackground
    },
    ModalView1: {
        backgroundColor: COLORS.colorBackground,
        width: width * 0.92,
        // height:height/4,
        alignItems: 'center',
        //justifyContent:'space-around',
        //padding: 21,
        borderRadius: 8

    },
    text1: {
        color: COLORS.colorBackground,
        fontFamily: FONTS.FontMedium,
        fontSize: 14,
        fontWeight: '700',
        marginRight: 6
    },
    text11: {
        fontSize: 14,
        fontFamily: FONTS.FontRegular,
        color: COLORS.colorBackground,
        fontWeight: '700'
    },
    text2: {
        color: COLORS.colorB,
        fontFamily: FONTS.FontMedium,
        fontSize: 16
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
        paddingTop: 27
    },
    TextDelete: {
        fontSize: 14,
        fontFamily: FONTS.FontBold,
        color: "#3B3D43",
        paddingTop: 16
    },
    textC: {
        fontFamily: FONTS.FontRegular,
        fontWeight: 'bold',
        fontSize: 14,
        opacity: 5,
        color: COLORS.colorBackground
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
    Button1: {

        width: width * 0.87,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.colorB,
        marginTop: 30,
        borderRadius: 40,
        flexDirection: 'row',
        marginLeft: 5,
        marginRight: 5,
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
        marginTop: 30,
        borderRadius: 40,
        // marginBottom: 20,
        marginLeft: 5,
        marginRight: 5,

    },
    textshadow: {
        fontSize: 14,
        fontFamily: FONTS.FontBold,
        fontWeight: '700',
        color: "#979C9E"
    },

})
export default UploadImage;