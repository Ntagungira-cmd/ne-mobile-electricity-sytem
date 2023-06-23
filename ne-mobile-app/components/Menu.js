import React from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";

const Menu = () => {
  const navigation = useNavigation();
  return (
    <View
      style={tw`w-full bg-red-500 flex-row justify-around items-center h-16 mt-2`}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={tw`flex items-center justify-center`}
      >
        <Icon name="home" size={26} style={tw`text-white`} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("ValidateToken")}
        style={tw`flex items-center justify-center`}
      >
        <Icon name="edit" size={22} style={tw`text-white`} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("GenerateToken")}
        style={tw`flex items-center justify-center`}
      >
        <Icon name="history" size={24} style={tw`text-white`} />
      </TouchableOpacity>
      <View>

      </View>
    </View>
  );
};

export default Menu;
