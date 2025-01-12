import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, FlatList, TextInput, Button, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { collection, doc, setDoc, addDoc } from 'firebase/firestore';
import { auth, db } from '@/config/firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';

interface RidePosting {
  id: string;
  from: string;
  destination: string;
  date: Date;
}

export default function SearchFilter( { navigation }: { navigation: any }) {
  const [postings, setPostings] = useState<RidePosting[]>([]);
  const [afterFilter, setAfterFilter] = useState<RidePosting[]>([]);
  const [from, setFrom] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

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

  const handleChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false); // Close the picker after selection
    if (selectedDate) {
      setDate(selectedDate); // Update state with the new date
    }
  };

  const handleSubmit = () => {
    console.log('From:', from);
    console.log('Destination:', destination);
    console.log('Date:', date.toLocaleDateString());

    const filtered = postings.filter((posting) => {
        const isFromMatch = posting.from.toLowerCase()===(from.toLowerCase());
        const isDestinationMatch = posting.destination.toLowerCase()===(destination.toLowerCase());
        const isDateMatch = posting.date.toLocaleDateString() === date.toLocaleDateString(); // Compare only the date part

        return isFromMatch && isDestinationMatch && isDateMatch;
      });
      if(!from && !destination){
        setAfterFilter(postings);
      }
      else{
        setAfterFilter(filtered);
      }
  };

  const renderItem = ({ item }: { item: RidePosting }) => (
    <View style={styles.posting}>
      <Text>From: {item.from}</Text>
      <Text>Destination: {item.destination}</Text>
      <Text>Date: {item.date.toLocaleDateString()}</Text>
    </View>
  );

  const createRide = async () => {
    const docData = {
      ride: 1,
      driver_id: userId
    }
    const collectionRef = collection(db, 'rides');
    const docRef = await addDoc(collectionRef, docData);
  }


  return (
    <View>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="From"
          value={from}
          onChangeText={setFrom}
        />
        <TextInput
          style={styles.input}
          placeholder="Destination"
          value={destination}
          onChangeText={setDestination}
        />
        
        <DateTimePicker
          mode="date"
          value={date}
          onChange={handleChange}
        />

        <Button title="Search" onPress={handleSubmit}/>
      </View>
      <View>
        <Button title="Create Ride" onPress={() => navigation.navigate('Create Ride')}/>
      </View>
      
    </View>
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
  },
  posting: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  }
});