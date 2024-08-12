/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */

import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStyles from './HomeStyles';
import AntDesign from 'react-native-vector-icons/FontAwesome';
import Search from '../Search/Search';
import Profile from '../Profile/Profile';
import HomeScreen from './HomeScreen';

const Tab = createBottomTabNavigator();

const Home: React.FC = () => {
  return (
    <SafeAreaView style={HomeStyles.container}>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="search" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="user" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default Home;
