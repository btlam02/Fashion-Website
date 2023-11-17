from flask import Flask, request, jsonify,render_template, flash, redirect, session, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
#requirements for database connection 
import os

app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY")

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL")
db = SQLAlchemy(app)


# Flask - Login
login_manager = LoginManager()
login_manager.init_app(app=app)


class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(50), nullable=False)


@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json(force=True)
        email = data.get('email')
        password = data.get('password')
        print(data)
        # Your login authentication logic here
         # Kiểm tra xem email đã tồn tại trong cơ sở dữ liệu hay chưa
        existing_user = User.query.filter_by(email=email).first()

        if existing_user:
            print('Email already exists!')
            return jsonify({'message': 'Email already exists!'})

        # Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
        hashed_password = generate_password_hash(password)

        # Tạo một user mới
        new_user = User(email=email, password=hashed_password, role = 'user')

        # Thêm user mới vào cơ sở dữ liệu
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'Registration successful'})

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
   

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))



# @app.route('/login', methods=['GET', 'POST'])
# def login():
#     if request.method == 'POST':
#         username = request.form['username']
#         password = request.form['password']
#         user = User.query.filter_by(username=username).first()

#         if user:
#             if check_password_hash(user.password, password):
#                 login_user(user)
#                 return redirect(url_for('home'))
#         return render_template('login.html', message='Invalid username or password')
#     return render_template('login.html')


@app.route('/login', methods=['POST'])
def login():

    data = request.get_json(force=True)
    email = data.get('email')
    password = data.get('password')

    # Retrieve user from the database based on the provided email
    user = User.query.filter_by(email=email).first()

    if user and check_password_hash (user.password,password):  # Validate the password
        return jsonify({'message': 'Login successful'})
    else:
        return jsonify({'message': 'Invalid credentials'})


if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)


