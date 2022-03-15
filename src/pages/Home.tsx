import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {

    const newTaskTitleExist = tasks.find(task => task.title === newTaskTitle);

    if (newTaskTitleExist) {
      console.log(newTaskTitleExist, 'já existe');
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome",
        [
          {
            text: "Ok",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
        ]
      );
      return
    }

    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }
    setTasks([...tasks, data])
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = [...tasks]
    const findItem = updatedTasks.find(item=> item.id === id)

    if (!findItem) return

    findItem.done = !findItem.done
    setTasks(updatedTasks)
  }
  function handleEditTask(id:number, taskNewTitle:string ){
    const updatedTasks = [...tasks]
    const findItem = updatedTasks.find(item=> item.id === id)

    if (!findItem) return

    findItem.title = taskNewTitle
    setTasks(updatedTasks)
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          onPress: () => {return},
          style: "cancel"
        },
        { text: "Sim", onPress: () => [setTasks(onldState => onldState.filter(tasks=> tasks.id !== id))]}
      ]
    );
    
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})