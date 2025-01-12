import React, { FC } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

interface RidePostProps {
    from: string;
    destination: string;
    date: Date;
    price: number;
  }

export default function RidePostContainer(props: RidePostProps) {
    return(
        <TouchableOpacity style={styles.container}>
            <View style={styles.stuff}>
                <Text>From: {props.from}</Text>
                <Text>Destination: {props.destination}</Text>
                <Text>Date: {props.date.toLocaleDateString()}</Text>
                <Text>Price: {props.price}</Text>
            </View>
            <Button title="request"></Button>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
    },
    stuff:{
        flex: 2,
    },
    secondStuff:{

    }
  });