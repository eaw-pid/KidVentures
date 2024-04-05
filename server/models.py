from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

# Models go here!

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    email = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String, nullable=False)

    def __repr__(self):
        return f'<{self.username}>'
    
    #need hybrid property to define password_hash.setter
    @hybrid_property
    def password_hash(self):
        return AttributeError("Password hashes may not be viewed")
    
    #giving ability to say user.password_hash = "value"
    @password_hash.setter
    def password_hash(self, password):
        # utf-8 encoding and decoding is required in python 3
        #gives us a string of bytes
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8') #decoded to a string of characters for storing in db

    #returns True of False
    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))
    
    @validates('email')
    def validate_email(self, key, email):
        if '@' not in email:
            raise ValueError("Failed email validation")
        elif any(user.email == email for user in User.query.all()):
            raise ValueError("Email already associated with another account")
        return email
    
# class Activity(db.Model, SerializerMixin): 
#     __tablename__ = "activities"

#     id = db.Column(db.Integer, primary_key=True)
#     title = db.Column(db.String, nullable=False)
#     description = (db.Column(db.String, nullable=False))
#     location = db.Column(db.String, nullable=False)
#     street_one = db.Column(db.String, nullable=False)
#     street_two = db.Column(db.String)
#     city = db.Column(db.String, nullable=False)
#     state = db.Column(db.String, nullable=False)
#     zip_code = db.Column(db.String, nullable=False)
#     date = db.Column(db.DateTime, nullable=False)
#     #age_group (should this be it's own class?)
#     price = db.Column(db.Float)
#     free = db.Column(db.Boolean, default=False, server_default="0") 
#     category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))

#     def __repr__(self):
#         return f'<{self.name}>'

# class Category(db.Model, SerializerMixin):
#     __tablename__ = "categories"

#     id = db.Column(db.Integer, primary_key=True)
#     type = db.Column(db.String)

#     def __repr__(self):
#         return f'<{self.type}>'

# class Signup(db.Model, SerializerMixin):
#     __tablename__ = "signups"

#     id - db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
#     activity_id = db.Column(db.Integer, db.ForeignKey("activities.id"))
#     created_at = db.Column(db.DateTime, server_default=db.func.now())

#     def __repr__(self):
#         return f'<{self.user_id} {self.activity_id}>'

# class Review(db.Model, SerializerMixin):
#     __tablename__ = "reviews"

#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
#     activity_id = db.Column(db.Integer, db.ForeignKey("activities.id"))
#     comments = db.Column(db.String, nullable=False)

#     def __repr__(self):
#         return f'<User:{self.user_id}, Activity: {self.activity_id}, Review: {self.notes}>'
    