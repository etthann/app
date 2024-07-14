from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os
from auth_user import Auth
from models import db, User


app = Flask(__name__)
CORS(app) 

user = os.environ['DB_USERNAME']
password = os.environ['DB_PASSWORD']
host = os.environ['DB_HOST']
db_name = os.environ['DB_NAME']
app.config['SQLALCHEMY_DATABASE_URI'] = f'oracle+cx_oracle://{user}:{password}@{host}:1522/?service_name={db_name}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

@app.route("/login", methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    auth = Auth()
    result = auth.login_check(username, password)
    return jsonify(result), 200

if __name__ == "__main__":
    app.run(debug=True)