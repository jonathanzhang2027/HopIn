import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, FlatList, TextInput, Button, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RidePostContainer from './RidePostContainer';
import { auth, db } from '../config/firebaseConfig';
import { collection, onSnapshot, query, doc, setDoc, addDoc, Timestamp } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';

interface RidePosting {
  id: string;
  name: string;
  source: string;
  destination: string;
  price: number;
  date: Date;
  uid: string;
  driver_id: string;
}

export default function SearchFilter({ navigation }: { navigation: any }) {
  const [postings, setPostings] = useState<RidePosting[]>([]);
  const [afterFilter, setAfterFilter] = useState<RidePosting[]>([]);
  const [from, setFrom] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);


  // Listen for changes to the authenticated user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserId(user ? user.uid : null);
    });
    return () => unsubscribe();
  }, []);

  // Pull ride postings from the database
  useEffect(() => {
    const q = query(collection(db, 'ridePostings'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postingsData: RidePosting[] = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || '',
          source: data.source || '',
          destination: data.destination || '',
          price: data.price || 0,
          date: data.date instanceof Timestamp ? data.date.toDate() : new Date(),
          uid: data.uid || '',
          driver_id: data.driver_id || '',
        };
      });

      setPostings(postingsData);
      setAfterFilter(postingsData); // Show all postings initially
    });

    return () => unsubscribe();
  }, []);

  // Filter confirmed rides for the logged-in user
  console.log(userId)
  // console.log(postings[6].driver_id)
  const confirmedRides = postings.filter((posting) => posting.driver_id === userId);

  const renderItem = ({ item }: { item: RidePosting }) => (
    <View style={styles.posting}>
      <RidePostContainer
        from={item.source}
        destination={item.destination}
        date={item.date}
        price={item.price}
        uid={item.uid}
        driver_id={item.driver_id}
      />
    </View>
  );

  return (
    <ScrollView>
      <View style={styles.container}>
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
          onChange={(event, selectedDate) => setDate(selectedDate || date)}
        />
      </View>

      <Button title="Search" onPress={() => {
        const filtered = postings.filter((posting) => {
          const isFromMatch = posting.source.toLowerCase() === from.toLowerCase();
          const isDestinationMatch = posting.destination.toLowerCase() === destination.toLowerCase();
          const isDateMatch = posting.date.toLocaleDateString() === date.toLocaleDateString();
          return isFromMatch && isDestinationMatch && isDateMatch;
        });
        setAfterFilter(from || destination ? filtered : postings);
      }} />

      <View>
        <Button title="Create Ride" onPress={() => navigation.navigate('Create Ride')} />
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Confirmed Rides</Text>

        <FlatList
          data={confirmedRides}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Postings</Text>
        <FlatList
          data={afterFilter}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
  posting: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
