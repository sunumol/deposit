import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
// import { styles } from 'react-native-gifted-charts/src/BarChart/styles';
import { COLORS, FONTS } from '../../../Constants/Constants';
const { height, width } = Dimensions.get('screen');
import Chart1 from './Chart1';
import Chart2 from './Chart2';
import Chart3 from './Chart3';
import Chart4 from './Chart4';

const Summary = () => {

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: 'center', justifyContent: 'center',marginBottom:15 }}>
        
            <Chart1 />
            <Chart2 />
            <Chart3 />
            <Chart4 />
         
        </View>
        </ScrollView>
    );
};

export default Summary;

const styles = StyleSheet.create({
    TextData: {
        fontSize: 13,
        color: COLORS.colorB,
        fontFamily: FONTS.FontRegular
    }
})