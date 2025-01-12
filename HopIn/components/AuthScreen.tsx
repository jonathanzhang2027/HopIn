import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { auth } from '@/config/firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

export default function AuthScreen() {
  // State types
  const [email, setEmail] = useState<string>(''); // Email must be a string
  const [password, setPassword] = useState<string>(''); // Password must be a string
  const [isSignUp, setIsSignUp] = useState<boolean>(false); // Boolean to toggle Sign Up/Sign In mode
  const [loading, setLoading] = useState<boolean>(false); // Boolean for loading state
  const [error, setError] = useState<string>(''); // Error message

  // Function to handle authentication (Sign In or Sign Up)
  const handleAuth = async (): Promise<void> => {
    setLoading(true);
    setError('');
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error: any) {
      setError(error.message); // Capture the error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address" // Ensures proper email keyboard on mobile devices
        autoCapitalize="none" // Prevent auto-capitalization
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry // Hides password input
        style={styles.input}
      />
      {/* Error Message */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Loading Indicator or Auth Button */}
      {loading ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        <Button title={isSignUp ? 'Sign Up' : 'Sign In'} onPress={handleAuth} />
      )}

      {/* Toggle Between Sign In and Sign Up */}
      <Button
        title={`Switch to ${isSignUp ? 'Sign In' : 'Sign Up'}`}
        onPress={() => setIsSignUp(!isSignUp)}
      />
    </View>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginVertical: 8,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});
