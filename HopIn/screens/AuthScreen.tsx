import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { auth } from '@/config/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function AuthScreen({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState<string>(''); // No default example value here
  const [password, setPassword] = useState<string>(''); // No default example value here
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSignIn = async (): Promise<void> => {
    setLoading(true);
    setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential && userCredential.user) {
        navigation.navigate('SearchFilter');
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Email Label and Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={[styles.input, { fontStyle: email ? 'normal' : 'italic' }]}
          placeholder="example@domain.com"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Password Label and Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="password123" // Example placeholder
          placeholderTextColor="#888" // Grey italicized placeholder text
          value={password} // Controlled by state
          onChangeText={(text) => setPassword(text)} // Update state when user types
          secureTextEntry // Always hide password input
          style={[
            styles.input,
            {
              fontStyle: password ? 'normal' : 'italic', // Show italicized text only when empty
              color: password ? '#000' : '#888', // Grey text when empty, black when filled
            },
          ]}
        />
      </View>

      {/* Error Message */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Loading or Sign In Button */}
      {loading ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        <Button title="Sign In" onPress={handleSignIn} />
      )}

      {/* Switch to Sign Up */}
      <Button
        title="Switch to Sign Up"
        onPress={() => navigation.navigate('Sign Up')} // Navigate to SignUpScreen
      />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    backgroundColor: '#f9f9f9',
    color: '#000', // Black text when user types
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});
