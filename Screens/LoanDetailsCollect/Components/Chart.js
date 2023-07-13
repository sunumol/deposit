import {
    StyleSheet,
    Text,
    View,
    BackHandler,
    StatusBar,
    SafeAreaView,
    Platform,
    TextInput,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Image1 from '../../../assets/image/dig.svg';
import { FONTS, COLORS } from '../../../Constants/Constants';
import { VictoryChart, VictoryBar, Bar, handleMouseOver, onMouseOver } from 'victory-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { BarChart } from "react-native-gifted-charts";
import { color } from 'react-native-elements/dist/helpers';
import moment from 'moment/moment';
const { height, width } = Dimensions.get('screen');

const Chart = ({ navigation,loandetails ,setRange}) => {
    console.log('chart======>>>',loandetails)
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('6')
    const [items, setItems] = useState([
        { id: 1, label: '6 Months', value: '6' },
        { id: 2, label: '3 Months', value: '3' },
        { id: 3, label: '1 Month', value: '1' }]);

        const [dataSet, setDataSet] = useState([])

    const barData = [
        {
            value: 15,
            label: 'Aug',
            frontColor: '#E96B6B',
            spacing: 40,
            labelTextStyle: { color: '#808080', fontSize: 12, fontFamily: FONTS.FontRegular },
            topLabelComponent: () => (

                <Text style={{ top: -5, fontSize: 9, color: COLORS.colorDark, fontFamily: FONTS.FontRegular }}>10</Text>

            )
        },
        {
            value: 15,
            label: 'Sep',
            frontColor: '#7DB091',
            spacing: 40,
            labelTextStyle: { color: '#808080', fontSize: 12, fontFamily: FONTS.FontRegular },
        },
        {
            value: 20,
            label: 'Oct',
            frontColor: '#E96B6B',
            spacing: 40,
            labelTextStyle: { color: '#808080', fontSize: 12, fontFamily: FONTS.FontRegular },
            topLabelComponent: () => (

                <Text style={{ top: -6, fontSize: 9, color: COLORS.colorDark, fontFamily: FONTS.FontRegular, }}>4</Text>

            )
        },
        {
            value: 13,
            label: 'Nov',
            frontColor: '#7DB091',
            spacing: 40,
            labelTextStyle: { color: '#808080', fontSize: 12, fontFamily: FONTS.FontRegular },

        },
        {
            value: 28,
            label: 'Dec',
            spacing: 40,
            frontColor: '#E96B6B',
            labelTextStyle: { color: '#808080', fontSize: 12, fontFamily: FONTS.FontRegular },
            topLabelComponent: () => (

                <Text style={{ top: -6, fontSize: 9, color: COLORS.colorDark, fontFamily: FONTS.FontRegular, }}>13</Text>

            )



        },
        // {value: 20, label: 'Dec', frontColor:'#E96B6B'},
        {
            value: 12,
            label: 'Jan',
            frontColor: '#7DB091',
            spacing: 40,
            labelTextStyle: { color: '#808080', fontSize: 12, fontFamily: FONTS.FontRegular },
        },

    ];
{console.log(dataSet,'jjkjkjkjk')}
useEffect(()=>{
    console.log('SORT--------------',value)
    setRange(value)
},[value])

useEffect(() => {
    console.log('chart======>>>2222222222',loandetails)

    const Datas = [];
    loandetails?.map((item,index)=>{
        Datas.push({
                value:(JSON.parse(moment(item?.data[0]?.dueDate).format('D')))+5,
                label:  item?.data[0]?.month?.slice(0,3),
                frontColor: item?.data[0]?.dpd > 0 ? '#E96B6B' : '#7DB091',
                spacing: 40,
                labelTextStyle: { color: '#808080', fontSize: 12, fontFamily: FONTS.FontRegular },
                topLabelComponent: () => (
        
                    <Text style={{ top: -6, fontSize: 9, color: COLORS.colorDark, fontFamily: FONTS.FontRegular, }}>{item?.data[0]?.dpd > 0 ? item?.data[0]?.dpd  :''}</Text>
        
                )
                })
    })
    console.log('chart======>>>77777',Datas)
    setDataSet(Datas)

  }, [loandetails]);


    const barData1 = [{ value: 15 }, { value: 30 }, { value: 26 }, { value: 40 }];
    return (

        <>

            <View style={styles.mainContainer}>

                <View style={{ flexDirection: 'row', marginBottom: 30, marginTop: 20, marginLeft: 10, justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', }} >
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.Round} />
                            <Text style={styles.onTime}>Ontime</Text>

                        </View>

                        <View style={{ flexDirection: 'row', marginLeft: 20 }}>
                            <View style={[styles.Round, { backgroundColor: '#E96B6B' }]} />
                            <Text style={styles.onTime}>Late</Text>
                        </View>
                    </View>
{console.log('-------jjjj---',value)}
                    <View style={{ justifyContent: 'center',
                     width: width * 0.29, height: width * 0.03 }}>
                        <DropDownPicker
                            open={open}
                            value={value}
                            
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            itemSeparator={true}
                            showTickIcon={false}
                            required={true}
                            items={items?.map(item => ({ label: item?.label, value: item?.value, id: item.id }))}
                            onChangeItem={item => setValue({
                                country: item?.value
                            },

                            )
                            }
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderColor: '#ECEBED',
                                backgroundColor: '#FCFCFC',
                                width: width * 0.26,
                                flexDirection: 'row',
                                minHeight: 35,
                                

                            }}
                            textStyle={{
                                fontFamily: FONTS.FontRegular,
                                fontSize: 10,
                                color: '#808080',
                                top: value === '6 Months' || value === '1 Month' ? 0 : -1,


                            }}

                            placeholderStyle={{
                                color: "#000000",
                                fontFamily: 'Roboto-Regular',
                                fontSize: 12,
                                marginLeft: 5
                            }}

                            arrowIconStyle={{
                                tintColor: '#808080',
                                marginRight: -2,
                                width: 15,
                                height: 15

                            }}
                            dropDownContainerStyle={{
                                backgroundColor: "#FCFCFC",
                                borderColor: '#ECEBED',
                                width: width * 0.26,

                            }}
                            labelStyle={{
                                color: '#808080'
                            }}
                            itemSeparatorStyle={{
                                backgroundColor: "#F2F2F2"
                            }}
                        />
                    </View>
                </View>

            


<BarChart
                    barWidth={12}
                    noOfSections={5}
                    maxValue={30}
                    barBorderRadius={10}
                    frontColor="lightgray"
                    data={dataSet}
                    initialSpacing={20}
                    stepValue={5}
                    yAxisLabelTexts={[' ',' ', '05', '10', '15', '30']}
                    yAxisThickness={0.9}
                    xAxisThickness={1}
                    height={100}
                    disableScroll={true}
                    xAxisIndicesColor={'#E5E7FA'}
                    xAxisColor={'#E5E7FA'}
                    yAxisColor={'#E5E7FA'}
                    showReferenceLine3
                    hideRules
                    showYAxisIndices
                   // showXAxisIndices
                    // yAxisIndicesColor={'red'}
                    // yAxisIndicesWidth={30}
                    // yAxisIndicesHeight={0}
                    referenceLine3Position={30}
                    referenceLine3Config={{
                        color: '#EB5757',
                        dashWidth: 2,
                        dashGap: 3,
                    }}
                // width={300}
                />

            </View>
        </>
    )
}

export default Chart;

const styles = StyleSheet.create({
    mainContainer: {
        marginBottom: 20,
        marginTop: 15
    },
    Round: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#7DB091'
    },
    onTime: {
        fontFamily: FONTS.FontRegular,
        color: '#000000',
        fontSize: 11,
        marginLeft: 5
    }

})