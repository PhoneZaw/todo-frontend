import React, {useState} from 'react';
import {View, Text, StyleSheet, ToastAndroid} from 'react-native';
import Button from '../utils/Button';
import {Input} from '../utils/Input';
import Icon from 'react-native-vector-icons/FontAwesome';
import HideKeyboard from '../utils/HideKeyboard';

const Login = ({navigation}) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisable, setIsPasswordVisable] = useState(false);
  const user = async () => {
    try {
      const response = await fetch(
        'https://todoapibypz.herokuapp.com/api/v1/users/login',
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
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogin = async () => {
    const response = await user();
    console.log(response);
    if (response.status === 'fail') {
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
    <HideKeyboard>
      <View style={styles.container}>
        <Text style={styles.smallText}>Welcome Back</Text>
        <Text style={styles.text}>Sign In to continue</Text>
        <View style={styles.container2}>
          <Input text="Username" value={name} handleTitle={setName} />
          <Input
            text="Password"
            value={password}
            handleTitle={setPassword}
            isVisable={isPasswordVisable}
          />
          <Icon
            style={styles.passwordIcon}
            name={isPasswordVisable ? 'eye' : 'eye-slash'}
            size={25}
            color="#111"
            onPress={() => setIsPasswordVisable(!isPasswordVisable)}
          />
          <Button text="Login" onPress={handleLogin} />
          <Text style={styles.text2}>
            Don't have an account{' '}
            <Text
              style={styles.linkColor}
              onPress={() => navigation.navigate('SignUp')}>
              Sign up
            </Text>
          </Text>
        </View>
      </View>
    </HideKeyboard>
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
  passwordIcon: {
    position: 'relative',
    top: -48,
    right: -120,
  },
});

export default Login;
