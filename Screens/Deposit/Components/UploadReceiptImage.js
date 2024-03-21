import React, { useState } from 'react';
import { View, Pressable, StyleSheet, Dimensions, Image, Text, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import AddRecipt from '../assets/icons/AddRecipt.svg';
import Arrow from '../assets/icons/Arrow.svg';
import { api } from '../../../Services/Api';

const { height, width } = Dimensions.get('screen');

const UploadReceiptImage = ({ thumbnailUri, setThumbnailUri, handleApiResponse }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    // const[isResponseImage, setIsResponseImage]=useState(null);

    const handleUploadImage = () => {
        setIsModalVisible(true);
    };

    const generateUUID = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };


    const handleOpenCamera = async () => {
        setIsModalVisible(false);
        try {
            const image = await ImagePicker.openCamera({
                width: width * 1.2,
                height: height * 0.7,
                cropping: true,
            });

            // setThumbnailUri(image.path);

            const formData = new FormData();
            const imageName = generateUUID();
            formData.append('image', {
                uri: image.path,
                type: 'image/jpeg',
                name: `${imageName}.jpg`,
            });
            const response = await api.uploadImageToS3AndGetURL(formData).then((res) => {
                console.log('------------------res file upload', res);
                if (res?.status) {
                    setThumbnailUri(res?.data[0]?.body);
                }
            }).catch((err) => {
                console.log('-------------------err file upload', err);
                //  uploadFileRetry(Imagefile)
            });
            console.log('Image uploaded:', response);
            // handleApiResponse(response);
        } catch (error) {
            console.log('Image picker error:', error);
            // if (error.code !== 'E_PICKER_CANCELLED') {
            //     Alert.alert('Error', 'Failed to pick an image. Please try again later.');
            // }
        }
    };
    
    const handleOpenGallery = async () => {
        setIsModalVisible(false);
        try {
            const image = await ImagePicker.openPicker({
                width: width * 1.2,
                height: height * 0.7,
                cropping: true,
                multiple: false,
                mediaType: 'photo',
            });

            // setThumbnailUri(image.path);

            const formData = new FormData();
            const imageName = generateUUID();
            formData.append('image', {
                uri: image.path,
                type: 'image/jpeg',
                name: `${imageName}.jpg`,
            });

            const response = await api.uploadImageToS3AndGetURL(formData).then((res) => {
                console.log('-------------------res file upload', res);
                if (res?.status) {
                    setThumbnailUri(res?.data[0]?.body);
                }
            }).catch((err) => {
                console.log('-------------------err file upload', err);
                //  uploadFileRetry(Imagefile)
            });
        } catch (error) {
            console.log('Image picker error:', error);
            // if (error.code !== 'E_PICKER_CANCELLED') {
            //     Alert.alert('Error', 'Failed to pick an image. Please try again later.');
            // }
        }
    };
    
    return (
        <View style={styles.container}>
            <Pressable style={styles.UploadCard} onPress={handleUploadImage}>
                {!thumbnailUri ? (
                    <View style={styles.UploadBtnIcon}>
                        <View >
                            <AddRecipt />
                        </View>
                    </View>
                ) : (
                    <View style={styles.UploadBtnIcon}>
                        <Image source={{ uri: thumbnailUri }}
                            style={{ width: 50, height: 65,left:-13.5, borderRadius: 6, zIndex: 0 }} />
                    </View>
                )}
                <View style={styles.Line} />
                <View style={styles.UploadBtnTxt}>
                    <Text style={styles.UploadText}>Upload</Text>
                    <View style={styles.arrowIcon}>
                        <Arrow />
                    </View>
                    <Text style={styles.proofText}>Proof of Deposit</Text>

                </View>
            </Pressable>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <TouchableOpacity style={styles.cameraButton} onPress={handleOpenCamera}>
                                <Text style={styles.cameraButtonText}>Take Photo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.galleryButton} onPress={handleOpenGallery}>
                                <Text style={styles.galleryButtonText}>Choose From Gallery</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

export default UploadReceiptImage;

const styles = StyleSheet.create({
    outerView: {
        width: width * 0.90,
        height: 71,
        top: 362.15,
        left: 15.5,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#F2F2F2',
        opacity: 0.6,
        backgroundColor: 'white',

        position: 'absolute', // Assuming you're positioning it absolutely based on the top and left values
    },


    container: {
        width: width * 0.90,
        height: 71,
        position: 'absolute',
        top: 438,
        left: 20,
    },
    UploadCard: {
        width: width * 0.88,
        height: width * 0.22,
        marginLeft: 2,
        marginRight: 5,
        backgroundColor: '#FCFCFC',
        elevation: 1,
        shadowColor: '#000000',
        alignItems: 'center',
        borderRadius: 6,
        flexDirection: 'row',
        marginTop: width * 0.02,
        marginBottom: width * 0.05,
        zIndex: -1,
    },
    Line: {
        borderWidth: 0.3,
        height: 78,
        left: -10,
        borderColor: '#F2F2', // Added border color
    },
    UploadBtnIcon: {
        width: width * 0.20,
        paddingLeft: 25,
    },
    UploadBtnTxt: {
        width: width * 0.60,
    },
    arrowIcon: {
        width: width * 0.5,
        left: 250,
    },
    UploadText: {
        fontFamily: 'Inter',
        fontSize: 16,
        // color: 'black',
        fontWeight: 'bold',
    },
    proofText: {
        fontFamily: 'Inter',
        fontSize: 14,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
    },
    galleryButton: {
        width: width * 0.88,
        height: 50,
        backgroundColor: '#E5E7FA',
        borderRadius: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },
    galleryButtonText: {
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 16,
        letterSpacing: 0,
        textAlign: 'center',
        color: '#003874',
    },
    cameraButton: {
        width: width * 0.88,
        height: 50,
        backgroundColor: '#003874',
        borderRadius: 48,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    cameraButtonText: {
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 16,
        letterSpacing: 0,
        textAlign: 'center',
        color: '#FFFFFF',
    },
});
