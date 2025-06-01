import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageSourcePropType,
  ImageStyle,
  Image,
  View
} from 'react-native';
import { colors } from '../utils/Constants';

type BuddyBlockButtonProps = {
  title?: string;
  onPress?: (event: GestureResponderEvent) => void;
  icon?: ImageSourcePropType;
  buttonStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const BuddyBlockButton = ({ title, onPress, icon, buttonStyle, imageStyle, textStyle }: BuddyBlockButtonProps) => {
  return (
    <>
        <View style={styles.container}>
            <TouchableOpacity 
                onPress={onPress} 
                activeOpacity={0.8} 
                style={[styles.button, buttonStyle]}
            >
                <Image style={[styles.image, imageStyle]} source={icon} />
            </TouchableOpacity>
            <Text style={[styles.text, textStyle]}>{title}</Text>
        </View>
    </>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    button: {
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.lightgray,
        height: 70,
        width: '100%'
    },
    image: {
        width: 25,
        height: 25
    },
    text: {
        color: colors.gray,
        fontSize: 13,
        fontWeight: '600',
        marginTop: 10
    },
});

export default BuddyBlockButton;