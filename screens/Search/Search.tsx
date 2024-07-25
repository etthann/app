/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
  Text,
  Platform,
} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {SearchBar} from '@rneui/themed';
import SearchStyles from './SearchStyles';

const categories = [
  {id: 1, name: 'Dresses'},
  {id: 2, name: 'Tops'},
  {id: 3, name: 'Pants'},
  {id: 4, name: 'Skirts'},
  {id: 5, name: 'Shoes'},
  {id: 6, name: 'Accessories'},
  {id: 7, name: 'Bags'},
  {id: 8, name: 'Jewelry'},
  {id: 9, name: 'Hats'},
  {id: 10, name: 'Scarves'},
];

const renderItem = ({item}: {item: any}) => (
  <TouchableOpacity
    style={SearchStyles.categoryBox}
    onPress={() => console.log(`Navigate to ${item.name}`)} // Replace with your navigation logic
  >
    <Text style={SearchStyles.categoryText}>{item.name}</Text>
  </TouchableOpacity>
);

const SearchScreen = () => {
  const [search, setSearch] = React.useState('');

  const updateSearch = (searchCategory: React.SetStateAction<string>) => {
    setSearch(searchCategory);
  };

  const memoizedRenderItem = useCallback(renderItem, []);

  return (
    <KeyboardAvoidingView
      behavior="height"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : hp('4%')}
      style={{flex: 1}}
      enabled>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={search}
        clearIcon={true}
        loadingProps={{size: 'large', color: 'blue'}}
        placeholderTextColor="white"
        inputStyle={{color: 'white'}}
      />
      <View style={SearchStyles.categoryContainer}>
        <FlatList
          data={categories}
          renderItem={memoizedRenderItem}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default SearchScreen;
