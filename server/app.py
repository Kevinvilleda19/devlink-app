from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token
from models import db, bcrypt, User

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///devlink.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'super-secret-key'

db.init_app(app)
bcrypt.init_app(app)
jwt = JWTManager(app)
CORS(app)

with app.app_context():
    db.create_all()

@app.route('/')
def home():
    return {"message": "DevLink backend is live!"}

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role', 'junior')

    if not username or not email or not password:
        return jsonify({"error": "Username, email, and password are required"}), 400

    if User.query.filter((User.username == username) | (User.email == email)).first():
        return jsonify({"error": "User with this username or email already exists"}), 409

    new_user = User(username=username, email=email, password=password, role=role)
    db.session.add(new_user)
    db.session.commit()

    access_token = create_access_token(identity=new_user.id)

    return jsonify({
        "message": "User registered successfully",
        "user": new_user.serialize(),
        "token": access_token
    }), 201
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()

    if not user or not user.check_password(password):
        return jsonify({"error": "Invalid email or password"}), 401

    access_token = create_access_token(identity=user.id)

    return jsonify({
        "message": "Login successful",
        "user": user.serialize(),
        "token": access_token
    }), 200

if __name__ == '__main__':
    app.run(debug=True)
