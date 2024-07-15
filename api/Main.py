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
    
    username_regex = r'^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$'

    validations = {
        'Invalid email address': not re.match(r"[^@]+@[^@]+\.[^@]+", email),
        'Passwords do not match': password != confirm_password,
        'Password must be at least 8 characters': len(password) < 8,
        'Username must be at least 4 characters': len(username) < 4,
        'Username must be alphanumeric, contain an uppercase letter and at least one special character': not re.match(username_regex, username),
        'Username already exists': User.query.filter_by(username=username).first() is not None,
        'Email already exists': User.query.filter_by(email=email).first() is not None
    }

    for message, condition in validations.items():
        if condition:
            return jsonify({'message': key})

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