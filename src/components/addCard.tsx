import React, { useContext, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { categories } from "../utils/data";
import { colors } from "../Colors/colors";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TaskContext } from "../contexts/TaskContext";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
import { LuckiestGuy_400Regular } from "@expo-google-fonts/luckiest-guy";

const CreateTask = () => {
  const [open, setOpen] = useState(false);
  const [categoryValue, setCategoryValue] = useState(null);
  const [taskInput, setTaskInput] = useState("");
  const { addTask } = useContext(TaskContext);

  const handleAddTask = async () => {
    addTask(taskInput, categoryValue);
    setTaskInput("");
    setCategoryValue(null);
  };

  let [fontsLoaded, fontError] = useFonts({
    Inter_900Black,
    LuckiestGuy_400Regular,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", backgroundColor: colors.cor2 }}
    >
      <TextInput
        style={styles.input}
        onChangeText={setTaskInput}
        value={taskInput}
        placeholder="Vamos Comecar?"
        placeholderTextColor={colors.cor6}
      />

     
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
            color: colors.cor6,
            fontSize: 18,
            fontWeight: "800",
            fontFamily: "LuckiestGuy_400Regular",
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
            fontSize: 18,
            fontWeight: "800",
          }}
          style={{
            backgroundColor: "transparent",
            borderColor: colors.cor6,
            marginBottom:25
          }}
          textStyle={{
            fontSize: 18,
            fontFamily: "LuckiestGuy_400Regular",
            color: "black",
          }}
          ArrowDownIconComponent={() => (
            <Feather name="arrow-down-circle" size={24} color="white" />
          )}
          ArrowUpIconComponent={() => (
            <Feather name="arrow-up-circle" size={24} color="white" />
          )}
          zIndex={999}
        />

        <TouchableOpacity
          onPress={() => handleAddTask()}
          style={{ alignItems: "center", paddingLeft: 10 }}
        >
          {/* <Ionicons name="add-circle-outline" size={50} color="green" /> */}
          <Text style={{color:'white',fontSize:50}}>Vai</Text>
        </TouchableOpacity>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textinput: {
    width: "95%",
    alignSelf: "center",
    gap: 15,
    marginBottom: 10,
  },
  input: {
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
    marginBottom:15
  },
});

export default CreateTask;
