import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import VideoCarousel from '../components/VideoCarousel';
import ProductList from '../components/ProductList';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <VideoCarousel />
      <ProductList />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

