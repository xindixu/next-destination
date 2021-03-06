from flask import Flask, render_template, request, redirect, url_for, jsonify, abort, Response
from flask_cors import CORS
from sqlalchemy import create_engine, func
import requests
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import sessionmaker
import unittest
import ciunittest
import json
from models import Airbnb, Cities, app, db
import tests
from data import about_data, member_contribs
from api import yelp_api_header
import unittest
import ciunittest
import os

# ! for some reason this code does not work when it is put into the __name__ if statment
DB_STRING = os.environ.get(
    "DB_STRING", 'postgres://postgres:bone_ranger!1@localhost:5432/cityhuntdb')

CORS(app, resources=r'/*')
engine = create_engine(DB_STRING)
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


def get_data_from_database(model, name, page, sort, order, *city):
    LIMIT = 20
    if city:
        # airbnb route
        query = session.query(model).filter_by(city_name=city)
    else:
        query = session.query(model)

    total = query.count()
    if page * LIMIT > total:
        session.rollback()
        abort(404, description=f"Page out of range")

    if sort:
        query = query.order_by(getattr(model, sort).asc(
        ) if order == 'asc' else getattr(model, sort).desc())

    data = query.limit(LIMIT).offset(get_offset(page, LIMIT)).all()

    dictionary = convert_to_array_of_dict(data)
    response = {
        name: dictionary,
        "total": total
    }

    return jsonify(response=response)


def get_gitlab_data(url):
    data = []
    page = 1
    params = {"scope": "all", "per_page": 1000, page: page}
    request = requests.get(url, params=params)

    
    while page <= int(request.headers["X-Total-Pages"]):
        
        data.extend(request.json())
        page += 1
        request = requests.get(url, params=params)
    
    return data


@app.route('/api/unittests')
def unittests():
    suite = unittest.TestLoader().loadTestsFromModule(tests)
    json = ciunittest.JsonTestRunner().run(suite, formatted=True)
    return json

# Routes
@app.route('/api/about')
def about():
    member_contribs["marshall"]["commits"] = 74
    member_contribs["xindi"]["commits"] = 136
    member_contribs["yulissa"]["commits"] = 45
    member_contribs["nathan"]["commits"] = 51
    member_contribs["quinton"]["commits"] = 28
    member_contribs["marshall"]["issues"] = 20
    member_contribs["xindi"]["issues"] = 75
    member_contribs["yulissa"]["issues"] = 21
    member_contribs["nathan"]["issues"] = 18
    member_contribs["quinton"]["issues"] = 11

    # url = "https://gitlab.com/api/v4/projects/16729459"
    # commits = get_gitlab_data(f"{url}/repository/commits")
    # issues = get_gitlab_data(f"{url}/issues")


    
    # for commit in commits:
    #     if commit["author_email"] == "marshallmhayhurst@gmail.com":
    #         member_contribs["marshall"]["commits"] += 1
    #     elif commit["committer_email"] == "xindixu@utexas.edu":
    #         member_contribs["xindi"]["commits"] += 0.5
    #     elif commit["committer_email"] == "yulissa.montes@utexas.edu":
    #         member_contribs["yulissa"]["commits"] += 1
    #     elif commit["committer_email"] == "n.craig@gmail.com":
    #         member_contribs["nathan"]["commits"] += 1
    #     elif commit["committer_email"] == "quintonpham@gmail.com":
    #         member_contribs["quinton"]["commits"] += 1

    # for issue in issues:
    #     assignee_usernames = [assignee["username"] for assignee in issue["assignees"]]
        
    #     if "mam23942" in assignee_usernames:
    #         member_contribs["marshall"]["issues"] += 1
    #     if "xindixu" in assignee_usernames:
    #         member_contribs["xindi"]["issues"] += 0.5
    #     if "yulissa.montes" in assignee_usernames:
    #         member_contribs["yulissa"]["issues"] += 1
    #     if "nmcraig" in assignee_usernames:
    #         member_contribs["nathan"]["issues"] += 1
    #     if "quintonpham" in assignee_usernames:
    #         member_contribs["quinton"]["issues"] += 1
    return jsonify(about=about_data)

# Event helper functions


def events_endpoint(params):
    url = "https://api.yelp.com/v3/events"
    response = requests.get(url, params=params, headers=yelp_api_header).json()
    return response


def search_events(query, offset):
    LIMIT = 5
    params = {
        "term": query,
        "limit": LIMIT,
        "offset": offset,
        "location": "austin"
    }
    return events_endpoint(params)

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
    order = request.args.get('order', default="asc", type=str)

    url = "https://api.yelp.com/v3/events"
    params = {
        "longitude": longitude,
        "latitude": latitude,
        "limit": LIMIT,
        "offset": get_offset(page, LIMIT),
        "sort_on": sort,
        "sort_by": order
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
    order = request.args.get('order', default="asc", type=str)

    params = {
        "location": city,
        "limit": LIMIT,
        "offset": get_offset(page, LIMIT),
        "sort_on": sort,
        "sort_by": order
    }
    response = events_endpoint(params)
    return jsonify(response=response)


@app.route('/api/event/<string:id>')
def event(id):
    # test: austin-yelps-open-party-2011-the-thriller-throwdown
    url = f"https://api.yelp.com/v3/events/{id}"
    response = requests.get(url, headers=yelp_api_header).json()
    return jsonify(response=response)

# Restaurants category route
@app.route('/api/categories')
def categories():
    # TODO: consider saving this to db
    url = "https://api.yelp.com/v3/categories"
    params = {
        "locale": "en_US"
    }
    all_categories = requests.get(
        url, params=params, headers=yelp_api_header).json()["categories"]
    restaurant_categories = list(filter(
        lambda i: "restaurants" in i["parent_aliases"], all_categories))

    concise_restaurant_categories = list(
        map(lambda i: {"alias": i["alias"], "title": i["title"]}, restaurant_categories))

    return jsonify(response={"categories": concise_restaurant_categories})

# Restaurant helper functions


def restaurants_endpoint(params):
    url = "https://api.yelp.com/v3/businesses/search"
    response = requests.get(url, params=params, headers=yelp_api_header).json()
    return response


def search_restaurants(query, offset):
    LIMIT = 5
    params = {
        "term": query,
        "limit": LIMIT,
        "offset": offset,
        "location": "austin"
    }
    return restaurants_endpoint(params)

# Restaurants routes
@app.route('/api/restaurants')
def restaurants_page():
    longitude = request.args.get('longitude', type=float)
    latitude = request.args.get('latitude', type=float)
    categories = request.args.get('categories', default="", type=str)

    MAX_PAGE_NUM = 50
    LIMIT = 20

    page = request.args.get('page', default=1, type=int)
    if page > MAX_PAGE_NUM:
        abort(404, description=f"Page cannot exceed {MAX_PAGE_NUM}")

    sort = request.args.get('sort', default="best_match", type=str)
    params = {
        "term": "restaurants",
        "longitude": longitude,
        "latitude": latitude,
        "location": city,
        "limit": LIMIT,
        "offset": get_offset(page, LIMIT),
        "sort_by": sort,
        "categories": categories
    }
    response = restaurants_endpoint(params)
    return jsonify(response=response)


@app.route('/api/restaurants/<string:city>')
def restaurants(city):
    # Yelp restaurant api doesn't accept sort order (ascending or decending) setting
    # Per yelp documentation, it cannot return more than 1000 results if offset and limit are used
    MAX_PAGE_NUM = 50
    LIMIT = 20

    page = request.args.get('page', default=1, type=int)
    if page > MAX_PAGE_NUM:
        abort(404, description=f"Page cannot exceed {MAX_PAGE_NUM}")

    sort = request.args.get('sort', default="best_match", type=str)
    url = "https://api.yelp.com/v3/businesses/search"
    # TODO: term should be replaced by user input if exists
    params = {
        "term": "restaurants",
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
@app.route('/api/airbnbs/<string:city>', methods=["GET"])
def airbnbs(city):
    page = request.args.get('page', default=1, type=int)
    sort = request.args.get('sort', default="price", type=str)
    order = request.args.get('order', default="asc", type=str)
    return get_data_from_database(Airbnb, 'airbnbs', page, sort, order, city)

# City helper functions


def search_cities(query, offset):
    try:
        query_data = session.query(Cities).filter(
            Cities.id.like('%'+query.lower()+'%')).limit(5)
        return convert_to_array_of_dict(query_data)
    except:
        session.rollback()
        return []

# City routes
@app.route('/api/cities', methods=["GET"])
def cities_page():
    page = request.args.get('page', default=1, type=int)
    sort = request.args.get('sort', default="name", type=str)
    order = request.args.get('order', default="asc", type=str)
    return get_data_from_database(Cities, 'cities',  page, sort, order)


@app.route('/api/city/<string:id>', methods=['GET'])
def city(id):
    try:
        city_data = session.query(Cities).filter_by(id=id).one_or_none()
        city_dict = convert_to_dict(city_data)
        return jsonify(city=city_dict)
    except:
        session.rollback()
        return 'ERROR SOMEWHERE'


@app.route('/api/city/random', methods=['GET'])
def city_rand():
    city_data_rand = session.query(Cities).order_by(
        func.random()).limit(1).one_or_none()
    city_dict_rand = convert_to_dict(city_data_rand)
    return jsonify(city=city_dict_rand)


@app.route('/api/search')
def search():
    q = request.args.get('q', default="", type=str)
    searchOn = request.args.getlist('on')
    offset = request.args.get('offset', default=0, type=int)

    results = {}
    if 'restaurants' in searchOn:
        results['restaurants'] = search_restaurants(q, offset)
    if 'events' in searchOn:
        results['events'] = search_events(q, offset)
    if 'cities' in searchOn:
        results['cities'] = search_cities(q, offset)

    # TODO: add aibnbs results
    return jsonify(results=results)


@app.route('/')
def index():
    return render_template("index.html")


@app.route('/<path:path>')
def catch_all(path):
    return render_template("index.html")


if __name__ == '__main__':
    app.run(debug=True)
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
