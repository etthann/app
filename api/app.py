from flask import Flask, app, jsonify, redirect, render_template, request, session, url_for
from pymongo import MongoClient
from flask_cors import CORS
from Auth.Authentication import Authentication as auth
import os
from Recommendation.Recommend import recommend_movies, get_movie_data
from Services.FileServices import FileServices
from Genres.Genre import MovieDatasetInfo
from Services.FetchData import get_user_data


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
app.secret_key = os.environ.get('SECRET_KEY', 'default_secret_key')

client = MongoClient('localhost', 27017)

db = client.flask_database

users = db.users

@app.route("/")
def index():
    return jsonify({'message': 'Hello World'})

@app.route('/register', methods=['POST'])
def register():

    # Check if the database exists
    db_name = 'test'
    if db_name not in client.list_database_names():
        # Create the database by performing an operation
        db = client[db_name]
        db.create_collection('users')
    else:
        db = client[db_name]

    return auth.register_user(users)

@app.route('/login', methods=['POST'])
def login():
    return auth.login_user(users)

@app.route('/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({'message': 'User logged out'}), 200

@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.json
    movie_id = data['movie_id']
    top_n = data['top_n']
    recommendations = recommend_movies(movie_id, top_n)
    return jsonify(recommendations, 200)

@app.route("/genres", methods=["GET"])
def getGenres():
    file_services = FileServices()
    data = file_services.readFile("./Recommendation/ml-latest-small/movies.csv")
    genre_movie_dict = MovieDatasetInfo.map_genre_to_movie(data, limit=20)
    return jsonify(genre_movie_dict, 200)

@app.route("/userInfo", methods=["POST"])
def getInfo():
    data = request.json
    username = data['username']
    return get_user_data(users,username)



if __name__ == "__main__":
    app.run(debug=True, port=5000)