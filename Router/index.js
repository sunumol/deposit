import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../Screens/SplashScreen';
import IntroScreens from '../Screens/IntroScreens';
import LoginScreen from '../Screens/LoginScreen';
import Permission from '../Screens/Permission';
import CreatePin from '../Screens/CreatePin';
import Profile from '../Screens/Profile'
import PrivacyPolicy from '../Screens/PrivacyPolicy'
import Terms from '../Screens/Terms';
import ActivityScreens from '../Screens/ActivityScreens';
import NewLead from '../Screens/NewLead';
import ResetPin from '../Screens/ResePin';
import ForgotPin from '../Screens/ForgotPin';
import PinScreen from '../Screens/PinScreen';
import NetWorkError from '../Screens/NetWorkError';
import SelectCustomer from '../Screens/SelectCustomer';
import CGT from '../Screens/CGT';
import CgtCustomer from '../Screens/CGTCustomer';
import { useNetInfo } from "@react-native-community/netinfo";
import NewCgt from '../Screens/NewCgt';
import CreateTrustCircle from '../Screens/CreateTrustCircle';
import Activities from '../Screens/Activities';
import ConfirmMembers from '../Screens/ConfirmMembers';
import ContinuingGuarantor from '../Screens/ContinuingGuarantor';
import UploadVid from '../Screens/UploadVid/UploadVid'
import SelectCustomerCall from '../Screens/SelectCustomCall';
import AboutUs from '../Screens/AboutUs';
import FAQ from '../Screens/FAQ';
import Language from '../Screens/Language';
import NewCall from '../Screens/NewCall';
import ChangeMPIN from '../Screens/ChangeMPIN';
import ProfileScreen from '../Screens/ProfileScreen';
import DLESchedule from '../Screens/DLEschedule';
import DetailCheck from '../Screens/DetailedCheck';
import CustomerDetails from '../Screens/CustomerDetails';
import ResidenceOwner from '../Screens/ResidenceOwner';
import HousePhoto from '../Screens/HousePhoto';
import ScheduleMeet from '../Screens/ScheduleMeet';
import Collect from '../Screens/Collect';
import AddVehicle from '../Screens/AddVehicle';
import VehicleOwn from '../Screens/VehicleOwn';
import WhiteGoodsOwner from '../Screens/WhiteGoodsOwner';
import EnergyUtility from '../Screens/EnergyUtility';
import IncomeDetails from '../Screens/IncomeDetails';
import IncomeDetailsSpouse from '../Screens/IncomeDetailsSpouse';
import DebitDetails from '../Screens/DebitDetails';
import Proceed from '../Screens/Proceed';
import DLECompleted from '../Screens/HousePhoto/Components/DLECompleted';
import Collection from '../Screens/Collection';
import LoanDetailsCollect from '../Screens/LoanDetailsCollect';
import Dashboard from '../Screens/Dashboard';
import SelectCustomerNewCgt from '../Screens/SelectCustomNewCgt';
import CorrectionScreen from '../Screens/CorrectionScreen';
import Calendar from '../Screens/Calendar'
import CalendarActivity from '../Screens/CalendarActivity';
import SelectCalendar from '../Screens/SelectCalendar'

import { navigationRef } from './RootNavigation';

const Stack = createNativeStackNavigator();

export default function Router() {

  const netInfo = useNetInfo();

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="IntroScreen" component={netInfo.isConnected ? IntroScreens : NetWorkError} />
        <Stack.Screen name="LoginScreen" component={netInfo.isConnected ? LoginScreen : NetWorkError} />
        <Stack.Screen name="Permission" component={netInfo.isConnected ? Permission : NetWorkError} />
        <Stack.Screen name="CreatePin" component={netInfo.isConnected ? CreatePin : NetWorkError} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Privacy" component={netInfo.isConnected ? PrivacyPolicy : NetWorkError} />
        <Stack.Screen name="Terms" component={netInfo.isConnected ? Terms : NetWorkError} />
        <Stack.Screen name="ActivityScreens" component={ActivityScreens} />
        <Stack.Screen name="NewLead" component={netInfo.isConnected ? NewLead : NetWorkError} />
        <Stack.Screen name="ResetPin" component={netInfo.isConnected ? ResetPin : NetWorkError} />
        <Stack.Screen name="ForgotPin" component={netInfo.isConnected ? ForgotPin : NetWorkError} />
        <Stack.Screen name="PinScreen" component={netInfo.isConnected ? PinScreen : NetWorkError} />
        <Stack.Screen name="NewCgt" component={netInfo.isConnected ? NewCgt : NetWorkError} />
        <Stack.Screen name="SelectCustomer" component={netInfo.isConnected ? SelectCustomer : NetWorkError} />
        <Stack.Screen name="CGT" component={netInfo.isConnected ? CGT : NetWorkError} />
        <Stack.Screen name="Activities" component={netInfo.isConnected ? Activities : NetWorkError} />
        <Stack.Screen name="CgtCustomer" component={netInfo.isConnected ? CgtCustomer : NetWorkError} />
        <Stack.Screen name="CreateTrustCircle" component={CreateTrustCircle} />
        <Stack.Screen name="ConfirmMembers" component={netInfo.isConnected ? ConfirmMembers : NetWorkError} />
        <Stack.Screen name="ContinuingGuarantor" component={netInfo.isConnected ? ContinuingGuarantor : NetWorkError} />
        <Stack.Screen name="SelectCustomerCall" component={netInfo.isConnected ? SelectCustomerCall : NetWorkError} />
        <Stack.Screen name="AboutUs" component={netInfo.isConnected ? AboutUs : NetWorkError} />
        <Stack.Screen name="FAQ" component={netInfo.isConnected ? FAQ : NetWorkError} />
        <Stack.Screen name="Language" component={netInfo.isConnected ? Language : NetWorkError} />
        <Stack.Screen name="NewCall" component={netInfo.isConnected ? NewCall : NetWorkError} />
        <Stack.Screen name="ProfileScreen" component={netInfo.isConnected ? ProfileScreen: NetWorkError} />
        <Stack.Screen name="ChangeMPIN" component={netInfo.isConnected ? ChangeMPIN : NetWorkError} />
        <Stack.Screen name="DLESchedule" component={netInfo.isConnected ? DLESchedule : NetWorkError} />
        <Stack.Screen name="DetailCheck" component={netInfo.isConnected ? DetailCheck : NetWorkError} />
        <Stack.Screen name="ResidenceOwner" component={netInfo.isConnected ? ResidenceOwner : NetWorkError} />
        <Stack.Screen name="HousePhoto" component={netInfo.isConnected ? HousePhoto : NetWorkError} />
        <Stack.Screen name="DLECompleted" component={netInfo.isConnected ? DLECompleted : NetWorkError} />
        <Stack.Screen name="CustomerDetails" component={netInfo.isConnected ? CustomerDetails : NetWorkError} />
        <Stack.Screen name="ScheduleMeet" component={netInfo.isConnected ? ScheduleMeet : NetWorkError} />
        <Stack.Screen name="Collect" component={netInfo.isConnected ? Collect : NetWorkError} />
        <Stack.Screen name="AddVehicle" component={netInfo.isConnected ? AddVehicle : NetWorkError} />
        <Stack.Screen name="VehicleOwn" component={netInfo.isConnected ? VehicleOwn : NetWorkError} />
        <Stack.Screen name="WhiteGoodsOwner" component={netInfo.isConnected ? WhiteGoodsOwner : NetWorkError} />
        <Stack.Screen name="EnergyUtility" component={netInfo.isConnected ? EnergyUtility : NetWorkError} />
        <Stack.Screen name="IncomeDetails" component={netInfo.isConnected ? IncomeDetails : NetWorkError} />
        <Stack.Screen name="IncomeDetailsSpouse" component={netInfo.isConnected ? IncomeDetailsSpouse : NetWorkError} />
        <Stack.Screen name="DebitDetails" component={netInfo.isConnected ? DebitDetails : NetWorkError} />
        <Stack.Screen name="Proceed" component={netInfo.isConnected ? Proceed : NetWorkError} />
        <Stack.Screen name="Collection" component={netInfo.isConnected ? Collection : NetWorkError} />
        <Stack.Screen name="LoanDetailsCollect" component={netInfo.isConnected ? LoanDetailsCollect : NetWorkError} />
        <Stack.Screen name="Dashboard" component={netInfo.isConnected ? Dashboard : NetWorkError} />
        <Stack.Screen name="SelectCustomerNewCgt" component={netInfo.isConnected ? SelectCustomerNewCgt : NetWorkError} />
        <Stack.Screen name="UploadVid" component={netInfo.isConnected ? UploadVid : NetWorkError} />
        <Stack.Screen name="CorrectionScreen" component={netInfo.isConnected ? CorrectionScreen : NetWorkError} />

        {/* --------------------------- Calendar Navigation Screens Start ---------------------------------------*/}
        <Stack.Screen name="Calendar" component={netInfo.isConnected ? Calendar : NetWorkError} />
        <Stack.Screen name="CalendarActivity" component={netInfo.isConnected ? CalendarActivity : NetWorkError} />
        <Stack.Screen name="SelectCalendar" component={netInfo.isConnected ? SelectCalendar : NetWorkError} />
        {/* --------------------------- Calendar Navigation Screens End -----------------------------------------*/}

      </Stack.Navigator>
    </NavigationContainer>
  );
}