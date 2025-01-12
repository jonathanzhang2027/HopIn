import React, { useState, useEffect } from 'react';
import { Button, Text, View, Alert, TextInput, ActivityIndicator } from 'react-native';
import { auth, db } from '../firebaseConfig';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    User,
    onAuthStateChanged,
    signOut
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function App() {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [authMessage, setAuthMessage] = useState<string | null>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setAuthMessage(`Welcome ${user.email}, you are already signed in!`);
            } else {
                setUser(null);
                setAuthMessage(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleEmailPasswordSignIn = async () => {
        setLoading(true);
        setErrorMessage(null);
        try {
            console.log("Attempting to sign in/up");
            console.log("email", email);
            console.log("password", password);
            console.log("isSignUp", isSignUp);

            if (!email) {
                setErrorMessage('Please enter a valid email address');
                return;
            }

            if (!password) {
                setErrorMessage('Please enter a password');
                return;
            }

            if (isSignUp && password.length < 6) {
                setErrorMessage('Password must be at least 6 characters long.');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                setErrorMessage('Please enter a valid email address.');
                return;
            }

            if (isSignUp) {
                const eduRegex = /\.edu$/i;
                if (!eduRegex.test(email)) {
                    setErrorMessage('Please use an email with an .edu domain.');
                    return;
                }
            }

            let userCredential;
            if (isSignUp) {
                userCredential = await createUserWithEmailAndPassword(auth, email, password);
                console.log('User signed up with email/password:', userCredential);
                setAuthMessage('Sign Up Successful!');

                // Create Firestore document for new user
                const userDocRef = doc(db, 'users', userCredential.user.uid);
                await setDoc(userDocRef, { num: 1 });
                 console.log('firestore doc created for uid: ',userCredential.user.uid );


            } else {
                userCredential = await signInWithEmailAndPassword(auth, email, password);
                console.log('User signed in with email/password:', userCredential);
                setAuthMessage('Sign In Successful!');
            }
            setUser(userCredential.user);
            Alert.alert('Success', `Welcome ${userCredential.user.email}`);
        } catch (error: any) {
            console.error('Error signing in with email/password:', error);
             setAuthMessage(null);
            if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
                 setErrorMessage('Incorrect email or password.');
            }
            else if (error.code) {
                 Alert.alert('Error', `${error.code}: ${error.message}`);
            }
             else {
                Alert.alert('Error', error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSignOut = async () => {
        setLoading(true);
        try {
            await signOut(auth);
            setUser(null);
            Alert.alert('Success', 'Signed Out');
            setAuthMessage(null);
        } catch (error: any) {
            console.error('Error signing out', error);
            if (error.code) {
                Alert.alert('Error', `${error.code}: ${error.message}`);
            } else {
                Alert.alert('Error', error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSwitchAuthMode = () => {
        setIsSignUp(!isSignUp);
        setEmail('');
        setPassword('');
        setErrorMessage(null);
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {loading ? (
                <ActivityIndicator size="large" />
            ) : user ? (
                <View>
                    <Text>Welcome {user.displayName || user.email || 'User'}!</Text>
                    {authMessage && <Text>{authMessage}</Text>}
                    <Button title="Sign Out" onPress={handleSignOut} />
                </View>
            ) : (
                <View>
                    <TextInput
                        style={{
                            height: 40,
                            borderColor: 'gray',
                            borderWidth: 1,
                            marginVertical: 10,
                            paddingHorizontal: 8,
                            width: 250,
                        }}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={{
                            height: 40,
                            borderColor: 'gray',
                            borderWidth: 1,
                            marginVertical: 10,
                            paddingHorizontal: 8,
                            width: 250,
                        }}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!isSignUp}
                    />
                    {errorMessage && <Text style={{ color: 'red', marginTop: 5, marginBottom: 5}}>{errorMessage}</Text>}
                    <Button
                        title={isSignUp ? 'Sign up with Email' : 'Sign in with Email'}
                        disabled={loading}
                        onPress={handleEmailPasswordSignIn}
                    />
                    <Button
                        title={isSignUp ? 'Switch to Sign In' : 'Switch to Sign Up'}
                        disabled={loading}
                        onPress={handleSwitchAuthMode}
                    />

                    {loading && <ActivityIndicator style={{ marginTop: 10 }} size="small" />}
                </View>
            )}
        </View>
    );
}