/* eslint-disable prettier/prettier */
import * as React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, TouchableOpacity, View} from 'react-native';
import HomeStyles from './HomeStyles';

const Tab = createBottomTabNavigator();

const Home: React.FC = () => {
  return (
    <SafeAreaView style={HomeStyles.container}>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const HomeScreen: React.FC = () => {
  return (
    <View style={HomeStyles.subContainer}>
      <View style={HomeStyles.navContainer}>
        <Text style={HomeStyles.appName}>
          <Text>SCROLL </Text>
          SHOP
        </Text>
      </View>
      <View style={HomeStyles.cardContainer}>
        <View style={HomeStyles.card}>
          <Text>Card</Text>
        </View>
      </View>
    </View>
  );
};

const SettingsScreen: React.FC = () => {
  return (
    <View>
      <Text>Settings Screen</Text>
    </View>
  );
};

export default Home;
