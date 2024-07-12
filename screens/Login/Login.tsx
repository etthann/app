/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
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
            <Text>SWIPE </Text>
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
                navigation.navigate('Home');
              }}
            />
          </View>

          <View style={LoginStyles.otherOptionsContainer}>
            <Text>Sign Up</Text>
            <Text>Forgot Password?</Text>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
