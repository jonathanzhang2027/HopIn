import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Button, TouchableOpacity, Alert } from 'react-native';
import { auth, db } from '../config/firebaseConfig';
import { doc, onSnapshot, getDoc, arrayRemove, arrayUnion, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';

interface ToConfirmItem {
    passengerId: string;
    passengerInsta: string;
    passengerName: string;
    passengerPhoneNumber: string;
    rideID: string;
}

export default function ConfirmsScreen({ navigation }: { navigation: any }) {
    const [confirmItems, setConfirmItems] = useState<ToConfirmItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    const ConfirmedRide = async (item: ToConfirmItem) => {
        setLoading(true);
          if(!user){
              Alert.alert("Error", "User not logged in");
              return;
         }
        try {
            const passengerRef = doc(db, 'users', item.passengerId);
            const driverRef = doc(db, 'users', user.uid);
            const passengerSnap = await getDoc(passengerRef);

            if(!passengerSnap.exists()) {
               Alert.alert("Error", "Passenger does not exist");
              return;
            }

           await updateDoc(passengerRef, {
             my_confirmed_rides: arrayUnion(item.rideID),
            my_pending_rides: arrayRemove(item.rideID)
           });
        
             await updateDoc(driverRef, {
               to_confirm: arrayRemove({
                 passengerId: item.passengerId,
                 passengerInsta: item.passengerInsta,
                passengerName: item.passengerName,
               passengerPhoneNumber: item.passengerPhoneNumber,
                ride_id: item.rideID
           })
        });
            Alert.alert("Success", "Ride has been Confirmed");
            setConfirmItems(prevItems => prevItems.filter(data => data.rideID !== item.rideID));

         } catch (error: any) {
              Alert.alert("Error", error.message);
             console.log("Error updating users: ", error);
         }
        finally{
             setLoading(false);
        }
    };


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setLoading(true);
          if (user) {
                setUser(user);
              const userRef = doc(db, 'users', user.uid);

                const unsubscribeFromFirestore = onSnapshot(userRef, (doc) => {
                    if (doc.exists()) {
                        const userData = doc.data();
                      const toConfirm = userData?.to_confirm || [];
                       setConfirmItems(toConfirm.map(item => ({
                            passengerId: item.passengerId || "",
                            passengerInsta: item.passengerInsta || "",
                            passengerName: item.passengerName || "",
                            passengerPhoneNumber: item.passengerPhoneNumber || "",
                            rideID: item.ride_id || ""
                       })));
                   }
                 setLoading(false);
                });
                 return () => {
                    unsubscribeFromFirestore()
                   setLoading(false)
                  }
           } else{
                setUser(null);
              setConfirmItems([]);
            setLoading(false);
           }
         });
        return () => unsubscribe();
     }, []);


    const renderItem = ({ item }: { item: ToConfirmItem }) => (
        <View style={styles.itemContainer}>
            <View style={styles.textContainer}>
               <Text style={styles.text}>Name: {item.passengerName}</Text>
                <Text style={styles.text}>Instagram:{item.passengerInsta}</Text>
                <Text style={styles.text}>Phone: {item.passengerPhoneNumber}</Text>
            </View>
            <View style={styles.buttonContainer}>
             <Button title='Accept' onPress={() => ConfirmedRide(item)}/>
            </View>
        </View>
    );

    if(loading){
        return (
            <View style={[styles.container, {justifyContent:'center', alignItems:'center'}]}>
                <ActivityIndicator size='large' />
            </View>
        )
    }

    return (
        <View style={styles.screen}>
        <View style={styles.content}>
            <Text style={styles.title}>Passenger Requests</Text>
            {confirmItems.length > 0 ? (
                <FlatList
                    data={confirmItems}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            ) : (
                 <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <Text>No Confirmations Available</Text>
                 </View>
             )
            }
        </View>
        <View style={styles.navBar}>
            <TouchableOpacity style={styles.navButton} onPress={()=> navigation.navigate('SearchFilter')}>
              <Text>Home</Text>
             </TouchableOpacity>
            <TouchableOpacity style={styles.navButton} onPress={()=> navigation.navigate('ConfirmsScreen')}>
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
    container: {
        flex: 1,
       padding: 20,
    },
    itemContainer: {
      flexDirection: 'row',
        padding: 15,
       borderBottomWidth: 1,
        borderColor: '#ccc',
     justifyContent: 'space-between'
   },
   textContainer: {
      flex: 3
   },
    text: {
        fontSize: 16,
    },
    title: {
       fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    buttonContainer: {
        flex: 1,
       justifyContent: 'center'
   },
   navBar: {
       flexDirection: 'row',
        backgroundColor: '#f0f0f0',
        justifyContent: 'space-around',
        paddingVertical: 10,
   },
    navButton:{
       padding: 10,
  },
});