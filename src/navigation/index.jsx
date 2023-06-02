import {StyleSheet, Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import TextField from '../components/textInput';
import LoginScreen from '../screens/auth/login';
import ProductListing from '../screens/app/productListing';
import AddProduct from '../screens/app/addProduct';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const NavigationStack = () => {
  const [isUserLogin, setIsUserLogin] = useState('notLogin');
  const getUserToken = async () => {
    try {
      const value = await AsyncStorage.getItem('isLogin');
      setIsUserLogin(value);
    } catch (e) {
      setIsUserLogin('false');
    }
  };

  useEffect(() => {
    getUserToken();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerShown: false,
        presentation: 'modal',
        animationTypeForReplace: 'push',
        animation: 'slide_from_right',
      }}>
      {isUserLogin === 'true' ? (
        <>
          <Stack.Screen name="ProductListing" component={ProductListing} />
          <Stack.Screen name="AddProduct" component={AddProduct} />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

export default NavigationStack;

const styles = StyleSheet.create({});
