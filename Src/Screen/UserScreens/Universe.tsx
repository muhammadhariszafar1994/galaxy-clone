import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { IMAGES, ICONS } from '../../../Src/Constants/IMAGES';
import { COLORS } from '../../../Src/Constants/COLORS';

const { width, height } = Dimensions.get('window');

const Universe = () => {
//  const [profileImage, setProfileImage] = useState(IMAGES.defaultProfile);

  return (
    <ImageBackground
      source={IMAGES.Universebg} // Tumhari background image yahan
      style={styles.container}
      resizeMode="cover"
    >
      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Create Your Cosmic Self</Text>
        <Text style={styles.subtitle}>
          Upload a photo or take a selfie to see yourself soar through the stars.
        </Text>
      </View>

      {/* Upload / Selfie Buttons */}
    {/* Upload / Selfie Buttons */}
<View style={styles.buttonsContainer}>
  <TouchableOpacity style={styles.actionButton}>
    <Text style={styles.buttonText}>UPLOAD PHOTO</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.actionButton}>
    <Text style={styles.buttonText}>TAKE A SELFIE</Text>
  </TouchableOpacity>

  {/* Profile DP Placeholder */}
  <View style={styles.profilePlaceholder}>
    <Text style={styles.profilePlaceholderText}></Text>
  </View>
</View>

      {/* Profile Image */}
      <View style={styles.profileContainer}>
        {/* <Image source={profileImage} style={styles.profileImage} /> */}
        <TouchableOpacity style={styles.editButton}>
          {/* <Image source={ICONS.edit} style={styles.editIcon} /> */}
        </TouchableOpacity>
      </View>

      {/* Fly Button */}
      <TouchableOpacity style={styles.flyButton}>
        <Text style={styles.flyButtonText}>FLY THROUGH THE UNIVERSE</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default Universe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.06,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: height * 0.05,
  },
  titleContainer: {
    marginTop: height * 0.08,
    alignItems: 'center',
  },
  title: {
    color: COLORS.white,
    fontSize: width * 0.08,
    fontWeight: '600',
    textAlign: 'center',
  },
  subtitle: {
    color: COLORS.white,
    fontSize: width * 0.035,
    textAlign: 'center',
    marginTop: height * 0.015,
  },
  buttonsContainer: {
    width: '100%',
    marginTop: height * 0.05,
    alignItems: 'center',
  },
  actionButton: {
    width: '90%',
    backgroundColor:    COLORS.gray8,
    paddingVertical: height * 0.02,
    borderRadius: width * 0.04,
    marginVertical: height * 0.015,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonIcon: {
    width: width * 0.06,
    height: width * 0.06,
    marginRight: width * 0.03,
    tintColor: COLORS.white,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: width * 0.04,
    fontWeight: '500',
  },
  profileContainer: {
    marginTop: height * 0.04,
    alignItems: 'center',
  },
  profileImage: {
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.2,
    borderWidth: 3,
    borderColor: COLORS.purple2,
  },
  editButton: {
    position: 'absolute',
    bottom: width * 0.03,
    right: width * 0.03,
    backgroundColor: COLORS.purple2,
    padding: width * 0.02,
    borderRadius: width * 0.04,
  },
  editIcon: {
    width: width * 0.05,
    height: width * 0.05,
    tintColor: COLORS.white,
  },
  flyButton: {
    width: '90%',
    paddingVertical: height * 0.02,
    borderRadius: width * 0.05,
    borderWidth: 1,
    borderColor: COLORS.gray8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.04,
    backgroundColor:COLORS.gray8
  },
  flyButtonText: {
    color: COLORS.white,
    fontSize: width * 0.045,
    fontWeight: '600',
  },
  profilePlaceholder: {
    width: width * 0.40,
    height: width * 0.40,
    borderRadius: (width * 0.40) / 2,
    borderWidth: 2,
    borderColor: COLORS.purple2,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.03,
  },
  profilePlaceholderText: {
    color: COLORS.white,
    fontSize: width * 0.05,
    fontWeight: '600',
  },
});
