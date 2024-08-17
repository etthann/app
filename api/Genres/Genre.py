import re
from MovieData.FetchMovieData import get_movie_data

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

    def map_genre_to_movie(data, genre_filter=None, limit=None):
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
                
                movie_data = get_movie_data(movie_title)
                

                genre_movie_dict[genre].append([movie_title, movie_data[0],movie_data[1], movie_data[-2]])
                count += 1
                if limit and count >= limit:
                    break
        return genre_movie_dict