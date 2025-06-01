import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { screenHeight, screenWidth } from '../utils/Constants';

type BuddyContainerProps = {
  children: React.ReactNode;
};

function BuddyContainer({ children }: BuddyContainerProps): React.JSX.Element {
  return (
    <View style={styles.container}>
        <View style={styles.midCircle}></View>
        <View style={styles.bigCircle}></View>
        <View style={styles.smallCircle}></View>
        
        {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#F3F3F3'
  },
  midCircle: {
    height: 300,
    width: 300,
    borderRadius: 300,
    backgroundColor: '#fbfbfb',
    position: 'absolute',
    left: '60%',
    bottom: '60%'
  },
  bigCircle: {
    height: 500,
    width: 500,
    borderRadius: 500,
    backgroundColor: '#fbfbfb',
    position: 'absolute',
    left: '60%',
    bottom: '20%'
  },
  smallCircle: {
    height: 150,
    width: 150,
    borderRadius: 150,
    backgroundColor: '#fbfbfb',
    position: 'absolute',
    left: '5%',
    bottom: '50%'
  },
  backgroundImage: {
    height: screenHeight,
    width: screenWidth,
    flex: 1,
    backgroundColor: '#000000'
  },
});

export default BuddyContainer;