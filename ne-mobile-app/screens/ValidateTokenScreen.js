import React,{useState} from 'react'
import { View, Text, StyleSheet, ScrollView, Alert, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'
import tw from 'tailwind-react-native-classnames';
import {API_URL} from '../utils/api';
import axios from 'axios';
import Menu from "../components/Menu";

const { height: viewportHeight } = Dimensions.get("window");

const ValidateTokenScreen = () => {
    const navigation = useNavigation();
    //form inputs handling
    const [token, setToken] = useState('');
    const [daysOfLighting, setDaysOfLighting] = useState('');
    const [loading, setLoading] = useState(false);
  
    const handleTokenChange = (text) => {
      setToken(text);
    };
  

    //on submit
    const handleSubmit = async ()=>{
      //check if all fields are entered
        if (!token) {
          Alert.alert('Validation Error', 'Please enter token.');
          return;
        }
    
        //change the loading state and make request to backend
        setLoading(true);
        try {
          const response = await axios.post(API_URL + "/tokens/validate", {
            token,
          });

          console.log(response.data.daysOfLighting);
          
          if (response.data) {
            //clear all textfields and change the loading state
            Alert.alert("Validation Success", "Token is valid");
            setToken('');
            setLoading(false);
            setDaysOfLighting(response.data.daysOfLighting);
          }

        } catch (error) {
          console.log(error,"catch error")
          setLoading(false);
          Alert.alert('token validation Failed', error?.message);
        }
    }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.text}>App Title</Text>
        <View style={styles.subcontainer}>
          <View style={styles.minicontainer}>
            <View style={styles.microcontainer}>
              <Text style={styles.subtitles}>Validate Token</Text>
            </View>
            <View style={styles.form}>
              <CustomInput
                value={token}
                placeholder="Your Token"
                icon="edit"
                keyBoardType="default"
                onChange={handleTokenChange}
              />
              <CustomButton
                text={loading ? "validating ..." : "Validate"}
                onPress={handleSubmit}
                bg="#3B82F6"
                color="white"
              />
              <View style={styles.minicontainer}>
                <Text>Days of daysOfLighting are : {daysOfLighting}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.menuContainer}>
          <Menu />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3B82F6",
    height: viewportHeight,
    paddingTop: 20,
  },
  menuContainer: {
    width: "100%",
  },

  subcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: "100%",
    height: 800,
    marginTop: 80,
    backgroundColor: "#ffff",
  },

  minicontainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 15,
  },

  microcontainer: {
    alignItems: "center",
  },

  text: {
    fontSize: 30,
    fontWeight: 900,
    color: "white",
    marginTop: 100,
  },

  span: {
    fontSize: 30,
    fontWeight: 900,
    color: "#fc9403",
  },

  subtitles: {
    color: "#3B82F6",
    fontWeight: 800,
    fontSize: 16,
    marginBottom: 10,
  },

  form: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    padding: 20,
  },

  linecontainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },

  linetext: {
    marginHorizontal: 10,
    fontSize: 16,
    color: "#ccc",
    fontSize: 20,
  },
});

export default ValidateTokenScreen;