import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {  Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const buttonsData = [
  { id: '1', label: 'Breath with the Moon' },
  { id: '2', label: 'Beneth the starts' },
  { id: '3', label: 'Nebula Dreams' },
  { id: '4', label: 'Journey Through the Galaxy' },
];

const Calm = () => {
    const renderButton = ({ item }: { item: any }) => (
        <TouchableOpacity style={styles.listButton}>
        <Text style={styles.listButtonText} numberOfLines={1} ellipsizeMode="tail">
  {item.label}
</Text>
          <View style={styles.arrowCircle}>
            <Text style={styles.arrowText}>→</Text>
          </View>
        </TouchableOpacity>
      );

  return (
    <ImageBackground
      source={require('../../Assets/Images/Calm.png')} // apni background image ka path yahan
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Calm</Text>

        <View style={styles.timeRow}>
          <Text style={styles.timeText}>5 MINT</Text>
          <Text style={styles.timeText}>10 MINT</Text>
          <Text style={styles.timeText}>15 MINT</Text>
        </View>

        <FlatList
          data={buttonsData}
          renderItem={renderButton}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.buttonsRow}
          showsHorizontalScrollIndicator={false}
        />
        <TouchableOpacity style={styles.beginButton}>
          <Text style={styles.beginButtonText}>BEGIN COSMIC MEDITATION</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    paddingTop: height * 0.07,
    paddingHorizontal: width * 0.05,
    flex: 1,
  },
  title: {
    fontSize: width * 0.07,
    fontWeight: '700',
    color: '#fff',
    alignSelf: 'center',
    marginBottom: height * 0.09,
    marginTop: height * 0.04,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: height * 0.065,
    gap: width * 0.22, // responsive gap between texts
  },
  timeText: {
    fontSize: width * 0.045,
    color: '#fff',
    fontWeight: '500',
  },
  buttonsRow: {
    justifyContent: 'space-between',
    gap: width * 0.03, // spacing between buttons
    marginBottom: height * 0.05,
  },
  listButton: {
    backgroundColor: '#111A40',
    paddingVertical: height * 0.018,
    paddingHorizontal: width * 0.05,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: width * 0.35,
    justifyContent: 'space-between',
  },
  listButtonText: {
    color: '#fff',
    fontSize: width * 0.04,
    fontWeight: '600',
    flexShrink: 1,
    textAlign: 'center',
  },
  arrowCircle: {
    width: width * 0.07,
    height: width * 0.07,
    borderRadius: (width * 0.07) / 2,
    borderWidth: 1.5,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  arrowText: {
    color: 'white',
    fontSize: width * 0.045,
    fontWeight: '700',
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: width * 0.045,
  },
  beginButton: {
    backgroundColor: '#111A40',
    paddingVertical: height * 0.03,
    paddingHorizontal: width * 0.28,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#111A40',
    alignSelf: 'center',
    marginBottom: height * 0.18,
  },
  beginButtonText: {
    color: '#fff',
    fontSize: width * 0.035,
    fontWeight: 'bold',
  },
});

export default Calm;
