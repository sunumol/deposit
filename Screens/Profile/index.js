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



const Profile = ({ navigation }) => {
    const isDarkMode = true;
  

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container1} />
            <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={COLORS.colorB} />

            <HeaderDashBoard navigation={navigation} />

            <View style={styles.container2}>
                <ScrollView showsVerticalScrollIndicator={false}>
     
        <ItemTabs />
    
     
            

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
        padding: 20,
        //justifyContent: 'center',
    },

})

export default Profile;