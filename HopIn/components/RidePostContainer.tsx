import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { auth, db } from '@/config/firebaseConfig';
import { collection, addDoc, doc, setDoc, arrayUnion, updateDoc, getDoc} from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import { ScrollView } from 'react-native';

interface RidePostProps {
    ride_id: string
    driver_id: string
    from: string;
    destination: string;
    date: Date;
    price: number;
    user: User | null;
  }

const RequestRide = async (user: User | null, ride_id: string, driver_id: string) => {
    if(!user)
        return;
    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);
    if(!userDoc.exists())
      return;

        await updateDoc(userRef, {
            my_pending_rides: arrayUnion(ride_id)
        })
    
    const driverRef = doc(db, 'users', driver_id);
        await updateDoc(driverRef, {
            to_confirm: arrayUnion({passengerName: userDoc.data().name,
                passengerInsta: userDoc.data().instagram,
                passengerPhoneNumber: userDoc.data().phone,
                passengerId: userRef.id,
                ride_id: ride_id})
        })
}

export default function RidePostContainer(props: RidePostProps) {
    return(
        <TouchableOpacity style={styles.container}>
            <View style={styles.stuff}>
                <Text>From: {props.from}</Text>
                <Text>Destination: {props.destination}</Text>
                <Text>Date: {props.date.toLocaleDateString()}</Text>
                <Text>${props.price}</Text>
            </View>
            <Button title="request" onPress={() => RequestRide(props.user, props.ride_id, props.driver_id    )}/>
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