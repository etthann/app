from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS
import bcrypt
from Auth.Authentication import Authentication as auth


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

client = MongoClient('localhost', 27017)
db = client.flask_database
users = db.users

@app.route("/")
def index():
    return jsonify({'message': 'Hello World'})

@app.route('/register', methods=['POST'])
def register():
    return auth.register_user()

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    # Check if both 'username' and 'password' keys exist in the request data
    if 'username' not in data or 'password' not in data:
        return jsonify({'message': 'Missing username or password'}), 400

    username = data['username']
    password = data['password'].encode('utf-8')

    if username is None or password is None or username == '' or password == '':
        return jsonify({'message': 'Missing username or password'}), 400
    
    user = users.find_one({'username': username})
    if user is None:
        return jsonify({'message': 'User does not exist'}), 401
    
    if not bcrypt.checkpw(password, user['password']):
        return jsonify({'message': 'Invalid password'}),

    return jsonify("login successful")

if __name__ == "__main__":
    app.run(debug=True, port=5000)