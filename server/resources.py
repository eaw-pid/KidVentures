from flask import request, make_response, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from config import app, db, api
from models import *

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

            #session["user_id"] = newUser.id
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
    
api.add_resource(UsersResource, '/users')
api.add_resource(UserById, '/users/<int:id>')