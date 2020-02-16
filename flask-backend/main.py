from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_cors import CORS, cross_origin
import requests

app = Flask(__name__)
CORS(app, resources=r'/*')

# TODO: replace with actual data from db
cities_data = [
    {'name': 'Austion', 'state': 'TX',
        'description': 'Austin is known for its eclectic live-music scene centered around country, blues and rock.', 'id': 'austin'},
    {'name': 'Dallas', 'state': 'TX',
        'description': 'Dallas, a modern metropolis in north Texas, is a commercial and cultural hub of the region.', 'id': 'dallas'}
]
restaurants_data = [
    {'name': 'Franklin', 'location': 'Austin',
        'description': 'Long lines form early for brisket, pulled pork & other smoked meats at this lunch-only spot.'}
]
<<<<<<< HEAD
us_data = [
    {'name': 'Yulissa Montes', "photo": 'a', 'description': 'On olemassa monta eri versiota Lorem Ipsumin kappaleista, mutta suurin osa on kärsinyt muunnoksista joissain muodoissa, kuten huumorin tai sattumanvaraisesti asetetuin sanoin jotka eivät näytä edes vähän uskottavalta.'},
    {'name': 'Xindi Xu', 'photo': 'a', 'description': 'On olemassa monta eri versiota Lorem Ipsumin kappaleista, mutta suurin osa on kärsinyt muunnoksista joissain muodoissa, kuten huumorin tai sattumanvaraisesti asetetuin sanoin jotka eivät näytä edes vähän uskottavalta.'},
    {'name': 'Marshall Munsch-Hayhurst', 'photo': 'a', 'description': 'On olemassa monta eri versiota Lorem Ipsumin kappaleista, mutta suurin osa on kärsinyt muunnoksista joissain muodoissa, kuten huumorin tai sattumanvaraisesti asetetuin sanoin jotka eivät näytä edes vähän uskottavalta.'},
    {'name': 'Nathan Craig', 'photo': 'a', 'description': 'On olemassa monta eri versiota Lorem Ipsumin kappaleista, mutta suurin osa on kärsinyt muunnoksista joissain muodoissa, kuten huumorin tai sattumanvaraisesti asetetuin sanoin jotka eivät näytä edes vähän uskottavalta.'},
    {'name': 'Quinton Pham', 'photo': 'a', 'description': 'On olemassa monta eri versiota Lorem Ipsumin kappaleista, mutta suurin osa on kärsinyt muunnoksista joissain muodoissa, kuten huumorin tai sattumanvaraisesti asetetuin sanoin jotka eivät näytä edes vähän uskottavalta.'}
]
citydata = [{
    'name': 'Austin', 'state': 'TX', 'coordinates': {'x': '', 'y': ''}, 'description': 'I live here', 'venues': ["Emo's"]
=======
citydata= [{
    'name':'Austin', 'state':'TX', 'coordinates':{'x':'','y':''}, 'description':'I live here', 'venues':["Emo's"]
>>>>>>> 155a3989864284bf5747187e72aad197605799db
}]
business_data = [{
    'name': 'Barbeque Resstaurant',
    'category': 'Barbeque',
    'description': 'as;dfalsdf;',
    'address': '1234 Rockefeller Street',
    'coordinates': {'x': '1234', 'y': '1234'},
    'price': '$$$',
    'hours': [{
        'day': 'M',
        'start': '8:00',
        'end': '9:00'}]
},
    {
    'name': 'Marshalls Restaurant',
    'category': 'Barbeque',
    'description': 'as;dfalsdf;',
    'address': '1234 Rockefeller Street',
    'coordinates': {'x': '1234', 'y': '1234'},
    'price': '$$$',
    'hours': [{
        'day': 'M',
        'start': '8:00',
        'end': '9:00'}
    ]
}]
event_data = [{
    'name': 'V day',
    'category': 'Holiday',
    'description': 'asdsf',
    'address': 'sdasf',
    'coordinates': {'x': 'asdfdsa', 'y': 'adfadsf'},
    'price': 'asdfas',
    'hours': {
        'date': 'afsdf',
        'start': 'gfhfh',
        'end': 'nxcv,cxzbv'}
}]
music_data = [{
    'artist': {
        'name': 'Hobo Johnson',
        'url': 'cvxz',
        'image_url': 'vadvx',
        'upcoming_event_count': 'dasfasdaf'
    },
<<<<<<< HEAD
    'events': [{
        'id': 'sdfasd',
        'sale_datetime': 'sdfasdf',
        'event_datetime': 'asdfadf',
        'description': 'dfsafdf',
        'venue': 'fasdfsaf'
=======
    'events':[{        'id':'sdfasd',
        'sale_datetime':'sdfasdf',
        'event_datetime':'asdfadf',
        'description':'dfsafdf',
        'venue':'fasdfsaf'
>>>>>>> 155a3989864284bf5747187e72aad197605799db
    }]
}]
venue_data = [{
    'name': 'sdfasdf',
    'coordinates': {'x': 'dfgdsgf', 'y': 'dvdvcx'},
    'city': 'fvfdgsfd',
    'region': 'dfbxxcvb'
}]


commits = []
issues = []
page = 1
commits_req = requests.get("https://gitlab.com/api/v4/projects/16729459/repository/commits",
                           params={"all": "true", "per_page": 100, "page": page})
print(commits_req)
while page <= int(commits_req.headers["X-Total-Pages"]):
        commits.extend(commits_req.json())
        page += 1
        commits_req = requests.get("https://gitlab.com/api/v4/projects/16729459/repository/commits",
                                   params={"all": "true", "per_page": 100, "page": page})
        while page <= int(commits_req.headers["X-Total-Pages"]):
            commits.extend(commits_req.json())
            page += 1
            commits_req = requests.get("https://gitlab.com/api/v4/projects/11264402/repository/commits",
                                       params={"all": "true", "per_page": 100, "page": page})

        page = 1
        issues_req = requests.get("https://gitlab.com/api/v4/projects/16729459/issues",
                                  params={"scope": "all", "per_page": 100, page: 1})
        while page <= int(issues_req.headers["X-Total-Pages"]):
            issues.extend(issues_req.json())
            page += 1
            issues_req = requests.get("https://gitlab.com/api/v4/projects/16729459/issues",
                                      params={"scope": "all", "per_page": 100, page: 1})
        member_contribs = {
            "marshall": {"commits": 0, "issues": 0},
            "xindi": {"commits": 0, "issues": 0},
            "yulissa": {"commits": 0, "issues": 0},
            "nathan": {"commits": 0, "issues": 0},
            "quinton": {"commits": 0, "issues": 0}
        }
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
us_data = [
        {'name': 'Yulissa Montes', "photo": 'a', 'stats': member_contribs["yulissa"], 'description': 'asdfasd',
         "Responsibilities":"asdf"},
        {'name': 'Xindi Xu','photo': 'a',  'stats': member_contribs["xindi"], 'description': 'qewrqre',
         "Responsibilities":"asdf"},
        {'name': 'Marshall Munsch-Hayhurst', 'stats': member_contribs["marshall"], 'photo': 'a', 'description': 'rytu',
         "Responsibilities":"adsf"},
        {'name': 'Nathan Craig', 'photo': 'a','stats': member_contribs["nathan"], 'description': 'rytu',
         "Responsibilities":"asdf"},
        {'name': 'Quinton Pham', 'photo': 'a', 'stats': member_contribs["quinton"], 'description': 'vnm',
         "Responsibilities":"asdf"}
]
def get_city_by_id(id):
    return [city for city in cities_data if city["id"] == id][0]


@app.route('/about')
def about():
    return render_template("about.html")

@app.route('/cities')
def cities():
    return jsonify(cities=cities_data)


@app.route('/business')
def business():
    return jsonify(business=business_data)


@app.route('/event')
def event():
    return jsonify(event=event_data)


@app.route('/music')
def music():
    return jsonify(music=music_data)


@app.route('/venue')
def venue():
    return jsonify(venue=venue_data)


@app.route('/us')
def us():
    return jsonify(us=us_data)


@app.route('/city/<string:id>')
def city(id):
    data = get_city_by_id(id)
    print(data)
    return jsonify(city=get_city_by_id(id))

@app.route('/')
def index():
    return render_template("index.html", token="Hello Flask + React")

if __name__ == '__main__':
    app.run(debug=True)
