import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Image, TouchableOpacity, View, Text, StyleSheet, TextInput } from 'react-native';
import  Icon  from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit/editIcon.png'
export interface Task {
    id: number;
    title: string;
    done: boolean;
  }
interface  TaskItemProps{
    task:Task;
    toggleTaskDone:(id: number) =>void;
    removeTask: (id: number) => void;
    editTask: (id:number, taskNewTitle:string) => void;
}

export function TaskItem({task, editTask, toggleTaskDone, removeTask}:TaskItemProps){
    const [editing, setEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);
    const textInputRef = useRef<TextInput>(null)

    function handleStartEditing(){
        setEditing(true)
    }

    function handleCancelEditing(){
        setEditTitle(task.title)
        setEditing(false)
    }

    function handleSubmitEditing(){
        editTask(task.id, editTitle)
        setEditing(false)
    }
useEffect(() => {
    if (textInputRef.current) {
      if (editing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [editing])

    return(
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <TouchableOpacity
            testID={`button-${task.id}`}
            activeOpacity={0.7}
            style={styles.taskButton}
            onPress={()=> toggleTaskDone(task.id)}
            disabled={editing}
          >
            <View 
              testID={`marker-${task.id}`}
              style={task.done ? styles.taskMarkerDone :styles.taskMarker }
            >
              { task.done && (
                <Icon 
                  name="check"
                  size={12}
                  color="#FFF"
                />
              )}
            </View>

            <TextInput
            value={editTitle}
            onChangeText={setEditTitle}
            editable={editing}
            onSubmitEditing={handleSubmitEditing}
            style={task.done? styles.taskTextDone : styles.taskText}
            ref={textInputRef}
            />
          </TouchableOpacity>
      </View>
      <View style={styles.iconsContainer}>
        {
          editing? (
            <TouchableOpacity
                  testID={`trash-${task.id}`}
                  onPress={handleCancelEditing}
                >
                <Icon name="x" size={24} color="#b2b2b2" /> 
            </TouchableOpacity>
          ):
          (
            <TouchableOpacity
              testID={`trash-${task.id}`}
              onPress={handleStartEditing}
            >
              <Image source={editIcon} />
            </TouchableOpacity>
          )
        }
        <View style={styles.iconsDivider} />
          <TouchableOpacity
          testID={`trash-${task.id}`}
          onPress={()=> removeTask(task.id)}
          disabled={editing}
          >
          <Image source={trashIcon} style={{opacity:editing? 0.4 : 1}} />
        </TouchableOpacity>
      </View>
    </View>
        
    )
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between'
    },
    infoContainer:{
      flex: 1,
    },
    iconsContainer:{
      flexDirection:'row',
      alignItems:'center',
      paddingLeft:12,
      paddingRight:24,

    },
    iconsDivider:{
      width: 1,
      height: 24,
      backgroundColor: ' rgba(196, 196, 196, 0.24)',
      marginHorizontal: 12,
    },
    taskButton: {
      flex: 1,
      paddingHorizontal: 24,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    taskMarker: {
      height: 16,
      width: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#B2B2B2',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskText: {
      color: '#666',
      fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
      height: 16,
      width: 30,
      borderRadius: 4,
      backgroundColor: '#1DB863',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'

    },
    taskTextDone: {
      color: '#1DB863',
      width: 30,
      textDecorationLine: 'line-through',
      fontFamily: 'Inter-Medium'
    }
})