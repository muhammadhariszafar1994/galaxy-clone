import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { IMAGES } from "../../Constants/IMAGES";

const { width, height } = Dimensions.get("window");

const TravelScreen = () => {
  return (
    <ImageBackground
      source={IMAGES.Travelbg} // apni background image ka path yahan lagao
      style={styles.bg}
      resizeMode="cover"
    >
      {/* Title */}
      <Text style={styles.title}>Travel to{'\n'}Explanet</Text>

      {/* 2 Equal Buttons */}
      <View style={styles.btnRow}>
        <TouchableOpacity style={styles.equalBtn}>
          <Text style={styles.btnText}>GUIDED JOURNEY</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.equalBtn}>
          <Text style={styles.btnText}>PLANETARIUM MODE </Text>
        </TouchableOpacity>
      </View>

      {/* Small Border Box */}
      <View style={styles.visitBox}>
        <Text style={styles.visitText}>Visit</Text>
      </View>

      {/* Large Border Container */}
      <View style={styles.largeBox}>
        <View style={styles.textSide}>
          <Text style={styles.largeText}>
           Kepler-425 b{'\n'}Earth-like and
radiant
          </Text>
        </View>
        <Image
          source={IMAGES.earth} // apni earth image ka path
          style={styles.earthImg}
          resizeMode="contain"
        />
      </View>

      {/* Bottom Button */}
      <TouchableOpacity style={styles.bigBtn}>
        <Text style={styles.bigBtnText}>Explore to item</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: width * 0.08,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginTop: height * 0.05,
  },
btnRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: height * 0.04,
  paddingHorizontal: width * 0.05,
  alignItems: "stretch", // height equal karne ke liye
},
equalBtn: {
  flex: 1, // equal width
  height: height * 0.06, // fixed height
  backgroundColor: "rgba(255,255,255,0.2)",
  borderRadius: 40,
  borderWidth: 1,
  borderColor: "#fff",
  alignItems: "center",
  justifyContent: "center", // text vertically center
  marginHorizontal: width * 0.01,
},  btnText: {
    color: "#fff",
    fontSize: width * 0.030,
    textAlign: "center",
  },
  visitBox: {
    alignSelf: "center",
    marginTop: height * 0.03,
    borderWidth: 1,
    borderColor: "#fff",
    paddingVertical: height * 0.008,
    paddingHorizontal: width * 0.06,
    borderRadius: 20,
  },
  visitText: {
    color: "#fff",
    fontSize: width * 0.045,
  },
  largeBox: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 20,
    marginTop: height * 0.04,
    padding: width * 0.04,
    alignItems: "center",
    margin: width * 0.05,
  },
  textSide: {
    flex: 1,
    paddingRight: width * 0.03,
  },
  largeText: {
    color: "#fff",
    fontSize: width * 0.045,
  },
  earthImg: {
    width: width * 0.25,
    height: width * 0.25,
  },
  bigBtn: {
    backgroundColor: "#fff",
    paddingVertical: height * 0.018,
    borderRadius: 30,
    marginTop: height * 0.05,
    alignSelf: "center",
    width: "70%",
  },
  bigBtnText: {
    color: "#000",
    fontSize: width * 0.05,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default TravelScreen;
