/* eslint-disable prettier/prettier */
import axios from 'axios';

const MovieDetails = async (id: number, top_n: number = 5, recommendedIds: number[] = []) => {
    try {
        const response = await axios.post('http://10.0.2.2:5000/recommend', {
            movie_id: id ? id : 1,
            top_n: top_n,
            recommended_ids: recommendedIds,
        });

        const newMovies = response.data[0].filter((movie: any) => !recommendedIds.includes(movie.id));


        return newMovies;
    } catch (error) {
        console.log('Error:', error);
    }
};

export default MovieDetails;
