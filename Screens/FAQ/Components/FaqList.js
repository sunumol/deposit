
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


const FaqList = () => {

    const [Expanded, setExpanded] = useState(false)
    const [Index,setIndex] = useState(null)
    const Data = [
        {
            id: 1,
            title: 'What is Svadhan?',
            Description: 'Svadhan is an Instant Personal Loan platform for individuals, where you can apply for a Loan of upto ₹5 Lakh. Svadhan acts as a technology intermediary and facilitates this Personal Loans from regulated lenders to individuals.',
            Expanded: false
        },
        {
            id: 2,
            title: 'Who can apply for a loan in Svadhan',
            Description: 'Svadhan is an Instant Personal Loan platform for individuals, where you can apply for a Loan of upto ₹5 Lakh. Svadhan acts as a technology intermediary and facilitates this Personal Loans from regulated lenders to individuals.'
        },
        {
            id: 3,
            title: 'On what basis does Svadhan lend?',
            Description: 'Svadhan is an Instant Personal Loan platform for individuals, where you can apply for a Loan of upto ₹5 Lakh. Svadhan acts as a technology intermediary and facilitates this Personal Loans from regulated lenders to individuals.'
        },
        {
            id: 4,
            title: 'What are Svadhan Terms and Conditions?',
            Description: 'Svadhan is an Instant Personal Loan platform for individuals, where you can apply for a Loan of upto ₹5 Lakh. Svadhan acts as a technology intermediary and facilitates this Personal Loans from regulated lenders to individuals.'
        },
        {
            id: 5,
            title: 'What is Svadhan Privacy Policy?',
            Description: 'Svadhan is an Instant Personal Loan platform for individuals, where you can apply for a Loan of upto ₹5 Lakh. Svadhan acts as a technology intermediary and facilitates this Personal Loans from regulated lenders to individuals.'
        },
        {
            id: 6,
            title: 'What is the advantage of availing a loan \nthrough Svadhan over a loan directly \nfrom a bank?',
            Description: 'Svadhan is an Instant Personal Loan platform for individuals, where you can apply for a Loan of upto ₹5 Lakh. Svadhan acts as a technology intermediary and facilitates this Personal Loans from regulated lenders to individuals.'
        },
        {
            id: 7,
            title: 'Which locations can you apply for a loan \nthrough Svadhan',
            Description: 'Svadhan is an Instant Personal Loan platform for individuals, where you can apply for a Loan of upto ₹5 Lakh. Svadhan acts as a technology intermediary and facilitates this Personal Loans from regulated lenders to individuals.'

        }
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
            {Data.map((item)=>{
                return(
                    <View>
                        <Text>{item.Description}</Text>
                    </View>
                )
            })}
     
        </View>
    )

    return (
        <View style={{ justifyContent: 'center' }}>
            <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 14, color: COLORS.colorB, fontFamily: FONTS.FontSemiB ,paddingBottom:10}}>About Svadhan</Text>
            </View>
            <FlatList
                data={Data}
                keyExtractor={(item, index) => {

                    return index.toString();
                }}
                renderItem={({ item,index }) => {

                    return (
                        <View style={{justifyContent:'center'}}>
{/*             
            <SimpleAccordion viewInside={view} title={item.title} 
            showContentInsideOfCard={true} viewContainerStyle={{backgroundColor: "#E0E0E0"}}/> */}


                            {/* <ListItem.Accordion
                                content={
                                    <>

                                        <ListItem.Content>
                                            <ListItem.Title>{item.title}</ListItem.Title>
                                        </ListItem.Content>
                                    </>
                                }
                                isExpanded={Expanded}
                                onPress={() => {
                                    setExpanded(!Expanded);
                                }}
                            >

                            </ListItem.Accordion> */}
                          
                     
                          <TouchableOpacity onPress={()=>setIndex(index === Index ?  null :index)}>
                            <View style={{flexDirection:'row',justifyContent:"space-between",paddingTop:width*0.03,paddingBottom:width*0.03}}>
                           
                                            <Text style={{fontFamily:FONTS.FontRegular,fontSize:12,color:"#1A051D"}}>{item.title}</Text>
                                            <Icon name={index === Index ? "chevron-up" : "chevron-down"} color={COLORS.colorB} size={18}/>
                                      
                                            </View>
                                            </TouchableOpacity>
                                            {index === Index?
                                            <View style={{width:width*0.88,height:width*0.18,backgroundColor:'rgba(242, 242, 242, 0.5)',paddingLeft:width*0.02,
                                            borderRadius:6,alignItems:'center',justifyContent:'center',marginBottom:width*0.02,paddingRight:width*0.02}}>
                                                <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description}</Text>
                                            </View>:null} 
                            {/* <List.Section  > */}
                                                {/* <List.Accordion
                                                    title={item.title}
                                                    style={{ color: "black", fontSize: 10 ,backgroundColor:"white",left:-10}}
                                                    right={props => <List.Icon {...props} icon="down" color={COLORS.colorB} style={{left:15}}/>}
                                                    theme={{
                                                        colors: { primary: 'black' },
                                                        
                                                       backgroundColor: { primary:COLORS.colorBackground }
                                                    }}
                                                >
                                                    <List.Item
                                                        description={item.Description}
                                                        descriptionNumberOfLines={30}
                                                    />
                                                </List.Accordion>
                                            </List.Section> */}


                             
                            <View style={{ borderColor: 'rgba(242, 242, 242, 1)', borderBottomWidth: 1 }} />
                        </View>
                    )
                }} />
        </View>
    )
}

export default FaqList;