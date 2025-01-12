import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import SearchFilter from '@/components/searchFilter';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from '@/screens/AuthScreen';
import WelcomeScreen from '@/screens/Welcome';
import SignUp from '@/screens/SignUp';
import CreateRide from '@/screens/CreateRide';

const Stack = createStackNavigator();

export default function Index() {

  return (
    
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      {/* First Screen */}
      <Stack.Screen
    name="Welcome"
    component={WelcomeScreen}
    options={{headerShown: false }} // Disable header for Welcome screen
  />
      
      <Stack.Screen name="Sign In" component={AuthScreen} options = {{ title: 'monkey' }}/>
      <Stack.Screen name="Sign Up" component={SignUp} />
      <Stack.Screen name="SearchFilter" component={SearchFilter} />
      <Stack.Screen name="Create Ride" component={CreateRide} />
    </Stack.Navigator>
  );
}
