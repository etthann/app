/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React, { useCallback } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
  Text,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SearchBar } from '@rneui/themed';
import SearchStyles from './SearchStyles';
import axios from 'axios';
import { navProps } from '../../props/interface';


const SearchScreen: React.FC<navProps> = ({ navigation }) => {
  const [search, setSearch] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [categories, setCategories] = React.useState<Array<{ id: number; name: string; }>>([]);
  const [movieData, setMovieData] = React.useState<[]>([]);
  const itemsPerPage = 5;

  React.useEffect(() => {
    getGenresAndMovies();
  }
    , []);

  const getGenresAndMovies = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:5000/genres');
      if (response.status === 200) {
        const fetchedGenres = response.data[0];
        setMovieData(fetchedGenres);

        const newCategories = Object.keys(fetchedGenres).map((genreValue, index) => ({
          id: index,
          name: genreValue,
        }));

        setCategories(newCategories);
        console.log(newCategories);
      } else {
        console.error('Failed to fetch genres:', response.status);
      }
    } catch (error) {
      console.error('Axios error:', error);
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={SearchStyles.categoryBox}
      onPress={() => navigation.navigate('Category', { title: item.name, moviesSortedByGenre: movieData })}>
      <Text style={SearchStyles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );


  const updateSearch = (searchCategory: React.SetStateAction<string>) => {
    setSearch(searchCategory);
    setPage(1);
  };

  const memoizedRenderItem = useCallback(renderItem, [movieData, navigation]);

  const filteredCategories = categories.filter((category: { name: string; }) =>
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
      style={{ flex: 1 }}
      enabled>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={search}
        clearIcon={true}
        loadingProps={{ size: 'large', color: 'blue' }}
        placeholderTextColor="white"
        inputStyle={{ color: 'white' }}
      />
      <View style={SearchStyles.categoryContainer}>

        {
          categories.length === 0 ? (
            <ActivityIndicator />
          ) :
            <FlatList
              data={filteredCategories}
              renderItem={memoizedRenderItem}
              keyExtractor={item => item.id.toString()}
              numColumns={2}
              onEndReached={loadMore}
              onEndReachedThreshold={0.5}
            />
        }

      </View>
    </KeyboardAvoidingView>
  );
};

export default SearchScreen;
