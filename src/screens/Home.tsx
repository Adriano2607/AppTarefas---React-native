import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View, ViewComponent } from "react-native";
import { Task } from "../types/Task";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { v4 as uuid } from "uuid";
import DropDownPicker from "react-native-dropdown-picker";
import { categories } from "../utils/data";
import CategoryItem from "../components/CategoryItem";
import ItemCard from "../components/ItemCard";

import React from "react";
import { Button } from "galio-framework";

const Home = () => {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState("");
  const [categoryValue, setCategoryValue] = useState(null);
  const [filteredTask, setFilteredTask] = useState<Task[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await getData();
    };
    fetchData();
  }, []);

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
      setTaskList(tasks);
    } catch (error) {
      console.error(error);
    }
  };

  const getData = async () => {
    try {
      await getTaskAsync();
    } catch (error) {
      console.error("Erro ao obter dados:", error);
    }
  };

  const handleAddTask = async () => {
    if (!taskInput || !categoryValue) return;

    const clone = taskList ? [...taskList] : [];

    const task: Task = {
      id: "1",
      title: taskInput,
      category: categoryValue,
      completed: false,
    };

    clone.push(task);

    await storeTaskAsync(clone);
    const updatedTasks = await getData();
    setTaskList(updatedTasks);

    setTaskInput("");
    getData();
  };

  const handleRemoveTask = async (taskId: string) => {
    const updatedTasks = taskList.filter((task) => task.id !== taskId);

    await storeTaskAsync(updatedTasks);

    const updatedData = await getData();

    setTaskList(updatedData);
  };

  const handleDoneTask = async (id: string) => {
    const index = taskList.findIndex((i) => i.id === id);
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
      case "all":
        setFilteredTask(taskList.filter((task) => !task.completed));
        break;
      case "done":
        setFilteredTask(taskList.filter((task) => task.completed));
        break;
      default:
        setFilteredTask(taskList.filter((task) => task.category === type));
        break;
    }
  };

  console.log(filteredTask);

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <TextInput
        style={{
          borderBottomWidth: 1,
          padding: 5,
          marginBottom: 25,
          width: "80%",
        }}
        onChangeText={setTaskInput}
        value={taskInput}
        placeholder="INFORME A TAREFA"
      />
      <View
        style={{
          flexDirection: "row",
          width: "60%",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
        }}
      >
        <View>
          <DropDownPicker
            open={open}
            value={categoryValue}
            items={categories.filter(
              (c) => c.value != "all" && c.value != "done"
            )}
            setOpen={setOpen}
            setValue={setCategoryValue}
            placeholder="Escolha uma categoria"
            theme="DARK"
            placeholderStyle={{
              color: "#ccc",
              fontSize: 12,
            }}
            listItemLabelStyle={{
              color: "#fff",
              fontSize: 16,
              paddingLeft: 15,
            }}
            dropDownContainerStyle={{
              backgroundColor: "#11212D",
            }}
            selectedItemContainerStyle={{
              backgroundColor: "#1c2541",
            }}
            selectedItemLabelStyle={{
              fontWeight: "bold",
              fontSize: 16,
              color: "#fff",
            }}
          />
        </View>

        <View>
          <Button
            onlyIcon
            icon="create"
            iconFamily="Ionicons"
            iconSize={30}
            color="black"
            iconColor="#fff"
            style={{ width: 40, height: 40 }}
            onPress={handleAddTask}
           
          >
           
          </Button>
        </View>
      </View>

      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <CategoryItem
            handleSelectCategory={handleSelectedCategory}
            item={item}
            selectedCategory={selectedCategory}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      <FlatList
        data={filteredTask}
        renderItem={({ item }) => (
          <ItemCard
            handleDoneTask={handleDoneTask}
            handleRemoveTask={handleRemoveTask}
            task={item}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default Home;
