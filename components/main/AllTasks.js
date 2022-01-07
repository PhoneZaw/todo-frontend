import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Header from './utils/Header';
import AddTask from './utils/AddTask';
import Task from './utils/Task';

const AllTasks = ({navigation, route}) => {
  const {id, token} = route.params;
  const [todos, setTodos] = useState([]);

  const updateTodo = async todo => {
    try {
      const res = await fetch(
        `http://192.168.8.121:3000/api/v1/users/${id}/todos/${todo._id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: todo.title,
            desc: todo.desc,
            date: todo.date,
            completed: !todo.completed,
          }),
        },
      );
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getTasks = async () => {
    try {
      const res = await fetch(
        `http://192.168.8.121:3000/api/v1/users/${id}/todos`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await res.json();
      setTodos(data.data.todos.filter(todo => !todo.completed));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!id) {
      console.log('no id');
      return;
    }
    getTasks();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getTasks]);

  return (
    <View style={styles.container}>
      <Header text="Tasks" />
      <View style={styles.tabBar}>
        <Text style={[styles.barText, styles.barTextUnderline]}>All Task</Text>
        <View style={styles.verticalDivider} />
        <Text
          style={styles.barText}
          onPress={() => navigation.navigate('PrevTasks', {id, token})}>
          Prev Task
        </Text>
      </View>
      <View style={styles.itemContainer}>
        <AddTask onPress={() => navigation.navigate('NewTask', {id, token})} />

        {todos.map(todo => {
          return (
            <Task
              key={todo._id}
              desc={todo.desc}
              title={todo.title}
              date={todo.date}
              isChecked={todo.completed}
              onPressCircle={() => {
                updateTodo(todo);
              }}
              onPress={() =>
                navigation.navigate('EditTask', {
                  todo,
                  id,
                  token,
                })
              }
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  itemContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tabBar: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 30,
    marginVertical: 10,
  },
  barText: {
    fontSize: 25,
    color: '#11111190',
    height: '100%',
    paddingHorizontal: 10,
  },
  barTextUnderline: {
    color: '#111',
    borderBottomColor: '#f88124',
    borderBottomWidth: 1,
  },
  verticalDivider: {
    borderRightColor: '#111',
    borderRightWidth: 1,
    height: '80%',
    marginBottom: 10,
  },
});

export default AllTasks;