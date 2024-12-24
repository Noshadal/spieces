import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const { width: screenWidth } = Dimensions.get('window');

const videos = [
  { id: 1, thumbnail: 'https://via.placeholder.com/400x200' },
  { id: 2, thumbnail: 'https://via.placeholder.com/400x200' },
  { id: 3, thumbnail: 'https://via.placeholder.com/400x200' },
];

export default function VideoCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={{ uri: item.thumbnail }} style={styles.image} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Carousel
        data={videos}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth - 60}
        onSnapToItem={(index) => setActiveIndex(index)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    marginBottom: 20,
  },
  slide: {
    width: screenWidth - 60,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});

