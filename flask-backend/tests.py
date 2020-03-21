from models import db, Cities, Airbnb, app
from faker import Faker
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
from sqlalchemy import create_engine, or_, func, desc
from sqlalchemy.orm import sessionmaker
import unittest
import random as r
from main import about, get_gitlab_data
from data import about_data, member_contribs
import requests
import json
from flask import request, jsonify

'''
CORS(app, resources=r'/*')
engine = create_engine(
    'postgres+psycopg2://postgres:Nmc!2342@localhost:5432/cityhuntdb')
Session = sessionmaker(bind=engine)
session = Session()
'''

fake = Faker()

url = "https://gitlab.com/api/v4/projects/16729459"
commits = get_gitlab_data(f"{url}/repository/commits")
issues = get_gitlab_data(f"{url}/issues")

class DatabaseTestsCities(unittest.TestCase):
    def test_city_insert_1(self):
        new_city = Cities(name='Palestine', state=fake.state_abbr(include_territories=True), latitude=r.uniform(40.0, 70.0),
                          longitude=r.uniform(40.0, 70.0), population=r.randrange(1, 1000000),
                          description=fake.text())
        db.session.add(new_city)
        db.session.commit()

        query_city = db.session.query(Cities).filter_by(name='Palestine').one()
        self.assertEqual(query_city.name, 'Palestine')

        db.session.query(Cities).filter_by(name='Palestine').delete()
        db.session.commit()

    def test_city_insert_2(self):
        new_city = Cities(name='Waco', state=fake.state_abbr(include_territories=True), latitude=r.uniform(40.0, 70.0),
                          longitude=r.uniform(40.0, 70.0), population=r.randrange(1, 1000000),
                          description=fake.text())
        db.session.add(new_city)
        db.session.commit()

        query_city = db.session.query(Cities).filter_by(name='Waco').one()
        self.assertEqual(query_city.name, 'Waco')

        db.session.query(Cities).filter_by(name='Waco').delete()
        db.session.commit()

    def test_city_insert_3(self):
        new_city = Cities(name='Newark', state=fake.state_abbr(include_territories=True), latitude=r.uniform(40.0, 70.0),
                          longitude=r.uniform(40.0, 70.0), population=r.randrange(1, 1000000),
                          description=fake.text())
        db.session.add(new_city)
        db.session.commit()

        query_city = db.session.query(Cities).filter_by(name='Newark').one()
        self.assertEqual(query_city.name, 'Newark')

        db.session.query(Cities).filter_by(name='Newark').delete()
        db.session.commit()

    def test_city_insert_4(self):
        new_city = Cities(name='Jasper', state=fake.state_abbr(include_territories=True), latitude=r.uniform(40.0, 70.0),
                          longitude=r.uniform(40.0, 70.0), population=r.randrange(1, 1000000),
                          description=fake.text())
        db.session.add(new_city)
        db.session.commit()

        query_city = db.session.query(Cities).filter_by(name='Jasper').one()
        self.assertEqual(query_city.name, 'Jasper')

        db.session.query(Cities).filter_by(name='Jasper').delete()
        db.session.commit()

    def test_city_insert_5(self):
        new_city = Cities(name='Lima', state=fake.state_abbr(include_territories=True), latitude=r.uniform(40.0, 70.0),
                          longitude=r.uniform(40.0, 70.0), population=r.randrange(1, 1000000),
                          description=fake.text())
        db.session.add(new_city)
        db.session.commit()

        query_city = db.session.query(Cities).filter_by(name='Lima').one()
        self.assertEqual(query_city.name, 'Lima')

        db.session.query(Cities).filter_by(name='Lima').delete()
        db.session.commit()

    def test_city_update_6(self):
        new_city = Cities(name='Lima', state='OH', latitude=r.uniform(40.0, 70.0),
                          longitude=r.uniform(40.0, 70.0), population=r.randrange(1, 1000000),
                          description=fake.text())
        db.session.add(new_city)
        db.session.commit()

        query_city = db.session.query(Cities).filter_by(name='Lima').one()
        self.assertEqual(query_city.state, 'OH')

        db.session.query(Cities).filter_by(name='Lima').update(
            {Cities.state: 'TN'}, synchronize_session=False)
        db.session.commit()
        query_updated = db.session.query(Cities).filter_by(name='Lima').one()
        self.assertEqual(query_updated.state, 'TN')

        db.session.query(Cities).filter_by(name='Lima').delete()
        db.session.commit()

    def test_city_update_7(self):
        new_city = Cities(name='Lima', state='OH', latitude=r.uniform(40.0, 70.0),
                          longitude=r.uniform(40.0, 70.0), population=10,
                          description=fake.text())
        db.session.add(new_city)
        db.session.commit()

        query_city = db.session.query(Cities).filter_by(name='Lima').one()
        self.assertEqual(query_city.population, 10)

        db.session.query(Cities).filter_by(name='Lima').update(
            {Cities.population: 111000}, synchronize_session=False)
        db.session.commit()
        query_updated = db.session.query(Cities).filter_by(name='Lima').one()
        self.assertEqual(query_updated.population, 111000)

        db.session.query(Cities).filter_by(name='Lima').delete()
        db.session.commit()

    def test_city_update_8(self):
        new_city = Cities(name='Lima', state='OH', latitude=r.uniform(40.0, 70.0),
                          longitude=r.uniform(40.0, 70.0), population=r.randrange(1, 1000000),
                          description='Description of the city')
        db.session.add(new_city)
        db.session.commit()

        query_city = db.session.query(Cities).filter_by(name='Lima').one()
        self.assertEqual(query_city.description, 'Description of the city')

        db.session.query(Cities).filter_by(name='Lima').update(
            {Cities.description: 'More thourough description of city'}, synchronize_session=False)
        db.session.commit()
        query_updated = db.session.query(Cities).filter_by(name='Lima').one()
        self.assertEqual(query_updated.description,
                         'More thourough description of city')

        db.session.query(Cities).filter_by(name='Lima').delete()
        db.session.commit()

    def test_city_update_9(self):
        new_city = Cities(name='Burwell', state='NE', latitude=r.uniform(40.0, 70.0),
                          longitude=r.uniform(40.0, 70.0), population=r.randrange(1, 1000000),
                          description=fake.text())
        db.session.add(new_city)
        db.session.commit()

        query_city = db.session.query(Cities).filter_by(name='Burwell').one()
        self.assertEqual(query_city.state, 'NE')

        db.session.query(Cities).filter_by(name='Burwell').update(
            {Cities.state: 'WA'}, synchronize_session=False)
        db.session.commit()
        query_updated = db.session.query(
            Cities).filter_by(name='Burwell').one()
        self.assertEqual(query_updated.state, 'WA')

        db.session.query(Cities).filter_by(name='Burwell').delete()
        db.session.commit()

    def test_city_update_10(self):
        new_city = Cities(name='Pueblo', state='CO', latitude=r.uniform(40.0, 70.0),
                          longitude=r.uniform(40.0, 70.0), population=2,
                          description=fake.text())
        db.session.add(new_city)
        db.session.commit()

        query_city = db.session.query(Cities).filter_by(name='Pueblo').one()
        self.assertEqual(query_city.population, 2)

        db.session.query(Cities).filter_by(name='Pueblo').update(
            {Cities.population: 5000}, synchronize_session=False)
        db.session.commit()
        query_updated = db.session.query(Cities).filter_by(name='Pueblo').one()
        self.assertEqual(query_updated.population, 5000)

        db.session.query(Cities).filter_by(name='Pueblo').delete()
        db.session.commit()


class DatabaseTestsAirbnb(unittest.TestCase):
    def test_listing_insert_1(self):
        new_city = Cities(name='Lima', state=fake.state_abbr(include_territories=True), latitude=r.uniform(40.0, 70.0),
                          longitude=r.uniform(40.0, 70.0), population=r.randrange(1, 1000000),
                          description=fake.text())
        db.session.add(new_city)
        db.session.commit()

        new_listing = Airbnb(id=4000001.0, listing_url=fake.image_url(), name=fake.catch_phrase(),
                             description=fake.text(), transit=fake.text(), picture_url=fake.image_url(),
                             city='Lima', state='TX', smart_location='Lima, TX', latitude=r.uniform(40.0, 70.0),
                             longitude=r.uniform(40.0, 70.0), room_type=fake.bs(), accomodates=r.uniform(2.0, 15.0),
                             amenities="{stuff}",
                             price='$1', number_of_reviews=r.uniform(2.0, 40.0), review_scores_rating=r.uniform(2.0, 98.0),
                             city_name='Lima')

        db.session.add(new_listing)
        db.session.commit()

        query_listings = db.session.query(Airbnb).filter_by(id=4000001.0).one()
        self.assertEqual(query_listings.id, 4000001.0)

        query_listings = db.session.query(
            Airbnb).filter_by(id=4000001.0).delete()
        db.session.commit()
        query_cities = db.session.query(
            Cities).filter_by(name='Lima').delete()
        db.session.commit()

    def test_listing_insert_2(self):
        new_city = Cities(name='Pueblo', state='CO', latitude=r.uniform(40.0, 70.0),
                          longitude=r.uniform(40.0, 70.0), population=2,
                          description=fake.text())
        db.session.add(new_city)
        db.session.commit()

        new_listing = Airbnb(id=4000002.0, listing_url=fake.image_url(), name=fake.catch_phrase(),
                             description=fake.text(), transit=fake.text(), picture_url=fake.image_url(),
                             city='Pueblo', state='CO', smart_location='Pueblo, CO', latitude=r.uniform(40.0, 70.0),
                             longitude=r.uniform(40.0, 70.0), room_type=fake.bs(), accomodates=r.uniform(2.0, 15.0),
                             amenities="{stuff}",
                             price='$1', number_of_reviews=r.uniform(2.0, 40.0), review_scores_rating=r.uniform(2.0, 98.0),
                             city_name='Pueblo')

        db.session.add(new_listing)
        db.session.commit()

        query_listings = db.session.query(Airbnb).filter_by(id=4000002.0).one()
        self.assertEqual(query_listings.id, 4000002.0)

        query_listings = db.session.query(
            Airbnb).filter_by(id=4000002.0).delete()
        db.session.commit()

        db.session.query(Cities).filter_by(name='Pueblo').delete()
        db.session.commit()

    def test_listing_insert_3(self):
        new_city = Cities(name='Burwell', state='NE', latitude=r.uniform(40.0, 70.0),
                          longitude=r.uniform(40.0, 70.0), population=r.randrange(1, 1000000),
                          description=fake.text())
        db.session.add(new_city)
        db.session.commit()

        new_listing = Airbnb(id=4000003.0, listing_url=fake.image_url(), name=fake.catch_phrase(),
                             description=fake.text(), transit=fake.text(), picture_url=fake.image_url(),
                             city='Burwell', state='NE', smart_location='Burwell,NE', latitude=r.uniform(40.0, 70.0),
                             longitude=r.uniform(40.0, 70.0), room_type=fake.bs(), accomodates=r.uniform(2.0, 15.0),
                             amenities="{stuff}",
                             price='$1', number_of_reviews=r.uniform(2.0, 40.0), review_scores_rating=r.uniform(2.0, 98.0),
                             city_name='Burwell')

        db.session.add(new_listing)
        db.session.commit()

        query_listings = db.session.query(Airbnb).filter_by(id=4000003.0).one()
        self.assertEqual(query_listings.price, '$1')

        query_listings = db.session.query(
            Airbnb).filter_by(id=4000003.0).delete()
        db.session.commit()

        db.session.query(Cities).filter_by(name='Burwell').delete()
        db.session.commit()

    def test_listing_insert_4(self):
        new_city = Cities(name='Jasper', state=fake.state_abbr(include_territories=True), latitude=r.uniform(40.0, 70.0),
                          longitude=r.uniform(40.0, 70.0), population=r.randrange(1, 1000000),
                          description=fake.text())
        db.session.add(new_city)
        db.session.commit()

        new_listing = Airbnb(id=4000004.0, listing_url=fake.image_url(), name=fake.catch_phrase(),
                             description=fake.text(), transit=fake.text(), picture_url=fake.image_url(),
                             city='Jasper', state='TX', smart_location='Jasper,TX', latitude=r.uniform(40.0, 70.0),
                             longitude=r.uniform(40.0, 70.0), room_type=fake.bs(), accomodates=r.uniform(2.0, 15.0),
                             amenities="{stuff}",
                             price='$1', number_of_reviews=r.uniform(2.0, 40.0), review_scores_rating=r.uniform(2.0, 98.0),
                             city_name='Jasper')

        db.session.add(new_listing)
        db.session.commit()

        query_listings = db.session.query(Airbnb).filter_by(id=4000004.0).one()
        self.assertEqual(query_listings.smart_location, 'Jasper,TX')

        query_listings = db.session.query(
            Airbnb).filter_by(id=4000004.0).delete()
        db.session.commit()

        db.session.query(Cities).filter_by(name='Jasper').delete()
        db.session.commit()

    def test_listing_update_5(self):
        new_city = Cities(name='Jasper', state=fake.state_abbr(include_territories=True), latitude=r.uniform(40.0, 70.0),
                          longitude=r.uniform(40.0, 70.0), population=r.randrange(1, 1000000),
                          description=fake.text())
        db.session.add(new_city)
        db.session.commit()

        new_listing = Airbnb(id=4000005.0, listing_url=fake.image_url(), name=fake.catch_phrase(),
                             description='some description', transit=fake.text(), picture_url=fake.image_url(),
                             city='Jasper', state='TX', smart_location='Jasper,TX', latitude=r.uniform(40.0, 70.0),
                             longitude=r.uniform(40.0, 70.0), room_type=fake.bs(), accomodates=r.uniform(2.0, 15.0),
                             amenities="{stuff}",
                             price='$1', number_of_reviews=r.uniform(2.0, 40.0), review_scores_rating=r.uniform(2.0, 98.0),
                             city_name='Jasper')

        db.session.add(new_listing)
        db.session.commit()

        query_listing = db.session.query(Airbnb).filter_by(id=4000005.0).one()
        self.assertEqual(query_listing.price, '$1')

        db.session.query(Airbnb).filter_by(id=4000005.0).update(
            {Airbnb.price: '$500'}, synchronize_session=False)
        db.session.commit()
        query_updated = db.session.query(Airbnb).filter_by(id=4000005.0).one()
        self.assertEqual(query_updated.price, '$500')

        db.session.query(Airbnb).filter_by(id=4000005.0).delete()
        db.session.commit()

        db.session.query(Cities).filter_by(name='Jasper').delete()
        db.session.commit()

    def test_listing_update_6(self):
        new_city = Cities(name='Jasper', state=fake.state_abbr(include_territories=True), latitude=r.uniform(40.0, 70.0),
                          longitude=r.uniform(40.0, 70.0), population=r.randrange(1, 1000000),
                          description=fake.text())
        db.session.add(new_city)
        db.session.commit()

        new_listing = Airbnb(id=4000006.0, listing_url=fake.image_url(), name=fake.catch_phrase(),
                             description='some description', transit=fake.text(), picture_url=fake.image_url(),
                             city='Jasper', state='TX', smart_location='Jasper,TX', latitude=r.uniform(40.0, 70.0),
                             longitude=r.uniform(40.0, 70.0), room_type=fake.bs(), accomodates=r.uniform(2.0, 15.0),
                             amenities="{stuff}",
                             price='$1', number_of_reviews=r.uniform(2.0, 40.0), review_scores_rating=r.uniform(2.0, 98.0),
                             city_name='Jasper')

        db.session.add(new_listing)
        db.session.commit()

        query_listing = db.session.query(Airbnb).filter_by(id=4000006.0).one()
        self.assertEqual(query_listing.price, '$1')

        db.session.query(Airbnb).filter_by(id=4000006.0).update(
            {Airbnb.price: '$7000'}, synchronize_session=False)
        db.session.commit()
        query_updated = db.session.query(Airbnb).filter_by(id=4000006.0).one()
        self.assertEqual(query_updated.price, '$7000')

        db.session.query(Airbnb).filter_by(id=4000006.0).delete()
        db.session.commit()

        db.session.query(Cities).filter_by(name='Jasper').delete()
        db.session.commit()

    def test_listing_update_7(self):
        new_city = Cities(name='Burwell', state='NE', latitude=r.uniform(40.0, 70.0),
                          longitude=r.uniform(40.0, 70.0), population=r.randrange(1, 1000000),
                          description=fake.text())
        db.session.add(new_city)
        db.session.commit()

        new_listing = Airbnb(id=4000007.0, listing_url=fake.image_url(), name=fake.catch_phrase(),
                             description='some description', transit=fake.text(), picture_url=fake.image_url(),
                             city='Burwell', state='NE', smart_location='Burwell,NE', latitude=r.uniform(40.0, 70.0),
                             longitude=r.uniform(40.0, 70.0), room_type=fake.bs(), accomodates=r.uniform(2.0, 15.0),
                             amenities="{stuff}",
                             price='$1', number_of_reviews=r.uniform(2.0, 40.0), review_scores_rating=r.uniform(2.0, 98.0),
                             city_name='Burwell')

        db.session.add(new_listing)
        db.session.commit()

        query_listing = db.session.query(Airbnb).filter_by(id=4000007.0).one()
        self.assertEqual(query_listing.description, 'some description')

        db.session.query(Airbnb).filter_by(id=4000007.0).update(
            {Airbnb.description: 'super descriptive description'}, synchronize_session=False)
        db.session.commit()
        query_updated = db.session.query(Airbnb).filter_by(id=4000007.0).one()
        self.assertEqual(query_updated.description,
                         'super descriptive description')

        db.session.query(Airbnb).filter_by(id=4000007.0).delete()
        db.session.commit()

        db.session.query(Cities).filter_by(name='Burwell').delete()
        db.session.commit()

    def test_listing_update_8(self):
        new_city = Cities(name='Burwell', state='NE', latitude=r.uniform(40.0, 70.0),
                          longitude=r.uniform(40.0, 70.0), population=r.randrange(1, 1000000),
                          description=fake.text())
        db.session.add(new_city)
        db.session.commit()

        new_listing = Airbnb(id=4000008.0, listing_url=fake.image_url(), name=fake.catch_phrase(),
                             description='some description', transit=fake.text(), picture_url=fake.image_url(),
                             city='Burwell', state='NE', smart_location='Burwell,NE', latitude=r.uniform(40.0, 70.0),
                             longitude=r.uniform(40.0, 70.0), room_type=fake.bs(), accomodates=r.uniform(2.0, 15.0),
                             amenities="{stuff}",
                             price='$1', number_of_reviews=r.uniform(2.0, 40.0), review_scores_rating=r.uniform(2.0, 98.0),
                             city_name='Burwell')

        db.session.add(new_listing)
        db.session.commit()

        query_listing = db.session.query(Airbnb).filter_by(id=4000008.0).one()
        self.assertEqual(query_listing.amenities, "{stuff}")

        db.session.query(Airbnb).filter_by(id=4000008.0).update(
            {Airbnb.amenities: '{stuff, more stuff, and more stuff}'}, synchronize_session=False)
        db.session.commit()
        query_updated = db.session.query(Airbnb).filter_by(id=4000008.0).one()
        self.assertEqual(query_updated.amenities,
                         '{stuff, more stuff, and more stuff}')

        db.session.query(Airbnb).filter_by(id=4000008.0).delete()
        db.session.commit()

        db.session.query(Cities).filter_by(name='Burwell').delete()
        db.session.commit()

    def test_listing_update_9(self):
        new_city = Cities(name='Burwell', state='NE', latitude=r.uniform(40.0, 70.0),
                          longitude=r.uniform(40.0, 70.0), population=r.randrange(1, 1000000),
                          description=fake.text())
        db.session.add(new_city)
        db.session.commit()

        new_listing = Airbnb(id=4000009.0, listing_url=fake.image_url(), name='awesome listing',
                             description='some description', transit=fake.text(), picture_url=fake.image_url(),
                             city='Burwell', state='NE', smart_location='Burwell,NE', latitude=r.uniform(40.0, 70.0),
                             longitude=r.uniform(40.0, 70.0), room_type=fake.bs(), accomodates=r.uniform(2.0, 15.0),
                             amenities="{stuff}",
                             price='$1', number_of_reviews=r.uniform(2.0, 40.0), review_scores_rating=r.uniform(2.0, 98.0),
                             city_name='Burwell')

        db.session.add(new_listing)
        db.session.commit()

        query_listing = db.session.query(Airbnb).filter_by(id=4000009.0).one()
        self.assertEqual(query_listing.name, "awesome listing")

        db.session.query(Airbnb).filter_by(id=4000009.0).update(
            {Airbnb.name: 'awesome listing with lots of stuff'}, synchronize_session=False)
        db.session.commit()
        query_updated = db.session.query(Airbnb).filter_by(id=4000009.0).one()
        self.assertEqual(query_updated.name,
                         'awesome listing with lots of stuff')

        db.session.query(Airbnb).filter_by(id=4000009.0).delete()
        db.session.commit()

        db.session.query(Cities).filter_by(name='Burwell').delete()
        db.session.commit()

    def test_listing_update_10(self):
        new_city = Cities(name='Jasper', state=fake.state_abbr(include_territories=True), latitude=r.uniform(40.0, 70.0),
                          longitude=r.uniform(40.0, 70.0), population=r.randrange(1, 1000000),
                          description=fake.text())
        db.session.add(new_city)
        db.session.commit()

        new_listing = Airbnb(id=4000010.0, listing_url=fake.image_url(), name=fake.catch_phrase(),
                             description='some description', transit=fake.text(), picture_url=fake.image_url(),
                             city='Jasper', state='TX', smart_location='Jasper,TX', latitude=r.uniform(40.0, 70.0),
                             longitude=r.uniform(40.0, 70.0), room_type=fake.bs(), accomodates=r.uniform(2.0, 15.0),
                             amenities="{stuff}",
                             price='$1', number_of_reviews=r.uniform(2.0, 40.0), review_scores_rating=r.uniform(2.0, 98.0),
                             city_name='Jasper')

        db.session.add(new_listing)
        db.session.commit()

        query_listing = db.session.query(Airbnb).filter_by(id=4000010.0).one()
        self.assertEqual(query_listing.price, "$1")

        db.session.query(Airbnb).filter_by(id=4000010.0).update(
            {Airbnb.price: '$600'}, synchronize_session=False)
        db.session.commit()
        query_updated = db.session.query(Airbnb).filter_by(id=4000010.0).one()
        self.assertEqual(query_updated.price,
                         '$600')

        db.session.query(Airbnb).filter_by(id=4000010.0).delete()
        db.session.commit()

        db.session.query(Cities).filter_by(name='Jasper').delete()
        db.session.commit()


class AboutPageTests(unittest.TestCase):
    
    def test_connect_gitlab(self):
        response = requests.get(url)
        self.assertEqual(response.status_code, 200)

    def test_commit_about_1(self):
        with app.app_context():
            about_data = about()
            self.assertTrue(about_data)
    
    def test_commit_about_2(self):
        with app.app_context():
            about_data = about()
            self.assertEqual(about_data['about'][0]['name'], 'Yulissa Montes')

    def test_commit_about_3(self):
        with app.app_context():
            about_data = about()
            about_data = jsonify(about_data.json['about'])
            self.assertTrue(about_data['about'][0]['stats']['commits']>0)

    def test_commit_about_4(self):
        with app.app_context():
            about_data = about()
            self.assertTrue(about_data['about'][0]['stats']['issues']>0)

    def test_get_gitlab_1(self):
        gitlab_data = get_gitlab_data(f"{url}/repository/commits")
        self.assertTrue(gitlab_data)
    
    def test_get_gitlab_2(self):
        gitlab_data = get_gitlab_data(f"{url}/issues")
        self.assertTrue(gitlab_data)



if __name__ == '__main__':
    unittest.main()
