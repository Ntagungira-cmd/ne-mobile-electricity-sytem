import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, Image, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import tw from "tailwind-react-native-classnames";
import { API_URL, getConfig } from "../utils/api";
import axios from "axios";
import Menu from "../components/Menu";
import { useNavigation } from "@react-navigation/native";

const RequestTokenScreen = () => {
  const navigation = useNavigation();
  //form input states
  const [token, setToken] = useState("");
  const [meter, setMeter] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false); //loading state with initial state set to false


  //handle input change
  const handleMeterChange = (value) => {
    setMeter(value);
  };

  const handlePriceChange = (value) => {
    setPrice(value);
  };

  // Handle token generation
  const handleProceed = async () => {
    if (!price || !meter) {
      Alert.alert("Error", "Please provide meter and amount");
      return;
    }

    //validate if meter and price are numbers and have 6 digits
    if (isNaN(meter) || isNaN(price)) {
      Alert.alert("Error", "Meter and price must be numbers");
      return;
    }
    if (price.length > 6 || price.length < 3) {
      Alert.alert("Error", "amount must be between 3 and 6 digits");
      return;
    }
    if (meter.length !== 6) {
      Alert.alert("Error", "Meter must be 6 digits");
      return;
    }
    if (price < 100) {
      Alert.alert("Error", "amount must be greater than 100");
      return;
    }

    if (price > 182500) {
      Alert.alert("Error", "amount is too much");
    }

    //const config = await getConfig();

    setLoading(true);
    try {
      const formData ={
        meter,
        price,
      };

      console.log(formData);

      const res = await axios.post(API_URL + "/generateToken", JSON.stringify(formData), {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setLoading(false);

    if(res.data){
          Alert.alert("Success", "Token generated successfully");
          setMeter("");
          setPrice("");
          setToken(res.data);
    }
    } catch (error) {
      console.error("Error generating token:", error.response.data);
      Alert.alert("Error", "Failed to generate token. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={false}
    >
      <ScrollView style={tw`flex-1`}>
        <View style={styles.content}>
          <View style={styles.minicontainer}>
            <View style={styles.microcontainer}>
              <Text style={styles.subtitles}>EUCL</Text>
            </View>
            <View style={styles.form}>
              <CustomInput
                value={meter}
                placeholder="meter number"
                keyBoardType="default"
                onChange={handleMeterChange}
              />
              <CustomInput
                value={price}
                placeholder="amount"
                keyBoardType="numeric"
                onChange={handlePriceChange}
              />

              <CustomButton
                text={loading == true ? "Generating Token ..." : "Get Token"}
                onPress={handleProceed}
                bg="red"
                color="white"
              />
            </View>
            <View style={styles.minicontainer}>
              <Text style={tw`text-lg text-gray-700`}>
                Token : {token.token}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.menuContainer}>
        <Menu />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    flex: 1,
    width: "100%",
  },
  menuContainer: {
    width: "100%",
  },
  minicontainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 15,
  },
  microcontainer: {
    alignItems: "center",
    paddingTop: 15,
  },
  text: {
    fontSize: 20,
    fontWeight: "900",
    marginTop: 45,
  },
  subtitles: {
    color: "red",
    fontWeight: "800",
    fontSize: 18,
    marginBottom: 10,
  },
  form: {
    flex: 1,
    alignItems: "center",
    width: "95%",
    padding: 20,
    paddingLeft: 10,
  },
  previewImage: {
    width: 200,
    height: 200,
    marginVertical: 10,
    borderRadius: 10,
  },
});

export default RequestTokenScreen;
