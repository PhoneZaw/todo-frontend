import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ToastAndroid} from 'react-native';
import Button from '../utils/Button';
import {Input} from '../utils/Input';

const SignUp = ({setToken, navigation}) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const user = async () => {
    try {
      const response = await fetch(
        'http://192.168.8.121:3000/api/v1/users/signup',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: `${name}`,
            password: `${password}`,
          }),
        },
      );
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      ToastAndroid.show('Passwords do not match', ToastAndroid.SHORT);
      console.log('Passwords do not match');
      return;
    }
    const response = await user();
    if (response.error) {
      ToastAndroid.show(response.message, ToastAndroid.SHORT);
      console.log(response.message);
      return;
    }
    if (response.token) {
      ToastAndroid.show('You are signed up!', ToastAndroid.SHORT);
      navigation.navigate('Login');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sign Up</Text>
      <View style={styles.container2}>
        <Input text="Username" value={name} handleTitle={setName} />
        <Input text="Password" value={password} handleTitle={setPassword} />
        <Input
          text="Confirm Password"
          value={confirmPassword}
          handleTitle={setConfirmPassword}
        />
        <Button text="Sign Up" onPress={handleSignUp} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  container2: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 40,
    color: '#111',
    marginVertical: 30,
    marginLeft: 10,
  },
});

export default SignUp;
