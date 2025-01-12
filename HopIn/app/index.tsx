import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import SearchFilter from '@/components/searchFilter';

export default function Index() {
  return (
    <ScrollView>
      <SearchFilter/>
    </ScrollView>
  );
}
