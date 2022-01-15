import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Button from '../utils/Button';
import {Input, MultilineInput, DateInput} from '../utils/Input';
import Header from './utils/Header';
import HideKeyboard from '../utils/HideKeyboard';

const PrevTask = props => {
  const {todo, id, token} = props.route.params;
  const [title, setTitle] = useState(todo.title);
  const [date, setDate] = useState(todo.date);
  const [desc, setDesc] = useState(todo.desc);

  const deleteTodo = async () => {
    try {
      const res = await fetch(
        `https://todoapibypz.herokuapp.com/api/v1/users/${id}/todos/${todo._id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    await deleteTodo();
    props.navigation.navigate('PrevTasks', {id, token});
  };

  return (
    <HideKeyboard>
      <View style={styles.container}>
        <Header
          text="Edit Task"
          handleCancel={() => props.navigation.goBack()}
          handleDone={() => props.navigation.navigate('PrevTasks', {id, token})}
        />
        <Input text="Title" value={title} handleTitle={setTitle} disabled />
        <DateInput text="Date" value={date} handleDate={setDate} disabled />
        <MultilineInput
          text="Description"
          value={desc}
          handleDesc={setDesc}
          disabled
        />
        <Text style={styles.smallText}>Restore Task</Text>
        <Button text="Delete" onPress={handleDelete} />
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

export default PrevTask;
