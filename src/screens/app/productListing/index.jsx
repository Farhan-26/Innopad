import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Card from './card';
import {FlashList} from '@shopify/flash-list';
import {useNavigation} from '@react-navigation/native';

const ProductListing = () => {
  const navigation = useNavigation();
  const [allData, setAllData] = useState([]);

  console.log(allData, 'allData');

  const getData = () => {
    fetch(
      'https://www.innopadsolutions.com/projects/androidapi/webservice/getProduct',
    )
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.code === 200) {
          setAllData(responseJson?.data);
          console.log(responseJson);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <TouchableOpacity
        style={{
          height: 60,
          width: 60,
          borderRadius: 30,
          backgroundColor: 'gray',
          position: 'absolute',
          bottom: 25,
          right: 25,
          zIndex: 999,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate('AddProduct')}>
        <Text style={{fontSize: 30, color: '#fff', fontWeight: '900'}}>+</Text>
      </TouchableOpacity>
      <FlashList
        data={allData}
        ListHeaderComponent={
          //   <View
          //     style={{
          //       marginBottom: 20,
          //       marginHorizontal: 20,
          //       flexDirection: 'row',
          //     }}>
          //     <TouchableOpacity
          //       onPress={() => {
          //         allData.sort();
          //       }}
          //       style={{
          //         height: 40,
          //         width: 90,
          //         backgroundColor: 'gray',
          //         borderRadius: 20,
          //         justifyContent: 'center',
          //         alignItems: 'center',
          //         marginRight: 20,
          //       }}>
          //       <Text style={{}}>Ascending</Text>
          //     </TouchableOpacity>
          //     <TouchableOpacity
          //       style={{
          //         height: 40,
          //         width: 90,
          //         backgroundColor: 'gray',
          //         borderRadius: 20,
          //         justifyContent: 'center',
          //         alignItems: 'center',
          //       }}>
          //       <Text style={{}}>descending</Text>
          //     </TouchableOpacity>
          //   </View>
          <></>
        }
        contentContainerStyle={styles.mainContainer}
        renderItem={({item, index}) => {
          return <Card item={item} index={index} />;
        }}
        estimatedItemSize={200}
      />
    </>
  );
};

export default ProductListing;

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 10,
    paddingBottom: 35,
    paddingTop: 25,
  },
});
