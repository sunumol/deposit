import React, { useState, useEffect } from 'react';
import {
    StatusBar,
    Platform,
    StyleSheet,
    SafeAreaView,
    View,
    TouchableOpacity,
    FlatList,
    ScrollView,
    Text
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Statusbar from '../../Components/StatusBar';
import { FONTS, COLORS } from '../../Constants/Constants';
import HeaderDashBoard from '../../Components/HeaderDashBoard';
import BottomTabs from './Components/BottomTab';
import ItemTabs from './Components/ItemTab';
import { useTranslation } from 'react-i18next';
import { api } from '../../Services/Api';

import Activity from './assets/Activity.svg';
import Calendar from './assets/Calendar.svg';
import Collect from './assets/Collect.svg';
import NewCall from './assets/NewCall.svg';
import NewLead from './assets/NewLead.svg';
import NewUser from './assets/NewUser.svg';

const Profile = ({ navigation }) => {
    const { t } = useTranslation();
    const [notificationCount, SetNotificationCount] = useState()
    const isDarkMode = true;
    const DATA = [
        {
            id: '1',
            title: t('common:Activity'),
            image: <Activity />,
            notification: true,
        },
        {
            id: '2',
            title: t('common:Calendar'),
            image: <Calendar />,
            notification: false,
        },
        {
            id: '3',
            title: t('common:NewLead'),
            image: <NewLead />,
            notification: false,
        },
        {
            id: '4',
            title: t('common:NewCGT'),
            image: <NewUser />,
            notification: false,
        },
        {
            id: '5',
            title: t('common:NewCall'),
            image: <NewCall />,
            notification: false,
        },
        {
            id: '6',
            title: t('common:Collect'),
            image: <Collect width={50} height={40} />,
            notification: true,
        },
    ];
    // ------------------ HomeScreen Api Call Start ------------------
    const HomeScreenApiCall = async () => {
        console.log("inside api call")
        const data = {
            "employeeId": 1
        };
        await api.homeScreenApi(data).then((res) => {
            console.log('-------------------res', res?.data)
            SetNotificationCount(res?.data?.body)
        })
            .catch((err) => {
                console.log('-------------------err notification', err)
            })
    };
    // ------------------ HomeScreen Api Call End ------------------

    useEffect(() => {
        HomeScreenApiCall()
    }, []);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container1} />
            <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={"#002B59"} />

            <HeaderDashBoard navigation={navigation} notificationCounts={notificationCount} />

            <View style={styles.container2}>
                <ScrollView showsVerticalScrollIndicator={false}>

                    <FlatList
                        data={DATA}
                        renderItem={({ item, index }) =>
                            <ItemTabs
                                index={index}
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                notificationCounts={notificationCount}
                                notification={item.notification}
                                navigation={navigation} />}
                        keyExtractor={item => item.id}
                        horizontal={false}
                        numColumns={2}

                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        contentContainerStyle={{ padding: 20, }}
                    />
                    {/* <Text style={{ color: 'black', textAlign: 'center' }} onPress={() => {
                        navigation.navigate('PinScreen')

                    }}>Existing UserFlow</Text> */}

                </ScrollView>
            </View>
            <BottomTabs navigation={navigation} />
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container1: {
        flex: 0,
        backgroundColor: "#002B59",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    container2: {
        flex: 1,
        backgroundColor: COLORS.colorBackground,

        //justifyContent: 'center',
    },

})

export default Profile;