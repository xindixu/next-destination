from flask import Flask, render_template, request, redirect, url_for, jsonify, abort, Response
from flask_cors import CORS, cross_origin
from sqlalchemy import create_engine, or_, func, desc
import requests
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import sessionmaker
import json
from models import Airbnb, Cities, app, db

from data import about_data, member_contribs
from api import songkick_api_key, yelp_api_header

# ! for some reason this code does not work when it is put into the __name__ if statment
CORS(app, resources=r'/*')
engine = create_engine(
    'postgres+psycopg2://postgres:supersecret@localhost:5432/cityhuntdb')
Session = sessionmaker(bind=engine)
session = Session()
# ! end of code that doesn't work


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


@app.route('/api/about')
def about():
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
# ! Need to find a way to make this take info about the location of the local machine so that local events will be listed
# ! Alternatively we could have a search bar that would allow users to search by event or city
@app.route('/api/events')
def events_page():
    url = "https://api.yelp.com/v3/events"
    params = {
        "location": "austin"
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
        "offset": (page - 1) * LIMIT,
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
        "offset": (page - 1) * LIMIT,
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


@app.route('/api/restaurants')
def restaurants_page():
    return jsonify(restaurants=restaurants_data)


def convert_to_dict(instances):
    l = []
    for instance in instances:
        result_dict = {}
        instance_dict = instance.__dict__
        instance_dict.pop('_sa_instance_state', None)
        for key, value in instance_dict.items():
            result_dict[key] = value
        l.append(result_dict)
    return l


@app.route('/api/airbnb', methods=["GET"])
def airbnb():
    try:
        # ! limiting the query to five so it doesn't blow up your computer
        airbnb_data = session.query(Airbnb).limit(5).all()
        airbnb_dict = convert_to_dict(airbnb_data)
        return jsonify(airbnb_dict)
        # TODO look into how to only import the latt, long, accomodates, and name / title
    except:
        session.rollback()
        return 'ERROR SOMEWHERE'


@app.route('/api/city/<string:name>')
def city(name):
    city_data = session.query(Cities).filter(Cities.name == name).all()
    city_dict = convert_to_dict(city_data)
    return jsonify(city=city_dict)


@app.route('/api/cities', methods=["GET"])
def cities():
    try:
        # ! limiting the query to five so it doesn't blow up your computer
        cities_data = session.query(Cities).limit(5).all()
        cities_dict = convert_to_dict(cities_data)
        return jsonify(cities=cities_dict)
    except:
        session.rollback()
        return 'ERROR SOMEWHERE'


@app.route('/')
def index():
    return render_template("index.html")


if __name__ == '__main__':
    app.run(debug=True)
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
