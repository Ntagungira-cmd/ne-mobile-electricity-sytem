import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import tw from 'tailwind-react-native-classnames';
import { API_URL, getConfig } from '../utils/api';
import axios from 'axios';
import Menu from '../components/Menu';

const RequestTokenScreen = () => {
  //form input states
  const [meter, setMeter] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);  //loading state with initial state set to false

  useEffect(() => {
  }, []);

  //handle input change
  const handleMeterChange = (value) => {
    setMeter(value);
  }

  const handlePriceChange = (value) => {
    setPrice(value);
  }

  
  // Handle token generation
  const handleProceed = async () => {
    if (!price || !meter) {
      Alert.alert('Error', 'Please provide meter and amount');
      return;
    }

    //validate if meter and price are numbers and have 6 digits
    if (isNaN(meter) || isNaN(price)) {
      Alert.alert('Error', 'Meter and price must be numbers');
      return;
    }
    if (meter.length!== 10 || price.length!== 6) {
      Alert.alert('Error', 'Meter and amount must be 10 and 6 digits respectively');
      return;
    }
    if(price<100){
      Alert.alert('Error', 'amount must be greater than 100');
      return;
    }

    if(price > 182500){
      Alert.alert('Error','amount is too much')
    }

  
    //const config = await getConfig();
  
    setLoading(true);
  
    const formData = new FormData();
  
    //append fields
    formData.append("meter", meter);
    formData.append('price', price);
    
    console.log(formData);
  
    const res = await axios
      .post(API_URL + "/generateToken", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

    setLoading(false);

    console.log(res);

  };
  

  // const handleProceed = async () => {
  //   // check if any of the field is empty
  //   if (!modelName || !price || !company || !owner || !year || !photo) {
  //     Alert.alert('Error', 'Please provide all fields and upload a photo');
  //     return;
  //   }

  //   const config = await getConfig(); // retrieving token

  //   setLoading(true);
  //   axios
  //     .post(
  //       API_URL + '/vehicle',
  //       {
  //         photo,
  //         manufactureCompany: company,
  //         manufactureYear: year,
  //         price,
  //         modelName,
  //         owner: "648c1f44eacf8653b61635e4",
  //       },
  //       config
  //     )
  //     .then((res) => {
  //       setLoading(false);
  //       if (res?.data?.message === 'Vehicle registered successfully') {
  //         setModelName('');
  //         setPrice('');
  //         setOwner('');
  //         setYear('');
  //         setCompany('');
  //         setPhoto(null);
  //         Alert.alert('Success', res?.data?.message);
  //       } else {
  //         Alert.alert('Error', res?.data?.message);
  //       }
  //     })
  //     .catch((err) => {
  //       setLoading(false);
  //       console.log(err, 'catch err');
  //       alert(
  //         err?.response?.data?.message === undefined ? 'Network Error' : err?.response?.data?.message
  //       );
  //     });
  // };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={false}
    >
      <ScrollView style={tw`flex-1`}>
        <View style={styles.content}>
          <View style={styles.minicontainer}>
            <Text style={styles.text}>App Title</Text>
            <View style={styles.microcontainer}>
              <Text style={styles.subtitles}>Generate Token</Text>
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
                placeholder="Price"
                keyBoardType="default"
                onChange={handlePriceChange}
              />  
          
              <CustomButton
                text={loading == true ? 'Generating Token ...' : 'Get Token'}
                onPress={handleProceed}
                bg="#3B82F6"
                color="white"
              />
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    width: '100%',
  },
  menuContainer: {
    width: '100%',
  },
  minicontainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 15,
  },
  microcontainer: {
    alignItems: 'center',
    paddingTop: 15,
  },
  text: {
    fontSize: 20,
    fontWeight: '900',
    marginTop: 45,
  },
  subtitles: {
    color: '#3B82D1',
    fontWeight: '800',
    fontSize: 18,
    marginBottom: 10,
  },
  form: {
    flex: 1,
    alignItems: 'center',
    width: '95%',
    padding: 20,
    paddingLeft: 10
  },
  previewImage: {
    width: 200,
    height: 200,
    marginVertical: 10,
    borderRadius: 10,
  },
});

export default RequestTokenScreen;
