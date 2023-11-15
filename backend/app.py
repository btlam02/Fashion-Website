from flask import Flask, request, jsonify,render_template, flash, redirect, session, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
#requirements for database connection 
from dotenv import load_dotenv
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
    email = db.Column(db.String(50), unique=True, nullable=False)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), nullable=False, default ='user')



@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        email = request.form['email']
        username = request.form['username']
        password = request.form['password']

        # Kiểm tra xem người dùng đã tồn tại hay chưa
        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            flash("Username already exists")
            return render_template('register.html')

        # Tạo người dùng mới và lưu vào cơ sở dữ liệu
        hashed_password = generate_password_hash(password)
        new_user = User(email = email,username=username, password=hashed_password, role='user')
        db.session.add(new_user)
        db.session.commit()

        return redirect(url_for('login'))
    return render_template('register.html')



@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))



@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = User.query.filter_by(username=username).first()

        if user:
            if check_password_hash(user.password, password):
                login_user(user)
                return redirect(url_for('home'))
        return render_template('login.html', message='Invalid username or password')
    return render_template('login.html')


# Đường dẫn đăng xuất
@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('home_base'))


# Đường dẫn bảng điều khiển
@app.route('/home')
@login_required
def home():
    if current_user.role == 'admin':
        # Trang bảng điều khiển cho admin
        return render_template('./admin/home_admin.html')
    else:
        # Trang bảng điều khiển cho user
        return render_template('./user/home_user.html')

@app.route('/')
def home_base(): 
    return render_template('home.html')


if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
