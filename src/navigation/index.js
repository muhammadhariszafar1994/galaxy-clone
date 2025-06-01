import {NavigationContainer} from '@react-navigation/native';
import React, { useEffect } from 'react';
import PublicNavigation from './public';
import PrivateNavigation from './private';
import { useSelector } from 'react-redux';

const Navigation = () => {
  const { token } = useSelector(state => state.auth);

  useEffect(() => {
    console.log('token', token)
  }, [token])

  return (
    <>
      <NavigationContainer>
        { token ? <PrivateNavigation /> : <PublicNavigation /> }
      </NavigationContainer>
    </>
  );
};

export default Navigation;
