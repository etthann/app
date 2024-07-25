/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import FavouriteStyles from './FavouriteStyles';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import SearchStyles from '../Search/SearchStyles';

const Favourites: React.FC = () => {
  const favourites: any[] = [
    'Hello',
    'World',
    'React Native',
    'TypeScript',
    'React Native Elements',
    'React Navigation',
    'React Native Paper',
    'React Native Vector Icons',
    'React Native Safe Area Context',
    'React Native Responsive Screen',
    'React Native Modal',
    'React Native Picker',
    'React Native Tab View',
    'React Native Web View',
    'React Native Gesture Handler',
  ];

  return (
    <SafeAreaView style={FavouriteStyles.container}>
      <ScrollView style={FavouriteStyles.favouriteContainer}>
        <View style={FavouriteStyles.titleContainer}>
          <Text
            style={{fontSize: hp('5%'), color: 'black', fontWeight: 'bold'}}>
            Favourites
          </Text>
        </View>
        {favourites.length > 0 ? (
          favourites.map((favourite, index) => (
            <TouchableOpacity key={index} style={FavouriteStyles.favourites}>
              <Text>{favourite}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <View style={SearchStyles.container}>
            <Text style={{fontSize: hp('3%'), color: 'black'}}>
              No favourites added yet.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Favourites;
