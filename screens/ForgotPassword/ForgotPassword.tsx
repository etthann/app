/* eslint-disable prettier/prettier */
import React from 'react';
import {Button, ImageBackground, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ForgotPasswordStyles from './ForgotPasswordStyles';
import {Image} from '@rneui/base';
import axios from 'axios';
import {sendEmail} from '../../services/EmailUser/SendEmail';


const ForgotPassword: React.FC = () => {
  const sendResetEmail = async () => {
    try {
      const retrieveEmail = await axios.post(
        'http://10.0.2.2:5000/forgotPassword',
      );
      if (retrieveEmail.status !== 200) {
        console.log('Email not found');
      }

      const email = retrieveEmail.data.email;

      sendEmail(
        email,
        'Reset Password',
        'Click the link to reset your password',
      ).then(() => {
        console.log('Your message was successfully sent!');
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ImageBackground
      source={require('../../photos/forgotPasswordBg.jpeg')}
      style={ForgotPasswordStyles.container}>
      <SafeAreaView style={ForgotPasswordStyles.container}>
        <View style={ForgotPasswordStyles.alignContent}>
          <Image
            source={require('../../photos/forgotPasswordPhoto.png')}
            style={ForgotPasswordStyles.imageContainer}
          />
          <TextInput
            placeholder="Enter Email"
            style={ForgotPasswordStyles.inputContainer}
          />
          <View style={ForgotPasswordStyles.button}>
            <Button
              title="Submit Email"
              onPress={() => {
                sendResetEmail();
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ForgotPassword;
