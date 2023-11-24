from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.exc import IntegrityError
import os

app = Flask(__name__)
CORS(app)
app.secret_key = os.getenv("SECRET_KEY")

# Thiết lập kết nối với cơ sở dữ liệu PostgreSQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:050702@localhost/Fashion'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(50), nullable = False)
    avatar = db.Column(db.LargeBinary)

    def __repr__(self):
        return f'<User {self.email}>'



# Route để xử lý yêu cầu đăng ký người dùng
@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        hash_password = generate_password_hash(password)

        new_user = User(email=email, password=hash_password, role ='user')
        db.session.add(new_user)
        db.session.commit()
        
        return jsonify({'message': 'Đăng ký thành công!'}), 201

    except IntegrityError:
        db.session.rollback()
        return jsonify({'error': 'Email đã tồn tại!'}), 409
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Route để xử lý yêu cầu đăng nhập
@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({'message': 'Email and password are required!'}), 400

        user = User.query.filter_by(email=email).first()

        if user and check_password_hash(user.password, password):
            return jsonify({'message': 'Login successful'}), 200
        else:
            return jsonify({'message': 'Invalid credentials'}), 401

    except Exception as e:
        return jsonify({'error': str(e)}), 500


# @app.route('/faceregister')
# def face_register(): 
#     try:
#             data = request.get_json()
#             email = data.get('email')
#             password = data.get('password')
#             image = data.get('image')
            
#             hash_password = generate_password_hash(password)

#             new_user = User(email=email, password=hash_password, role ='user', image = image)
#             db.session.add(new_user)
#             db.session.commit()
            
#             return jsonify({'message': 'Đăng ký thành công!'}), 201

#     except IntegrityError:
#             db.session.rollback()
#             return jsonify({'error': 'Email đã tồn tại!'}), 409
#     except Exception as e:
#             db.session.rollback()
#             return jsonify({'error': str(e)}), 500



@app.route('/signout',methods = ['POST'])
def signout():  
    return jsonify({'message':'Successfully Sign out'})
    
if __name__ == '__main__':
    db.create_all()
    app.run(host='127.0.0.1', port=5000)
