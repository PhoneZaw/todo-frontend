import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

const Note = ({desc, title, date, isChecked, onPress, onPressCircle}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.desc}>{desc}</Text>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.divider} />
      <Text style={styles.date}>{date.slice(0, 10)}</Text>
      <TouchableWithoutFeedback onPress={onPressCircle}>
        <View style={styles.circle}>
          {isChecked && <Icon name="check" size={25} color="#111" />}
        </View>
      </TouchableWithoutFeedback>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 180,
    width: 180,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 0,
    elevation: 15,
  },
  desc: {
    fontSize: 15,
    paddingHorizontal: 10,
    height: '40%',
  },
  title: {
    fontSize: 25,
    color: '#111',
    marginVertical: 5,
  },
  date: {
    fontSize: 15,
    color: '#111',
  },
  divider: {
    borderBottomColor: '#f88124',
    borderBottomWidth: 1,
    width: '90%',
  },
  circle: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: '#fff',
    borderColor: 'black',
    borderWidth: 1,
    textAlign: 'center',
    lineHeight: 30,
    justifyContent: 'center',
  },
  checkedCircle: {
    color: '#f88124',
    position: 'absolute',
    top: 0,
    right: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
export default Note;
