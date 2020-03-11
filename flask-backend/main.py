from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_cors import CORS, cross_origin
import requests

from data import cities_data, about_data, member_contribs
from api import songkick_api_key, yelp_api_header

app = Flask(__name__)
CORS(app, resources=r'/*')


def get_city_by_id(id):
    return [city for city in cities_data if city["id"] == id][0]


def get_artist_by_id(id):
    return [artist for artist in artists_data if artist["id"] == id][0]


def get_venue_by_id(id):
    return [venue for venue in venues_data if venue["id"] == id][0]

# TODO: get location id from name
def get_city_id_by_name(name):
    return "26330"


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


@app.route('/api/events/<string:city>')
def events(city):
    url = "https://api.yelp.com/v3/events"
    params = {
        "location": city
    }
    response = requests.get(url, params=params, headers=yelp_api_header).json()
    return jsonify(response=response)


@app.route('/api/event/<string:id>')
def event(id):
    # test: austin-yelps-open-party-2011-the-thriller-throwdown
    url = f"https://api.yelp.com/v3/events/{id}"
    response = requests.get(url, headers=yelp_api_header).json()
    return jsonify(response=response)

#! need to make a distinction about if we want to categorize as restaurants or as busineses
@app.route('/api/restaurants')
def businesses():
    return jsonify(restaurants=restaurant_data)


@app.route('/api/restaurants/<string:city>')
def restaurants(city):
    url = "https://api.yelp.com/v3/businesses/search"
    params = {
        "location": city
    }
    response = requests.get(url, params=params, headers=yelp_api_header).json()
    return jsonify(response=response)


@app.route('/api/restaurant/<string:id>')
def restaurant(id):
    # test: MGzro82Fi4LYvc86acoONQ
    url = f"https://api.yelp.com/v3/businesses/{id}"
    response = requests.get(url, headers=yelp_api_header).json()
    return jsonify(response=response)


@app.route('/api/cities')
def cities():
    return jsonify(cities=cities_data)


@app.route('/api/city/<string:id>')
def city(id):
    data = get_city_by_id(id)
    return jsonify(city=get_city_by_id(id))


@app.route('/')
def index():
    return render_template("index.html")

if __name__ == '__main__':
    app.run(debug=True)
