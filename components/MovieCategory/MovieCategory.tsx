/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MovieCategoryStyles from './MovieCategoryStyles';
import { navProps } from '../../props/interface';
import Modal from 'react-native-modal';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const MovieCategory: React.FC<navProps> = ({ navigation }) => {
    const route = useRoute();
    const { title, moviesSortedByGenre } = route.params as { title: string, moviesSortedByGenre: Array<{ id: number; name: string; }> };
    const [movieGenreDict, setMovieGenreDict] = React.useState<{ id: number; name: string; }[]>([]);
    const [movieData, setMovies] = React.useState<[]>([]);
    const [isModalVisible, setModalVisible] = React.useState(false);
    const [selectedMovie, setSelectedMovie] = React.useState<any>(null);

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

    const toggleModal = (movie?: any) => {
        setSelectedMovie(movie);
        setModalVisible(!isModalVisible);
    };

    const closeModal = () => {
        setSelectedMovie(null);
        setModalVisible(false);
    };


    console.log(movieData);

    return (
        <SafeAreaView style={MovieCategoryStyles.container}>
            <ScrollView>
                {movieData && movieData.map((movie: any) => {

                    const imageUrl = movie[1];
                    console.log(`Image URL for ${movie[0]}: ${imageUrl}`);
                    return (
                        <TouchableOpacity key={movie[0]} style={MovieCategoryStyles.movieContainer} onPress={() => toggleModal(movie)}>
                            <View>
                                <Image
                                    source={{ uri: imageUrl }}
                                    style={{ ...MovieCategoryStyles.movieImage, width: wp('30%') }}
                                    onError={(e) => console.log(`Failed to load image for ${movie[0]}: ${e.nativeEvent.error}`)}
                                />
                            </View>
                            <Text adjustsFontSizeToFit
                                ellipsizeMode="tail"
                                numberOfLines={2}
                                style={MovieCategoryStyles.movieTitle}>{movie[0]}</Text>
                        </TouchableOpacity>

                    );
                })}
            </ScrollView>
            {selectedMovie && (
                <Modal
                    animationIn="slideInUp"
                    isVisible={isModalVisible}
                    deviceWidth={wp('100%')}
                    deviceHeight={hp('100%')}
                    onBackdropPress={closeModal}
                    style={MovieCategoryStyles.movieModal}
                >
                    <View style={{ ...MovieCategoryStyles.modalContent, flexDirection: 'column' }}>
                        <View style={{ ...MovieCategoryStyles.modalContent, height: '40%' }}>
                            {selectedMovie[1] && (
                                <>
                                    <Image
                                        source={{ uri: selectedMovie[1] }}
                                        style={{ ...MovieCategoryStyles.movieImage, width: '50%', height: '100%' }}
                                        onError={(e) => console.log(`Failed to load image for ${selectedMovie[0]}: ${e.nativeEvent.error}`)}
                                    />
                                    <View>
                                        <Text adjustsFontSizeToFit
                                            ellipsizeMode="tail"
                                            numberOfLines={2}
                                            style={MovieCategoryStyles.movieTitle}>{selectedMovie[0]}</Text>
                                        <Text adjustsFontSizeToFit
                                            ellipsizeMode="tail"
                                            numberOfLines={2}
                                            style={{ ...MovieCategoryStyles.movieTitle, fontSize: hp('2%'), padding: hp('1%') }}>
                                            Rating: {selectedMovie[3]}
                                        </Text>
                                    </View>
                                </>
                            )}
                        </View>
                        <Text
                            adjustsFontSizeToFit
                            ellipsizeMode="tail"
                            numberOfLines={2}
                            style={{ fontWeight: 'bold', fontSize: hp('3%'), padding: hp('2%'), color: 'black' }}>
                            Description:
                        </Text>
                        <Text
                            style={MovieCategoryStyles.movieDescription}>
                            {selectedMovie[2]}
                        </Text>
                    </View>
                </Modal>
            )}
        </SafeAreaView>
    );
};

export default MovieCategory;
