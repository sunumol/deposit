
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
            Description: 'Svadhan is India’s 1st Vernacular Microfinance Marketplace App, through which customers can take microfinance loans from regulated financial institutions like NBFCs and Banks. Svadhan is developed by Dhan Sethu DigiFin Private Limited, a startup based out of Cochin, Kerala.',
            Expanded: false
        },
        {
            id: 2,
            title: 'Who can apply for a loan in Svadhan',
            Description: 'Women who meet the following criteria are eligible to apply for a loan in Svadhan',
            Description1: '- Married/Widow/Divorcee',
            Description2: '- Age between 20 to 50 years',
            Description3: '- Staying in the address shown in Aadhaar',
        },
        {
            id: 3,
            title: 'What are the advantages of availing a loan through Svadhan?',
            Description: 'Svadhan helps customers to compare the offers from different financial institutions, so that they can choose the best offer.',
            Description1:'The entire loan process like loan application, agreement signing, loan repayment etc. could be done by the customer in Svadhan app, thus saving their valuable time.'
        },
        {
            id: 4,
            title: 'Is the loan given by Svadhan?',
            Description: 'Svadhan is only a marketplace connecting customers with lending companies. The loan is given by financial institutions registered on Svadhan and not directly by Svadhan.'
        },
        {
            id: 5,
            title: 'What is a Trust Circle?',
            Description: 'Trust Circle of each customer is made up of four other Svadhan customers who guaranty the loan taken by the customer from Svadhan.'
        },
        {
            id: 6,
            title: 'What are eligibility conditions of a Trust Circle \nmember?',
            Description: '- They should stay within 500 meters from the customer’s house',
            Description1: '- Two Trust Circle members should not stay in the same house',
            Description2: '- They should be eligible for loan as per Svadhan App',
        },
        {
            id: 7,
            title: 'What are the interest and other charges on the loans \navailed through Svadhan?',
            Description: 'Each lender might charge a different interest rate and other charges like processing fee, credit life insurance etc. The exact charges against a loan will be displayed in the “Key Facts” screen, when the customer applies for a loan. Only after verifying the charges, the customer is supposed to sign the loan agreement.'

        },
        {
            id:8,
            title:'What are the documents a customer must submit \nfor receiving a microfinance loan?',
            Description:'The photos of Voter ID and Aadhaar belonging to the customer and spouse (If any) need to be captured in Svadhan app as part of our KYC norms.',
            Description1:'In Finpower App, Svadhan Mitra shall capture the:',
            Description2:'- Home ownership proof',
            Description3:'- Photos of Voter ID and Aadhaar of the co-applicant (If different from spouse)',
            Description4:'During the Video Personal Discussion, the photo of the bank proof of the customer will also be captured by the Credit Executive.',
            Description5: 'No other documents are required.'

        },
        {
            id:9,
            title:'How can a customer apply for a loan in Svadhan?',
            Description:  '- Click the “Loans” icon on the Home screen of Svadhan App',
            Description1: '- Select the preferred loan from the options shown',
            Description2: '- Select the preferred loan amount and tenure',
            Description3: '- Select the preferred EMI date',
            Description4: '- Confirm the Key Facts shown',
            Description5: '- Digitally sign the loan agreement using OTP and customer selfie',
            Description6: '- Co-applicant to digitally sign the loan agreement using \nagreement link sent in Co-Applicant’s mobile number',
        },
        {
            id: 10,
            title: 'How will the lender transfer the loan amount \nto customer?',
            Description:'The net loan amount, after deducting the upfront charges (Like processing fees, insurance etc.) will be credited to customer’s bank account given in Svadhan by the lender.'
        },
        {
            id: 11,
            title:'Is it possible to get the loan amount \ncredited to a joint bank account?',
            Description:'No. The loan amount cannot be credited to a joint bank account.'
        },
        {
            id:12,
            title:'Does Svadhan charge any money from customers?',
            Description:'Svadhan does not charge any amount from the customers. All the loan related fees and interest are directly charged by the lending institutions.'
        },
        {
            id:13,
            title:'How safe will be customers’ personal \ndetails in Svadhan?',
            Description:'Svadhan uses highly robust technical and security measures to safeguard customer data. For more details, please refer our privacy policy. '
        },
        {
            id:14,
            title:'How can a customer repay her loan through \nSvadhan App?',
            Description:  '- Click Repay icon on Home screen of Svadhan App',
            Description1: '- Select the loan for repayment',
            Description2: '- Select “Pay total” if customer wants to pay the pending EMI amount, or “Pay in part” if customer wants to repay a lower amount',
            Description3: '- If “Pay in part” is selected, customer needs to enter the amount she wishes to repaye',
            Description4: '- Click “Proceed to pay”',
            Description5: '- UPI apps installed in customer’s phone will be displayed',
            Description6: '- Select the preferred UPI app and make the payment',
        },
        {
            id:15,
            title:'Can customer pay the EMI before the due date?',
            Description:'Yes. Customer can pay the EMI in full or partially before the EMI due date.'
        },
        {
            id:16,
            title:'Can EMI date be rescheduled or postponed?',
            Description:'Rescheduling or postponement of EMI date is not possible after the loan agreement is signed.'
        },
        {
            id:17,
            title:'Can customers repay directly using cash?',
            Description:'We do not have cash payment option for regular repayments done in Svadhan. If repayments are not done on time, the arrear collection done through Svadhan Mitra would be in cash.'
        },
        {
            id:18,
            title:'Are receipts given to customers for repayments \ndone?',
            Description:'Notifications will be received in the Svadhan App for all repayments done through Svadhan or Svadhan Mitras. All such payments will also be displayed in the loan transactions history in Svadhan App.'
        },
        {
            id:19,
            title:'How can the customer see the transactions \nhistory of a loan account?',
            Description: '- Click on the Loans icon on Home screen of Svadhan App',
            Description1: '-Select the loan',
            Description2: '- The transactions history is shown on the screen',
        },
        {
            id:20,
            title:'Can I use Svadhan App?',
            Description:'Svadhan Mitra is only allowed to use the Finpower App. Svadhan App cannot be used by a Svadhan Mitra.'
        },
        {
            id:21,
            title:'Can I do business in any Pin Codes?',
            Description:'No. A Svadhan Mitra can do business only in the Pin Codes assigned to them. '
        },
        {
            id:22,
            title:'How do I create a Lead?',
            Description: '- Click “New Lead” on Home screen of Finpower App',
            Description1: '- Enter the details requested',
            Description2: '- Click “Confirm”',
        },
        {
            id:23,
            title:'How do I create Trust Circle?',
            Description:'Please refer schedule CGT process'
        },
        {
            id:24,
            title:'How do I schedule CGT?',
            Description: '- Click “New CGT” on Home screen of Finpower App',
            Description1: '- Select the time slot for CGT',
            Description2: '- Select the customer',
            Description3: '- Click “Confirm”'
        },
        {
            id:25,
            title:'How to conduct CGT?',
            Description:  '- Click on “Activity” on Home screen of Finpower App',
            Description1: '- Select CGT customer from the scheduled list displayed',
            Description2: '- Press “Conduct CGT”',
            Description3: '- Verify the KYC by checking the data shown in Finpower with the original KYC',
            Description4: '- Press “Confirm” to accept',
            Description5: '           *    Press “+” button to select TC member',
            Description6: '- Verify and confirm the KYC of the TC members',
            Description7: '- Click “Create Trust Circle” to link TC members',
            Description8: '- Customers to do the following in Svadhan App',
            Description9: '-           *    Approve TC request',
            Description10: '-           *     Add bank account',
            Description11: '- Schedule DLE for each customer in Finpower App',
            Description12: '- When DLE is scheduled for all customers, the CGT gets completed',
        },
        {
            id:26,
            title:'What is DLE?',
            Description:'DLE or Detailed Loan Eligibility check is the process of visiting the customer’s home and verifying the details submitted by customer in Svadhan App, and collecting other details required to complete the customer onboarding. '
        },
        {
            id:27,
            title:'How to schedule DLE?',
            Description:'Please refer schedule CGT process.'
        },
        {
            id:28,
            title:'How to conduct DLE?',
            Description:  '- Click on “Activity” on Home screen of Finpower App',
            Description1: '- Select “DLE Activity” ',
            Description2: '-           *     Select the DLE customer from the list displayed',
            Description3: '- Press “Conduct DLE”',
            Description4: '- Update address & press “Continue”',
            Description5: '- Update ownership proof & press “Continue”',
            Description6: '- Update co-applicant details',
            Description7: '-           *     Svadhan Mitra should contact co-applicant and get their willingness to stand as co-applicant for the customer',
            Description8: '-           *     Verify the phone number of co-applicant with OTP  ',
            Description9: '-           *     Press “Continue”',
            Description10: '- Update vehicle details and press “Continue”',
            Description11: '- Update energy utilities and press “Continue”',
            Description12: '- Update income details and press “Continue”',
            Description13: '- In Svadhan App, customer to:',
            Description14: '-           *     Confirm the DLE data by selecting the message from notification and pressing “Confirm” button',
            Description15: '-           *     Take customer selfie and press “Submit”',
            Description16: '- In Finpower App, Svadhan Mitra to take house photo and press “Submit”'

        },
        {
            id: 29,
            title:'If CGT/DLE did not happen on the scheduled day, then \nhow can I see the missed CGT/DLE the next day \nin the Finpower App?',
            Description:  '- Click “Calendar” on Home screen of Finpower App',
            Description1: '- Press “Missed Activity” ',
            Description2: '- Select the required Customer from the list',
            Description3: '- Reschedule the activity to a new time/date slot ',

        },
        {
            id:30,
            title:'If the mobile, in which the Svadhan App or Finpower App \nis installed, got damaged or lost, then how could we access \nSvadhan App of Finpower App again?',
            Description: 'Please contact support @ 7736194888. '
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
                                            <>
                                          
                                                      {item.id == 2 &&
                                        <View style={{width:width*0.88,height:width*0.18,backgroundColor:'rgba(242, 242, 242, 0.5)',justifyContent:'center',paddingLeft:width*0.02,
                                        borderRadius:6,marginBottom:width*0.01,paddingRight:width*0.02}}>
                                            <Text style={{ fontFamily: FONTS.FontRegular, fontSize: 10, color: "#1A051D" }}>{item.Description}</Text>
                                            <Text style={{ fontFamily: FONTS.FontRegular, fontSize: 10, color: "#1A051D" }}>{item.Description1}</Text>
                                            <Text style={{ fontFamily: FONTS.FontRegular, fontSize: 10, color: "#1A051D" }}>{item.Description2}</Text>
                                            <Text style={{ fontFamily: FONTS.FontRegular, fontSize: 10, color: "#1A051D" }}>{item.Description3}</Text>

                                        </View>}
                                        {item.id != 2 && item.id !=3 &&  item.id !=6 && item.id !=8 && item.id !=9 && item.id != 14 && item.id != 19 &&
                                        item.id != 22 &&  item.id != 24 && item.id != 25 && item.id != 28 && item.id != 29 &&
                                           <View style={{width:width*0.88,height:width*0.18,backgroundColor:'rgba(242, 242, 242, 0.5)',paddingLeft:width*0.02,
                                           borderRadius:6,alignItems:'center',justifyContent:'center',marginBottom:width*0.02,paddingRight:width*0.02}}>
                                         <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description}</Text>
                                         </View>}
                                        {item.id == 3 && 
                                          <View style={{width:width*0.88,height:width*0.18,backgroundColor:'rgba(242, 242, 242, 0.5)',justifyContent:'center',paddingLeft:width*0.02,
                                          borderRadius:6,marginBottom:width*0.01,paddingRight:width*0.02}}>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description}</Text>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description1}</Text>
                                            </View>
                                         }
                                              {item.id == 6 && 
                                          <View style={{width:width*0.88,height:width*0.18,backgroundColor:'rgba(242, 242, 242, 0.5)',justifyContent:'center',paddingLeft:width*0.02,
                                          borderRadius:6,marginBottom:width*0.01,paddingRight:width*0.02}}>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description}</Text>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description1}</Text>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description2}</Text>
                                            </View>
                                         }

                                      


                                        {item.id == 8 && 
                                          <View style={{width:width*0.88,height:width*0.33,backgroundColor:'rgba(242, 242, 242, 0.5)',paddingLeft:width*0.02,
                                          borderRadius:6,marginBottom:width*0.02,paddingRight:width*0.02}}>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D",marginTop:width*0.02}}>{item.Description}</Text>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D",marginTop:width*0.02}}>{item.Description1}</Text>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description2}</Text>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description3}</Text>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D",marginTop:width*0.02}}>{item.Description4}</Text>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D",marginTop:width*0.02}}>{item.Description5}</Text>

                                            </View>
                                         }

                                        {item.id == 9 && 
                                          <View style={{width:width*0.88,height:width*0.30,backgroundColor:'rgba(242, 242, 242, 0.5)',justifyContent:'center',paddingLeft:width*0.02,
                                          borderRadius:6,marginBottom:width*0.01,paddingRight:width*0.02}}>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description}</Text>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description1}</Text>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description2}</Text>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description3}</Text>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description4}</Text>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description5}</Text>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description6}</Text>
                                            </View>
                                         }

                                        {item.id == 14 && 
                                          <View style={{width:width*0.88,height:width*0.18,backgroundColor:'rgba(242, 242, 242, 0.5)',justifyContent:'center',paddingLeft:width*0.02,
                                          borderRadius:6,marginBottom:width*0.01,paddingRight:width*0.02}}>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description}</Text>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description1}</Text>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description2}</Text>
                                            </View>
                                         }

                                    { item.id == 19 &&      
                                          <View style={{width:width*0.88,height:width*0.18,backgroundColor:'rgba(242, 242, 242, 0.5)',justifyContent:'center',paddingLeft:width*0.02,
                                          borderRadius:6,marginBottom:width*0.01,paddingRight:width*0.02}}>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description}</Text>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description1}</Text>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description2}</Text>
                                            </View>
                                         }

                                        { item.id == 24 &&
                                          <View style={{width:width*0.88,height:width*0.18,backgroundColor:'rgba(242, 242, 242, 0.5)',justifyContent:'center',paddingLeft:width*0.02,
                                          borderRadius:6,marginBottom:width*0.01,paddingRight:width*0.02}}>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description}</Text>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description1}</Text>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description2}</Text>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description3}</Text>
                                            </View>
                                         }


                                         
                                        { item.id == 22 &&
                                          <View style={{width:width*0.88,height:width*0.18,backgroundColor:'rgba(242, 242, 242, 0.5)',justifyContent:'center',paddingLeft:width*0.02,
                                          borderRadius:6,marginBottom:width*0.01,paddingRight:width*0.02}}>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description}</Text>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description1}</Text>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description2}</Text>
                                            </View>
                                         }

                                        {item.id == 25 && 
                                          <View style={{width:width*0.88,height:width*0.45,backgroundColor:'rgba(242, 242, 242, 0.5)',justifyContent:'center',paddingLeft:width*0.02,
                                          borderRadius:6,marginBottom:width*0.01,paddingRight:width*0.02}}>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description}</Text>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description1}</Text>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description2}</Text>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description3}</Text>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description4}</Text>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description5}</Text>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description6}</Text>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description7}</Text>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description8}</Text>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description9}</Text>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description10}</Text>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description11}</Text>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description12}</Text>
                                            </View>
                                         }
                                         

                                         {item.id == 28 && 
                                          <View style={{width:width*0.88,height:width*0.62,backgroundColor:'rgba(242, 242, 242, 0.5)',justifyContent:'center',paddingLeft:width*0.02,
                                          borderRadius:6,marginBottom:width*0.01,paddingRight:width*0.02}}>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description}</Text>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description1}</Text>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description2}</Text>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description3}</Text>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description4}</Text>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description5}</Text>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description6}</Text>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description7}</Text>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description8}</Text>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description9}</Text>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description10}</Text>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description11}</Text>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description12}</Text>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description13}</Text>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description14}</Text>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description15}</Text>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description16}</Text>
                                            </View>
                                         }

                                         {item.id == 29 && 
                                          <View style={{width:width*0.88,height:width*0.18,backgroundColor:'rgba(242, 242, 242, 0.5)',justifyContent:'center',paddingLeft:width*0.02,
                                          borderRadius:6,marginBottom:width*0.01,paddingRight:width*0.02}}>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description}</Text>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description1}</Text>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description2}</Text>
                                             <Text style={{fontFamily:FONTS.FontRegular,fontSize:10,color:"#1A051D"}}>{item.Description3}</Text>
                                            </View>
                                                }
                                              
                                           </>:null} 
                                           
                                          
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