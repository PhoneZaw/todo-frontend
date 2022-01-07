import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const Button = ({text, onPress}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    // position: 'absolute',
    // bottom: 30,
    width: '80%',
    height: 60,
    borderRadius: 10,
    marginTop: 30,
    backgroundColor: '#f88124',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color: '#fff',
  },
});
export default Button;
