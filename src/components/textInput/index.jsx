import React, {useState} from 'react';
import {TextInput, Text, View, StyleSheet, Dimensions} from 'react-native';

const TextField = props => {
  const {
    placeholder,
    onChangeText,
    value,
    inputContainer,
    secureTextEntry,
    labelText,
    error,
    errorStyle,
    keyboardType,
  } = props;

  return (
    <>
      <View style={styles.mainContainer}>
        {labelText !== '' && <Text style={styles.label}>{labelText}</Text>}
        <TextInput
          placeholder={placeholder}
          onChangeText={onChangeText}
          placeholderTextColor={'lightgray'}
          value={value}
          style={[styles.inputContainer, inputContainer]}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
        />
        {error !== '' && error !== undefined && (
          <Text style={[styles.errorStyle, errorStyle]}>{error}</Text>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: 10,
  },
  inputContainer: {
    height: 42,
    color: '#000',
    borderRadius: 15,
    fontSize: 14,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
    marginBottom: 5,
    width: Dimensions.get('window').width * 0.9,
    borderWidth: 1,
    borderColor: 'gray',
  },
  labelStyle: {
    fontSize: 14,
    color: '#808080',
    marginBottom: 5,
  },
  labelText: {
    fontSize: 14,
    marginLeft: 15,
    marginBottom: 5,
  },
  errorStyle: {
    fontSize: 12,
    color: 'red',
    marginLeft: 8,
  },

  label: {
    color: '#000',
    marginBottom: 8,
    marginLeft: 10,
    fontSize: 15,
  },
});

export default TextField;
