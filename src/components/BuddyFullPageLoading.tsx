import React, { useEffect } from 'react';
import { Modal, ActivityIndicator, StyleSheet, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { screenHeight, screenWidth } from '../utils/Constants';

const BuddyFullPageLoading = ({ text = "Loading..." }) => {
  const { loading } = useSelector(state => state.auth);
  
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={loading}
      onRequestClose={() => {}}
    >
      <View style={styles.overlay}>
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#000000" />
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    position: 'absolute',
    left: 0,
    top: 0,
    width: screenWidth,
    height: screenHeight
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  text: {
    marginTop: 10,
    fontSize: 14,
    color: 'black',
  },
});

export default BuddyFullPageLoading;
