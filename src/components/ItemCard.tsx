import { Alert, Text } from "react-native";
import { Task } from "../types/Task";
import { categories } from "../utils/data";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";
import React from "react";

interface Props {
  task: Task;
  handleRemoveTask: (id: string) => void;
  handleDoneTask: (id: string) => void;
}

const ItemCard = ({ task, handleRemoveTask, handleDoneTask }: Props) => {
  const category = categories.filter((c) => c.value === task.category);

  const handleDelete = () => {
    Alert.alert("Tarefas", "Confirmar Exclusao?", [
      { text: "Nao", style: "cancel" },
      { text: "sim", onPress: () => handleRemoveTask(task.id) },
    ]);
  };

  const LeftAction = () => {
    return (
      //colocar css
      <View>
        <MaterialIcons
          name="done"
          size={20}
          color="#fff"
          onPress={() => handleDoneTask(task.id)}
        />
      </View>
    );
  };

  const RightAction = () => {
    return (
      //colocar css
      <View>
        <MaterialIcons
          name="delete"
          size={20}
          color="#fff"
          onPress={() => handleDelete}
        />
      </View>
    );
  };

  return (
    <Swipeable renderLeftActions={LeftAction} renderRightActions={RightAction}>
      <View
        style={{
          borderStyle: "solid",
          height: "100%",
          borderLeftWidth: 6,
          borderColor: category[0].color,
          marginRight: 10,
        }}
      >
        <Text>{task.title}</Text>
      </View>
    </Swipeable>
  );
};


export default ItemCard