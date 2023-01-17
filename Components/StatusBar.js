import React from 'react';
import { Text, View, StatusBar, SafeAreaView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const Statusbar = ({ backgroundColor, ...props }) => {
    const { top } = useSafeAreaInsets()

    return (
        <View style={{ backgroundColor,  }}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}

export default Statusbar;