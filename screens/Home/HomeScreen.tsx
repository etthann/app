/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import HomeStyles from './HomeStyles';
import AntDesign from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import axios from 'axios';

const HomeScreen: React.FC = () => {
  const [image, setImage] = React.useState<string>('');
  const [title, setTitle] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');
  const [rating, setRating] = React.useState<string>('');

  const getMovieDetails = async () => {
    try {
      const response = await axios.post('http://10.0.2.2:5000/recommend', {
        movie_id: 1,
        top_n: 5,
      });

      if (response.status === 200) {
        const movie = response.data[0][0];
        setImage(movie.image_url);
        setTitle(movie.title);
        setDescription(movie.plot);
        setRating(movie.imdb);
        console.log('Movie:', movie);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  React.useEffect(() => {
    getMovieDetails();
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

export default HomeScreen;
