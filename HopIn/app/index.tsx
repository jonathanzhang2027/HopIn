import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import SearchFilter from '@/components/searchFilter';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from '@/screens/AuthScreen';
import WelcomeScreen from '@/screens/Welcome';
import SignUp from '@/screens/SignUp';
import CreateRide from '@/screens/CreateRide';
import ConfirmsScreen from '@/screens/Confirms';

const Stack = createNativeStackNavigator();

export default function Index() {

  return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* First Screen */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        {/* Second Screen */}
        <Stack.Screen name="Sign In" component={AuthScreen} />
        <Stack.Screen name="Sign Up" component={SignUp} />
        <Stack.Screen name="SearchFilter" component={SearchFilter} />
        <Stack.Screen name="Create Ride" component={CreateRide} />
        <Stack.Screen name="Confirms" component={ConfirmsScreen} />
      </Stack.Navigator>
  );
}
