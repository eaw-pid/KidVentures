from flask import request, make_response, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from config import app, db, api
from models import *
from datetime import datetime

class UsersResource(Resource):
    def get(self):

        users = [user.to_dict() for user in User.query.all()]

        return users, 200
    
    def post(self):

        data = request.get_json()
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        try:
            newUser = User(
                username=username,
                email=email
            )
            newUser.password_hash=password

            db.session.add(newUser)
            db.session.commit()

            session["user_id"] = newUser.id
            return newUser.to_dict(), 201
        except IntegrityError:
            return {"error": "username must be unique"}, 422
        except ValueError as err:
            return {"error": str(err)}, 422

class UserById(Resource):
    def get(self, id):

        user = User.query.filter_by(id=id).first()
        if user:
            return user.to_dict(), 200
        return {"error": "User not found"}, 404
    
    def delete(self, id):
        user = User.query.filter_by(id=id).first()
        if user:
            db.session.delete(user)
            db.session.commit()
            return {"message": "User deleted successfully"}, 200
        return {"error": "User not found"}, 404
    
class ActivityResource(Resource):
    def get(self):

        activities = [activity.to_dict() for activity in Activity.query.order_by(Activity.start_time).all()]

        return activities, 201
    
    def post(self):

        data = request.get_json()
        start_time = datetime.strptime(data.get('start_time'), '%Y-%m-%dT%H:%M:%S')
        
        title = data.get("title")
        description = data.get("description")
        location = data.get("location")
        street_one = data.get("street_one")
        street_two = data.get("street_two")
        city = data.get("city")
        state = data.get("state")
        zip_code = data.get("zip_code")
        start_time = start_time
        price = data.get("price")
        free = data.get("free")
        registration_link = data.get("registration_link")

        try:
            newActivity = Activity(
                title=title,
                description=description,
                location=location,
                street_one=street_one,
                street_two=street_two,
                city=city,
                state=state,
                zip_code=zip_code,
                start_time=start_time,
                price=price,
                free=free,
                registration_link=registration_link
            )

            db.session.add(newActivity)
            db.session.commit()

            #session["user_id"] = newUser.id
            return newActivity.to_dict(), 201
        except IntegrityError:
            return {"error": "zipcode must be 5 characters"}, 422
        except ValueError as err:
            return {"error": str(err)}, 422
    
class ActivityById(Resource):
    def get(self, id):
        activity = Activity.query.filter_by(id=id).first()

        if activity:
            return activity.to_dict(), 200
        else:
            return {"Error": "Cannot find activity"}, 422
    
    def delete(self, id):
        activity = Activity.query.filter_by(id=id).first()

        if activity:
            db.session.delete(activity)
            db.session.commit()

            return {"Message": "Activity successfully deleted"}, 200
        else:
            return {"Error": "Cannot find activity"}, 422

class SignupResource(Resource):
    def get(self):

        signups = [signup.to_dict() for signup in Signup.query.all()]

        return signups, 200


class Login(Resource):
    def post(self):
        #get json data
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")
        #first check if an account exists by username
        user = User.query.filter_by(username=username).first()
        
        #check if the user's password matches user acct
        #authenticate is process of validating the password - defined in User Mode
        if user and user.authenticate(password):
        #login user if yes
            session["user_id"] = user.id
            #return user dictionary
            return user.to_dict(), 200
        #otherwise return an error saying Username and pw doesn't match
        else:
            return {"error": "Invalid username and/or password"}, 422
        
class UserSignup(Resource):
    def post(self):

            data = request.get_json()
            username = data.get("username")
            email = data.get("email")
            password = data.get("password")

            try:
                newUser = User(
                    username=username,
                    email=email
                )
                newUser.password_hash=password

                db.session.add(newUser)
                db.session.commit()

                session["user_id"] = newUser.id
                return newUser.to_dict(), 201
            except IntegrityError:
                return {"error": "username must be unique"}, 422
            except ValueError as err:
                return {"error": str(err)}, 422  

class CheckSession(Resource):
    def get(self):
        id = session.get("user_id")
        if id:
            user = User.query.filter_by(id=id).first()
            return user.to_dict(), 200
        else:
            return {}, 401

class Logout(Resource):
    def delete(self):
        if session.get("user_id"):
            del session["user_id"]
            return {"message": "You are logged out"}, 200
        else:
            return {"error": "You are already logged out"}, 401
    
api.add_resource(UsersResource, '/users')
api.add_resource(UserById, '/users/<int:id>')
api.add_resource(ActivityResource, '/activities')
api.add_resource(ActivityById, '/activities/<int:id>')
api.add_resource(SignupResource, '/signups')
api.add_resource(Login, '/login')
api.add_resource(UserSignup, '/signup')
api.add_resource(CheckSession, '/check-session')
api.add_resource(Logout, '/logout')