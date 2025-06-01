import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { screens } from '../../utils/Constants';
import Welcome from '../../screens/public/Welcome';
import Login from '../../screens/public/Login';
import ChangePassword from '../../screens/public/ChangePassword';
import ForgotPassword from '../../screens/public/ForgotPassword';
import ResetYourPassword from '../../screens/public/ResetYourPassword';
import PasswordUpdatedSuccessfully from '../../screens/public/PasswordUpdatedSuccessfully';
import PasswordResetSuccessfully from '../../screens/public/PasswordResetSuccessfully';
import PreferredLanguage from '../../screens/public/PreferredLanguage';

const Stack = createNativeStackNavigator();

const PublicNavigation = () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={'welcome'}>
          <Stack.Screen name={'welcome'} component={Welcome} />
          <Stack.Screen name={'login'} component={Login} />
          <Stack.Screen name={'forgot-password'} component={ForgotPassword} />
          <Stack.Screen name={'change-password'} component={ChangePassword} />
          <Stack.Screen name={'reset-your-password'} component={ResetYourPassword} />
          <Stack.Screen name={'password-updated-successfully'} component={PasswordUpdatedSuccessfully} />
          <Stack.Screen name={'password-reset-successfully'} component={PasswordResetSuccessfully} />
          <Stack.Screen name={'preferred-language'} component={PreferredLanguage} />
      </Stack.Navigator>
    </>
  );
};

export default PublicNavigation;