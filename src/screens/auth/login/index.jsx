import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import TextField from '../../../components/textInput';
import {useFormik} from 'formik';
import {loginValidation} from '../../../validations';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [error, setErrors] = useState('');

  const {handleChange, handleSubmit, values, touched, errors} = useFormik({
    initialValues: {
      email: 'Jyoti',
      password: 'Jyoti@123',
    },
    validationSchema: loginValidation,
    onSubmit: values => {
      console.log(values);
      if (values.email === 'Jyoti' && values.password === 'Jyoti@123') {
        navigation.replace('ProductListing');
        AsyncStorage.setItem('isLogin', 'true')
          .then(res => {
            console.log(res, 'res');
          })
          .catch(err => {
            console.log('err', err);
          });
      } else {
        setErrors('Invalid Credentials');
      }
    },
  });

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.login}>Login</Text>
      </View>
      <TextField
        labelText="Username/Email"
        placeholder="Email"
        onChangeText={handleChange('email')}
        value={values.email}
        error={touched.email ? errors.email : ''}
      />
      <TextField
        labelText="Password"
        placeholder="Password"
        onChangeText={handleChange('password')}
        value={values.password}
        secureTextEntry
        error={touched.password ? errors.password : ''}
      />

      {error !== '' && <Text style={styles.error}>{error}</Text>}

      <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  loginBtn: {
    height: 45,
    width: Dimensions.get('window').width * 0.4,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 40,
  },
  loginText: {
    color: '#fff',
    fontWeight: '700',
  },
  login: {
    fontSize: 35,
    fontWeight: '700',
    marginBottom: 30,
    color: '#000011',
    textAlign: 'center',
  },
  error: {
    marginTop: 10,
    color: 'red',
    fontSize: 16,
  },
});

export default LoginScreen;
