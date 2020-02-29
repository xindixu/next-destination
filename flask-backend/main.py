from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_cors import CORS, cross_origin
import requests

from data import cities_data, business_data, about_data, event_data, venues_data, artists_data, member_contribs
from api_keys import yelp_api_key

app = Flask(__name__)
CORS(app, resources=r'/*')



def get_city_by_id(id):
    return [city for city in cities_data if city["id"] == id][0]


def get_artist_by_id(id):
    return [artist for artist in artists_data if artist["id"] == id][0]


def get_venue_by_id(id):
    return [venue for venue in venues_data if venue["id"] == id][0]


@app.route('/api/cities')
def cities():
    return jsonify(cities=cities_data)


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

@app.route('/api/event')
def event():
    return jsonify(event=event_data)


@app.route('/api/city/<string:id>')
def city(id):
    data = get_city_by_id(id)
    print(data)
    return jsonify(city=get_city_by_id(id))

@app.route('/api/restruants/<string:location>')
def restruants(location):
    # test: austin
    # data from yelp api
    url = "https://api.yelp.com/v3/businesses/search"
    params = {
        "location": location
    }
    headers = {
        "Authorization": f"Bearer {yelp_api_key}",
        "Content-type": "json"
    }

    restruants = requests.get(url, params=params, headers=headers).json()
    return jsonify(restruants=restruants)
    
@app.route('/api/restruant/<string:id>')
def restruant(id):
    # test: MGzro82Fi4LYvc86acoONQ
    url = f"https://api.yelp.com/v3/businesses/{id}"
    headers = {
        "Authorization": f"Bearer {yelp_api_key}",
        "Content-type": "json"
    }

    restruant = requests.get(url, headers=headers).json()
    return jsonify(restruant=restruant)

@app.route('/')
def index():
    return render_template("index.html")


@app.route('/api/artists')
def artists():
    return jsonify(artists=artists_data)


@app.route('/api/artist/<string:id>')
def artist(id):
    data = get_artist_by_id(id)
    print(data)
    return jsonify(artist=get_artist_by_id(id))


@app.route('/api/venues')
def venues():
    return jsonify(venues=venues_data)


@app.route('/api/venue/<string:id>')
def venue(id):
    data = get_venue_by_id(id)
    print(data)
    return jsonify(venue=get_venue_by_id(id))


if __name__ == '__main__':
    app.run(debug=True)
