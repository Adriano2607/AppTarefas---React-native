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
import * as SQLite from "expo-sqlite"
import Animated from 'react-native-reanimated';
import {BounceInDown, FlipInYRight,FlipOutYRight } from "react-native-reanimated"
import { Feather } from '@expo/vector-icons';




const Home = () => {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState("");
  const [categoryValue, setCategoryValue] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [open, setOpen] = useState(false);
  const { getUser, user } = useContext(UserContext);

 
  const openDatabase = () => {
    const db = SQLite.openDatabase("db.db");
    return db;
  };

  const db = openDatabase();

  
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists tasks (id integer primary key not null, completed int, title text, category text);"
      );
    });
    getTasks();
  }, []);
  

  const getTasks = async () => {
    db.transaction((tx) => {
      tx.executeSql(
        `select * from tasks where completed = 0;`,
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
        `select * from tasks where completed = 0 and category = ?;`,
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
        `select * from tasks where completed = 1;`,
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
          "insert into tasks (completed, title, category) values (0, ?, ?)",
          [taskInput, categoryValue]
        );
        tx.executeSql(
          `select * from tasks where completed = 0;`,
          [],
          (_, { rows: { _array } }) => {
            setTaskList(_array);
          }
        );
      });
    }

    setTaskInput("");
    setCategoryValue(null);
  };

  const handleRemoveTask = (id: number) => {
    db.transaction((tx) => {
      tx.executeSql("delete from tasks where id = ?", [id]);
      tx.executeSql(
        `select * from tasks where completed = 0;`,
        [],
        (_, { rows: { _array } }) => {
          setTaskList(_array);
        }
      );
    });
  };

  const handleDoneTask = (id: number) => {
    db.transaction((tx) => {
      tx.executeSql("update tasks set completed = ? where id = ? ", [1, id]);
      tx.executeSql(
        `select * from tasks where completed = 0;`,
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
              color: colors.cor6,
            }}
            labelStyle={{ 
              color: colors.cor6, 
              fontSize:18,
              fontWeight: "800",
            }}
            style={{
              backgroundColor: "transparent",
              borderColor: colors.cor6,
      
            }}  ArrowDownIconComponent={() => (
              <Feather name="arrow-down-circle" size={24} color="white" />
            )}
            ArrowUpIconComponent={() => (
              <Feather name="arrow-up-circle" size={24} color="white" />
            )}zIndex={999}
          
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
