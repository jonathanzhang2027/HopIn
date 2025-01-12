import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RidePostContainer from './RidePostContainer';
import { auth, db } from '../config/firebaseConfig';
import { collection, onSnapshot, query, Timestamp } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';

interface RidePosting {
    id: string;
    driver_id: string;
    name: string;
    source: string;
    destination: string;
    price: number;
    date: Date;
}

export default function SearchFilter({ navigation }: { navigation: any }) {
    const [postings, setPostings] = useState<RidePosting[]>([]);
    const [afterFilter, setAfterFilter] = useState<RidePosting[]>([]);
    const [from, setFrom] = useState<string>('');
    const [destination, setDestination] = useState<string>('');
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [confirmedRides, setConfirmedRides] = useState<RidePosting[]>([]);


    // Listen for changes to the authenticated user
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

    // Pull ride postings from the database
    useEffect(() => {
        const q = query(collection(db, 'rides'));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const postingsData: RidePosting[] = querySnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    driver_id: data.driver_id || '',
                    name: data.name || '',
                    source: data.source || '',
                    destination: data.destination || '',
                    price: data.price || 0,
                    date: data.date instanceof Timestamp ? data.date.toDate() : new Date(),
                };
            });

            setPostings(postingsData);
            setAfterFilter(postingsData); // Show all postings initially
        });

        return () => unsubscribe();
    }, []);
     useEffect(() => {
       if(userId){
       const filteredRides = postings.filter((posting) => posting.driver_id === userId);
         setConfirmedRides(filteredRides)
       } else {
         setConfirmedRides([]);
        }
  }, [userId, postings]);


    const handleChange = (event: any, selectedDate?: Date) => {
        setShowPicker(false); // Close the picker after selection
        if (selectedDate) {
            setDate(selectedDate); // Update state with the new date
        }
    };

    const handleSubmit = () => {
        const filtered = postings.filter((posting) => {
            const isFromMatch = posting.source.toLowerCase() === from.toLowerCase();
            const isDestinationMatch = posting.destination.toLowerCase() === destination.toLowerCase();
            const isDateMatch = posting.date.toLocaleDateString() === date.toLocaleDateString(); // Compare only the date part
            return isFromMatch && isDestinationMatch && isDateMatch;
        });
        if (!from && !destination) {
            setAfterFilter(postings);
        }
        else {
            setAfterFilter(filtered);
        }
    };

    const renderItem = ({ item }: { item: RidePosting }) => {
        return (
            <View style={styles.posting}>
                <RidePostContainer
                    from={item.source}
                    destination={item.destination}
                    date={item.date}
                    price={item.price}
                    user={user}
                    ride_id={item.id}
                    driver_id={item.driver_id}
                />
            </View>
        );
    }

    const listHeaderComponent = () => {
        return (
            <View style={styles.header}>
                <TextInput
                    style={styles.input}
                    placeholder="From"
                    value={from}
                    onChangeText={setFrom}
                    placeholderTextColor="#aaa"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Destination"
                    value={destination}
                    onChangeText={setDestination}
                    placeholderTextColor="#aaa"
                />

                <DateTimePicker
                    mode="date"
                    value={date}
                    onChange={handleChange}
                />
                <Button title="Search" onPress={handleSubmit} />
        <Button title="Create Ride" onPress={() => navigation.navigate('Create Ride')} />
            </View>
        )
    }


    return (
        <View style={styles.screen}>
            <View style={styles.content}>
                <Text style={styles.title}> Postings</Text>
                <FlatList
                    data={afterFilter}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    ListHeaderComponent={listHeaderComponent}
                />

             <View>
            <Text style={styles.title}>Confirmed Rides</Text>
         <FlatList
            data={confirmedRides}
           renderItem={renderItem}
             keyExtractor={(item) => item.id}
            />
            </View>
        </View>
            <View style={styles.navBar}>
                <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('SearchFilter')}>
                    <Text>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Confirms')}>
                    <Text>Confirmations</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 20,
    },
    header: {
        padding: 20
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginVertical: 10,
        borderRadius: 10
    },
    posting: {
        padding: 15,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    navBar: {
        flexDirection: 'row',
        backgroundColor: '#f0f0f0',
        justifyContent: 'space-around',
        paddingVertical: 10,
    },
    navButton: {
        padding: 10,
    },
});