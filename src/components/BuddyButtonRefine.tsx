import React from 'react';
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    GestureResponderEvent,
    StyleProp,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { colors } from '../utils/Constants';

type BuddyButtonRefineProps = {
    title: string;
    onPress: (event: GestureResponderEvent) => void;
    selected?: boolean;
    buttonStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
};

const BuddyButtonRefine = ({
    title,
    onPress,
    selected = false,
    buttonStyle,
    textStyle,
}: BuddyButtonRefineProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={[
                styles.button,
                selected ? styles.selectedButton : null,
                buttonStyle,
            ]}
        >
            <Text
                style={[
                    styles.text,
                    selected ? styles.selectedText : null,
                    textStyle,
                ]}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: colors.pink,
        borderWidth: 2,
        backgroundColor: 'transparent',
        paddingHorizontal: 10,
    },
    selectedButton: {
        backgroundColor: colors.pink,
    },
    text: {
        color: colors.gray,
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
    },
    selectedText: {
        color: colors.white,
    },
});

export default BuddyButtonRefine;
