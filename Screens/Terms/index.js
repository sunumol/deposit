import React, { useState, useEffect, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    StatusBar,
    ScrollView,
    Dimensions,
    BackHandler
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS, FONTS } from '../../Constants/Constants';
import Statusbar from '../../Components/StatusBar';
import Header from '../../Components/Header';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

const Terms = ({ navigation }) => {

    const isDarkMode = true;
    const { t } = useTranslation();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({
            type: 'SET_TERM_STATUS',
            payload: true,
        })
    }, [])

    const handleGoBack = useCallback(() => {
        navigation.goBack()
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
            <Statusbar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={"#002B59"} />

            <Header navigation={navigation} name={t('common:Terms1')} onPress={handleGoBack} />
            <ScrollView>
                <View style={[styles.ViewContent,{paddingTop:14}]}>
                    <Text style={styles.text}>These terms and conditions of service (“<Text style={{ fontFamily: FONTS.FontBold }}>Terms</Text>”) along with the Privacy Policy forms a legally binding
                        agreement (“<Text style={{ fontFamily: FONTS.FontBold }}>Agreement</Text>”) between Dhan Sethu DigiFin Private Limited, a company registered under
                        the Companies Act 2013, having its principal place of business at Bizcospaces, 8
                        th Floor, Infra Futura,
                        Opp. Bharat Matha College, Thrikkakara, Ernakulam, Kerala- 682021 (hereinafter referred to as any of
                        the following: “<Text style={{ fontFamily: FONTS.FontBold }}>Dhan Sethu</Text>”, “<Text style={{ fontFamily: FONTS.FontBold }}>Company</Text>”, “<Text style={{ fontFamily: FONTS.FontBold }}>We</Text>”, “<Text style={{ fontFamily: FONTS.FontBold }}>Us</Text>”) and you (hereinafter referred to as any of the
                        following: “<Text style={{ fontFamily: FONTS.FontBold }}>You</Text>”, “<Text style={{ fontFamily: FONTS.FontBold }}>Your</Text>”, “<Text style={{ fontFamily: FONTS.FontBold }}>User(s)</Text>”).</Text>
                    <Text style={styles.text}>Dhan Sethu and User(s) are hereinafter, where the context so permits, be referred to individually as a
                        “Party” and collectively as “Parties”.</Text>
                    <Text style={styles.text}>This Agreement is a computer generated electronic record and does not require any physical or digital
                        signatures.</Text>
                    <Text style={styles.text}>As You downloaded and installed our mobile application (hereinafter referred to as “<Text style={{ fontFamily: FONTS.FontBold }}>App</Text>”, which
                        expression shall include all mobile application(s) and website(s) operated by Dhan Sethu DigiFin Private
                        Limited, including under the brand name of <Text style={{ fontFamily: FONTS.FontBold }}>Svadhan</Text>) from Google Play, You will also be subjected to
                        Google Play’s terms of service. In case of any conflict of the Agreement with Google Play’s terms of
                        service, with respect to Your use of App, then the Agreement shall prevail.</Text>
                    <Text style={styles.text}> If you do not agree with this Terms, please do not download or install our App, or access our App or
                        proceed beyond the Terms screen after launching the App on your device for the first time. If you
                        continue to use the App, we understand that you are aware of this Terms, and have provided your “opt-
                        in” consent on such basis.</Text>
                    <Text style={[styles.text, { fontFamily: FONTS.FontBold }]}>NOW THEREFORE IT IS AGREED BY AND AMONGST THE PARTIES HERETO AS FOLLOWS:</Text>
                    <Text style={[styles.text, { fontFamily: FONTS.FontBold }]}>1. Definitions and Interpretations</Text>
                    <Text style={styles.text}>Capitalized terms, not defined elsewhere in this Agreement, shall mean as follows:</Text>
                    <Text style={styles.text}><Text style={{ fontFamily: FONTS.FontBold }}>Advance:</Text> Shall mean the loan or credit facility applied through the App by the User(s) from a Dhan Sethu Partner(s)</Text>
                    <Text style={styles.text}><Text style={{ fontFamily: FONTS.FontBold }}>Credit Application:</Text> Shall mean the application for Advance submitted by User(s)</Text>
                    <Text style={styles.text}><Text style={{ fontFamily: FONTS.FontBold }}>Dhan Sethu Partner(s):</Text> Shall mean the third party vendors/ business partners/ lender partners/ banks/
                        financial institutions/ insurance companies/ insurance brokers who have entered into an Agreement
                        with Dhan Sethu for the purpose of lending Advance or providing any other service to User(s) or Dhan
                        Sethu</Text>
                    <Text style={styles.text}><Text style={{ fontFamily: FONTS.FontBold }}>Services:</Text> It constitutes of User(s)’s access to App, the assessment by Dhan Sethu of User(s)’s credit
                        worthiness, and subject to Dhan Sethu determining (in its sole and absolute discretion) that it is
                        appropriate, User(s)’s ability to submit a Credit Application or any service request to one or more Dhan
                        Sethu Partner(s) and use of such other functionalities of App as permitted by Dhan Sethu</Text>
                    <Text style={styles.text}><Text style={{ fontFamily: FONTS.FontBold }}>Supplemental Terms:</Text> Shall mean the additional terms and conditions that may apply to certain
                        Services, such as policies for a particular facility or promotion campaign etc., and such Supplemental
                        Terms will be disclosed to You in connection with the applicable Services</Text>
                    <Text style={styles.text}><Text style={{ fontFamily: FONTS.FontBold }}>Trust Circle:</Text> Shall mean one or more other User(s) who guarantee the Advance You avail</Text>
                    <Text style={styles.text}><Text style={{ fontFamily: FONTS.FontBold }}>User Generated Content:</Text> Shall mean any information submitted by the User(s) onthe App,or provided
                        by User(s) to Dhan Sethu to avail the Services</Text>
                    <Text style={[styles.text, { fontFamily: FONTS.FontBold }]}>2. Interpretation</Text>
                    <Text style={styles.text2}>In this Agreement, unless the context otherwise requires:</Text>
                    <Text style={styles.text2}>a. reference to the singular includes reference to the plural and vice versa;</Text>
                    <Text style={styles.text2}>b. reference to any gender includes a reference to all genders;</Text>

                    <Text style={styles.text2}>c. the expressions “hereof”, “herein” and similar expressions shall be construed as references to this
                        Agreement as a whole and not limited to the particular clause or provision in which the relevant
                        expression appears;</Text>
                    <Text style={styles.text2}>d. reference to any Agreement or document shall be construed as a reference to such Agreement or
                        document as the same may have been amended, varied, supplemented, or novated in writing at the
                        relevant time in accordance with the requirements of such Agreement or document and if applicable, of
                        this Agreement with respect to amendments;</Text>
                    <Text style={styles.text2}>e. reference to any legislation or law or to any provision thereof shall include references to any such law
                        or policy as it may, after the date hereof, from time to time, be amended, supplemented, or re-enacted,
                        and any reference to a statutory provision shall include any subordinate legislation made from time to
                        time under that provision;</Text>
                    <Text style={styles.text2}>f. references to recitals, clauses, paragraphs, annexures, and schedules are references respectively to
                        recitals, clauses, and paragraphs of, and schedules to this Agreement;</Text>
                    <Text style={styles.text2}>g. headings are inserted only for ease of reference and shall not affect the construction or interpretation
                        of the Agreement;</Text>
                    <Text style={styles.text2}>h. if any provision in Clause 1 is a substantive provision conferring rights or imposing obligations on any
                        Party, effect shall be given to it as if it were a substantive provision in the body of this Agreement;</Text>
                    <Text style={styles.text2}>i. the use of the word “including” followed by a specific example(s) in this Agreement, shall not be
                        construed as limiting the meaning of the general wording preceding it;</Text>
                    <Text style={styles.text2}>j. “writing”, “written” and comparable terms refer to printing, typing and other means of reproducing words
                        (including electronic media) in a visible form;</Text>
                    <Text style={styles.text2}>k. when any number of days is prescribed in any document, the same shall be reckoned exclusively of the
                        first and inclusively of the last day unless the last day does not fall on a Business Day, in which case
                        the last day shall be the next succeeding day which is a Business Day; and</Text>
                    <Text style={styles.text2}>l. time is of the essence in the performance of the Parties' respective obligations. If any time period
                        specified herein is extended, such extended time shall also be of the essence.</Text>

                    <Text style={[styles.text, { fontFamily: FONTS.FontBold }]}>3. User Approval</Text>
                    <Text style={styles.text2}>a. Dhan Sethu may, at its sole discretion and without any prior notice to the User(s), amend, change or
                        otherwise modify any portion of these Terms from time to time and it is the User(s)’s responsibility to
                        review these Terms periodically for any updates/changes. Unless otherwise set out herein,
                        amendments will be effective upon Dhan Sethu posting such updated Terms at this location or the
                        amended policies or Supplemental Terms on the applicable Services. User(s)’s continued access or
                        use of the App/ Services after such posting constitutes User(s)’s consent to be bound by the Terms, as
                        amended.</Text>
                    <Text style={styles.text2}>b. By accessing, downloading, installing or using the App, You expressly agree to be bound by this
                        Agreement</Text>
                    <Text style={styles.text2}>c. You understand that it You do not agree with the terms of this Agreement, You must immediately
                        discontinue the use and cease to access the App and any Services</Text>
                    <Text style={styles.text2}>d. Supplemental Terms are in addition to, and shall be deemed a part of, these Terms for the purposes of
                        the applicable service. Supplemental Terms shall prevail over these Terms in the event of a conflict
                        with respect to the applicable service.</Text>
                    <Text style={styles.text2}>e. You represent and warrant that You are capable of entering in to these Terms and performing the
                        obligations set out hereunder.</Text>
                    <Text style={[styles.text, { fontFamily: FONTS.FontBold }]}>4. Eligibility</Text>
                    <Text style={styles.text2}>You shall be an individual meeting all the following conditions to avail the Services:</Text>
                    <Text style={styles.text2}>a. Be a resident in India as per the Income tax act 1961</Text>
                    <Text style={styles.text2}>b. Be a Citizen of India as per Citizenship Act 1955</Text>
                    <Text style={styles.text2}>c. Be at least 18 (eighteen) years old as on the date of accepting the Terms</Text>
                    <Text style={[styles.text, { fontFamily: FONTS.FontBold }]}>5. Account Set-Up</Text>
                    <Text style={styles.text2}>a. In order to use the App and avail the Services, You must register for and maintain a service account
                        ("Account") in the App. Account registration requires You to submit certain information such as Your
                        and household members’ names, address, mobile phone number, age, KYC, occupation, income etc.</Text>
                    <Text style={styles.text2}>b. Some of the Services may additionally require physical verification of Your place of residence by
                        Dhan Sethu, and guarantee from others, including from Your Trust Circle.</Text>

                    <Text style={styles.text2}>c. You agree to maintain accurate, complete, and up-to-date information in Your Account. Your failure to
                        maintain accurate, complete, and up-to-date Account information may result in Your inability to access
                        and use the App (Fully or partially) and/or the Services (All or some).</Text>
                    <Text style={styles.text2}>d. You are responsible for all activity that occurs under Your Account, and You agree to maintain the
                        security and secrecy of Your Account PIN and any passwords at all times. Unless otherwise permitted
                        by in writing by Dhan Sethu, You shall only use and operate one Account. You acknowledge and agree
                        that any misuse of Your Account for reasons not attributable to Dhan Sethu shall be attributed to You
                        and You will be liable for any and all liabilities incurred as a result of such misuse.</Text>
                    <Text style={styles.text2}>e. You hereby consent that any information submitted by You for Account set-up may be used by Dhan
                        Sethu in accordance with its Privacy Policy published in the App.</Text>
                    <Text style={styles.text2}>f. You agree and authorize Dhan Sethu to share Your information, as well as that of Your household
                        members, with its group companies, Dhan Sethu Partner(s) and their authorized representatives, in so
                        far as required for joint marketing purposes/offering Services/ report generationsand/or similar services
                        to provide You with various value added services, in association with the Services selected by You or
                        otherwise. You agree to receive communications through e-mails and/or telephone and/or WhatsApp
                        and/or SMS, from Dhan Sethu, Dhan Sethu Partner(s) and their authorized representatives regarding
                        the Services/ancillary services updates, information/promotional emails and/or product
                        announcements. In this context, You agree and consent to receive any communications on the mobile
                        number You provided (even if this mobile number is registered under DND/NCPR list under TRAI
                        regulations), and for that purpose, You further authorize Dhan Sethu to share/disclose Your as well as
                        Your household members’ information to Your guarantors, Trust Circle, regulatory bodies, Credit
                        Information Companies.</Text>
                    <Text style={styles.text2}>g. You consent to allow Dhan Sethu, its officers, representatives, consultants, affiliates and employees
                        to access all documents uploaded, to analyse the information provided, to verify the same and to use
                        such Information to fulfil the Services. The information Dhan Sethu will access when You access the
                        App will include but will not be limited to credit information reports, personal information, identity
                        documents, employment information, bank statements, location information and mobile data. We will
                        also have the right to get access to Your contacts, to use such contacts as information provided to Dhan
                        Sethu and to access and reach out to them in case a need arises. By applying for our Services, it will
                        be deemed that You have consented to us accessing this information and have no objection to us
                        contacting or following up with Your contacts on Your whereabouts or to obtain other information in
                        case You are not contactable or have changed Your address after availing Services.</Text>
                    <Text style={styles.text2}>h. Dhan Sethu will retain and use Your information, even after termination of this Agreement, as
                        necessary to comply with our legal obligations, resolve disputes and enforce this or other Agreements
                        entered into by Dhan Sethu for providing the Services.</Text>
                    <Text style={[styles.text, { fontFamily: FONTS.FontBold }]}>6. Restrictions on Use</Text>
                    <Text style={styles.text2}>a. You will not access or attempt to access the App and/or the content provided through the App by any
                        means other than through the App, unless You have been permitted by Dhan Sethu through any
                        separate written Agreement.</Text>
                    <Text style={styles.text2}>b. You will not circumvent or disable any digital rights management, usage rules, or other security
                        features of App; remove, alter, or obscure any proprietary technology on any portion of the App; and
                        not use the App in a manner that threatens the integrity, performance, or availability of the App.</Text>
                    <Text style={styles.text2}>c. The User(s) shall not:</Text>
                    <Text style={styles.text2}>i. use the App and Services to acquire Advance for the purpose of forward lending to others, or for
                        any illegal activities;</Text>
                    <Text style={styles.text2}>ii. redistribute, sublicense, rent, publish, sell, assign, lease, market, transfer, or otherwise make the
                        App or any component or content thereof, available to third parties;</Text>
                    <Text style={styles.text2}>iii. attempt to gain unauthorized access to, or disrupt the integrity or performance of, the App or the
                        data contained therein;</Text>
                    <Text style={styles.text2}>iv. modify, copy or create derivative works based on the App;</Text>
                    <Text style={styles.text2}>v. reverse engineer or cause to reverse engineer the App;</Text>
                    <Text style={styles.text2}>vi. distribute viruses, Trojan horses, worms, or other similar harmful or deleterious programming
                        routines or gain unauthorized entry to any machine accessible for App;</Text>
                    <Text style={styles.text2}>vii. access App for the purpose of building competitive product or services or copying its features or
                        user interface;</Text>
                    <Text style={styles.text2}>viii. violate any applicable law, statute, ordinance or regulation in connection with use of App;</Text>
                    <Text style={styles.text2}>ix. collect information about other users of App for any illegal, unlawful or competitive purposes;</Text>
                    <Text style={styles.text2}>x. post on App any material or content that infringes, misappropriates or violates any copyright,
                        trademark, patent right or other proprietary right of any third party;</Text>
                    <Text style={styles.text2}>xi. use any bots, other automated tools or methods to access the App;</Text>
                    <Text style={styles.text2}>xii. create any Account by automated means or under false or fraudulent pretences for using the App;</Text>
                    <Text style={styles.text2}>xiii. send and/or store infringing, unlawful, defamatory, trade libellous, threatening, harassing, or
                        obscene material in connection with the Services provided; and</Text>
                    <Text style={styles.text2}>xiv. interfere with or disrupt any network services or equipment with the intent of causing an excessive
                        or disproportionate load on the App or to cause denial of service of the App.</Text>

                    <Text style={[styles.text, { fontFamily: FONTS.FontBold }]}>7. Services</Text>
                    <Text style={styles.text2}>a. When submitting a service request on the App, You agree to provide current, complete, and accurate
                        information about You. If any information You provide is untrue, inaccurate, not current, or incomplete,
                        Dhan Sethu has the right to terminate Your service request and to decline to provide any and all future
                        use of the App.</Text>
                    <Text style={styles.text2}>b. Dhan Sethu and Dhan Sethu Partner(s) reserve the right to decline User(s)’s Credit Application for an
                        Advance without revealing the reason to You. For the avoidance of doubt, Dhan Sethu and Dhan Sethu
                        Partner(s) are under no obligation whatsoever to reveal to You (including Your nominees, heirs and
                        successors) its assessment of Your creditworthiness at any point in time.</Text>
                    <Text style={styles.text2}>c. You acknowledge that Dhan Sethu allows You to submit a Credit Application on the basis of a
                        determination made by methodologies and algorithms in the App, and/or through the physical
                        verifications, if any, carried out by Dhan Sethu. Dhan Sethu undertakes a dynamic evaluation of risk in
                        relation to each Credit Application submitted by You based on various factors including the amount of
                        the Advance, the credit eligibility parameters and other requirements set out by the Dhan Sethu and
                        Dhan Sethu Partner(s). Dhan Sethu may undertake a separate determination in relation to each Credit
                        Application made by You, including physical verifications. Given the dynamic nature of the
                        determination made by Dhan Sethu, You acknowledge that there is no assurance or guarantee that
                        Dhan Sethu shall allow You to submit a Credit Application for each and every Advance that You seek
                        to avail.</Text>
                    <Text style={styles.text2}>d. You agree and accept that Dhan Sethu or Dhan Sethu Partner(s) may in its sole discretion, by itself or
                        through authorised persons, advocate, agencies, bureau, etc. verify any information given, conduct
                        physical verifications, check credit references, employment details and obtain credit reports to
                        determine User(s)’s creditworthiness from time to time.</Text>
                    <Text style={styles.text2}>e. Dhan Sethu does not guarantee that the Advance sought by You will be disbursed to You by the Dhan
                        Sethu Partner(s). Dhan Sethu will make a preliminary determination of User(s)’s creditworthiness in
                        relation to every Advance sought by You and submit its determination in this regard to the Dhan Sethu
                        Partner(s). The final decision on whether or not to grant You the Advance will rest with Dhan Sethu
                        Partner(s) and will be made using Dhan Sethu Partner(s)'s credit decisioning processes and
                        methodologies. Dhan Sethu Partner(s) is free to reject any recommendation madeby Dhan Sethu about
                        processing of a Credit Application or grant of Advance to You.</Text>
                    <Text style={styles.text2}>f. Dhan Sethu Partner(s) may require You to submit further documentation, information and details as
                        required under applicable laws and its internal policies prior to taking any decision about grant of
                        Advance to You. When Dhan Sethu Partner(s) decides to grant an Advance to You, it shall require that
                        You execute a loan/credit facility Agreement (<Text style={{ fontFamily: FONTS.FontBold }}>"Loan Documentation"</Text>) with it to record the terms of the
                        arrangement. Such Agreements could be executed digitally or physically, based on the requirements
                        of Dhan Sethu Partner(s). The Advance given to You by shall be governed by the terms mentioned in
                        the Loan Documentation.</Text>

                    <Text style={[styles.text, { fontFamily: FONTS.FontBold }]}>8. Repayment</Text>
                    <Text style={styles.text2}>a. You must repay the Advance along with all interest, charges and fees payable to Dhan Sethu
                        Partner(s) (“<Text style={{ fontFamily: FONTS.FontBold }}>Repayment Amount</Text>”), in such manner as prescribed by Dhan Sethu Partner(s), as and
                        when it becomes due.</Text>

                    <Text style={styles.text2}>b. You shall be required to do such repayments digitally through the payment gateways provided in the
                        App (“<Text style={{ fontFamily: FONTS.FontBold }}>Payment Gateway</Text>”), or through any other digital means provided by the particular Dhan Sethu
                        Partner(s). If the Dhan Sethu Partner(s) offers the facility of repaying the Repayment Amount directly
                        at their offices, You may make use of the facility to do the repayments.</Text>
                    <Text style={styles.text2}>c. Only in cases where the Repayment Amount are not repaid on time, and in the sole discretion of
                        Dhan Sethu or Dhan Sethu Partner(s), Dhan Sethu and/or Dhan Sethu Partner(s) may arrange to
                        physically collect the Repayment Amount from You. Such collections done may involve additional
                        collection charges being charged to You.</Text>
                    <Text style={styles.text2}>d. If the repayments are not done on time, Dhan Sethu and Dhan Sethu Partner(s) have the full rights to
                        report such defaults to Credit Information Companies, Your guarantors, Your Trust Circle and to such
                        authorities or individuals, and take any other lawful actions, that Dhan Sethu or Dhan Sethu Partner(s)
                        believes would be helpful to recover the pending Repayment Amount.</Text>
                    <Text style={[styles.text, { fontFamily: FONTS.FontBold }]}>9. Customer Due Diligence Requirements</Text>
                    <Text style={styles.text2}>a. You agree and acknowledge that for undertaking any financial transaction through the App, Dhan
                        Sethu may undertake due diligence measurers and seek mandatory information required for KYC
                        purpose which You are obliged to give in accordance with the applicable Prevention of Money
                        Laundering Act, 2002 and Rules. Dhan Sethu may obtain sufficient information to establish, to its
                        satisfaction or the Dhan Sethu Partner(s)'s satisfaction Your identity, and the purpose of the intended
                        nature of relationship between You and the Dhan Sethu Partner(s). You agree and acknowledge that
                        Dhan Sethu can undertake enhanced due diligence measures (including any documentation), to satisfy
                        itself relating to customer due diligence requirements in line with therequirements and obligations under
                        the applicable Prevention of Money Laundering Act, 2002 and Rules.</Text>
                    <Text style={styles.text2}>b. You agree that Dhan Sethu and/or Dhan Sethu Partner(s) are authorized to pull User(s)’s credit report
                        from various credit information companies.</Text>
                    <Text style={[styles.text, { fontFamily: FONTS.FontBold }]}>10. Collection Authorisation</Text>
                    <Text style={styles.text2}>a. You agree to allow Dhan Sethu to send You payment reminders from time-to-time at such frequency
                        and in such manner as permissible under applicable law.</Text>
                    <Text style={styles.text2}>b. You further permit Dhan Sethu to use:</Text>
                    <Text style={styles.text2}>i. any User Generated Content; and/or</Text>
                    <Text style={styles.text2}>ii. other information which You have granted Dhan Sethu access to, for the purposes of enabling
                        Dhan Sethu to send payment reminders to You or to other persons who can be contacted by Dhan
                        Sethu through You whether or not such other persons are User(s) of the App, to the extent permitted
                        under applicable law.</Text>
                    <Text style={styles.text2}>iii. You expressly permit Dhan Sethu to use any or all of the information provided or generated by You
                        in respect of:</Text>
                    <Text style={styles.text2}>1. any credit facility You may have availed from any credit issuing entity, irrespective of whether or
                        not Dhan Sethu facilitated the obtaining of such credit facility as provided for elsewhere in this
                        Agreement;</Text>
                    <Text style={styles.text2}>2. any credit facility availed of by a third party from any credit issuing agency where Dhan Sethu’s
                        analysis determines that the information You have provided Dhan Sethu will enable it to contact
                        such person by either:</Text>
                    <Text style={styles.text2}>a. deriving contact information for such third party from the information provided by or
                        generated by You and then contacting them directly; or</Text>
                    <Text style={styles.text2}>b. by contacting You and requesting if You will be willing to share contact information for such
                        third party or by requesting You to inform such third party that Dhan Sethu is attempting to
                        contact her/him.</Text>
                    <Text style={[styles.text, { fontFamily: FONTS.FontBold }]}>11. Network Access And Devices</Text>
                    <Text style={styles.text2}>You are responsible for obtaining the data network access necessary to use the App/Services. Your
                        connected mobile network's data usage rates and fees will apply when You access or use the
                        App/Services from Your mobile device. You are responsible for acquiring and updating compatible
                        hardware or devices necessary to access and use the App/Services and any updates thereto.</Text>
                    <Text style={[styles.text, { fontFamily: FONTS.FontBold }]}>12. License</Text>

                    <Text style={styles.text2}>Subject to Your compliance with these Terms, Dhan Sethu grants You a limited, non-exclusive,
                        revocable, non-transferrable license in India to: (i) access and use the App through Your personal
                        computer system or other mobile communication device solely in connection with Your use of the
                        Services; and (ii) access and use any content, information and related materials that may be made
                        available through the Services, in each case solely for Your personal, non-commercial use. Any rights
                        not expressly granted herein are reserved by Dhan Sethu.</Text>
                    <Text style={[styles.text, { fontFamily: FONTS.FontBold }]}>13. User Generated Content</Text>
                    <Text style={styles.text2}>a. By sharing or submitting any content including any data and information on the App, You agree that
                        You shall be fully and solely responsible for all content You post on the App and Dhan Sethu shall not
                        be responsible for any content You make available on or through the App.</Text>
                    <Text style={styles.text2}>b. At Dhan Sethu`s sole discretion, such content may be included in the Services and ancillary services
                        (in whole or in part or in a modified form). With respect to such content You submit or make available
                        on the App, You grant Dhan Sethu a perpetual, irrevocable, non-terminable, worldwide, royalty-free and
                        non-exclusive license to use, copy, distribute, publicly display, modify, create derivative works, and
                        sublicense such materials or any part of such content.</Text>
                    <Text style={styles.text2}>c. Dhan Sethu may use User(s)'s information to maintain, protect, and improve the Services and for
                        developing new services. Dhan Sethu may also use User(s)'s phone number, email address or other
                        personally identifiable information to send commercial or marketing messages without User(s)’s
                        consent [with an option to subscribe / unsubscribe (where feasible)]. Dhan Sethu may, however, use
                        User(s)’s email address and phone number, or contact User(s) in person, without further consent for
                        non-marketing or administrative purposes (such as notifying User(s) of major changes, for customer
                        service purposes, providing information about updates to Services, for collection of repayment against
                        Advance etc.).</Text>
                    <Text style={[styles.text, { fontFamily: FONTS.FontBold }]}>14. Intellectual Property Right</Text>
                    <Text style={styles.text2}>a. You agree and acknowledge that You has been given a limited right to access and use the App and
                        Services, during the Term of this Agreement and has not acquired any legal rights in the Intellectual
                        Property of Dhan Sethu. No other rights with respect to the App and Services or any related Intellectual
                        Property rights belonging to Dhan Sethu are granted or implied.</Text>
                    <Text style={styles.text2}>b. Dhan Sethu retains all rights, title, interest, and ownership of the Intellectual Property rights in and to
                        the App and Services including any improvements, upgrades, enhancements, derivative works, and
                        modifications thereof.</Text>
                    <Text style={styles.text2}>c. Except as expressly set forth herein, any data, reports, specifications, equipment’s, technology,
                        hardware, software, trade secrets know-how, Confidential Information or processes or the like, and any
                        other Intellectual Property owned or controlled by Dhan Sethu or development by Dhan Sethu under
                        this Agreement shall remain the property of Dhan Sethu. User(s) disclaims any right, title, or interest in
                        or to Dhan Sethu’s materials and will not take any action inconsistent with or that would contest or
                        impair the rights of Dhan Sethu. Except as expressly set forth herein, no other rights are granted by
                        Dhan Sethu to User(s) with respect to Dhan Sethu’s Intellectual Property. User(s) will not engage in
                        any practice that may be detrimental to Dhan Sethu’s marks or goodwill or reputation.
                    </Text>
                    <Text style={[styles.text, { fontFamily: FONTS.FontBold }]}>15. Limited Warranty</Text>
                    <Text style={styles.text2}>a. You understand and acknowledge that certain risks are inherent in the transmission of information
                        over the internet. By entering in to this Agreement, You have chosen to use the security measures
                        provided by Dhan Sethu even though other security measures are available. While Dhan Sethu uses
                        industry standard information security measures to protect the Services from viruses and malicious
                        attacks, Dhan Sethu does not represent or guarantee that the Services will be free from loss, corruption,
                        attack, viruses, interference, hacking, or other security intrusion, and Dhan Sethu disclaims any liability
                        relating thereto to the extent that such loss, corruption, attack, viruses, interference, hacking, or other
                        security intrusion occur despite Dhan Sethu using information security measures. Dhan Sethu warrants
                        that, during the term of this Agreement, Dhan Sethu will employ commercially reasonable system
                        security measures. Except as expressly set forth in this Clause, Dhan Sethu makes no representation,
                        warranty, covenant or Agreement that its security measures will be effective. Neither Dhan Sethu nor
                        its affiliates shall have any liability for the breach of its security measures, or the integrity of the systems
                        or computer/cloud servers that Dhan Sethu uses.</Text>

                    <Text style={styles.text2}>b. The Services are provided to You on an "as-is" and "as available basis". Dhan Sethu is not
                        responsible for any failure of the telecommunications network or other communications links utilised to
                        gain access to the Services. Dhan Sethu does not represent that the Services will meet User(s)’s
                        requirements or that operation of the Services will be uninterrupted or error free.</Text>
                    <Text style={styles.text2}>c. You further acknowledge that the Services is not intended or suitable for use in situations or
                        environments where the failure or time delays of, or errors or inaccuracies in, the content, data or
                        information provided by the Services could lead to death, personal injury, or severe physical or
                        environmental damage.</Text>
                    <Text style={styles.text2}>d. DHAN SETHU AND ITS AFFILIATES, SUBSIDIARIES, OFFICERS, DIRECTORS, EMPLOYEES,
                        AGENTS, DHAN SETHU PARTNER(S) AND LICENSORS HEREBY DISCLAIMS AND EXPRESSLY
                        WAIVES ALL OTHER, CONDITIONS, REPRESENTATIONS AND GUARANTEES, WHETHER
                        EXPRESS OR IMPLIED, ARISING BY LAW, CUSTOM, ORAL OR WRITTEN STATEMENTS OF
                        DHAN SETHU OR THIRD PARTIES INCLUDING, BUT NOT LIMITED TO, ANY WARRANTY OF
                        MERCHANTABILITY OR FITNESS FOR PARTICULAR PURPOSE OR OF ERROR-FREE AND
                        UNINTERRUPTED USE OR OF NON-INFRINGEMENT EXCEPT TO THE EXTENT EXPRESSLY
                        PROVIDED ABOVE (LIMITED WARRANTY). IN PARTICULAR, DHAN SETHU AND ITS AFFILIATES,
                        SUBSIDIARIES, OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, DHAN SETHU PARTNER(S)
                        AND LICENSORS MAKE NO WARRANTY THAT (I) THE SERVICES WILL MEET USER(S)’S
                        REQUIREMENTS; (II) USER(S)’S USE OF THE SERVICES WILL BE TIMELY, UNINTERRUPTED,
                        SECURE OR ERROR-FREE; (III) THE APP WILL FUNCTION IN ANY PARTICULAR
                        HARDWARE/DEVICES.</Text>
                    <Text style={[styles.text, { fontFamily: FONTS.FontBold }]}>16. Term And Termination</Text>
                    <Text style={styles.text2}>a. These Terms and the right to use granted hereunder shall take effect on the earliest of (i) date in
                        which You register on the App (ii) date in which You gave Your opt-in consent, and shall continue in
                        effect till You or Dhan Sethu terminates this Agreement in accordance with this Clause (“<Text style={{ fontFamily: FONTS.FontBold }}>Term</Text>”).</Text>
                    <Text style={styles.text2}>b. Dhan Sethu may terminate the Agreement with or without notice, and/or decline access of the App
                        and Services to You, at the sole discretion of Dhan Sethu (i) if Dhan Sethu is required to do so by law
                        (For example, if the provision of Services to You becomes unlawful); (ii) if the provision of the App to
                        User(s) is no longer commercially viable to Dhan Sethu; (iii) if Dhan Sethu reasonably believes that You
                        have misused the App or Services; (iv) if You breach this Agreement; (v) You have not used the App
                        for more than thirty days; (vi) for any reason.</Text>
                    <Text style={styles.text2}>c. You may terminate the Agreement by sending a termination notice to Dhan Sethu. Irrespective of
                        whether You have send a termination notice or not, You shall be bound by the Agreement as long as
                        You continue to use the App.</Text>
                    <Text style={styles.text2}>d. You shall not have a right to terminate the Agreement before you have fully repaid the Advance.</Text>
                    <Text style={styles.text2}>e. Any clauses, which by its nature is meant to survive termination of the Agreement, shall survive and
                        shall be effective and enforceable post such termination.</Text>
                    <Text style={styles.text2}>f. All accrued rights and obligations of the parties shall survive any termination of these Terms and the
                        Terms shall continue to be valid till such rights and obligations are extinguished or fulfilled.</Text>
                    <Text style={[styles.text, { fontFamily: FONTS.FontBold }]}>17. Confidential Information</Text>
                    <Text style={styles.text2}>In course of User(s)’s dealings with Dhan Sethu, either party (Disclosing Party) may share and provide
                        the other (Receiving Party) with access to its confidential and proprietary information ("<Text style={{ fontFamily: FONTS.FontBold }}>Confidential
                            Information</Text>"). Confidential Information may be disclosed either orally, visually, in writing (including
                        graphic material) or by way of consigned items. The Receiving Party agrees to take all reasonable
                        security precautions, including precautions at least as great as it takes to protect its own confidential
                        information, to protect the secrecy of the Confidential Information. Confidential Information shall be
                        disclosed only on a need-to-know basis. Except as provided herein, the parties agree to treat the same
                        as confidential and shall not divulge, directly or indirectly, to any other person, firm, corporation,
                        association or entity, for any purpose whatsoever, such information, and shall not make use of such
                        information, without the prior written consent of the Disclosing Party. Confidential Information includes
                        but is not limited to the Services, documentation, third party materials, business plans, business
                        forecasts, financial information, customer lists, development, design details, specifications, patents,
                        copyrights, trade secrets, proprietary information, methodologies, techniques, sketches, drawings,

                        models, inventions, know-how, processes, algorithms, software programs, and software source
                        documents.</Text>
                    <Text style={[styles.text, { fontFamily: FONTS.FontBold }]}>18. Privacy</Text>
                    <Text style={styles.text2}>You understand that by using the Services, You consent and agree to the collection and use of certain
                        information about You and Your use of the Services in accordance with Dhan Sethu Privacy Policy and
                        these Terms. Dhan Sethu Privacy Policy applies to all User(s)’s information collected under these
                        Terms. You further understand and agree that this information may be transferred to other countries for
                        storage, processing and use by Dhan Sethu, its affiliates, and/or their service providers in accordance
                        with applicable law.</Text>
                    <Text style={[styles.text, { fontFamily: FONTS.FontBold }]}>19. Indemnity</Text>
                    <Text style={styles.text2}>a. You shall defend, indemnify and hold harmless Dhan Sethu, its officers, directors, employees and
                        agents, from and against any and all claims, damages, obligations, losses, liabilities, debts and costs
                        (including attorney fees), brought against Dhan Sethu by third parties alleging</Text>
                    <Text style={styles.text2}>i. User(s)’s use of and access of the Services;</Text>
                    <Text style={styles.text2}>ii. User(s)’s violation of these Terms;</Text>
                    <Text style={styles.text2}>iii. User(s)’s violation of any third party right, including without limitation any copyright, property, or
                        privacy right; or</Text>
                    <Text style={styles.text2}>iv. any claim that the User Generated Content You submitted caused damage.
                        User(s)’s indemnification obligation under this Clause will survive termination of this Agreement and
                        User(s)’s use of the Services.</Text>
                    <Text style={[styles.text, { fontFamily: FONTS.FontBold }]}>20. Limitation Of Liability</Text>
                    <Text style={styles.text2}>a. IN NO EVENT SHALL DHAN SETHU BE LIABLE, WHETHER IN CONTRACT, TORT (INCLUDING
                        NEGLIGENCE) OR OTHERWISE FOR ANY LOSS OF PROFITS, BUSINESS, CONTRACTS, OR
                        REVENUES, LOSS OF OPERATION TIME, INCREASED COSTS OR WASTED EXPENDITURE,
                        LOSS OF GOODWILL OR REPUTATION, SPECIAL, INDIRECT, INCIDENTAL PUNITIVE OR
                        CONSEQUENTIAL DAMAGE OF ANY NATURE WHATSOEVER OR HOWSOEVER ARISING OUT
                        OF THIS AGREEMENT.</Text>
                    <Text style={styles.text2}>b. THE MAXIMUM AGGREGATE AMOUNT THAT YOU OR ANY PARTY CLAIMING THROUGH YOU
                        CAN RECOVER FROM DHAN SETHU AND ITS AFFILIATES, OFFICERS, EMPLOYEES, AGENTS
                        AND PROFESSIONAL ADVISORS FOR ALL CLAIMS ARISING FROM, UNDER OR RELATING TO
                        THIS AGREEMENT (WHETHER IN CONTRACT, TORT INCLUDING NEGLIGENCE OR
                        OTHERWISE) WILL IN NO EVENT EXCEED SERVICE FEE CHARGED BY DHAN SETHU, IF ANY,
                        DIRECTLY FROM YOU IN THE LAST 3 (THREE) MONTHS PRECEDING THE DATE OF CLAIM.
                    </Text>
                    <Text style={[styles.text, { fontFamily: FONTS.FontBold }]}>21. Assignment</Text>
                    <Text style={styles.text2}>You shall not assign this Agreement without the prior written consent of Dhan Sethu.</Text>
                    <Text style={[styles.text, { fontFamily: FONTS.FontBold }]}>22. Governing Law</Text>
                    <Text style={styles.text2}>The Parties hereby agree that this Agreement shall be governed by and construed in accordance with
                        the laws of India, without regard to its conflict of laws principles. Any and all disputes that arise under
                        this Agreement shall be subject to the exclusive jurisdiction of the competent courts in Ernakulam,
                        Kerala, India.</Text>
                    <Text style={[styles.text, { fontFamily: FONTS.FontBold }]}>23. Force Majeure</Text>
                    <Text style={styles.text2}>Dhan Sethu shall not be liable to the User(s) for failure or delay in the performance of Services, if such
                        failure or delay is caused by strike, riot, fire, flood, natural disaster, pandemic, failure of Dhan Sethu
                        Partner(s) to perform their obligations or other similar cause beyond Dhan Sethu’s control.</Text>
                    <Text style={[styles.text, { fontFamily: FONTS.FontBold }]}>24. Waiver</Text>
                    <Text style={styles.text2}>No waiver of any breach of any provision of this Agreement shall constitute a waiver of any prior,
                        concurrent or subsequent breach of the same or any other provisions of this Agreement. Further, no
                        waiver shall be effective unless made in writing and signed by an authorised signatory of the waiving
                        party.</Text>
                    <Text style={[styles.text, { fontFamily: FONTS.FontBold }]}>25. Severability</Text>
                    <Text style={styles.text2}>Any provision in this Agreement, which is or may become prohibited or unenforceable shall be
                        ineffective to the extent of such prohibition or unenforceability without invalidating the remaining
                        provisions of this Agreement. Without prejudice to the foregoing, Dhan Sethu reserves the right to
                        replace the prohibited or unenforceable provision with a valid provision that closely matches the intent
                        of the original provision. The such newly replaced provision shall supersede the original provision.</Text>
                    <Text style={[styles.text, { fontFamily: FONTS.FontBold }]}>26. Notices</Text>
                    <Text style={styles.text2}>a. Dhan Sethu may post notices and other communications made or required to be given under this
                        Agreement to Users(s) within the App or send you notices in email address or the telephone number
                        that you may have shared with us or send that through registered post with acknowledgment to your
                        address.</Text>
                    <Text style={styles.text2}>b. Any notice to be given to Dhan Sethu by You shall be sent through email or registered post with
                        acknowledgement due to the address specified below:</Text>
                    <Text style={[styles.text2, { backgroundColor: 'yellow', alignSelf: 'flex-start' }]}>Email: info@dhansethu.com</Text>
                    <Text style={styles.text2}>Address: Dhan Sethu DigiFin (P) Ltd., Bizcospaces, 8
                        th Floor, Infra Futura, Opp. Bharat Matha College,
                        Thrikkakara, Ernakulam, Kerala- 682021</Text>
                    <Text style={styles.text2}>c. The receiving Party will be deemed to have received the notice within 3 (Three) days of posting/sending
                        the notice. User(s) continued use of the App on expiry of such 3 (Three) days shall constitute User(s)’s
                        receipt and acceptance of the notices sent to User(s).</Text>
                    <Text style={[styles.text, { fontFamily: FONTS.FontBold }]}>27. Entire Agreement</Text>
                    <Text style={styles.text2}>These Terms along with any supplementary terms or addendum as may be prescribed by Dhan Sethu
                        or Dhan Sethu Partner(s) constitute the entire Agreement between the parties pertaining to the subject
                        matter contained herein and any written or oral Agreements existing between the parties or
                        modifications to these Terms shall have no force or effect unless expressly agreed to in writing or
                        acknowledged in writing by Dhan Sethu.</Text>
                    <Text style={[styles.text, { backgroundColor: 'yellow', alignSelf: 'flex-start' }]}>Last Updated On: 18th April, 2023</Text>
                </View>
            </ScrollView>
        </SafeAreaProvider>
    )
}

export default Terms;

const styles = StyleSheet.create({
    container1: {
        flex: 0,
        backgroundColor: "#002B59",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    ViewContent: {
        flex: 1,
        marginHorizontal: 20,
        paddingBottom: 20,
    },
    text: {
        fontWeight: '400',
        fontFamily: FONTS.FontRegular,
        fontSize: 14,
        marginTop: 12,
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