/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MovieCategoryStyles from './MovieCategoryStyles';
import { navProps } from '../../props/interface';

const MovieCategory: React.FC<navProps> = ({ navigation }) => {

    const route = useRoute();
    const { title, moviesSortedByGenre } = route.params as { title: string, moviesSortedByGenre: Array<{ id: number; name: string; }> };
    const [movieGenreDict, setMovieGenreDict] = React.useState<{ id: number; name: string; }[]>([]);
    const [movieData, setMovies] = React.useState<[]>([]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getMoviesByGenre = (genre: string) => {
        try {
            return movieGenreDict[genre]; // This is working
        } catch (error) {
            console.log(error);
        }

    };

    React.useEffect(() => {
        setMovieGenreDict(moviesSortedByGenre);
        setMovies(getMoviesByGenre(title));
        navigation.setOptions({ title });

    }, [getMoviesByGenre, moviesSortedByGenre, navigation, title]);

    console.log(movieData);

    return (
        <SafeAreaView style={MovieCategoryStyles.container}>
            <ScrollView>

                {movieData && movieData.map((movie: any) => {
                    const imageUrl = movie[1];
                    console.log(`Image URL for ${movie[0]}: ${imageUrl}`);
                    return (
                        <TouchableOpacity key={movie[0]} style={MovieCategoryStyles.movieContainer}>
                            <Image
                                source={{ uri: imageUrl }}
                                style={MovieCategoryStyles.movieImage}
                                onError={(e) => console.log(`Failed to load image for ${movie[0]}: ${e.nativeEvent.error}`)}
                            />
                            <Text style={MovieCategoryStyles.movieTitle}>{movie[0]}</Text>

                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </SafeAreaView>
    );
};

export default MovieCategory;
