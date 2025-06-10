import React from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  ViewStyle,
  StyleProp
} from 'react-native';
import { colors, screenWidth } from '../utils/Constants';
import { useSelector } from 'react-redux';
import { capitalizeFirstLetter } from '../utils/Helper';

type BuddyQuestionProps = {
  style?: StyleProp<ViewStyle>;
  content?: string;
};

const BuddyQuestion = ({ style, content }: BuddyQuestionProps) => {
  const { userDetails } = useSelector(state => state.auth);

  return (
    <>
      <View style={style}>
        <View style={styles.container}>
          <View style={styles.field}>
            <View style={styles.imageset}>
              <Text style={styles.imagesettext}>{capitalizeFirstLetter(userDetails?.name)}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>{ content }</Text>
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
    justifyContent: 'flex-end',
    marginBottom: 10
  },
  field: {
    flexDirection: 'row',
    // alignItems: 'center',
    backgroundColor: colors.midgray,
    maxWidth: screenWidth * 0.8,
    padding: 10,
    borderRadius: 10
  },
  imageset: {
    width: 20,
    height: 20,
    borderRadius: 20,
    left: 10,
    top: 10,
    position: 'absolute',
    backgroundColor: colors.purple,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imagesettext: {
    color: colors.white
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

export default BuddyQuestion;