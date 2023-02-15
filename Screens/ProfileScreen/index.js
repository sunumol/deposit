import React, { useCallback, useState } from 'react';
import { Text, View, StyleSheet, BackHandler, SafeAreaView, StatusBar, TextInput,Image } from 'react-native';
import { COLORS, FONTS } from '../../Constants/Constants';
import Header from '../../Components/RepayHeader';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Statusbar from '../../Components/StatusBar';
import Profile from './Images/pro1.svg'

const ProfileScreen = ({ navigation }) => {
    const isDarkMode = true;
    const { t } = useTranslation();
    const [Join, onChangeJoin] = useState('10 Dec ‘21');
    const [mobile, onChangeMobile] = useState('8089XXXX98');
    const [address, onChangeAddress] = useState('Example House,\nKakkanad P.O Kochi');
    const [aadhar, onChangeAadhar] = useState('4447XXXX3177');
    const [voter, onChangeVoter] = useState('TU4XXXX9099');

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
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container1} />
            <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor="#002B59" />

            <Header name={t('common:Profile')} navigation={navigation} />
            <View style={styles.mainContainer}>
                <View style={styles.boxShadow}>
                    <View style={{borderWidth:4,borderRadius:35,borderColor:"#A5AFFB",alignItems:'center',justifyContent:'center',
                    width:70,height:70}}>
                    <Image source={require('./Images/PRO1.png')}
                     style={{width:62,height:62,borderRadius:31}} /> 
                    </View>
                    {/* */}
                    <View style={{ flexDirection: 'column', paddingLeft: 19 }}>
                        <Text style={styles.nameText}>Soumi Joseph</Text>
                        <Text style={styles.idText}>SM0012</Text>
                    </View>
                </View>

                <View style={{ marginTop: 24 }}>
                    <Text style={styles.mobileText}>Date of join</Text>
                    <TextInput
                        style={styles.TextInputStyle}
                        onChangeText={onChangeJoin}
                        value={Join}
                        editable={false}
                    />
                </View>
                <View style={{ marginTop: 24 }}>
                    <Text style={styles.mobileText}>{t('common:MobileNum')}</Text>
                    <TextInput
                        style={styles.TextInputStyle}
                        onChangeText={onChangeMobile}
                        value={mobile}
                        editable={false}
                    />
                </View>
                <View style={{ marginTop: 24 }}>
                    <Text style={styles.mobileText}>{t('common:AddressB')}</Text>
                    <TextInput
                        style={[styles.TextInputStyle, { height: 58 }]}
                        onChangeText={onChangeAddress}
                        value={address}
                        numberOfLines={2}
                        multiline={true}
                        editable={false}
                    />
                </View>
                <View style={{ marginTop: 24 }}>
                    <Text style={styles.mobileText}>{t('common:Adhaar1')}</Text>
                    <TextInput
                        style={styles.TextInputStyle}
                        onChangeText={onChangeAadhar}
                        value={aadhar}
                        editable={false}
                    />
                </View>
                <View style={{ marginTop: 24 }}>
                    <Text style={styles.mobileText}>{t('common:Voters')}</Text>
                    <TextInput
                        style={styles.TextInputStyle}
                        onChangeText={onChangeVoter}
                        value={voter}
                        editable={false}
                    />
                </View>
            </View>

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
        backgroundColor: COLORS.backgroundColor,
        height: '100%',
        paddingHorizontal: 20,
        paddingTop: 16,
    },
    TextInputStyle: {
        fontFamily: FONTS.FontRegular,
        fontSize: 15,
        fontWeight: '400',
        color: COLORS.colorDark,
        borderWidth: 1,
        borderColor: COLORS.colorBorder,
        borderRadius: 8,
        height: 45,
        paddingHorizontal: 12,
        marginTop: 7
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
        borderWidth: 1,
        borderColor: COLORS.colorBorder,
        borderRadius: 20,
        paddingLeft: 15,
        flexDirection: 'row',
        alignItems: 'center',
    }
})
export default ProfileScreen;