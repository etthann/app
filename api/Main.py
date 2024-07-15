from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS
import bcrypt

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
    data = request.json
    username = data['username']
    password = data['password'].encode('utf-8')
    email = data['email']
    confirm_password = data['confirmPassword']
    
    if password.decode('utf-8') != confirm_password:
        return jsonify({'message': 'Passwords do not match'})
    
    user = users.find_one({'username': username})
    if user:
        return jsonify({'message': 'User already exists'})
    
    # Hash the password
    hashed_password = bcrypt.hashpw(password, bcrypt.gensalt())
    
    # Store the user with the hashed password
    users.insert_one({
        'username': username,
        'password': hashed_password,
        'email': email
    })
    
    return jsonify({'message': 'User created successfully'}), 200

if __name__ == "__main__":
    app.run(debug=True, port=5000)