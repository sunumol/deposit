import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Dimensions,
    TouchableOpacity,
    ScrollView
} from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
//import Image1 from '../../../assets/image/BANK1.svg';
import { FONTS, COLORS } from '../../../Constants/Constants';
import { VictoryPie } from 'victory-native';
import Image1 from '../../../assets/image/a1.svg';
import Image2 from '../../../assets/image/a2.svg';
import Image3 from '../../../assets/image/a3.svg';
import Chart from './Chart';
const { height, width } = Dimensions.get('screen');

const Trend = ({ navigation }) => {
    const graphicData = [
        { y: 15724, x: '₹15,724' },
        { y: 31172, x: '₹31,172' },

    ];

    const graphicData1 = [
        { y: 27724, x: '₹15,724' },
        { y: 32172, x: '₹31,172' },

    ];
    const graphicColor = ['#184261', '#39B66B',];


    const datas = [
        { value: 15724, color: '#184261', text: 'Paid by TC Member' },
        { value: 31172, color: '#39B66B', text: 'Paid by self' },

    ];

    const datas1 = [
        { value: 20724, color: '#184261', text: 'Cash' },
        { value: 41172, color: '#39B66B', text: 'Digital' },

    ];

    return (

        <>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.mainContainer}>

                    <Chart />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                        <View style={styles.Cards}>
                            <Image1 top={2} />
                            <Text style={styles.Call}>Calls</Text>
                            <Text style={styles.numText}>04</Text>
                        </View>

                        <View style={styles.Cards}>
                            <Image2 top={2} />
                            <Text style={styles.Call}>Visits</Text>
                            <Text style={styles.numText}>03</Text>
                        </View>

                        <View style={styles.Cards}>
                            <Image3 top={2} />
                            <Text style={styles.Call}>DPD</Text>
                            <Text style={styles.numText}>12</Text>
                        </View>
                    </View>

                    <View style={{ alignItems: 'center',marginBottom:10 }}>
                        <View style={styles.ViewCard}>
                            <View style={{ margin: width * 0.05, top: -5 }}>
                                <Text style={styles.payText}>Payment Overview</Text>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <View style={{}}>
                                    <View style={{ left: -245 }}>
                                        <VictoryPie
                                            data={graphicData}
                                            colorScale={graphicColor}
                                            // width={400}
                                            height={Dimensions.get('window').height * 0.20}
                                            innerRadius={0}
                                            style={{
                                                alignItems: 'flex-start',
                                                labels: {
                                                    fill: COLORS.colorDark, fontSize: 12, padding: 5, fontFamily: FONTS.FontRegular
                                                },
                                            }}
                                        />
                                    </View>

                                 
                                    <View style={{ left: -127, top: -25 }}>
                                        <FlatList
                                            data={datas}
                                            renderItem={({ item, index }) => {
                                                return (
                                                    <View key={index} style={{ flexDirection: 'row', marginTop: 7, width: '48%' }}>
                                                        <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: item.color, marginTop: 3 }} />
                                                        <Text style={{ fontSize: 11, fontFamily: FONTS.FontRegular, color: COLORS.Black, paddingLeft: 10 }}>{item.text}</Text>
                                                    </View>
                                                )
                                            }}
                                            keyExtractor={item => item.id}
                                            numColumns={1}

                                        />
                                    </View>



                                </View>

                                <View style={{left:-340}}>
                                <View style={styles.verticleLine}/>
                                </View>

                                <View style={{}}>
                                    <View style={{ left: -455 }}>
                                        <VictoryPie
                                            data={graphicData1}
                                            colorScale={graphicColor}
                                            // width={400}
                                            
                                            height={Dimensions.get('window').height * 0.20}
                                            innerRadius={0}
                                            style={{
                                                alignItems: 'flex-start',
                                                labels: {
                                                    fill: COLORS.colorDark, fontSize: 12, padding: 5, fontFamily: FONTS.FontRegular,

                                                },
                                            }}
                                        />
                                    </View>

                                    <View style={{ left: -337, top: -25 }}>
                                        <FlatList
                                            data={datas1}
                                            renderItem={({ item, index }) => {
                                                return (
                                                    <View key={index} style={{ flexDirection: 'row', marginTop: 7, width: '48%' }}>
                                                        <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: item.color, marginTop: 3 }} />
                                                        <Text style={{ fontSize: 11, fontFamily: FONTS.FontRegular, color: COLORS.Black, paddingLeft: 10 }}>{item.text}</Text>
                                                    </View>
                                                )
                                            }}
                                            keyExtractor={item => item.id}
                                            numColumns={1}

                                        />
                                    </View>
                                </View>
                            </View>
                        </View></View>
                </View>
            </ScrollView>
        </>
    )
}

export default Trend;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        // padding: 10,
        backgroundColor: COLORS.colorBackground,
        //alignItems: 'center'
    },
    ViewCard: {
        width: width * 0.86,
        height: width * 0.50,
        backgroundColor: COLORS.colorBackground,
        elevation: 2,
        // alignItems: 'center',
        flexDirection: 'row',
        // justifyContent: 'center',
        borderRadius: 15,
        shadowColor: '#000000',
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10
    },
    payText: {
        fontSize: 12,
        fontFamily: FONTS.FontSemiB,
        color: COLORS.colorDark
    },
    Cards: {
        borderWidth: 1,
        borderColor: '#F2F2F2',
        width: width * 0.25,
        height: width * 0.27,
        backgroundColor: COLORS.colorBackground,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    Call: {
        fontSize: 12,
        fontFamily: FONTS.FontSemiB,
        color: '#3B3D43',
        marginTop: 8
    },
    numText: {
        fontSize: 14,
        color: '#EB5757',
        fontFamily: FONTS.FontSemiB,
        marginTop: 8
    },
    verticleLine: {
        
        borderRightWidth: 1,
        borderColor: '#C4C4C4',
        marginTop:width*0.08,
        borderStyle: 'dashed',
        height: '75%',
        left:-10
    
    },

})