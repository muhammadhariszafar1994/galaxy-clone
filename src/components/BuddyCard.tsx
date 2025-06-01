import React from 'react';
import { StyleSheet, View, ImageBackground, Text, StyleProp, ViewStyle, Image } from 'react-native';
import { screenHeight, screenWidth } from '../utils/Constants';

// No need to import the image if you're using require inline
type BuddyCardProps = {
  children: React.ReactNode;
  cardStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  purpleCut?: Boolean
};

function BuddyCard({ 
    children,
    cardStyle,
    containerStyle,
    purpleCut = false
}: BuddyCardProps): React.JSX.Element {
  return (
    <>
      <View style={[styles.container, containerStyle]}>
        <View style={[styles.card, cardStyle]}>
          {
            purpleCut && 
            <Image 
              style={styles.purpleCut}
              source={require('./../assets/images/purple-cuts.png')} 
            />
          }
          { children }
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  card: {
    // minHeight: screenHeight * 0.5,
    backgroundColor: '#fff',
    borderRadius: 10,
    position: 'relative'
  },
  purpleCut: {
    position: 'absolute',
    objectFit: 'contain',
    zIndex: 1,
    width: 150,
    height: 100,
    top: -60,
    right: 40
  },
});

export default BuddyCard;
