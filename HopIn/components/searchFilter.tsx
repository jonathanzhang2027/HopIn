import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, FlatList, TextInput, Button, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RidePostContainer from './RidePostContainer';
import { db } from '../config/firebaseConfig';
import { collection, onSnapshot, query } from 'firebase/firestore';

interface RidePosting {
    id: string;
    name: string;
    source: string;
    destination: string;
    price: number;
    date: Date;
  }
  
export default function SearchFilter() {
    const [postings, setPostings] = useState<RidePosting[]>([]);
  const [afterFilter, setAfterFilter] = useState<RidePosting[]>([]);
  const [from, setFrom] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

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
          date: data.date ? data.date.toDate() : new Date()
        };
      });
  
      setPostings(postingsData);
      setAfterFilter(postingsData); // Show all postings initially
    });
  
    // Cleanup function to unsubscribe from real-time updates when component unmounts
    return () => unsubscribe();
  }, []);

  const handleChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false); // Close the picker after selection
    if (selectedDate) {
      setDate(selectedDate); // Update state with the new date
    }
  };


  const handleSubmit = () => {
    //console.log('From:', from);
    //console.log('Destination:', destination);
    //console.log('Date:', date.toLocaleDateString());

    const filtered = postings.filter((posting) => {
        const isFromMatch = posting.source.toLowerCase()===(from.toLowerCase());
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

    const renderItem = ({ item }: { item: RidePosting }) => {
        //console.log('Rendering item:', item);
        return (
            <View style={styles.posting}>
                <RidePostContainer
                    from={item.source}
                    destination={item.destination}
                    date={item.date}
                    price={item.price}
                />
            </View>
        );
    }

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
            onChange={handleChange}
            />

        </View>

        <Button title="Search" onPress={handleSubmit}/>

        <View style={styles.container}>
            <Text style={styles.title}> Postings</Text>
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
  }
});