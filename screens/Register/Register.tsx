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
    {
      placeholder: 'Username',
      value: userName,
      onChangeText: setUserName,
      secureTextEntry: false,
    },
    {
      placeholder: 'Email',
      value: email,
      onChangeText: setEmail,
      secureTextEntry: false,
    },
    {
      placeholder: 'Password',
      value: password,
      onChangeText: setPassword,
      secureTextEntry: true,
    },
    {
      placeholder: 'Confirm Password',
      value: confirmPassword,
      onChangeText: setConfirmPassword,
      secureTextEntry: true,
    },
  ];

  const register = async () => {
    try {
      const response = await axios.post('http://10.0.2.2:5000/register', {
        username: userName,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      });
      console.log('Server response:', response.data);
      // Placeholder for handling success response
      // For example, navigate to the login page or show a success message
    } catch (e) {
      console.log(
        'Registration error:',
        (e as any).response ? (e as any).response.data : e,
      );
      // Handle error (e.g., show error message to the user)
    }
  };

  return (
    <KeyboardAvoidingView
      style={RegisterStyles.keyboardContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : hp('12%')}
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
                secureTextEntry={field.secureTextEntry}
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
