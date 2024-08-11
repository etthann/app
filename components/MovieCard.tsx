/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { ActivityIndicator, ImageBackground, Text } from 'react-native';
import { Image, StyleSheet, View } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import HomeStyles from '../screens/Home/HomeStyles';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native';
import MovieDetails from './MovieDetails';

interface Movie {
    image_url: string;
    title: string;
    actors: string;
    genres: string;
    plot: string;
    imdb: string;
    handleDescriptionLayout: (event: any) => void;
    isOverflowed: any;
    descriptionRef: any;
    id: number;
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
    const [isLoading, setIsLoading] = React.useState(false);

    const handleSwiped = async (cardIndex: number) => {
        const nextIndex = cardIndex + 1;
        if (nextIndex >= movieList.length - 2) {
            const recommendedIds = movieList.map(movie => movie.id);
            MovieDetails(movieList[index].id, 5, recommendedIds).then((data) => {
                setMovieList([]);
                setIndex(0);
                cardIndex = 0;
                setMovieList((prevList) => [...prevList, ...data]);
            });
        } else {
            setIndex(nextIndex);
            console.log(movieList[nextIndex]);
        }
    };

    React.useEffect(() => {
        setMovieList(movies);
    }, [movies]);


    return (
        <View style={styles.container}>
            {movieList.length === 0 ? (
                <>
                    <Text>Loading...</Text>
                    <ActivityIndicator size="large" />
                </>

            ) : (
                <Swiper
                    cards={movieList}
                    cardIndex={index}
                    renderCard={(movie) => <Card movie={movie} />}
                    onSwiped={handleSwiped}
                />
            )}
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
