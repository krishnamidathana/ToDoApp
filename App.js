import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

const App = () => {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);

  const addTask = () => {
    if (task.trim() === "") {
      Alert.alert("Error", "Please enter a valid task.");
      return;
    }
    setTaskList([...taskList, { id: Date.now().toString(), value: task }]);
    setTask("");
  };

  const deleteTask = (taskId) => {
    setTaskList((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId)
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>To-Do List</Text>

      <TextInput
        placeholder="Enter new task"
        style={styles.input}
        value={task}
        onChangeText={setTask}
      />

      <Button title="Add Task" onPress={addTask} />

      <FlatList
        data={taskList}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskText}>{item.value}</Text>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
    textAlign: "center",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ced4da",
    marginBottom: 20,
    padding: 10,
  },
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#dee2e6",
    backgroundColor: "#ffffff",
    marginBottom: 10,
    borderRadius: 5,
  },
  taskText: {
    fontSize: 18,
  },
  deleteButton: {
    color: "red",
    fontWeight: "bold",
  },
});

export default App;
