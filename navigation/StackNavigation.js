import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// Onboarding
import Onboarding from "../screens/OnBording/completeScreen";
//SignIn
import LoginComponent from "../screens/SignIn/SignIn";
//SignUp
import SignUp from "../screens/SignUp/signUp";
import Profile from "../screens/SignUp/Profile";
import Signature from "../screens/SignUp/signature";
import Artwork from "../screens/SignUp/ArtWork";
import Payment from "../screens/SignUp/Payment";
//Tabs Navigation
import TabsNavigation from "./TabsNavigation";
//Artworks
import Artworks from "../screens/Tabs/Artworks/Artworks";
import Artworks2 from "../screens/Artworks/Artworks";
import NewArtwork from "../screens/Artworks/newArtwork/index";

//Exhibitions
import Exhibitions from "../screens/Tabs/Exhibitions/Exhibitions";
import NewExhibition from "../screens/Exhibitions/NewExhibition";
import ExhibitionCollection from "../screens/Exhibitions/ExhibitionCollection";
import ExhibitionShow from "../screens/Exhibitions/ExhibitionCollectionShow";
import Congradulations from "../screens/Exhibitions/Congratulations";

//ExhibtionShowStack
import ExhibitionShow2 from "../screens/Tabs/Exhibitions/ExhibitionShow";

//Notifications
import Notifications from "../screens/Tabs/Notifications/Notifications";
import NotificationShow from "../screens/Tabs/Notifications/NotificationShow";
import NotificationPolicy from "../screens/Tabs/Notifications/NotificationsPolicy";
//Profile
import Profiles from "../screens/Tabs/Profile/Profile";
import EditProfile from "../screens/Tabs/Profile/ProfileShow";
//Dashboard
import DashboardScreen from "../screens/Tabs/Dashboard/Dashboard";

//import Artworks from "../screens/Artworks/Artworks";

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Onboarding"
    >
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Login" component={LoginComponent} />
      <Stack.Screen name="Signup" component={SignUp} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Artwork" component={Artwork} />
      <Stack.Screen name="Signature" component={Signature} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="Tabs" component={TabsNavigation} />
    </Stack.Navigator>
  );
};

const DashboardStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="NewArtwork" component={NewArtwork} />
      {/* <Stack.Screen name="AddArtwork" component={AddArtwork} />
      <Stack.Screen name="SearchArtwork" component={SearchArtwork} /> */}
    </Stack.Navigator>
  );
};

const ArtworkStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Artworks" component={Artworks} />
      <Stack.Screen name="Artworks2" component={Artworks2} />
      <Stack.Screen name="NewArtwork" component={NewArtwork} />
    </Stack.Navigator>
  );
};
// const ArtworkShowStack = () => {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Artworks" component={Artworks} />
//     </Stack.Navigator>
//   );
// };
const NotificationStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="NotificationShow" component={NotificationShow} />
      <Stack.Screen name="NotificationPolicy" component={NotificationPolicy} />
    </Stack.Navigator>
  );
};

const ExhibitionStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Exhibitions" component={Exhibitions} />
      <Stack.Screen name="NewExhibition" component={NewExhibition} />
      <Stack.Screen
        name="ExhibitionCollection"
        component={ExhibitionCollection}
      />
      <Stack.Screen name="ExhibitionShow" component={ExhibitionShow} />
      <Stack.Screen name="ExhibitionShow2" component={ExhibitionShow2} />

      <Stack.Screen name="Congradulations" component={Congradulations} />
    </Stack.Navigator>
  );
};

// const ExhibitionShowStack = () => {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Exhibitions" component={Exhibitions} />
//     </Stack.Navigator>
//   );
// };
const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={Profiles} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
};

export {
  MainStack,
  DashboardStack,
  ArtworkStack,
  NotificationStack,
  ExhibitionStack,
  ProfileStack,
};
