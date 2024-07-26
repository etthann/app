/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ForgotPasswordStyles from './ForgotPasswordStyles';
import { Button } from '@rneui/base';

const ForgotPassword: React.FC = () => {
  return (
    <SafeAreaView style={ForgotPasswordStyles.container}>
      <View style={ForgotPasswordStyles.alignContent}>
        <TextInput placeholder="Enter Email" style={ForgotPasswordStyles.inputContainer}/>
        <Button >Send Email</Button>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
