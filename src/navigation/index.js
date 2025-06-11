// Navigation.js
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PublicNavigation from './public';
import PrivateNavigation from './private';
import { ActivityIndicator, View } from 'react-native';

const Navigation = () => {
  const { token } = useSelector(state => state.auth);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false)
  //   },1000)
  // }, [])

  // if (loading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }
  
  return (
    <NavigationContainer>
      { token ? <PrivateNavigation /> : <PublicNavigation /> }
    </NavigationContainer>
  );
};

export default Navigation;
