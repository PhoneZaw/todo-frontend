import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Button from '../utils/Button';
import {Input, MultilineInput, DateInput} from '../utils/Input';
import Header from './utils/Header';

const PrevTask = props => {
  const {todo, id, token} = props.route.params;
  const [title, setTitle] = useState(todo.title);
  const [date, setDate] = useState(todo.date);
  const [desc, setDesc] = useState(todo.desc);

  const deleteTodo = async () => {
    try {
      const res = await fetch(
        `http://192.168.8.121:3000/api/v1/users/${id}/todos/${todo._id}`,
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

// import React, {useState} from 'react';
// import {View, Text, StyleSheet} from 'react-native';
// import Button from '../utils/Button';
// import {Input, MultilineInput, DateInput} from '../utils/Input';
// import Header from './utils/Header';

// const PrevTask = props => {
//   const [title, setTitle] = useState(props.title);
//   const [date, setDate] = useState(props.date);
//   const [desc, setDesc] = useState(props.desc);

//   return (
//     <View style={styles.container}>
//       <Header
//         text="Prev Task"
//         handleCancel={() => props.navigation.goBack()}
//         handleDone={() => props.navigation.navigate('AllTasks')}
//       />
//       <Input text="Title" value={title} handleTitle={setTitle} />
//       <DateInput text="Date" value={date} handleDate={setDate} />
//       <MultilineInput text="Description" value={desc} handleDesc={setDesc} />
//       <Text style={styles.smallText}>Restore Task</Text>
//       <Button text="Save" />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   smallText: {
//     fontSize: 15,
//     color: '#f88124',
//     width: '80%',
//     textAlign: 'right',
//   },
// });

// export default PrevTask;
