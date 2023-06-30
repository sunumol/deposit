import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

// ------------------ Component Imports ---------------------
import { COLORS, FONTS } from '../../../Constants/Constants';

const MeetTab = (props) => {
   
    const { t } = useTranslation();

    const getRandomColor = (value) => {
        // console.log('Random',value)
         let mobilenum = value?.charAt(value.length-1)
         if (mobilenum == '0'){
           var color = '#94BCC8'
         }else if (mobilenum == '1'){
           var color ='#9EC894'
         }else if (mobilenum == '2'){
             var color ='#8CACCE'
           }else if (mobilenum == '3'){
             var color ='#CE748F'
           }else if (mobilenum == '4'){
             var color ='#8CA785'
           }else if (mobilenum == '5'){
             var color = '#6979F8'
           }else if (mobilenum == '6'){
             var color ='#9EC894'
           }else if (mobilenum == '7'){
             var color ='#8CACCE'
           }else if (mobilenum == '8'){
             var color ='#CE748F'
           }else if (mobilenum == '9'){
             var color ='#8CA785'
           }else if(value == null || '' ){
             var color = '#C8BD94'
           }

        return color;
    }

    String.prototype.replaceAt = function (index, replacement) {
        return this.substring(0, index) + replacement + this.substring(index + replacement.length);
    }
    
    const getInitials = (name) => {
        let initials;
        const nameSplit = name?.split(" ");
        const nameLength = nameSplit?.length;
        if (nameLength > 1) {
            initials =
                nameSplit[0].substring(0, 1) +
                nameSplit[nameLength - 1].substring(0, 1);
        } else if (nameLength === 1) {
            initials = nameSplit[0].substring(0, 1);
        } else return;

        return initials.toUpperCase();
    };

    return (

        <View style={styles.boxStyle} key={props.id}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={[styles.circleStyle, { backgroundColor: getRandomColor(props?.item?.mobile) }]}>
                    <Text style={styles.circleText}>{getInitials(props.item.name ? props.item.name : props.item.mobile)}</Text>
                </View>

                <View style={{ flexDirection: 'column', paddingLeft: 12, paddingTop: 5 }}>
                    <Text style={styles.nameText}>{props?.item?.name ? props?.item?.name : props?.item?.mobile}</Text>
                    <View style={{ flexDirection: 'row', }}>
                        {props.item?.pin ? (<View style={{ paddingTop: 5, paddingRight: 1 }}>
                            <Icon1 name="location-outline" color={"black"} />
                        </View>) : null}
                        <Text style={[styles.idText, { paddingTop: 4 }]}>{props?.item?.pin}</Text>
                    </View>
                </View>

            </View>

            <View style={{ flexDirection: 'column', paddingTop: 5, alignItems: 'flex-end' }}>
                <View style={{ flexDirection: 'row' }}>
                    <Icon2 name="phone-in-talk-outline" color={"black"} size={15} />
                    <Text style={[styles.numText, { paddingLeft: 6 }]}>{props?.item?.mobile?.replace(/^.{0}/g, ''," ").slice(-10).replaceAt(3, "X").replaceAt(4, "X").replaceAt(5, "X").replaceAt(6, "X").replaceAt(7, "X")}</Text>
                </View>

                <View style={[styles.leadContainer, { backgroundColor: COLORS.LightBlue }]}>
                    <Text style={[styles.leadText, { color: COLORS.DarkBlue }]}>{t('common:ConductCGT')}</Text>
                </View>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    boxStyle: {
        backgroundColor: COLORS.colorBackground,
        borderColor: COLORS.colorBorder,
        borderRadius: 8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        elevation: 7,
        padding: 10,
        marginTop: 10,
        borderWidth: 1,
        borderColor: COLORS.colorBorder,
        flexDirection: 'row'
    },
    circleStyle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    circleText: {
        fontSize: 18,
        fontFamily: FONTS.FontSemiB,
        color: COLORS.colorBackground,
        fontWeight: '600',
    },
    circleText: {
        fontSize: 18,
        fontFamily: FONTS.FontSemiB,
        color: COLORS.colorBackground,
        fontWeight: '600',
    },
    nameText: {
        fontSize: 12,
        fontFamily: FONTS.FontBold,
        color: COLORS.colorDark,
        fontWeight: '600',
    },
    idText: {
        fontSize: 11,
        fontFamily: FONTS.FontRegular,
        color: COLORS.colorDark,
        paddingTop: 3,
        width: 110
    },
    numText: {
        fontSize: 12,
        fontFamily: FONTS.FontRegular,
        color: COLORS.colorDark,
        fontWeight: '400',
    },
    leadText: {
        fontSize: 11,
        fontFamily: FONTS.FontSemiB,
        fontWeight: '600',
    },
    leadContainer: {
        padding: 4,
        borderRadius: 3,
        marginTop: 2,
        maxWidth: 150
    },
});
export default MeetTab;
