import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const NewNote = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>+</Text>
      </View>
      <Text style={styles.text}>New Note</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 180,
    width: 180,
    backgroundColor: '#f88124',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  text: {
    fontSize: 20,
    color: '#fff',
  },
  iconContainer: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
    marginBottom: 10,
  },
  icon: {
    position: 'relative',
    top: -10,
    flex: 1,
    fontSize: 60,
    color: '#f88124',
  },
});
export default NewNote;
