import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Login from './components/authentication/Login';
import SignUp from './components/authentication/SignUp';
import AllTasks from './components/main/AllTasks';
import PrevTasks from './components/main/PrevTasks';
import NewTask from './components/main/NewTask';
import EditTask from './components/main/EditTask';
import PrevTask from './components/main/PrevTask';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AllTask from './components/main/AllTasks';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      {/* <EditTask
        title="Eating"
        date={new Date('01 Jan 1970 00:00:00 GMT')}
        desc="Hello"
      /> */}
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="AllTasks" component={AllTasks} />
        <Stack.Screen name="PrevTasks" component={PrevTasks} />
        <Stack.Screen name="NewTask" component={NewTask} />
        <Stack.Screen name="EditTask" component={EditTask} />
        <Stack.Screen name="PrevTask" component={PrevTask} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
