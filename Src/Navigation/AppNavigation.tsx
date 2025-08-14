// AppNavigation.tsx (ya .js)
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import UserNavigation from '../Navigation/UserNavigation';

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <UserNavigation />
    </NavigationContainer>
  );
}