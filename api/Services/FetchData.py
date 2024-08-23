from flask import jsonify, request
from bson import ObjectId

def convert_bytes_to_str(data):
    if isinstance(data, bytes):
        return data.decode('utf-8')
    if isinstance(data, dict):
        return {key: convert_bytes_to_str(value) for key, value in data.items()}
    if isinstance(data, list):
        return [convert_bytes_to_str(element) for element in data]
    return data

def get_user_data(users, username):
    # Ensure username is a string
    if not isinstance(username, str):
        return jsonify({"error": "Invalid username"}), 400
    
    # Query the collection to find the user data
    user = users.find_one({'username': username})

    # Check if user exists
    if user is None:
        return jsonify({'message': 'User does not exist'}), 401
    
    # Convert ObjectId to string and bytes to string
    user['_id'] = str(user['_id'])
    user = convert_bytes_to_str(user)
    
    # Return the user data as a JSON response
    return jsonify(user), 200

def update_info():
    return True