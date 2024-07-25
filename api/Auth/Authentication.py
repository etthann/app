from flask import Flask, request, jsonify
import bcrypt
import re


class Authentication():

    @staticmethod
    def register_user():
        data = request.json
        username = data['username']
        password = data['password'].encode('utf-8')
        email = data['email']
        confirm_password = data['confirmPassword']
        # Hash the password
        hashed_password = bcrypt.hashpw(password, bcrypt.gensalt())
        
        message = Authentication.validate_request_data()

        if message is not None:
            return message

        Authentication.register_user_to_db(username, hashed_password, email)

        return jsonify({'message': 'User created successfully'}), 200

    @staticmethod
    def validate_request_data(username,password,email = None,confirm_password = None, register = True):
        username_regex = r'^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$'
        validations = {
            'Invalid email address': not re.match(r"[^@]+@[^@]+\.[^@]+", email),
            'Passwords do not match': password != confirm_password,
            'Password must be at least 8 characters': len(password) < 8,
            'Username must be at least 4 characters': len(username) < 4,
            'Username must be alphanumeric, contain an uppercase letter and at least one special character': not re.match(username_regex, username),
            'Username already exists': users.query.filter_by(username=username).first() is not None,
            'Email already exists': users.query.filter_by(email=email).first() is not None
        }

        for message, condition in validations.items():
            if condition:
                return jsonify({'message': message})

        if confirm_password is not None:
            if password.decode('utf-8') != confirm_password:
                return jsonify({'message': 'Passwords do not match'})
        
        users.find_one({'username': username})

        if register:
            return jsonify({'message': 'User already exists'})
        return None


    @staticmethod
    def register_user_to_db(username, hashed_password, email):
        users.insert_one({
            'username': username,
            'password': hashed_password,
            'email': email
        })

    @staticmethod
    def login_user(users):
        data = request.json
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

        return jsonify({'message': 'Logged in successfully'}), 200
    
    