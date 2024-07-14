/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import * as React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import LoginStyles from './LoginStyles';
import {
  Button,
  Image,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAvoidingView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import navProps from '../../props/navProp';

const Login: React.FC<navProps> = ({navigation}) => {
  const [userName, setUserName] = React.useState();
  const [password, setPassword] = React.useState();
  const [error, setError] = React.useState('');

  const handleLogin = () => {
    console.log('Login Request Sent');
    axios
      .post('http://10.0.2.2:5000/login', {
        username: userName,
        password: password,
      })
      .then(function (response) {
        // Accessing the message from the response data
        console.log(response.data.message);
      })
      .catch(function (errors) {
        console.log(errors);
      });
  };

  return (
    <KeyboardAvoidingView
      style={LoginStyles.keyboardContainer}
      behavior={Platform.OS === 'ios' ? 'height' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : hp('4%')}
      enabled>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={LoginStyles.scrollContainer}>
        <SafeAreaView style={LoginStyles.container}>
          <View style={LoginStyles.imageContainer}>
            <Image
              source={require('../../photos/loginPhoto.png')}
              resizeMode="contain"
              style={LoginStyles.image}
            />
          </View>
          <Text style={LoginStyles.loginTitle}>
            <Text>SCROLL </Text>
            SHOP
          </Text>

          <View style={LoginStyles.inputCOntainer}>
            <TextInput
              style={LoginStyles.inputFieldContainer}
              onChangeText={() => {
                setUserName;
              }}
              value={userName}
              placeholder="Username"
            />
            <TextInput
              secureTextEntry={true}
              style={LoginStyles.inputFieldContainer}
              onChangeText={() => {
                setPassword;
              }}
              value={password}
              placeholder="Password"
            />
          </View>
          <View style={LoginStyles.buttonContainer}>
            <Button
              title="Login"
              accessibilityLabel="Click Here to Login"
              onPress={() => {
                handleLogin();
              }}
            />
          </View>

          <View style={LoginStyles.errorContainer}>
            <Text style={LoginStyles.errorText}>{error}</Text>
          </View>

          <View style={LoginStyles.otherOptionsContainer}>
            <TouchableOpacity>
              <Text
                style={LoginStyles.otherButton}
                onPress={() => {
                  navigation.navigate('Register');
                }}>
                Register
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={LoginStyles.otherButton}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
