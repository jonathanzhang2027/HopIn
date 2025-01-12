import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    ScrollView,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { auth, db } from '@/config/firebaseConfig';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';



export default function CreateRide({ navigation }: { navigation: any }) {
    const [name, setName] = useState<string>('');
    const [source, setSource] = useState<string>('');
    const [destination, setDestination] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [seats, setSeats] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);


    const [user, setUser] = useState<User | null>(null);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setUserId(user.uid);
            } else {

                setUser(null);
                setUserId(null);
            }
        });
        return () => unsubscribe();
    }, []);


    const handleCreateRide = async () => {

        if (!source || !destination || !price || !seats || !date) {
            Alert.alert('Error', 'All fields are required.');
            return;
        }

        const docData = {
            source,
            destination,
            price,
            seats,
            date,
            driver_id: userId
        }

        const collectionRef = collection(db, 'ridePostings');
        const docRef = await addDoc(collectionRef, docData);

        navigation.navigate('SearchFilter')
    };


    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Create Posting</Text>


                {/* Source */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Source:</Text>
                    <TextInput
                        style={[styles.input, { fontStyle: source ? 'normal' : 'italic' }]}
                        placeholder="Starting Point"
                        placeholderTextColor="#888"
                        value={source}
                        onChangeText={setSource}
                    />
                </View>


                {/* Destination */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Destination:</Text>
                    <TextInput
                        style={[styles.input, { fontStyle: destination ? 'normal' : 'italic' }]}
                        placeholder="Destination"
                        placeholderTextColor="#888"
                        value={destination}
                        onChangeText={setDestination}
                    />
                </View>


                {/* Price */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Price:</Text>
                    <TextInput
                        style={[styles.input, { fontStyle: price ? 'normal' : 'italic' }]}
                        placeholder="$10"
                        placeholderTextColor="#888"
                        value={price}
                        onChangeText={setPrice}
                        keyboardType="numeric"
                    />
                </View>


                {/* Available Seats */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Seats:</Text>
                    <TextInput
                        style={[styles.input, { fontStyle: seats ? 'normal' : 'italic' }]}
                        placeholder="2"
                        placeholderTextColor="#888"
                        value={seats}
                        onChangeText={setSeats}
                        keyboardType="numeric"
                    />
                </View>


                {/* Date */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Date:</Text>
                    <TextInput
                        style={[styles.input, { fontStyle: date ? 'normal' : 'italic' }]}
                        placeholder="YYYY-MM-DD"
                        placeholderTextColor="#888"
                        value={date}
                        onChangeText={setDate}
                    />
                </View>


                {/* Create Posting Button */}
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <Button title="Create Posting" onPress={handleCreateRide} />
                )}


                {/* Back to Home Button */}
                <Button
                    title="Back to Home"
                    onPress={() => navigation.navigate('Welcome')}
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
        width: '30%',
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
