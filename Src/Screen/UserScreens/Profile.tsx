import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { COLORS } from '../../../Src/Constants/COLORS';
import { IMAGES } from '../../../Src/Constants/IMAGES';

const { width, height } = Dimensions.get('window');

const statsData = [
  { id: '1', value: '56', label: 'Sessions Completed' },
  { id: '2', value: '21', label: 'Journals Written' },
  { id: '3', value: '08', label: 'Constellations Unlocked' },
];

const menuData = [
  { id: '1', label: 'About/Narration' },
  { id: '2', label: 'Visual Theme' },
  { id: '3', label: 'Language' },
  { id: '4', label: 'Privacy' },
];

const ProfileScreen = () => {
  return (
    <ImageBackground
      source={IMAGES.profile}
      style={styles.container}
      resizeMode="cover"
    >
      {/* Profile Image & Name */}
      <View style={styles.profileSection}>
        <View style={styles.profileCircle}>
          <Text style={styles.dpText}></Text>
        </View>
        <Text style={styles.profileName}>Michael</Text>
      </View>

      {/* Stats Section */}
      <View style={styles.statsRow}>
        {statsData.map((item) => (
          <View key={item.id} style={styles.statsItem}>
            <View style={styles.statsCircle}>
              <Text style={styles.statsValue}>{item.value}</Text>
            </View>
            <Text style={styles.statsLabel}>{item.label}</Text>
          </View>
        ))}
      </View>

      {/* Menu List */}
      <View style={styles.menuList}>
        {menuData.map((item) => (
          <TouchableOpacity key={item.id} style={styles.menuItem}>
            <Text style={styles.menuLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* About Button */}
      <TouchableOpacity style={styles.aboutButton}>
        <Text style={styles.aboutText}>ABOUT GALAXYEASE</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.06,
    paddingTop: height * 0.08,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: height * 0.04,
  },
  profileCircle: {
    width: width * 0.28,
    height: width * 0.28,
    borderRadius: (width * 0.28) / 2,
    borderWidth: 2,
    borderColor: COLORS.purple2,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dpText: {
    color: COLORS.white,
    fontSize: width * 0.05,
    fontWeight: '600',
  },
  profileName: {
    color: COLORS.white,
    fontSize: width * 0.055,
    fontWeight: '600',
    marginTop: height * 0.015,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: height * 0.04,
  },
  statsItem: {
    alignItems: 'center',
    width: width * 0.25,
  },
  statsCircle: {
    width: width * 0.18,
    height: width * 0.18,
    borderRadius: (width * 0.18) / 2,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.01,
  },
  statsValue: {
    color: COLORS.white,
    fontSize: width * 0.06,
    fontWeight: '700',
  },
  statsLabel: {
    color: COLORS.white,
    fontSize: width * 0.035,
    textAlign: 'center',
  },
  menuList: {
    marginBottom: height * 0.03,
  },
  menuItem: {
    backgroundColor: COLORS.gray8,
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.04,
    borderRadius: width * 0.04,
    marginBottom: height * 0.015,
  },
  menuLabel: {
    color: COLORS.white,
    fontSize: width * 0.04,
  },
  aboutButton: {
    marginTop: height * 0.02,
    paddingVertical: height * 0.02,
    borderRadius: width * 0.08,
    backgroundColor: COLORS.gray8,
    alignItems: 'center',
  },
  aboutText: {
    color: COLORS.white,
    fontSize: width * 0.04,
    fontWeight: '600',
  },
});
