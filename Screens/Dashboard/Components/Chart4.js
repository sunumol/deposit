import React from 'react';
import { View, Text, StyleSheet,Dimensions } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
// import { styles } from 'react-native-gifted-charts/src/BarChart/styles';
import { COLORS, FONTS } from '../../../Constants/Constants';
const { height, width } = Dimensions.get('screen');

const GroupedBars4 = () => {
    const barData = [
        {
            value: 48,
            label: '    March',
            spacing:6,
            labelWidth: 100,
          //  labelTextStyle: { color: 'gray',fontSize:12 },
            frontColor: 'rgba(88, 84, 247, 1)',
            topLabelComponent: () => (

                <Text style={{ top: -6, fontSize: 10, color: 'rgba(128, 128, 128, 1)', fontFamily: FONTS.FontRegular, }}>48</Text>

            )

        },
        { value: 55, frontColor:'rgba(176, 195, 230, 1)' ,
        topLabelComponent: () => (

            <Text style={{ top: -6, fontSize: 10, color: 'rgba(128, 128, 128, 1)', fontFamily: FONTS.FontRegular, }}>55</Text>

        )},
        {
            value: 55,
            label: '      April',
            spacing: 6,
            labelWidth: 100,
           // labelTextStyle: { color: 'gray',fontSize:12 },
            frontColor: 'rgba(88, 84, 247, 1)',
            topLabelComponent: () => (

                <Text style={{ top: -6, fontSize: 10, color: 'rgba(128, 128, 128, 1)', fontFamily: FONTS.FontRegular, }}>55</Text>

            )
        },
        { value: 55, frontColor:'rgba(176, 195, 230, 1)',
        topLabelComponent: () => (

            <Text style={{ top: -6, fontSize: 10, color: 'rgba(128, 128, 128, 1)', fontFamily: FONTS.FontRegular, }}>55</Text>

        ) },
        {
            value: 54,
            label: '      May',
            spacing: 6,
            labelWidth:100,
           // labelTextStyle: { color: 'gray',fontSize:12 ,},
            frontColor: 'rgba(88, 84, 247, 1)',
            topLabelComponent: () => (

                <Text style={{ top: -6, fontSize: 10, color: 'rgba(128, 128, 128, 1)', fontFamily: FONTS.FontRegular, }}>54</Text>

            )
        },
      
 
        { value: 55,frontColor:'rgba(176, 195, 230, 1)' ,
        topLabelComponent: () => (

            <Text style={{ top: -6, fontSize: 10, color: 'rgba(128, 128, 128, 1)', fontFamily: FONTS.FontRegular, }}>55</Text>

        )},
  
      
     
    ];

    const renderTitle = () => {
        return (
            <View style={{ margin:15 }}>
                <Text style={styles.TextData}>Uh-oh! your <Text style={[styles.TextData, { fontFamily: FONTS.FontSemiB }]}>last 3 month’s leads to customer</Text></Text>
                <Text style={[styles.TextData,{ fontFamily: FONTS.FontSemiB }]}>conversion <Text style={styles.TextData}>is low compared to the toppers</Text></Text>
            </View>
        )
    }

    return (
        <View style={{alignItems:'center',justifyContent:'center'}}>
        <View
            style={{
                backgroundColor: COLORS.colorBackground,
               borderRadius:8,
               
               marginTop:20,
               shadowColor: 'rgba(0, 0, 0, 0.4)',
               shadowOffset: { width: 0, height: 1 },
               shadowOpacity: 0.5,
               elevation: 3,
               shadowRadius: 7,
               borderWidth: 1,
               borderColor: COLORS.colorBorder,
               width:width*0.90
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
                yAxisLabelTexts={[' ', '20', '40', '60', '80']}
                
                xAxisIndicesColor={'#E5E7FA'}
                xAxisColor={'rgba(128, 128, 128, 1)'}
                yAxisColor={'rgba(128, 128, 128, 1)'}
                xAxisThickness={1}
                yAxisThickness={1}
                yAxisTextStyle={{ color: 'gray' }}
                xAxisLabelTextStyle={{color:'rgba(128, 128, 128, 1)',fontSize:12,fontFamily:FONTS.FontRegular,}}
                noOfSections={4}
                maxValue={80}
                height={100}
                initialSpacing={22}
                width={width*0.72}
               
            
            />
        </View>
        </View>
    );
};

export default GroupedBars4;

const styles = StyleSheet.create({
    TextData: {
        fontSize: 13,
        color: COLORS.colorB,
        fontFamily: FONTS.FontRegular
    }
})