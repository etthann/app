/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
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
import { KeyboardAvoidingView } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import { navProps } from '../../props/interface';

const Login: React.FC<navProps> = ({ navigation }) => {
  const [userName, setUserName] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [error, setError] = React.useState('');

  const login = async () => {
    try {
      const response = await axios.post('http://10.0.2.2:5000/login', {
        username: userName,
        password: password,
      });

      if (response.status === 200) {
        navigation.navigate('Home');
      }
    } catch (e) {
      console.log(
        'Registration error:',
        (e as any).response ? (e as any).response.data : e,
      );
    }
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

          <View style={LoginStyles.inputContainer}>
            <TextInput
              style={LoginStyles.inputFieldContainer}
              onChangeText={username => {
                setUserName(username);
              }}
              value={userName}
              placeholder="Username"
            />
            <TextInput
              secureTextEntry={true}
              style={LoginStyles.inputFieldContainer}
              onChangeText={pass => {
                setPassword(pass);
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
            <TouchableOpacity onPress={() => {
              navigation.navigate('ForgotPassword');
            }}>
              <Text style={LoginStyles.otherButton}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
