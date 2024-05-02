from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from datetime import datetime
from geopy.geocoders import Nominatim

from config import db, bcrypt

# Models go here!

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    serialize_rules=('-signups.created_at',
                     '-signups.user_id',
                     '-reviews.user_id',)

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    email = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String, nullable=False)

    signups = db.relationship("Signup", back_populates="user")
    reviews = db.relationship("Review", back_populates="user")
    
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
    
class Activity(db.Model, SerializerMixin): 
    __tablename__ = "activities"

    serialize_rules = ('-categories.activity',
                       '-categories.category',
                       'date_converter',
                       'full_address',
                    #    'geolocator',
                       )

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    location = db.Column(db.String, nullable=False)
    street_one = db.Column(db.String, nullable=False)
    street_two = db.Column(db.String)
    city = db.Column(db.String, nullable=False)
    state = db.Column(db.String, nullable=False)
    zip_code = db.Column(db.String, nullable=False)
    start_time = db.Column(db.DateTime, nullable=False)
    price = db.Column(db.Float)
    free = db.Column(db.Boolean, default=False, server_default="0") 
    registration_link = db.Column(db.String)

    categories = db.relationship("ActivityCategory", cascade="all,delete", back_populates="activity")
    signups = db.relationship("Signup", cascade="all,delete", back_populates="activity")
    reviews = db.relationship("Review", cascade="all,delete", back_populates="activity")

    def date_converter(self):
        date = self.start_time

        return date.strftime("%A,  %B %-d %I:%M %p")

    def full_address(self):

        return f"{self.street_one} {self.city}, {self.state} {self.zip_code}"
    
    def geolocator(self):
        geolocator = Nominatim(user_agent="KidVentures")

        location = geolocator.geocode(self.full_address(), timeout=200)

        return location

    
    @validates('zip_code')
    def validate_zip_code(self, key, zip_code):
        if len(zip_code) != 5:
            raise ValueError("Zip Code must be 5 digits")
        return zip_code
        
    def __repr__(self):
        return f'<{self.title}>'
    


class Category(db.Model, SerializerMixin):
    __tablename__ = "categories"

    serialize_rules = ('-categories',)

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String, nullable=False)

    categories = db.relationship("ActivityCategory", back_populates="category")

    def __repr__(self):
        return f'<{self.type}>'

class ActivityCategory(db.Model, SerializerMixin):
    ##TO DO NEED A ASSC PROXY FOR CATEGORY_ID
    __tablename__ = "activity_categories"

    serialize_rules = ('-category',
                       '-activity',)

    id = db.Column(db.Integer, primary_key=True)
    activity_id = db.Column(db.Integer, db.ForeignKey('activities.id'))
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))

    category = db.relationship("Category", back_populates="categories")
    activity = db.relationship("Activity", back_populates="categories")
    
    
    def __repr__(self):
        return f'<Activity: {self.activity_id}, Category{self.category_id}>'

    @validates('activity_id')
    def validate_activity_id(self, key, activity_id):
        if not any(activity.id == activity_id for activity in Activity.query.all()):
            raise ValueError("activity does not exist")
        return activity_id
    
    @validates('category_id')
    def validate_category_id(self, key, category_id):
        if not any(category.id == category_id for category in Category.query.all()):
            raise ValueError("category does not exist")
        return category_id

class Signup(db.Model, SerializerMixin):
    __tablename__ = "signups"

    serialize_rules = ('-user',
                       '-activity',)

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    activity_id = db.Column(db.Integer, db.ForeignKey("activities.id"))
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    user = db.relationship("User", back_populates="signups")
    activity = db.relationship("Activity", back_populates="signups")

    def __repr__(self):
        return f'<UserId: {self.user_id}, ActivityId: {self.activity_id}>'
    

class Review(db.Model, SerializerMixin):
    __tablename__ = "reviews"

    serialize_rules = ('-user.reviews',
                       '-user.categories',
                        '-user.signups',
                        '-user.email',
                        '-user._password_hash',
                       '-activity',
                       )

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    activity_id = db.Column(db.Integer, db.ForeignKey("activities.id"))
    comments = db.Column(db.String, nullable=False)

    user = db.relationship("User", back_populates="reviews")
    activity = db.relationship("Activity", back_populates="reviews")

    @validates('user_id')
    def validate_user_id(self, key, user_id):
        if not any(user.id == user_id for user in User.query.all()):
            raise ValueError("user does not exist")
        return user_id
    
    @validates('activity_id')
    def validate_activity_id(self, key, activity_id):
        if not any(activity.id == activity_id for activity in Activity.query.all()):
            raise ValueError("activity does not exist")
        return activity_id

    def __repr__(self):
        return f'<User:{self.user_id}, Activity: {self.activity_id}, Review: {self.comments}>'
    