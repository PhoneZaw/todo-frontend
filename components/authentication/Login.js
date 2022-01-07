import React, {useState} from 'react';
import {View, Text, StyleSheet, ToastAndroid} from 'react-native';
import Button from '../utils/Button';
import {Input} from '../utils/Input';

const Login = ({navigation}) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const user = async () => {
    try {
      const response = await fetch(
        'http://192.168.8.121:3000/api/v1/users/login',
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

  const handleLogin = async () => {
    const response = await user();
    if (response.error) {
      ToastAndroid.show(response.message, ToastAndroid.SHORT);
      console.log(response.message);
      return;
    }
    if (response.token) {
      ToastAndroid.show("You're logged in!", ToastAndroid.SHORT);
      console.log(response.data);
      navigation.navigate('AllTasks', {
        id: response.data.user._id,
        token: response.token,
      });
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.smallText}>Welcome Back</Text>
      <Text style={styles.text}>Sign In to continue</Text>
      <View style={styles.container2}>
        <Input text="Username" value={name} handleTitle={setName} />
        <Input text="Password" value={password} handleTitle={setPassword} />
        <Button text="Login" onPress={handleLogin} />
        <Text style={styles.text2}>
          Don't have an account
          <Text
            style={styles.linkColor}
            onPress={() => navigation.navigate('SignUp')}>
            Sign up
          </Text>
        </Text>
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
    marginBottom: 30,
    marginLeft: 20,
  },
  smallText: {
    fontSize: 20,
    marginLeft: 20,
  },
  text2: {
    margin: 5,
  },
  linkColor: {color: '#f88124'},
});

export default Login;
