import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
// import { styles } from 'react-native-gifted-charts/src/BarChart/styles';
import { COLORS, FONTS } from '../../../Constants/Constants';
const { height, width } = Dimensions.get('screen');

const GroupedBars1 = () => {
    const barData = [
        {
            value: 17,
            label: '    March',
            spacing: 6,
            labelWidth: 100,
            //  labelTextStyle: { color: 'gray',fontSize:12 },
            frontColor: 'rgba(88, 84, 247, 1)',
            topLabelComponent: () => (

                <Text style={{ top: -6, fontSize: 10, color: 'rgba(128, 128, 128, 1)', fontFamily: FONTS.FontRegular, }}>17k</Text>

            )

        },
        {
            value: 12, frontColor: 'rgba(176, 195, 230, 1)',
            topLabelComponent: () => (

                <Text style={{ top: -6, fontSize: 10, color: 'rgba(128, 128, 128, 1)', fontFamily: FONTS.FontRegular, }}>12k</Text>

            )
        },
        {
            value: 15,
            label: '      April',
            spacing: 6,
            labelWidth: 100,
            // labelTextStyle: { color: 'gray',fontSize:12 },
            frontColor: 'rgba(88, 84, 247, 1)',
            topLabelComponent: () => (

                <Text style={{ top: -6, fontSize: 10, color: 'rgba(128, 128, 128, 1)', fontFamily: FONTS.FontRegular, }}>15k</Text>

            )
        },
        {
            value: 13, frontColor: 'rgba(176, 195, 230, 1)',
            topLabelComponent: () => (

                <Text style={{ top: -6, fontSize: 10, color: 'rgba(128, 128, 128, 1)', fontFamily: FONTS.FontRegular, }}>13k</Text>

            )
        },
        {
            value: 16,
            label: '      May',
            spacing: 6,
            labelWidth: 100,
            // labelTextStyle: { color: 'gray',fontSize:12 ,},
            frontColor: 'rgba(88, 84, 247, 1)',
            topLabelComponent: () => (

                <Text style={{ top: -6, fontSize: 10, color: 'rgba(128, 128, 128, 1)', fontFamily: FONTS.FontRegular, }}>16k</Text>

            )
        },


        {
            value: 13, frontColor: 'rgba(176, 195, 230, 1)',
            topLabelComponent: () => (

                <Text style={{ top: -6, fontSize: 10, color: 'rgba(128, 128, 128, 1)', fontFamily: FONTS.FontRegular, }}>13k</Text>

            )
        },



    ];

    const renderTitle = () => {
        return (
            <View style={{ margin: 15 }}>
                <Text style={styles.TextData}>Yay! your <Text style={[styles.TextData, { fontFamily: FONTS.FontSemiB }]}>last 3 month’s incentive</Text> is</Text>
                <Text style={styles.TextData}>higher compared to the toppers</Text>
            </View>
        )
    }

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <View
                style={{
                    backgroundColor: COLORS.colorBackground,
                    borderRadius: 8,

                    marginTop: 20,
                    shadowColor: 'rgba(0, 0, 0, 0.4)',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.5,
                    elevation: 3,
                    shadowRadius: 7,
                    borderWidth: 1,
                    borderColor: COLORS.colorBorder,
                    width: width * 0.90
                }}>
                {renderTitle()}
                <BarChart
                    data={barData}
                    barWidth={22}
                    spacing={38}
                    barBorderRadius={6}

                    // roundedBottom

                    disableScroll={true}
                    hideRules
                    yAxisLabelTexts={[' ', '5k', '10k', '15k', '20k']}
                    showYAxisIndices
                    yAxisIndicesColor={'red'}
                    yAxisIndicesHeight={1}
                    yAxisIndicesWidth={2}
                    xAxisIndicesColor={'#E5E7FA'}
                    xAxisColor={'rgba(128, 128, 128, 1)'}
                    yAxisColor={'rgba(128, 128, 128, 1)'}
                    xAxisThickness={1}
                    yAxisThickness={1}
                    yAxisTextStyle={{ color: 'gray' }}
                    xAxisLabelTextStyle={{ color: 'rgba(128, 128, 128, 1)', fontSize: 12, fontFamily: FONTS.FontRegular, }}
                    noOfSections={4}
                    maxValue={20}
                    height={100}
                    initialSpacing={22}
                    width={width * 0.72}


                />
            </View>
        </View>
    );
};

export default GroupedBars1;

const styles = StyleSheet.create({
    TextData: {
        fontSize: 13,
        color: COLORS.colorB,
        fontFamily: FONTS.FontRegular
    }
})