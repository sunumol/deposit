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
    { value: 70, color: 'rgba(0, 56, 116, 0.1)', },
    { value: 30, color: 'rgba(0, 56, 116, 1)' }
];

const graphicColor = ['rgba(0, 56, 116, 1)', 'rgba(0, 56, 116, 0.1)'];

const TargetLoader = ({ Target }) => {
    console.log("target", Target)
    const { t } = useTranslation();

    const pieData = [
        { value: 100 - Target, color: 'rgba(0, 56, 116, 0.1)', },
        { value: Target, color: 'rgba(0, 56, 116, 1)' }
    ];

    return (
        <View style={{ flexDirection: 'row', }}>

            <View style={{ marginTop: 20, marginLeft: 16 }}>
                <PieChart
                    donut
                    radius={35}
                    innerRadius={25}
                    data={pieData}

                    centerLabelComponent={() => {
                        return <Text style={{ fontSize: 14, color: COLORS.colorDark }}>{Target}%</Text>
                    }}
                />
            </View>
            <View style={{ marginTop: width * 0.08, left: 10 }}>
                <Text style={styles.goalText}>Monthly Goal</Text>
                {Target == 0.0 ?
                    <View>
                        <Text style={styles.Desc1}>Hi<Text style={[styles.Desc1, { fontFamily: FONTS.FontSemiB }]}> Athira, </Text>
                            achieve <Text style={[styles.Desc1, { fontFamily: FONTS.FontSemiB }]}>y</Text> loans</Text>
                        <Text style={styles.Desc1}>to reach target</Text>
                    </View> : Target > 0 && Target < 80 ?
                        <View>
                            <Text style={styles.Desc1}>Hi<Text style={[styles.Desc1, { fontFamily: FONTS.FontSemiB }]}> Athira, </Text>
                                convert <Text style={[styles.Desc1, { fontFamily: FONTS.FontSemiB }]}>y</Text> more loans to</Text>
                            <Text style={styles.Desc1}>achieve target</Text>
                        </View> : Target >= 80 && Target < 100 ?
                          <View>
                          <Text style={styles.Desc1}>Hi <Text style={[styles.Desc1, { fontFamily: FONTS.FontSemiB }]}> Athira, </Text>
                              only <Text style={[styles.Desc1, { fontFamily: FONTS.FontSemiB }]}>y</Text> more loans to </Text>
                          <Text style={styles.Desc1}>go to reach target</Text>
                      </View>:Target >= 100 ? 
                         <View>
                         <Text style={styles.Desc1}>Congrats<Text style={[styles.Desc1, { fontFamily: FONTS.FontSemiB }]}> Athira, </Text>
                         for achieving</Text>
                         <Text style={styles.Desc1}>target</Text>
                    
                     </View>:null
                        }
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