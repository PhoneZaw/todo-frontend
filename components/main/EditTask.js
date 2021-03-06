import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Button from '../utils/Button';
import {Input, MultilineInput, DateInput} from '../utils/Input';
import Header from './utils/Header';
import HideKeyboard from '../utils/HideKeyboard';

const EditTask = props => {
  const {todo, id, token} = props.route.params;
  const [title, setTitle] = useState(todo.title);
  const [date, setDate] = useState(new Date(todo.date));
  const [desc, setDesc] = useState(todo.desc || '');

  const updateTodo = async () => {
    try {
      console.log(date);
      const res = await fetch(
        `https://todoapibypz.herokuapp.com/api/v1/users/${id}/todos/${todo._id}`,
        {
          method: 'PATCH',
          headers: {
            Accept: 'application/json',
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

  useEffect(() => {
    console.log(date);
  });

  const handleSave = async () => {
    await updateTodo();
    props.navigation.navigate('AllTasks', {id, token});
  };

  return (
    <HideKeyboard>
      <View style={styles.container}>
        <Header
          text="Edit Task"
          handleCancel={() => props.navigation.goBack()}
          handleDone={handleSave}
        />
        <Input text="Title" value={title} handleTitle={setTitle} />
        <DateInput text="Date" value={date} handleDate={setDate} />
        <MultilineInput text="Description" value={desc} handleDesc={setDesc} />
        <Text style={styles.smallText}>Make as done</Text>
        <Button text="Save" onPress={handleSave} />
      </View>
    </HideKeyboard>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  smallText: {
    fontSize: 15,
    color: '#f88124',
    width: '80%',
    textAlign: 'right',
  },
});

export default EditTask;
