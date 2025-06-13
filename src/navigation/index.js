// Navigation.js
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { ActivityIndicator, View, Text } from 'react-native';

import PublicNavigation from './public';
import PrivateNavigation from './private';
import { store } from '../store/store';

const Navigation = () => {
  const { token, loading } = useSelector(state => state.auth);
  const [isConnected, setIsConnected] = useState(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false)
  //   },1000)
  // }, [])

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected && state.isInternetReachable !== false);
    });

    // Initial fetch (optional if you want instant value before the listener fires)
    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected && state.isInternetReachable !== false);
    });

    return () => unsubscribe();
  }, []);

  if (isConnected === null) {
    // Still checking connectivity
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!isConnected) {
    // No internet
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <Text style={{ fontSize: 18, color: '#333' }}>No Internet Connection</Text>
      </View>
    );
  }

  // Normal navigation
  return (
    <NavigationContainer>
      {token ? <PrivateNavigation /> : <PublicNavigation />}
    </NavigationContainer>
  );
};

export default Navigation;
