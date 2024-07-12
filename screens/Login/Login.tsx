/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

interface LoginProps {
  navigation: {
    navigate: (routeName: string, params?: any) => void;
  };
}

const Login: React.FC<LoginProps> = () => {
  return (
    <SafeAreaView>
      <SafeAreaView></SafeAreaView>
    </SafeAreaView>
  );
};

export default Login;
