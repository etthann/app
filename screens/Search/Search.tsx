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
  {id: 1, name: 'Dresses' },
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
    onPress={() => console.log(`Navigate to ${item.name}`)}>
    <Text style={SearchStyles.categoryText}>{item.name}</Text>
  </TouchableOpacity>
);

const SearchScreen = () => {
  const [search, setSearch] = React.useState('');
  const [page, setPage] = React.useState(1);
  const itemsPerPage = 5;

  const updateSearch = (searchCategory: React.SetStateAction<string>) => {
    setSearch(searchCategory);
    setPage(1);
  };

  const memoizedRenderItem = useCallback(renderItem, []);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(search.toLowerCase()),
  );

  const paginatedCategories = filteredCategories.slice(0, page * itemsPerPage);

  const loadMore = () => {
    if (paginatedCategories.length < filteredCategories.length) {
      setPage(prevPage => prevPage + 1);
    }
  };

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
          data={filteredCategories}
          renderItem={memoizedRenderItem}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default SearchScreen;
