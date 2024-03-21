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


const Home = () => {


  const [taskList, setTaskList] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { getUser, user } = useContext(UserContext);
  const [open, setOpen] = useState(false);
    const [categoryValue, setCategoryValue] = useState(null);

  const getTasks = async () => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM tasks WHERE completed = 0;`,
        [],
        (_, { rows: { _array } }) => {
          setTaskList(_array);
        }
      );
    });
  };

  const getTasksByCategory = (category: string) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM tasks WHERE completed = 0 AND category = ?;`,
        [category],
        (_, { rows: { _array } }) => {
          setTaskList(_array);
        }
      );
    });
  };

  const getCompletedTasks = () => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM tasks WHERE completed = 1;`,
        [],
        (_, { rows: { _array } }) => {
          setTaskList(_array);
        }
      );
    });
  };

  const handleAddTask = async () => {
    if (taskInput !== "" && categoryValue) {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO tasks (completed, title, category) VALUES (0, ?, ?);",
          [taskInput, categoryValue]
        );
        tx.executeSql(
          `SELECT * FROM tasks WHERE completed = 0;`,
          [],
          (_, { rows: { _array } }) => {
            setTaskList(_array);
          }
        );
      });
    }

    setTaskInput("");
    //setCategoryValue(null);
  };

  const handleRemoveTask = (id: number) => {
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM tasks WHERE id = ?;", id);
      tx.executeSql(
        `SELECT * FROM tasks WHERE completed = 0;`,
        [],
        (_, { rows: { _array } }) => {
          setTaskList(_array);
        }
      );
    });
  };

  const handleDoneTask = (id: number) => {
    db.transaction((tx) => {
      tx.executeSql("UPDATE tasks SET completed = ? WHERE id = ? ;", [1, id]);
      tx.executeSql(
        `SELECT * FROM tasks WHERE completed = 0;`,
        [],
        (_, { rows: { _array } }) => {
          setTaskList(_array);
        }
      );
    });
  };

  const handleSelectCategory = (type: string) => {
    setSelectedCategory(type);
    switch (type) {
      case "all":
        getTasks();
        break;
      case "done":
        getCompletedTasks();
        break;
      default:
        getTasksByCategory(type);
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
