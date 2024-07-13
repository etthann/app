from flask import jsonify
from flask_bcrypt import Bcrypt
from flask import current_app as app
import re

bcrypt = Bcrypt(app)
db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

class AuthUser:

    @staticmethod
    def get_login_credentials():
        data = request.json
        username = data.get('username')
        password = data.get('password')
        return username, password

    def get_register_credentials():
        data = request.json
        username = data.get('username')
        password = data.get('password')
        confirm_password = data.get('confirm_password')
        email = data.get('email')
        email_regex = r"[^@]+@[^@]+\.[^@]+"
        if not re.match(email_regex, email):
            return jsonify({'message': 'Invalid email address'}), 400
        if password != confirm_password:
            return jsonify({'message': 'Passwords do not match'}), 400
        if len(password) < 8:
            return jsonify({'message': 'Password must be at least 8 characters'}), 400
        if len(username) < 4:
            return jsonify({'message': 'Username must be at least 4 characters'}), 400
        if User.query.filter_by(username=username).first():
            return jsonify({'message': 'Username already exists'}), 400
        if User.query.filter_by(email=email).first():
            return jsonify({'message': 'Email already exists'}), 400
        return username, password, email

    def validate_login_credentials(username, password):
        user = User.query.filter_by(username=username).first()
        if user and bcrypt.check_password_hash(user.password, password):
            return True
        return False

    def register_user(username, password, email):
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        user = User(username=username, password=hashed_password, email=email)
        db.session.add(user)
        db.session.commit()
        return jsonify({'message': 'User created successfully'}), 201

    def login_user(username):
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token), 200