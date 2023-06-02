import {StyleSheet, View, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const CheckLogin = () => {
  const navigation = useNavigation();

  const [isUserLogin, setIsUserLogin] = useState('notLogin');

  console.log(isUserLogin, 'isUserLogin');

  const getUserToken = () => {
    try {
      AsyncStorage.getItem('isLogin').then(value => {
        console.log('vale', value);
        setIsUserLogin(value);
      });
    } catch (e) {
      setIsUserLogin('false');
    }
  };

  useEffect(() => {
    getUserToken();
  }, []);

  return (
    <>
      {isUserLogin === 'true' ? (
        navigation.replace('AppStack')
      ) : isUserLogin === 'notLogIn' ? (
        <View style={styles.loader}>
          <ActivityIndicator animating={true} size={50} color={'#000'} />
        </View>
      ) : (
        navigation.replace('AuthStack')
      )}
    </>
  );
};

export default CheckLogin;

const styles = StyleSheet.create({
  loader: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
