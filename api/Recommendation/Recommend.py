import pandas as pd
import requests
import joblib
import re
import os
import random
from dotenv import load_dotenv
import logging

load_dotenv()

OMDB_API_KEY = os.getenv('OMDB_API_KEY')
OMDB_BASE_URL = 'http://www.omdbapi.com/'

# Load the movies DataFrame
movies_df = pd.read_csv(os.path.join(os.path.dirname(__file__), 'ml-latest-small/movies.csv'))

def get_movie_data(title):
    match = re.search(r'\((\d{4})\)', title)
    year = match.group(1) if match else None
    title = re.sub(r'\s*\(\d{4}\)$', '', title)
    params = {
        'apikey': OMDB_API_KEY,
        't': title
    }
    if year:
        params['y'] = year
    response = requests.get(OMDB_BASE_URL, params=params)
    if response.status_code == 200:
        data = response.json()
        if 'Poster' in data and data['Poster'] != 'N/A':
            return data['Poster'], data['Plot'], data['Genre'], data['Director'], data['Actors'], data['imdbRating'], data['Year']
    return None, None, None, None, None, None, None

logging.basicConfig(level=logging.DEBUG)


def recommend_movies(movie_id=None, top_n=5, recommended_ids=[]):
    # Load the similarity matrix
    try:
        similarity_matrix = joblib.load(os.path.join(os.path.dirname(__file__), 'similarity_matrix.pkl'))
        logging.debug("Similarity matrix loaded successfully.")
    except Exception as e:
        logging.error(f"Failed to load similarity matrix: {e}")
        return []

    if movie_id is None:
        # Select a random movie_id if none is provided
        movie_id = random.choice(movies_df['movieId'].values)
        logging.debug(f"Random movie_id selected: {movie_id}")

    # Get similarity scores for the given movie
    try:
        similarity_scores = list(enumerate(similarity_matrix[movie_id - 1]))
        logging.debug(f"Similarity scores calculated for movie_id {movie_id}.")
    except IndexError as e:
        logging.error(f"Invalid movie_id {movie_id}: {e}")
        return []

    # Sort movies by similarity score
    recommended_movie_ids = [i[0] + 1 for i in similarity_scores[1:] if (i[0] + 1) not in recommended_ids][:top_n]
    logging.debug(f"Top {top_n} recommended movie IDs: {recommended_movie_ids}")

    # Get top N similar movies (excluding the input movie itself)
    recommended_movie_ids = [i[0] + 1 for i in similarity_scores[1:top_n + 1]]
    logging.debug(f"Top {top_n} recommended movie IDs: {recommended_movie_ids}")

    # Fetch recommended movie titles and images
    recommended_movies = []
    for movie_id in recommended_movie_ids:
        movie_row = movies_df.loc[movies_df['movieId'] == movie_id]
        if not movie_row.empty:
            title = movie_row['title'].values[0]
            image_url, movie_plot, genre, director, actors, imdb, year = get_movie_data(title)
            if (image_url is not None) and (movie_plot is not None):
                recommended_movies.append({
                    'title': title,
                    'image_url': image_url,
                    'plot': movie_plot,
                    'genre': genre,
                    'director': director,
                    'actors': actors,
                    'imdb': imdb,
                    'year': year,
                    'id': movie_id
                })
                logging.debug(f"Added movie: {title}")
            else:
                logging.warning(f"Missing data for movie: {title}")
        else:
            logging.warning(f"No movie found with movie_id: {movie_id}")

    logging.debug(f"Total recommended movies: {len(recommended_movies)}")
    return recommended_movies

if __name__ == "__main__":
    # Recommend movies at the start
    recommendations = recommend_movies(movie_id=1, top_n=5, recommended_ids=[1, 2, 3])
    for recommendation in recommendations:
        print(f"Title: {recommendation['title']}, "
                    f"Image URL: {recommendation['image_url']}, "
                    f"Plot: {recommendation['plot']}, "
                    f"Genre: {recommendation['genre']}, "
                    f"Director: {recommendation['director']}, "
                    f"Actors: {recommendation['actors']}, "
                    f"IMDB Rating: {recommendation['imdb']}, "
                    f"Year: {recommendation['year']},"
                    f"ID: {recommendation['id']}")