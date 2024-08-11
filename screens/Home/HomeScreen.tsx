/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import HomeStyles from './HomeStyles';
import AntDesign from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MovieCard from '../../components/MovieCard';
import MovieDetails from '../../components/MovieDetails';

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
          <Text>SCROLL </Text>
          SHOP
        </Text>
      </View>
      <View style={HomeStyles.cardContainer}>
        <MovieCard movies={movies} />
        <View style={HomeStyles.cardOptions}>
          <TouchableOpacity
            style={{ ...HomeStyles.options, backgroundColor: 'orange' }}>
            <Feather name="corner-up-left" size={hp('3')} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...HomeStyles.options, backgroundColor: 'red' }}>
            <AntDesign name="close" size={hp('3')} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...HomeStyles.options, backgroundColor: 'yellow' }}>
            <AntDesign name="star" size={hp('3')} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...HomeStyles.options, backgroundColor: 'green' }}>
            <AntDesign name="check" size={hp('3')} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
