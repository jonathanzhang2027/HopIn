import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import SearchFilter from '@/components/searchFilter';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from '@/screens/AuthScreen';
import WelcomeScreen from '@/screens/Welcome';
import SignUp from '@/screens/SignUp';

const Stack = createStackNavigator();

export default function Index() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* First Screen */}
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      {/* Second Screen */}
      <Stack.Screen name="Sign In" component={AuthScreen} />
      <Stack.Screen name="Sign Up" component={SignUp} />
      <Stack.Screen name="SearchFilter" component={SearchFilter} />
    </Stack.Navigator>
  );
}
