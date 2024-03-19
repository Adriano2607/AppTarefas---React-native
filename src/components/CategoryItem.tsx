import { Text, TouchableOpacity, StyleSheet } from "react-native";
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
  const selecionado = selectedCategory === item.value;

  return (
    <TouchableOpacity onPress={() => handleSelectCategory(item.value)}>
      <Text
        style={{
          padding: 15,
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 25,
          width: 120,
          borderColor: selecionado ? item.color : "transparent",
          borderWidth: selecionado ? 1 : 0,
          color: selecionado ? item.color : "white",
          textAlign: "center",
          borderRadius: 10,
        }}
      >
        {item.value.toLocaleUpperCase()}
      </Text>
    </TouchableOpacity>
  );
};


export default CategoryItem;
