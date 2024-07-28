/* eslint-disable prettier/prettier */
/* eslint-disable no-catch-shadow */
/* eslint-disable @typescript-eslint/no-shadow */
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
  const [error, setError] = React.useState<any>(null);

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

  const validateForm = () => {
    const validations = [
      {
        condition: [userName, password, email, confirmPassword].some(
          field => !field,
        ),
        message: 'Please fill out all fields',
      },
      {
        condition: userName.length < 3,
        message: 'Username must be at least 3 characters',
      },
      {
        condition: password !== confirmPassword,
        message: 'Passwords do not match',
      },
      {
        condition: password.length < 8,
        message: 'Password must be at least 8 characters',
      },
      {
        condition: !email.includes('@') || !email.includes('.'),
        message: 'Invalid email',
      },
    ];

    return !validations.find(
      ({condition, message}) => condition && (setError(message), true),
    );
  };

  const handleRegister = async () => {
    try {
      if (!validateForm()) {
        return;
      }

      const response = await axios.post('http://10.0.2.2:5000/register', {
        username: userName,
        password: password,
        email: email,
        confirmPassword: confirmPassword,
      });

      if (response.status === 200) {
        navigation.navigate('Home');
      }
      setError(response.data.message);
    } catch (error) {
      setError((error as any).response.data.message);
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
                handleRegister();
              }}
            />
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;
