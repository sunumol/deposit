// import React from 'react';
// import {
//     View,
//     Image,
//     Dimensions,
//     StyleSheet,
//     Text
// } from 'react-native';
// import { useTranslation } from 'react-i18next';
// import { COLORS, FONTS } from '../../../Constants/Constants';
// const { height, width } = Dimensions.get('screen');


// const TargetLoad = () => {
//     const { t } = useTranslation();


//     return (
//         <View style={{}}>
//             <View>
//          
//             </View>
//         </View>
//     )
// }

// export default TargetLoad;

// const styles = StyleSheet.create({
//   goalText:{
//       fontSize:12,
//       fontFamily:FONTS.FontSemiB,
//       color:COLORS.colorB,
//       marginBottom:3
//   },
//   Desc1:{
//       fontSize:14,
//       color:COLORS.colorDark,
//       fontFamily:FONTS.FontRegular
//   }
// })

import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    FlatList
} from 'react-native';
import { COLORS, FONTS } from '../../../Constants/Constants';
import { useTranslation } from 'react-i18next';
import { PieChart } from "react-native-gifted-charts";
const { height, width } = Dimensions.get('screen');
import Pie from 'react-native-pie';
const pieData = [
    {value: 70, color: 'rgba(0, 56, 116, 0.1)',},
    {value: 30, color: 'rgba(0, 56, 116, 1)'}
];

const graphicColor = ['rgba(0, 56, 116, 1)', 'rgba(0, 56, 116, 0.1)'];

const TargetLoader = () => {
    const { t } = useTranslation();

 
    return (
        <View style={{flexDirection:'row',}}>

            <View style={{marginTop:20,marginLeft:16}}>
            <PieChart
                donut
                radius={35}
                innerRadius={25}
                data={pieData}
               
                centerLabelComponent={() => {
                return <Text style={{fontSize: 14,color:COLORS.colorDark}}>20%</Text>;
                }}
            />
            </View>
            <View style={{marginTop:width*0.08,left:10}}>
                     <Text style={styles.goalText}>Monthly Goal</Text>
                     <Text style={styles.Desc1}>Great start <Text style={[styles.Desc1,{fontFamily:FONTS.FontSemiB}]}>Athira,</Text> let’s find 25 more</Text>
                    <Text style={styles.Desc1}>loans to reach your milestone</Text>
                 </View>

             
            {/* <Pie
              radius={80}
              innerRadius={75}
              strokeCap={'butt'}
              dividerSize={2}
              sections={[
                {
                  percentage: 60,
                  color: '#f00',
                },
              ]}
              backgroundColor="#ddd"
            />
            <View style={styles.gauge}>
              <Text style={styles.gaugeText}>
                60%
              </Text>
            </View> */}
         
        </View>
    )
}

export default TargetLoader;
const styles = StyleSheet.create({
    loanContainer: {
        backgroundColor: COLORS.colorBackground,
        marginTop: 20,
        borderRadius: 15,
        paddingLeft: 20,
        shadowColor: 'rgba(0, 0, 0, 0.4)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        elevation: 3,
        shadowRadius: 7,
        borderWidth: 1,
        borderColor: COLORS.colorBorder,
        paddingVertical: 16,

    },
    headerText: {
        fontFamily: FONTS.FontSemiB,
        fontSize: 12,
        color: COLORS.colorDark
    },
    goalText: {
        fontSize: 12,
        fontFamily: FONTS.FontSemiB,
        color: COLORS.colorB,
        marginBottom: 3
    },
    Desc1: {
        fontSize: 14,
        color: COLORS.colorDark,
        fontFamily: FONTS.FontRegular
    }
})