import React from 'react';
import {
    StatusBar,
    Platform,
    StyleSheet,
    SafeAreaView,
    View,
    TouchableOpacity,
    FlatList,
    ScrollView
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Statusbar from '../../Components/StatusBar';
import { FONTS, COLORS } from '../../Constants/Constants';
import HeaderDashBoard from '../../Components/HeaderDashBoard';
import BottomTabs from './Components/BottomTab';
import ItemTabs from './Components/ItemTab';

import Activity from './assets/Activity.svg';
import Calendar from './assets/Calendar.svg';
import Collect from './assets/Collect.svg';
import NewCall from './assets/NewCall.svg';
import NewLead from './assets/NewLead.svg';
import NewUser from './assets/NewUser.svg';

const Profile = ({ navigation }) => {
    const isDarkMode = true;
    const DATA = [
        {
            id: '1',
            title: 'Activity',
            image:<Activity/>,
            notification:true,
        },
        {
            id: '2',
            title: 'Calendar',
            image:<Calendar/>,
            notification:false,
        },
        {
            id: '3',
            title: 'New Lead',
            image:<NewLead/>,
            notification:false,
        },
        {
            id: '4',
            title: 'New CGT',
            image:<NewUser/>,
            notification:false,
        },
        {
            id: '5',
            title: 'New Call',
            image:<NewCall/>,
            notification:false,
        },
        {
            id: '6',
            title: 'Collect',
            image:<Collect/>,
            notification:true,
        },
    ];

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container1} />
            <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={COLORS.colorB} />

            <HeaderDashBoard navigation={navigation} />

            <View style={styles.container2}>
                <ScrollView showsVerticalScrollIndicator={false}>

                    <FlatList
                        data={DATA}
                        renderItem={({ item }) => 
                        <ItemTabs 
                        id={item.id}
                        title={item.title}
                        image={item.image}
                        notification={item.notification}
                        navigation={navigation}/>}
                        keyExtractor={item => item.id}
                        horizontal={false}
                        numColumns={2}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        contentContainerStyle={{ padding: 20, }}
                    />


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