import React from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle
} from 'react-native';
import { colors, screenWidth } from '../utils/Constants';

type BuddyAnswerProps = {
  style?: StyleProp<ViewStyle>,
  content?: string;
};

const BuddyAnswer = ({ style, content }: BuddyAnswerProps) => {
  return (
    <>
      <View style={style}>
        <View style={styles.container}>
            <View style={styles.field}>
              <View style={styles.imageset}>
                <Image style={styles.image} source={require('./../assets/images/purple-cuts-small.png')} />
              </View>
              <View style={styles.textContainer}>
                {/* <Text style={styles.text}>
                  { content }
                </Text> */}

                <Text style={styles.text}>
                  {content.split(/(\*\*.*?\*\*)/).map((part, index) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                      return (
                        <Text key={index} style={{
                          fontWeight: 'bold'
                        }}>
                          {part.slice(2, -2)}
                        </Text>
                      );
                    }
                    return part;
                  })}
              </Text>
              </View>
            </View>
          </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10
  },
  field: {
    backgroundColor: colors.midgray,
    maxWidth: screenWidth * 0.8,
    padding: 10,
    borderRadius: 10
  },
  imageset: {
    width: 20,
    height: 20,
    position: 'absolute',
    left: 10,
    top: 10
  },
  image: {
    width: 20,
    height: 20,
    resizeMode: 'contain'
  },
  textContainer: {
    paddingLeft: 30
  },
  text: {
    fontSize: 14
  }
});

export default BuddyAnswer;