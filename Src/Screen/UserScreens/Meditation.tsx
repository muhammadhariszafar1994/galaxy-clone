import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';
import {  Dimensions } from 'react-native';
import { COLORS } from '../../Constants/COLORS';

const { width, height } = Dimensions.get('window');

const moods = [
  // { key: 'Calm', icon: require('../../Assets/Icons/calm.png') },
  { key: 'Calm', icon: require('../../Assets/Icons/Inspired.png') },
  { key: 'Grateful', icon: require('../../Assets/Icons/heart.png') },
  { key: 'Energized', icon: require('../../Assets/Icons/Energized.png') },
  { key: 'Sleepy', icon: require('../../Assets/Icons/sleepy.png') },
  // { key: 'Reflective', icon: require('../../Assets/Icons/reflective.png') },
  { key: 'Loving', icon: require('../../Assets/Icons/heart2.png') },
  { key: 'Curious', icon: require('../../Assets/Icons/Layer.png') },
  { key: 'Joyful', icon: require('../../Assets/Icons/happiness.png') },
  { key: 'Magical', icon: require('../../Assets/Icons/magicwand.png') },
  { key: 'Hopeful', icon: require('../../Assets/Icons/hopefully.png') },
  // { key: 'Enlightened', icon: require('../../Assets/Icons/enlightened.png') },
];

const Meditation = () => {
  return (
    <ImageBackground
    source={require('../../Assets/Images/Meditationback.png')}// Background image
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Meditation</Text>

        {/* Mood Icons Grid */}
        <View style={styles.grid}>
          {moods.map((mood) => (
            <View key={mood.key} style={styles.moodItem}>
              { <Image source={mood.icon} style={styles.icon} resizeMode="contain" /> }
              <Text style={styles.moodText}>{mood.key}</Text>
            </View>
          ))}
        </View>

        {/* Begin Button */}
        <TouchableOpacity style={styles.beginButton}>
          <Text style={styles.beginText}>BEGIN</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: height * 0.05,
    marginTop: height * 0.025,
  },
  title: {
    fontSize: width * 0.07, // responsive font
    color: COLORS.white,
    fontWeight: '600',
    marginBottom: height * 0.04,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: width * 0.05, // responsive gap
    width: '90%',
    marginTop: height * 0.04,
  },
  moodItem: {
    width: '22%', // thoda responsive adjust
    alignItems: 'center',
    marginBottom: height * 0.03,
  },
  icon: {
    width: width * 0.12, // responsive icon
    height: width * 0.12,
    marginBottom: height * 0.01,
  },
  moodText: {
    color: COLORS.white,
    fontSize: width * 0.035,
    textAlign: 'center',
  },
  beginButton: {
    backgroundColor: '#111A40',
    paddingVertical: height * 0.022,
    paddingHorizontal: width * 0.32, // responsive horizontal padding
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#111A40',
    marginTop: height * 0.08,
  },
  beginText: {
    color: COLORS.white,
    fontSize: width * 0.045,
    fontWeight: '500',
    letterSpacing: 1,
  },
});

export default Meditation;
