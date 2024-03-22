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
import DropDownPicker from "react-native-dropdown-picker";
import { categories } from "../utils/data";
import CategoryItem from "../components/CategoryItem";
import ItemCard from "../components/ItemCard";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { colors } from "../Colors/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { UserContext } from "../contexts/UserContext";
import { Text } from "react-native";
import Animated from 'react-native-reanimated';
import {BounceInDown, FlipInYRight,FlipOutYRight } from "react-native-reanimated"
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { LuckiestGuy_400Regular } from '@expo-google-fonts/luckiest-guy';
import { dbExport as db} from "../utils/db";
import { TaskContext } from "../contexts/TaskContext";


const Home = () => {

  const { getTasks,
    getTasksByCategory,
    getCompletedTasks,
    removeTask,
    doneTask,
  tasks } = useContext(TaskContext);


  const [taskList, setTaskList] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { getUser, user } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [categoryValue, setCategoryValue] = useState(null);

  const handleGetTasks = () => {
    setTaskList(tasks)    
  }

  const handleGetTasksByCategory = (category: string) => {
    getTasksByCategory(category)
    setTaskList(tasks)
  }

  const handleDoneTask = (id: number) => {
    doneTask(id)
    setTaskList(tasks)
  }

  const handleRemoveTask = (id:number) => {
    removeTask(id);
    setTaskList(tasks)
  }

  const handleSelectCategory = (type: string) => {
    setSelectedCategory(type);
    switch (type) {
      case "all":
        handleGetTasks();
        break;
      case "done":
        getCompletedTasks();
        break;
      default:
        handleGetTasksByCategory(type);
    }
  };

  console.log(taskList)
  let [fontsLoaded, fontError] = useFonts({
    Inter_900Black,
    LuckiestGuy_400Regular
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
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
          <Text
          style={{color:"white", fontFamily: 'Inter_900Black',fontSize:17}}>Bem-vindo de Volta, </Text>

          <Text style={{color:"white", fontFamily: 'Inter_900Black',fontSize:19}}>
            {user.name}
          </Text>
        </View>

        <Image style={{ height: 80, width: 80 }} source={{ uri: user.image }} />
      </View>
     

      <View>
        <FlatList   
          style={{zIndex:998}}
          horizontal
          data={categories}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <CategoryItem
              handleSelectCategory={handleSelectCategory}
              item={item}
              selectedCategory={selectedCategory}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
              
        />
      </View>

      <Animated.FlatList
      entering={FlipInYRight} 
       exiting={FlipOutYRight}
        data={taskList }
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
  }, input: {
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
