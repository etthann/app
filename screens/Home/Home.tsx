/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, TouchableOpacity, View} from 'react-native';
import HomeStyles from './HomeStyles';
import AntDesign from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

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
          <View style={HomeStyles.cardOptions}>
            <TouchableOpacity
              style={{...HomeStyles.options, backgroundColor: 'orange'}}>
              <Feather name="corner-up-left" size={hp('3')} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{...HomeStyles.options, backgroundColor: 'red'}}>
              <AntDesign name="close" size={hp('3')} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{...HomeStyles.options, backgroundColor: 'yellow'}}>
              <AntDesign name="star" size={hp('3')} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{...HomeStyles.options, backgroundColor: 'green'}}>
              <AntDesign name="check" size={hp('3')} color="black" />
            </TouchableOpacity>
          </View>
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
