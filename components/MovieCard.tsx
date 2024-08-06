/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { ImageBackground, Text } from 'react-native';
import { Image, StyleSheet, View } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import HomeStyles from '../screens/Home/HomeStyles';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native';

interface Movie {
    image_url: string;
    title: string;
    actors: string;
    genres: string;
    description: string;
    imdb: string;
    handleDescriptionLayout: (event: any) => void;
    isOverflowed: any;
    descriptionRef: any;
    setModalVisible: (event: any) => void;
}

interface MovieCardProps {
    movies: Movie[];
}

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
                            Description: {movie?.description} <Text>Rating: {movie?.imdb}</Text>
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
    return (
        <View style={styles.container}>
            <Swiper
                cards={movies}
                cardIndex={index}
                renderCard={(movie) => <Card movie={movie} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        borderRadius: 0,
        shadowRadius: 25,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        justifyContent: 'center',
        backgroundColor: 'white',
        alignItems: 'center',
    },
    cardImage: {
        width: 300,
        height: 400,
    },
});

export default MovieCard;
