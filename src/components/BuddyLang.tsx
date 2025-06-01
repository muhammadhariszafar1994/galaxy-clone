import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
  TextStyle,
  Image,
  View
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { colors } from '../utils/Constants';

type BuddyLangProps = {
  onPress: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
};

const BuddyLang = ({ onPress, style }: BuddyLangProps) => {
  return (
    <TouchableOpacity 
        onPress={onPress} 
        activeOpacity={0.8} 
        style={[style, {
          flex: 1
        }]}
    >
      <View style={styles.container}>
        <Image style={styles.globe} source={require('./../assets/images/globe.png')} />
        <Text>English</Text>
        <Image style={styles.arrowDown} source={require('./../assets/images/arrow-down.png')} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  globe: {
    width: 20,
    height: 20,
    objectFit: 'contain'
  },
  arrowDown: {
    width: 15,
    height: 15,
    objectFit: 'contain'
  },
  text: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default BuddyLang;