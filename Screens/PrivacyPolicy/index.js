import React, { useCallback } from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    StatusBar,
    ScrollView,
    Dimensions,
    BackHandler,
    Linking
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

// ------------- Components Imports --------------
import { FONTS } from '../../Constants/Constants';
import Statusbar from '../../Components/StatusBar';
import Header from '../../Components/Header';

const Privacy = ({ navigation }) => {

    const isDarkMode = true
    const { t } = useTranslation();

    const handleGoBack = useCallback(() => {
        navigation.navigate('LoginScreen');
        return true; // Returning true from onBackPress denotes that we have handled the event
    }, [navigation]);

    useFocusEffect(
        React.useCallback(() => {
            BackHandler.addEventListener('hardwareBackPress', handleGoBack);
            return () =>
                BackHandler.removeEventListener('hardwareBackPress', handleGoBack);
        }, [handleGoBack]),
    );

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container1} />
            <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={"#002B59"}/>

            <Header navigation={navigation} name={t('common:PrivacyHead')} onPress={handleGoBack} />
            <ScrollView style={{ flex: 1, paddingBottom: 20 }}>
                <View style={[styles.ViewContent,{paddingTop:14}]}>
                    <Text style={styles.text}>This privacy policy (“<Text style={{ fontFamily: FONTS.FontBold }}>Privacy Policy</Text>”) is published pursuant to, and in accordance with the
                        provisions of the Information Technology Act, 2000, and the rules framed thereunder and as
                        amended from time to time, including, but not limited to the Information Technology
                        (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information)
                        Rules, 2011 (“<Text style={{ fontFamily: FONTS.FontBold }}>Privacy Rules</Text>”).</Text>
                    <Text style={styles.text}>Dhan Sethu DigiFin Private Limited (hereinafter referred to as any of the following: “<Text style={{ fontFamily: FONTS.FontBold }}>we</Text>”, “<Text style={{ fontFamily: FONTS.FontBold }}>us</Text>”,
                        “<Text style={{ fontFamily: FONTS.FontBold }}>our</Text>”, or “<Text style={{ fontFamily: FONTS.FontBold }}>Company</Text>”) is registered under the Companies Act, 2013, having its registered office
                        at 720A, Southern Side of Nirmithi Kendra, Ayyanthole, Thrissur, Kerala 680003. We are the
                        publisher and the owner of the internet resource – www.svadhan.com, and all its sub-domains,
                        on the world wide web (“<Text style={{ fontFamily: FONTS.FontBold }}>Website</Text>”) as well as our mobile application having Android package
                        name com.svadhan and com.finpower (“<Text style={{ fontFamily: FONTS.FontBold }}>Mobile App</Text>”) (together “<Text style={{ fontFamily: FONTS.FontBold }}>Online Resources</Text>”), used by us, or which aide
                        us, in any form, and/or manner for the lawful operation of our business [under our brand name
                        ‘Svadhan’].</Text>
                    <Text style={styles.text}>This Privacy Policy describes the type of information, and/or data, whether personal
                        information or otherwise (as defined below, and under the applicable law) (“<Text style={{ fontFamily: FONTS.FontBold }}>Sensitive
                            Personal Data or Information</Text>”), we collect when our customers and/or unregistered users
                        (hereinafter referred to as any of the following: “<Text style={{ fontFamily: FONTS.FontBold }}>you</Text>”, “<Text style={{ fontFamily: FONTS.FontBold }}>your</Text>”, “<Text style={{ fontFamily: FONTS.FontBold }}>user</Text>”, or “<Text style={{ fontFamily: FONTS.FontBold }}>users</Text>”, and includes
                        any relative, guardian, caretaker, or authorised representatives acting on behalf of you, or
                        representing you) visit, access, or use our Online Resources [under our brand name
                        ‘Svadhan’], for availing any or all of our services (whether present services or services to be
                        rendered by us in the future) (collectively referred to as “<Text style={{ fontFamily: FONTS.FontBold }}>Services</Text>”), how we collect and, use
                        such collected Sensitive Personal Data or Information, how we process and protect the
                        Sensitive Personal Data or Information collected from you, the duration for which we retain
                        your Sensitive Personal Data or Information, to whom we transfer, or share such Sensitive
                        Personal Data or Information with, and the details of our Grievance Officer.</Text>
                    <Text style={styles.text}>This Privacy Policy shall, at all times, be read along with the provisions of our Terms of
                        Services, available at the link <Text style={{ color:'blue',textDecorationLine:'underline'}} onPress={()=>Linking.openURL('https://www.svadhan.com/terms')}>www.svadhan.com/terms</Text> (as amended from
                        time to time).</Text>
                    <Text style={[styles.text, { fontFamily: FONTS.FontBold }]}>I. <Text style={{ textDecorationLine: 'underline' }}>Consent Disclaimer</Text></Text>
                    <Text style={styles.text}><Text style={{ textDecorationLine: 'underline' }}>Express Consent</Text>: The Privacy Policy applies to all users of our Services. By using our
                        Services or by otherwise giving us your Sensitive Personal Data or Information, and unless
                        you opt out in accordance with the terms of this Privacy Policy, you hereby agree to the terms
                        of our Privacy Policy and agree to provide your Sensitive Personal Date or Information on a
                        voluntary basis, and you hereby, give your express consent to our collection of, use and
                        sharing, or transferring with third parties, our affiliates, our employees/advisors etc., your
                        Sensitive Personal Data or Information as outlined and described in our Privacy Policy.
                        Further, if you are using our Services on behalf of someone else, or an entity, you shall at all
                        times represent, that you are duly authorised by such person, or entity to enter into and accept
                        and be bound by the terms of this Privacy Policy.</Text>
                    <Text style={styles.text}>If you do not agree with this Privacy Policy, please do not download or install our Mobile App,
                        or access our Website or proceed beyond the Privacy Policy screen after launching the Mobile
                        App or Website on your device for the first time. If you continue to use the Mobile App or
                        Website, we understand that you are aware of this Privacy Policy and its contents, and have
                        provided your “opt-in” consent on such basis.</Text>
                    <Text style={styles.text}><Text style={{ textDecorationLine: 'underline' }}>Opt-out</Text>: You hereby acknowledge that we collect Sensitive Personal Data or Information for
                        a lawful purpose connected with our Services, and collection of such Sensitive Personal Data
                        or Information is essential for the purpose of serving you. In case you do not wish to provide
                        your Sensitive Personal Data or Information or be bound by the terms of this Privacy Policy,
                        in any manner whatsoever, you may opt-out by sending a withdrawal/deletion request in
                        writing to our Grievance Officer. If you wish to have your Sensitive Personal Data or
                        Information with us deleted, removed or forgotten from our database, you can contact us for
                        the same at info@dhansethu.com</Text>
                    <Text style={styles.text}>Our Services may not be available to you in the event you do not agree to give us your express
                        consent to use your Sensitive Personal Data or Information or withdraw your express consent
                        at any time in the future.</Text>
                    <Text style={styles.text}><Text style={{ textDecorationLine: 'underline' }}>Accuracy of Information</Text>: You shall, at all times while using our Services, be responsible for
                        maintaining the accuracy of the Sensitive Personal Data or Information, you provide us. If
                        there is any change in the details of the Sensitive Personal Data or Information
                        shared/submitted by you, you will promptly notify us in writing by contacting our Grievance
                        Officer.</Text>
                    <Text style={[styles.text, { fontFamily: FONTS.FontBold }]}>II. <Text style={{ textDecorationLine: 'underline' }}>Kind of information we collect</Text></Text>
                    <Text style={styles.text}>In order for us to ensure that you get the best and uninterrupted Services, we may, or our
                        business partners on our behalf, may collect any or all of your Sensitive Personal Data or
                        Information, including but not limited to, your contact details (name, gender, occupation,
                        address, place of work, phone, email, and other identity related details), financial information
                        (bank account details, permanent account number, credit or debit card related details, or any
                        other such information as may be necessary for us to provide you our Services), the KYC
                        details you submit to us etc. Provided that, any detail which is freely available or accessible in
                        public domain shall not be regarded as Sensitive Personal Data or Information.</Text>
                    <Text style={styles.text}>In order for us to personalise and improve your experience when you are
                        using/browsing/accessing our Online Resources, we may also collect your details using
                        cookies, which are alphanumeric identifiers with small amount of data that is stored on your
                        device’s hard drive containing details about you and is commonly used as an anonymous
                        unique identifier. We may also collect your log data, which may include information such as
                        your device’s internet protocol address, device name, operating system version, the
                        configuration of any or all of the Online Resources when utilizing our Services, the time and
                        date of your use of the Services, and other statistics.</Text>

                    <Text style={styles.text}>We also collect information about your device to undertake fraud detection, provide automatic
                        updates and additional security so that your account is not used in other people’s devices. In
                        addition, the information provides us valuable feedback on your identity as a device holder as
                        well as your device behaviour, thereby allowing us to improve our services and provide an
                        enhanced customized user experience to you. You can change the device access you provide
                        to us in Your device settings. The information we collect from your device includes, but not
                        limited to, the device ID, IMEI number, information on operating system, SDK version and
                        mobile network information including carrier name, SIM Serial and SIM Slot, Your profile
                        information, list of installed apps, Wi-Fi information, location information, storage.</Text>
                    <Text style={[styles.text, { fontFamily: FONTS.FontBold }]}>III. <Text style={{ textDecorationLine: 'underline' }}>Use, Disclosure & Retention of Personal Sensitive Date or Information Collected</Text></Text>
                    <Text style={styles.text}>All Information collected shall be used for the relevant lawful purposes:</Text>
                    <Text style={styles.text}>(i) Connected with various functions or activities of the Company related to services in which
                        the Customer is interested, and/or,</Text>
                    <Text style={styles.text2}>(ii) To help determine the eligibility of the Customers for the product/services requested/
                        applied/ shown interest in, and/or,</Text>
                    <Text style={styles.text2}>(iii) To enable Company for verification and/or process applications, requests, transactions
                        and/or maintain records as per internal/legal/regulatory requirements with regard to the
                        Customers, and/or</Text>
                    <Text style={styles.text2}>(iv) To provide the Customers with the best possible services/products as also to protect
                        interests of the Company; and/or</Text>
                    <Text style={styles.text2}>(v) To fulfil any other purpose for which you provide or authorise us to use your Sensitive
                        Personal Data or Information.</Text>
                    <Text style={styles.text}>We may share/transfer your Sensitive Personal Data or Information with the following persons,
                        whether located in India or any other countries: (i) our affiliates, subsidiaries, business
                        partners, consultants, employees, or any other third party engaged by us, or a third party
                        engaging us in relation to our Services, including but not limited to banks, financial institutions,
                        credit bureaus, agencies, etc., (ii) government institutions to the extent required under the
                        laws, including in response to enquiries by government agencies for the purpose of verification
                        of identity, for prevention, detection, investigation including cyber incidents, prosecution, and
                        punishment of offences, to protect and defend our rights or property, or for credit reporting,
                        statistical analysis, credit scoring, verification of risk management, etc., (iii) buyer/acquirer or
                        other successor in the event of a merger, acquisition, divestiture, restructuring, reorganization,
                        dissolution or other sale or transfer of same or all our assets, whether as a going concern or
                        as part of bankruptcy, liquidation or similar proceedings, in which Sensitive Personal Data or
                        Information maintained by us is among the assets transferred, or (iv) any other third party,
                        whether acting on our behalf or otherwise, if we feel that such sharing/transfer would be
                        beneficial to you in relation to our Services or would be necessary for us to provide you, our
                        Services.</Text>
                    <Text style={styles.text}>All disclosures with respect to your Sensitive Personal Data or Information shall be made on
                        a need-to-know basis, and only when such disclosure is necessary. Party(ies) with whom we
                        may share or transfer your Sensitive Personal Data or Information, shall be obliged to respect
                        its confidentiality, and shall further not disclose such Sensitive Personal Data or Information.</Text>

                    <Text style={styles.text}>Sensitive Personal Data or Information will be held by us (for later of), for as long as it is
                        necessary to fulfil the purpose for which it was collected, or as required by applicable laws.</Text>
                    <Text style={[styles.text, { fontFamily: FONTS.FontBold }]}>IV. <Text style={{ textDecorationLine: 'underline' }}>Reasonable Security Practices and Procedures Adopted By Us And Details Of Our
                        Grievance Officer</Text></Text>
                    <Text style={styles.text}>We use appropriate technical and organisational security measures, when the Sensitive
                        Personal Data or Information is collected through, and/or on our Online Resources, to ensure
                        a level of protection to your Sensitive Personal Data or Information which is commensurate to
                        the risk, taking into account the implementation costs and the nature, scope, context, and
                        purposes of processing, or storing your Sensitive Personal Data or Information.</Text>
                    <Text style={styles.text}>We undertake reasonable security practices and procedures, that are designed to protect such
                        Sensitive Personal Data or Information from unauthorised access, damage, use, modification,
                        disclosure, or impairment.</Text>
                    <Text style={styles.text}>If you have any queries about the security practices and procedures adopted by us, or if you
                        wish to review the Sensitive Personal Data or Information shared with us, you may contact us
                        at info@dhansethu.com.</Text>
                    <Text style={styles.text}>If you have any grievances with respect to processing of Sensitive Personal Data or
                        Information, you may communicate such grievance to:</Text>
                        <Text style={styles.text}>The Grievance Officer,{"\n"}
                        Krishna Chandran V,{"\n"}
                        8th Floor, Infra Futura, Opp. Bharat Matha College,
                        Thrikkakara, Ernakulam, Kerala- 682021.{"\n"}
                        Email: <Text style={{ color:'blue',textDecorationLine:'underline'}} onPress={() => Linking.openURL('mailto:krishnachandranv@dhansethu.com')}>krishnachandranv@dhansethu.com,</Text>  ,{"\n"}
                        Ph: 9526163666 </Text>
                    <Text style={styles.text}>We are committed to addressing, any or all discrepancies, or your grievances with respect to
                        the Privacy Policy, as expeditiously as possible, and all such discrepancies or grievances shall
                        be redressed within a maximum period of 1 (One) month from the date of receipt of your
                        grievance with our Grievance Officer.</Text>
                    <Text style={[styles.text, { textAlign: 'center' }]}>***</Text>
                    <Text style={[styles.text, { alignSelf: 'flex-start' }]}>Last Updated On: 9th August, 2023</Text>
                </View>
            </ScrollView>
        </SafeAreaProvider>
    )
}

export default Privacy;

const styles = StyleSheet.create({
    container1: {
        flex: 0,
        backgroundColor: "#002B59",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    ViewContent: {
        flex: 1,
        paddingBottom: 20,
        marginHorizontal: 20
    },
    text: {
        fontWeight: '400',
        fontFamily: FONTS.FontRegular,
        fontSize: 14,
        marginTop: 14,
        textAlign: 'justify',
        color: "#1A051D",
    },
    text2: {
        fontWeight: '400',
        fontFamily: FONTS.FontRegular,
        fontSize: 14,
        textAlign: 'justify',
        color: "#1A051D",
    },
    Head: {
        fontFamily: FONTS.FontExtraBold,
        fontSize: 18,
        fontWeight: '800',
        color: "#1A051D",
        paddingTop: 31
    },
    viewHead: {
        marginTop: Dimensions.get('window').height * 0.02,
        marginBottom: 0,
        marginLeft: 21
    }
})