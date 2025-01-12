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
        <View >
            <Text>From: {props.from}</Text>
            <Text>Destination: {props.destination}</Text>
            <Text>Date: {props.date.toLocaleDateString()}</Text>
            <Text>Price: {props.price}</Text>
        </View>
    );
}