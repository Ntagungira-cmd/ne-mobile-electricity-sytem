import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import Menu from "../components/Menu";
import { API_URL} from "../utils/api";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import axios from "axios";
import NearbyImage from "../assets/image.png";

const HomeScreen = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [meter, setMeter] = useState("");
  const handleMeterChange = (value)=>{
    setMeter(value)
  }

  //fetch data on component mount
  useEffect(() => {
    fetchData();
  }, [meter]);

  const fetchData = async () => {
      try {
          const response = await axios.get(
            `${API_URL}/tokens/${meter}`
          );
          setData(response?.data?.tokens);
      } catch (error) {
          console.log(error);
      }
  };
  return (
    <SafeAreaView style={tw`flex-1`}>
      <View style={styles.minicontainer}>
        <CustomInput
          value={meter}
          placeholder="Meter No"
          icon="edit"
          keyBoardType="default"
          onChange={handleMeterChange}
        />
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({
          item: {
            token,
            tokenStatus,
            tokenValueDays,
            amount
          },
        }) => (
          <TouchableOpacity
            style={[
              tw`flex-row items-center px-3 py-2 mt-4 rounded-xl mx-8`,
              { backgroundColor: "#F8F8FB" },
            ]}
          >
            <View>
              <Text style={tw`font-semibold`}>Token: {token}</Text>
              <Text>
                <Text style={tw`text-xs text-gray-400`}>{tokenStatus}</Text>
              </Text>
              <Text style={tw`text-gray-500`}>{amount} Rwf</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <Menu />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  minicontainer: {
    flex: 1,
    marginTop: 70,
    alignItems: "center",
    paddingTop: 15,
  },
});

export default HomeScreen;
