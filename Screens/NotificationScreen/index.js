import React, { useState, useEffect } from 'react';
import {
    StatusBar,
    Platform,
    StyleSheet,
    SafeAreaView,
    View,
    TouchableOpacity,
    Text,
    ScrollView,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Statusbar from '../../Components/StatusBar';
import { useTranslation } from 'react-i18next';
import moment from 'moment'

// -------------- Component Imports ----------------------
import { COLORS, FONTS } from '../../Constants/Constants';
import Header from '../../Components/RepayHeader';
import { api } from '../../Services/Api'

// ------------- Image Imports ----------
import First from './Images/image1.svg';
import Second from './Images/image2.svg';

const LoanDetails = ({ navigation,route }) => {

    const isDarkMode = true;
    const { t } = useTranslation();
    console.log('----route',route)

    const [details, SetDetails] = useState()

    useEffect(() => {
        getNotifications()
    }, [])

    async function getNotifications() {
        const data = {
            id: Number(route?.params?.custID),
            notificationCreatedFor: "AGENT"
        }
        await api.getNotification(data).then((res) => {
            console.log('-------------------res', res)
            if (res?.status == 200) {
                SetDetails(res?.data?.agentsNotificationHistoryList)
                console.log('-------------------res', res?.data?.agentsNotificationHistoryList)
            }
        })
            .catch((err) => {
                console.log('-------------------err', err?.response)
            })
    }

    return (

        <SafeAreaProvider>
            <SafeAreaView style={styles.container1} />
            <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={'#002B59'} />
            <Header name={t('common:Notification')} navigation={navigation} />
            <ScrollView style={styles.mainContainer}>
                {details?.length > 0 && details?.map((item, index) => {
                  
                        return (
                            <>
                                <TouchableOpacity style={[styles.renderComponent, { alignItems: 'center' }]} 
                                onPress={()=>
                                  {  if(item?.notificationType === 'DATA_CONFIRMATION'){
                                    navigation.navigate('Proceed', { status: true });
                                    }else if(item?.notificationType === 'DATA_CORRECTION_REQUEST'){
                                        navigation.navigate('CorrectionScreen', { AcyivityId: item?.message.replace(/\D/g, "")}) 
                                    }
                                }
                                }>
                                    <View style={styles.columContainer}>
                                        <Text style={styles.KycText}>{item?.message.replace(/[0-9]/g, '')}</Text>
                                        <Text style={styles.timeText}>{moment(item?.createdOn).format('DD MMM')} {moment(item?.createdOn).format('LT')}</Text>
                                       
                                    </View>
                                </TouchableOpacity>
                                {details.length > 0 && index !== details.length - 1
                                    ? <View style={styles.lineView} /> : null}
                            </>
                        )
                  
                })
                }
                <View style={styles.lineView} />
            </ScrollView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container1: {
        flex: 0,
        backgroundColor: "#002B59",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.colorBackground,
        
    },
    renderComponent: {
        flexDirection: 'row',
        paddingVertical: 22,
        paddingHorizontal: 20,
    },
    columContainer: {
        flexDirection: 'column',
    },
    lineView: {
        height: 1, 
        backgroundColor: '#F2F2F2',
    },
    KycText: {
        fontSize: 13,
        fontWeight: '400',
        fontFamily: FONTS.FontRegular,
        color: COLORS.Black
    },
    timeText: {
        fontSize: 11,
        fontWeight: '400',
        fontFamily: FONTS.FontRegular,
        color: '#828282'
    },
    proceedButton: {
        width: 110,
        backgroundColor: COLORS.colorB,
        borderRadius: 43,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        marginTop: 8
    },
    proceedText: {
        fontFamily: FONTS.FontRegular,
        fontWeight: 'bold',
        fontSize: 14,
        color: COLORS.colorBackground
    },
    titleText: {
        fontSize: 13,
        fontWeight: '400',
        fontFamily: FONTS.FontRegular,
        color: COLORS.Black,
        maxWidth: 200
    }
})
export default LoanDetails;