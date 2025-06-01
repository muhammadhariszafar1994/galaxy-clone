import React from 'react';
import { StyleSheet, View, ImageBackground, Text, StyleProp, ViewStyle, Image } from 'react-native';
import { screenHeight, screenWidth } from '../utils/Constants';

type BuddyCardProps = {
  style?: StyleProp<ViewStyle>;
};

function BuddyHelloGreeting({ 
  style
}: BuddyCardProps): React.JSX.Element {
  return (
    <>
      <View style={[styles.container, style]}>
        <Image style={[styles.imageCut]} source={require('./../assets/images/purple-cuts-small.png')} />
        <Text>Hi! I am here to answer your queries.</Text>
        <Image style={[styles.imageBuddy]} source={require('./../assets/images/nerdybuddy-charactor.png')} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center'
    },
    imageCut: {
      height: 24,
      resizeMode: 'contain'
    },
    imageBuddy: {
      width: screenWidth * 0.5,
      height: 300,
      resizeMode: 'contain'
  },
});

export default BuddyHelloGreeting;
