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
import axios from 'axios';
import MovieCard from '../../components/MovieCard';

const HomeScreen: React.FC = () => {
  const [movieData, setMovieData] = React.useState<any[]>([]);

  const getMovieDetails = async (id?: number) => {
    try {
      if (movieData.length < 1) {
        const response = await axios.post('http://10.0.2.2:5000/recommend', {
          movie_id: id ? id : 1,
          top_n: 5,
        });
        setMovieData(response.data);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  React.useEffect(() => {
    if (movieData.length < 1) {
      getMovieDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieData.length]);

  return (
    <View style={HomeStyles.subContainer}>
      <View style={HomeStyles.navContainer}>
        <Text style={HomeStyles.appName}>
          <Text>SCROLL </Text>
          SHOP
        </Text>
      </View>
      <View style={HomeStyles.cardContainer}>
        <MovieCard movies={movieData} getMovieDetails={getMovieDetails}/>
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
