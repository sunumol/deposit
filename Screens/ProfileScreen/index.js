import React, { useCallback, useState, useEffect } from 'react';
import { Text, View, StyleSheet, BackHandler, SafeAreaView, StatusBar, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ---------- Component Imports --------------
import Header from '../../Components/RepayHeader';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, FONTS } from '../../Constants/Constants';
import { api } from '../../Services/Api'
import Statusbar from '../../Components/StatusBar';
import moment from 'moment';

// ---------- Image Imports --------------
import Profile from './Images/Pic1.svg'


const ProfileScreen = ({ navigation }) => {
    const isDarkMode = true;
    const { t } = useTranslation();

    const [details, SetDetails] = useState()
    const [custID, setCustId] = useState('S00001')
    const [status, setStatus] = useState(true)


    const handleGoBack = useCallback(() => {
        navigation.goBack()
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
        AsyncStorage.getItem("CustomerId").then((value) => {
            setCustId(value)
            console.log("value", custID)
        })
    }, [])

    useEffect(() => {
        getProfileDetails()
    }, [custID])


    //.............Profile api calling.........//

    async function getProfileDetails() {

        await api.getAgentProfile(custID).then((res) => {
            console.log('-------------------res', res)
            if (res?.status == 200) {
                SetDetails(res?.data?.body)
                setStatus(false)
                console.log('-------------------res of profile', res?.data?.body)
            }
        })
            .catch((err) => {
                setStatus(false)
                console.log('-------------------err', err?.response)
            })
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container1} />
            <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor="#002B59" />

            <Header name={t('common:Profile')} navigation={navigation} />
            {status ?
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, }}>
                    <ActivityIndicator size={30} color={COLORS.colorB} />
                </View> :
                <ScrollView showsVerticalScrollIndicator={false} style={{flex:1,backgroundColor:COLORS.colorBackground}}>
                    <View style={styles.mainContainer}>
                        <View style={styles.boxShadow}>
                            <View style={styles.ProfileView}>
                                <Profile />
                            </View>
                            <View style={{ flexDirection: 'column', paddingLeft: 19 }}>
                                <Text style={styles.nameText}>Athira Anil</Text>
                                <Text style={styles.idText}>{details?.id}</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 24 }}>
                            <Text style={styles.mobileText}>{t('common:MobileNum')}</Text>
                            <TextInput
                                style={styles.TextInputStyle}
                                value={details?.mobile}
                                editable={false}
                            />
                        </View>

                        <View style={{ marginTop: 18 }}>
                            <Text style={styles.mobileText}>Marital Status</Text>
                            <TextInput
                                style={styles.TextInputStyle}
                                value={details?.maritalStatus}
                                editable={false}
                            />
                        </View>


                        <View style={{ marginTop: 18 }}>
                            <Text style={styles.mobileText}>Date Of Birth</Text>
                            <View style={[styles.TextInputStyle2, { paddingVertical: 10 }]}>
                                <Text style={{
                                    fontFamily: FONTS.FontRegular,
                                    fontSize: 15,
                                    fontWeight: '400',
                                    color: COLORS.colorDark,
                                }}>{moment(details?.dob).format("DD MMM")} ‘{moment(details?.dob).format('YY')}
                                </Text>

                            </View>

                        </View>

                        <View style={{ marginTop: 18 }}>
                            <Text style={styles.mobileText}>{t('common:AddressB')}</Text>

                            <View style={[styles.TextInputStyle2, { paddingVertical: 10 }]}>
                                <Text style={{
                                    fontFamily: FONTS.FontRegular,
                                    fontSize: 15,
                                    fontWeight: '400',
                                    color: COLORS.colorDark,
                                }}>{details?.address}
                                </Text>

                            </View>

                        </View>
                        <View style={{ marginTop: 18 }}>
                            <Text style={styles.mobileText}>Aadhaar ID</Text>
                            <TextInput
                                style={styles.TextInputStyle}
                                value={details?.aadharNumber}
                                editable={false}
                            />
                        </View>
                        <View style={{ marginTop: 18 }}>
                            <Text style={styles.mobileText}>PAN No</Text>
                            <TextInput
                                style={styles.TextInputStyle}
                                value={details?.panNumber}
                                editable={false}
                            />
                        </View>
                    </View>
                </ScrollView>}
        </SafeAreaProvider>
    );
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
       // height: '100%',
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 25
    },
    TextInputStyle: {
        fontFamily: FONTS.FontRegular,
        fontSize: 15,
        fontWeight: '400',
        color: COLORS.colorDark,
        borderWidth: 1,
        borderColor: COLORS.colorBorder,
        borderRadius: 8,
        paddingHorizontal: 12,
        marginTop: 7,
        backgroundColor: 'rgba(252, 252, 252, 1)'
    },
    TextInputStyle2: {
        borderWidth: 1,
        borderColor: COLORS.colorBorder,
        borderRadius: 8,
        marginTop: 7,
        paddingHorizontal: 12,
        backgroundColor: 'rgba(252, 252, 252, 1)'
    },
    mobileText: {
        fontSize: 12,
        fontFamily: FONTS.FontRegular,
        color: COLORS.colorBlack,
        fontWeight: '400',
    },
    nameText: {
        fontSize: 18,
        fontFamily: FONTS.FontMedium,
        color: COLORS.Black,
        fontWeight: '500',
    },
    idText: {
        fontSize: 14,
        fontFamily: FONTS.FontRegular,
        color: '#4F4F4F',
        fontWeight: '400',
        paddingTop: 2
    },
    boxShadow: {
        paddingVertical: 19,
        //borderWidth: 0.6,
        borderColor: COLORS.colorBorder,
        borderRadius: 20,
        paddingLeft: 15,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.colorBackground,
        shadowColor: '#000000',
        elevation: 4
    },
    ProfileView: {
        backgroundColor: 'rgba(45, 113, 187, 1)',
        width: 68,
        height: 68,
        borderRadius: 34,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
export default ProfileScreen;