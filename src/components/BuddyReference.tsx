import React from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  ViewStyle,
  StyleProp
} from 'react-native';
import { colors } from '../utils/Constants';

type BuddyReferenceProps = {
  style?: StyleProp<ViewStyle>;
  content?: string;
};

const BuddyReference = ({ style, content }: BuddyReferenceProps) => {
  return (
    <>
      <View style={style}>
        <View style={styles.container}>
          <View style={styles.fieldblank}></View>
          <View style={styles.fieldset}>
            <Text style={styles.title}>Reference</Text>
            <View style={styles.field}>
              <View style={styles.textWrapper}>
                  <Text style={styles.text}>{ content }</Text>
              </View>
              <View style={styles.imageWrapper}>
                  <Image style={styles.image} source={require('./../assets/images/edit-document.png')} />
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  title: {
    marginBottom: 10,
    fontSize: 14,
    fontWeight: 700,
  },
  fieldblank: {
    width: 30
  },
  fieldset: {
    flex: 1
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  imageWrapper: {
    backgroundColor: colors.midgray,
    height: 40,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  textWrapper: {
    backgroundColor: colors.lightgray,
    height: 40,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  text: {
    fontSize: 14,
    color: colors.gray
  }
});

export default BuddyReference;