from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)
# TODO: replace with real password
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
    "DB_STRING", 'postgres://postgres:supersecret@localhost:5432/cityhuntdb')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)


class Cities(db.Model):
    __tablename__ = 'cities'

    name = db.Column(db.String(80), primary_key=True)
    state = db.Column(db.String(80), nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    population = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(5000), nullable=False)


# class Airbnb(db.Model):
#     __table__name = 'airbnb'

#     id = db.Column(db.Float, primary_key=True)
#     listing_url = db.Column(db.String(80), nullable=False)
#     name = db.Column(db.String(80), nullable=False)
#     description = db.Column(db.String(400), nullable=False)
#     neighborhood_overview = db.Column(db.String(400), nullable=True)
#     transit = db.Column(db.String(400), nullable=False)
#     picture_url = db.Column(db.String(400), nullable=False)
#     neighbourhood = db.Column(db.String(400), nullable=True)
#     city = db.Column(db.String(50), nullable=False)
#     state = db.Column(db.String(50), nullable=False)
#     zipcode = db.Column(db.Integer, nullable=True)
#     smart_location = db.Column(db.String(80), nullable=False)
#     latitude = db.Column(db.Float, nullable=False)
#     longitude = db.Column(db.Float, nullable=False)
#     room_type = db.Column(db.String(80), nullable=False)
#     accomodates = db.Column(db.Float, nullable=False)
#     amenities = db.Column(db.String(400), nullable=False)
#     price = db.Column(db.String(20), nullable=False)
#     number_of_reviews = db.Column(db.Integer, nullable=False)
#     review_scores_rating = db.Column(db.Float, nullable=False)
#     # attempt no. juan
#     city_name = db.Column(db.String(40), db.ForeignKey(
#         'cities.name'), nullable=False)


db.create_all()
