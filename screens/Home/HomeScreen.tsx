/* eslint-disable prettier/prettier */
import * as React from 'react';
import {
  Text,
  View,
} from 'react-native';
import MovieCard from '../../components/MovieCard';
import MovieDetails from '../../components/MovieDetails';
import HomeStyles from './HomeStyles';

const HomeScreen: React.FC = () => {
  const [movies, setMovies] = React.useState([]);

  React.useEffect(() => {
    MovieDetails(1, 50).then((data) => {
      setMovies(data);
    });
  }, []);

  return (
    <View style={HomeStyles.subContainer}>
      <View style={HomeStyles.navContainer}>
        <Text style={HomeStyles.appName}>
          MOVIE FINDER
        </Text>
      </View>
      <View style={HomeStyles.cardContainer}>
        <MovieCard movies={movies} />
      </View>
    </View>
  );
};

export default HomeScreen;
