import { useEffect, useState } from 'react';
import { View, ScrollView, TextInput, Button, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface RidePosting {
  id: string;
  from: string;
  destination: string;
  date: string;
}

export default function Index() {
  const [postings, setPostings] = useState<RidePosting[]>([]);
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
    console.log('From:', from);
    console.log('Destination:', destination);
    console.log('Date:', date.toLocaleDateString());
  };

  return (
    <ScrollView>
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
  },
  posting: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  }
});