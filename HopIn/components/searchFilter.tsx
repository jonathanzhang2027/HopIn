import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, FlatList, TextInput, Button, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RidePostContainer from './RidePostContainer';

interface RidePosting {
    id: string;
    from: string;
    destination: string;
    date: Date;
    price: number;
}

export default function SearchFilter() {
  //const [postings, setPostings] = useState<RidePosting[]>([]);
  const [postings, setPostings] = useState<RidePosting[]>([
    { id: '1', from: 'Santa Barbara', destination: 'Los Angeles', date: new Date('2025-01-15'), price: 100 },
    { id: '2', from: 'San Francisco', destination: 'Santa Barbara', date: new Date('2025-01-20') , price: 100},
    { id: '3', from: 'Los Angeles', destination: 'San Francisco', date: new Date('2025-02-10') , price: 100},
    { id: '4', from: 'Santa Barbara', destination: 'Las Vegas', date: new Date('2025-01-30') , price: 100},
    { id: '5', from: 'Los Angeles', destination: 'Santa Barbara', date: new Date('2025-01-18') , price: 100},
  ]);
  const [afterFilter, setAfterFilter] = useState<RidePosting[]>([]);
  const [from, setFrom] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
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

    const renderItem = ({ item }: { item: RidePosting }) => {
        //console.log('Rendering item:', item);
        return (
            <View style={styles.posting}>
                <RidePostContainer
                    from={item.from}
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