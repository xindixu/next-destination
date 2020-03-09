from models import db, Cities
from faker import Faker
from flask_sqlalchemy import SQLAlchemy
import unittest
import random as r

fake = Faker()


class DatabaseTests(unittest.TestCase):
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


if __name__ == '__main__':
    unittest.main()