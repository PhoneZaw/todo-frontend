import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Button from '../utils/Button';
import {Input, MultilineInput, DateInput} from '../utils/Input';
import Header from './utils/Header';

const NewTask = props => {
  const {id, token} = props.route.params;
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [desc, setDesc] = useState('');

  const addTodo = async () => {
    try {
      const res = await fetch(
        `http://192.168.8.121:3000/api/v1/users/${id}/todos`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: `${title}`,
            date: `${date}`,
            desc: `${desc}`,
          }),
        },
      );
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSave = async () => {
    await addTodo();
    props.navigation.navigate('AllTasks', {id, token});
  };

  return (
    <View style={styles.container}>
      <Header
        text="New Task"
        handleCancel={() => props.navigation.goBack()}
        handleDone={() => props.navigation.navigate('AllTasks')}
      />
      <Input text="Title" value={title} handleTitle={setTitle} />
      <DateInput text="Date" value={date} handleDate={setDate} />
      <MultilineInput text="Description" value={desc} handleDesc={setDesc} />
      <Button text="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

export default NewTask;
