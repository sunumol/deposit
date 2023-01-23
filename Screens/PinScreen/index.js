import React, { useState, useEffect, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    KeyboardAvoidingView,
    StatusBar,
    ScrollView,
    Dimensions,
    BackHandler,
    ImageBackground
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS, FONTS } from '../../Constants/Constants';
import Statusbar from '../../Components/StatusBar';
import Header from '../../Components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import OTPInputView from '@twotalltotems/react-native-otp-input';
const { height, width } = Dimensions.get('screen');
import LinearGradient from 'react-native-linear-gradient';
import Svadhan from '../../assets/image/AgentLogo.svg';
import PinModal from './Components/PinModal';

const PinScreen = ({ navigation, }) => {
    const route = useRoute();
    console.log("route name",);
    const isDarkMode = true
    const { t } = useTranslation();
    const [lang, setLang] = useState('')
    const [BStatus, setBstatus] = useState(false)
    const [OtpValue, setOtpValue] = useState('')
    const [ModalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const lang = await AsyncStorage.getItem('user-language')
            setLang(lang)

        } catch (e) {
            console.log(e)
        }
    }

    const backAction = () => {
        if (BStatus) {
            setBstatus(false)
        } else {
            navigation.goBack()
        }
    }

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );
        return () => backHandler.remove();
    }, [navigation]);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container1} />
            <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />


            <View style={styles.ViewContent}>

                <ImageBackground source={require('../../assets/image/bg.png')} >
                <Svadhan width={350} height={80} resizeMode='contain' style={{ top: -10 }} />

<Text style={styles.Text1}>Hi, Athira Anil</Text>
                    </ImageBackground>
         


                {/* <View style={styles.ViewPin}> */}
                    {/* <Text style={styles.PinTEXT} onPress={() => setModalVisible(true)}>{t('common:PleasePin')}</Text> */}

                    {/* <OTPInputView
                        style={[styles.OtpInput, {}]}
                        pinCount={4}
                        code={OtpValue}
                        onCodeChanged={otp => setOtpValue(otp)}
                        // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                        // onCodeChanged = {code => { this.setState({code})}}
                        autoFocusOnLoad={false}
                        codeInputFieldStyle={{ color: '#090A0A', borderRadius: 8, backgroundColor: '#FFFFF', }}
                        placeholderTextColor="black"
                        onCodeFilled={(code => {
                            setModalVisible(!ModalVisible)

                        })}
                    /> */}

                    {/* <Text style={styles.TextF} onPress={() => navigation.navigate('ForgotPin')}>{t('common:ForgotPin')} ?</Text>

                </View> */}

                {/* <View style={{justifyContent:'center'}}>
                <Text style={styles.errrorText}>Invalid PIN</Text>
                </View> */}
            </View>

            <PinModal ModalVisible={ModalVisible}
                onPress={() => OnpressOut1()}
                onPressOut={() => setModalVisible(!ModalVisible)}
                setModalVisible={setModalVisible}
                navigation={navigation} />
        </SafeAreaProvider>
    )
}

export default PinScreen;


const styles = StyleSheet.create({
    container1: {
        flex: 0,
        backgroundColor: "#002B59",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    ViewContent: {
        // justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: COLORS.colorBackground,
    },
    text: {
        fontWeight: '400',
        fontFamily: FONTS.FontRegular,
        fontSize: 14,
        marginTop: 21,
        marginLeft: 21,
        marginRight: 21,
        textAlign: 'justify',
        color: "#1A051D",
    },
    Head: {
        fontFamily: FONTS.FontExtraBold,
        fontSize: 18,
        fontWeight: '800',
        color: "#1A051D",
        paddingTop: 31
    },
    viewHead: {
        marginTop: Dimensions.get('window').height * 0.02,
        marginBottom: 0,
        marginLeft: 21
    },
    OtpInput: {
        width: '60%',
        height: 50,
        fontSize: 25,
        borderRadius: 12,
        fontWeight: 'bold',
        color: "black",
        //margin:5
    },
    Linear: {
        width: width,
        height: width * 0.58,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    Text1: {
        fontFamily: FONTS.FontRegular,
        color: COLORS.colorBackground,
        fontSize: 24,
        paddingTop: width * 0.01
    },
    ViewPin: {
        shadowColor: '#000000',
        shadowOpacity: 1,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 20,
        elevation: 5,
        width: width * 0.90,
        height: width * 0.48,
        backgroundColor: COLORS.colorBackground,
        borderRadius: 15,
        alignItems: 'center',
        top: -30
    },
    PinTEXT: {
        color: '#1A051D',
        fontFamily: FONTS.FontRegular,
        paddingBottom: width * 0.04,
        ontSize: 14,
        paddingTop: width * 0.06
    },
    TextF: {
        color: '#1A051D',
        fontFamily: FONTS.FontRegular,
        fontSize: 14,
        paddingTop: width * 0.07
    },
    errrorText: {
        fontSize: 14,
        fontFamily: FONTS.FontRegular,
        fontWeight: '400',
        textAlign: 'center',
        color: '#EB5757',
        marginTop: 0
    }
})