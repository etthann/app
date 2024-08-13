import re


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
    
    def get_genre_movie_dict(data, genre_filter=None, limit=None):
        genre_movie_dict = {}
        count = 0

        for row in data:
            if limit and count >= limit:
                break
            movie_title = re.sub(r'\s\(\d{4}\)', '', row[1])
            genre_list = row[2].split('|')
            
            for genre in genre_list:
                if genre == "IMAX":
                    continue
                if genre_filter and genre != genre_filter:
                    continue

                if genre not in genre_movie_dict:
                    genre_movie_dict[genre] = []
                
                genre_movie_dict[genre].append(movie_title)
                count += 1
                if limit and count >= limit:
                    break
        return genre_movie_dict