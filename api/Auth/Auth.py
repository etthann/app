from flask import jsonify
from flask_bcrypt import Bcrypt
import re
import os
from flask import request
from flask_jwt_extended import create_access_token
from flask_sqlalchemy import SQLAlchemy



bcrypt = Bcrypt()
db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

class AuthUser:

    def get_login_credentials():
        data = request.json
        username = data.get('username')
        password = data.get('password')
        return username, password

    def get_register_credentials():
        data = request.json
        username, password, confirm_password, email = data.get('username'), data.get('password'), data.get('confirm_password'), data.get('email')
        
        # Regex for username validation
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
    
        
        # Loop through validations and return the first error encountered
        for message, condition in validations.items():
            if condition:
                return jsonify({'message': message}), 400
        
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