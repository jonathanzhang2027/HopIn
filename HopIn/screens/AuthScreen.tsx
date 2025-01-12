import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { auth } from "@/config/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function AuthScreen({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSignIn = async (): Promise<void> => {
    setLoading(true);
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential && userCredential.user) {
        navigation.navigate("SearchFilter");
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={["#ffffff", "#f8f9fa", "#ebedef"]}
      style={styles.gradientBackground}
    >
      <View style={styles.contentContainer}>
        {/* Header Text */}
        <Text style={styles.headerText}>Welcome Back</Text>

        {/* Input Fields */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#7f7f7f"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#7f7f7f"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* Sign In Button */}
        {loading ? (
          <ActivityIndicator size="small" color="#6c63ff" />
        ) : (
          <Pressable
            style={({ pressed }) =>
              pressed ? [styles.button, styles.buttonPressed] : styles.button
            }
            onPress={handleSignIn}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </Pressable>
        )}

        {/* Switch to Sign Up Button */}
        <Pressable onPress={() => navigation.navigate("Sign Up")}>
          <Text style={styles.footerText}>
            Don't have an account?{" "}
            <Text style={styles.signUpText}>Sign Up</Text>
          </Text>
        </Pressable>
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
  headerText: {
    color: "#4a4a4a",
    fontSize: 24,
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
    width: "100%",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
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
    marginTop: 10,
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
  signUpText: {
    color: "#6c63ff",
    fontWeight: "bold",
  },
}); 