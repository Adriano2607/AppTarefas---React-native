import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, TextInput, Text } from "react-native";
import { Task } from "../types/Task";
import { v4 as uuid } from "uuid";
import DropDownPicker from "react-native-dropdown-picker";
import { categories } from "../utils/data";
import CategoryItem from "../components/CategoryItem";
import ItemCard from "../components/ItemCard";
import "react-native-get-random-values";
import { SafeAreaView } from "react-native-safe-area-context";

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
      setTaskList(value);
      setFilteredTask(value);
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
      setFilteredTask(tasks);
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
      id: uuid(),
      title: taskInput,
      category: categoryValue,
      completed: false,
    };

    clone.push(task);

    await storeTaskAsync(clone);
    await getData();

    setTaskInput("");
    getData();
  };

  const remove = async () => {
    await AsyncStorage.removeItem("@tasks");
  };

  const handleRemoveTask = async (taskId: string) => {
    const updatedTasks = taskList.filter((task) => task.id !== taskId);

    await storeTaskAsync(updatedTasks);

    await getData();
  };

  const handleDoneTask = async (id: string) => {
    const index = taskList.findIndex((i) => i.id === id);
    if (index !== -1) {
      const clone = [...taskList];

      clone[index] = { ...clone[index], completed: true };
      storeTaskAsync(clone);
      await getData();
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
    <SafeAreaView style={{ backgroundColor: "#252525", height: "100%",flex:1 }}>
      <View>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',  marginBottom:20}}>
        <TextInput
          style={{
            borderWidth:1,
            borderColor:'#FAF8FF',
            width: "82%",
            padding:8,
            borderRadius:5,
            color: '#FAF8FF' 
          }}
          
          onChangeText={setTaskInput}
          value={taskInput}
          placeholder="INFORME A TAREFA"
          placeholderTextColor="#FAF8FF" 
        

        />

        <Button
          onlyIcon
          icon="create"
          iconFamily="Ionicons"
          iconSize={30}
          color="black"
          iconColor="#fff"
          style={{ width: 40, height: 40 }}
          onPress={handleAddTask}
        ></Button>
        </View>
       

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
            color: "#FAF8FF",
            fontSize: 12,
          }}
          listItemLabelStyle={{
            color: "#FAF8FF",
            fontSize: 16,
            paddingLeft: 15,
          }}
          dropDownContainerStyle={{
            backgroundColor: "#252525",
             
          }}
          selectedItemContainerStyle={{
            backgroundColor: "#8685EF",
          }}
          selectedItemLabelStyle={{
            fontWeight: "bold",
            fontSize: 16,
            color: "#FAF8FF",
          }}
        />

       
      </View>

      <View>
        <FlatList
          horizontal
          data={categories}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <CategoryItem
              handleSelectCategory={handleSelectedCategory}
              item={item}
              selectedCategory={selectedCategory}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>

      <FlatList
        data={filteredTask}
        renderItem={({ item }) => {
          if (selectedCategory === "done" && !item.completed) {
            return null;
          }
          if (selectedCategory !== "done" && item.completed) {
            return null;
          }
          return (
            <ItemCard
              handleDoneTask={handleDoneTask}
              handleRemoveTask={handleRemoveTask}
              task={item}
            />
          );
        }}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};



export default Home;
