from models import db, Cities, Airbnb
from faker import Faker
from flask_sqlalchemy import SQLAlchemy
import unittest
import random as r

fake = Faker()


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
        new_listing = Airbnb(id=4000001.0, listing_url=fake.image_url(), name=fake.catch_phrase(),
                             description=fake.text(), transit=fake.text(), picture_url=fake.image_url(),
                             city='Austin', state='TX', smart_location='Austin, TX', latitude=r.uniform(40.0, 70.0),
                             longitude=r.uniform(40.0, 70.0), room_type=fake.bs(), accomodates=r.uniform(2.0, 15.0),
                             amenities="{stuff}",
                             price='$1', number_of_reviews=r.uniform(2.0, 40.0), review_scores_rating=r.uniform(2.0, 98.0),
                             city_name='Austin')

        db.session.add(new_listing)
        db.session.commit()

        query_listings = db.session.query(Airbnb).filter_by(id=4000001.0).one()
        self.assertEqual(query_listings.id, 4000001.0)

        query_listings = db.session.query(
            Airbnb).filter_by(id=4000001.0).delete()
        db.session.commit()

    def test_listing_insert_2(self):
        new_listing = Airbnb(id=4000002.0, listing_url=fake.image_url(), name=fake.catch_phrase(),
                             description=fake.text(), transit=fake.text(), picture_url=fake.image_url(),
                             city='New York City', state='NY', smart_location='New York City, NY', latitude=r.uniform(40.0, 70.0),
                             longitude=r.uniform(40.0, 70.0), room_type=fake.bs(), accomodates=r.uniform(2.0, 15.0),
                             amenities="{stuff}",
                             price='$1', number_of_reviews=r.uniform(2.0, 40.0), review_scores_rating=r.uniform(2.0, 98.0),
                             city_name='New York City')

        db.session.add(new_listing)
        db.session.commit()

        query_listings = db.session.query(Airbnb).filter_by(id=4000002.0).one()
        self.assertEqual(query_listings.id, 4000002.0)

        query_listings = db.session.query(
            Airbnb).filter_by(id=4000002.0).delete()
        db.session.commit()

    def test_listing_insert_3(self):
        new_listing = Airbnb(id=4000003.0, listing_url=fake.image_url(), name=fake.catch_phrase(),
                             description=fake.text(), transit=fake.text(), picture_url=fake.image_url(),
                             city='Tucson', state='AZ', smart_location='Tucson,AZ', latitude=r.uniform(40.0, 70.0),
                             longitude=r.uniform(40.0, 70.0), room_type=fake.bs(), accomodates=r.uniform(2.0, 15.0),
                             amenities="{stuff}",
                             price='$1', number_of_reviews=r.uniform(2.0, 40.0), review_scores_rating=r.uniform(2.0, 98.0),
                             city_name='Tucson')

        db.session.add(new_listing)
        db.session.commit()

        query_listings = db.session.query(Airbnb).filter_by(id=4000003.0).one()
        self.assertEqual(query_listings.price, '$1')

        query_listings = db.session.query(
            Airbnb).filter_by(id=4000003.0).delete()
        db.session.commit()

    def test_listing_insert_4(self):
        new_listing = Airbnb(id=4000004.0, listing_url=fake.image_url(), name=fake.catch_phrase(),
                             description=fake.text(), transit=fake.text(), picture_url=fake.image_url(),
                             city='Bakersfield', state='CA', smart_location='Bakersfield,CA', latitude=r.uniform(40.0, 70.0),
                             longitude=r.uniform(40.0, 70.0), room_type=fake.bs(), accomodates=r.uniform(2.0, 15.0),
                             amenities="{stuff}",
                             price='$1', number_of_reviews=r.uniform(2.0, 40.0), review_scores_rating=r.uniform(2.0, 98.0),
                             city_name='Bakersfield')

        db.session.add(new_listing)
        db.session.commit()

        query_listings = db.session.query(Airbnb).filter_by(id=4000004.0).one()
        self.assertEqual(query_listings.smart_location, 'Bakersfield,CA')

        query_listings = db.session.query(
            Airbnb).filter_by(id=4000004.0).delete()
        db.session.commit()

    def test_listing_insert_5(self):
        new_listing = Airbnb(id=4000005.0, listing_url=fake.image_url(), name=fake.catch_phrase(),
                             description='some description', transit=fake.text(), picture_url=fake.image_url(),
                             city='Reno', state='NV', smart_location='Reno,NV', latitude=r.uniform(40.0, 70.0),
                             longitude=r.uniform(40.0, 70.0), room_type=fake.bs(), accomodates=r.uniform(2.0, 15.0),
                             amenities="{stuff}",
                             price='$1', number_of_reviews=r.uniform(2.0, 40.0), review_scores_rating=r.uniform(2.0, 98.0),
                             city_name='Reno')

        db.session.add(new_listing)
        db.session.commit()

        query_listings = db.session.query(Airbnb).filter_by(id=4000005.0).one()
        self.assertEqual(query_listings.description, 'some description')

        query_listings = db.session.query(
            Airbnb).filter_by(id=4000005.0).delete()
        db.session.commit()

    def test_listing_update_6(self):
        new_listing = Airbnb(id=4000006.0, listing_url=fake.image_url(), name=fake.catch_phrase(),
                             description='some description', transit=fake.text(), picture_url=fake.image_url(),
                             city='Reno', state='NV', smart_location='Reno,NV', latitude=r.uniform(40.0, 70.0),
                             longitude=r.uniform(40.0, 70.0), room_type=fake.bs(), accomodates=r.uniform(2.0, 15.0),
                             amenities="{stuff}",
                             price='$1', number_of_reviews=r.uniform(2.0, 40.0), review_scores_rating=r.uniform(2.0, 98.0),
                             city_name='Reno')

        db.session.add(new_listing)
        db.session.commit()

        query_listing = db.session.query(Airbnb).filter_by(id=4000006.0).one()
        self.assertEqual(query_listing.price, '$1')

        db.session.query(Airbnb).filter_by(id=4000006.0).update(
            {Airbnb.price: '$500'}, synchronize_session=False)
        db.session.commit()
        query_updated = db.session.query(Airbnb).filter_by(id=4000006.0).one()
        self.assertEqual(query_updated.price, '$500')

        db.session.query(Airbnb).filter_by(id=4000006.0).delete()
        db.session.commit()

    def test_listing_update_7(self):
        new_listing = Airbnb(id=4000007.0, listing_url=fake.image_url(), name=fake.catch_phrase(),
                             description='some description', transit=fake.text(), picture_url=fake.image_url(),
                             city='New York City', state='NY', smart_location='New York City,NY', latitude=r.uniform(40.0, 70.0),
                             longitude=r.uniform(40.0, 70.0), room_type=fake.bs(), accomodates=r.uniform(2.0, 15.0),
                             amenities="{stuff}",
                             price='$1', number_of_reviews=r.uniform(2.0, 40.0), review_scores_rating=r.uniform(2.0, 98.0),
                             city_name='New York City')

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

    def test_listing_update_8(self):
        new_listing = Airbnb(id=4000008.0, listing_url=fake.image_url(), name=fake.catch_phrase(),
                             description='some description', transit=fake.text(), picture_url=fake.image_url(),
                             city='New York City', state='NY', smart_location='New York City,NY', latitude=r.uniform(40.0, 70.0),
                             longitude=r.uniform(40.0, 70.0), room_type=fake.bs(), accomodates=r.uniform(2.0, 15.0),
                             amenities="{stuff}",
                             price='$1', number_of_reviews=r.uniform(2.0, 40.0), review_scores_rating=r.uniform(2.0, 98.0),
                             city_name='New York City')

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

    def test_listing_update_9(self):
        new_listing = Airbnb(id=4000009.0, listing_url=fake.image_url(), name='awesome listing',
                             description='some description', transit=fake.text(), picture_url=fake.image_url(),
                             city='Portland', state='OR', smart_location='Portland,OR', latitude=r.uniform(40.0, 70.0),
                             longitude=r.uniform(40.0, 70.0), room_type=fake.bs(), accomodates=r.uniform(2.0, 15.0),
                             amenities="{stuff}",
                             price='$1', number_of_reviews=r.uniform(2.0, 40.0), review_scores_rating=r.uniform(2.0, 98.0),
                             city_name='Portland')

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

    def test_listing_update_10(self):
        new_listing = Airbnb(id=4000010.0, listing_url=fake.image_url(), name=fake.catch_phrase(),
                             description='some description', transit=fake.text(), picture_url=fake.image_url(),
                             city='Virginia Beach', state='VA', smart_location='Virginia Beach,VA', latitude=r.uniform(40.0, 70.0),
                             longitude=r.uniform(40.0, 70.0), room_type=fake.bs(), accomodates=r.uniform(2.0, 15.0),
                             amenities="{stuff}",
                             price='$1', number_of_reviews=r.uniform(2.0, 40.0), review_scores_rating=r.uniform(2.0, 98.0),
                             city_name='Virginia Beach')

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


if __name__ == '__main__':
    unittest.main()
