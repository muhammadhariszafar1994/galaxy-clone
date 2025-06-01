import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
  TextStyle
} from 'react-native';
import { colors } from '../utils/Constants';

type BuddyButtonReverseProps = {
  title: string;
  onPress: () => void;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const BuddyButtonReverse = ({ title, onPress, buttonStyle, textStyle }: BuddyButtonReverseProps) => {
  return (
    <TouchableOpacity 
        onPress={onPress} 
        activeOpacity={0.8} 
        style={[styles.button, buttonStyle]}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.pink,
    borderWidth: 2
  },
  text: {
    color: colors.pink,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default BuddyButtonReverse;
