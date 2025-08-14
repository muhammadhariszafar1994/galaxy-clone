import React from 'react';
import {Dimensions, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {ICONS} from '../Constants/IMAGES';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../Constants/COLORS';

const {width} = Dimensions.get('window');

const BackButton = ({route}: any) => {
  const nav = useNavigation<any>();
  return (
    <TouchableOpacity
      style={styles.backBtn}
      onPress={() => (route ? nav.navigate(route) : nav.goBack())}>
      <Image source={ICONS.backarrow} style={styles.icon} />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  icon: {
    width: width * 0.06,
    height: width * 0.06,
    tintColor: COLORS.white,
  },
  backBtn: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: COLORS.white,
    padding: width * 0.025,
    borderRadius: width * 0.075,
  },
});
