import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
// import { styles } from 'react-native-gifted-charts/src/BarChart/styles';
import { COLORS, FONTS } from '../../../Constants/Constants';
const { height, width } = Dimensions.get('screen');

const GroupedBars2 = ({ Summary }) => {
    const barData = [
        {
            value: Summary[0]?.customersToLoanClientConversion,
            label: '  ' + Summary[0]?.month,
            spacing: 6,
            labelWidth: 100,
            //  labelTextStyle: { color: 'gray',fontSize:12 },
            frontColor: 'rgba(88, 84, 247, 1)',
            topLabelComponent: () => (

                <Text style={{ top: -6, fontSize: 10, color: 'rgba(128, 128, 128, 1)', fontFamily: FONTS.FontRegular, }}>{Summary[0]?.customersToLoanClientConversion}</Text>

            )

        },
        {
            value: Summary[0]?.avgCustomersToLoanClientConversion, frontColor: 'rgba(176, 195, 230, 1)',
            topLabelComponent: () => (

                <Text style={{ top: -6, fontSize: 10, color: 'rgba(128, 128, 128, 1)', fontFamily: FONTS.FontRegular, }}>{Summary[0]?.avgCustomersToLoanClientConversion}</Text>

            )
        },
        {
            value: Summary[1]?.customersToLoanClientConversion,
            label: '  ' + Summary[1]?.month,
            spacing: 6,
            labelWidth: 100,
            // labelTextStyle: { color: 'gray',fontSize:12 },
            frontColor: 'rgba(88, 84, 247, 1)',
            topLabelComponent: () => (

                <Text style={{ top: -6, fontSize: 10, color: 'rgba(128, 128, 128, 1)', fontFamily: FONTS.FontRegular, }}>{Summary[1]?.customersToLoanClientConversion}</Text>

            )
        },
        {
            value: Summary[1]?.avgCustomersToLoanClientConversion, frontColor: 'rgba(176, 195, 230, 1)',
            topLabelComponent: () => (

                <Text style={{ top: -6, fontSize: 10, color: 'rgba(128, 128, 128, 1)', fontFamily: FONTS.FontRegular, }}>{Summary[1]?.avgCustomersToLoanClientConversion}</Text>

            )
        },
        {
            value: Summary[2]?.customersToLoanClientConversion,
            label: '    ' + Summary[2]?.month,
            spacing: 6,
            labelWidth: 100,
            // labelTextStyle: { color: 'gray',fontSize:12 ,},
            frontColor: 'rgba(88, 84, 247, 1)',
            topLabelComponent: () => (

                <Text style={{ top: -6, fontSize: 10, color: 'rgba(128, 128, 128, 1)', fontFamily: FONTS.FontRegular, }}>{Summary[2]?.customersToLoanClientConversion}</Text>

            )
        },


        {
            value: Summary[2]?.avgCustomersToLoanClientConversion, frontColor: 'rgba(176, 195, 230, 1)',
            topLabelComponent: () => (

                <Text style={{ top: -6, fontSize: 10, color: 'rgba(128, 128, 128, 1)', fontFamily: FONTS.FontRegular, }}>{Summary[2]?.avgCustomersToLoanClientConversion}</Text>

            )
        },



    ];

    const renderTitle = () => {
        return (
            <>
                {Summary[2]?.customersToLoanClientConversion <= Summary[2]?.avgCustomersToLoanClientConversion ?
                <View style={{ margin: 15 }}>
                    <Text style={styles.TextData}>Yay! Your<Text style={[styles.TextData, { fontFamily: FONTS.FontSemiB }]}> Customers to Loan Clients conversion</Text> is good. Keep it up</Text>
                </View>:
                <View style={{ margin: 15 }}>
                    <Text style={styles.TextData}>Hi! Improve your<Text style={[styles.TextData, { fontFamily: FONTS.FontSemiB }]}> Customers to Loan Clients conversion </Text>to earn more</Text>
                </View>}
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
                    disableScroll={true}

                    hideRules
                    yAxisLabelTexts={[' ', '20', '40', '60', '80']}

                    xAxisIndicesColor={'#E5E7FA'}
                    xAxisColor={'rgba(128, 128, 128, 1)'}
                    yAxisColor={'rgba(128, 128, 128, 1)'}
                    xAxisThickness={1}
                    yAxisThickness={1}
                    yAxisTextStyle={{ color: 'gray' }}
                    xAxisLabelTextStyle={{ color: 'rgba(128, 128, 128, 1)', fontSize: 12, fontFamily: FONTS.FontRegular, }}
                    noOfSections={4}
                    maxValue={80}
                    height={100}
                    initialSpacing={22}
                    width={width * 0.72}


                />
            </View>
        </View>
    );
};

export default GroupedBars2;

const styles = StyleSheet.create({
    TextData: {
        fontSize: 13,
        color: COLORS.colorB,
        fontFamily: FONTS.FontRegular
    }
})