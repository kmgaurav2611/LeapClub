import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const CustomButton = ({text, customStyles, customTextStyles, onPress}) => (
  <TouchableOpacity
    onPress={() => onPress()}
    style={[styles.buttonContainer, {...customStyles}]}>
    <Text style={[styles.buttonText, {...customTextStyles}]}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#FF2400',
    width: 100,
    height: 40,
    margin: 5,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonText: {color: 'white', fontSize: 16},
});

export default CustomButton;
