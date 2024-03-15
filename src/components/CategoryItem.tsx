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
  const naosei = selectedCategory === item.value;

  return (
    <TouchableOpacity onPress={() => handleSelectCategory(item.value)}>
      <Text
        style={[
          styles.container,
          {
            borderColor: naosei ? item.color : "#FAF8FF",
            borderRightWidth: 0.5,
            backgroundColor: naosei ? item.color : "transparent",
            color: "white",
            textAlign: "center",
          },
        ]}
      >
        {item.value.toLocaleUpperCase()}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 25,
    width: 120,
  },
});

export default CategoryItem;
