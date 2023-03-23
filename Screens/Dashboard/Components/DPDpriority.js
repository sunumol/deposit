import React,{useState} from 'react';
import {
    View,
    Image,
    Dimensions,
    StyleSheet,
    Text,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { useTranslation } from 'react-i18next';
const { height, width } = Dimensions.get('screen');
import { FONTS, COLORS } from '../../../Constants/Constants';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Image1 from '../../../assets/image/case.svg';
import Icon3 from 'react-native-vector-icons/MaterialIcons';

import ModalSort from './ModalSort';

const DPDPriority = () => {
    const { t } = useTranslation();
    const [ModalVisible,setModalVisible] = useState(false)  
    const [sorts, setSorts] = useState('')
    const Customer = [
        {
            id: 1,
            Name: 'Anjana Thomas',
            Initial: 'AT',
            Location: 'CSEZ',
            Date: '77',
            Amount: '₹7,454',
            color: 'rgba(200, 151, 148, 1)'
        },
        {
            id: 2,
            Name: 'Aiswarya Thomas',
            Initial: 'AT',
            Location: 'CSEZ',
            Date: '09',
            Amount: '₹5,000',
            color: 'rgba(148, 166, 200, 1)'
        },
        {
            id: 3,
            Name: 'Naufiya Mohammed',
            Initial: 'NM',
            Location: 'CSEZ',
            Date: '05',
            Amount: '₹2,878',
            color: 'rgba(148, 200, 150, 1)'
        },
    ]
    return (
        <View>


            <View style={{ flexDirection: 'row' ,justifyContent:'space-between',marginRight:width*0.05,marginTop:width*0.032}}>
                <Text style={styles.NameText}>Priority cases</Text>

                <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <View style={{ flexDirection: 'row', }}>
                            <Text style={styles.TextSort}>{t('common:Sort')}</Text>
                            <Icon3
                                name="keyboard-arrow-down"
                                size={20}
                                color={COLORS.colorB}
                            />
                        </View>
                    </TouchableOpacity>

            </View>
  
            <View style={{alignItems:'center'}}>
                {Customer.map((item) => {
                    return (
                        <View style={styles.CustomerCard}>
                                 
                            <View style={[styles.CardInit, { backgroundColor: item.color }]}>
                                <Text style={styles.InitialText}>{item.Initial}</Text>
                            </View>
                   
                             
                                <View style={{ flexDirection: 'column', marginLeft: width * 0.03 }}>
                                    <Text style={styles.NameText1}>{item.Name}</Text>
                                    <View style={{ flexDirection: 'row', }}>
                                        <View style={{ paddingTop: 5, paddingRight: 1 }}>
                                            <Icon1 name="location-outline" color={"black"} />
                                        </View>
                                        <Text style={[styles.NameText1, { paddingTop: 4, fontFamily: FONTS.FontRegular }]}>{item.Location}</Text>
                                    </View>
                                    </View> 
                                      <View style={{ flexDirection: 'column',alignItems:'flex-end',flex:1,marginRight:width*0.05
                             }}>
                                    <View style={{flexDirection:'row',}}>
                                        <Image1 style={{marginTop:3}}/>
                                        <Text style={[styles.DateText,{marginLeft:5}]}>{item.Date}</Text>
                                    </View>
                                    <Text style={[styles.DateText]}>{item.Amount}</Text>
                                                   
                            </View>  
                            
                   
                        </View>
                    )
                })}
            </View>
            <ModalSort
                ModalVisible={ModalVisible}
                onPressOut={() => setModalVisible(!ModalVisible)}
                setModalVisible={setModalVisible}
                setSortData={setSorts}
               // sortFunction={Sort()}
            />
        
        </View>
    )
}

export default DPDPriority;

const styles = StyleSheet.create({
    Target: {
        fontFamily: FONTS.FontSemiB,
        color: 'rgba(35, 31, 32, 1)',
        fontSize: 14,
        marginBottom: 6
    },
    Card: {
        backgroundColor: COLORS.colorBackground,
        width: width * 0.43,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        elevation: 5,
        shadowRadius: 1,
        alignItems: 'center',
        margin: 8,


    },
    CircleView: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: COLORS.colorB,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 9
    },
    NameText: {
        fontSize: 14,
        color: COLORS.colorDark,
        fontFamily: FONTS.FontSemiB,
        marginLeft: width*0.05,
        marginBottom:10,
        marginTop: width * 0.01
    },
    MonthText: {
        fontSize: 32,
        color: COLORS.colorB,
        fontFamily: FONTS.FontSemiB,
        color: 'rgba(235, 87, 87, 1)'
    },
    CustomerCard: {
        width: width * 0.90,
        backgroundColor: COLORS.colorBackground,
        height: width * 0.22,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        elevation: 5,
        shadowRadius: 1,
        marginBottom: width * 0.045,
        alignItems: 'center',
        // justifyContent:'center',
        flexDirection: 'row'

    },
    CardInit: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: width * 0.03,
        flexDirection: 'column'

    },
    InitialText: {
        fontSize: 14,
        color: COLORS.colorBackground,
        fontFamily: FONTS.FontSemiB
    },
    NameText1: {
        fontSize: 12,
        color: COLORS.colorDark,
        fontFamily: FONTS.FontSemiB
    },
    DateText: {
        color: 'rgba(235, 87, 87, 1)',
        fontFamily: FONTS.FontSemiB,
        fontSize: 12
    },
    TextSort: {
        fontSize: 14,
        color: COLORS.colorB,
        fontFamily: FONTS.FontSemiB
    },
})