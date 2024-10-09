import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../firebase/firebase.config"; // Ensure this path is correct

// Onboarding and Authentication Screens
import Onboarding from "../screens/OnBording/completeScreen";
import LoginComponent from "../screens/SignIn/SignIn";
import SignUp from "../screens/SignUp/signUp";
import Profile from "../screens/SignUp/Profile";
import Signature from "../screens/SignUp/signature";
import Artwork from "../screens/SignUp/ArtWork";
import Payment from "../screens/SignUp/Payment";

// Main App Screens
import TabsNavigation from "./TabsNavigation";
import Artworks from "../screens/Tabs/Artworks/Artworks";
import Artworks2 from "../screens/Artworks/Artworks";
import NewArtwork from "../screens/Artworks/newArtwork/index";
import Exhibitions from "../screens/Tabs/Exhibitions/Exhibitions";
import NewExhibition from "../screens/Exhibitions/NewExhibition";
import ExhibitionCollection from "../screens/Exhibitions/ExhibitionCollection";
import ExhibitionShow from "../screens/Exhibitions/ExhibitionCollectionShow";
import Congradulations from "../screens/Exhibitions/Congratulations";
import ExhibitionShow2 from "../screens/Tabs/Exhibitions/ExhibitionShow";
import Notifications from "../screens/Tabs/Notifications/Notifications";
import NotificationShow from "../screens/Tabs/Notifications/NotificationShow";
import NotificationPolicy from "../screens/Tabs/Notifications/NotificationsPolicy";
import Profiles from "../screens/Tabs/Profile/Profile";
import EditProfile from "../screens/Tabs/Profile/ProfileShow";
import DashboardScreen from "../screens/Tabs/Dashboard/Dashboard";

const Stack = createNativeStackNavigator();

const MainStack = () => {
  const [initialRoute, setInitialRoute] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        console.log("User is signed in:", user);
        setInitialRoute("Tabs"); // Navigate to main tabs
      } else {
        console.log("No user is signed in.");
        setInitialRoute("Onboarding"); // Navigate to onboarding/login
      }
      setLoading(false);
    });

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, []);

  if (loading || initialRoute === null) {
    // Optionally render a loading indicator here
    return null;
  }

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{ headerShown: false }}
    >
      {/* Authentication Screens */}
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Login" component={LoginComponent} />
      <Stack.Screen name="Signup" component={SignUp} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Artwork" component={Artwork} />
      <Stack.Screen name="Signature" component={Signature} />
      <Stack.Screen name="Payment" component={Payment} />

      {/* Main App Screens */}
      <Stack.Screen name="Tabs" component={TabsNavigation} />
    </Stack.Navigator>
  );
};

// Other stack definitions remain unchanged
const DashboardStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="NewArtwork" component={NewArtwork} />
      {/* Add other screens if necessary */}
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
      <Stack.Screen name="ExhibitionCollection" component={ExhibitionCollection} />
      <Stack.Screen name="ExhibitionShow" component={ExhibitionShow} />
      <Stack.Screen name="ExhibitionShow2" component={ExhibitionShow2} />
      <Stack.Screen name="Congradulations" component={Congradulations} />
    </Stack.Navigator>
  );
};

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
