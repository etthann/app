/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import HomeStyles from './HomeStyles';
import AntDesign from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';

const HomeScreen: React.FC = () => {
  const [image, setImage] = React.useState<string>('');
  const [title, setTitle] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');
  const [rating, setRating] = React.useState<string>('');
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [descriptionHeight, setDescriptionHeight] = React.useState(0);
  const [isOverflowed, setIsOverflowed] = React.useState(false);
  const descriptionRef = React.useRef(null);

  const getMovieDetails = async () => {
    try {
      const movieData: {element: any}[] = [];

      if (movieData.length <= 1) {
        const response = await axios.post('http://10.0.2.2:5000/recommend', {
          movie_id: 1,
          top_n: 5,
        });

        if (response.status === 200) {
          response.data[0].forEach((element: any) => {
            movieData.push({element});
          });
          const movie = response.data[0][0];
          setImage(movie.image_url);
          setTitle(movie.title);
          setDescription(movie.plot);
          setRating(movie.imdb);

          movieData.shift();
        }
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleDescriptionLayout = (event: {
    nativeEvent: {layout: {height: any}};
  }) => {
    const {height} = event.nativeEvent.layout;
    setDescriptionHeight(height);
    if (height > 0) {
      setIsOverflowed(true);
    }
  };

  const handleSwipe = (event: any) => {
    const {translationX} = event.nativeEvent;
    if (translationX < 50) {
      getMovieDetails();
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
        <GestureHandlerRootView>
          <PanGestureHandler onGestureEvent={handleSwipe}>
            <View style={HomeStyles.card}>
              <ImageBackground src={image} style={HomeStyles.imageBackground}>
                <View style={HomeStyles.title}>
                  <Text style={HomeStyles.titleText}>{title}</Text>
                </View>
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.9)']}
                  style={HomeStyles.gradient}>
                  <View style={HomeStyles.description}>
                    <Text
                      style={HomeStyles.descriptionText}
                      onLayout={handleDescriptionLayout}
                      numberOfLines={isOverflowed ? 3 : undefined}
                      ref={descriptionRef}>
                      Description: {description} <Text>Rating: {rating}</Text>
                    </Text>
                    {isOverflowed && (
                      <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Text style={HomeStyles.readMore}>Read More</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </LinearGradient>
              </ImageBackground>
            </View>
          </PanGestureHandler>
        </GestureHandlerRootView>
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
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection="down"
        style={HomeStyles.bottomModal}
        animationIn="slideInUp"
        animationOut="slideOutDown">
        <ScrollView>
          <Text
            style={{
              ...HomeStyles.modalDescriptionText,
              fontSize: (hp('1%') + descriptionHeight) * 0.5,
            }}>
            Description: {description}
          </Text>
        </ScrollView>
        <TouchableOpacity onPress={() => setModalVisible(false)}>
          <Text style={HomeStyles.closeModal}>Close</Text>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default HomeScreen;
