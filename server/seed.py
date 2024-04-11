#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from datetime import datetime

# Remote library imports
from faker import Faker

# Local imports
from config import app, db
from models import *

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        db.session.query(User).delete()
        db.session.query(Activity).delete()
        db.session.query(ActivityCategory).delete()
        db.session.query(Signup).delete()
        db.session.query(Review).delete()

#Create Users
        user1 = User(username="user1", email="user1@gmail.com", password_hash="Pass123")
        user2 = User(username="user2", email="user2@gmail.com", password_hash="Pass123")
        user3 = User(username="user3", email="user3@gmail.com", password_hash="Pass123")

        db.session.add_all([user1, user2, user3])
        db.session.commit()

#Create Activities

        act1 = Activity(
            title="52nd CNY Maple Festival",
            description="CNY Maple Fest will take place in Marathon on Saturday, April 13 from 9am to 5pm",
            location="Marathon, NY",
            street_one="1 E Main Street",
            city="Marathon",
            state="NY",
            zip_code="13803",
            start_time=datetime(2024,4,13,9,00),
            free=1       
            )
        act2 = Activity(
            title="LEGO Club at BCPL",
            description="Drop by the Children's Room to make your own LEGO creation",
            location="Broome County Public Library",
            street_one="185 Court Street",
            city="Binghamton",
            state="NY",
            zip_code="13901",
            start_time=datetime(2024,4,13,9,00),
            free=1       
            )
        act3 = Activity(
            title="Binghamton Rumble Ponies Game",
            description="Take your family to a ballgame and experience the excitement of Double-A Baseball!",
            location="Mirabito Stadium",
            street_one="211 Henry Street",
            city="Binghamton",
            state="NY",
            zip_code="13901",
            start_time=datetime(2024,4,16,19,00),
            free=1       
            )
        act4 = Activity(
            title="Head Over Heels Open Gym",
            description="Join Head Over Hells for Unstructured Playtime for children under 5",
            location="Head Over Heels",
            street_one="541 Vestal Parkway W.",
            city="Vestal",
            state="NY",
            zip_code="13850",
            start_time=datetime(2024,5,17,10,00),
            price=13.00,
            free=0,
            registration_link="https://www.headoverheelsvestal.com/opengym"       
            )
        act5 = Activity(
            title="Skate Estate Trike, Trot and Roll",
            description="Run, walk, skate or ride your favorite toy or scooter on Skate Estate's skate floor!",
            location="Skate Estate",
            street_one="3401 Vestal Road",
            city="Vestal",
            state="NY",
            zip_code="13850",
            start_time=datetime(2024,5,11,10,00),
            price=6.00,
            free=0       
            )
        act6 = Activity(
            title="Arnold Park Meet Up",
            description="Bring your family to play in the playground",
            location="Arnold Park",
            street_one="Andrews Road",
            city="Vestal",
            state="NY",
            zip_code="13850",
            start_time=datetime(2024,5,8,10,00),
            free=0       
            )
        act7 = Activity(
            title="Library Reading Hour",
            description="Stop by the kids section at the Endicott Library to enjoy some books and games",
            location="Endicott Public Library",
            street_one="1001 Park Street",
            city="Endicott",
            state="NY",
            zip_code="13760",
            start_time=datetime(2024,5,4,14,00),
            free=0       
            )
        db.session.add_all([act1,act2, act3, act4, act5, act6, act7])
        db.session.commit()

    #create ActivityCategory
        ac1=ActivityCategory(activity_id=1, category_id=2)
        ac2=ActivityCategory(activity_id=1, category_id=3)
        ac3=ActivityCategory(activity_id=2, category_id=2)
        ac4=ActivityCategory(activity_id=2, category_id=6)
        ac5=ActivityCategory(activity_id=3, category_id=2)
        ac6=ActivityCategory(activity_id=4, category_id=1)
        ac7=ActivityCategory(activity_id=4, category_id=3)
        ac8=ActivityCategory(activity_id=5, category_id=3)
        ac9=ActivityCategory(activity_id=5, category_id=1)
        ac10=ActivityCategory(activity_id=6, category_id=2)
        ac11=ActivityCategory(activity_id=7, category_id=1)
        ac12=ActivityCategory(activity_id=7, category_id=6)
        
        db.session.add_all([ac1, ac2, ac3, ac4, ac5, ac6, ac7, ac8, ac9, ac10, ac11, ac12])
        db.session.commit()

    #create Signups
        s1=Signup(user_id=1, activity_id=6)
        s2=Signup(user_id=2, activity_id=6)
        s3=Signup(user_id=3, activity_id=6)
    
        db.session.add_all([s1, s2, s3])
        db.session.commit()

    #create Reviews
        r1=Review(user_id=1, activity_id=6, comments="This is a great opportunity to meet new parents")
        r2=Review(user_id=1, activity_id=4, comments="We went to this last month and it was amazing! Definitely check it out.")
        r3=Review(user_id=2, activity_id=2, comments="This got a bit crowded last week. They should probably limit the amount of kids who can come")
        r4=Review(user_id=1, activity_id=1, comments="Can't wait! Love maple!!")
        r5=Review(user_id=3, activity_id=6, comments="This is great. Let's try a new park next time.")

        db.session.add_all([r1, r2, r3, r4, r5])
        db.session.commit()