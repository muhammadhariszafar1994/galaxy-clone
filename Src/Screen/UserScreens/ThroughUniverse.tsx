import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { COLORS } from '../../../Src/Constants/COLORS';
import { IMAGES } from '../../../Src/Constants/IMAGES';
import Slider from '@react-native-community/slider';

const { width, height } = Dimensions.get('window');

const FlyThroughScreen = () => {
  const [sliderValue, setSliderValue] = useState(0.2);
  const [mode, setMode] = useState('Narration');

  return (
    <ImageBackground
      source={IMAGES.ThroughUniversebg}
      style={styles.container}
      resizeMode="cover"
    >
      {/* Title */}
      <Text style={styles.title}>Fly Through the{'\n'}Universe</Text>

      {/* Top Buttons */}
      <View style={styles.topButtons}>
        <TouchableOpacity style={styles.topButton}>
          <Text style={styles.topButtonText}>Guided Tour</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.topButton}>
          <Text style={styles.topButtonText}>Free Explore</Text>
        </TouchableOpacity>
      </View>

      {/* Mode Toggle */}
      <View style={styles.modeButtons}>
        {['Narration', 'Voice-over', 'Silent'].map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.modeButton,
              mode === item && styles.modeButtonActive,
            ]}
            onPress={() => setMode(item)}
          >
            <Text style={styles.modeButtonText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Slider */}
      <View style={styles.sliderContainer}>
        <Slider
          style={{ width: width * 0.85 }}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor={COLORS.white}
          maximumTrackTintColor="#666"
          thumbTintColor={COLORS.purple2}
          value={sliderValue}
          onValueChange={(value) => setSliderValue(value)}
        />
        <Text style={styles.sliderLabel}>Z</Text>
      </View>

      {/* Begin Button */}
      <TouchableOpacity style={styles.beginButton}>   
        <Text style={styles.beginButtonText}>BEGIN</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default FlyThroughScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: height * 0.08,
    alignItems: 'center',
    backgroundColor: COLORS.black,
  },
  title: {
    color: COLORS.white,
    fontSize: width * 0.08,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: height * 0.03,
  },
  topButtons: {
    flexDirection: 'row',
    marginBottom: height * 0.025,
  },
  topButton: {
    backgroundColor:COLORS.gray8,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.05,
    borderRadius: width * 0.05,
    marginHorizontal: width * 0.02,
    marginTop:50,
  },
  topButtonText: {
    color: COLORS.white,
    fontSize: width * 0.04,
  },
  modeButtons: {
    flexDirection: 'row',
    marginBottom: height * 0.04,
   
  },
  modeButton: {
    backgroundColor:COLORS.gray8,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.04,
    borderRadius: width * 0.05,
    marginHorizontal: width * 0.02,
  },
  modeButtonActive: {
    backgroundColor: 'rgba(100,150,255,0.3)',
  },
  modeButtonText: {
    color: COLORS.white,
    fontSize: width * 0.04,
  },
  sliderContainer: {
    width: width * 0.9,
    alignItems: 'flex-start',
    marginBottom: height * 0.04,
    marginTop:200,
  },
  sliderLabel: {
    color: COLORS.white,
    fontSize: width * 0.045,
    marginTop: height * 0.005,
  },
  beginButton: {
    backgroundColor: COLORS.gray8,
    paddingVertical: height * 0.02,
    width: width * 0.85,
    borderRadius: width * 0.1,
    alignItems: 'center',
  },
  beginButtonText: {
    color: COLORS.white,
    fontSize: width * 0.045,
    fontWeight: '600',
  },
});
