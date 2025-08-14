import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLORS } from '../../Constants/COLORS';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
export type RootStackParamList = {
  Home: undefined;
  Meditation: undefined;
};

const { width, height } = Dimensions.get('window'); // screen width and height

const moods = [
  { key: 'Calm' },
  { key: 'Energize' },
  { key: 'Curious' },
  { key: 'Reflectiv' },
  { key: 'Inspired' },
];

const HomeScreen = () => {
  const [selectedMood, setSelectedMood] = useState('Curious');
  const navigation = useNavigation<NavigationProp>();

  return (
    <ImageBackground
      source={require('../../Assets/Images/Home.png')}
      style={styles.background}
      blurRadius={2}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.welcomeText}>Welcome to{'\n'}GalaxyEase</Text>
        <Text style={styles.subText}>
          The universe is full of magical things waiting{'\n'}for your wits to grow sharper.
        </Text>

        {/* Mood Selector */}
        <View style={styles.moodContainer}>
          {moods.map((mood) => (
            <TouchableOpacity
              key={mood.key}
              style={[
                styles.moodButton,
                selectedMood === mood.key && styles.moodSelected,
              ]}
              onPress={() => setSelectedMood(mood.key)}
            >
              <Text
                style={[
                  styles.moodText,
                  selectedMood === mood.key && { color: '#FFD700' },
                ]}
              >
                {mood.key}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Options */}
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => navigation.navigate('Meditation')}
        >
          <Image
            source={require('../../Assets/Icons/moon.png')}
            style={styles.optionIcon}
            resizeMode="contain"
          />
          <Text style={styles.optionText}>Start Meditation</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton}>
          <Image
            source={require('../../Assets/Icons/rocket.png')}
            style={styles.optionIcon}
            resizeMode="contain"
          />
          <Text style={styles.optionText}>Fly Through the Universe</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton}>
          <Image
            source={require('../../Assets/Icons/planet.png')}
            style={styles.optionIcon}
            resizeMode="contain"
          />
          <Text style={styles.optionText}>Travel to Exoplanets</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'space-between',
  },
  container: {
    paddingTop: height * 0.1, // 10% of screen height
    paddingHorizontal: width * 0.05,
    paddingBottom: height * 0.08,
  },
  welcomeText: {
    fontSize: width * 0.09, // responsive font
    fontWeight: '700',
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: height * 0.01,
  },
  subText: {
    fontSize: width * 0.045,
    color: '#ddd',
    textAlign: 'center',
    marginBottom: height * 0.03,
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(20, 20, 40, 0.7)',
    borderRadius: 15,
    paddingVertical: height * 0.02,
    marginBottom: height * 0.03,
  },
  moodButton: {
    alignItems: 'center',
    width: width * 0.15,
    paddingVertical: height * 0.005,
  },
  moodSelected: {
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    borderRadius: 20,
    paddingVertical: height * 0.005,
  },
  moodText: {
    fontSize: width * 0.03,
    color: '#bbb',
    marginTop: height * 0.005,
    textAlign: 'center',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(20, 20, 40, 0.7)',
    borderRadius: 15,
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.05,
    marginVertical: height * 0.01,
  },
  optionIcon: {
    width: width * 0.07,
    height: width * 0.07,
    tintColor: '#ccc',
  },
  optionText: {
    fontSize: width * 0.06,
    color: '#eee',
    marginLeft: width * 0.04,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
