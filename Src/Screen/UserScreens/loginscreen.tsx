import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, Dimensions } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { COLORS } from '../../../Src/Constants/COLORS';
import { IMAGES } from '../../../Src/Constants/IMAGES';
import { RootStackParamList } from '../../Navigation/type';

const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
  // Typed navigation for TypeScript
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <ImageBackground
      source={IMAGES.ThroughUniversebg}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Circle Image */}
        <View style={styles.imageWrapper}>
          <Image
            source={IMAGES.MusicBack}
            style={styles.image}
          />
        </View>

        {/* Title */}
        <Text style={styles.title}>GalaxyEase</Text>

        {/* Login Button */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('Home')} // Now properly typed
        >
          <Text style={styles.loginButtonText}>LOG IN</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(17, 26, 64, 0.6)', // overlay for readability
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: width * 0.05,
  },
  imageWrapper: {
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: (width * 0.5) / 2,
    backgroundColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.03,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  title: {
    fontSize: width * 0.08,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: height * 0.04,
  },
  loginButton: {
    backgroundColor: COLORS.gray8,
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.3,
    borderRadius: width * 0.1,
  },
  loginButtonText: {
    color: COLORS.white,
    fontSize: width * 0.045,
    fontWeight: '600',
  },
});
