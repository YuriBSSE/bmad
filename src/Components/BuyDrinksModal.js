import Modal from 'react-native-modal';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {CardField, useStripe} from '@stripe/stripe-react-native';
import AppText from '../Components/AppText';
import LottieView from 'lottie-react-native';
import {themeRed} from '../Assets/Colors/Colors';
import TextFieldCard from '../Components/TextFieldCard';

const {width, height} = Dimensions.get('window');

const BuyDrinksModal = ({
  setIsModalVisible,

  drinks,setDrinks,
  isModalVisible,
  setIsStripeModalVisible,
}) => {
  return (
    <Modal isVisible={isModalVisible}>
      <View style={styles.container}>
        <AppText
          nol={2}
          textAlign="center"
          family="Poppins-SemiBold"
          size={height * 0.026}
          color="white"
          Label={'How many drinks you want to buy?'}
        />
        {/* <TextFieldCard
          placeholder="No. of Drinks"
          value={drinks}
          onchange={setDrinks}
          keyboardType="numeric"
          secureTextEntry={false}
          placeholderTextColor="black"
          customStyle={{
            backgroundColor: 'white',
            width: width * 0.6,
            marginVertical: height * 0.02,
            fontFamily: 'Poppins-Bold',
            fontSize: width * 0.045,
          }}
        /> */}
        <TextInput
          keyboardType={'numeric'}
          placeholder={'No. of Drinks'}
          placeholderTextColor={'grey'}
          style={{
            backgroundColor: 'white',
            width: width * 0.6,
            marginVertical: height * 0.02,
            fontFamily: 'Poppins-Bold',
            fontSize: width * 0.045,
          }}
          onChangeText={e => setDrinks(e)}
          value={drinks}
        />

        <TouchableOpacity
          onPress={() => {
            setIsModalVisible(false);
            setIsStripeModalVisible(true);
          }}
          style={{
            marginTop: height * 0.03,
            backgroundColor: 'white',
            width: width * 0.38,
            paddingVertical: height * 0.015,
            borderRadius: width * 0.1,
          }}>
          <AppText
            nol={2}
            textAlign="center"
            family="Poppins-SemiBold"
            size={height * 0.02}
            color={themeRed}
            Label={'Proceed'}
          />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: themeRed,
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: width * 0.06,
    paddingVertical: height * 0.05,
    paddingHorizontal: width * 0.05,
  },
});
export default BuyDrinksModal;
