import React, { useState, useCallback, useEffect } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    StatusBar,
    Text,
    BackHandler,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import ExitModal from '../../Components/ModalExit';
import { COLORS, FONTS } from '../../Constants/Constants';
import Statusbar from '../../Components/StatusBar';
import Header from '../../Components/Header2';
import { api } from '../../Services/Api'

import Settings from './Images/settings.svg'

const CorrectionScreen = ({ navigation, }) => {

    const isDarkMode = true
    const activityId = useSelector(state => state.activityId);
    const [dataDetails, setDataDetails] = useState()
    const [ModalVisible, setModalVisible] = useState(false)

    const handleGoBack = useCallback(() => {
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

    useEffect(() => {
        getCorrectionDetails()
    }, [])

    // ------------------ get Conduct DLE basic detail Village Api Call Start ------------------
    const getCorrectionDetails = async () => {
        const data = {
            "activityId": activityId    //-----> addd --- activityId
        }
        await api.getCorrectionDetails(data).then((res) => {
            console.log('-------------------res getCorrection', res)
            if (res?.data) {
                setDataDetails(res?.data?.body)
            }
        }).catch((err) => {
            console.log('-------------------err getCorrection', err?.response)
        })
    };
    // ------------------saveIncomeDetails detail ------------------

    // ------------------ get Conduct DLE basic detail Village Api Call Start ------------------
    const onProceed = async () => {
        const data = {
            "activityId": activityId    //-----> addd --- activityId
        }
        await api.getCorrectionDLEPage(data).then((res) => {
            console.log('-------------------res getCorrection', res)
            if (res?.data) {
                if (res?.data?.body == 1) {
                   navigation.navigate('DetailCheck')
                } else if (res?.data?.body == 2) {
                    navigation.navigate('ResidenceOwner')
                } else if (res?.data?.body == 3) {
                   navigation.navigate('ContinuingGuarantor')
                } else if (res?.data?.body == 4) {
                   navigation.navigate('UploadVid')
                } else if (res?.data?.body == 5) {
                   navigation.navigate('EnergyUtility')
                } else if (res?.data?.body == 6) {
                  navigation.navigate('VehicleOwn')
                } else if (res?.data?.body == 7) {
                    navigation.navigate('IncomeDetails', { relationShip: 'Customer' })
                } else if (res?.data?.body == 8) {
                   navigation.navigate('IncomeDetails', { relationShip: 'Spouse' })
                } else if (res?.data?.body == 9) {
                   navigation.navigate('HousePhoto')
                }
            }
        }).catch((err) => {
            console.log('-------------------err getCorrection', err?.response)
        })
    };
    // ------------------saveIncomeDetails detail ------------------

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container1} />
            <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

            <Header navigation={navigation} />
            <View style={styles.mainContainerView}>
                <View style={styles.contentView}>
                    <Settings />
                    <Text style={styles.textHead1}>Customer has requested for corrections</Text>
                    <Text style={styles.descText}>Please proceed to edit data</Text>
                    <Text style={styles.textHead2}>Correction required for following:</Text>
                    <View style={{ paddingTop: Dimensions.get('window').height * 0.02 }}>
                        {dataDetails?.map((item, index) => {
                            return (
                                <Text style={styles.descText2}>{'\u2B24'} {item}</Text>
                            )
                        })
                        }
                    </View>

                </View>
                <TouchableOpacity style={styles.buttonView} onPress={onProceed}>
                    <Text style={styles.proceedText}>Proceed</Text>
                </TouchableOpacity>
            </View>

            <ExitModal
                ModalVisible={ModalVisible}
                onPressOut={() => {
                    setModalVisible(!ModalVisible)
                }}
                setModalVisible={setModalVisible}
                navigation={navigation}
            />

        </SafeAreaProvider>
    )
}

export default CorrectionScreen;

const styles = StyleSheet.create({
    container1: {
        flex: 0,
        backgroundColor: "#002B59",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    mainContainerView: {
        flex: 1,
        backgroundColor: COLORS.colorBackground
    },
    contentView: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },
    textHead1: {
        fontFamily: FONTS.FontSemiB,
        fontSize: 14,
        color: COLORS.Black
    },
    descText: {
        fontFamily: FONTS.FontRegular,
        fontSize: 12,
        color: COLORS.colorDSText,
        paddingTop: 6
    },
    textHead2: {
        fontFamily: FONTS.FontSemiB,
        fontSize: 12,
        color: COLORS.Black,
        paddingTop: Dimensions.get('window').height * 0.1
    },
    descText2: {
        fontFamily: FONTS.FontRegular,
        fontSize: 12,
        color: COLORS.colorDark,
        paddingTop: 10
    },
    buttonView: {
        backgroundColor: COLORS.colorB,
        height: 48, alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 54,
        marginHorizontal: 16,
        marginBottom: 20
    },
    proceedText: {
        fontFamily: FONTS.FontBold,
        fontSize: 14,
        color: COLORS.colorBackground,
    }
})