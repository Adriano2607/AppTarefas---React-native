import { Text, TouchableOpacity } from "react-native";
import { Category } from "../types/Task";

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
      style={{ borderColor: naosei ? item.color : "#ccc" }}
      onPress={() => handleSelectCategory(item.value)}
    >
      <Text>{item.value}</Text>
    </TouchableOpacity>
  );
};
