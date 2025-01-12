import React from "react";
import {
  Text,
  Pressable,
  Image,
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AuthScreen from "@/screens/AuthScreen"

function WelcomeScreen({ navigation }) {
  return (
    <LinearGradient
      colors={["#ffffff", "#f8f9fa", "#ebedef"]} // Subtle modern gradient
      style={styles.gradientBackground}
    >
      <View style={styles.contentContainer}>
        {/* Logo */}
        <Image
          source={require("../assets/images/logo1.png")} // Replace with your logo path
          style={styles.image}
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
            onPress={() => navigation.navigate("Sign Up")}
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
    fontSize: 16, // Bigger font for tagline
    textAlign: "center",
    fontFamily: "System", // Replace with custom font if needed
    fontWeight: "500",
    marginBottom: 30,
    letterSpacing: 0.5, // Subtle spacing for modern look
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
    textTransform: "uppercase", // Modern all-uppercase button text
    letterSpacing: 1.2,
  },
});

export default WelcomeScreen;