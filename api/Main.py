from Genres.Genre import MovieDatasetInfo
from Recommendation.Recommend import get_movie_data
from Services.FileServices import FileServices

file_services = FileServices()
data = file_services.readFile("./Recommendation/ml-latest-small/movies.csv")
genres = MovieDatasetInfo.get_genres(data)
movies = MovieDatasetInfo.get_movie_names(data)
genres.remove('IMAX')

genre_movie_dict = {}

for row in data:
    movie_title = row[1]
    genre_list = row[2].split('|')

    for genre in genre_list:
        if genre == "IMAX":
            continue
        if genre not in genre_movie_dict:
            genre_movie_dict[genre] = []
        genre_movie_dict[genre].append(movie_title)

print(genre_movie_dict.keys())