import React,{useEffect,useState} from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView ,ActivityIndicator} from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
// import { styles } from 'react-native-gifted-charts/src/BarChart/styles';
import { COLORS, FONTS } from '../../../Constants/Constants';
const { height, width } = Dimensions.get('screen');
import { api } from '../../../Services/Api';
import Chart1 from './Chart1';
import Chart2 from './Chart2';
import Chart3 from './Chart3';
import Chart4 from './Chart4';

const Summary = () => {
    
    const [EMPID, setEMPID] = useState('1')
    const [summary,setSummary] = useState([])
    const [Status,setStatus] = useState(true)
    useEffect(()=>{
        getSummary()
    },[])

    const getSummary = () => {
        console.log("inside api")
        api.DashBoardSummary(EMPID).then(result => {
            if (result) {
                console.log("summary....", result.data.body)
                setSummary(result?.data?.body)
                setStatus(false)
               
              } 
        })
            .catch(err => {
                console.log("banner 3333 ---->", err);
                setStatus(false)
            });
    }

    return (
        <>
         {Status ?
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, }}>
                    <ActivityIndicator size={30} color={COLORS.colorB} />
                </View> :
  
        <View style={{ alignItems: 'center', justifyContent: 'center',backgroundColor:COLORS.colorBackground,flex:1 }}>
              <ScrollView showsVerticalScrollIndicator={false}>
            <Chart1 Summary={summary}/>
            <Chart2 Summary={summary}/>
            <Chart3 Summary={summary}/> 
            {/* <Chart4 /> */}
         </ScrollView>
        </View>}
        </>
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