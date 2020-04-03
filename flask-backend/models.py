from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os
from sqlalchemy import create_engine
# from main import app

app = Flask(__name__)
# TODO: replace with real password
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://postgres:zxcvbn12@/postgres?host=/cloudsql/city-hunt-267820:us-central1:database-city-hunt'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)

class Cities(db.Model):
    """
    The Cities class implements an sql table that holds data on the 100 most populous cities.
    It establishes 8 columns: name, state, latitude, longitude, population, description, id, and listings.
    It uses name as the primary key and has id as a secondary means to identify if there are 
    two cities with the same name.
    The listings column is connected to the Airbnb table to populate the Airbnb listings located in 
    that city if the Airbnb table has listings for it.
    """
    __tablename__ = 'cities'

    name = db.Column(db.String(80), primary_key=True)
    state = db.Column(db.String(80), nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    population = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(5000), nullable=False)
    id = db.Column(db.String(80), nullable=False)

    listings = db.relationship('Airbnb', backref='cities')

    def __repr__(self):
        return f"Cities('{self.name}')"


class Airbnb(db.Model):
    """
    The Airbnb class holds data for Airbnb listings for various cities in the U.S. 
    There are not listings for every city in the Cities table so data gets sent to 
    that table only if the Airbnb table has data for it.
    The Airbnb table has 21 columns: id, listing_url, name, description, neighborhood_overview,
    transit, picture_url, neighborhood, city, state, zipcode, smart_location, latitude, longitude,
    room_type, accomodates, amenities, price, number_of_reviews, review_scores_rating, and city_name.
    id is the primary key for this table and city_name is the foreign key (primary key for the Cities table), 
    which connects the two tables.
    """

    __table__name = 'airbnb'

    id = db.Column(db.Float, primary_key=True)
    listing_url = db.Column(db.String(80), nullable=False)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(2000), nullable=False)
    neighborhood_overview = db.Column(db.String(2000), nullable=True)
    transit = db.Column(db.String(2000), nullable=False)
    picture_url = db.Column(db.String(400), nullable=False)
    neighbourhood = db.Column(db.String(1200), nullable=True)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    zipcode = db.Column(db.Float, nullable=True)
    smart_location = db.Column(db.String(80), nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    room_type = db.Column(db.String(80), nullable=False)
    accomodates = db.Column(db.Float, nullable=False)
    amenities = db.Column(db.String(2000), nullable=False)
    price = db.Column(db.Float, nullable=False)
    number_of_reviews = db.Column(db.Integer, nullable=False)
    review_scores_rating = db.Column(db.Float, nullable=False)
    city_name = db.Column(db.String(40), db.ForeignKey(
        'cities.name'), nullable=False)

    def __repr__(self):
        return f"Airbnb('{self.id}')"

# engine = create_engine('postgres+psycopg2://postgres:supersecret@localhost:5432/cityhuntdb')


db.create_all()
