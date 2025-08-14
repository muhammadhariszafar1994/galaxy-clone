import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {  Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const Explore = () => {
  return (
    <ImageBackground
    source={require('../../Assets/Images/Explore.png')}
      // Aap apni background image ka link yahan ya local image set kar sakte hain
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Explore</Text>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity style={styles.tabButton}>
            <Text style={styles.tabText}>Cosmic Thought</Text>
            <Text style={[styles.tabText, ]}>Star Map</Text>
            <Text style={styles.tabText}>Celestial Calendar</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={[styles.tabButton, styles.tabSelected]}>
            <Text style={[styles.tabText, styles.tabTextSelected]}>Star Map</Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity style={styles.tabButton}>
            <Text style={styles.tabText}>Celestial Calendar</Text>
          </TouchableOpacity> */}
        </View>

        {/* Star Map Box */}
    {/* Star Map Box */}
<ImageBackground
  source={require('../../Assets/Images/mapStars.png')} // star map ke liye background image
  style={styles.starMapBox}
  imageStyle={{ borderRadius: 15 }}
>
  <Text style={styles.starMapText}>Hercules</Text>
  <Text style={styles.starMapText}>Lyra</Text>
  <Text style={styles.starMapText}>Aquila</Text>

  <TouchableOpacity style={styles.gpsButton}>
    <Text style={styles.gpsText}>GPS</Text>
  </TouchableOpacity>
</ImageBackground>

{/* Meteor Shower Card */}
<ImageBackground
  source={require('../../Assets/Images/showerback.png')} // meteor shower card ke liye bg image
  style={styles.card}
  imageStyle={{ borderRadius: 15 }}
>
  <Text style={styles.cardTitle}>Meteor Shower</Text>
  <Text style={styles.cardSubtitle}>Perseid</Text>
  <Text style={styles.cardDate}>Aug 12 · 1:00 AM</Text>

  <ImageBackground
     source={require('../../Assets/Images/stars.png')}
    // style={styles.meteorImage}
  />
</ImageBackground>

{/* Full Moon Card */}
<ImageBackground
  source={require('../../Assets/Images//fullmoonback.png')} // full moon card ke liye bg image
  style={styles.card}
  imageStyle={{ borderRadius: 15 }}
>
  <Text style={styles.cardTitle}>Full Moon</Text>
  <Text style={styles.cardSubtitle}>Harvest</Text>
  <Text style={styles.cardDate}>Sep 17 ·</Text>
</ImageBackground>

      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    paddingTop: height * 0.06, // responsive padding top
    paddingHorizontal: width * 0.05,
    paddingBottom: height * 0.05,
  },
  title: {
    color: '#fff',
    fontSize: width * 0.06,
    fontWeight: '600',
    marginBottom: height * 0.06,
    alignSelf: 'center',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: height * 0.03,
  },
  tabButton: {
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.07,
    borderRadius: 20,
    backgroundColor: '#223058',
    flexDirection: 'row',
    gap: width * 0.03,
  },
  tabSelected: {
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  tabText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: width * 0.035,
  },
  starMapBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: width * 0.05,
    marginBottom: height * 0.03,
    minHeight: height * 0.2,
    justifyContent: 'space-between',
    position: 'relative',
  },
  starMapText: {
    color: '#bbb',
    fontSize: width * 0.033,
    marginBottom: height * 0.01,
  },
  gpsButton: {
    position: 'absolute',
    top: height * 0.02,
    right: width * 0.03,
    backgroundColor: '#223058',
    paddingVertical: height * 0.008,
    paddingHorizontal: width * 0.03,
    borderRadius: 20,
  },
  gpsText: {
    color: '#fff',
    fontSize: width * 0.032,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: width * 0.05,
    marginBottom: height * 0.025,
    minHeight: height * 0.12,
    justifyContent: 'center',
  },
  cardTitle: {
    color: '#fff',
    fontWeight: '600',
    fontSize: width * 0.045,
    marginBottom: height * 0.008,
  },
  cardSubtitle: {
    color: '#bbb',
    fontSize: width * 0.037,
    marginBottom: height * 0.005,
  },
  cardDate: {
    color: '#bbb',
    fontSize: width * 0.033,
  },
  // Uncomment and make responsive if you want the meteor image
  // meteorImage: {
  //   position: 'absolute',
  //   right: width * 0.05,
  //   bottom: height * 0.015,
  //   width: width * 0.22,
  //   height: width * 0.22,
  // },
});

export default Explore;
