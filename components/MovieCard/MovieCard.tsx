/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import { ActivityIndicator, ImageBackground, Text } from 'react-native';
import { View } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import HomeStyles from '../../screens/Home/HomeStyles';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native';
import MovieDetails from '../MovieCard/MovieDetails';
import { Movie } from '../../props/interface';
import { MovieCardProps } from '../../props/interface';

const Card = ({ movie }: { movie: Movie }) => {
    return (
        <View style={HomeStyles.card}>
            <ImageBackground source={{ uri: movie?.image_url }} style={HomeStyles.imageBackground}>
                <View style={HomeStyles.title}>
                    <Text style={HomeStyles.titleText}>{movie?.title}</Text>
                </View>
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.9)']}
                    style={HomeStyles.gradient}>
                    <View style={HomeStyles.description}>
                        <Text
                            style={HomeStyles.descriptionText}
                            onLayout={movie?.handleDescriptionLayout}
                            numberOfLines={movie?.isOverflowed ? 3 : undefined}
                            ref={movie?.descriptionRef}>
                            Description: {movie?.plot} <Text>Rating: {movie?.imdb}</Text>
                        </Text>
                        {movie?.isOverflowed && (
                            <TouchableOpacity onPress={() => movie?.setModalVisible(true)}>
                                <Text style={HomeStyles.readMore}>Read More</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </LinearGradient>
            </ImageBackground>
        </View>
    );
};

const MovieCard: React.FC<MovieCardProps> = ({ movies }) => {
    const [index, setIndex] = React.useState(0);
    const [movieList, setMovieList] = React.useState(movies);

    const handleSwiped = (cardIndex: number) => {
        const nextIndex = cardIndex + 1;
        setIndex(nextIndex);
    };

    React.useEffect(() => {
        setMovieList(movies);
    }, [movies]);


    return (
        <View style={{ ...HomeStyles.subContainer, justifyContent: 'center' }}>
            {movieList.length === 0 ? (
                <>
                    <Text>Loading...</Text>
                    <ActivityIndicator size="large" color={'blue'} />
                </>
            ) : (
                <Swiper
                    cards={movieList}
                    cardIndex={index}
                    renderCard={(movie) => <Card movie={movie} />}
                    onSwiped={handleSwiped}
                    stackAnimationTension={50}
                    goBackToPreviousCardOnSwipeLeft
                    backgroundColor={'#FFFFFF'}
                    verticalSwipe={false}
                    onSwipedAll={() => {
                        MovieDetails(movies[index].id, 50).then((data) => {
                            setMovieList(data);
                        });
                    }}
                />
            )}
        </View>
    );
};

export default MovieCard;
