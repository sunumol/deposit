import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions
} from 'react-native';
import { COLORS, FONTS } from '../../../Constants/Constants';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

const { height, width } = Dimensions.get('screen');



const Header = (loandetail,navigation) => {
console.log('loan detail',loandetail)

    const { t } = useTranslation();
    
    return (
        <>
        {
            (!loandetail == " " || !loandetail == ' ') &&   <View style={styles.loanContainer}>
            <View style={{ flex: 1 }}>
                <View style={{ marginTop: 15 }}>
                    <Text style={styles.headText}>{t('common:LoanID')} :</Text>
                    <Text style={styles.valueText}>{loandetail?.loandetail?.loanId ? loandetail?.loandetail?.maskedLenderLoanId :'-' }</Text>
                </View>
                <View style={{ marginTop: 15 }}>
                    <Text style={styles.headText}>{t('common:LoanOutstanding')} :</Text>
                    <Text style={styles.valueText}>₹{loandetail?.loandetail?.loanOutstanding ? loandetail?.loandetail?.loanOutstanding : '-'}</Text>
                </View>
                <View style={{ marginVertical: 19 }}>
                    <Text style={styles.headText}>{t('common:EmiDue')}</Text>
                    <Text style={styles.valueText}>{ moment(loandetail?.loandetail?.emiDueDate).format("DD MMMM 'YY")}</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'column', marginTop: 17 }}>
                <View style={{ flex: 1 }}>
                    <View style={styles.verticleLine} />
                </View>
                <View style={{ flex: 1 }}>
                    <View style={styles.verticleLine} />
                </View>
            </View>

            <View style={{ flex: 1 }}>
                <View style={{ marginTop: 15 }}>
                    <Text style={styles.headText}>{t('common:LoanAmount')} :</Text>
                    <Text style={styles.valueText}>₹{loandetail?.loandetail?.loanAmount ? loandetail?.loandetail?.loanAmount : '-'}</Text>
                </View>
                <View style={{ marginTop: 15 }}>
                    <Text style={styles.headText}>{t('common:Emi')} :</Text>
                    <Text style={styles.valueText}>₹{loandetail?.loandetail?.emi ? loandetail?.loandetail?.emi: '-'}</Text>
                </View>
                <View style={{ marginVertical: 19 }}>
                    <Text style={styles.headText}>{t('common:PaymentDue')}</Text>
                    <Text style={[styles.valueText,{color:COLORS.colorRed}]}>₹{loandetail?.loandetail?.paymentDue ? loandetail?.loandetail?.paymentDue : '-'}</Text>
                    <Text style={[styles.valueText,{color:COLORS.colorRed,fontSize:10}]}>*{t('common:Include')}</Text>
                </View>
            </View>


        </View> 
        }
        </>
      
    )
}

export default Header;

const styles = StyleSheet.create({
    loanContainer: {
        backgroundColor: COLORS.colorBackground,
        marginTop: 17,
        borderRadius: 15,
        flexDirection: 'row',
        paddingLeft: 20,
        shadowColor: 'rgba(0, 0, 0, 0.4)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        elevation: 7,
        shadowRadius: 7,
        borderWidth:1,
        borderColor:COLORS.colorBorder,
        marginBottom:10
    },
    verticleLine: {
        fontSize: 30,
        fontWeight: "bold",
        borderRightWidth: 1,
        borderColor: '#C4C4C4',
        marginRight: 20,
        borderStyle: 'dashed', 
        height:'75%'
    },
    headText:{
        fontSize:10,
        fontFamily:FONTS.FontRegular,
        // lineHeight:12,
        color:COLORS.colorDSText,
        fontWeight:'400',
    },
    valueText:{
        fontSize:12,
        fontFamily:FONTS.FontSemiB,
        // lineHeight:15,
        color:COLORS.colorDark,
        fontWeight:'600',
        paddingTop:3
    },

})