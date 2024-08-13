/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text } from 'react-native';
import HomeStyles from '../../screens/Home/HomeStyles';
import { useNavigation, useRoute } from '@react-navigation/native';

const MovieCategory: React.FC = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const { title, moviesSortedByGenre } = route.params as { title: string, moviesSortedByGenre: Array<{ id: number; name: string; }> };

    React.useEffect(() => {
        navigation.setOptions({ title });
    }, [navigation, title]);

    console.log(moviesSortedByGenre);


    return (
        <View style={HomeStyles.container}>
            <Text>Movie Category</Text>
        </View>

    );
};

export default MovieCategory;
