import React from 'react';
import { Text, View, StatusBar, SafeAreaView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svadhan from '../../../assets/Images/svadhan.svg'

const CustomStatusBar = ({ backgroundColor, ...props }) => {
    const { top } = useSafeAreaInsets()

    return (
        <View style={{ height: (StatusBar.currentHeight || top), backgroundColor, alignItems: 'center', justifyContent: 'center', flex: 1 }}>

            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
            <View style={styles.view}>
            <Svadhan  width={160} height={51} resizeMode='contain' />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#002B59",
        color: "white"

    },
    view: {
        //flex: 1,
//alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 25,
        //fontWeight: '600',
        color: "#002B59",
        fontFamily:"Inter-ExtraBold"
    }
});
export default CustomStatusBar;