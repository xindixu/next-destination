from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_cors import CORS, cross_origin
import requests

app = Flask(__name__)
CORS(app, resources=r'/*')

# TODO: replace with actual data from db
cities_data = [
    {'name': 'Austin', 'state': 'TX',
        'description': 'Austin is known for its eclectic live-music scene centered around country, blues and rock. Austin is the state capital of Texas, an inland city bordering the Hill Country region. Its many parks and lakes are popular for hiking, biking, swimming and boating.', 'id': 'austin',
        'imageUrl': 'https://res.cloudinary.com/culturemap-com/image/upload/ar_4:3,c_fill,g_faces:center,w_1200/v1548256026/photos/288314_original.jpg',
        'population_size': '964,254'},
    {'name': 'Dallas', 'state': 'TX',
        'description': 'Dallas, a modern metropolis in north Texas, is a commercial and cultural hub of the region.  Downtown’s Sixth Floor Museum at Dealey Plaza commemorates the site of President John F. Kennedy’s assassination in 1963. In the Arts District, the Dallas Museum of Art and the Crow Collection of Asian Art cover thousands of years of art.', 'id': 'dallas',
        'imageUrl': 'https://visitdallas.imgix.net/Open_Graph/shutterstock_234181351.jpeg?w=800&h=600&fit=crop&crop=entropy,faces&q=60&fm=pjpg&auto=compress,enhance,format,redeye&trim=auto',
        'population_size': '1,345,047'},
    {'name': 'Nashville', 'state': 'TN',
        'description': 'Legendary country music venues include the Grand Ole Opry House, home of the famous “Grand Ole Opry” stage and radio show. The Country Music Hall of Fame and Museum and historic Ryman Auditorium are Downtown, as is the District, featuring honky-tonks with live music and the Johnny Cash Museum, celebrating the singers life.', 'id': 'nashville',
        'imageUrl': 'https://www.visitmusiccity.com/sites/www/files/styles/medium_portrait_3x4/public/2019-04/Skyline_FromJeffersonStBridge_1600.jpg?h=ada05aa9&itok=38Ob7xPZ',
        'population_size': '692,587'}
]

artists_data = [
    {'name': 'Khalid', 'description': 'Khalid Donnel Robinson is an American singer and songwriter. He is signed to Right Hand Music Group and RCA Records.',
     'numEvents': '7', 'nextEventLoc': 'Austin, TX', 'fbURL': 'https://www.facebook.com/thegreatkhalid/',
     'pic': 'data:image/jpeg;base64,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',
     'id': 'khalid',},
    {'name': 'Ed Sheeran', 'description': 'Edward Christopher Sheeran, MBE is an English singer, songwriter, record producer, and actor. In early 2011, Sheeran independently released the extended play, No. 5 Collaborations Project. After signing with Asylum Records, his debut album, +, was released in September 2011 and topped the UK Albums Chart.',
     'numEvents': '4', 'nextEventLoc': 'Houston, TX', 'fbURL': 'https://www.facebook.com/EdSheeranMusic/' ,
     'pic': 'data:image/jpeg;base64,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', 
     'id': 'sheeran'},
    {'name': 'Billie Eilish', 'description': 'Billie Eilish Pirate Baird O\'Connell is an American singer and songwriter. She first gained media attention in 2016 when she uploaded the song "Ocean Eyes" to SoundCloud, and it was subsequently released by Interscope Records subsidiary Darkroom.',
     'numEvents': '10', 'nextEventLoc': 'Dallas, TX', 'fbURL': 'https://www.facebook.com/billieeilish/' , 
     'pic': 'data:image/jpeg;base64,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', 
     'id': 'eilish'}
]

us_data = [
    {'name': 'Yulissa Montes', "photo": 'a', 'description': 'On olemassa monta eri versiota Lorem Ipsumin kappaleista, mutta suurin osa on kärsinyt muunnoksista joissain muodoissa, kuten huumorin tai sattumanvaraisesti asetetuin sanoin jotka eivät näytä edes vähän uskottavalta.'},
    {'name': 'Xindi Xu', 'photo': 'a', 'description': 'On olemassa monta eri versiota Lorem Ipsumin kappaleista, mutta suurin osa on kärsinyt muunnoksista joissain muodoissa, kuten huumorin tai sattumanvaraisesti asetetuin sanoin jotka eivät näytä edes vähän uskottavalta.'},
    {'name': 'Marshall Munsch-Hayhurst', 'photo': 'a', 'description': 'On olemassa monta eri versiota Lorem Ipsumin kappaleista, mutta suurin osa on kärsinyt muunnoksista joissain muodoissa, kuten huumorin tai sattumanvaraisesti asetetuin sanoin jotka eivät näytä edes vähän uskottavalta.'},
    {'name': 'Nathan Craig', 'photo': 'a', 'description': 'On olemassa monta eri versiota Lorem Ipsumin kappaleista, mutta suurin osa on kärsinyt muunnoksista joissain muodoissa, kuten huumorin tai sattumanvaraisesti asetetuin sanoin jotka eivät näytä edes vähän uskottavalta.'},
    {'name': 'Quinton Pham', 'photo': 'a', 'description': 'On olemassa monta eri versiota Lorem Ipsumin kappaleista, mutta suurin osa on kärsinyt muunnoksista joissain muodoissa, kuten huumorin tai sattumanvaraisesti asetetuin sanoin jotka eivät näytä edes vähän uskottavalta.'}

]

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

    'events': [{
        'id': 'sdfasd',
        'sale_datetime': 'sdfasdf',
        'event_datetime': 'asdfadf',
        'description': 'dfsafdf',
        'venue': 'fasdfsaf'

    }]
}]
venue_data = [{
    'name': 'sdfasdf',
    'coordinates': {'x': 'dfgdsgf', 'y': 'dvdvcx'},
    'city': 'fvfdgsfd',
    'region': 'dfbxxcvb'
}]


def get_city_by_id(id):
    return [city for city in cities_data if city["id"] == id][0]

def get_artist_by_id(id):
    return [artist for artist in artists_data if artist["id"] == id][0]

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

    about_data = [
        {'name': 'Yulissa Montes', "photo": 'a', 'stats': member_contribs["yulissa"], 'description': 'asdfasd',
         'responsibilities':"asdf"},
        {'name': 'Xindi Xu', 'photo': 'a',  'stats': member_contribs["xindi"], 'description': 'qewrqre',
         'responsibilities':"asdf"},
        {'name': 'Marshall Munsch-Hayhurst', 'stats': member_contribs["marshall"], 'photo': 'a', 'description': 'rytu',
         'responsibilities':"adsf"},
        {'name': 'Nathan Craig', 'photo': 'a', 'stats': member_contribs["nathan"], 'description': 'rytu',
         'responsibilities':"asdf"},
        {'name': 'Quinton Pham', 'photo': 'a', 'stats': member_contribs["quinton"], 'description': 'vnm',
         'responsibilities':"asdf"}
    ]

    return jsonify(about=about_data)


@app.route('/api/business')
def business():
    return jsonify(business=business_data)


@app.route('/api/event')
def event():
    return jsonify(event=event_data)


@app.route('/api/music')
def music():
    return jsonify(music=music_data)


@app.route('/api/venue')
def venue():
    return jsonify(venue=venue_data)


@app.route('/api/city/<string:id>')
def city(id):
    data = get_city_by_id(id)
    print(data)
    return jsonify(city=get_city_by_id(id))


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

if __name__ == '__main__':
    app.run(debug=True)
