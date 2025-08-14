import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { IMAGES, ICONS } from '../../../Src/Constants/IMAGES';
import { COLORS } from '../../../Src/Constants/COLORS';
import BackButton from '../../Components/Backbutton';

const { width, height } = Dimensions.get('window');

const Music = () => {
  return (
    <ImageBackground
      source={IMAGES.MusicBack}
      style={styles.container}
      resizeMode="cover"
    >
      {/* Top Back Button */}
      <View>
     <BackButton/>
      </View>

      {/* Title */}
      <Text style={styles.title}>Beneath The Stars</Text>
      <Text style={styles.subtitle}>Inspired</Text>

      {/* Music Controls */}
      <View style={styles.controls}>
        <TouchableOpacity>
          <Image source={ICONS.backward} style={styles.controlIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.playButton}>
          <Image source={ICONS.play2} style={styles.playIcon} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image source={ICONS.forward} style={styles.controlIcon} />
        </TouchableOpacity>
      </View>

      {/* Slider */}
      <View style={styles.progressContainer}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor={COLORS.purple2}
          maximumTrackTintColor={COLORS.gray7}
          thumbTintColor={COLORS.purple2}
          value={0.3}
        />

        {/* Slider Time */}
        <View style={styles.timeRow}>
          <Text style={styles.time}>01:30</Text>
          <Text style={styles.time}>45:00</Text>
        </View>

        {/* Labels Row */}
        <View style={styles.labelRow}>
          <View style={styles.labelItem}>
          <Image source={ICONS.MusicIcons} style={styles.labelIcon} />
            <Text style={styles.labelText}>Music</Text>
          
          </View>
          <View style={styles.labelItem}>
          <Image source={ICONS.Narration} style={styles.labelIcon} />
            <Text style={styles.labelText}>Narration</Text>
          </View>
        </View>

        {/* Setting Button */}
        <TouchableOpacity style={styles.settingButton}>
          <Image source={ICONS.setting} style={styles.settingIcon} />
          <Text style={styles.settingText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};
export default Music;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: height * 0.06,
    paddingHorizontal: width * 0.05,
    justifyContent: 'flex-start',
  },
  iconButton: {
    backgroundColor: COLORS.purple2,
    padding: width * 0.03,
    borderRadius: width * 0.06,
    marginLeft: width * 0.02,
  },
  rightIcons: {
    flexDirection: 'row',
  },
  title: {
    color: COLORS.white,
    fontSize: width * 0.09,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: height * 0.20,
  },
  subtitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.01,
    backgroundColor: COLORS.gray4,
    paddingVertical: height * 0.011,
    paddingHorizontal: width * 0.08,
    borderRadius: width * 0.05,
    alignSelf: 'center',
  
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: height * 0.09,
    marginHorizontal: width * 0.12,
  },
  controlIcon: {
    width: width * 0.09,
    height: width * 0.09,
    tintColor: COLORS.gray5,
  },
  playButton: {
    backgroundColor: COLORS.white,
    padding: width * 0.08,
    borderRadius: width * 0.12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    width: width * 0.07,
    height: width * 0.08,
    tintColor: COLORS.black,
  },
  progressContainer: {
    marginTop: height * 0.05,
    paddingHorizontal: width * 0.05,
  },
  slider: {
    width: '100%',
    height: height * 0.04,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -height * 0.01,
  },
  time: {
    color: COLORS.gray7,
    fontSize: width * 0.04,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: height * 0.04,
  },
  labelItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelText: {
    color: COLORS.white,
    fontSize: width * 0.045,
    marginLeft: width * 0.02,
    
  },
  labelIcon: {
    width: width * 0.06,
    height: width * 0.06,
    tintColor: COLORS.white,
    
  },
  settingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.04,
    backgroundColor: COLORS.gray8,
    paddingVertical: height * 0.011,
    paddingHorizontal: width * 0.05,
    borderRadius: width * 0.05,
    alignSelf: 'center',
  },
  settingText: {
    color: COLORS.gray4,
    fontSize: width * 0.035,
    marginLeft: width * 0.03,
    fontWeight: '500',
  },
  settingIcon: {
    width: width * 0.05,
    height: width * 0.05,
    tintColor: COLORS.white,
  },
});

