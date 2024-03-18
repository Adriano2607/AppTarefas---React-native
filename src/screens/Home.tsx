import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TextInput,
  Image,
} from "react-native";
import { Task } from "../types/Task";
import { v4 as uuid } from "uuid";
import DropDownPicker from "react-native-dropdown-picker";
import { categories } from "../utils/data";
import CategoryItem from "../components/CategoryItem";
import ItemCard from "../components/ItemCard";
import "react-native-get-random-values";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import React from "react";
import { colors } from "../Colors/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { UserContext } from "../contexts/UserContext";
import { Text } from "galio-framework";


const Home = () => {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState("");
  const [categoryValue, setCategoryValue] = useState(null);
  const [filteredTask, setFilteredTask] = useState<Task[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [open, setOpen] = useState(false);
  const { getUser, user } = useContext(UserContext);
 
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

  //console.log(filteredTask);

  useEffect(() => {
    getUser();
  }, []);




  return (
    <SafeAreaView style={{ backgroundColor: colors.cor2, flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 25,
          width: "95%",
          alignSelf: "center",
          alignItems: "center",
          padding: 10,
          borderRadius: 10,
          backgroundColor: colors.cor3,
          
        }}
      >
        <View>
          <Text h3 size={21} color="white">
            Bem-vindo de Volta,
          </Text>

          <Text h5 color="white" >
            {user.firstName + " " + user.lastName}
          </Text>
        </View>

        <Image style={{ height: 80, width: 80 }} source={{ uri: user.image }} />
      </View>
      <View style={styles.textinput}>
        <TextInput
          style={styles.input}
          onChangeText={setTaskInput}
          value={taskInput}
          placeholder='Vamos Comecar?'
          placeholderTextColor={colors.cor6}
      
          
        />
        <View
          style={{ flexDirection: "row", width: "85%", alignItems: "center" }}
        >
          <DropDownPicker
            open={open}
            value={categoryValue}
            items={categories.filter(
              (c) => c.value != "all" && c.value != "done"
            )}
            setOpen={setOpen}
            setValue={setCategoryValue}
            placeholder="Escolha uma categoria"
            theme="LIGHT"
            placeholderStyle={{
              color: colors.cor6,
              fontSize: 18,
              fontWeight: "800",
              
            }}
            listItemLabelStyle={{
              color: colors.cor3,
              fontSize: 18,
              paddingLeft: 15,
            }}
            dropDownContainerStyle={{
              backgroundColor: colors.cor6,
            }}
            selectedItemContainerStyle={{
              backgroundColor: colors.cor5,
            }}
            selectedItemLabelStyle={{
              fontWeight: "bold",
              fontSize: 18,
              color: colors.cor2,
            }}
            style={{
              backgroundColor: "transparent",
              borderColor: colors.cor6,
            }}
          />

          <TouchableOpacity
            onPress={handleAddTask}
            style={{ alignItems: "center", paddingLeft: 10 }}
          >
            <Ionicons name="add-circle-outline" size={50} color="green" />
          </TouchableOpacity>
        </View>
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

const styles = StyleSheet.create({
  textinput: {
    width: "95%",
    alignSelf: "center",
    gap: 15,
    marginBottom: 10,
  },input:{
    borderBottomWidth: 1,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 1,

    width: "100%",
    paddingLeft: 15,
    borderRadius: 4,
    height: 50,
    borderColor: colors.cor6,
    borderStyle: "solid",

    fontWeight: "800",
    fontSize: 17,
    color: colors.cor6,
  }
});

export default Home;
