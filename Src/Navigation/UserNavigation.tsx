import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import Meditation from '../Screen/UserScreens/Meditation';
import Explore from '../Screen/UserScreens/Explore';
import Calm from '../Screen/UserScreens/Calm';
import Journal from '../Screen/UserScreens/Journal';
import Music from '../Screen/UserScreens/Music';
import Universe from '../Screen/UserScreens/Universe';
import Profile from '../Screen/UserScreens/Profile';
import ThroughUniverse from '../Screen/UserScreens/ThroughUniverse';
import loginscreen from '../Screen/UserScreens/loginscreen';
import Travel from '../Screen/UserScreens/Travel';

// Bottom Tabs
import BottomNavigation from './BottomNavigation';

export type UserStackParamList = {
  Home: undefined;
  loginscreen: undefined;
  Meditation: undefined;
  Explore: undefined;
  Calm: undefined;
  Journal: undefined;
  Music: undefined;
  Universe: undefined;
  Profile: undefined;
  ThroughUniverse: undefined;
  Travel: undefined;
};

const Stack = createNativeStackNavigator<UserStackParamList>();

const UserNavigation: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="loginscreen" screenOptions={{ headerShown: false }}>
      {/* Login Screen */}
      <Stack.Screen name="loginscreen" component={loginscreen} />

      {/* Bottom Navigation as Home */}
      <Stack.Screen name="Home" component={BottomNavigation} />

      {/* Other Screens */}
      <Stack.Screen name="Meditation" component={Meditation} />
      <Stack.Screen name="Explore" component={Explore} />
      <Stack.Screen name="Calm" component={Calm} />
      <Stack.Screen name="Journal" component={Journal} />
      <Stack.Screen name="Music" component={Music} />
      <Stack.Screen name="Universe" component={Universe} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="ThroughUniverse" component={ThroughUniverse} />
            <Stack.Screen name="Travel" component={Travel} />
    </Stack.Navigator>
  );
};

export default UserNavigation;
