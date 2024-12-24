import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { useFirebase } from './FirebaseProvider';

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const [isAdded, setIsAdded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigation = useNavigation();
  const { user, firestore } = useFirebase();

  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
    // TODO: Implement actual add to cart functionality
  };

  const handleToggleFavorite = async () => {
    if (!user || !firestore) return;

    const favoriteRef = firestore().collection('favorites').doc(`${user.uid}_${product.id}`);

    try {
      if (isFavorite) {
        await favoriteRef.delete();
      } else {
        await favoriteRef.set({ userId: user.uid, productId: product.id });
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('ProductDetails', { productId: product.id })}
    >
      <Image source={{ uri: product.image }} style={styles.image} />
      <TouchableOpacity style={styles.favoriteButton} onPress={handleToggleFavorite}>
        <Icon name="heart" size={20} color={isFavorite ? 'red' : 'gray'} />
      </TouchableOpacity>
      <View style={styles.details}>
        <Text style={styles.name}>{product.name}</Text>
        <View style={styles.ratingContainer}>
          <Icon name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{product.rating}</Text>
        </View>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <TouchableOpacity
          style={[styles.addButton, isAdded && styles.addedButton]}
          onPress={handleAddToCart}
        >
          <Text style={styles.addButtonText}>{isAdded ? 'Added' : 'Add to Cart'}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '48%',
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 5,
  },
  details: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: '#007AFF',
    borderRadius: 4,
    paddingVertical: 6,
    alignItems: 'center',
  },
  addedButton: {
    backgroundColor: '#4CD964',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

