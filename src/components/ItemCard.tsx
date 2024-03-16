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

    if (task.category === "done" && !task.completed) {
      return null;
    }
    if (task.category !== "done" && task.completed) {
      return null;
    }
    return (
      <View style={{justifyContent:'center'}}>
        <MaterialIcons
        style={{marginRight:35}}
          name="done"
          size={35}
          color={category[0].color}
          onPress={() => {
            handleDoneTask(task.id);
          }}
        />
      </View>
    );
  };

  const RightAction = () => {
    return (
      //colocar css
      <View style={{justifyContent:'center'}}>
        <MaterialIcons
          style={{marginLeft:35}}
          name="delete"
          size={35}
          color={category[0].color}
          onPress={handleDelete}
        />
      </View>
    );
  };

  return (
    <View style={{justifyContent:'center',flex:1}}>
      <Swipeable
        renderLeftActions={LeftAction}
        renderRightActions={RightAction}
      >
        <View
          style={{
            borderBottomWidth: 2,
            borderRightWidth: 5,
            borderColor: category[0].color,
            flex: 1,
            backgroundColor: "#3B3948",
            padding: 10,
            marginVertical: 10,
            borderRadius: 5,

          }}
        >
          <Text style={{ color: "#FAF8FF" }}>{task.title}</Text>
        </View>
      </Swipeable>
    </View>
  );
};

export default ItemCard;
