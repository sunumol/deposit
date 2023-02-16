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
import ScheduleMeet from '../Screens/ScheduleMeet';
import Collect from '../Screens/Collect';
import AddVehicle from '../Screens/AddVehicle';
import VehicleOwn from '../Screens/VehicleOwn';
import WhiteGoodsOwner from '../Screens/WhiteGoodsOwner';
import EnergyUtility from '../Screens/EnergyUtility'; 
const Stack = createNativeStackNavigator();


export default function Router() {
  const netInfo = useNetInfo();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="IntroScreen" component={netInfo.isConnected ? IntroScreens : NetWorkError} />
        <Stack.Screen name="LoginScreen" component={netInfo.isConnected ? LoginScreen : NetWorkError} />
        <Stack.Screen name="Permission" component={netInfo.isConnected ? Permission : NetWorkError} />
        <Stack.Screen name="CreatePin" component={netInfo.isConnected ? CreatePin : NetWorkError} />
        <Stack.Screen name="Profile" component={netInfo.isConnected ? Profile : NetWorkError} />
        <Stack.Screen name="Privacy" component={netInfo.isConnected ? PrivacyPolicy : NetWorkError} />
        <Stack.Screen name="Terms" component={netInfo.isConnected ? Terms : NetWorkError} />
        <Stack.Screen name="ActivityScreens" component={netInfo.isConnected ? ActivityScreens : NetWorkError} />
        <Stack.Screen name="NewLead" component={netInfo.isConnected ? NewLead : NetWorkError} />
        <Stack.Screen name="ResetPin" component={netInfo.isConnected ? ResetPin : NetWorkError} />
        <Stack.Screen name="ForgotPin" component={netInfo.isConnected ? ForgotPin : NetWorkError} />
        <Stack.Screen name="PinScreen" component={netInfo.isConnected ? PinScreen : NetWorkError} />
        <Stack.Screen name="NewCgt" component={netInfo.isConnected ? NewCgt : NetWorkError} />
        <Stack.Screen name="SelectCustomer" component={netInfo.isConnected ? SelectCustomer : NetWorkError} />
        <Stack.Screen name="CGT" component={netInfo.isConnected ? CGT : NetWorkError} />
        <Stack.Screen name="Activities" component={netInfo.isConnected ? Activities : NetWorkError} />
        <Stack.Screen name="CgtCustomer" component={netInfo.isConnected ? CgtCustomer : NetWorkError} />
        <Stack.Screen name="CreateTrustCircle" component={netInfo.isConnected ? CreateTrustCircle : NetWorkError} />
        <Stack.Screen name="ConfirmMembers" component={netInfo.isConnected ? ConfirmMembers : NetWorkError} />
        <Stack.Screen name="ContinuingGuarantor" component={netInfo.isConnected ? ContinuingGuarantor : NetWorkError} />
        <Stack.Screen name="SelectCustomerCall" component={netInfo.isConnected ? SelectCustomerCall : NetWorkError} />
        <Stack.Screen name="AboutUs" component={netInfo.isConnected ? AboutUs : NetWorkError} />
        <Stack.Screen name="FAQ" component={netInfo.isConnected ? FAQ : NetWorkError} />
        <Stack.Screen name="Language" component={netInfo.isConnected ? Language : NetWorkError} />
        <Stack.Screen name="NewCall" component={netInfo.isConnected ? NewCall : NetWorkError} />
        <Stack.Screen name="ProfileScreen" component={netInfo.isConnected ? ProfileScreen : NetWorkError} />
        <Stack.Screen name="ChangeMPIN" component={netInfo.isConnected ? ChangeMPIN : NetWorkError} />
        <Stack.Screen name="DLESchedule" component={netInfo.isConnected ? DLESchedule : NetWorkError} />
        <Stack.Screen name="DetailCheck" component={netInfo.isConnected ? DetailCheck : NetWorkError} />
        <Stack.Screen name="ResidenceOwner" component={netInfo.isConnected ? ResidenceOwner : NetWorkError} />
        <Stack.Screen name="CustomerDetails" component={netInfo.isConnected ? CustomerDetails: NetWorkError} />
        <Stack.Screen name="ScheduleMeet" component={netInfo.isConnected ? ScheduleMeet : NetWorkError} />
        <Stack.Screen name="Collect" component={netInfo.isConnected ? Collect : NetWorkError} />
        <Stack.Screen name="AddVehicle" component={netInfo.isConnected ? AddVehicle : NetWorkError} />
        <Stack.Screen name="VehicleOwn" component={netInfo.isConnected ? VehicleOwn : NetWorkError} />
        <Stack.Screen name="WhiteGoodsOwner" component={netInfo.isConnected ? WhiteGoodsOwner : NetWorkError} />
        <Stack.Screen name="EnergyUtility" component={netInfo.isConnected ? EnergyUtility : NetWorkError} />
   </Stack.Navigator>
    </NavigationContainer>
  );
}
