import { Text, TouchableOpacity,StyleSheet } from "react-native";
import { Category } from "../types/Task";
import React from "react";

interface Props {
  item: Category;
  handleSelectCategory: (category: string) => void;
  selectedCategory: string;
}

const CategoryItem = ({
  item,
  handleSelectCategory,
  selectedCategory,
}: Props) => {
  const naosei = selectedCategory === item.value;

  return (
    <TouchableOpacity
      onPress={() => handleSelectCategory(item.value)}
    >
      <Text style={[styles.container, { borderColor: naosei ? item.color : "#ccc", borderWidth: 1 }]}>{item.value.toLocaleUpperCase()}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container:{
 
  height:30,
 paddingHorizontal: 25,

  marginVertical:15,
  }

})

export default CategoryItem