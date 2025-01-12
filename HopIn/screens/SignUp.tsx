import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { auth, db } from '@/config/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { ScrollView } from 'react-native';

interface SignUpProps {
  navigation: {
    navigate: (screen: string) => void;
  };
}

const SignUp: React.FC<SignUpProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [instagram, setInstagram] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignUp = async (): Promise<void> => {
    setLoading(true);

    if (!email || !password || !name || !phone || !instagram) {
      Alert.alert('Error', 'All fields are required.');
      setLoading(false);
      return;
    }

    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Save user data to Firestore
      const userId = userCredential.user.uid;
      const userDocRef = doc(db, 'users', userId);
      await setDoc(userDocRef, {
        name,
        phone,
        instagram,
        my_postings: [],
        my_pending_rides: [],
        my_confirmed_rides: [],
        to_confirm: []
      });

      Alert.alert('Success', 'Account created successfully!');
      // Clear input fields after success
      setEmail('');
      setPassword('');
      setName('');
      setPhone('');
      setInstagram('');
    } catch (error: any) {
      console.error('Error signing up:', error);
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
      navigation.navigate('SearchFilter')
    }
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      {/* Name */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={[styles.input, { fontStyle: name ? 'normal' : 'italic' }]}
          placeholder="John Doe"
          placeholderTextColor="#888"
          value={name}
          onChangeText={setName}
        />
      </View>

      {/* Email */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email:</Text>
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

      {/* Password */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={[styles.input, { fontStyle: password ? 'normal' : 'italic' }]}
          placeholder="********"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      {/* Phone */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone:</Text>
        <TextInput
          style={[styles.input, { fontStyle: phone ? 'normal' : 'italic' }]}
          placeholder="123-456-7890"
          placeholderTextColor="#888"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
      </View>

      {/* Instagram */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Instagram:</Text>
        <TextInput
          style={[styles.input, { fontStyle: instagram ? 'normal' : 'italic' }]}
          placeholder="@yourhandle"
          placeholderTextColor="#888"
          value={instagram}
          onChangeText={setInstagram}
          autoCapitalize="none"
        />
      </View>

      {/* Sign Up Button */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Sign Up" onPress={handleSignUp} />
      )}

      {/* Switch to Sign In Button */}
      <Button
        title="Switch to Sign In"
        onPress={() => navigation.navigate('Sign In')}
      />
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
  },
  label: {
    width: '30%', // Adjust label width for alignment
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
    marginRight: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    color: '#000',
  },
});

export default SignUp;
