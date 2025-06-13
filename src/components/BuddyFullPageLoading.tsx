import React from 'react';
import { ActivityIndicator, View} from 'react-native';
import { screenHeight, screenWidth } from '../utils/Constants';
import { useSelector } from 'react-redux';

const BuddyFullPageLoading = () => {
  const { loader } = useSelector((state) => state.auth);

  return (
    loader &&
      <ActivityIndicator size="large" style={{
        height: screenHeight,
        width: screenWidth
      }} />
  );
};

export default BuddyFullPageLoading;