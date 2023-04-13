import React, { useEffect } from 'react';

import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
// import { styles } from 'react-native-gifted-charts/src/BarChart/styles';
import { COLORS, FONTS } from '../../../Constants/Constants';
const { height, width } = Dimensions.get('screen');

const GroupedBars1 = ({ Summary }) => {
    console.log("summary print...", Summary[0]?.month)

    function kFormatter(num) {
        return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num)
    }

    const barData = [

        {
            value: Summary[0]?.incentive,
            label: '  ' + Summary[0]?.month,
            spacing: 6,
            labelWidth: 100,

            //  labelTextStyle: { color: 'gray',fontSize:12 },
            frontColor: 'rgba(88, 84, 247, 1)',
            topLabelComponent: () => (

                <Text style={{ top: -6, fontSize: 10, color: 'rgba(128, 128, 128, 1)', fontFamily: FONTS.FontRegular, }}>{kFormatter(Summary[0]?.incentive)}</Text>

            )

        },
        {
            value: Summary[0]?.avgIncentive, frontColor: 'rgba(176, 195, 230, 1)', height: 40,
            topLabelComponent: () => (

                <Text style={{ top: -6, fontSize: 10, color: 'rgba(128, 128, 128, 1)', fontFamily: FONTS.FontRegular, }}>{kFormatter(Summary[0]?.avgIncentive)}</Text>

            )
        },
        {
            value: Summary[1]?.incentive,
            label: '  ' + Summary[1]?.month,
            spacing: 6,
            labelWidth: 100,

            frontColor: 'rgba(88, 84, 247, 1)',
            topLabelComponent: () => (

                <Text style={{ top: -6, fontSize: 10, color: 'rgba(128, 128, 128, 1)', fontFamily: FONTS.FontRegular, }}>{kFormatter(Summary[1]?.incentive)}</Text>

            )
        },
        {
            value: Summary[1]?.avgIncentive, frontColor: 'rgba(176, 195, 230, 1)',
            topLabelComponent: () => (

                <Text style={{ top: -6, fontSize: 10, color: 'rgba(128, 128, 128, 1)', fontFamily: FONTS.FontRegular, }}>{kFormatter(Summary[1]?.avgIncentive)}</Text>

            )
        },
        {
            value: Summary[2]?.incentive,
            label: '    ' + Summary[2]?.month,
            spacing: 6,
            labelWidth: 100,

            // labelTextStyle: { color: 'gray',fontSize:12 ,},
            frontColor: 'rgba(88, 84, 247, 1)',
            topLabelComponent: () => (

                <Text style={{ top: -6, fontSize: 10, color: 'rgba(128, 128, 128, 1)', fontFamily: FONTS.FontRegular, }}>{kFormatter(Summary[2]?.incentive)}</Text>

            )
        },


        {
            value: Summary[2]?.avgIncentive, frontColor: 'rgba(176, 195, 230, 1)',
            topLabelComponent: () => (

                <Text style={{ top: -6, fontSize: 10, color: 'rgba(128, 128, 128, 1)', fontFamily: FONTS.FontRegular, }}>{kFormatter(Summary[2]?.avgIncentive)}</Text>

            )
        },



    ];

    useEffect(() => {
        console.log("calculation", 0.75 * 13000)
    }, [])

    const renderTitle = () => {
        return (
            <>
                {Summary[2]?.incentive < 0.75 * Summary[2]?.avgIncentive ?
                   <View style={{ margin: 15, }}>
                   <Text style={styles.TextData}>Hey! Please focus on improving your <Text style={[styles.TextData, { fontFamily: FONTS.FontSemiB }]}>monthly
                       earnings.</Text> All the best</Text>
               </View>
                       :

                        Summary[2]?.incentive > 0.75 * Summary[2]?.avgIncentive && Summary[2]?.incentive < Summary[2]?.avgIncentive ?
                        <Text style={styles.TextData}>Hi! Please try harder to earn
                        like the toppers</Text>  :

                            Summary[2]?.incentive >= Summary[2]?.avgIncentive ?
                                <View style={{ margin: 15, }}>
                                    <Text style={styles.TextData}>Congrats! Your <Text style={[styles.TextData, { fontFamily: FONTS.FontSemiB }]}>monthly earnings </Text>are in</Text>
                                    <Text style={styles.TextData}>the top 10%. Do more to stay there!</Text>
                                </View> : null}


            </>
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
                    //barStyle={{height:160,width:20}}
                    // yAxisIndicesColor={'red'}
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
                    maxValue={20000}
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