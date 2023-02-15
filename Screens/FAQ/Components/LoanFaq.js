
import React, { useState } from 'react';
import {
    View,
    Image,
    Dimensions,
    StyleSheet,
    Text,
    FlatList,
    TouchableWithoutFeedback,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';


import Icon from 'react-native-vector-icons/Entypo'
import { COLORS, FONTS } from '../../../Constants/Constants';
const { height, width } = Dimensions.get('screen');


const LoanFaq = () => {

    const [Expanded, setExpanded] = useState(false)
    const [Index, setIndex] = useState(null)
    const Data = [
        {
            id: 1,
            title: 'What platforms does Svadhan support',
            Description: 'Svadhan is an Instant Personal Loan platform for individuals, where you can apply for a Loan of upto ₹5 Lakh. Svadhan acts as a technology intermediary and facilitates this Personal Loans from regulated lenders to individuals.',
            Expanded: false
        },
        {
            id: 2,
            title: 'What are the documents I must submit for\nthe Personal Loan',
            Description: 'Svadhan is an Instant Personal Loan platform for individuals, where you can apply for a Loan of upto ₹5 Lakh. Svadhan acts as a technology intermediary and facilitates this Personal Loans from regulated lenders to individuals.'
        },
        {
            id: 3,
            title: 'Do I need to upload the KYC documents\nevery time I take a loan through Svadhan?',
            Description: 'Svadhan is an Instant Personal Loan platform for individuals, where you can apply for a Loan of upto ₹5 Lakh. Svadhan acts as a technology intermediary and facilitates this Personal Loans from regulated lenders to individuals.'
        },
        {
            id: 4,
            title: 'What do you mean by mobile linked with Aadhar?',
            Description: 'Svadhan is an Instant Personal Loan platform for individuals, where you can apply for a Loan of upto ₹5 Lakh. Svadhan acts as a technology intermediary and facilitates this Personal Loans from regulated lenders to individuals.'
        },


    ]

    const OnExpanded = (Expanded) => {
        if (Expanded == false)
            setExpanded(true)
        else {
            setExpanded(false)
        }
    }

    const view = (

        <View>
            {Data.map((item) => {
                return (
                    <View>
                        <Text>{item.Description}</Text>
                    </View>
                )
            })}

        </View>
    )

    return (
        <View style={{ justifyContent: 'center' }}>
            <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', paddingTop: width * 0.05 }}>
                <Text style={{ fontSize: 14, color: COLORS.colorB, fontFamily: FONTS.FontSemiB, paddingBottom: 10 }}>Loan Application</Text>
            </View>
            <FlatList
                data={Data}
                keyExtractor={(item, index) => {

                    return index.toString();
                }}
                renderItem={({ item, index }) => {

                    return (
                        <View style={{ justifyContent: 'center' }}>

                            <TouchableOpacity onPress={() => setIndex(index === Index ? null : index)}>
                                <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingTop: width * 0.03, paddingBottom: width * 0.03 }}>

                                    <Text style={{ fontFamily: FONTS.FontRegular, fontSize: 12, color: "#1A051D" }}>{item.title}</Text>
                                    <Icon name={index === Index ? "chevron-up" : "chevron-down"} color={COLORS.colorB} size={18} />

                                </View>
                            </TouchableOpacity>
                            {index === Index ?
                                <View style={{
                                    width: width * 0.88, height: width * 0.18, backgroundColor: 'rgba(242, 242, 242, 0.5)', paddingLeft: width * 0.02,
                                    borderRadius: 6, alignItems: 'center', justifyContent: 'center', marginBottom: width * 0.02, paddingRight: width * 0.02
                                }}>
                                    <Text style={{ fontFamily: FONTS.FontRegular, fontSize: 10, color: "#1A051D" }}>{item.Description}</Text>
                                </View> : null}



                            <View style={{ borderColor: 'rgba(242, 242, 242, 1)', borderBottomWidth: 1 }} />
                        </View>
                    )
                }} />
        </View>
    )
}

export default LoanFaq;