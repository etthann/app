class MovieDatasetInfo:

    def get_genres(data):
        all_genres = set()

        for content in data:
            if content[2] == "(no genres listed)" or content[2] == 'IMAX' or content[2] == 'genres':
                continue
            movieGenres = content[2].split('|')
            
            for genre in movieGenres:
                all_genres.add(genre)
        return all_genres
    
    def get_movie_names(data):
        all_movies = set()

        for content in data:
            movie_names = content[1].split('|')
            
            for movie in movie_names:
                all_movies.add(movie)
        return all_movies
    