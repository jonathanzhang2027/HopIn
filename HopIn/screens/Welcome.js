import React, { useRef } from "react";
import {
  Text,
  Pressable,
  Image,
  View,
  StyleSheet,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

function WelcomeScreen({ navigation }) {
  const logoScale = useRef(new Animated.Value(1)).current; // Scale animation
  const logoOpacity = useRef(new Animated.Value(1)).current; // Opacity animation

  const handleNavigateToSignUp = () => {
    // Animate logo scale and opacity
    Animated.parallel([
      Animated.timing(logoScale, {
        toValue: 5, // Increase the logo size infinitely
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 0, // Fade out the logo
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Navigate to the Sign-Up page after the animation
      navigation.navigate("Sign Up");
    });
  };

  return (
    <LinearGradient
      colors={["#ffffff", "#f8f9fa", "#ebedef"]} // Subtle modern gradient
      style={styles.gradientBackground}
    >
      <View style={styles.contentContainer}>
        {/* Logo */}
        <Animated.Image
          source={require("../assets/images/logo1.png")} // Replace with your logo path
          style={[
            styles.image,
            { transform: [{ scale: logoScale }], opacity: logoOpacity },
          ]}
        />

        {/* Tagline */}
        <Text style={styles.baseText}>Seamlessly Connecting College Riders</Text>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <Pressable
            style={({ pressed }) =>
              pressed ? [styles.button, styles.buttonPressed] : styles.button
            }
            onPress={() => navigation.navigate("Sign In")}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) =>
              pressed ? [styles.button, styles.buttonPressed] : styles.button
            }
            onPress={handleNavigateToSignUp}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.95)", // Sleek card effect
    padding: 40,
    borderRadius: 20,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
    width: "85%",
  },
  image: {
    width: 450, // Slightly larger logo
    height: 400,
    marginBottom: 10,
    resizeMode: "contain",
  },
  baseText: {
    color: "#4a4a4a",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
    marginBottom: 30,
    letterSpacing: 0.5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    flex: 1,
    backgroundColor: "#6c63ff", // Modern purple tone
    borderRadius: 50, // Rounded button for modern feel
    paddingVertical: 14,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#6c63ff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  buttonPressed: {
    backgroundColor: "#5246d7", // Slightly darker purple on press
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 3,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
});

export default WelcomeScreen;