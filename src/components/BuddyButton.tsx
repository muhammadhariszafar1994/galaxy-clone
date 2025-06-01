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
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../utils/Constants';

type BuddyButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
};

const BuddyButton = ({ title, onPress, style }: BuddyButtonProps) => {
  return (
    <TouchableOpacity 
        onPress={onPress} 
        activeOpacity={0.8} 
        style={style}
    >
      <LinearGradient
        colors={[ colors.pink, colors.purple ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <Text style={[styles.text]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gradient: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default BuddyButton;
