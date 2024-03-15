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
          size={50}
          color={category[0].color}
          onPress={() =>{
            handleDoneTask(task.id)
           
          }}
            
           
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
          size={50}
          color={category[0].color}
          onPress={handleDelete}
        />
      </View>
    );
  };

  return (
    <Swipeable renderLeftActions={LeftAction} renderRightActions={RightAction} >
      <View
        style={{
          borderBottomWidth:2,
          borderRightWidth:5,
          borderColor: category[0].color,
          flex: 1,
          backgroundColor:'#3B3948',
          padding:10,
          marginVertical:10,
          borderRadius:5,
          
          height:40
        
        }}
      >
        <Text style={{color:'#FAF8FF'}}>{task.title}</Text>
      </View>
    </Swipeable>
  );
};


export default ItemCard