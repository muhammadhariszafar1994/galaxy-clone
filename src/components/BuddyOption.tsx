import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { colors } from '../utils/Constants';

type BuddyOptionProps = {
  label?: string;
  company?: string;
  department?: string;
  brief?: string;
  selected?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

const BuddyOption = ({
  label,
  company,
  department,
  brief,
  selected = false,
  onPress = () => {},
  style,
}: BuddyOptionProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={styles.row}>
        {/* Radio Circle */}
        <View style={styles.radio}>
          <View style={styles.radioOuter}>
            {selected && <View style={styles.radioInner} />}
          </View>
        </View>

        {/* Label Tag */}
        <View style={styles.labelTag}>
          <Text style={styles.labelText}>{label}</Text>
        </View>
      </View>

      <View style={styles.details}>
        {
          company &&
            <Text style={styles.info}>
              <Text style={styles.bold}>Company: </Text>
              {company}
            </Text>
        }
        
        {
          department &&
            <Text style={styles.info}>
              <Text style={styles.bold}>Department: </Text>
              {department}
            </Text>
        }
        
        {
          brief &&
            <Text style={styles.info}>
              <Text style={styles.bold}>Document Brief: </Text>
              {brief}
            </Text>
        }
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    paddingVertical: 15,
    backgroundColor: colors.white,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: colors.bordergray
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 30,
    marginBottom: 10
  },
  radio: {
    width: 30,
    position: 'absolute'
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.lightpink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 14,
    height: 14,
    borderRadius: 14,
    backgroundColor: colors.darkpink,
  },
  labelTag: {
    backgroundColor: colors.transparentpink,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  labelText: {
    color: colors.black,
    fontSize: 12,
    fontWeight: '500',
  },
  details: {
    // marginTop: 10,
    // marginLeft: 30
  },
  info: {
    fontSize: 14,
    marginBottom: 2,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default BuddyOption;
