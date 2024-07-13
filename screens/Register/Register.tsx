/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Button,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as React from 'react';
import {Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import RegisterStyles from './RegisterStyles';
import navProps from '../../props/navProp';
import axios from 'axios';

const Register: React.FC<navProps> = ({navigation}) => {
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const inputFields = [
    {placeholder: 'Username', value: userName, onChangeText: setUserName},
    {placeholder: 'Email', value: email, onChangeText: setEmail},
    {placeholder: 'Password', value: password, onChangeText: setPassword},
    {
      placeholder: 'Confirm Password',
      value: confirmPassword,
      onChangeText: setConfirmPassword,
    },
  ];

  const register = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login', {
        userName: userName,
        email: email,
        confirmPassword: confirmPassword,
        password: password,
      });
      // Assuming the server sends back a 200 status code for a successful login
      if (response.status === 200) {
        // Navigate to another screen, e.g., 'Dashboard'
        navigation.navigate('Home');
      } else {
        // Handle any other status codes as login failures
        setError('Login failed. Please try again.');
      }
    } catch (catchError) {
      // If an error occurs during the request (e.g., server is down or response status is 4xx/5xx)
      console.log(catchError);
      // Update the state to display an error message
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={RegisterStyles.keyboardContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : hp('5%')}
      enabled>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={RegisterStyles.scrollContainer}>
        <SafeAreaView style={RegisterStyles.container}>
          <View style={RegisterStyles.imageContainer}>
            <Image
              source={require('../../photos/registerPhoto.png')}
              style={RegisterStyles.image}
              resizeMode="contain"
            />
          </View>
          <Text style={RegisterStyles.registerTitle}>REGISTER</Text>
          <View style={RegisterStyles.inputCOntainer}>
            {inputFields.map((field, index) => (
              <TextInput
                key={index}
                style={RegisterStyles.inputFieldContainer}
                onChangeText={text => field.onChangeText(text)}
                value={field.value}
                placeholder={field.placeholder}
              />
            ))}
          </View>
          <View style={RegisterStyles.errorContainer}>
            <Text style={RegisterStyles.errorText}>{error}</Text>
          </View>
          <View style={RegisterStyles.buttonContainer}>
            <Button
              title="Register"
              accessibilityLabel="Click Here to Register"
              onPress={() => {
                register();
              }}
            />
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;
