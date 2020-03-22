from flask import Flask, render_template, request, redirect, url_for, jsonify, abort, Response
from flask_cors import CORS, cross_origin
from sqlalchemy import create_engine, or_, func, desc
import requests
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import sessionmaker
import json
from models import Airbnb, Cities, app, db

from data import about_data, member_contribs
from api import yelp_api_header

# ! for some reason this code does not work when it is put into the __name__ if statment
CORS(app, resources=r'/*')
engine = create_engine(
    'postgres+psycopg2://postgres:supersecret@localhost:5432/cityhuntdb')
Session = sessionmaker(bind=engine)
session = Session()
# ! end of code that doesn't work

# Helper functions


def get_offset(page, page_size):
    return (page-1)*page_size


def convert_to_array_of_dict(instances):
    return [convert_to_dict(i) for i in instances]


def convert_to_dict(instance):
    result_dict = {}
    instance_dict = instance.__dict__
    instance_dict.pop('_sa_instance_state', None)
    for key, value in instance_dict.items():
        result_dict[key] = value
    return result_dict

def get_data_from_database(model, name,  page, sort, *city):
    LIMIT = 20
    total = session.query(model).count()
    
    if page * LIMIT > total:
        session.rollback()
        abort(404, description=f"Page cannot exceed {MAX_PAGE_NUM}")
    if city:
        total = session.query(model).filter_by(city_name = city).count()
        if sort:
            data = session.query(model).filter_by(city_name = city).order_by(getattr(model, sort).asc()).limit(
                LIMIT).offset(get_offset(page, LIMIT)).all()
        else:
            data = session.query(model).filter_by(city_name = city).limit(
                LIMIT).offset(get_offset(page, LIMIT)).all()
    else:
        if sort:
            data = session.query(model).order_by(getattr(model, sort).asc()).limit(
                LIMIT).offset(get_offset(page, LIMIT)).all()
        else:
            data = session.query(model).limit(
                LIMIT).offset(get_offset(page, LIMIT)).all()

    dictionary = convert_to_array_of_dict(data)
    response = {
        name: dictionary,
        "total": total
    }

    return jsonify(response=response)

def get_gitlab_data(url):
    data = []
    page = 1
    params = {"scope": "all", "per_page": 100, page: page}
    request = requests.get(url, params=params)

    while page <= int(request.headers["X-Total-Pages"]):
        data.extend(request.json())
        page += 1
        request = requests.get(url, params=params)
    return data

# Routes
@app.route('/api/about')
def about():
    
    member_contribs["marshall"]["commits"] = 0
    member_contribs["xindi"]["commits"] = 0
    member_contribs["yulissa"]["commits"] = 0
    member_contribs["nathan"]["commits"] = 0
    member_contribs["quinton"]["commits"] = 0
    member_contribs["marshall"]["issues"] = 0
    member_contribs["xindi"]["issues"] = 0
    member_contribs["yulissa"]["issues"] = 0
    member_contribs["nathan"]["issues"] = 0
    member_contribs["quinton"]["issues"] = 0

    url = "https://gitlab.com/api/v4/projects/16729459"
    commits = get_gitlab_data(f"{url}/repository/commits")
    issues = get_gitlab_data(f"{url}/issues")

    for commit in commits:
        if commit["committer_email"] == "marshallmhayhurst@gmail.com":
            member_contribs["marshall"]["commits"] += 1
        elif commit["committer_email"] == "xindixu@utexas.edu":
            member_contribs["xindi"]["commits"] += 1
        elif commit["committer_email"] == "yulissa.montes@utexas.edu":
            member_contribs["yulissa"]["commits"] += 1
        elif commit["committer_email"] == "n.craig@gmail.com":
            member_contribs["nathan"]["commits"] += 1
        elif commit["committer_email"] == "quintonpham@gmail.com":
            member_contribs["quinton"]["commits"] += 1

    for issue in issues:
        if issue["author"]["username"] == "mam23942":
            member_contribs["marshall"]["issues"] += 1
        elif issue["author"]["username"] == "xindixu":
            member_contribs["xindi"]["issues"] += 1
        elif issue["author"]["username"] == "yulissa.montes":
            member_contribs["yulissa"]["issues"] += 1
        elif issue["author"]["username"] == "nmcraig":
            member_contribs["nathan"]["issues"] += 1
        elif issue["author"]["username"] == "quintonpham":
            member_contribs["quinton"]["issues"] += 1

    return jsonify(about=about_data)

# ! the user needs to allow the location prompt or else the page and backend will show blank
# Event routes
@app.route('/api/events')
def events_page():
    longitude = request.args.get('longitude', type=float)
    latitude = request.args.get('latitude', type=float)

    MAX_PAGE_NUM = 50
    LIMIT = 20
    page = request.args.get('page', default=1, type=int)
    if page > MAX_PAGE_NUM:
        abort(404, description=f"Page cannot exceed {MAX_PAGE_NUM}")

    sort = request.args.get('sort', default="time_start", type=str)

    url = "https://api.yelp.com/v3/events"
    params = {
        "longitude": longitude,
        "latitude": latitude,
        "limit": LIMIT,
        "offset": get_offset(page, LIMIT),
        "sort_on": sort
    }
    response = requests.get(url, params=params, headers=yelp_api_header).json()
    return jsonify(response=response)

@app.route('/api/events/<string:city>')
def events(city):
    # Per yelp documentation, it cannot return more than 1000 results if offset and limit are used
    MAX_PAGE_NUM = 50
    LIMIT = 20
    page = request.args.get('page', default=1, type=int)
    if page > MAX_PAGE_NUM:
        abort(404, description=f"Page cannot exceed {MAX_PAGE_NUM}")

    sort = request.args.get('sort', default="time_start", type=str)

    url = "https://api.yelp.com/v3/events"
    params = {
        "location": city,
        "limit": LIMIT,
        "offset": get_offset(page, LIMIT),
        "sort_on": sort
    }
    response = requests.get(url, params=params, headers=yelp_api_header).json()
    return jsonify(response=response)


@app.route('/api/event/<string:id>')
def event(id):
    # test: austin-yelps-open-party-2011-the-thriller-throwdown
    url = f"https://api.yelp.com/v3/events/{id}"
    response = requests.get(url, headers=yelp_api_header).json()
    return jsonify(response=response)

# Restaurants routes
@app.route('/api/restaurants')
def restaurants_page():
    longitude = request.args.get('longitude', type=float)
    latitude = request.args.get('latitude', type=float)
    
    MAX_PAGE_NUM = 50
    LIMIT = 20

    page = request.args.get('page', default=1, type=int)
    if page > MAX_PAGE_NUM:
        abort(404, description=f"Page cannot exceed {MAX_PAGE_NUM}")

    sort = request.args.get('sort', default="best_match", type=str)
    url = "https://api.yelp.com/v3/businesses/search"
    params = {
        "longitude": longitude,
        "latitude": latitude,
        "location": city,
        "limit": LIMIT,
        "offset": get_offset(page, LIMIT),
        "sort_by": sort
    }
    response = requests.get(url, params=params, headers=yelp_api_header).json()
    return jsonify(response=response)
    

@app.route('/api/restaurants/<string:city>')
def restaurants(city):
    # Per yelp documentation, it cannot return more than 1000 results if offset and limit are used
    MAX_PAGE_NUM = 50
    LIMIT = 20

    page = request.args.get('page', default=1, type=int)
    if page > MAX_PAGE_NUM:
        abort(404, description=f"Page cannot exceed {MAX_PAGE_NUM}")

    sort = request.args.get('sort', default="best_match", type=str)
    url = "https://api.yelp.com/v3/businesses/search"
    params = {
        "location": city,
        "limit": LIMIT,
        "offset": get_offset(page, LIMIT),
        "sort_by": sort
    }
    response = requests.get(url, params=params, headers=yelp_api_header).json()
    return jsonify(response=response)


@app.route('/api/restaurant/<string:id>')
def restaurant(id):
    # test: MGzro82Fi4LYvc86acoONQ
    url = f"https://api.yelp.com/v3/businesses/{id}"
    response = requests.get(url, headers=yelp_api_header).json()
    return jsonify(response=response)


# Airbnb routes
@app.route('/api/airbnbs', methods=["GET"])
def airbnbs_page():
    page = request.args.get('page', default=1, type=int)
    sort = request.args.get('sort', default="", type=str)
    return get_data_from_database(Airbnb, 'airbnbs',  page, sort)

@app.route('/api/airbnbs/<string:city>', methods=["GET"])
def airbnbs_per_city(city):
    page = request.args.get('page', default=1, type=int)
    sort = request.args.get('sort', default="", type=str)
    return get_data_from_database(Airbnb, 'airbnbs',  page, sort, city)

# City routes
@app.route('/api/cities', methods=["GET"])
def cities_page():
    page = request.args.get('page', default=1, type=int)
    sort = request.args.get('sort', default="", type=str)
    return get_data_from_database(Cities, 'cities',  page, sort)


@app.route('/api/city/<string:id>', methods=['GET'])
def city(id):
    try:
        city_data = session.query(Cities).filter_by(id=id).one_or_none()
        city_dict = convert_to_dict(city_data)
        return jsonify(city=city_dict)
    except:
        session.rollback()
        return 'ERROR SOMEWHERE'


@app.route('/')
def index():
    return render_template("index.html")


if __name__ == '__main__':
    app.run(debug=True)
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
