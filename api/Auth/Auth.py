from flask import Flask
from flask_sqlalchemy import SQLAlchemy


@app.route("/login",method=['POST'])
def get_login_credentials():
    username = data.get('username')
    password = data.get('password')