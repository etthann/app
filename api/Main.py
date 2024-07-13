from flask import Flask
import os
from dotenv import load_dotenv
import AuthUser
from flask_bcrypt import Bcrypt


load_dotenv()

app = Flask(__name__)

# Database configuration
db_username = os.getenv('DB_USERNAME')
db_password = os.getenv('DB_PASSWORD')
db_host = os.getenv('DB_HOST')
db_name = os.getenv('DB_NAME')
app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+pymysql://{db_username}:{db_password}@{db_host}/{db_name}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)  # Initialize the SQLAlchemy db instance with the Flask app

@app.route("/")
def home():
    return "API is running!"


@app.route('/register', methods=['POST'])
def register():
    auth_user = AuthUser() 
    result = auth_user.get_register_credentials()
    if isinstance(result, tuple) and len(result) == 2:
        message, status_code = result
        return jsonify({'error': message}), status_code

    username, password, email = result
    auth_user.register_user(username, password, email)
    return jsonify({'message': 'User created successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    auth_user = AuthUser()
    result = auth_user.get_login_credentials()
    passed = auth_user.validate_login_credentials(*result)

    if not passed:
        return {'error': 'Invalid credentials'}, 401

    token = auth_user.login_user(result[0])
    # Create a response object
    response = make_response({'message': 'Login successful'}, 200)
    # Set the token in an HTTP-only cookie
    response.set_cookie('auth_token', token, httponly=True, secure=True)
    return response


if __name__ == "__main__":
    app.run(port=5000)