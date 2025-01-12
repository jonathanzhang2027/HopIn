import React, { useRef, useEffect, useState } from "react";
import {
  Text,
  TextInput,
  Pressable,
  Image,
  View,
  StyleSheet,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const SignUpScreen = ({ navigation }) => {
  const formAnimation = useRef(new Animated.Value(300)).current; // Start off-screen
  const opacity = useRef(new Animated.Value(0)).current; // Initial opacity

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    instagram: "",
    phone: "",
  });

  useEffect(() => {
    // Slide form in and fade in
    Animated.parallel([
      Animated.timing(formAnimation, {
        toValue: 0, // Move to its position
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSignUp = () => {
    // Implement sign-up logic here (e.g., Firebase Authentication)
    console.log("Sign Up Data:", formData);
  };

  return (
    <LinearGradient
      colors={["#ffffff", "#f8f9fa", "#ebedef"]} // Gradient similar to WelcomeScreen
      style={styles.gradientBackground}
    >
      <View style={styles.contentContainer}>
        {/* Logo */}
        <Image
          source={require("../assets/images/logo1.png")} // Replace with your logo path
          style={styles.image}
        />

        {/* Header Text */}
        <Animated.Text
          style={[
            styles.headerText,
            { transform: [{ translateY: formAnimation }], opacity },
          ]}
        >
          Create Your Account
        </Animated.Text>

        {/* Input Fields */}
        <Animated.View
          style={{
            transform: [{ translateY: formAnimation }],
            opacity,
            width: "100%",
          }}
        >
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#7f7f7f"
            onChangeText={(text) => handleInputChange("name", text)}
            value={formData.name}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#7f7f7f"
            keyboardType="email-address"
            onChangeText={(text) => handleInputChange("email", text)}
            value={formData.email}
          />
          <TextInput
            style={styles.input}
            placeholder="Instagram (e.g., @username)"
            placeholderTextColor="#7f7f7f"
            onChangeText={(text) => handleInputChange("instagram", text)}
            value={formData.instagram}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="#7f7f7f"
            keyboardType="phone-pad"
            onChangeText={(text) => handleInputChange("phone", text)}
            value={formData.phone}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#7f7f7f"
            secureTextEntry={true}
            onChangeText={(text) => handleInputChange("password", text)}
            value={formData.password}
          />
        </Animated.View>

        {/* Sign Up Button */}
        <Animated.View
          style={{
            transform: [{ translateY: formAnimation }],
            opacity,
          }}
        >
          <Pressable
            style={({ pressed }) =>
              pressed ? [styles.button, styles.buttonPressed] : styles.button
            }
            onPress={handleSignUp}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </Pressable>
        </Animated.View>

        {/* Footer Text */}
        <Animated.View
          style={{
            transform: [{ translateY: formAnimation }],
            opacity,
          }}
        >
          <Text style={styles.footerText}>
            Already have an account?{" "}
            <Text
              style={styles.signInText}
              onPress={() => navigation.navigate("Sign In")}
            >
              Sign In
            </Text>
          </Text>
        </Animated.View>
      </View>
    </LinearGradient>
  );
};

export default SignUpScreen;

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
    width: 250, // Slightly larger logo
    height: 200,
    marginBottom: -15,
    resizeMode: "contain",
  },
  headerText: {
    color: "#4a4a4a",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: "#f0f0f0",
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
    marginVertical: 10,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  button: {
    backgroundColor: "#6c63ff",
    borderRadius: 50,
    paddingVertical: 14,
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#6c63ff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  buttonPressed: {
    backgroundColor: "#5246d7",
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
  footerText: {
    color: "#4a4a4a",
    fontSize: 16,
    marginTop: 20,
    textAlign: "center",
  },
  signInText: {
    color: "#6c63ff",
    fontWeight: "bold",
  },
});
