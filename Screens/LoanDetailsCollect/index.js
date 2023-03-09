import React, { useState, useCallback, useEffect } from 'react';
import {
    StatusBar,
    Platform,
    StyleSheet,
    SafeAreaView,
    View,
    Dimensions,
    TouchableOpacity,
    Text,
    FlatList,
    BackHandler,
    ActivityIndicator
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Statusbar from '../../Components/StatusBar';
import { COLORS, FONTS } from '../../Constants/Constants';
import Header from '../../Components/RepayHeader';
import { useFocusEffect } from '@react-navigation/native';
import DetailBox from './Components/DetailBox';
import { useTranslation } from 'react-i18next';
import DetailTab from './Components/DetailTab';
import History from './Components/History';
const LoanDetailsCollect = ({ navigation }) => {
    const isDarkMode = true;
    const { t } = useTranslation();
    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const [id, setId] = useState(1)
    const closeMenu = () => setVisible(false);
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




    return (

        <SafeAreaProvider>
            <SafeAreaView style={styles.container1} />
            <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={'#002B59'} />
            <Header name={t('common:LoanDetails')}  navigation={navigation} />

            <View style={styles.mainContainer}>
                <DetailBox />
                {/* <History/> */}

                <DetailTab />
            </View>
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
        paddingHorizontal: 20,
        // paddingBottom:10
    },
    continueText: {
        textAlign: 'center',
        fontFamily: FONTS.FontRegular,
        fontSize: 14,
        fontWeight: '700',
        // lineHeight: 17,
        letterSpacing: 0.64,
        color: COLORS.colorBackground
    },
    continueView: {
        height: 44,
        borderRadius: 43,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.colorB,
        marginTop: 22
    },
    transactionView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight: 7,
        marginTop: 30
    },
    transactionText: {
        fontFamily: FONTS.FontSemiB,
        fontSize: 14,
        // lineHeight: 20,
        color: COLORS.colorDark
    },
    renderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    dateContainer: {
        flexDirection: 'column'
    },
    dateText: {
        fontFamily: FONTS.FontRegular,
        fontSize: 12,
        // lineHeight: 24,
        color: COLORS.colorBlack,
    },
    typetext: {
        fontFamily: FONTS.FontRegular,
        fontSize: 10,
        // lineHeight: 15,
        color: '#4F4F4F',
    },
    amountText: {
        fontFamily: FONTS.FontSemiB,
        fontSize: 14,
        // lineHeight: 24,
    },
    saveText: {
        paddingLeft: 8,
        fontFamily: FONTS.FontMedium,
        fontSize: 12,
        // lineHeight: 20,
        color: COLORS.colorDark,
        fontWeight: '500'
    }
})
export default LoanDetailsCollect;