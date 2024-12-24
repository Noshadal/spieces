import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import ProductCard from './ProductCard';

const products = [
  { id: 1, name: 'Cinnamon Sticks', price: 5.99, rating: 4.5, image: 'https://via.placeholder.com/200x200' },
  { id: 2, name: 'Ground Turmeric', price: 3.99, rating: 4.2, image: 'https://via.placeholder.com/200x200' },
  { id: 3, name: 'Whole Cloves', price: 4.49, rating: 4.7, image: 'https://via.placeholder.com/200x200' },
  { id: 4, name: 'Cardamom Pods', price: 6.99, rating: 4.8, image: 'https://via.placeholder.com/200x200' },
];

export default function ProductList() {
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
});

