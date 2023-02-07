import React ,{useState,useEffect}from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { COLORS, FONTS } from '../../../Constants/Constants';
const { height, width } = Dimensions.get('screen');
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon1 from '../assets/Profile.svg';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from '../assets/Support.svg';
import Icon4 from '../assets/More.svg';

const BottomTabs = ({navigation}) => {
    const { t} = useTranslation();
    const [Lang, setLang] = useState('')
    const [ModalVisible1,setModalVisible1] = useState(false)


    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const lang = await AsyncStorage.getItem('user-language')
            setLang(lang)

        } catch (e) {
            console.log(e)
        }
    }
    return (
        <View style={styles.botttomContainer}>
        <TouchableOpacity 
        style={{alignItems:'center',paddingLeft:width*0.1}}
        onPress={()=>navigation.navigate('ProfileScreen')}
        >
                <Icon1 name="user"
                    color={"#FFFFFF"}
                    size={23}
                     />
                <Text style={styles.titleText}>{t('common:Profile')}</Text>
            </TouchableOpacity>
            
            {/* <TouchableOpacity 
            style={{alignItems:'center'}}>
            <Icon3 name="headset"
                color={"#FFFFFF"}
                size={23}
                />
                  <Text style={styles.titleText}>{t('common:Support')}</Text>
            </TouchableOpacity> */}
            <TouchableOpacity 
            style={{alignItems:'center',paddingRight:width*0.1}}>
            <Icon4 name="ellipsis-horizontal-circle"
                color={"#FFFFFF"}
                size={23}
                 />
                  <Text style={styles.titleText}>{t('common:More')}</Text>
            </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({
    titleText:{
        color: COLORS.colorBackground,
        fontSize: 12,
        fontFamily: FONTS.FontRegular,
        fontWeight: '500',
        textAlign:'center'
    },
    botttomContainer:{ 
        flex: 0.1, 
        backgroundColor: COLORS.colorB, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center' ,
       
    }
})
export default BottomTabs;