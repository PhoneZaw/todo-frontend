import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Header = ({text, handleCancel, handleDone}) => {
  return (
    <View style={styles.container}>
      {handleCancel && (
        <Text style={styles.text2} onPress={handleCancel}>
          cancel
        </Text>
      )}
      <Text style={styles.text}>{text}</Text>
      {handleDone && (
        <Text style={styles.text2} onPress={handleDone}>
          done
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: '100%',
    backgroundColor: '#f88124',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  text: {
    fontSize: 40,
    color: '#fff',
  },
  text2: {
    fontSize: 20,
    color: '#111',
  },
});

export default Header;
