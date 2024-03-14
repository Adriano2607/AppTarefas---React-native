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
    style={[styles.container, { borderColor: naosei ? item.color : "#ccc", borderWidth: 1 }]}
      
      onPress={() => handleSelectCategory(item.value)}
    >
      <Text style={{ textTransform:'capitalize'}}>{item.value}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container:{
    padding:10,
    marginBottom:5,
   
  }

})

export default CategoryItem