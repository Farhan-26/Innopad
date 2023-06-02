import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

const Card = ({item, index}) => {
  return (
    <View style={styles.container}>
      <FastImage
        style={styles.image}
        source={{
          uri: item?.product_image,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.category}>{item?.category_name}</Text>
        <Text style={styles.productName}>{item?.product_name}</Text>
        <Text style={styles.description}>{item?.description}</Text>
        <Text style={styles.price}>Price: ${item?.product_price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
    elevation: 2,
    marginHorizontal: 8,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  detailsContainer: {
    flex: 1,
  },
  category: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
    color: '#000',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default Card;
