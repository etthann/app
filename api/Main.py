from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS
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
    return auth.login_user(users)

if __name__ == "__main__":
    app.run(debug=True, port=5000)