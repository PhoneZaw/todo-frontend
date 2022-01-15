import React, {useState, useEffect} from 'react';
import {RefreshControl, View, Text, StyleSheet, ScrollView} from 'react-native';
import Header from './utils/Header';
import AddTask from './utils/AddTask';
import Task from './utils/Task';
import {AbortController} from 'native-abort-controller';

const AllTasks = ({navigation, route}) => {
  const {id, token} = route.params;
  const [todos, setTodos] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await getTasks();
    setRefreshing(false);
  };

  const abortCont = new AbortController();

  const updateTodo = async todo => {
    try {
      const res = await fetch(
        `https://todoapibypz.herokuapp.com/api/v1/users/${id}/todos/${todo._id}`,
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
          signal: abortCont.signal,
        },
      );
      const data = await res.json();
      console.log(data);
      getTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const getTasks = async () => {
    try {
      const res = await fetch(
        `https://todoapibypz.herokuapp.com/api/v1/users/${id}/todos`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
          signal: abortCont.signal,
        },
      );
      const data = await res.json();
      console.log(data);
      setTodos(data.data.todos.filter(todo => !todo.completed));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      abortCont.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos]);

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
      <ScrollView
        style={styles.scroll}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.itemContainer}>
          <AddTask
            onPress={() => navigation.navigate('NewTask', {id, token})}
          />
          {todos ? (
            todos.map(todo => {
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
            })
          ) : (
            <Text> Loading </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  scroll: {
    width: '100%',
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
