import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
import joblib

# Load movies data
movies_df = pd.read_csv('movies.csv')

# Extract genres and create one-hot encoding
genres = []
for index, row in movies_df.iterrows():
    genres.extend(row['genres'].split('|'))
unique_genres = list(set(genres))
genre_df = pd.DataFrame(index=movies_df['movieId'], columns=unique_genres).fillna(0)
for index, row in movies_df.iterrows():
    for genre in row['genres'].split('|'):
        genre_df.loc[row['movieId'], genre] = 1

# Calculate cosine similarity matrix
similarity_matrix = cosine_similarity(genre_df)

# Save the similarity matrix
joblib.dump(similarity_matrix, 'similarity_matrix.pkl')

def recommend_movies(movie_id, top_n=5):
    # Load the similarity matrix
    similarity_matrix = joblib.load('similarity_matrix.pkl')

    # Get similarity scores for the given movie
    similarity_scores = list(enumerate(similarity_matrix[movie_id - 1]))

    # Sort movies by similarity score
    similarity_scores = sorted(similarity_scores, key=lambda x: x[1], reverse=True)

    # Get top N similar movies (excluding the input movie itself)
    recommended_movie_ids = [i[0] + 1 for i in similarity_scores[1:top_n + 1]]

    # Return recommended movie titles
    return movies_df[movies_df['movieId'].isin(recommended_movie_ids)]['title'].tolist()

# Example usage (after loading the model):
recommendations = recommend_movies(1)
print(recommendations)