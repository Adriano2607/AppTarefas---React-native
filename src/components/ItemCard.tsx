import { Alert, Text } from "react-native";
import { Task } from "../types/Task";
import { categories } from "../utils/data";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";
import React, { useContext } from "react";
import { LightSpeedInRight, LightSpeedOutLeft } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { SlideInRight, SlideOutLeft } from 'react-native-reanimated';
import { useCustomFonts } from '../fonts/useCustomFonts';
import { TaskContext } from "../contexts/TaskContext";





interface Props {
  task: Task;
  handleRemoveTask: (id: number) => void;
  handleDoneTask: (id: number) => void;
}

const ItemCard = ({ task, handleRemoveTask, handleDoneTask }: Props) => {
  const category = categories.filter((c) => c.value === task.category);

  const { doneTask, removeTask, tasks } = useContext(TaskContext)

  const handleDelete = () => {
    Alert.alert("Tarefas", "Confirmar Exclusao?", [
      { text: "Nao", style: "cancel" },
      { text: "sim", onPress: () => removeTask(task.id) },
    ]);
  };

  const LeftAction = () => {

    const handleDoneTask = (id: number) => {
      doneTask(id)
    }

    if (task.category === "done" && task.completed !== 0) {
      return null;
    }
    if (task.category !== "done" && task.completed === 1) {
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
        <Animated.View
         entering={SlideInRight}
       
          style={{
            borderBottomWidth: 2,
            borderRightWidth: 5,
            borderColor: category[0].color,
            flex: 1,
            backgroundColor: "#3B3948",
            padding: 10,
            marginVertical: 10,
            borderRadius: 5,
            width:'95%',
            alignSelf:'center',
          }}
        >
              

          <Text style={{color:'white', fontFamily: 'LuckiestGuy_400Regular',}}>{task.title}</Text>
        </Animated.View>
      </Swipeable>
    </View>
  );
};

export default ItemCard;
