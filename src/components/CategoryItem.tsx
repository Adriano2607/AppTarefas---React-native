import { Text, TouchableOpacity } from "react-native";
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
      style={{ borderColor: naosei ? item.color : "#ccc" , borderWidth: 2}}
      onPress={() => handleSelectCategory(item.value)}
    >
      <Text>{item.value}</Text>
    </TouchableOpacity>
  );
};

export default CategoryItem