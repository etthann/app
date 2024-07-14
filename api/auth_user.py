from werkzeug.security import generate_password_hash, check_password_hash
from models import User, db

class Auth:
    def __init__(self, login_attempts=0):
        self.login_attempts = login_attempts

    def login_check(self, username, password):
        self.login_attempts += 1
        if self.login_attempts > 3:
            return {"message": "Too many login attempts. Please try again later."}, 403
        return self.validate_login(username, password)
    
    def validate_login(self, username, password):
        user = User.query.filter_by(username=username).first()
        if user and check_password_hash(user.password, password):
            return {"message": "Login successful"}, 200
        return {"message": "Invalid credentials"}, 401
    
    def register_user(self, username, password, email):
        user = User.query.filter_by(username=username).first()
        if user:
            return {"message": "User already exists"}, 400
        new_user = User(username=username, password=generate_password_hash(password), email=email)
        db.session.add(new_user)
        db.session.commit()
        return {"message": "User created successfully"}, 201
