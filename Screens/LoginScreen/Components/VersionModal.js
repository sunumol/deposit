import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    Dimensions,
    KeyboardAvoidingView,
    Modal,
    BackHandler,
    ScrollView,
    Linking

} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
const { height, width } = Dimensions.get('screen');
import { COLORS, FONTS } from '../../../Constants/Constants';

const VersionModal = ({ ModalVisible, setModalVisible2, navigation, title, DeleteImage }) => {
    const { t } = useTranslation();
    
    const Update =()=>{
        //setModalVisible2(false)
      Linking.openURL(
            `https://play.google.com/store/apps`)
          
    }
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={ModalVisible}
            
            >

            <View
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center', opacity: 5,backgroundColor: "#000000aa" }} >
                <View style={styles.ModalView1}>
                    {/*<Text style={styles.TextDelete}>{t('common:AreS1')} ?</Text>*/}

                    <Text style={[styles.TextDelete1, { textAlign: 'center' }]}>Please <Text style={[styles.TextDelete1, { textAlign: 'center',fontWeight:'700' }]}>update </Text>the App to continue</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 22, paddingBottom: 22 }}>
                        <TouchableOpacity style={[styles.ButtonContinue, { marginRight: 10 }]} onPress={()=>Update()} >
                            <Text style={styles.textC}>Update</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.ButtonCancel}  onPress={() => {setModalVisible2(false), BackHandler.exitApp()}}>
                            <Text style={styles.text2}>Exit</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    ViewButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 22,
        paddingBottom: 22
    },
    Touch1: {
       // backgroundColor: "#000000aa",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 5
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
    text2: {
        color: COLORS.colorB,
        fontFamily: FONTS.FontMedium,
        fontSize: 14
    },
    mainContainer: {
        backgroundColor: "#000000aa",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 5
    },
    touchableStyle0: {
        flex: 1,
        height: Dimensions.get('window').height,

    },

})

export default VersionModal;