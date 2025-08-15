import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import {  Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const moods = [
   { title: 'Calm', icon: require('../../Assets/Icons/magicwand.png') },
  { title: 'Inspired', icon: require('../../Assets/Icons/Inspired.png') },
  { title: 'Grateful', icon: require('../../Assets/Icons/heart.png') },
  { title: 'Joyful', icon: require('../../Assets/Icons/happiness.png') },
  { title: 'Energized', icon: require('../../Assets/Icons/Energized.png') },
  { title: 'Loving', icon: require('../../Assets/Icons/heart2.png') },
  { title: 'Enlightened', icon: require('../../Assets/Icons/hopefully.png') },
];

const Journal = () => {
  return (
    <ImageBackground
      source={require('../../Assets/Images/JounalBack.png')} // <-- yaha apni background image ka path do
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Title */}
         <Text style={styles.title}>
          What did the stars{'\n'}whisper to you today?
        </Text>

        {/* Thoughts Box */}
        <View style={styles.thoughtBox}>
          <Text style={styles.placeholderText}>Begin your thoughts here...</Text>
        </View>

        {/* Mood Buttons */}
        <View style={styles.moodsWrapper}>
          {/* First Row (4 buttons) */}
          <View style={styles.row }>
            {moods.slice(0, 4).map((mood, index) => (
              <TouchableOpacity key={index} style={styles.moodButton}>
                <Image source={mood.icon} style={styles.moodIcon} />
                <Text style={styles.moodText}>{mood.title}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Second Row (3 buttons) */}
          <View style={styles.row}>
            {moods.slice(4).map((mood, index) => (
              <TouchableOpacity key={index} style={styles.moodButton}>
                <Image source={mood.icon} style={styles.moodIcon} />
                <Text style={styles.moodText}>{mood.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Save & Export Buttons */}
        <View style={styles.actionRow}>
  <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#111A40' }]}>
    <Text style={styles.actionText}>Save</Text>
  </TouchableOpacity>

  <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#111A40', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}>
    <Image
      source={require('../../Assets/Icons/export.png')} // <-- apna icon ka path do
      style={styles.exportIcon}
    />
    <Text style={styles.actionText}>Export</Text>
  </TouchableOpacity>
</View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.03,
    flexGrow: 1,
  },
  title: {
    fontSize: width * 0.065, // responsive font
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginBottom: height * 0.035,
    marginTop: height * 0.06,
  },
  thoughtBox: {
    borderWidth: 1,
    borderColor: '#111A40',
    borderRadius: 20,
    padding: width * 0.04,
    minHeight: height * 0.25,
    marginBottom: height * 0.03,
    position: 'relative',
    backgroundColor: '#111A40',
  },
  placeholderText: {
    position: 'absolute',
    top: height * 0.02,
    left: width * 0.04,
    color: 'white',
    fontSize: width * 0.05,
  },
  moodsWrapper: {
    marginBottom: height * 0.04,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: height * 0.015,
  },
  moodButton: {
    flex: 1,
    backgroundColor: '#111A40',
    marginHorizontal: width * 0.002,
    marginVertical: height * 0.006,
    paddingVertical: height * 0.012,
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'row',
    gap: width * 0.015,
    paddingHorizontal: width * 0.03,
  },
  moodIcon: {
    width: width * 0.05,
    height: width * 0.05,
    resizeMode: 'contain',
    marginBottom: height * 0.005,
    marginLeft: width * 0.01,
  },
  moodText: {
    color: '#fff',
    fontSize: width * 0.035,
    marginTop: height * 0.003,
    marginLeft: width * 0.005,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    paddingVertical: height * 0.022,
    marginHorizontal: width * 0.012,
    borderRadius: 25,
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: width * 0.045,
    fontWeight: '600',
  },
  exportIcon: {
    width: width * 0.05,
    height: width * 0.05,
    resizeMode: 'contain',
    marginRight: width * 0.02,
  },
});
export default Journal;
