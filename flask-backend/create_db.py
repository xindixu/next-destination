import psycopg2
from models import app, db, Cities, Airbnb

def create_cities():
    db_connection = psycopg2.connect(
        "host=city-hunt-267820 dbname=database-city-hunt user=postgres password=zxcvbn12 port=us-central1")
    cur = db_connection.cursor()

    with open('id_city_data.csv', 'r') as city:
        # skip headers
        next(city)
        cur.copy_from(city, 'cities', sep=',')
        db_connection.commit()


def create_airbnb_listings():
    db_connection = psycopg2.connect(
        "host=city-hunt-267820 dbname=database-city-hunt user=postgres password=zxcvbn12 port=us-central1")
    cur = db_connection.cursor()

    with open('cleaned_us_airbnb_data.csv', 'r') as listing:
        # skipping headers
        next(listing)
        cur.copy_from(listing, 'airbnb', sep='|')
        db_connection.commit()


create_cities()
create_airbnb_listings()
