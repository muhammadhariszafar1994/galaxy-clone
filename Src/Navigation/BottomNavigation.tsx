// Src/Navigation/BottomTabs.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Screen/UserScreens/HomeScreens';
import Explore from '../Screen/UserScreens/Explore';
import Journal from '../Screen/UserScreens/Journal';
import Profile from '../Screen/UserScreens/Profile';
import { Image } from 'react-native';
import { ICONS } from '../Constants/IMAGES';

export type BottomTabParamList = {
  Home: undefined;
  Explore: undefined;
  Journal: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0A1F44',
          borderTopColor: '#1E3A8A',
          height: 100,
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#aaa',
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 8, // label ko thoda upar laye
        },
        tabBarIconStyle: {
          marginTop: 8, // icon ko neeche shift karega bina label ke overlap ke
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={ICONS.homeIcons}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? '#fff' : '#aaa',
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={ICONS.exploreicons}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? '#fff' : '#aaa',
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Journal"
        component={Journal}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={ICONS.journalIcons}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? '#fff' : '#aaa',
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={ICONS.UserIcons}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? '#fff' : '#aaa',
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
