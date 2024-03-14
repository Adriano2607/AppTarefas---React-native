import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Text } from "react-native";
import { Task } from "../types/Task";
import { View } from "react-native-reanimated/lib/typescript/Animated";
import { TextInput } from "react-native-gesture-handler";

const Home = () => {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState("");
  const [categoryValue, setCategoryValue] = useState(null);
  const [filteredTask, setFilteredTask] = useState<Task[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');



  const storeTaskAsync = async (value: Task[]) => {
    try {
      const jsonTasks = JSON.stringify(value);
      await AsyncStorage.setItem("@tasks", jsonTasks);
      console.log("Tarefas salvas com sucesso.");
    } catch (error) {
      console.error("Erro ao salvar tarefas:", error);
    }
  };

  const getTaskAsync = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@tasks");
      const tasks = jsonValue !== null ? JSON.parse(jsonValue) : [];
      return tasks;
    } catch (error) {
      console.error(error);
    }
  };

  const getData = async () => {
    try {
      const tasks = await getTaskAsync();
      return tasks;
    } catch (error) {
      console.error("Erro ao obter dados:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const tasks = await getData();
      setTaskList(tasks);
    };
    fetchData();
  }, []);

  const handleAddTask = async () => {
    if (!taskInput || !categoryValue) return;

    const clone = [...taskList];
    const task: Task = {
      id: (taskList.length + 1).toString(),
      title: taskInput,
      category: categoryValue,
      completed: false,
    };
    clone.push(task);

    await storeTaskAsync(clone);
    const updatedTasks = await getData();
    setTaskList(updatedTasks);

    setTaskInput("");
  
  };

  const handleRemoveTask = async (taskId: string) => {
    const updatedTasks = taskList.filter((task) => task.id !== taskId);

    await storeTaskAsync(updatedTasks);

    const updatedData = await getData();

    setTaskList(updatedData);
  };

  const handleDoneTask = async (id: string) => {
    const index = taskList.findIndex(i => i.id === id);
    if (index !== -1) {
      const clone = [...taskList];

      clone[index] = { ...clone[index], completed: true };
      storeTaskAsync(clone);
      const updatedData = await getData();
      setTaskList(updatedData);
    } else {
      console.error("deu ruim");
    }
  };

  const handleSelectedCategory = (type: string) => {
    setSelectedCategory(type);
  
    switch (type) {
      case 'all':
        setFilteredTask(taskList.filter(task => !task.completed));
        break;
      case 'done':
        setFilteredTask(taskList.filter(task => task.completed));
        break;
      default:
        setFilteredTask(taskList.filter(task => task.category === type));
        break;
    }
  };

  return(
    <View>
        <TextInput
        onChangeText={setTaskInput}
        value={taskInput}
        placeholder="INFORME A TAREFA"
        />

    </View>
  )
  
};

export default Home;
