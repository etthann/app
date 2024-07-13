/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {KeyboardAvoidingView, ScrollView, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as React from 'react';
import {Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Register: React.FC = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : hp('5%')}
      enabled>
      <ScrollView keyboardShouldPersistTaps="handled">
        <SafeAreaView>
          <Text>Hello</Text>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;
