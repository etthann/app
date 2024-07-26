from flask import Flask, request, jsonify,session
from pymongo import MongoClient
from flask_cors import CORS
from Auth.authentication import Authentication as auth
import os

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
    return auth.register_user(users)

@app.route('/login', methods=['POST'])
def login():
    return auth.login_user(users)

@app.route('/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({'message': 'User logged out'}), 200


if __name__ == "__main__":
    app.run(debug=True, port=5000)