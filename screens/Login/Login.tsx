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
import loginImage from '../../photos/loginPhoto.png';
import {KeyboardAvoidingView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';

interface LoginProps {
  navigation: {
    navigate: (routeName: string, params?: any) => void;
  };
}

const Login: React.FC<LoginProps> = ({navigation}) => {
  const [userName, setUserName] = React.useState();
  const [password, setPassword] = React.useState();
  const [error, setError] = React.useState('');

  const login = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login', {
        userName: userName,
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
      style={LoginStyles.keyboardContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : hp('5%')}
      enabled>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={LoginStyles.scrollContainer}>
        <SafeAreaView style={LoginStyles.container}>
          <View style={LoginStyles.imageContainer}>
            <Image
              source={loginImage}
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
              onChangeText={() => {x
                setUserName;
              }}
              value={userName}
              placeholder="Username"
            />
            <TextInput
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
                login();
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
